import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sale } from './entities/sale.entity';
import { Model } from 'mongoose';
import { Product } from 'src/products/entities/product.entity';
import { Client } from 'src/clients/entities/client.entity';
import { AddPaymentDto } from './dto/add-payment.dto';

@Injectable()
export class SalesService {

  constructor(
    @InjectModel(Sale.name)
    private saleModel: Model<Sale>,

    @InjectModel(Product.name) 
    private productModel: Model<Product>,

    @InjectModel(Client.name) 
    private clientModel: Model<Client>,
  ) {}
  
  async create(createSaleDto: CreateSaleDto) {
    const { client, products, payments } = createSaleDto;
    let totalAmount = 0;

    // Verificar si el cliente existe
    const existingClient = await this.clientModel.findById(client).exec();
    if (!existingClient) {
        throw new NotFoundException(`Client with ID ${client} not found`);
    }

    // Verificar stock y calcular el monto total
    const productDetails = await Promise.all(
        products.map(async (item) => {
            const product = await this.productModel.findById(item.productId).exec();

            if (!product) {
                throw new NotFoundException(`Product with ID ${item.productId} not found`);
            }

            // Verificar si el stock es suficiente para la cantidad solicitada
            if (product.stock < item.quantity) {
                throw new BadRequestException(`Insufficient stock for product ${product.name}`);
            }

            // Calcular el monto total para el producto actual
            totalAmount += product.priceSale * item.quantity;

            // Devolver los detalles del producto junto con el precio
            return {
                productId: item.productId,
                quantity: item.quantity,
                price: product.priceSale,
            };
        })
    );

    // Validar pagos iniciales si existen
    let initialPayments: { amount: number; date: Date, payType: string }[] = [];
    if (payments && payments.length > 0) {
        const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);
        if (totalPayments > totalAmount) {
            throw new BadRequestException(`Total payments exceed total amount of the sale`);
        }
    
        initialPayments = payments.map(payment => ({
            amount: payment.amount,
            // Si no se proporciona una fecha, asignar la fecha actual
            date: payment.date ? new Date(payment.date) : new Date(),

            payType: payment.paymentType
        }));
    }

    // Crear la venta en la base de datos
    const newSale = new this.saleModel({
        client,
        products: productDetails,
        totalAmount,
        payments: initialPayments, // Registrar los pagos iniciales
        saleDate: createSaleDto.saleDate || new Date(),
    });

    const savedSale = await newSale.save();

    // Actualizar el stock de cada producto después de guardar la venta
    await Promise.all(
        products.map(async (item) => {
            await this.productModel.findByIdAndUpdate(item.productId, {
                $inc: { stock: -item.quantity },
            }).exec();
        })
    );

    return savedSale;
}

async getSalesByClient(clientId: string): Promise<Sale[]> {
  return this.saleModel
    .find({ client: clientId })
    .populate('client') // Opcional, para obtener detalles completos del cliente
    .populate('products.productId') // Opcional, para obtener detalles completos de los productos
    .exec();
}


async findByClientName(clientName: string): Promise<any[]> {
  const matchingClients = await this.clientModel
    .find({ name: { $regex: clientName, $options: 'i' } })
    .select('_id')
    .exec();

  const clientIds = matchingClients.map(client => client._id);

  const salesByClient = this.saleModel
    .find({ client: { $in: clientIds } })
    .populate('client')
    .exec();

  return salesByClient;
}

  
  
  

  async findAll(): Promise<Sale[]> {
    return this.saleModel
      .find()
      .populate('client', 'name') // Pobla el campo client y solo devuelve su 'name'
      .populate('products.productId', 'name brand size imageUrl')
      .exec();
  }


  async addPayment(addPaymentDto: AddPaymentDto): Promise<Sale> {
    const { saleId, payment } = addPaymentDto;

    // Buscar la venta por ID
    const sale = await this.saleModel.findById(saleId);

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${saleId} not found`);
    }

    // Agregar el pago al arreglo de payments
    sale.payments.push(payment);

    // Guardar la venta actualizada en la base de datos
    return await sale.save();
  }

  findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
