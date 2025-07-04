const { OpenAI } = require("openai");

require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_GPT_KEY, // ← 여기에 본인의 API 키 입력
});
// 비동기 함수로 ChatGPT 호출
async function callGPT(content) {
  const prompt = createPrompt(content);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: prompt,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("오류 발생:", error);
  }
}

const createPrompt = (content) => {
  const SYSTEM_PROMPT = `You are a content moderation AI. Your job is to analyze a user's comment and determine whether it contains harmful or inappropriate content. You must check for profanity, hate speech, slurs, sexual content, sexual harassment, personal attacks (e.g., on family), or discriminatory or offensive language.`;

  const USER_PROMPT = `
    Analyze the following comment and return a JSON object with the result.

Requirements:
- If the comment includes any profanity, hate speech, slurs, sexual content or innuendo, harassment, or discriminatory expressions, return filterResult as \"nonPass\".
- Otherwise, return filterResult as \"pass\".
- In the 'content' field, briefly summarize the reason in Korean using a short phrase (e.g., '욕설 포함', '성희롱 표현', '문제 없음', etc.).

Return strictly in the following JSON format (no extra explanation):
{
  \"result\": \"pass\" | \"nonPass\",
  \"content\": \"요약된 이유를 한국어로 작성\"
}

Comment:${content}
    `;

  const message = [
    { role: "system", content: SYSTEM_PROMPT },
    {
      role: "user",
      content: USER_PROMPT,
    },
  ];

  return message;
};

module.exports = { callGPT };
