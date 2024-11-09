export interface ICreateProductPayload {
    name: string;
    amount: number;
    description: string;
    type: 'products' | 'services';
    userId: number;
    file?: File | null;
}

export interface ICreateCategoryPayload {
    name: string;
}