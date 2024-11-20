export interface ICreateProductPayload {
  name: string;
  amount: number | string;
  description: string;
  type: "products" | "services";
  // userId: number;
  file?: File | null;
}

export interface ICreateCategoryPayload {
  name: string;
}

export interface ICatalog {
  id: number;
  name: string;
  amount: string;
  description: string;
  imagePath: string | null;
  userId: number;
  type: "products" | "services";
  createdAt: string;
  updatedAt: string;
  category: string | null;
}
