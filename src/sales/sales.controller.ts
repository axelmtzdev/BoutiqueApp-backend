import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Get('client/:clientName')
  async findByClientName(@Param('clientName') clientName: string): Promise<any[]> {
    return this.salesService.findByClientName(clientName);
  }


//   @Get('client/:query')
// async getSalesByClient(@Param('query') query: string): Promise<Sale[]> {
//   return this.saleModel
//     .find({ 'client.name': new RegExp(query, 'i') }) // Filtro dinámico por nombre
//     .populate('client')
//     .populate('products.productId')
//     .exec();
// }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
