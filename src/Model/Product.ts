export interface Product {
    id: Guid;
    name: string;
    price: string;
}

type Guid = string & { readonly __brand: unique symbol };
type UserName = string & { readonly __brand2: unique symbol };

export function createGuid(): Guid {
    return crypto.randomUUID() as Guid;
}