import * as crypto from "node:crypto";

export interface ApiResponse<T>{
    data: T | null,
    success: boolean,
    error: string
}

export  interface CatData{
    Category: Category[],
    SubCategory: SubCategory[],
    ProductType: ProductType[],
}
export interface ProductType {
    id: string;
    name: string;
}

export interface SubCategory {
    id: string;
    name: string;
}

export interface Category {
    id: string;
    name: string;
}
export interface Product {
    Id: string;
    Link: string;
    Title: string;
    Price: string;
    Images: string[];
    CategoryId: string;
    SubCategoryId: string;
    ProductTypeId: string;
    Props: Props[] | null
}
export interface Props {
    Id: string;
    Name: string;
    Value: string;
}
type Guid = string & { readonly __brand: unique symbol };
type UserName = string & { readonly __brand2: unique symbol };

export function createGuid(): Guid {
    return crypto.randomUUID() as Guid;
}