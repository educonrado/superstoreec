import { Product } from "./product";
import User from "./user";

export interface Store {
    id: string;
    nameStore: string;
    manager: User;
    phone: string;
    socialNetwork?: string[];
    products: Product[];
    messageClients: string;
    category: string;
    memberType: string; 

}

export enum MemberType {
    'FREE' = 'FREE', 
    'PAY' = 'PAY'
}
