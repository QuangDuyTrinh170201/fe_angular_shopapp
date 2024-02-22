import { Component } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from './../../services/category.service';
import { environment } from 'src/app/environments/environment';
import { ProductImage } from 'src/app/models/product.image';
import { CartService } from './../../services/cart.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  constructor(
    private ProductService: ProductService,
    private cartService: CartService,
    // private CategoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ){}

  ngOnInit() {
    debugger
    // this.cartService.clearCart();
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if(idParam!==null){
      this.productId = +idParam;
    }
    if(!isNaN(this.productId)){
      this.ProductService.getDetailProduct(this.productId).subscribe({
        next: (response: any) =>{
          if(response.product_images && response.product_images.length > 0){
            response.product_images.forEach((product_image:ProductImage) =>{
              product_image.image_url = `${environment.apiBaseUrl}/products/images/${product_image.image_url}`;
            });
          }
          debugger
          this.product = response
          this.showImage(0);
        },
        complete: ()=>{
          debugger;
        },
        error: (err: any) =>{
          debugger;
          console.error("Error fetching details", err);
        }
      });
    }else{
      console.error("Invalid productId: ", idParam);
    }
  }

  showImage(index: number):void{
    debugger
    if(this.product && this.product.product_images && this.product.product_images.length > 0){
      if(index < 0){
        index = 0;
      }else if(index>=this.product.product_images.length){
        index = this.product.product_images.length - 1;
      }

      // index = index < 0 ? 0 : this.product.product_images.length - 1;
      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number){
    debugger
    this.currentImageIndex = index;
  }

  nextImage(): void{
    debugger
    this.showImage(this.currentImageIndex + 1);
  }

  previousImage(): void {
    debugger
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(): void{
    debugger
    if(this.product){
      this.cartService.addToCart(this.product.id, this.quantity);
    }else{
      //handle null product
      console.error('Cannot add product to cart because product does not exist');
    }
  }

  increaseQuantity(): void{
    this.quantity++;
  }

  decreaseQuantity(): void{
    if(this.quantity>1){
      this.quantity--;
    }
  }
  
  buyNow(): void{
    this.router.navigate(['/orders']);
  }

}
