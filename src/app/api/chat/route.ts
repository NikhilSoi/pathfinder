import { Anthropic } from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY1 || process.env.ANTHROPIC_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { messages, stage } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY1 && !process.env.ANTHROPIC_API_KEY) {
      console.warn("WARNING: ANTHROPIC_API_KEY is missing from .env.local!");
    }

    const systemPrompt = `You are Nova, an AI copilot for Pathfinder, a business simulator. 
The current stage is: ${stage}.
You are Socratic — you NEVER give the answer or make decisions for the user. 
Your goal is to ask sharp, insightful questions based on the business data. 
Be concise, analytical, and professional. Think Bloomberg terminal meets business school.
Do not use markdown headers, just plain text with occasional bolding.`;

    // Anthropic API requires the first message to be from a user
    let apiMessages = messages;
    if (apiMessages.length > 0 && apiMessages[0].role !== 'user') {
      apiMessages = [{ role: 'user', content: 'Begin analysis.' }, ...apiMessages];
    }

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20240620',
      max_tokens: 300,
      system: systemPrompt,
      messages: apiMessages,
    });

    return NextResponse.json({ reply: response.content[0].type === 'text' ? response.content[0].text : '...' });
  } catch (error) {
    console.error('Anthropic API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch response from Nova.' }, { status: 500 });
  }
}
