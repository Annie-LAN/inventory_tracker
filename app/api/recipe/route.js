import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export async function POST(request) {
  try {
    const { inventory } = await request.json();
    const prompt = `Based on the following ingredients: ${inventory.join(
      ", "
    )}, suggest a single recipe formatted as follows:

{
  "name": "[Recipe Name]",
  "ingredients": [
    "[Ingredient 1]",
    "[Ingredient 2]",
    "[Ingredient 3]",
    ...
  ],
  "instructions": [
    "[Step 1]",
    "[Step 2]",
    "[Step 3]",
    ...
  ]
}

Ensure that the JSON is correctly formatted and does not contain extra text or explanations. Return only the JSON object.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
    });

    // Parse the JSON response
    let recipe;
    try {
      recipe = JSON.parse(completion.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return NextResponse.json(
        { error: "Failed to parse recipe JSON" },
        { status: 500 }
      );
    }

    return NextResponse.json(recipe);
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipe" },
      { status: 500 }
    );
  }
}
