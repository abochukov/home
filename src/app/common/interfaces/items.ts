export interface Products {
    productTitle: string;
    productDescription: string;
    productPrice: string;
    subCategoryId: number;
    productImage: string;
    manifacture?: string;
}

export interface Categories {
    id: number;
    categoryName: string;
}

export interface SubCategories {
    id: number;
    categoryId: number;
    subCategoryName: string;
}