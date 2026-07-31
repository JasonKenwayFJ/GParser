// import * as cheerio from "cheerio";
//
// import {HttpClient} from "./ApiClient.js";
// import {createGuid, Product, props} from "../Model/Product.js";
// import * as crypto from "node:crypto";
// import {chromium} from "playwright";
//
// export class PromParser {
//     private http: HttpClient;
//
//     constructor() {
//         this.http = new HttpClient();
//     }
//
//     async parse(urlPage: string) {
//         const browser = await chromium.launch({headless: false}); // видим окно браузера
//         const page = await browser.newPage();
//         await page.goto(urlPage, {waitUntil: "networkidle"});
//
//         // сохраняем итоговый HTML на диск, чтобы спокойно поизучать
//         const html = await page.content();
//         const fs = await import("node:fs/promises");
//         await fs.writeFile("debug.html", html, "utf-8");
//
//         await page.screenshot({path: "debug.png", fullPage: true});
//
//         await browser.close();
//         return html;
//     }
//
//     // async getProducts(html: string): Promise<Product[]> {
//     //     const $ = cheerio.load(html);
//     //     const products: Product[] = [];
//     //
//     //     $('[data-qaid="product_block"]').each((_, element) => {
//     //         const card = $(element);
//     //
//     //         const linkEl = card.find('a[data-qaid="product_link"]').first();
//     //         const productLink = linkEl.attr("href");
//     //         const name = linkEl.attr("title")?.trim() ?? "";
//     //
//     //         const image = card.find('img[data-qaid="image_link"]').attr("src");
//     //
//     //         const priceEl = card.find('[data-qaid="product_price"]').first();
//     //         const price = priceEl.attr("data-qaprice") ?? null;
//     //
//     //         const companyName = card.find('[data-qaid="company_name"]').text().trim();
//     //
//     //         const props: props[] = await this.GetProps(`https://prom.ua/${productLink}`)
//     //
//     //         products.push({
//     //             Id: createGuid(),
//     //             Link: `https://prom.ua/${productLink}`,
//     //             Title: name,
//     //             Price: price!,
//     //             Images: [image!],
//     //             Props: null,
//     //         });
//     //     });
//     //
//     //     return products;
//     // }
//     async getProducts(html: string): Promise<Product[]> {
//         const $ = cheerio.load(html);
//         const products: Product[] = [];
//
//         const cards = $('[data-qaid="product_block"]').toArray();
//
//         for (const element of cards) {
//             const card = $(element);
//
//             const linkEl = card.find('a[data-qaid="product_link"]').first();
//             const productLink = linkEl.attr("href");
//             const name = linkEl.attr("title")?.trim() ?? "";
//
//             const image = card.find('img[data-qaid="image_link"]').attr("src");
//
//             const priceEl = card.find('[data-qaid="product_price"]').first();
//             const price = priceEl.attr("data-qaprice") ?? "";
//
//             const companyName = card.find('[data-qaid="company_name"]').text().trim();
//
//             // Здесь await теперь работает
//             const props = await this.GetProps(`https://prom.ua/${productLink}`);
//
//             products.push({
//                 Id: createGuid(),
//                 Link: `https://prom.ua/${productLink}`,
//                 Title: name,
//                 Price: price,
//                 Images: image ? [image] : [],
//                 Props: props,
//                 CategoryId: crypto.randomUUID(),
//                 SubCategoryId: crypto.randomUUID(),
//                 ProductTypeId: crypto.randomUUID(),
//             });
//         }
//
//         return products;
//     }
//
//     async GetProps(url: string): Promise<props[]> {
//         const html = await this.parse(url);
//         const $ = cheerio.load(html);
//
//         $('[]').each((_, element) => {
//             const card = $(element);
//
//             const props: props[] = [
//                 {id: createGuid(), name: "Виробник", value: card.find('[data-qaid="Виробник"] span').text().trim()},
//
//                 {id: createGuid(), name: "Тип", value: card.find('[data-qaid="Тип"] span').text().trim()},
//                 {
//                     id: createGuid(),
//                     name: "Встановлена ОС",
//                     value: card.find('[data-qaid="Встановлена ОС"] span').text().trim()
//                 },
//
//                 // CPU
//                 {
//                     id: createGuid(),
//                     name: "Тип процесора",
//                     value: card.find('[data-qaid="Тип процесора"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Модель процесора",
//                     value: card.find('[data-qaid="Модель процесора"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Частота процесора",
//                     value: card.find('[data-qaid="Частота процесора"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Кількість ядер процесора",
//                     value: card.find('[data-qaid="Кількість ядер процесора"] span').text().trim()
//                 },
//
//                 // RAM
//                 {
//                     id: createGuid(),
//                     name: "Об'єм оперативної пам'яті",
//                     value: card.find('[data-qaid="Об\'єм оперативної пам\'яті"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Тип оперативної пам'яті",
//                     value: card.find('[data-qaid="Тип оперативної пам\'яті"] span').text().trim()
//                 },
//
//                 // Screen
//                 {
//                     id: createGuid(),
//                     name: "Діагональ екрану",
//                     value: card.find('[data-qaid="Діагональ екрану"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Роздільна здатність екрану",
//                     value: card.find('[data-qaid="Роздільна здатність екрану"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Тип матриці",
//                     value: card.find('[data-qaid="Тип матриці"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Тип покриття екрану",
//                     value: card.find('[data-qaid="Тип покриття екрану"] span').text().trim()
//                 },
//
//                 // GPU
//                 {
//                     id: createGuid(),
//                     name: "Тип графічного контролера",
//                     value: card.find('[data-qaid="Тип графічного контролера"] span').text().trim()
//                 },
//                 {
//                     id: createGuid(),
//                     name: "Виробник графічного чіпсета",
//                     value: card.find('[data-qaid="Виробник графічного чіпсета"] span').text().trim()
//                 },
//
//                 // Storage
//                 {id: createGuid(), name: "Тип диска", value: card.find('[data-qaid="Тип диска"] span').text().trim()},
//                 {id: createGuid(), name: "Об'єм SSD", value: card.find('[data-qaid="Об\'єм SSD"] span').text().trim()},
//
//                 // Description
//                 {
//                     id: createGuid(),
//                     name: "Опис",
//                     value: $('div[data-qaid="descriptions"] p')
//                         .toArray()
//                         .map(el => $(el).text().trim())
//                         .filter(Boolean)
//                         .join("\n")
//                 }
//             ].filter(p => p.value !== "");
//             return props;
//         })
//     }
// }
import * as cheerio from "cheerio";

import {HttpClient} from "./ApiClient.js";
import {createGuid, Product, Props} from "../Model/Product.js";
import * as crypto from "node:crypto";
import {chromium} from "playwright";

export class PromParser {
    private http: HttpClient;

    constructor() {
        this.http = new HttpClient();
    }

    async parse(urlPage: string) {
        const browser = await chromium.launch({headless: false}); // видим окно браузера
        const page = await browser.newPage();
        await page.goto(urlPage, {waitUntil: "networkidle"});

        // сохраняем итоговый HTML на диск, чтобы спокойно поизучать
        const html = await page.content();
        const fs = await import("node:fs/promises");
        await fs.writeFile("debug.html", html, "utf-8");

        await page.screenshot({path: "debug.png", fullPage: true});

        await browser.close();
        return html;
    }

    // async getProducts(html: string): Promise<Product[]> {
    //     const $ = cheerio.load(html);
    //     const products: Product[] = [];
    //
    //     $('[data-qaid="product_block"]').each((_, element) => {
    //         const card = $(element);
    //
    //         const linkEl = card.find('a[data-qaid="product_link"]').first();
    //         const productLink = linkEl.attr("href");
    //         const name = linkEl.attr("title")?.trim() ?? "";
    //
    //         const image = card.find('img[data-qaid="image_link"]').attr("src");
    //
    //         const priceEl = card.find('[data-qaid="product_price"]').first();
    //         const price = priceEl.attr("data-qaprice") ?? null;
    //
    //         const companyName = card.find('[data-qaid="company_name"]').text().trim();
    //
    //         const props: props[] = await this.GetProps(`https://prom.ua/${productLink}`)
    //
    //         products.push({
    //             Id: createGuid(),
    //             Link: `https://prom.ua/${productLink}`,
    //             Title: name,
    //             Price: price!,
    //             Images: [image!],
    //             Props: null,
    //         });
    //     });
    //
    //     return products;
    // }
    async getProducts(html: string): Promise<Product[]> {
        const $ = cheerio.load(html);
        const products: Product[] = [];

        const cards = $('[data-qaid="product_block"]').toArray();

        for (const element of cards) {
            const card = $(element);

            const linkEl = card.find('a[data-qaid="product_link"]').first();
            const productLink = linkEl.attr("href");
            const name = linkEl.attr("title")?.trim() ?? "";

            const image = card.find('img[data-qaid="image_link"]').attr("src");

            const priceEl = card.find('[data-qaid="product_price"]').first();
            const price = priceEl.attr("data-qaprice") ?? "";

            const companyName = card.find('[data-qaid="company_name"]').text().trim();

            if (!productLink) {
                // без ссылки на товар не сможем спарсить его свойства — пропускаем карточку
                continue;
            }

            const fullLink = `https://prom.ua${productLink}`;

            const productId : string = createGuid()
            // Здесь await теперь работает
            const props = await this.GetProps(fullLink);

            products.push({
                Id: productId,
                Link: fullLink,
                Title: name,
                Price: price,
                Images: image ? [image] : [],
                Props: props,
                CategoryId: crypto.randomUUID(),
                SubCategoryId: crypto.randomUUID(),
                ProductTypeId: crypto.randomUUID(),
            });
        }

        return products;
    }

    async GetProps(url: string): Promise<Props[]> {
        const html = await this.parse(url);
        const $ = cheerio.load(html);

        const properties: Props[] = [
            {Id: createGuid(), Name: "Виробник", Value: $('[data-qaid="Виробник"] span').text().trim()},

            {Id: createGuid(), Name: "Тип", Value: $('[data-qaid="Тип"] span').text().trim()},
            {
                Id: createGuid(),
                Name: "Встановлена ОС",
                Value: $('[data-qaid="Встановлена ОС"] span').text().trim()
            },

            // CPU
            {
                Id: createGuid(),
                Name: "Тип процесора",
                Value: $('[data-qaid="Тип процесора"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Модель процесора",
                Value: $('[data-qaid="Модель процесора"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Частота процесора",
                Value: $('[data-qaid="Частота процесора"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Кількість ядер процесора",
                Value: $('[data-qaid="Кількість ядер процесора"] span').text().trim()
            },

            // RAM
            {
                Id: createGuid(),
                Name: "Об'єм оперативної пам'яті",
                Value: $('[data-qaid="Об\'єм оперативної пам\'яті"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Тип оперативної пам'яті",
                Value: $('[data-qaid="Тип оперативної пам\'яті"] span').text().trim()
            },

            // Screen
            {
                Id: createGuid(),
                Name: "Діагональ екрану",
                Value: $('[data-qaid="Діагональ екрану"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Роздільна здатність екрану",
                Value: $('[data-qaid="Роздільна здатність екрану"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Тип матриці",
                Value: $('[data-qaid="Тип матриці"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Тип покриття екрану",
                Value: $('[data-qaid="Тип покриття екрану"] span').text().trim()
            },

            // GPU
            {
                Id: createGuid(),
                Name: "Тип графічного контролера",
                Value: $('[data-qaid="Тип графічного контролера"] span').text().trim()
            },
            {
                Id: createGuid(),
                Name: "Виробник графічного чіпсета",
                Value: $('[data-qaid="Виробник графічного чіпсета"] span').text().trim()
            },

            // Storage
            {Id: createGuid(), Name: "Тип диска", Value: $('[data-qaid="Тип диска"] span').text().trim()},
            {Id: createGuid(), Name: "Об'єм SSD", Value: $('[data-qaid="Об\'єм SSD"] span').text().trim()},

            // Description
            {
                Id: createGuid(),
                Name: "Опис",
                Value: $('div[data-qaid="descriptions"] p')
                    .toArray()
                    .map(el => $(el).text().trim())
                    .filter(Boolean)
                    .join("\n")
            }
        ].filter(p => p.Value !== "");
        console.log(properties);
        console.log(properties[0]);
        return properties;
    }
}