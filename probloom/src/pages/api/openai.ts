import OpenAI from 'openai'; 

export default async function handler(req: any, res: any) {
  // Only allow POST requests 
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY  || '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',
    });

    // Extract the prompt from the request body
    const { prompt } = req.body; 

    const response = await openai.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-4',
      max_tokens: 256,
    });

    // Send the response back to the client
    res.status(200).json({ data: response.choices[0]?.message?.content });
  } catch (error) {
    // Handle the error appropriately
    console.error('OpenAI request failed:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
