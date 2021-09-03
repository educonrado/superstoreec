import { Product } from "./product";
import User from "./user";

export interface Store {
    nameStore?: string;
    description?: string;
    urlStore?:string;
    manager?: string;
    phoneNumberStore?: string;
    socialNetwork?: any[];
    products?: Product[];
    messageClients?: string;
    category?: string;
    memberType?: string;
    imageStore?: string; 

}

export enum MemberType {
    'FREE' = 'FREE', 
    'PAY' = 'PAY'
}
