export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { resumeText, jd } = req.body;
  if (!resumeText || !jd) return res.status(400).json({ error: "Missing resumeText or jd" });
  const prompt = `你是资深职场顾问，请深度分析简历与JD的匹配情况。\n\n===简历===\n${resumeText.slice(0,4000)}\n\n===JD===\n${jd.slice(0,3000)}\n\n仅返回如下JSON，无任何额外文字或markdown代码块：\n{"score":数字0到100,"score_summary":"一句话说明分数原因","matched_keywords":["最多8个匹配关键词"],"missing_keywords":["最多8个缺失关键词"],"resume_suggestions":["5条具体修改建议"],"ideal_candidate":"JD真正想要的人画像","hidden_requirements":["3条隐性要求"],"red_flags":["3条JD的坑"],"company_culture":"从JD推测的公司文化","interview_tips":["3条面试建议"]}`;
  try {
    const response = await fetch("https://api.siliconflow.cn/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.ANTHROPIC_API_KEY}` },
      body: JSON.stringify({ model: "Qwen/Qwen2.5-72B-Instruct", max_tokens: 4096, temperature: 0, messages: [{ role: "user", content: prompt }] }),
    });
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const text = data.choices?.[0]?.message?.content || "";
    const clean = text.replace(/```json|```/g, "").trim();
    res.status(200).json(JSON.parse(clean));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
