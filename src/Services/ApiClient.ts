import axios, {AxiosInstance, AxiosResponse} from 'axios';

export class HttpClient
{
    private client: AxiosInstance;


    constructor()
    {
        this.client = axios.create({
            timeout: 10000
        });
    }


    async get(url: string): Promise<string>
    {
        const response = await this.client.get(url);

        return response.data;
    }
}