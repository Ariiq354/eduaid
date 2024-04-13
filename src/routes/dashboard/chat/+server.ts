import type { RequestHandler } from './$types';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge';
import { OPENAI_API_KEY } from '$env/static/private';

const config = new Configuration({
    apiKey : OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export const POST: RequestHandler = async ( {request} ) => {

    const { messages } = await request.json(); 

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo-0125',
        stream: true,
        messages,
        max_tokens: 75
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
};