import { useState, useEffect, useRef } from "react";

const CURRICULUM = [
  {
    id: "A", name: "The Human Body", color: "#6366F1",
    modules: [
      { id: 1, name: "Musculoskeletal Anatomy & Exercise Application", sessions: 8, topics: ["Bone structure & joint types","Muscle tissue types & functions (cardiac, skeletal, smooth)","Fascia & connective tissue — slings & chains","Major muscles in exercise — origin, insertion, action","Joint mobility vs stability (joint-by-joint model)","Ayurvedic body typing & anatomical parallels"] },
      { id: 2, name: "Exercise Physiology", sessions: 10, topics: ["Three energy systems — ATP-PCr, Glycolytic, Oxidative","Type 1 vs Type 2 muscle fibres","EPOC & recovery science","VO2 and oxygen kinetics","Cardiovascular & respiratory response to exercise","Endocrine system & exercise hormones (cortisol, testosterone, GH, insulin)","Training adaptations — neural and structural"] },
      { id: 3, name: "Neuroscience of Movement & Biomechanics", sessions: 8, topics: ["Proprioception & sensory receptors (muscle spindle, GTO)","Motor control & motor learning stages","Planes of motion — sagittal, frontal, transverse","Kinetic chain — open vs closed","Force, levers & moment arms","Reciprocal inhibition","Stretch-shortening cycle","Pain science basics"] },
    ]
  },
  {
    id: "B", name: "Movement", color: "#0EA5E9",
    modules: [
      { id: 4, name: "Functional Training Philosophy & Principles", sessions: 5, topics: ["Definition & origins of functional training","Functional vs traditional training","Performance pyramid (Gray Cook)","Core principles of FT","Transfer of training","Compensation & dysfunction"] },
      { id: 5, name: "The 6 Fundamental Movement Patterns", sessions: 8, topics: ["Squat — mechanics, cues, regression/progression","Hinge pattern","Lunge pattern","Push pattern","Pull pattern","Rotate & carry pattern","Unilateral training principles"] },
      { id: 6, name: "Movement Assessment", sessions: 8, topics: ["Why assess before training","FMS — 7 patterns, scoring, interpretation","Static postural assessment","Overhead squat assessment (OHSA)","Single-leg squat test","Gait analysis basics","Reassessment protocols"] },
      { id: 7, name: "Core, Stability, Balance & Mobility", sessions: 7, topics: ["Core functions — anti-extension, anti-rotation, anti-flexion","McGill Big 3","Core progression continuum","Balance & proprioceptive training","Mobility vs flexibility","FRC & CARs (Andreo Spina)","Foam rolling & SMR"] },
      { id: 8, name: "Corrective Exercise & Injury Prevention", sessions: 7, topics: ["Upper crossed syndrome","Lower crossed syndrome","Joint-by-joint model","Inhibit-Lengthen-Activate-Integrate sequence","Common injury patterns & corrections","When to refer out","Safe return to training principles"] },
    ]
  },
  {
    id: "C", name: "Programme Design", color: "#10B981",
    modules: [
      { id: 9, name: "Programme Design Fundamentals", sessions: 8, topics: ["PAR-Q & health screening","SMART goal setting","Training phases — foundation to performance","Session structure — warm-up, main, cool-down","Volume, intensity, frequency variables","Rest & recovery planning","Client tracking & documentation"] },
      { id: 10, name: "Periodisation & Progressive Overload", sessions: 6, topics: ["Linear periodisation","Undulating periodisation","Block periodisation","Deload weeks — when & how","Overload beyond weight — tempo, instability, ROM, complexity","Supercompensation theory"] },
      { id: 11, name: "Special Populations", sessions: 10, topics: ["Elderly — fall prevention, sarcopenia, osteoporosis","Athletes — sport-specific programming","Weight loss — metabolic programming","Post-rehabilitation clients","Youth training principles","Desk workers & postural dysfunction","T2DM & hypertension clients","Pregnancy & postnatal","Ayurveda dosha-based programme design"] },
      { id: 12, name: "Equipment & Tools", sessions: 5, topics: ["Bodyweight progressions","Resistance bands","Kettlebells","TRX & suspension training","Cable machines","Medicine balls","Stability tools (Bosu, balance board)","Battle ropes","Home gym programming"] },
    ]
  },
  {
    id: "D", name: "Nutrition", color: "#F59E0B",
    modules: [
      { id: 13, name: "Nutrition Science", sessions: 10, topics: ["Macronutrients — protein, carbs, fat (structure & function)","Micronutrients — vitamins, minerals, electrolytes","Digestion & absorption process","Metabolism & energy balance","Caloric needs — TDEE, BMR, activity multipliers","Hydration science","Gut health & microbiome basics","Ayurvedic nutrition principles & dosha-based eating"] },
      { id: 14, name: "Sports & Performance Nutrition", sessions: 8, topics: ["Pre-workout nutrition timing & composition","Post-workout nutrition & muscle protein synthesis","Protein timing & dose (20–40g rule)","Carbohydrate periodisation","Supplements — within trainer scope","Fat loss vs muscle gain nutrition strategy","Indian diet adaptation for fitness goals"] },
      { id: 15, name: "Nutrition Coaching & Behaviour Change", sessions: 7, topics: ["Trainer scope of practice in nutrition","Habit-based coaching approach (PN method)","Client nutrition assessment","Behaviour change models","Meal planning frameworks (not prescription)","Special diets — vegetarian, vegan, keto, IF","Disordered eating — recognise & refer","Indian meal planning for various goals"] },
    ]
  },
  {
    id: "E", name: "Longevity", color: "#EC4899",
    modules: [
      { id: 16, name: "Longevity Science", sessions: 10, topics: ["VO2 max — definition, significance, mortality prediction","Zone 2 training — mechanism, prescription, mitochondrial benefits","HIIT vs Zone 2 — when to use what","80/20 polarised training model","Muscle mass preservation with age","Sarcopenia — causes, prevention, training response","Sleep science — stages, HRV, recovery","Stress physiology — cortisol, HPA axis, allostatic load","HRV — measuring & interpreting","Chronic inflammation & disease","Mitochondrial health & biogenesis","Ayurveda Dinacharya & longevity practices","Telomere health & exercise"] },
    ]
  },
  {
    id: "F", name: "Coaching Business", color: "#8B5CF6",
    modules: [
      { id: 17, name: "Psychology of Coaching & Behaviour Change", sessions: 7, topics: ["Motivational interviewing (MI)","Transtheoretical model — stages of change","Self-determination theory","Growth mindset in coaching","Active listening & empathy","Cueing — external vs internal focus research","Client retention strategies","Difficult client scenarios"] },
      { id: 18, name: "Online Business & Scaling", sessions: 8, topics: ["Moving from in-person to online coaching","1-on-1 online coaching model setup","Group coaching — design & delivery","Digital products — workout plans, courses, eBooks","Live streaming & virtual group sessions","Platforms — Trainerize, Zoom, YouTube, Instagram","Content strategy & social media for trainers","Pricing, packages & recurring revenue","Building referral networks","Indian fitness market specifics","AGILE brand growth strategy"] },
    ]
  }
];

const TOTAL = CURRICULUM.reduce((s, b) => s + b.modules.length, 0);
const ALL_MODULES = CURRICULUM.flatMap(b => b.modules);

const S = {
  bg: "#0A0F1C", surface: "#111827", surface2: "#1A2235", border: "#1E2D45",
  text: "#F1F5F9", muted: "#64748B", dim: "#334155",
  green: "#10B981", amber: "#F59E0B", red: "#EF4444", indigo: "#6366F1",
};
const inp = { background: S.surface, border: `1px solid ${S.border}`, borderRadius: 8, padding: "9px 12px", color: S.text, fontSize: 13, width: "100%", boxSizing: "border-box", outline: "none" };
const sel = { ...inp, cursor: "pointer" };
const statusColor = s => s === "complete" ? S.green : s === "in_progress" ? S.amber : S.surface2;
const statusBorder = s => s === "complete" ? S.green : s === "in_progress" ? S.amber : S.dim;
const statusLabel = s => s === "complete" ? "✓" : s === "in_progress" ? "▶" : "·";
const blockForModule = id => CURRICULUM.find(b => b.modules.some(m => m.id === id));

const lsGet = (key) => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch(e) { return null; } };
const lsSet = (key, val) => { try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {} };

export default function App() {
  const [mainTab, setMainTab] = useState("teach");
  const [apiKey, setApiKey] = useState("");
  const [keyEntered, setKeyEntered] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [status, setStatus] = useState({});
  const [log, setLog] = useState([]);
  const [trackerTab, setTrackerTab] = useState("progress");
  const [expanded, setExpanded] = useState({});
  const [logForm, setLogForm] = useState({ date: new Date().toISOString().split("T")[0], minutes: 20, moduleId: 1, topic: "" });
  const [testForm, setTestForm] = useState({ moduleId: 1, mcq: "", caseStudy: "", notes: "" });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [teachPhase, setTeachPhase] = useState("select");
  const [topicIdx, setTopicIdx] = useState(0);
  const [lessonContent, setLessonContent] = useState("");
  const [miniCheckData, setMiniCheckData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerResult, setAnswerResult] = useState(null);
  const [testData, setTestData] = useState(null);
  const [testAnswers, setTestAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [aiError, setAiError] = useState("");

  useEffect(() => {
    const savedStatus = lsGet("arise:status");
    const savedLog = lsGet("arise:log");
    const savedKey = localStorage.getItem("arise:apikey_flag");
    if (savedStatus) setStatus(savedStatus);
    if (savedLog) setLog(savedLog);
    if (savedKey === "set") setKeyEntered(true);
    setLoading(false);
  }, []);

  const saveStatus = (v) => { setStatus(v); lsSet("arise:status", v); };
  const saveLog = (v) => { setLog(v); lsSet("arise:log", v); };
  const getM = id => status[id] || { status: "not_started", mcq: null, cs: null, notes: "" };
  const cycleStatus = id => {
    const cur = getM(id).status;
    const next = cur === "not_started" ? "in_progress" : cur === "in_progress" ? "complete" : "not_started";
    saveStatus({ ...status, [id]: { ...getM(id), status: next } });
  };
  const done = Object.values(status).filter(m => m.status === "complete").length;
  const pct = Math.round((done / TOTAL) * 100);
  const totalMin = log.reduce((s, l) => s + Number(l.minutes), 0);
  const totalHrs = (totalMin / 60).toFixed(1);
  const flash = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const logSession = () => {
    if (!logForm.topic.trim()) return;
    saveLog([{ ...logForm, id: Date.now() }, ...log]);
    setLogForm(f => ({ ...f, topic: "", minutes: 20 }));
    flash();
  };
  const saveTest = () => {
    const id = Number(testForm.moduleId);
    saveStatus({ ...status, [id]: { ...getM(id), mcq: testForm.mcq, cs: testForm.caseStudy, notes: testForm.notes } });
    setTestForm(f => ({ ...f, mcq: "", caseStudy: "", notes: "" }));
    flash();
  };

  const callClaude = async (prompt, systemPrompt) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, system: systemPrompt, messages: [{ role: "user", content: prompt }] })
    });
    if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || "API error"); }
    const data = await res.json();
    return data.content[0].text;
  };

  const loadLesson = async (modId, tIdx) => {
    const mod = ALL_MODULES.find(m => m.id === modId);
    const topic = mod.topics[tIdx];
    setLoadingAI(true); setAiError(""); setLessonContent(""); setMiniCheckData(null);
    setSelectedAnswer(null); setAnswerResult(null);
    try {
      const text = await callClaude(
        `Teach me this topic: "${topic}" from module "${mod.name}" (Block: ${blockForModule(modId)?.name}).`,
        `You are teaching Amod Ghanekar — a fitness professional with 13 years of hands-on coaching experience, Ayurvedic massage diploma, and CNES Functional Training Specialist certification. He is sharp, experienced, and hates basics being over-explained.

Teaching format (strictly follow):
1. CONCEPT (2-3 sentences — quick framing, no fluff)
2. MECHANISM (deep science/physiology — go deep. Use specific terms, numbers, research names where relevant)
3. PRACTICAL APPLICATION (how Amod uses this with real clients — give a concrete scenario)
4. AYURVEDA LINK (if relevant — briefly connect to Ayurvedic concept. Skip if forced)

Keep total response under 350 words. Use plain text with clear section headers in CAPS. No markdown bold or bullet points — use dashes for lists.`
      );
      setLessonContent(text);
      setTeachPhase("topic");
    } catch(e) { setAiError(e.message); }
    setLoadingAI(false);
  };

  const loadMiniCheck = async (modId, tIdx) => {
    const mod = ALL_MODULES.find(m => m.id === modId);
    const topic = mod.topics[tIdx];
    setLoadingAI(true); setAiError("");
    try {
      const raw = await callClaude(
        `Generate a mini-check question for: "${topic}" from module "${mod.name}".`,
        `You are testing Amod Ghanekar — experienced fitness professional. Generate a single practical MCQ.
Return ONLY valid JSON (no markdown, no preamble):
{"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":0,"explanation":"..."}
Rules: "correct" is 0-based index. Make it practical/applied. Options should be plausible. Explanation 1-2 sentences max.`
      );
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setMiniCheckData(parsed);
      setTeachPhase("minicheck");
    } catch(e) { setAiError("Mini-check failed: " + e.message); }
    setLoadingAI(false);
  };

  const handleAnswer = (idx) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    const correct = idx === miniCheckData.correct;
    setAnswerResult(correct ? "correct" : "wrong");
    if (correct) setTimeout(() => advanceTopic(), 1400);
  };

  const advanceTopic = () => {
    const mod = ALL_MODULES.find(m => m.id === selectedModuleId);
    const nextIdx = topicIdx + 1;
    if (nextIdx >= mod.topics.length) { startModuleTest(); }
    else { setTopicIdx(nextIdx); loadLesson(selectedModuleId, nextIdx); }
  };

  const startModuleTest = async () => {
    const mod = ALL_MODULES.find(m => m.id === selectedModuleId);
    setTeachPhase("moduletest");
    setLoadingAI(true); setAiError(""); setTestData(null); setTestAnswers({}); setTestResult(null);
    try {
      const raw = await callClaude(
        `Generate a module-end test for: "${mod.name}" covering: ${mod.topics.join(", ")}.`,
        `You are examining Amod Ghanekar — experienced fitness professional.
Return ONLY valid JSON (no markdown, no preamble):
{"mcqs":[{"q":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":0},{"q":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":2},{"q":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":1},{"q":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":3},{"q":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":0}],"cases":[{"scenario":"Real client scenario 3-4 sentences...","question":"What is the BEST intervention?","options":["A. ...","B. ...","C. ...","D. ..."],"correct":1},{"scenario":"Another client scenario...","question":"What would you prioritise first?","options":["A. ...","B. ...","C. ...","D. ..."],"correct":2}]}
Rules: 5 MCQs across whole module. 2 case studies — real coaching scenarios. All options plausible. "correct" is 0-based index.`
      );
      setTestData(JSON.parse(raw.replace(/```json|```/g, "").trim()));
    } catch(e) { setAiError("Test generation failed: " + e.message); }
    setLoadingAI(false);
  };

  const submitTest = () => {
    if (!testData) return;
    const total = testData.mcqs.length + testData.cases.length;
    let correct = 0;
    testData.mcqs.forEach((q, i) => { if (testAnswers[`mcq_${i}`] === q.correct) correct++; });
    testData.cases.forEach((q, i) => { if (testAnswers[`case_${i}`] === q.correct) correct++; });
    const mcqScore = Math.round((testData.mcqs.filter((q,i) => testAnswers[`mcq_${i}`] === q.correct).length / testData.mcqs.length) * 100);
    const caseScore = Math.round((testData.cases.filter((q,i) => testAnswers[`case_${i}`] === q.correct).length / testData.cases.length) * 100);
    const avgScore = Math.round((correct / total) * 100);
    const passed = avgScore >= 80;
    setTestResult({ mcqScore, caseScore, avgScore, passed, correct, total });
    setTeachPhase("result");
    const modId = selectedModuleId;
    saveStatus({ ...status, [modId]: { ...getM(modId), status: passed ? "complete" : "in_progress", mcq: mcqScore, cs: caseScore, notes: passed ? "" : "Needs revision" } });
    const mod = ALL_MODULES.find(m => m.id === modId);
    saveLog([{ id: Date.now(), date: new Date().toISOString().split("T")[0], minutes: mod.topics.length * 5, moduleId: modId, topic: `Module test — ${avgScore}% (${passed ? "PASSED" : "FAILED"})` }, ...log]);
  };

  // ── API KEY SCREEN ────────────────────────────────────────────────────────────
  if (!keyEntered) return (
    <div style={{ background: S.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',system-ui,sans-serif" }}>
      <div style={{ background: S.surface, borderRadius: 16, padding: 36, width: 380, border: `1px solid ${S.border}` }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: S.indigo, fontWeight: 800, textTransform: "uppercase", marginBottom: 6 }}>AGILE · ARISE</div>
        <div style={{ fontSize: 22, fontWeight: 900, color: S.text, marginBottom: 4 }}>FitCoach Certification</div>
        <div style={{ fontSize: 13, color: S.muted, marginBottom: 28 }}>Enter your Anthropic API key to begin. Stored in localStorage — never sent anywhere except Anthropic.</div>
        <div style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6 }}>API Key</div>
        <div style={{ position: "relative" }}>
          <input type={showKey ? "text" : "password"} value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-ant-api03-..." style={{ ...inp, paddingRight: 48 }}
            onKeyDown={e => { if (e.key === "Enter" && apiKey.startsWith("sk-ant")) { setKeyEntered(true); localStorage.setItem("arise:apikey_flag", "set"); localStorage.setItem("arise:apikey", apiKey); } }} />
          <button onClick={() => setShowKey(v => !v)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: S.muted, cursor: "pointer", fontSize: 13 }}>{showKey ? "hide" : "show"}</button>
        </div>
        <button onClick={() => { if (apiKey.startsWith("sk-ant")) { setKeyEntered(true); localStorage.setItem("arise:apikey_flag", "set"); localStorage.setItem("arise:apikey", apiKey); } }}
          style={{ width: "100%", marginTop: 16, background: S.indigo, color: "#fff", border: "none", borderRadius: 9, padding: 13, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Enter App →</button>
        <div style={{ fontSize: 11, color: S.muted, marginTop: 12, textAlign: "center" }}>Key must start with sk-ant</div>
      </div>
    </div>
  );

  if (loading) return <div style={{ background: S.bg, height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: S.indigo, fontFamily: "system-ui", fontSize: 14 }}>Loading...</div>;

  return (
    <div style={{ background: S.bg, minHeight: "100vh", fontFamily: "'Inter',system-ui,sans-serif", color: S.text }}>
      {/* HEADER */}
      <div style={{ background: S.surface, borderBottom: `1px solid ${S.border}`, padding: "14px 20px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: 3, color: S.indigo, fontWeight: 800, textTransform: "uppercase" }}>AGILE · ARISE</div>
            <div style={{ fontSize: 17, fontWeight: 900, marginTop: 2 }}>Fitness Coach Certification</div>
            <div style={{ fontSize: 11, color: S.muted, marginTop: 1 }}>Amod Ghanekar · 18 Modules · 6 Blocks</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 32, fontWeight: 900, color: pct > 0 ? S.indigo : S.dim, lineHeight: 1 }}>{pct}<span style={{ fontSize: 14 }}>%</span></div>
            <div style={{ fontSize: 10, color: S.muted, marginTop: 2 }}>{done}/{TOTAL} done · {totalHrs}h</div>
          </div>
        </div>
        <div style={{ maxWidth: 720, margin: "10px auto 0" }}>
          <div style={{ background: S.bg, borderRadius: 4, height: 4 }}>
            <div style={{ background: `linear-gradient(90deg,${S.indigo},${S.green})`, height: 4, borderRadius: 4, width: `${pct}%`, transition: "width 0.6s" }} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "14px 20px 0" }}>
        {/* MAIN TABS */}
        <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
          {[["teach","🎓 Teach Me"],["tracker","📊 Tracker"]].map(([k,l]) => (
            <button key={k} onClick={() => setMainTab(k)} style={{ flex: 1, padding: "10px 4px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, background: mainTab === k ? S.indigo : S.surface, color: mainTab === k ? "#fff" : S.muted }}>{l}</button>
          ))}
        </div>

        {/* ═══ TEACH TAB ═══ */}
        {mainTab === "teach" && (
          <div>
            {teachPhase === "select" && (
              <div>
                <div style={{ fontSize: 13, color: S.muted, marginBottom: 14 }}>Select a module to begin.</div>
                {CURRICULUM.map(block => (
                  <div key={block.id} style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ width: 3, height: 16, borderRadius: 2, background: block.color }} />
                      <div style={{ fontSize: 11, fontWeight: 800, color: block.color, textTransform: "uppercase", letterSpacing: 1.5 }}>Block {block.id} — {block.name}</div>
                    </div>
                    {block.modules.map(mod => {
                      const m = getM(mod.id);
                      return (
                        <div key={mod.id} onClick={() => { setSelectedModuleId(mod.id); setTopicIdx(0); loadLesson(mod.id, 0); }}
                          style={{ background: S.surface, borderRadius: 10, border: `1px solid ${m.status !== "not_started" ? block.color + "55" : S.border}`, padding: "12px 14px", marginBottom: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                          <div style={{ width: 28, height: 28, borderRadius: "50%", background: statusColor(m.status), border: `2px solid ${statusBorder(m.status)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>{statusLabel(m.status)}</div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>M{mod.id}. {mod.name}</div>
                            <div style={{ fontSize: 10, color: S.muted, marginTop: 2 }}>{mod.topics.length} topics · ~{mod.sessions} sessions</div>
                          </div>
                          {m.mcq && <div style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5, background: +m.mcq >= 80 ? "#052e16" : "#450a0a", color: +m.mcq >= 80 ? S.green : S.red }}>{m.mcq}%</div>}
                          <div style={{ color: S.muted, fontSize: 12 }}>▶</div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}

            {loadingAI && (
              <div style={{ textAlign: "center", padding: 60 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>⚡</div>
                <div style={{ color: S.indigo, fontWeight: 700, fontSize: 14 }}>Claude is thinking...</div>
                <div style={{ color: S.muted, fontSize: 12, marginTop: 6 }}>Generating content for Amod</div>
              </div>
            )}

            {aiError && !loadingAI && (
              <div style={{ background: "#450a0a", border: `1px solid ${S.red}`, borderRadius: 10, padding: 16, marginBottom: 16 }}>
                <div style={{ color: S.red, fontWeight: 700, marginBottom: 6 }}>⚠ Error</div>
                <div style={{ color: "#fca5a5", fontSize: 13 }}>{aiError}</div>
                <button onClick={() => { setAiError(""); setTeachPhase("select"); }} style={{ marginTop: 12, background: S.red, color: "#fff", border: "none", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>← Back</button>
              </div>
            )}

            {teachPhase === "topic" && !loadingAI && !aiError && (() => {
              const mod = ALL_MODULES.find(m => m.id === selectedModuleId);
              return (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <button onClick={() => setTeachPhase("select")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer", fontSize: 12, padding: 0 }}>← Modules</button>
                    <span style={{ color: S.dim }}>·</span>
                    <span style={{ fontSize: 12, color: S.indigo, fontWeight: 700 }}>M{selectedModuleId}. {mod?.name}</span>
                  </div>
                  <div style={{ background: S.surface, borderRadius: 10, padding: 14, marginBottom: 14, border: `1px solid ${S.border}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <div style={{ fontSize: 11, color: S.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>Topic {topicIdx + 1} of {mod.topics.length}</div>
                      <div style={{ fontSize: 11, color: S.indigo, fontWeight: 700 }}>{Math.round((topicIdx / mod.topics.length) * 100)}% through module</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 8 }}>{mod.topics[topicIdx]}</div>
                    <div style={{ display: "flex", gap: 4 }}>
                      {mod.topics.map((_, i) => (<div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < topicIdx ? S.green : i === topicIdx ? S.indigo : S.dim }} />))}
                    </div>
                  </div>
                  <div style={{ background: S.surface, borderRadius: 10, padding: 20, marginBottom: 14, border: `1px solid ${S.border}`, fontSize: 14, lineHeight: 1.75, color: "#CBD5E1", whiteSpace: "pre-wrap" }}>{lessonContent}</div>
                  <button onClick={() => loadMiniCheck(selectedModuleId, topicIdx)} style={{ width: "100%", background: S.indigo, color: "#fff", border: "none", borderRadius: 9, padding: 13, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Test My Understanding →</button>
                </div>
              );
            })()}

            {teachPhase === "minicheck" && !loadingAI && !aiError && miniCheckData && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <button onClick={() => setTeachPhase("topic")} style={{ background: "none", border: "none", color: S.muted, cursor: "pointer", fontSize: 12, padding: 0 }}>← Back to lesson</button>
                </div>
                <div style={{ background: S.surface, borderRadius: 12, padding: 20, border: `1px solid ${S.border}`, marginBottom: 14 }}>
                  <div style={{ fontSize: 10, color: S.indigo, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Mini Check</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, lineHeight: 1.5 }}>{miniCheckData.question}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {miniCheckData.options.map((opt, i) => {
                      let bg = S.surface2, border = S.border, color = S.text;
                      if (selectedAnswer !== null) {
                        if (i === miniCheckData.correct) { bg = "#052e16"; border = S.green; color = S.green; }
                        else if (i === selectedAnswer && i !== miniCheckData.correct) { bg = "#450a0a"; border = S.red; color = S.red; }
                        else { color = S.muted; }
                      }
                      return (<button key={i} onClick={() => handleAnswer(i)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: 8, padding: "12px 14px", cursor: selectedAnswer === null ? "pointer" : "default", color, fontSize: 14, textAlign: "left", fontWeight: 500 }}>{opt}</button>);
                    })}
                  </div>
                  {answerResult && (
                    <div style={{ marginTop: 14, padding: 12, borderRadius: 8, background: answerResult === "correct" ? "#052e16" : "#450a0a", border: `1px solid ${answerResult === "correct" ? S.green : S.red}` }}>
                      <div style={{ fontWeight: 800, color: answerResult === "correct" ? S.green : S.red, marginBottom: 4 }}>{answerResult === "correct" ? "✓ Correct! Moving on..." : "✗ Incorrect"}</div>
                      <div style={{ fontSize: 13, color: "#CBD5E1" }}>{miniCheckData.explanation}</div>
                      {answerResult === "wrong" && <button onClick={advanceTopic} style={{ marginTop: 12, background: S.amber, color: "#000", border: "none", borderRadius: 7, padding: "8px 16px", cursor: "pointer", fontWeight: 800, fontSize: 13 }}>Continue anyway →</button>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {teachPhase === "moduletest" && !loadingAI && !aiError && testData && (
              <div>
                <div style={{ background: S.surface, borderRadius: 12, padding: 16, marginBottom: 16, border: `1px solid ${S.border}` }}>
                  <div style={{ fontSize: 10, color: S.amber, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>Module Test</div>
                  <div style={{ fontSize: 17, fontWeight: 900, marginTop: 4 }}>M{selectedModuleId}. {ALL_MODULES.find(m => m.id === selectedModuleId)?.name}</div>
                  <div style={{ fontSize: 12, color: S.muted, marginTop: 4 }}>5 MCQs + 2 Case Studies · Pass mark: 80%</div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 800, color: S.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>Section A — MCQ</div>
                {testData.mcqs.map((q, qi) => (
                  <div key={qi} style={{ background: S.surface, borderRadius: 10, padding: 16, marginBottom: 10, border: `1px solid ${S.border}` }}>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, lineHeight: 1.5 }}>Q{qi + 1}. {q.q}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {q.options.map((opt, oi) => (
                        <button key={oi} onClick={() => setTestAnswers(a => ({ ...a, [`mcq_${qi}`]: oi }))}
                          style={{ background: testAnswers[`mcq_${qi}`] === oi ? "#1e2d6b" : S.surface2, border: `1px solid ${testAnswers[`mcq_${qi}`] === oi ? S.indigo : S.border}`, borderRadius: 7, padding: "10px 12px", cursor: "pointer", color: testAnswers[`mcq_${qi}`] === oi ? "#a5b4fc" : S.text, fontSize: 13, textAlign: "left" }}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 11, fontWeight: 800, color: S.muted, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10, marginTop: 4 }}>Section B — Case Study</div>
                {testData.cases.map((c, ci) => (
                  <div key={ci} style={{ background: S.surface, borderRadius: 10, padding: 16, marginBottom: 10, border: `1px solid ${S.border}` }}>
                    <div style={{ background: "#1a2235", borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 13, color: "#94a3b8", lineHeight: 1.6, borderLeft: `3px solid ${S.amber}` }}>📋 {c.scenario}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>{c.question}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {c.options.map((opt, oi) => (
                        <button key={oi} onClick={() => setTestAnswers(a => ({ ...a, [`case_${ci}`]: oi }))}
                          style={{ background: testAnswers[`case_${ci}`] === oi ? "#1a2a1a" : S.surface2, border: `1px solid ${testAnswers[`case_${ci}`] === oi ? S.green : S.border}`, borderRadius: 7, padding: "10px 12px", cursor: "pointer", color: testAnswers[`case_${ci}`] === oi ? "#6ee7b7" : S.text, fontSize: 13, textAlign: "left" }}>{opt}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <button onClick={submitTest} disabled={Object.keys(testAnswers).length < testData.mcqs.length + testData.cases.length}
                  style={{ width: "100%", background: Object.keys(testAnswers).length < testData.mcqs.length + testData.cases.length ? S.dim : S.green, color: "#fff", border: "none", borderRadius: 9, padding: 14, fontSize: 14, fontWeight: 800, cursor: "pointer", marginBottom: 20 }}>
                  Submit Test ({Object.keys(testAnswers).length}/{testData.mcqs.length + testData.cases.length} answered)
                </button>
              </div>
            )}

            {teachPhase === "result" && testResult && (
              <div style={{ background: S.surface, borderRadius: 16, padding: 28, textAlign: "center", border: `2px solid ${testResult.passed ? S.green : S.red}`, marginBottom: 16 }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{testResult.passed ? "🏆" : "📚"}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: testResult.passed ? S.green : S.red, marginBottom: 8 }}>{testResult.passed ? "Module Passed!" : "Keep Studying"}</div>
                <div style={{ fontSize: 36, fontWeight: 900, marginBottom: 4 }}>{testResult.avgScore}%</div>
                <div style={{ fontSize: 13, color: S.muted, marginBottom: 20 }}>{testResult.correct}/{testResult.total} correct · Pass mark: 80%</div>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 20 }}>
                  <div style={{ background: S.surface2, borderRadius: 10, padding: "12px 20px" }}>
                    <div style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 1 }}>MCQ</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: testResult.mcqScore >= 80 ? S.green : S.red }}>{testResult.mcqScore}%</div>
                  </div>
                  <div style={{ background: S.surface2, borderRadius: 10, padding: "12px 20px" }}>
                    <div style={{ fontSize: 10, color: S.muted, fontWeight: 700, letterSpacing: 1 }}>CASE STUDY</div>
                    <div style={{ fontSize: 20, fontWeight: 900, color: testResult.caseScore >= 80 ? S.green : S.red }}>{testResult.caseScore}%</div>
                  </div>
                </div>
                {testResult.passed && <div style={{ background: "#052e16", borderRadius: 8, padding: "10px 16px", marginBottom: 16, color: S.green, fontSize: 13, fontWeight: 700 }}>✓ Tracker auto-updated — module marked Complete</div>}
                {!testResult.passed && <div style={{ background: "#1a1200", borderRadius: 8, padding: "10px 16px", marginBottom: 16, color: S.amber, fontSize: 13 }}>Review the topics and retry when ready.</div>}
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => { setTeachPhase("select"); setTestResult(null); setTestData(null); }} style={{ flex: 1, background: S.surface2, color: S.text, border: "none", borderRadius: 9, padding: 12, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← Module List</button>
                  {!testResult.passed && <button onClick={() => { setTopicIdx(0); loadLesson(selectedModuleId, 0); }} style={{ flex: 1, background: S.indigo, color: "#fff", border: "none", borderRadius: 9, padding: 12, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Retake Module</button>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ═══ TRACKER TAB ═══ */}
        {mainTab === "tracker" && (
          <div>
            <div style={{ display: "flex", gap: 4, marginBottom: 14 }}>
              {[["progress","📋 Progress"],["log","➕ Log"],["tests","📝 Tests"],["history","📅 History"]].map(([k,l]) => (
                <button key={k} onClick={() => setTrackerTab(k)} style={{ flex: 1, padding: "8px 2px", borderRadius: 7, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, background: trackerTab === k ? "#334155" : S.surface, color: trackerTab === k ? S.text : S.muted }}>{l}</button>
              ))}
            </div>
            {saved && <div style={{ background: "#052e16", color: S.green, padding: "8px 14px", borderRadius: 8, marginBottom: 12, fontSize: 12, textAlign: "center", fontWeight: 600 }}>✓ Saved</div>}

            {trackerTab === "progress" && CURRICULUM.map(block => {
              const blockDone = block.modules.filter(m => getM(m.id).status === "complete").length;
              return (
                <div key={block.id} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <div style={{ width: 3, height: 16, borderRadius: 2, background: block.color, flexShrink: 0 }} />
                    <div style={{ fontSize: 11, fontWeight: 800, color: block.color, textTransform: "uppercase", letterSpacing: 1.5 }}>Block {block.id} — {block.name}</div>
                    <div style={{ flex: 1, height: 1, background: S.border }} />
                    <div style={{ fontSize: 11, color: block.color, fontWeight: 700 }}>{blockDone}/{block.modules.length}</div>
                  </div>
                  {block.modules.map(mod => {
                    const m = getM(mod.id);
                    const isOpen = !!expanded[mod.id];
                    const avg = m.mcq && m.cs ? Math.round((+m.mcq + +m.cs) / 2) : m.mcq ? +m.mcq : m.cs ? +m.cs : null;
                    return (
                      <div key={mod.id} style={{ background: S.surface, borderRadius: 10, border: `1px solid ${m.status !== "not_started" ? block.color + "55" : S.border}`, marginBottom: 6, overflow: "hidden" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", cursor: "pointer" }} onClick={() => setExpanded(e => ({ ...e, [mod.id]: !e[mod.id] }))}>
                          <button onClick={e => { e.stopPropagation(); cycleStatus(mod.id); }} style={{ width: 28, height: 28, borderRadius: "50%", background: statusColor(m.status), border: `2px solid ${statusBorder(m.status)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0, cursor: "pointer" }}>{statusLabel(m.status)}</button>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>M{mod.id}. {mod.name}</div>
                            <div style={{ fontSize: 10, color: S.muted, marginTop: 2 }}>~{mod.sessions} sessions · {mod.topics.length} topics</div>
                          </div>
                          {avg !== null && <div style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5, background: avg >= 80 ? "#052e16" : "#450a0a", color: avg >= 80 ? S.green : S.red, flexShrink: 0 }}>{avg}%</div>}
                          <div style={{ color: S.muted, fontSize: 11, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
                        </div>
                        {isOpen && (
                          <div style={{ borderTop: `1px solid ${S.bg}`, padding: "10px 14px 12px" }}>
                            {mod.topics.map((t, i) => (<div key={i} style={{ fontSize: 12, color: "#CBD5E1", padding: "3px 0 3px 8px", borderBottom: i < mod.topics.length - 1 ? `1px solid ${S.bg}` : "none" }}>— {t}</div>))}
                            {m.notes && <div style={{ marginTop: 8, fontSize: 11, color: S.amber, padding: "6px 8px", background: "#1a120a", borderRadius: 6 }}>📝 {m.notes}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {trackerTab === "log" && (
              <div style={{ background: S.surface, borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 16 }}>Log a Study Session</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Date</div><input type="date" value={logForm.date} onChange={e => setLogForm(f => ({ ...f, date: e.target.value }))} style={inp} /></div>
                  <div><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Module</div>
                    <select value={logForm.moduleId} onChange={e => setLogForm(f => ({ ...f, moduleId: Number(e.target.value) }))} style={sel}>
                      {CURRICULUM.map(b => b.modules.map(m => <option key={m.id} value={m.id}>M{m.id}: {m.name}</option>))}
                    </select>
                  </div>
                  <div><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Minutes</div><input type="number" min={1} value={logForm.minutes} onChange={e => setLogForm(f => ({ ...f, minutes: e.target.value }))} style={inp} /></div>
                  <div><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>What you covered</div><textarea rows={3} value={logForm.topic} onChange={e => setLogForm(f => ({ ...f, topic: e.target.value }))} placeholder="e.g. Energy systems — ATP-PCr, glycolytic..." style={{ ...inp, resize: "vertical" }} /></div>
                  <button onClick={logSession} style={{ background: S.indigo, color: "#fff", border: "none", borderRadius: 9, padding: 13, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Log Session ➤</button>
                </div>
              </div>
            )}

            {trackerTab === "tests" && (
              <div>
                <div style={{ background: S.surface, borderRadius: 12, padding: 20, marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>Record Test Score</div>
                  <div style={{ fontSize: 11, color: S.muted, marginBottom: 16 }}>Pass mark: 80%</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Module</div>
                      <select value={testForm.moduleId} onChange={e => setTestForm(f => ({ ...f, moduleId: Number(e.target.value) }))} style={sel}>
                        {CURRICULUM.map(b => b.modules.map(m => <option key={m.id} value={m.id}>M{m.id}: {m.name}</option>))}
                      </select>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>MCQ %</div><input type="number" min={0} max={100} value={testForm.mcq} onChange={e => setTestForm(f => ({ ...f, mcq: e.target.value }))} placeholder="0–100" style={inp} /></div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Case Study %</div><input type="number" min={0} max={100} value={testForm.caseStudy} onChange={e => setTestForm(f => ({ ...f, caseStudy: e.target.value }))} placeholder="0–100" style={inp} /></div>
                    </div>
                    <div><div style={{ fontSize: 10, color: S.muted, marginBottom: 5, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>Notes</div><textarea rows={2} value={testForm.notes} onChange={e => setTestForm(f => ({ ...f, notes: e.target.value }))} placeholder="Topics needing revision..." style={{ ...inp, resize: "vertical" }} /></div>
                    <button onClick={saveTest} style={{ background: S.green, color: "#fff", border: "none", borderRadius: 9, padding: 13, fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Save Score ✓</button>
                  </div>
                </div>
                {CURRICULUM.map(b => b.modules.map(mod => {
                  const m = getM(mod.id);
                  if (!m.mcq && !m.cs) return null;
                  const avg = m.mcq && m.cs ? Math.round((+m.mcq + +m.cs) / 2) : +(m.mcq || m.cs);
                  return (
                    <div key={mod.id} style={{ background: S.surface, borderRadius: 9, padding: "10px 14px", marginBottom: 6, display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 600 }}>M{mod.id}: {mod.name}</div>
                        {m.notes && <div style={{ fontSize: 11, color: S.amber, marginTop: 3 }}>📝 {m.notes}</div>}
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {m.mcq && <div style={{ fontSize: 11, color: S.muted }}>MCQ <span style={{ color: +m.mcq >= 80 ? S.green : S.red, fontWeight: 700 }}>{m.mcq}%</span></div>}
                        {m.cs && <div style={{ fontSize: 11, color: S.muted }}>Case <span style={{ color: +m.cs >= 80 ? S.green : S.red, fontWeight: 700 }}>{m.cs}%</span></div>}
                        <div style={{ fontSize: 13, fontWeight: 900, color: avg >= 80 ? S.green : S.red }}>{avg >= 80 ? "✓" : "✗"}</div>
                      </div>
                    </div>
                  );
                }))}
              </div>
            )}

            {trackerTab === "history" && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>Study History</div>
                  <div style={{ fontSize: 11, color: S.muted }}>{log.length} sessions · {totalHrs}h</div>
                </div>
                {log.length === 0 && <div style={{ background: S.surface, borderRadius: 10, padding: 24, textAlign: "center", color: S.muted, fontSize: 13 }}>No sessions yet.<br /><span style={{ color: S.indigo, fontWeight: 700 }}>Start a module to log your first session!</span></div>}
                {log.map(entry => {
                  const block = CURRICULUM.find(b => b.modules.some(m => m.id === Number(entry.moduleId)));
                  return (
                    <div key={entry.id} style={{ background: S.surface, borderRadius: 9, padding: "10px 14px", marginBottom: 6, borderLeft: `3px solid ${block?.color || S.dim}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8" }}>{entry.date}</div>
                        <div style={{ fontSize: 12, color: S.indigo, fontWeight: 800 }}>{entry.minutes} min</div>
                      </div>
                      <div style={{ fontSize: 11, color: S.muted, marginBottom: 4 }}>M{entry.moduleId}: {ALL_MODULES.find(m => m.id === Number(entry.moduleId))?.name}</div>
                      <div style={{ fontSize: 13, color: "#CBD5E1" }}>{entry.topic}</div>
                    </div>
                  );
                })}
              </div>
            )}
            <div style={{ height: 40 }} />
          </div>
        )}
      </div>
    </div>
  );
}
