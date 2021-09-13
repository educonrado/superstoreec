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
    color?:string;
    fechaAlta?: Date;
    state?:string;
}

export enum MemberType {
    'FREE' = 'FREE', 
    'PAY' = 'PAY'
}

export enum StateType {
    'EDITION' = 'EDITION',
    'PUBLISHED' = 'PUBLISHED'
}
