import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from "rxjs";
import {environment} from "../environments/environment";
import { Category } from './../models/category';

@Injectable({
   providedIn: 'root'
})
export class CategoryService {
   private apiGetCategories = `${environment.apiBaseUrl}/categories/getAll`;

   constructor(private http: HttpClient) {
      
   }

   getCategories(): Observable<Category[]> {
      const params = new HttpParams()
      return this.http.get<Category[]>(this.apiGetCategories, { params });
   }
}