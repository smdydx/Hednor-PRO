import { Model } from 'mongoose';
import { product } from './product.model';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<product>);
    findAll(): Promise<product[]>;
    findOne(id: string): Promise<product>;
    create(productData: any): Promise<product>;
    update(id: string, updateData: any): Promise<product>;
    remove(id: string): Promise<void>;
}
