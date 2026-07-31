import { AliParser } from "./Services/AliParser.js";
import {OLXParser} from "./Services/OLXParser.js";
import {PromParser} from "./Services/PromParser.js";
import {CatData, Product} from "./Model/Product.js";
import axios from "axios";
import {GApi} from "./Services/GApi.js";
import {types} from "node:ffi";


async function main()
{
    // const api = new GApi()
    // const cats : CatData = await api.getCatsFromApi()
    // console.log(cats)
    const parser = new PromParser();
    const html = await parser.parse("https://prom.ua/ua/Noutbuki");


    const data = await parser.getProducts(html)
    console.log(data)
    // console.log(data)
    await UploadProduct(data);

}
async function UploadProduct(product: Product[]){
    try{
    const response = await axios.post("https://gravleapi.onrender.com/Admin/Add_Product_By_Parser", product, {
        headers: {
            "Content-Type": "application/json"
        }
    });

    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);
        } else {
            console.log(error);
        }
    }
}

main();