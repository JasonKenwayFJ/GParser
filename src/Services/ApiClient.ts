import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {ApiResponse} from "../Model/Product.js";

export class HttpClient
{
    private client: AxiosInstance;


    constructor()
    {
        this.client = axios.create({
            timeout: 10000
        });
    }


    async get<T>(url: string): Promise<T>
    {
        const response = await this.client.get(url);
        return response.data;
    }


}