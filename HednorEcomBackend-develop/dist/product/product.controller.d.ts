import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<import("./product.model").product[]>;
    getProduct(id: string): Promise<import("./product.model").product>;
    createProduct(productData: any): Promise<import("./product.model").product>;
    updateProduct(id: string, updateData: any): Promise<import("./product.model").product>;
    deleteProduct(id: string): Promise<void>;
}
