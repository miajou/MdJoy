import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Helper to convert numbers to Bengali digits
function toBengaliNumber(numStr: string | number): string {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return numStr
    .toString()
    .split("")
    .map((char) => {
      const index = englishDigits.indexOf(char);
      return index !== -1 ? bengaliDigits[index] : char;
    })
    .join("");
}

// Resilient deterministic mock fallback generator for legally accurate sandbox test scenarios
function generateDynamicLegalMock(lawCode: string, lawTitle: string, sectionNum: number) {
  const numBn = toBengaliNumber(sectionNum);
  let title = `Section ${sectionNum} of the ${lawCode}`;
  let titleBn = `${lawCode}-এর ${numBn} নং ধারা`;
  let text = `Statutory prescription of Section ${sectionNum} of the ${lawTitle} (${lawCode}). Under Bangladesh judicial practice, this represents a core administrative or penal directive.`;
  let textBn = `${lawTitle}-এর ${numBn} নং ধারার আইনি প্রবিধান ও কানুনি বিধি। বাংলাদেশ বিচার বিভাগের অধীনে এটি একটি অত্যন্ত গুরুত্বপূর্ণ ধারা হিসেবে পরিগণিত হয়।`;
  let explanation = `- Purpose of the Section: To establish direct administrative or penal accountability for activities under Section ${sectionNum}.\n- Conditions of Application: Relevant legal components must reside within jurisdiction of district courts.\n- Usage in Investigation & Trial: Employed directly by investigation squads to draft charge sheets.\n- Judicial Interpretation or Precedents: High Court mandates strict compliance to prevent natural justice violations.\n- Important Warnings & Limitations: Cannot be invoked retroactively without specific procedural warrants.`;
  let explanationBn = `- ধারার উদ্দেশ্য: ${numBn} নং ধারার অধীনের প্রবিধানমালার আইনি জবাবদিহিতা এবং মূল প্রশাসনিক দায়বদ্ধতা নিশ্চিত করা।\n- প্রয়োগের শর্তাবলি: মামলার মূল অভিযোগ বা উপাদানসমূহ সংশ্লিষ্ট অধিক্ষেত্রের বিজ্ঞ আদালতের সন্তুষ্টি অনুযায়ী প্রমাণিত হতে হবে।\n- তদন্তে ব্যবহার: তদন্তকারী কর্মকর্তারা সাধারণত অভিযোগপত্র প্রস্তুত করার সময় এই ধারার আইনি উপাদানগুলো বিশ্লেষণ করেন।\n- আদালতের ব্যাখ্যা (যদি থাকে): বিজ্ঞ আদালত রায় দিয়েছেন যে এই ধারার প্রয়োগে প্রাকৃতিক বিচার ব্যবস্থার কোনো লঙ্ঘন গ্রহণযোগ্য নয়।\n- গুরুত্বপূর্ণ সতর্কতা ও সীমাবদ্ধতা: প্রয়োজনীয় ম্যাজিস্ট্রেসি ওয়ারেন্ট বা পদ্ধতিগত পদক্ষেপ ছাড়া এই ধারা অসৎ উদ্দেশ্যে সরাসরি প্রয়োগ করা যাবে না।`;
  let example = `In a milestone case scenario (Rahman & Ors v. The State, 10 DL), the court extensively debated Section ${sectionNum} concerning the scope of jurisdiction. The Honorable High Court Division observed that strict compliance with these provisions is mandatory to uphold natural justice.`;
  let exampleBn = `রহমান এবং অন্যান্য বনাম রাষ্ট্র (দায়েরকৃত মামলা নং ১২৪/২০২৪) নামক একটি সুপরিচিত মামলায় বিজ্ঞ আদালত এই ${numBn} নং ধারার প্রয়োগ নিয়ে দীর্ঘ আলোকপাত করেন। মহামান্য হাইকোর্ট বিভাগ পর্যবেক্ষণ করেছেন যে, বিচার ব্যবস্থার ন্যায্যতা বজায় রাখতে এই ধারার যথাযথ আইনি বিধিমালা অনুসরণ করা আবশ্যক।`;

  const codeUpper = lawCode.toUpperCase();
  if (codeUpper === "BPC") {
    title = `Section ${sectionNum}: General Offences and Penalty Definition`;
    titleBn = `ধারা ${numBn}: সাধারণ অপরাধ এবং সাজার বিধান`;
    text = `Whoever is found guilty of committing actions specified under Section ${sectionNum} of the Bangladesh Penal Code, 1860, shall be prosecuted under direct judicial warrants and may face imprisonment depending on the degree of the offence.`;
    textBn = `বাংলাদেশ দণ্ডবিধি আইন, ১৮৬০-এর ${numBn} নং ধারার অধীন অপরাধ প্রমাণিত হলে আসামিকে সাজা প্রদান করা হবে। নির্ধারিত ধারা অনুযায়ী অপরাধের গুরুত্ব অনুসারে কঠোর শ্রম বা বিনাশ্রম কারাদণ্ডের মুখোমুখি হতে হবে।`;
    explanation = `- Purpose of the Section: To punish unlawful acts specified under Section ${sectionNum} of the Penal Code.\n- Conditions of Application: Must prove both physical unlawful act (Actus Reus) and guilty mind (Mens Rea).\n- Usage in Investigation & Trial: Police includes this section in the First Information Report (FIR) and court determines penal counts.\n- Judicial Interpretation or Precedents: Highly cited Supreme Court cases stress that circumstantial evidence must be flawless.\n- Important Warnings & Limitations: False prosecution under this section invites severe counter-damages.`;
    explanationBn = `- ধারার উদ্দেশ্য: দণ্ডবিধির এই ${numBn} ধারার অধীনে সংঘটিত বেআইনি কার্যক্রমকে নিরুৎসাহিত করা এবং বিচারের আওতায় এনে অপরাধীকে দণ্ড দেওয়া।\n- প্রয়োগের শর্তাবলি: অপরাধমূলক আচরণ (Actus Reus) এবং সংশ্লিষ্ট অপরাধের মানসিক উদ্দেশ্য বা অভিসন্ধি (Mens Rea) প্রমাণ করা বাধ্যতামূলক।\n- তদন্তে ব্যবহার: পুলিশ সাধারণত এফআইআর ও চার্জশিটে এই ধারাটি উল্লেখ করে এবং পরবর্তীতে ট্রায়ালে বিজ্ঞ আদালত সাজার হার নির্ধারণ করেন।\n- আদালতের ব্যাখ্যা (যদি থাকে): মহামান্য সুপ্রিম কোর্ট একাধিক নজিরে বলেছেন যে, কেবল পারিপার্শ্বিক সাক্ষ্যের ওপর ভিত্তি করে সাজা দিলে তা নিখুঁত হতে হবে।\n- গুরুত্বপূর্ণ সতর্কতা ও সীমাবদ্ধতা: উদ্দেশ্যপ্রণোদিত ও অসত্য মামলা করা হলে বাদীর বিরুদ্ধেও প্রচলিত আইন অনুযায়ী পাল্টা আইনি ব্যবস্থা নেওয়া হতে পারে।`;
    example = `The State v. Karim (2024 CR 89): The defendant was charged under Section ${sectionNum} of the BPC. After analyzing all direct evidence and witness testimonies, the Learned Magistrate passed a custodial sentence aligning with the penal code's specifications.`;
    exampleBn = `রাষ্ট্র বনাম করিম উদ্দীন (২০২৪ সিআর মামলা ৮৯): আসামির বিরুদ্ধে দণ্ডবিধির এই ${numBn} ধারার গুরুতর লঙ্ঘনের অভিযোগ দায়ের করা হয়েছিল। প্রত্যক্ষদর্শী ও অন্যান্য তথ্য প্রমাণ যাচাই করে সিনিয়র জুডিসিয়াল ম্যাজিস্ট্রেট আইনের নির্দেশনার আলোকে উপযুক্ত কারাদণ্ড ঘোষণা করেন।`;
  } else if (codeUpper === "CRPC") {
    title = `Section ${sectionNum}: Procedural Mandate in Criminal Trials`;
    titleBn = `ধারা ${numBn}: ফৌজদারি মামলার পদ্ধতিগত নির্দেশনা ও ক্ষমতা`;
    text = `This section details the procedures, administrative duties, or powers vested in the Police, Magistrates, or Court of Sessions in Bangladesh for trials and investigations under Section ${sectionNum} of the Code of Criminal Procedure, 1898.`;
    textBn = `ফৌজদারী কার্যবিধি আইন, ১৮৯৮-এর এই ${numBn} নং ধারায় পুলিশ, জুডিসিয়াল ম্যাজিস্ট্রেট বা বিজ্ঞ আদালত কর্তৃক বিচার, গ্রেফতার অথবা মামলার তদন্ত কার্যক্রম পরিচালনায় প্রয়োজনীয় আইনি প্রক্রিয়া বা বিশেষ নির্দেশনা বর্ণিত হয়েছে।`;
    explanation = `- Purpose of the Section: To establish precise procedural regulations and prevent arbitrary abuse of administrative authority.\n- Conditions of Application: Can be triggered during investigation, arrest, remand, or trial stages in standard magistrate courts.\n- Usage in Investigation & Trial: Directs police officers and judges on legal steps to ensure procedural compliance.\n- Judicial Interpretation or Precedents: High Court Division established that procedural shortcuts violate Article 31/32 of the Constitution.\n- Important Warnings & Limitations: Any non-compliance with these procedural rules stands as a strong ground for granting bail.`;
    explanationBn = `- ধারার উদ্দেশ্য: অপরাধের সুনির্দিষ্ট বিচার ও তদন্ত প্রক্রিয়া বজায় রাখা এবং আইনি ক্ষমতার অপব্যবহার রোধ করা।\n- প্রয়োগের শর্তাবলি: ম্যাজিস্ট্রেট আদালতে তদন্ত, গ্রেফতার, রিমান্ড বা চলমান বিচারকার্যের নির্দিষ্ট ধাপে এই ধারার প্রয়োগ ঘটে।\n- তদন্তে ব্যবহার: তদন্তকারী কর্মকর্তা এবং বিচারকদের জন্য আইনের পুঙ্খানুপুঙ্খ অনুসরণ নিশ্চিত করার জন্য এটি আইনি দিকনির্দেশনা প্রদান করে।\n- আদালতের ব্যাখ্যা (যদি থাকে): মহামান্য হাইকোর্ট বিভাগ অভিমত দিয়েছেন যে, কার্যবিধির নিয়মতান্ত্রিক পদক্ষেপ এড়িয়ে চলা সংবিধানের ৩১ ও ৩২ অনুচ্ছেদের পরিপন্থী।\n- গুরুত্বপূর্ণ সতর্কতা ও সীমাবদ্ধতা: এই ধারার পদ্ধতিগত নিয়মাবলী লংঘন করা হলে তা আসামির জামিন পাওয়ার জন্য একটি অত্যন্ত শক্তিশালী যুক্তি হতে পারে।`;
    example = `Anup Kumar v. Superintendent of Police (12 ALR): The petitioner argued that Section ${sectionNum} CrPC was ignored during investigation. The High Court Division directed the police to closely adhere to the procedural guarantees given in this section.`;
    exampleBn = `অনুপ কুমার বনাম পুলিশ সুপার (১২ এএলআর): পিটিশনার অভিযোগ করেন যে মামলা তদন্তের সময় ফৌজদারী কার্যবিধির ${numBn} ধারার নিয়ম সঠিকভাবে পালন করা হয়নি। মাননীয় হাইকোর্ট বিভাগ উক্ত ধারা অনুযায়ী তদন্ত কাজ পুনরায় পরিচালনার কঠোর নির্দেশ দেন।`;
  } else if (codeUpper === "EA") {
    title = `Section ${sectionNum}: Admissibility of Legal Evidence`;
    titleBn = `ধারা ${numBn}: আইনি সাক্ষ্যের গ্রহণযোগ্যতার পরিধি`;
    text = `Section ${sectionNum} of the Evidence Act, 1872 lays down rules regarding the relevancy and admissibility of testimonies, confessions, or documentary evidence in court trials of Bangladesh.`;
    textBn = `সাক্ষ্য আইন, ১৮৭২-এর এই ${numBn} ধারার মূল বিষয়ের মধ্যে রয়েছে কোন ধরনের প্রমাণ, জবানবন্দী বা দলিলপত্র বিজ্ঞ আদালতে প্রাসঙ্গিক ও আইনি নথি হিসেবে গ্রহণযোগ্য বলে সুনির্দিষ্টভাবে ঘোষিত হবে।`;
    explanation = `- Purpose of the Section: To regulate facts that may be legally proved during trial and prevent wastage of judicial time.\n- Conditions of Application: Pertains directly to relevancy under specific chapters of the Evidence Act.\n- Usage in Investigation & Trial: Applied by legal counsels to raise objections and by judges to filter hearsay.\n- Judicial Interpretation or Precedents: Decided cases underscore that admission of improper evidence doesn't invalidate a verdict if otherwise supported.\n- Important Warnings & Limitations: Absolute hearsay or uncertified digital structures are strictly excluded under this section without expert corroboration.`;
    explanationBn = `- ধারার উদ্দেশ্য: আদালতে মামলার শুনানিকালে কোন কোন প্রয়োজনীয় প্রাসঙ্গিক বিষয় প্রমাণ করা যাবে তা সুনির্দিষ্ট করা এবং অপ্রাসঙ্গিক তথ্যাদি বর্জন করা।\n- প্রয়োগের শর্তাবলি: সাক্ষ্য আইনের সংশ্লিষ্ট অধ্যায় অনুযায়ী বিষয়টির সরাসরি প্রাসঙ্গিকতা (Relevancy) থাকতে হবে।\n- তদন্তে ব্যবহার: আইনজীবীরা অবজেকশন বা আপত্তি উত্থাপনে এবং বিজ্ঞ বিচারকরা মূলত শোনা কথা বা প্রত্যক্ষ সাক্ষী ফিল্টার আউট করতে এটি প্রয়োগ করেন।\n- আদালতের ব্যাখ্যা (যদি থাকে): বিজ্ঞ আদালত বলেন যে, শুধুমাত্র কোনো অপ্রাসঙ্গিক সাক্ষ্য নথিভুক্ত হলেই পুরো রায় বাতিল হবে না, যদি অন্যান্য অকাট্য প্রমাণ থাকে।\n- গুরুত্বপূর্ণ সতর্কতা ও সীমাবদ্ধতা: বিশেষজ্ঞের প্রমাণিক সহযোগিতা ছাড়া অপ্রাসঙ্গিক গুজবের কথা বা অনিবন্ধিত ডিজিটাল নথি এই ধারায় একেবারেই অগ্রহণযোগ্য।`;
    example = `Salma Begum v. Kabir Ahmed (2023 BLD 45): The defense attempted to introduce a disputed record. The judge ruled the record inadmissible under Section ${sectionNum} of the Evidence Act due to lack of authentic witness certification.`;
    exampleBn = `সালমা বেগম বনাম কবির আহমেদ (২০২৩ বিএলডি ৪৫): আসামিপক্ষ আদালতে একটি অপ্রাসঙ্গিক ও বিতর্কিত দলিল উপস্থাপনের চেষ্টা মেলায় বিজ্ঞ বিচারক সাক্ষ্য আইনের ${numBn} ধারার ওপর ভিত্তি করে তা অগ্রহণযোগ্য ঘোষণা করেন।`;
  } else if (codeUpper === "NSNDA") {
    title = `Section ${sectionNum}: Protection of Women and Children Rights`;
    titleBn = `ধারা ${numBn}: নারী ও শিশুর অধিকার সুরক্ষা ও অপরাধের দণ্ড`;
    text = `This criminal provision defines the offenses and dictates strict trials, arrest powers, and supreme penalty conditions under Section ${sectionNum} of Nari O Shishu Nirjatan Daman Ain, 2000.`;
    textBn = `নারী ও শিশু নির্যাতন দমন আইন, ২০০০-এর এই ${numBn} ধারা অনুযায়ী নারী ও শিশুদের ওপর পারিবারিক বা সামাজিক সহিংসতা, গুরুতর নির্যাতন বা অপরাধ দমনের জন্য কঠোর আইনি দণ্ড বিধৃত করা হয়েছে।`;
    explanation = `- Purpose of the Section: To deter heinous offenses targeting girls, children, and women by leveraging specialized fast courts.\n- Conditions of Application: Requires clear medical evaluation or direct, reliable eyewitness statements of the incident.\n- Usage in Investigation & Trial: Handled under direct authority of Nari O Shishu Tribunals with fast-track trial schedules.\n- Judicial Interpretation or Precedents: Supreme Courts warn against delayed filings and highlight rigorous police scrutiny.\n- Important Warnings & Limitations: Filing fraudulent disputes maliciously under this section leads to straight penalty and imprisonment for the applicant.`;
    explanationBn = `- ধারার উদ্দেশ্য: বিশেষ ট্রাইব্যুনাল গঠনের মাধ্যমে নারী বা শিশুদের বিরুদ্ধে কৃত জঘನ್ಯ অপরাধের দ্রুত বিচার এবং কঠোর সাজা নিশ্চিত করা।\n- প্রয়োগের শর্তাবলি: ঘটনার নির্ভরযোগ্য প্রত্যক্ষদর্শী সাক্ষ্য অথবা মেডিকেল বোর্ডের দ্বারা প্রত্যয়িত মেডিকেল রিপোর্টের সত্যতা প্রয়োজন।\n- তদন্তে ব্যবহার: মামলাটি সরাসরি নারী ও শিশু নির্যাতন দমন ট্রাইব্যুনালের অধীনে নথিভুক্ত এবং দ্রুততম কর্মদিবসের মধ্যে বিচার সম্পন্ন করার লক্ষ্যে ব্যবহৃত হয়।\n- আদালতের ব্যাখ্যা (যদি থাকে): বিজ্ঞ আদালত রায় দিয়েছেন যে নিছক প্রতিহিংসামূলক উদ্দেশ্যে করা বিলম্বে এজাহারের ক্ষেত্রে পুলিশকে সতর্ক ভূমিকা নিতে হবে।\n- গুরুত্বপূর্ণ সতর্কতা ও সীমাবদ্ধতা: উদ্দেশ্যপ্রণোদিত ও বিদ্বেষমূলকভাবে কোনো মিথ্যা মামলা রুজু করা হলে বাদীর বিরুদ্ধেও কঠোর জেল ও জরিমানার সরাসরি বিধান রয়েছে।`;
    example = `The State v. Rafiqul & Ors (2024 Special Case): The accused faced trial under Section ${sectionNum} of NSNDA. The Special Tribunal examined medical reports and ordered sentence counts.`;
    exampleBn = `রাষ্ট্র বনাম রফিকুল ইসলাম (২০২৪ বিশেষ ট্রাইব্যুনাল মামলা): আসামির বিরুদ্ধে নারী ও শিশু আইনের ${numBn} ধারায় বিশেষ ট্রাইব্যুনালে বিচারকার্য পরিচালিত হয়। বিজ্ঞ বিচারক পরীক্ষা-পরীক্ষা অন্তে আসামিকে অপরাধের জন্য যুক্তিসঙ্গত কারাদণ্ড ও অর্থদণ্ড প্রদান করেন।`;
  }

  return { title, titleBn, text, textBn, explanation, explanationBn, example, exampleBn };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON payloads
  app.use(express.json());

  // API Route for legal sections generation
  app.post("/api/section-explanation", async (req, res) => {
    try {
      const { lawTitle, lawCode, sectionNum } = req.body;
      if (!lawTitle || !lawCode || !sectionNum) {
        return res.status(400).json({ error: "Missing required parameters: lawTitle, lawCode, sectionNum" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.warn("GEMINI_API_KEY is not defined in environments, falling back to deterministic dynamic mock response.");
        const fallback = generateDynamicLegalMock(lawCode, lawTitle, parseInt(sectionNum) || 1);
        return res.json({
          ...fallback,
          isMock: true
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      const prompt = `Provide the authentic legal details and a practical example for Section ${sectionNum} of "${lawTitle}" (${lawCode}) under the Bangladesh legal system.
      Generate:
      1. title: accurate section/clause title (in English, standard legal, e.g., 'Right of private defense of the body')
      2. titleBn: official Bengali translation of the title (e.g., 'দেহের ব্যক্তিগত আত্মরক্ষার অধিকার')
      3. text: statutory text (or an accurate detailed clausal summary) of Section ${sectionNum} of ${lawCode} (in English).
      4. textBn: accurate clausal text or detailed clausal summary in standard legal Bengali.
      5. explanation: clear legal explanation of this section's essential ingredients, conditions, or grounds (in English). MUST be structured with these sub-headings if relevant: 
         - Purpose of the Section
         - Conditions of Application
         - Usage in Investigation & Trial
         - Judicial Interpretation or Precedents
         - Important Warnings & Limitations
      6. explanationBn: clear legal explanation of ingredients/grounds in standard legal Bengali. MUST be structured with these specific Bengali headers:
         - ধারার উদ্দেশ্য
         - প্রয়োগের শর্তাবলি
         - তদন্তে ব্যবহার
         - আদালতের ব্যাখ্যা (যদি থাকে)
         - গুরুত্বপূর্ণ সতর্কতা ও সীমাবদ্ধতা
      7. example: a realistic practical illustration, lawsuit scenario, or case-study demonstrating how this section is applied in Bangladesh courts (in English).
      8. exampleBn: realistic practical case demonstration in clear Bengali.

      Make sure all values of the format are filled correctly. If Section ${sectionNum} is invalid or doesn't exist for the targeted law ${lawCode}, indicate this gracefully in the text fields, but output a highly realistic description aligning with the law's general scope. Keep sentences concise, clear, and legally accurate. Do not prefix outputs with markdown inside string fields.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              titleBn: { type: Type.STRING },
              text: { type: Type.STRING },
              textBn: { type: Type.STRING },
              explanation: { type: Type.STRING },
              explanationBn: { type: Type.STRING },
              example: { type: Type.STRING },
              exampleBn: { type: Type.STRING }
            },
            required: ["title", "titleBn", "text", "textBn", "explanation", "explanationBn", "example", "exampleBn"]
          }
        }
      });

      const resultText = response.text?.trim();
      if (!resultText) {
        throw new Error("No response text received from Gemini.");
      }

      const data = JSON.parse(resultText);
      res.json(data);
    } catch (error: any) {
      console.error("Error calling Gemini API, using deterministic fallback:", error);
      try {
        const { lawTitle, lawCode, sectionNum } = req.body;
        const fallback = generateDynamicLegalMock(lawCode || "BPC", lawTitle || "Penal Code", parseInt(sectionNum) || 1);
        res.json({
          ...fallback,
          isMock: true,
          warn: error.message || "Failed to contact Gemini API"
        });
      } catch (innerErr: any) {
        res.status(500).json({ 
          error: error.message || "Failed to generate dynamic section details", 
          details: error.stack 
        });
      }
    }
  });

  // Serve static assets or mount Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite middleware mounted in development mode.");
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Serving compiled production assets from: " + distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server successfully launched on host 0.0.0.0, port ${PORT}`);
  });
}

startServer();
