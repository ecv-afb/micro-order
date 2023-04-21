import { Injectable } from '@nestjs/common';
import { OrderDetailsDto, OrderToCreateDto, ShippingRequestDto, UpdateOrderDto } from './dtos';
import { API_URL, SHIPPING_API_URL } from 'src/main';
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

  notifyShipping(orderDetailsDto: OrderDetailsDto) {
    const shippingRequestDto : ShippingRequestDto = {
      orderId : orderDetailsDto.id.toString(),
      nbProducts : orderDetailsDto.products.reduce((accumulator, product) => accumulator + product.quantity, 0)
    }
    this.httpService.post(`${SHIPPING_API_URL}/shipping`, shippingRequestDto) 
  }
}
