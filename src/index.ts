import Bot from "./entities/duckbot"
import dotenv from 'dotenv'

dotenv.config()

async function getAwnser(question:string): Promise<string> {
    const bot = new Bot(String(process.env.OPEN_AI_KEY))
    return (await bot.askbot(question))
}
