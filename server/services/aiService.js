import { GoogleGenerativeAI } from "@google/generative-ai";

const getAIInsights = async ({ role, notes }) => {
  try {
    console.log("Gemini initialized");
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Gemini key loaded:", !!apiKey);

    if (!apiKey) {
      const err = new Error("Missing GEMINI_API_KEY");
      err.code = "GEMINI_API_KEY_MISSING";
      throw err;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const generationConfig = {
      temperature: 0.3,
      maxOutputTokens: 300,
      // Ask Gemini to return JSON (reduces "Invalid JSON" issues).
      responseMimeType: "application/json",
    };

    // Model IDs change over time; keep configurable and resilient.
    const preferredModel =
      process.env.GEMINI_MODEL?.trim() || "gemini-2.5-flash";
    const fallbackModels = ["gemini-3-flash-preview"];

    const prompt = `
      You are a career coach AI.
      Return ONLY valid JSON. No explanation text.

      Format:
      {
        "skills": ["skill1", "skill2"],
        "resumeTips": ["tip1", "tip2"]
      }

      Job Role: ${role}
      Notes: ${notes}
    `;

    const tryModels = [preferredModel, ...fallbackModels].filter(Boolean);
    let text = "";
    let lastErr;
    let usedModel = "";

    for (const modelName of tryModels) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName});
        const result = await model.generateContent(prompt);
        text = result.response.text();
        usedModel = modelName;
        break;
      } catch (e) {
        lastErr = e;
        const status = e?.status || e?.response?.status;
        // If the model doesn't exist / isn't supported, try the next model.
        if (status === 404) continue;
        throw e;
      }
    }

    if (!text) throw lastErr || new Error("Gemini returned empty response");

    // Some responses may still include surrounding text; extract JSON safely.
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    const candidate =
      jsonStart !== -1 && jsonEnd !== -1 ? text.slice(jsonStart, jsonEnd + 1) : text;

    let parsed;
    try {
      parsed = JSON.parse(candidate);
    } catch (parseErr) {
      const err = new Error("Invalid JSON from Gemini");
      err.code = "GEMINI_INVALID_JSON";
      err.details = {
        model: usedModel || preferredModel,
        sample: String(text).slice(0, 300),
      };
      throw err;
    }

    return {
      ...parsed,
      meta: { provider: "gemini", ok: true, model: usedModel || preferredModel },
    };
  } catch (err) {
    console.error("Gemini AI error:", err);

    // Safe fallback
    return {
      skills: ["Communication", "Problem Solving"],
      resumeTips: [
        "Tailor your resume to the job description",
        "Highlight relevant projects"
      ],
      meta: {
        provider: "gemini",
        ok: false,
        reason: err?.code || err?.message || "UNKNOWN",
      },
    };
  }
};

export default getAIInsights;