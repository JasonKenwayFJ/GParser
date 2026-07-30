import * as cheerio from "cheerio";

import {HttpClient} from "./ApiClient.js";
import {createGuid, Product, props} from "../Model/Product.js";
import * as crypto from "node:crypto";
import { chromium } from "playwright";
export class PromParser {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    async parse() {
        const browser = await chromium.launch({ headless: false }); // видим окно браузера
        const page = await browser.newPage();
        await page.goto("https://prom.ua/ua/Noutbuki", { waitUntil: "networkidle" });

        // сохраняем итоговый HTML на диск, чтобы спокойно поизучать
        const html = await page.content();
        const fs = await import("node:fs/promises");
        await fs.writeFile("debug.html", html, "utf-8");

        await page.screenshot({ path: "debug.png", fullPage: true });

        await browser.close();
        return html;
    }

    async getProducts(html: string): Promise<Product[]> {
        const $ = cheerio.load(html);
        const products: Product[] = [];

        $('[data-qaid="product_block"]').each((_, element) => {
            const card = $(element);

            const linkEl = card.find('a[data-qaid="product_link"]').first();
            const productLink = linkEl.attr("href");
            const name = linkEl.attr("title")?.trim() ?? "";

            const image = card.find('img[data-qaid="image_link"]').attr("src");

            const priceEl = card.find('[data-qaid="product_price"]').first();
            const price = priceEl.attr("data-qaprice") ?? null;

            const companyName = card.find('[data-qaid="company_name"]').text().trim();

            products.push({
                Id: createGuid(),
                Link: `https://prom.ua/${productLink}`,
                Title: name,
                Price: price!,
                Images: [image!],
                Props: null,
            });
        });

        return products;
    }

    // async GetProps(html: string): Promise<props[]> {
    //     const $ = cheerio.load(html);
    //
    //     const page: props[] = $()
    //
    //
    //
    //
    //     return props;
    // }
}