// app/api/recipe/route.js
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
  try {
    const { inventory } = await request.json();
    const prompt = `Based on the following ingredients, suggest a recipe: ${inventory.join(
      ", "
    )}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    const recipe = completion.choices[0].message.content.trim();

    return NextResponse.json({ recipe });
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}
