import * as cheerio from "cheerio";

import {HttpClient} from "./ApiClient.js";
import {createGuid, Product} from "../Model/Product.js";

export class PromParser {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    async parse() {
        const html = await this.http.get(
            "https://prom.ua/ua/Noutbuki"
        );
        console.log(html);
        await this.getProducts(html)
    }

    async getProducts(html: string): Promise<Product[]> {
        const $ = cheerio.load(html);

        const products: Product[] = $


    }
}