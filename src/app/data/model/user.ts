export interface User {
    uid: string;
    name: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    password?: string;
    phoneNumber: string;
    photo: string;    
}
