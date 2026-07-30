import * as cheerio from "cheerio";

import {HttpClient} from "./ApiClient.js";
import {createGuid, Product} from "../Model/Product.js";

export class OLXParser {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient()
    }

    async parse() {
        const html = await this.http.get(
            "https://www.olx.ua/uk/"
        );
        console.log(html);
        return html;
    }



    async getProducts(html: string): Promise<Product[]> {
        const $ = cheerio.load(html);

        const products: Product[] = $("[data-testid='card-title-link']").map((_, element) => {
            const card = $(element);

            const name = card.find("h4").text().trim();
            const price = card.closest("[data-testid='l-card']")
                .find("[data-testid='ad-price']")
                .text()
                .trim();

            return {
                id: createGuid(),
                name,
                price
            };
        }).get();

        return products;
    }
}
