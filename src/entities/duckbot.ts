import OpenAI from "openai";

export default class Bot
{
    private _client;

    constructor(key:string){
        if (!key) throw new Error("Access Key not found.")
        
        this._client = new OpenAI({
            apiKey: key
        })
    }

    askbot = async () => {
        return await this._client.responses.create({
            model: "gpt-4o-mini",
            input: "Write a one-sentence bedtime story about a unicorn.",
        });
    }
}



