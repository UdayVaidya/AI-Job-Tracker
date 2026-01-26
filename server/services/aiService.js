import axios from 'axios';

const getAIInsight = async ({ role, notes }) => {
  const prompt = `
    You are a career coach AI.
    Return ONLY valid JSON. No text outside JSON.

    Format:
    {
      "skills": ["skill1", "skill2"],
      "resumeTips": ["tip1", "tip2"]
    }

    Job role: ${role}
    Notes: ${notes}
  `;

  try {
    const res = await axios.post(
      process.env.AI_API_URL,
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.3
        }
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
        timeout: 15000, // 15 seconds timeout
      }
    );

    const data = res.data;

    // HuggingFace response handling (VERY IMPORTANT)
    if (data.error) {
      throw new Error(data.error);
    }

    const rawText =
      data[0]?.generated_text ||
      data.generated_text ||
      "{}";

    const jsonStart = rawText.indexOf("{");
    const jsonEnd = rawText.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("Invalid AI JSON");
    }

    return JSON.parse(rawText.slice(jsonStart, jsonEnd + 1));

  } catch (error) {
    console.error("AI service error:", error.message);

    // SAFE fallback (frontend will never crash)
    return {
      skills: ["Communication", "Problem Solving"],
      resumeTips: [
        "Tailor your resume to the job description",
        "Highlight relevant projects"
      ]
    }; 
  }
}

export default getAIInsight;