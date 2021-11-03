import { Product } from "@data/model/product";
import { Store } from "@data/model/store";

export interface Order {
    buyerName: string;
    buyerPhone: string;
    articles: Product[];
    seller: Store;
    purchaseDate: Date;
}
