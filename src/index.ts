import Bot from "./entities/duckbot"
import BotConfig from "./entities/duckconfig"
import { createInterface } from "readline"
import { IConfig } from "./interfaces/iconfig"
import dotenv from 'dotenv'

export default class Duckbot
{
    private _bot:Bot
    private _config:BotConfig

    constructor(apikey:string,purpose:string, botconfig?:IConfig)
    {
        this._config=new BotConfig(purpose)
        if (botconfig){
            this._config.setConfig(botconfig)
        }
        this._bot = new Bot(apikey, this._config)
    }

    changeBotConfig(config:IConfig){
        this._config.setConfig(config)
    }

    async getBotAwnser(question: string): Promise<string> {
        return (await this._bot.askbot(question))
    }
    
    async getConsoleInput(): Promise<string> {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        return new Promise((resolve) => {
            rl.question('Faça uma pergunta ao bot: ', (answer) => {
                rl.close()
                resolve(answer)
            })
        })
    }
}

dotenv.config()
async function test(){
    const apikey = String(process.env.OPEN_AI_KEY)
    const duckbot = new Duckbot(apikey, "Só responda sim, não ou talvez.")
    const question = await duckbot.getConsoleInput()
    console.log(await duckbot.getBotAwnser(question))
}

test()

