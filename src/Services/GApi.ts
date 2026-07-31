import {HttpClient} from "./ApiClient.js";
import {APIResponse} from "playwright";
import {ApiResponse, CatData, ProductType, SubCategory} from "../Model/Product.js";

export class GApi {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    async getCatsFromApi(): Promise<CatData> {
        const cat = await this.getCategories()
        const subCat = await this.getSubCategories()
        const pType = await this.getProductTypes()

        const data : CatData = {
            Category: cat,
            SubCategory: subCat,
            ProductType: pType,
        }
        return data
    }

    async getProductTypes(): Promise<ProductType[]> {
        const response: ApiResponse<ProductType[]> = await this.http.get(
            "https://gravleapi.onrender.com/ProductType/Get_All_ProductTypes"
        )
        return response.data!;
    }

    async getSubCategories(): Promise<SubCategory[]> {
        const response: ApiResponse<SubCategory[]> = await this.http.get(
            "https://gravleapi.onrender.com/SubCategories/Get_All_SubCategories"
        )
        return response.data!;
    }

    async getCategories(): Promise<SubCategory[]> {
        const response: ApiResponse<SubCategory[]> = await this.http.get(
            "https://gravleapi.onrender.com/Categories/Get_All_Categories"
        )
        return response.data!;
    }
}
