import OpenAI from "openai"
import BotConfig from "./duckconfig";

export default class Bot
{
    private _client;
    private _config:BotConfig

    constructor(key: string, config?: BotConfig) {
        if (!key) throw new Error("Access Key not found.")
        
        this._client = new OpenAI({
            apiKey: key
        })

        if (config) {
            this._config = config
        }else{
            this._config = new BotConfig("Just a ai assistant")
        }
    }

    askbot = async (ask:string): Promise<string> => { 
        const response = await this._client.responses.create(this.createRequestBody(ask))
        return response.output_text
    }

    createRequestBody(question: string) {
        return {
          model: this._config.model,
          instructions: this._config.purpose,
          input: question,
          max_output_tokens: this._config.max_tokens,
          temperature: this._config.playfulness
        };
    }
}



// OPEN AI RESPONSE BODY
// {
//     id: 'resp_67f1e5440b688192af8121e59e34dddc05000e7da1d2fc39',
//     object: 'response',
//     created_at: 1743906116,
//     status: 'completed',
//     error: null,
//     incomplete_details: null,
//     instructions: null,
//     max_output_tokens: null,
//     model: 'gpt-4o-mini-2024-07-18',
//     output: [
//       {
//         type: 'message',
//         id: 'msg_67f1e54462b08192bcc9f880eae0cd2f05000e7da1d2fc39',
//         status: 'completed',
//         role: 'assistant',
//         content: [Array]
//       }
//     ],
//     parallel_tool_calls: true,
//     previous_response_id: null,
//     reasoning: { effort: null, generate_summary: null },
//     store: true,
//     temperature: 1,
//     text: { format: { type: 'text' } },
//     tool_choice: 'auto',
//     tools: [],
//     top_p: 1,
//     truncation: 'disabled',
//     usage: {
//       input_tokens: 11,
//       input_tokens_details: { cached_tokens: 0 },
//       output_tokens: 27,
//       output_tokens_details: { reasoning_tokens: 0 },
//       total_tokens: 38
//     },
//     user: null,
//     metadata: {},
//     output_text: 'Sure! Here’s a simple counting until 2:\n' +
//       '\n' +
//       '1, 2. \n' +
//       '\n' +
//       'Let me know if you need anything else!'
//   }