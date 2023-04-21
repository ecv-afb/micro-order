import { Injectable } from '@nestjs/common';
import {
  OrderDetailsDto,
  OrderToCreateDto,
  StockMovementType,
  StockProductDto,
  UpdateOrderDto,
} from './dtos';
import { API_URL } from 'src/main';
import { HttpService } from '@nestjs/axios';
import { Observable, catchError, filter, map, switchMap, tap } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly httpService: HttpService) {}
  create(createOrderDto: OrderToCreateDto) {
    let stock: StockProductDto[] = [];

    this.httpService.get(`${API_URL}/api/stock`).subscribe((e) => {
      stock = e.data;
    });

    const unavailability = createOrderDto.products.find(
      (product: StockProductDto) => {
        console.log(stock[0]);
        const productStock = stock.find(
          (list) => product.productId === list.productId,
        );
        return productStock.quantity < product.quantity;
      },
    );
    if (unavailability === null) {
      for (const product of createOrderDto.products) {
        this.httpService
          .post(`${API_URL}/api/stock/${product.productId}/movement`, {
            productId: product.productId,
            quantity: product.quantity,
            status: StockMovementType.Reserve,
          })
          .pipe(
            map((res) => {
              console.log(res);
              // return this.httpService.post(
              //   `${API_URL}/order`,
              //   productsToCreate,
              // );
            }),
            catchError((err) => {
              console.log('error');
              return err;
            }),
          )
          .subscribe();
      }
    }
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
