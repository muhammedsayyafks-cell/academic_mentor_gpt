import { GoogleGenAI, Type } from "@google/genai";
import type { UserInput, MentorResponse } from "../types";
import { SYSTEM_PROMPT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    questionBreakdown: {
      type: Type.OBJECT,
      properties: {
        commandVerb: { type: Type.STRING, description: "The main command verb from the question (e.g., 'Discuss', 'Analyse')." },
        rephrasedQuestion: { type: Type.STRING, description: "The original question rephrased in simple, clear terms." },
        answerRequirement: { type: Type.STRING, description: "A brief clarification of what the answer needs to do (e.g., 'This requires a critical evaluation...')." }
      },
      required: ["commandVerb", "rephrasedQuestion", "answerRequirement"],
    },
    answerPlan: {
      type: Type.OBJECT,
      properties: {
        introduction: { type: Type.STRING, description: "Guidance on what to include in the introduction." },
        bodyPoints: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "An array of 2-3 key points or paragraphs for the main body of the answer."
        },
        conclusion: { type: Type.STRING, description: "Guidance on how to conclude the answer effectively." }
      },
      required: ["introduction", "bodyPoints", "conclusion"],
    },
    modelAnswer: {
      type: Type.STRING,
      description: "A complete, high-quality model answer written from the perspective of a top-performing student. It should be realistic and human-like."
    },
    constructiveFeedback: {
      type: Type.STRING,
      description: "Warm, mentor-like feedback on the student's provided answer. If no answer was provided, this should be null or an empty string."
    },
    selfEvaluationChecklist: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          point: { type: Type.STRING }
        }
      },
      description: "A short checklist of 3 questions for the student to self-evaluate their own writing."
    }
  },
  required: ["questionBreakdown", "answerPlan", "modelAnswer", "selfEvaluationChecklist"]
};


export const getMentorship = async (userInput: UserInput): Promise<MentorResponse> => {
  const { question, discipline, studentAnswer, wordCount } = userInput;

  let userPrompt = `
    Here is my academic question:
    QUESTION: "${question}"
    
    The academic discipline is: ${discipline}.

  `;

  if (studentAnswer && studentAnswer.trim().length > 0) {
    userPrompt += `
      Here is my draft answer. Please provide constructive feedback on it as part of your mentorship.
      MY DRAFT: "${studentAnswer}"
    `;
  } else {
    userPrompt += `
      I have not written an answer yet. Please focus on breaking down the question, providing a plan, and giving a model answer.
    `;
  }

  userPrompt += `
    When you generate the 'modelAnswer' part of the JSON response, please ensure it is approximately ${wordCount}.
    Please provide your mentorship based on your role as Academic Mentor GPT.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText) as MentorResponse;
    
    // Clean up response: ensure feedback is null if it's an empty string.
    if (parsedResponse.constructiveFeedback === "") {
        parsedResponse.constructiveFeedback = null;
    }

    return parsedResponse;
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("JSON")) {
       throw new Error("The model returned an invalid response format. Please try rephrasing your question.");
    }
    throw new Error("Failed to get mentorship from the AI. Please check your connection and try again.");
  }
};
