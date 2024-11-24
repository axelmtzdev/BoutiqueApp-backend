import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ClientsService {

  constructor(
    @InjectModel( Client.name ) 
    private userModel: Model<Client>,
  ){}
    
  async create(createClientDto: CreateClientDto):Promise<Client> {
    try {
      const newClient = new this.userModel(createClientDto);

      return await newClient.save()

      
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`El cliente con el nombre ${createClientDto.name} ya existe.`);
      }
      // Lanza una excepción para otros tipos de errores
      throw new InternalServerErrorException('Ocurrió un error al crear el cliente.');
   
    }
  }

  findAll():Promise<Client[]> {
    return this.userModel.find()
  }
  
  

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  async remove(id: string):Promise<{message : string}> {
    try {
      const result = await this.userModel.deleteOne({_id: id}).exec();
      if (result.deletedCount === 0) {
        throw new Error('Client not found');
      }
      return { message: `Client with id ${id} has been removed` };
    } catch (error) {
      throw new Error(`Could not delete client: ${error.message}`);
    }
  }


}
