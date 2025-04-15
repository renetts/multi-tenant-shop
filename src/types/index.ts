export interface Client {
    id?: string;
    name: string;
    logoUrl?: string;
  }
  
  export interface Category {
    id?: string;
    name: string;
    clientId: string;
  }
  
  export interface Product {
    id?: string;
    name: string;
    price: number;
    categoryId: string;
    clientId: string;
    imageUrl?: string;
  }