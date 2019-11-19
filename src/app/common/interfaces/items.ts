export interface Products {
    productTitle: string;
    productDescription: string;
    productPrice: string;
    subCategoryId: number;
    productImage: string;
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

export interface addCartItemsFromDetails {
    id: number;
    title: string;
    price: number;
}