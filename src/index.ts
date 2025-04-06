import Bot from "./entities/duckbot"
import dotenv from 'dotenv'

dotenv.config()

const bot = new Bot(String(process.env.OPEN_AI_KEY))

async function ask(){
    console.log(await bot.askbot())
}

ask()