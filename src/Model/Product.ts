import * as crypto from "node:crypto";

export interface Product {
    Id: string;
    Link: string;
    Title: string;
    Price: string;
    Images: string[];
    Props: props[] | null
}
export interface props {
    id: string;
    name: string;
    value: string;
}
type Guid = string & { readonly __brand: unique symbol };
type UserName = string & { readonly __brand2: unique symbol };

export function createGuid(): Guid {
    return crypto.randomUUID() as Guid;
}