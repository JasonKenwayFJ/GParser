import { AliParser } from "./Services/AliParser.js";
import {OLXParser} from "./Services/OLXParser.js";
import {PromParser} from "./Services/PromParser.js";
import {Product} from "./Model/Product.js";
import axios from "axios";


async function main()
{
    const parser = new PromParser();
    const html = await parser.parse();


    const data = await parser.getProducts(html)
    console.log(data)
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