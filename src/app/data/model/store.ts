import { Product } from "./product";
import User from "./user";

export interface Store {
    nameStore?: string;
    description?: string;
    urlStore?:string;
    manager?: string;
    phoneNumberStore?: string;
    socialNetwork?: string[];
    products?: Product[];
    messageClients?: string;
    category?: string;
    memberType?: string; 

}

export enum MemberType {
    'FREE' = 'FREE', 
    'PAY' = 'PAY'
}
