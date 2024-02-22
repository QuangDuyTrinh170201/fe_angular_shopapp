import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpUtilService } from './http.util.service';
import { ProductService } from './product.service';

@Injectable({
   providedIn: 'root'
 })

 export class CartService{
   private cart: Map<number, number> = new Map(); //map để storage cart, key = id product, value = number of products

   constructor(private productService: ProductService){
      //lấy data giỏ hàng từ local storage khi khởi tạo service
      const storedCart = localStorage.getItem('cart');
      if(storedCart){
         this.cart = new Map(JSON.parse(storedCart));
      }
   }

   addToCart(productId: number, quantity: number = 1): void{
      debugger
      if(this.cart.has(productId)){
         //Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên `quantity`
         this.cart.set(productId, this.cart.get(productId)! + quantity);
      }else{
         //nếu sản phẩm chưa tồn tại, thêm vào với số lượng = `quantity`
         this.cart.set(productId, quantity);
      }
      //Sau khi thay đổi giỏ hàng, lưu trữ vào local storage
      this.saveCartToLocalStorage();
   }

   getCart(): Map<number, number>{
      return this.cart;
   }

   private saveCartToLocalStorage(): void{
      debugger
      localStorage.setItem('cart', JSON.stringify(Array.from(this.cart.entries())));
   }

   clearCart():void{
      //hàm xóa dữ liệu và cập nhật lại giỏ hàng
      this.cart.clear();//xóa
      this.saveCartToLocalStorage();//lưu rỗng
   }
 }