import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  RefreshCw,
} from 'lucide-react';
import { soundEngine } from '../utils/soundGenerator';

export function AiChatbot({ dailyState, profile, lang = 'en' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'bot',
      text:
        lang === 'my'
          ? `မင်္ဂလာပါ ${profile.name}! ကျွန်တော်ကတော့ Dr. Vitalis AI ကျန်းမာရေးအကြံပေး ဖြစ်ပါတယ်။ ဒီနေ့ ရေဓာတ်၊ လမ်းလျှောက်မှု၊ သွေးပေါင်ချိန်နဲ့ အာဟာရဆိုင်ရာ ဘာမဆို မေးမြန်းနိုင်ပါတယ်ခင်ဗျာ။`
          : `Hello ${profile.name}! I am Dr. Vitalis, your personal biometric health advisor. How may I assist your vitality and wellness today?`,
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const quickPrompts = [
    { label: '📊 Analyze My Vitals Today', query: 'Analyze my daily health vitals right now' },
    { label: '🥗 High-Protein Dinner Ideas', query: 'Suggest a clean 500 kcal high-protein dinner' },
    { label: '❤️ Blood Pressure Balance', query: 'How can I optimize my blood pressure naturally?' },
    { label: '🌙 Deep Sleep Techniques', query: 'What are the best habits for deep restorative sleep?' },
  ];

  const generateAiResponse = (userText) => {
    const q = userText.toLowerCase();
    const { waterGlasses, steps, weight, bloodPressure, meals } = dailyState;
    const totalCals = meals.reduce((sum, m) => sum + (parseInt(m.calories, 10) || 0), 0);

    if (q.includes('analyze') || q.includes('vital') || q.includes('today') || q.includes('သုံးသပ်')) {
      if (lang === 'my') {
        return `📊 **ယနေ့ ဇီဝကျန်းမာရေး သုံးသပ်ချက်:**
• **ရေသောက်သုံးမှု**: ${waterGlasses}/8 ခွက် (${waterGlasses * 250}ml) သောက်ပြီးပါပြီ။ ${waterGlasses >= 8 ? 'ရေဓာတ် အထူးကောင်းမွန်နေပါသည်! 💧' : 'ညနေပိုင်းအတွက် နောက်ထပ် ရေအနည်းငယ် လိုအပ်ပါသေးသည်။'}
• **ခြေလှမ်း**: ${steps.toLocaleString()} ခြေလှမ်း ရောက်ရှိနေပါသည်။ ${steps >= 10000 ? '၁၀,၀၀၀ ခြေလှမ်း ပန်းတိုင် အောင်မြင်စွာ ပြည့်မြောက်ထားပါသည်! 🏆' : `ပန်းတိုင်ပြည့်ရန် ${(10000 - steps).toLocaleString()} ခြေလှမ်း လိုပါသေးသည်။`}
• **သွေးပေါင်ချိန်**: ${bloodPressure.systolic}/${bloodPressure.diastolic} mmHg (${bloodPressure.systolic < 120 && bloodPressure.diastolic < 80 ? 'အကောင်းမွန်ဆုံး ပုံမှန်ဇုန်' : 'အနည်းငယ် ဂရုစိုက်ရန် လိုအပ်'})
• **အစားအသောက်**: စုစုပေါင်း ${totalCals} kcal စားသုံးထားပြီး ကယ်လိုရီမျှတမှု ကောင်းမွန်နေပါသည်။`;
      }
      return `📊 **Today's Biometric Assessment for ${profile.name}:**
• **Hydration**: ${waterGlasses}/8 glasses (${waterGlasses * 250}ml). ${waterGlasses >= 8 ? 'Optimal cellular hydration achieved! 💧' : `Target ${8 - waterGlasses} more glasses before bedtime.`}
• **Physical Cadence**: ${steps.toLocaleString()} steps. ${steps >= 10000 ? '10k Peak Goal achieved! Outstanding cardio output.' : `Only ${(10000 - steps).toLocaleString()} steps left to conquer the 10k badge.`}
• **Vascular Pressure**: ${bloodPressure.systolic}/${bloodPressure.diastolic} mmHg (${bloodPressure.systolic < 120 && bloodPressure.diastolic < 80 ? 'Optimal Normal' : 'Monitor sodium & hydration'})
• **Calorie Balance**: ${totalCals} kcal logged out of ${profile.dailyCaloriesGoal || 2000} kcal target.`;
    }

    if (q.includes('dinner') || q.includes('protein') || q.includes('meal') || q.includes('ညစာ')) {
      return lang === 'my'
        ? `🥗 **ကယ်လိုရီ ၅၀၀ ပရိုတင်းကြွယ်ဝသော ညစာ အကြံပြုချက်:**
၁။ ကင်ထားသော ဆော်လမွန်ငါး (Grilled Salmon) သို့မဟုတ် ကြက်ရင်အုပ်သား (၁၅၀ ဂရမ်)
၂။ ကီနိုဝါ (Quinoa) တစ်ခွက် (Carbs နှင့် Fiber အတွက်)
၃။ အစိမ်းရောင် အသီးအရွက်သုပ် (သံလွင်ဆီနှင့် သံပရာရည် ဆမ်းထားသော ဟင်းနုနွယ်ရွက်)
*စုစုပေါင်း: ၄၈၀ kcal • ပရိုတင်း: ၄၂ ဂရမ်*`
        : `🥗 **Clean 500 kcal High-Protein Dinner Recipe:**
1. Pan-seared wild salmon or organic chicken breast (160g) - 240 kcal, 38g protein
2. Fluffy quinoa & steamed broccoli with lemon zest - 180 kcal, 8g protein
3. Side baby spinach salad with cold-pressed olive oil (1 tsp) - 70 kcal
*Total: ~490 kcal • 46g Bioavailable Protein.*`;
    }

    if (q.includes('pressure') || q.includes('bp') || q.includes('သွေးတိုး')) {
      return lang === 'my'
        ? `❤️ **သွေးပေါင်ချိန် သဘာဝအတိုင်း ထိန်းညှိနည်းများ:**
• ဆား (Sodium) စားသုံးမှု လျှော့ချပြီး ပိုတက်စီယမ်ကြွယ်ဝသော ငှက်ပျောသီး၊ ထောပတ်သီး စားပေးပါ။
• တစ်နေ့လျှင် ရေ ၂ လီတာ ပြည့်အောင် သောက်ပါ။
• ၄-၇-၈ အသက်ရှူနည်း (Inhale 4s, Hold 7s, Exhale 8s) ဖြင့် စိတ်ဖိစီးမှု ဟော်မုန်း cortisol ကို လျှော့ချပါ။`
        : `❤️ **Natural Cardiovascular Blood Pressure Optimization:**
• Balance electrolytes: Increase dietary Potassium (spinach, avocado, bananas) to counterbalance sodium.
• Practice Nitric Oxide boosting nasal breathing (4-7-8 method lowers acute systolic spikes).
• Consistent low-intensity aerobic walks (like your daily steps) keep arterial elasticity pliable.`;
    }

    if (q.includes('sleep') || q.includes('အိပ်')) {
      return lang === 'my'
        ? `🌙 **နှစ်နှစ်ခြိုက်ခြိုက် အိပ်ပျော်စေရန် နည်းလမ်းများ:**
• အိပ်ရာမဝင်မီ ၁ နာရီခန့် အလိုတွင် ဖုန်း၊ တီဗီ အပြာရောင်အလင်း (Blue light) ကြည့်ခြင်း ရှောင်ကြဉ်ပါ။
• အခန်းအပူချိန်ကို အေးမြသော ၁၈-၂၀ ဒီဂရီ စင်တီဂရိတ်တွင် ထားရှိပါ။
• မဂ္ဂနီဆီယမ် (Magnesium Glycinate 400mg) သောက်သုံးခြင်းသည် ကြွက်သားများကို ပြေလျော့စေပြီး Deep Sleep ကို အားပေးပါသည်။`
        : `🌙 **Deep Sleep Restoration Architecture:**
• Circadian alignment: Eliminate blue LED screen exposure 60 minutes before bed.
• Thermal regulation: Cool room temperature to ~66-68°F (19°C) triggers melatonin synthesis.
• Supplementation: Magnesium Glycinate (400mg) supports GABA receptor relaxation and N3 deep sleep duration.`;
    }

    return lang === 'my'
      ? `ကျေးဇူးပြု၍ ဆက်လက်မေးမြန်းနိုင်ပါသည်။ သင်၏ လက်ရှိ ကိုယ်အလေးချိန် (${weight}kg) နှင့် နေ့စဉ် လှုပ်ရှားမှုများကို အခြေခံ၍ ကျန်းမာရေးဆိုင်ရာ အကောင်းဆုံး အကြံပြုချက်များကို အချိန်မရွေး ပံ့ပိုးပေးပါမည်။`
      : `Thank you for sharing. Based on your current baseline (${weight}kg, ${steps} steps, ${waterGlasses}/8 glasses), maintaining consistency across physical activity and clean hydration is your strongest lever for lifelong longevity. What specific topic would you like to explore?`;
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      soundEngine.playChime();
      const botResponse = generateAiResponse(query);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="relative group p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer flex items-center gap-2 font-bold text-sm"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping absolute -top-1 -right-1" />
          <Bot className="w-6 h-6 stroke-[2.3]" />
          <span className="hidden sm:inline">Ask Dr. Vitalis</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="glass-panel w-[92vw] sm:w-[420px] h-[550px] flex flex-col justify-between border border-white/20 shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Chat Header */}
          <div className="p-4 bg-emerald-950/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-slate-950 shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                <Bot className="w-5 h-5 stroke-[2.3]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-white">Dr. Vitalis AI</h4>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                </div>
                <p className="text-[10px] text-emerald-200/70">Biometric Clinical Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([messages[0]])}
                title="Reset conversation"
                className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-white/50 hover:text-white rounded-lg hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="p-2 bg-black/20 border-b border-white/5 flex gap-1.5 overflow-x-auto text-[11px]">
            {quickPrompts.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(p.query)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 hover:border-emerald-400/40 border border-white/10 text-white/80 shrink-0 transition"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-white/10 border border-white/10 text-white/95 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 items-center text-xs text-white/50 italic">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Dr. Vitalis is evaluating your biomarkers...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="p-3 bg-black/30 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={lang === 'my' ? 'ကျန်းမာရေးမေးခွန်းများ မေးမြန်းပါ...' : 'Ask health question or vitals check...'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="glass-input flex-1 px-3.5 py-2 text-xs text-white placeholder-white/40"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition disabled:opacity-40 cursor-pointer shadow-[0_0_10px_rgba(52,211,153,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
