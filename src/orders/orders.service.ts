import { Injectable } from '@nestjs/common';
import { OrderToCreateDto, UpdateOrderDto } from './dtos';
import { API_URL } from 'src/main';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly httpService: HttpService) {}
  create(createOrderDto: OrderToCreateDto) {
    this.httpService.post(`${API_URL}/orders`, createOrderDto).pipe(
      map(() => {
        console.log();
      }),
    );
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
