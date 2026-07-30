import { AliParser } from "./Services/AliParser.js";
import {OLXParser} from "./Services/OLXParser.js";


async function main()
{
    const parser = new OLXParser();
    const html = await parser.parse();
    console.log(html);

    const data = await parser.getProducts(html)
    console.log(data);
}


main();