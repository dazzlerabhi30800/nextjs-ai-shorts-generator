import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  // responseMimeType: "text/plain",
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "\nWrite a script to generate 30 seconds video on topic : Interesting historical story along with AI Image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and content text as held\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A bustling marketplace in ancient Rome, filled with people, stalls selling goods, and Roman soldiers patrolling.",\n    "contentText": "In the heart of ancient Rome, a young woman named Cornelia, known for her intelligence and strength, found herself in a precarious situation."\n  },\n  {\n    "imagePrompt": "A close-up of Cornelia\'s face, showing her determined expression.",\n    "contentText": "Her husband, a respected senator, had been accused of treason by a powerful enemy, Caius Gracchus."\n  },\n  {\n    "imagePrompt": "Caius Gracchus, a stern and ambitious Roman politician, in a senate chamber.",\n    "contentText": "Gracchus, driven by his own ambitions, sought to silence any opposition to his rise to power."\n  },\n  {\n    "imagePrompt": "A dramatic courtroom scene with Cornelia facing Caius Gracchus, with a crowd of onlookers in the background.",\n    "contentText": "Cornelia knew she had to act quickly. With the help of a trusted friend, she gathered evidence that proved Gracchus\'s accusations were false."\n  },\n  {\n    "imagePrompt": "Cornelia presenting the evidence to the Roman Senate, with the senators looking on in surprise and intrigue.",\n    "contentText": "In a dramatic confrontation before the Senate, Cornelia presented the evidence, exposing Gracchus\'s lies and saving her husband\'s life."\n  },\n  {\n    "imagePrompt": "A close-up shot of Cornelia\'s face, now filled with relief and triumph.",\n    "contentText": "Cornelia\'s courage and intelligence triumphed over Gracchus\'s machinations, proving that even in the face of overwhelming odds, truth and justice could prevail."\n  }\n]\n```\n\n**Explanation:**\n\nThis JSON structure represents a 30-second video script with 6 scenes, each with an AI image prompt and corresponding content text. \n\n* **imagePrompt:**  Each scene\'s image prompt provides a detailed description to an AI image generator (like DALL-E or Midjourney) to create the visual for that scene. \n* **contentText:** This is the voiceover or narration that will accompany the image during that scene. \n\n**How to use this script:**\n\n1. **Generate Images:**  Use the provided image prompts in an AI image generator to create images for each scene.\n2. **Edit and Combine:** Edit the content text as needed and combine it with the generated images.\n3. **Create Video:** Use a video editing software to assemble the images and narration into a cohesive 30-second video. \n\n**Tips for better results:**\n\n* Use specific details in your image prompts for better accuracy. \n* Use a variety of angles and perspectives to create dynamic visuals.\n* Adjust the length of each scene based on the content and pacing.\n* Consider adding music and sound effects for a more immersive experience. \n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
// }

// run();
