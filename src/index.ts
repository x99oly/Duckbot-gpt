import Bot from "./entities/duckbot"
import dotenv from 'dotenv'
import BotConfig from "./entities/duckconfig"
import { createInterface } from "readline"

dotenv.config()

const config = new BotConfig("Responda sempre começando a frase com 'SOU EU O BOT'")

export async function getBotAwnser(question: string): Promise<string> {
    const bot = new Bot(String(process.env.OPEN_AI_KEY))
    return (await bot.askbot(question))
}

export async function getConsoleInput(): Promise<string> {
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

