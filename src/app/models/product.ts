import { ProductImage } from "./product.image";

export interface Product {
   id: number;
   url: string;
   thumbnail: string;
   name: string;
   description: string;
   price: number;
   category_id: number;
   product_images: ProductImage[];
}