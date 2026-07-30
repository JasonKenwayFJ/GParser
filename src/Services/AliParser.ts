import {createGuid, Product} from "../Model/Product.js"
import {HttpClient} from "./ApiClient.js";

export class AliParser {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient()
    }

    async parse() {
        const html = await this.http.get(
            "https://prom.ua/"
        );
        console.log(html);
    }
}