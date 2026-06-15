import { Law, Update } from "./types";

export const LAWS: Law[] = [
  {
    id: "crpc1898",
    code: "CrPC",
    title: "Code of Criminal Procedure",
    titleBn: "ফৌজদারী কার্যবিধি আইন, ১৮৯৮",
    year: 1898,
    category: "Procedural",
    color: "#1A5276",
    icon: "🏛️",
    totalSections: 565,
    description: "The primary procedural law for trials, arrest, and criminal proceedings.",
    descriptionBn: "ফৌজদারি মামলার বিচার, গ্রেফতার এবং কার্যধারা পরিচালনার মূল পদ্ধতিগত আইন।",
    chapters: [
      { num: 1, title: "Preliminary", titleBn: "প্রাথমিক", sections: "1-5" },
      { num: 5, title: "Arrest of Persons", titleBn: "ব্যক্তি গ্রেফতার", sections: "46-67" },
      { num: 14, title: "Information to Police and Powers to Investigate", titleBn: "পুলিশের নিকট সংবাদ সরবরাহ এবং তদন্ত ক্ষমতা", sections: "154-176" }
    ],
    sections: [
      { id: "crpc-54", num: 54, title: "Arrest without warrant", titleBn: "পরোয়ানা ছাড়া গ্রেফতার", text: "Any police officer may, without an order from a Magistrate and without a warrant, arrest any person who has been concerned in any cognizable offence.", textBn: "যেকোনো পুলিশ কর্মকর্তা ম্যাজিস্ট্রেটের আদেশ বা পরোয়ানা ছাড়াই কোনো আমলযোগ্য অপরাধে জড়িত কোনো ব্যক্তিকে গ্রেফতার করতে পারেন।", chapter: 5, tag: ["arrest", "warrant", "গ্রেফতার"], isFavorite: false },
      { id: "crpc-154", num: 154, title: "Information in cognizable cases", titleBn: "আমলযোগ্য মামলার এজাহার (এফআইআর)", text: "Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him.", textBn: "আমলযোগ্য অপরাধ সংঘটন সংক্রান্ত তথ্য থানার ভারপ্রাপ্ত কর্মকর্তাকে মৌখিকভাবে দেওয়া হলে তা অবশ্যই লিখিত রূপ দিতে হবে যা এজাহার (FIR) নামে পরিচিত।", chapter: 14, tag: ["FIR", "police", "এজাহার"], isFavorite: false },
      { id: "crpc-167", num: 167, title: "Procedure when investigation cannot be completed in 24 hours", titleBn: "২৪ ঘণ্টার মধ্যে তদন্ত শেষ না হওয়া সংক্রান্ত নির্দেশিকা", text: "Whenever any person is arrested and detained in custody, and it appears that the investigation cannot be completed within twenty-four hours, the officer shall transmit to a Magistrate a copy of entries in the diary and apply for custody.", textBn: "গ্রেফতারকৃত ব্যক্তির বিরুদ্ধে তদন্তের কাজ ২৪ ঘণ্টার মধ্যে শেষ করা সম্ভব না হলে পুলিশ কর্মকর্তা ডায়েরির বিবরণসহ আসামিকে ম্যাজিস্ট্রেটের সম্মুখে সোপর্দ করে রিমান্ড আবেদন করবেন।", chapter: 14, tag: ["remand", "custody", "রিমান্ড"], isFavorite: false }
    ]
  },
  {
    id: "bpc1860",
    code: "BPC",
    title: "Bangladesh Penal Code",
    titleBn: "দণ্ডবিধি আইন, ১৮৬০",
    year: 1860,
    category: "Criminal",
    color: "#C0392B",
    icon: "⚖️",
    totalSections: 511,
    description: "The primary penal law defining offences and prescribing punishments.",
    descriptionBn: "অপরাধের সংজ্ঞা ও দণ্ডের বিধান সম্বলিত প্রধান পেনাল কোড বা দণ্ডবিধি।",
    chapters: [
      { num: 1, title: "Introduction", titleBn: "ভূমিকা", sections: "1-5" },
      { num: 3, title: "Of Punishments", titleBn: "দণ্ড ও শাস্তি", sections: "53-75" },
      { num: 16, title: "Offences Affecting Human Body", titleBn: "মানব দেহের বিরুদ্ধে অপরাধসমূহ", sections: "299-377" }
    ],
    sections: [
      { id: "bpc-302", num: 302, title: "Punishment for murder", titleBn: "হত্যার দণ্ড বা শাস্তি", text: "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.", textBn: "কোনো ব্যক্তি হত্যাকাণ্ড বা খুন সংঘটন করলে সে মৃত্যুদণ্ড অথবা যাবজ্জীবন কারাদণ্ডে দণ্ডিত হবে এবং তদুপরি অর্থদণ্ডেও দায়ী হবে।", chapter: 16, tag: ["murder", "death penalty", "খুন", "হত্যা"], isFavorite: false },
      { id: "bpc-379", num: 379, title: "Punishment for theft", titleBn: "চুরির দণ্ড", text: "Whoever commits theft shall be punished with imprisonment of either description for a term which may extend to three years, or with fine, or with both.", textBn: "যে ব্যক্তি চুরির অপরাধ সংঘটন করবে সে অনূর্ধ্ব তিন বছরের সশ্রম বা বিনাশ্রম কারাদণ্ড, অথবা অর্থদণ্ড বা উভয় দণ্ডে দণ্ডিত হবে।", chapter: 17, tag: ["theft", "property", "চুরি"], isFavorite: false }
    ]
  },
  {
    id: "evidence1872",
    code: "EA",
    title: "Evidence Act",
    titleBn: "সাক্ষ্য আইন, ১৮৭২",
    year: 1872,
    category: "Evidence",
    color: "#117A65",
    icon: "🧾",
    totalSections: 167,
    description: "Defines which evidence is admissible in a court of law.",
    descriptionBn: "আদালতে কোন সাক্ষ্য গ্রহণযোগ্য এবং তা প্রমাণের নিয়মাবলী নির্ধারণকারী আইন।",
    chapters: [
      { num: 1, title: "Relevancy of Facts", titleBn: "ঘটনার প্রাসঙ্গিকতা", sections: "1-55" },
      { num: 2, title: "Proof of Facts", titleBn: "প্রমাণ পদ্ধতি", sections: "56-100" }
    ],
    sections: [
      { id: "ea-25", num: 25, title: "Confession to police officer not to be proved", titleBn: "পুলিশের কাছে স্বীকারোক্তির অগ্রহণযোগত্যা", text: "No confession made to a police officer shall be proved as against a person accused of any offence.", textBn: "কোনো অপরাধে অভিযুক্ত ব্যক্তি পুলিশ কর্মকর্তার নিকট দোষ স্বীকার করলে তা তার বিরুদ্ধে আদালতে প্রমাণ হিসেবে ব্যবহার করা যাবে না।", chapter: 1, tag: ["confession", "police", "সাক্ষী"], isFavorite: false },
      { id: "ea-32", num: 32, title: "Dying declaration admissibility", titleBn: "মৃত্যুঝুঁকিতে থাকা ব্যক্তির বক্তব্য (ডাইং ডিক্লেয়ারেশন)", text: "Statements, written or verbal, of relevant facts made by a person who is dead, or who cannot be found, are relevant in cases relating to the cause of his death.", textBn: "মৃত ব্যক্তির মৃত্যুর কারণ সম্পর্কিত প্রাসঙ্গিক মৌখিক বা লিখিত বক্তব্য (মৃত্যুশয্যাপীড়িত ঘোষণা) আদালতে অত্যন্ত গুরুত্বপূর্ণ সাক্ষ্য হিসেবে গ্রহণযোগ্য।", chapter: 1, tag: ["dying declaration", "evidence", "মৃত্যুকালীন জবানবন্দী"], isFavorite: false }
    ]
  },
  {
    id: "police1861",
    code: "PA",
    title: "Police Act",
    titleBn: "পুলিশ আইন, ১৮৬১",
    year: 1861,
    category: "Administrative",
    color: "#2C3E50",
    icon: "👮",
    totalSections: 46,
    description: "The act organizing, empowering, and regulating the police force.",
    descriptionBn: "পুলিশ বাহিনীর সংগঠন, শৃঙ্খলা, ক্ষমতা ও পরিচালনার মূল আইন।",
    chapters: [
      { num: 1, title: "Constitution and Duties", titleBn: "গঠন ও দায়িত্বসমূহ", sections: "1-46" }
    ],
    sections: [
      { id: "pa-23", num: 23, title: "Duties of Police officers", titleBn: "পুলিশ কর্মকর্তাদের সাধারণ দায়িত্বসমূহ", text: "It shall be the duty of every police officer promptly to obey and execute all orders and warrants lawfully issued to him; to collect and communicate intelligence affecting the public peace.", textBn: "আইন সংগত নির্দেশ ও ওয়ারেন্ট অবিলম্বে পালন বা কার্যকর করা, জনশান্তি বিঘ্নকারী তথ্য সংগ্রহ ও ঊর্ধ্বতন কর্তৃপক্ষকে জানানো প্রতিটি পুলিশ সদস্যের আইনি কর্তব্য।", chapter: 1, tag: ["police", "duties", "পুলিশের দায়িত্ব"], isFavorite: false },
      { id: "pa-29", num: 29, title: "Penalties for neglect of duty", titleBn: "দায়িত্ব অবহেলায় শাস্তি ও জরিমানা", text: "Every police officer who shall be guilty of any violation of duty or willful breach or neglect of any rule or regulation shall be liable to penalty and salary cut.", textBn: "কোনো পুলিশ কর্মকর্তা নিজের দায়িত্বের প্রতি অবহেলা, ইচ্ছাকৃত বিধিভঙ্গ বা অসদাচরণের জন্য দোষী সাব্যস্ত হলে তা দণ্ডনীয় অপরাধ এবং বেতন কাটার যোগ্য অপরাধ হবে।", chapter: 1, tag: ["penalty", "neglect", "অবহেলা"], isFavorite: false }
    ]
  },
  {
    id: "prb1943",
    code: "PRB",
    title: "Police Regulations Bengal",
    titleBn: "প্রবিধান, ১৯৪৩",
    year: 1943,
    category: "Administrative",
    color: "#34495E",
    icon: "📕",
    totalSections: 1290,
    description: "The historic administrative and regulatory rules governing police actions (popularly known as PRB).",
    descriptionBn: "পুলিশ বাহিনী কীভাবে কাজ করবে, কীভাবে তদন্ত করবে তার বিস্তারিত নির্দেশাবলী সম্বলিত প্রবিধান (PRB)।",
    chapters: [
      { num: 1, title: "General Guidelines", titleBn: "সাধারণ নীতিমালা", sections: "1-100" },
      { num: 5, title: "Investigation Process", titleBn: "তদন্ত প্রক্রিয়া ও ডায়েরি লিখন", sections: "200-350" }
    ],
    sections: [
      { id: "prb-254", num: 254, title: "Case Diary maintenance", titleBn: "কেস ডায়েরি (সিডি) লেখার নিয়ম", text: "Every officer investigating an offence shall enter his day-to-day proceedings in a diary prescribed by law with absolute precision.", textBn: "তদন্তকারী কর্মকর্তা ফৌজদারী মামলার অগ্রগতির বিবরণ প্রতিদিন কেস ডায়েরিতে যথাযথভাবে সংরক্ষণ করবেন।", chapter: 5, tag: ["case diary", "investigation", "কেস ডায়েরি"], isFavorite: false }
    ]
  },
  {
    id: "nari2000",
    code: "NSNDA",
    title: "Nari O Shishu Nirjatan Daman Ain",
    titleBn: "নারী ও শিশু নির্যাতন দমন আইন, ২০০০",
    year: 2000,
    category: "Special",
    color: "#E67E22",
    icon: "🛡️",
    totalSections: 34,
    description: "Special law designed to curb crimes and physical abuse against women and children.",
    descriptionBn: "নারী ও শিশুদের ওপর সহিংসতা এবং নির্যাতন দমনের লক্ষ্যে প্রণীত বিশেষ কঠোর আইন।",
    chapters: [
      { num: 1, title: "Offences and Trial", titleBn: "অপরাধ ও বিশেষ আদালত বিচার", sections: "1-34" }
    ],
    sections: [
      { id: "nsnda-9", num: 9, title: "Punishment for Rape", titleBn: "ধর্ষণের দণ্ড ও সাজা", text: "Whoever commits rape shall be punished with rigorous imprisonment for life, and if the victim dies as a result, the punishment shall be death or life imprisonment.", textBn: "যে ব্যক্তি কোনো নারী বা শিশুকে ধর্ষণ করবে, সে যাবজ্জীবন সশ্রম কারাদণ্ডে দণ্ডিত হবে এবং ধর্ষণের ফলে মৃত্যু ঘটলে মৃত্যুদণ্ড বা যাবজ্জীবন সশ্রম সাজা হবে।", chapter: 1, tag: ["rape", "women safety", "নারী নির্যাতন"], isFavorite: false },
      { id: "nsnda-11", num: 11, title: "Punishment for dowry violence", titleBn: "যৌতুকের জন্য সাধারণ বা গুরুতর আঘাতের সাজা", text: "If body injuries are caused for dowry demands, the perpetrator shall be punished with rigorous imprisonment or death in severe cases.", textBn: "যৌতুকের দাবিতে কোনো নারীর ক্ষতি সাধন বা মৃত্যু ঘটানোর চেষ্টা করলে অপরাধী মৃত্যুদণ্ড, যাবজ্জীবন কারাদণ্ড বা অনূর্ধ্ব ৫ বছর কারাদণ্ডে দণ্ডিত হবে।", chapter: 1, tag: ["dowry", "violence", "যৌতুক"], isFavorite: false }
    ]
  },
  {
    id: "children2013",
    code: "CA",
    title: "Children Act",
    titleBn: "শিশু আইন, ২০১৩",
    year: 2013,
    category: "Special",
    color: "#8E44AD",
    icon: "👶",
    totalSections: 97,
    description: "Provisions aligned with child rights and established Juvenile Courts.",
    descriptionBn: "জাতিসংঘের শিশু অধিকার সনদের আলোকে শিশুদের সুরক্ষা ও শিশু আদালত সংক্রান্ত আইন।",
    chapters: [
      { num: 1, title: "Jurisdiction & Juvenile Justice", titleBn: "শিশু অধিকার ও বিচার ব্যবস্থার এখতিয়ার", sections: "1-97" }
    ],
    sections: [
      { id: "ca-17", num: 17, title: "Establishment of Child Court", titleBn: "শিশু আদালত প্রতিষ্ঠা ও মর্যাদা", text: "The government shall establish child courts in every district to try cases involving child offenders or victims.", textBn: "আইন লঙ্ঘনকারী বা অপরাধের শিকার শিশুদের মামলার পৃথক ট্রায়াল পরিচালনার জন্য প্রতিটি জেলায় বিশেষ বা শিশু আদালত গঠন করার বাধ্যবাধকতা রয়েছে।", chapter: 1, tag: ["child court", "juvenile", "শিশু আদালত"], isFavorite: false },
      { id: "ca-52", num: 52, title: "Prohibition of sentencing death or life imprisonment to a child", titleBn: "শিশুকে মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ড প্রদান নিষিদ্ধতা", text: "Notwithstanding anything contained in any other law, no child under 18 shall be sentenced to death, or imprisonment for life.", textBn: "অন্য যেকোনো আইনে যাই থাকুক না কেন, অপরাধের সময় অনূর্ধ্ব ১৮ বছর বয়সী শিশুকে কোনো অবস্থাতেই মৃত্যুদণ্ড বা যাবজ্জীবন সশ্রম কারাদণ্ড দেওয়া যাবে না।", chapter: 1, tag: ["child penalty", "juvenile justice", "নিষেধাজ্ঞা"], isFavorite: false }
    ]
  },
  {
    id: "arms1878",
    code: "AA",
    title: "Arms Act",
    titleBn: "অস্ত্র আইন, ১৮৭৮",
    year: 1878,
    category: "Special",
    color: "#7F8C8D",
    icon: "🔫",
    totalSections: 33,
    description: "Law regulating the manufacture, sale, possession, and export of firearms and ammunition.",
    descriptionBn: "আগ্নেয়াস্ত্র প্রস্তুত, বিক্রয়, বহন, লাইসেন্স এবং অবৈধ আগ্নেয়াস্ত্র রাখার শাস্তির প্রধান আইন।",
    chapters: [
      { num: 1, title: "Manufacture, Sale and Possession", titleBn: "প্রস্তুতকরণ, বিক্রয় এবং নিজের কাছে রাখা", sections: "1-33" }
    ],
    sections: [
      { id: "aa-19", num: 19, title: "Penalties for unlicensed arms", titleBn: "লাইসেন্স ছাড়া অবৈধ অস্ত্রের সাজা", text: "Whoever manufactures, sells, or possesses firearms and ammunition without a license shall be liable to rigorous imprisonment which may extend to life imprisonment.", textBn: "বৈধ লাইসেন্স ছাড়া বা মেয়াদোত্তীর্ণ অবস্থায় অস্ত্র তৈরি, বেচাকেনা বা নিজের কাছে অবৈধভাবে রাখা যাবজ্জীবন বা অন্যান্য মেয়াদের কঠোর কারাদণ্ডের শামিল।", chapter: 1, tag: ["illegal weapon", "jail", "অবৈধ অস্ত্র"], isFavorite: false }
    ]
  },
  {
    id: "nca2018",
    code: "NCA",
    title: "Narcotics Control Act",
    titleBn: "মাদকদ্রব্য নিয়ন্ত্রণ আইন, ২০১৮",
    year: 2018,
    category: "Special",
    color: "#D35400",
    icon: "💊",
    totalSections: 63,
    description: "Comprehensive law regarding drug smuggling, seizure, treatment, and punitive measures.",
    descriptionBn: "মাদক কারবারী, চোরাচালান, সেবন রোধ, শাস্তি এবং পুনর্বাসন সংক্রান্ত আধুনিক আইন।",
    chapters: [
      { num: 1, title: "Offences and Penalties", titleBn: "অপরাধ ও শাস্তির পরিধি", sections: "1-63" }
    ],
    sections: [
      { id: "nca-36", num: 36, title: "Schedule of Drug Offences", titleBn: "মাদকের সারণি ও সাজার তালিকা", text: "Table lists penalties based on weights/quantities of illicit drugs. Severe offenses (e.g., Yaba, Heroin trafficking) face capital punishment or life imprisonment.", textBn: "ইয়াবা, হেরোইন, বরফ ইত্যাদি মাদকের নির্দিষ্ট পরিমাণের অতিরিক্ত চোরাচালান বা ব্যবসার অপরাধের জন্য সর্বোচ্চ মৃত্যুদণ্ড বা যাবজ্জীবন কারাদণ্ডের বিধান রাখা হয়েছে।", chapter: 1, tag: ["drugs", "trafficking", "মাদক"], isFavorite: false }
    ]
  },
  {
    id: "rta2018",
    code: "RTA",
    title: "Road Transport Act",
    titleBn: "সড়ক পরিবহন আইন, ২০১৮",
    year: 2018,
    category: "Transport",
    color: "#27AE60",
    icon: "🚗",
    totalSections: 126,
    description: "Regulates driver licensing, vehicle fitness, road traffic, and penalties for accidental fatalities.",
    descriptionBn: "সড়ক দুর্ঘটনা, ফিটনেসবিহীন গাড়ি চালনা, লাইসেন্সহীন ড্রাইভিং এবং দুর্ঘটনার কঠোর বিচারের আইন।",
    chapters: [
      { num: 1, title: "Licensing and Conduct", titleBn: "লাইসেন্সপ্রাপ্তি এবং চালকের আচরণ", sections: "1-126" }
    ],
    sections: [
      { id: "rta-98", num: 98, title: "Punishment for causing accidents due to reckless driving", titleBn: "বেপরোয়া গাড়ি চালিয়ে গুরুতর আঘাত বা মৃতুর দণ্ড", text: "Reckless, over-speeding, or negligent driving causing severe body harm or fatal accident leading to death of any person shall be penalized under direct section charges.", textBn: "বেপরোয়া স্পীডিং বা অবহেলার কারণে কোনো ব্যক্তি গুরুতর আহত বা মৃত্যুর মুখোমুখি হলে অনূর্ধ্ব ৫ বছরের কারাদণ্ড বা ৫ লক্ষ টাকা জরিমানা বা উভয় দণ্ড হবে।", chapter: 1, tag: ["reckless driving", "accident", "দুর্ঘটনা"], isFavorite: false }
    ]
  },
  {
    id: "railway1890",
    code: "RA",
    title: "Railways Act",
    titleBn: "রেলওয়ে আইন, ১৮৯০",
    year: 1890,
    category: "Transport",
    color: "#2980B9",
    icon: "🚂",
    totalSections: 150,
    description: "Historical act regulating railway infrastructure, travel rules, and damage penalties.",
    descriptionBn: "রেলে যাতায়াতকারীদের সুরক্ষা, অবকাঠামো ধ্বংস, টিকেট জালিয়াতির শাস্তির আইন।",
    chapters: [
      { num: 1, title: "Offences and Penalties", titleBn: "রেলের অপরাধ ও শাস্তি", sections: "100-150" }
    ],
    sections: [
      { id: "ra-101", num: 101, title: "For endangering safety of persons", titleBn: "যাত্রীদের নিরাপত্তা বিপন্ন করার শাস্তি", text: "If any railway servant puts the lives of passengers at risk by neglecting rules, he shall face rigorous jail time or heavy fine.", textBn: "রেলওয়ের কোনো কর্মচারী অবহেলার মাধ্যমে যাত্রীদের জীবন ঝুঁকিতে ফেললে সে সর্বোচ্চ ২ বছরের কারাদণ্ড বা জরিমানায় দণ্ডিত হবে।", chapter: 1, tag: ["railway", "negligence", "রেলওয়ে"], isFavorite: false }
    ]
  },
  {
    id: "dmpo1976",
    code: "DMPO",
    title: "Dhaka Metropolitan Police Ordinance",
    titleBn: "ঢাকা মহানগরী পুলিশ অধ্যাদেশ, ১৯৭৬",
    year: 1976,
    category: "Administrative",
    color: "#16A085",
    icon: "🚔",
    totalSections: 117,
    description: "Specialized police regulations applicable solely within the Dhaka metropolitan territory.",
    descriptionBn: "ঢাকা মেট্রোপলিটন এলাকার শান্তি-শৃঙ্খলা রক্ষা ও ট্রাফিক ব্যবস্থা বা উচ্ছেদ সংক্রান্ত বিশেষ অধ্যাদেশ।",
    chapters: [
      { num: 1, title: "Metropolitan Powers", titleBn: "মেট্রোপলিটন পুলিশের বিশেষ ক্ষমতা", sections: "1-117" }
    ],
    sections: [
      { id: "dmpo-76", num: 76, title: "Power to direct behavior of passengers or crowd", titleBn: "জনশৃঙ্খলা নিয়ন্ত্রণে ও ভিড় নিয়ন্ত্রণে পুলিশের ক্ষমতা", text: "Authorized police may give verbal directions to direct pathways of general public or disperse dangerous assemblies.", textBn: "মেট্রোপলিটন পুলিশ এলাকায় রাস্তায় সাধারণ জনগণের চলাচলের পথ নির্ধারণ এবং বেআইনি সমাবেশ ছত্রভঙ্গ করার মৌখিক আদেশ দেওয়ার ক্ষমতা রয়েছে।", chapter: 1, tag: ["dhaka", "police powers", "ডিএমপি"], isFavorite: false }
    ]
  },
  {
    id: "csa2023",
    code: "CSA",
    title: "Cyber Security Act",
    titleBn: "সাইবার নিরাপত্তা আইন, ২০২৩",
    year: 2023,
    category: "Digital",
    color: "#E74C3C",
    icon: "💻",
    totalSections: 62,
    description: "Replaces DSA; regulates hacking, data privacy, state secret protection, and defamatory digital contents.",
    descriptionBn: "ডিজিটাল নিরাপত্তা আইনের বদলে নতুন সাইবার সিকিউরিটি আইন, যেখানে হ্যাকিং, তথ্য চুরির শাস্তির বিধান রয়েছে।",
    chapters: [
      { num: 1, title: "Digital Offences", titleBn: "সাইবার ও ডিজিটাল অপরাধের শ্রেণীসমূহ", sections: "17-45" }
    ],
    sections: [
      { id: "csa-17", num: 17, title: "Unlawful access to digital system; hacking", titleBn: "হ্যাকিং এবং সিস্টেমের ভিতর অবৈধ প্রবেশ", text: "Deliberately corrupting digital infrastructure or extracting confidential databases illegally will result in severe prosecution.", textBn: "অনুমতি ব্যতীত কোনো কম্পিউটার সিস্টেমে প্রবেশ বা ডেটা নষ্ট করা (হ্যাকিং) জামিন অযোগ্য কঠোর দণ্ডনীয় অপরাধ।", chapter: 1, tag: ["hacking", "system hack", "হ্যাকিং"], isFavorite: false }
    ]
  },
  {
    id: "pshta2012",
    code: "PSHTA",
    title: "Prevention and Suppression of Human Trafficking Act",
    titleBn: "মানব পাচার প্রতিরোধ ও দমন আইন, ২০১২",
    year: 2012,
    category: "Special",
    color: "#962D2D",
    icon: "⛓️",
    totalSections: 47,
    description: "To prevent international human smuggling, child abduction, forced labor and organs extraction.",
    descriptionBn: "অবৈধভাবে বিদেশে মানব পাচার, নারী ও শিশু পাচার প্রতিরোধ এবং কঠোর দণ্ড বিধানের আইন।",
    chapters: [
      { num: 1, title: "Smuggling Cases and Special Tribunal", titleBn: "পাচার অপরাধ এবং বিশেষ ট্রাইব্যুনাল", sections: "1-47" }
    ],
    sections: [
      { id: "pshta-6", num: 6, title: "Trafficking Punishments", titleBn: "মানব পাচারের কঠোর সাজার পরিমাণ", text: "Committing, aiding, or attempting human trafficking inside or outside Bangladesh can lead to rigorous life imprisonment, or death penalty.", textBn: "মানব পাচার অপরাধের সাথে প্রত্যক্ষভাবে জড়িত থাকলে অপরাধীকে মৃত্যুদণ্ড বা যাবজ্জীবন সশ্রম কারাদণ্ড এবং অনন্য মেয়াদের শাস্তি ভোগ করতে হবে।", chapter: 1, tag: ["trafficking", "smuggling", "মানব পাচার"], isFavorite: false }
    ]
  },
  {
    id: "acpa2002",
    code: "ACPA",
    title: "Acid Crime Prevention Act",
    titleBn: "এসিড অপরাধ দমন আইন, ২০০২",
    year: 2002,
    category: "Special",
    color: "#BDC3C7",
    icon: "🧪",
    totalSections: 30,
    description: "Specifies supreme criminal penalties including death for throwing acid on victims' face or skin.",
    descriptionBn: "এসিড নিক্ষেপের মাধ্যমে চেহারা, চোখ ও শারীরিক ক্ষতি সাধনের বিরুদ্ধে দ্রুততম মৃত্যুর দণ্ড সম্বলিত আইন।",
    chapters: [
      { num: 1, title: "Throwing Offences", titleBn: "এসিড নিক্ষেপের কঠোর শাস্তি", sections: "1-30" }
    ],
    sections: [
      { id: "acpa-4", num: 4, title: "Death Penalty for Severe Injury", titleBn: "এসিডে চোখ বা মুখ পোড়ালে মৃত্যুদণ্ড", text: "Throwing acid resulting in complete blindness, disfigurement of face, breasts of women, or sexual organs leads directly to death or life imprisonment.", textBn: "এসিড নিক্ষেপ করে কারো চোখ সম্পূর্ণ অন্ধ, মুখমণ্ডল বিকৃত বা যৌন অঙ্গ ক্ষতিগ্রস্ত করা হলে একমাত্র শাস্তি মৃত্যুদণ্ড বা যাবজ্জীবন সশ্রম সাজা।", chapter: 1, tag: ["acid throw", "murder charge", "এসিড অপরাধ"], isFavorite: false }
    ]
  },
  {
    id: "aca2002",
    code: "ACA",
    title: "Acid Control Act",
    titleBn: "এসিড নিয়ন্ত্রণ আইন, ২০০২",
    year: 2002,
    category: "Special",
    color: "#95A5A6",
    icon: "📥",
    totalSections: 49,
    description: "Restricts industrial import, store license, and commercial sales of aggressive chemicals (acid).",
    descriptionBn: "লাইসেন্স ছাড়া এসিড আমদানি, অননুমোদিত সংরক্ষণ এবং খুচরা বাজারে খোলা বিক্রির উপর নিষেধাজ্ঞা আইন।",
    chapters: [
      { num: 1, title: "Licensing and Sales Control", titleBn: "এসিড লাইসেন্স প্রদান ও নজরদারি", sections: "1-49" }
    ],
    sections: [
      { id: "aca-15", num: 15, title: "Prohibition of sale without license", titleBn: "অননুমোদিত বা লাইসেন্সবিহীন এসিড বিক্রি অপরাধ", text: "Possessing, storing, or selling acid without a proper certificate from the competent authority leads to seizure and imprisonment.", textBn: "সক্ষম জেলা ম্যাজিস্ট্রেটের অনুমতি বই বা লাইসেন্স ব্যতীত বাণিজ্যে ব্যবহারের জন্য বা দোকানে এসিড স্টক রাখা দণ্ডনীয় অপরাধ।", chapter: 1, tag: ["acid license", "control", "এসিড বিক্রয়"], isFavorite: false }
    ]
  },
  {
    id: "ict2006",
    code: "ICT",
    title: "Information and Communication Technology Act",
    titleBn: "তথ্য ও যোগাযোগ প্রযুক্তি আইন, ২০০৬",
    year: 2006,
    category: "Digital",
    color: "#3498DB",
    icon: "📡",
    totalSections: 99,
    description: "Primary legal framework for digital certificates, e-contracting, and historical Section 57 offences.",
    descriptionBn: "ডিজিটাল চুক্তি সম্পন্ন, ইলেকট্রনিক ডকুমেন্টের আইনি স্বীকৃতি এবং সাইবার অপরাধের আদি কাঠামো।",
    chapters: [
      { num: 1, title: "Digital Safety and Signatures", titleBn: "আইসিটি ব্যবহারের নিয়মাবলী ও নিরাপত্তা", sections: "1-99" }
    ],
    sections: [
      { id: "ict-57", num: 57, title: "Publishing defamatory matter in electronic form", titleBn: "ডিজিটাল মাধ্যমে বিভ্রান্তিকর ও মানহানিকর পোস্টের সাজা", text: "Posting false, obscene, or defamatory material on social media tending to deprave, corrupt public order, or harm reputation.", textBn: "ইন্টারনেটে বা ডিজিটাল কোনো পেজে মিথ্যা, অশ্লীল বা ধর্মীয় উস্কানিমূলক পোস্ট শেয়ার করার মাধ্যমে কারো মানহানি ঘটানোর দণ্ড।", chapter: 1, tag: ["ict", "section 57", "সোশ্যাল মিডিয়া"], isFavorite: false }
    ]
  },
  {
    id: "spa1974",
    code: "SPA",
    title: "Special Powers Act",
    titleBn: "বিশেষ ক্ষমতা আইন, ১৯৭৪",
    year: 1974,
    category: "Special",
    color: "#6C3483",
    icon: "🚪",
    totalSections: 38,
    description: "Designed for combating smuggling, printing counterfeit money, and taking preventive detention measures.",
    descriptionBn: "দেশবিরোধী চোরাচালান, জাল নোট তৈরি, মজুদদারী এবং সন্দেহভাজনদের দীর্ঘকালীন আটক রাখার বিশেষ আইন।",
    chapters: [
      { num: 1, title: "Detention and Trial of Special Offences", titleBn: "আটক এবং বিশেষ অপরাধের সাজা", sections: "1-38" }
    ],
    sections: [
      { id: "spa-3", num: 3, title: "Preventive Detention Power", titleBn: "জননিরাপত্তায় সন্দেহভাজনকে আটক করার ক্ষমতা", text: "If the government believes any person is likely to act in dynamic prejudice to national interest, it can detonate detention orders.", textBn: "দেশের নিরাপত্তা বিঘ্ন করার আশঙ্কা তৈরি হলে যেকোনো ব্যক্তিকে পূর্ব সতর্কতামূলকভাবে সরকার বা জেলা প্রশাসক লকআপ বা প্রিভেন্টিভ ডিটেনশন দিতে পারে।", chapter: 1, tag: ["detention", "national security", "বিশেষ ক্ষমতা"], isFavorite: false }
    ]
  },
  {
    id: "pga1867",
    code: "PGA",
    title: "Public Gambling Act",
    titleBn: "প্রকাশ্য জুয়া আইন, ১৮৬৭",
    year: 1867,
    category: "Criminal",
    color: "#F39C12",
    icon: "🎲",
    totalSections: 18,
    description: "Historical act regulating public betting houses, cards tables, and casino raids.",
    descriptionBn: "প্রকাশ্য জায়গায় টাকা দিয়ে তাস বা অন্য জুয়া খেলার উপর নিষেধাজ্ঞা এবং পুলিশের আটকের ক্ষমতা আইন।",
    chapters: [
      { num: 1, title: "Offences Relating to Betting Homes", titleBn: "জুয়া খেলার আখড়া পরিচালনা ও সাজা", sections: "1-18" }
    ],
    sections: [
      { id: "pga-4", num: 4, title: "Penalty for playing cards inside common gaming premises", titleBn: "জুয়া খেলার আসরে বা আখড়ায় উপস্থিত থাকার সাজা", text: "Any individual caught playing inside common gambling systems faces summary lockup and monetary penalty.", textBn: "জুয়া খেলার আখড়া বা সাধারণ কোনো জুয়ার ক্লাবে সশরীরে উপস্থিত থেকে জুয়া খেললে অনূর্ধ্ব জরিমানাসহ কারাদণ্ডের বিধান আছে।", chapter: 1, tag: ["gambling", "casino", "জুয়া খেলা"], isFavorite: false }
    ]
  },
  {
    id: "sta2002",
    code: "LODSTA",
    title: "Law and Order Disrupting Offences (Speedy Trial) Act",
    titleBn: "আইন-শৃঙ্খলা বিষয়ক অপরাধ (দ্রুত বিচার) আইন, ২০০২",
    year: 2002,
    category: "Procedural",
    color: "#CA6F1E",
    icon: "⚡",
    totalSections: 18,
    description: "To expedite judicial processing for heinous acts like extortion, road blocking, and local terrorism.",
    descriptionBn: "রাস্তা অবরোধ, চাঁদাবাজি বা উচ্ছৃঙ্খল পরিস্থিতি সৃষ্টির বিচারের জন্য দ্রুত নিষ্পত্তি সম্পন্ন আদালত আইন।",
    chapters: [
      { num: 1, title: "Speedy Prosecutions", titleBn: "দ্রুত বিচার কার্যক্রম", sections: "1-18" }
    ],
    sections: [
      { id: "sta-4", num: 4, title: "Penalty for disrupting law and order", titleBn: "আইন-শৃঙ্খলা বিঘ্নকারী অপরাধের সাজা ও শাস্তি", text: "Extortion, blocking routes, damaging public/private vehicles can be fast-tracked to face jail time from 2 to 5 years.", textBn: "ত্রাস সৃষ্টি, চাঁদাবাজি বা সরকারি মালপত্র ভাঙচুর ও সড়ক অবরুদ্ধ করার মত মারাত্মক কাজে জড়িত থাকার দণ্ড অনূর্ধ্ব ২-৫ বছর।", chapter: 1, tag: ["speedy trial", "extortion", "দ্রুত বিচার"], isFavorite: false }
    ]
  },
  {
    id: "ea1884",
    code: "EXPA",
    title: "Explosives Act",
    titleBn: "বিস্ফোরক আইন, ১৮৮৪",
    year: 1884,
    category: "Special",
    color: "#BA4A00",
    icon: "💣",
    totalSections: 18,
    description: "Regulates manufacture, license, transit and general import of heavy explosive substances.",
    descriptionBn: "ভারী বিস্ফোরক তৈরি, কারখানা স্থাপন, স্থানান্তর বা ব্যবহারের লাইসেন্স তদারকির আইন।",
    chapters: [
      { num: 1, title: "Licensing of Explosive Materials", titleBn: "বিস্ফোরক লাইসেন্স ও বিধিমালা", sections: "1-18" }
    ],
    sections: [
      { id: "ea1884-5", num: 5, title: "Power to make emergency rules", titleBn: "লাইসেন্স ছাড়াই বিস্ফোরক তৈরির ক্ষেত্রে নিষেধাজ্ঞা", text: "The government imposes total prohibition on carrying gunpowder or storage without rigorous certificate checks.", textBn: "জননিরাপত্তা সুরক্ষায় যেকোনো সময় বিস্ফোরক গান পাউডার বা গান কর্টনের বাণিজ্য সম্পূর্ণ বন্ধ করার সরকারি বিশেষ ক্ষমতা প্রদান।", chapter: 1, tag: ["explosive license", "bombs", "বিস্ফোরক"], isFavorite: false }
    ]
  },
  {
    id: "esa1908",
    code: "ESA",
    title: "Explosive Substances Act",
    titleBn: "বিস্ফোরক দ্রব্যাদি আইন, ১৯০৮",
    year: 1908,
    category: "Special",
    color: "#E22D1F",
    icon: "🔥",
    totalSections: 12,
    description: "Deals criminal scale of punishment including life or execution for causing explosions endangering life.",
    descriptionBn: "বোমা বিস্ফোরণ ঘটিয়ে মানব জীবনের গুরুতর ক্ষতি করার বিরুদ্ধে কঠোর সাজার আইন।",
    chapters: [
      { num: 1, title: "Explosions and Damages", titleBn: "বোমাবাজি এবং জানমালের বড় ক্ষতি", sections: "1-12" }
    ],
    sections: [
      { id: "esa-3", num: 3, title: "Punishment for causing explosion likely to endanger life", titleBn: "জীবন বিপন্নকারী মারাত্মক বিস্ফোরণ ঘটানোর দণ্ড", text: "Any person who unlawfully and maliciously causes an explosion likely to endanger life or cause serious damage.", textBn: "কোনো জনবহুল স্থানে বা স্থাপনায় অবৈধভাবে বোমা বিস্ফোরণ ঘটিয়ে হত্যাচেষ্টা বা গুরুতর আঘাত করলে মৃত্যুদণ্ড বা যাবজ্জীবন সশ্রম সাজা হবে।", chapter: 1, tag: ["bombs", "explosive", "বোমা বিস্ফোরণ"], isFavorite: false }
    ]
  },
  {
    id: "crpa2009",
    code: "CRPA",
    title: "Consumer Rights Protection Act",
    titleBn: "ভেজাল-অধিকার সংরক্ষণ আইন, ২০০৯",
    year: 2009,
    category: "Special",
    color: "#27AE60",
    icon: "🛒",
    totalSections: 82,
    description: "Combats consumer cheating, product adulteration (ভেজাল), false pricing or expired commodities.",
    descriptionBn: "পণ্য সামগ্রীতে ভেজাল মেশানো, মেয়াদের জালিয়াতি এবং দাম বাড়িয়ে প্রতারণার সাজার ভোক্তা অধিকার আইন।",
    chapters: [
      { num: 1, title: "Offences Guarding Consumer Welfare", titleBn: "ভেজাল নিয়ন্ত্রণ ও ভোক্তা অধিকার পরিদপ্তর", sections: "1-82" }
    ],
    sections: [
      { id: "crpa-41", num: 41, title: "Penalty for mixing adulterants", titleBn: "খাদ্যদ্রব্যে ক্ষতিকারক রাসায়নিক বা ভেজাল মিশ্রণের সাজা", text: "Mixing heavy toxic chemicals, colors, or harmful elements in commercial food crops or restaurant dishes drives severe fine.", textBn: "খাবারের প্লেটে বা প্যাকেটজাত সামগ্রীতে ফরমালিন বা অন্য বিষাক্ত রঙ বা রাসায়নিক ব্যবহারের শাস্তি অনূর্ধ্ব ৩ বৎসরের কারাদণ্ড।", chapter: 1, tag: ["adulteration", "consumer protection", "খাদ্য ভেজাল"], isFavorite: false }
    ]
  },
  {
    id: "mlpa2012",
    code: "MLPA",
    title: "Money Laundering Prevention Act",
    titleBn: "মানিলন্ডারিং প্রতিরোধ আইন, ২০১২",
    year: 2012,
    category: "Special",
    color: "#1E8449",
    icon: "💰",
    totalSections: 31,
    description: "To combat illicit flight of capital, transfer of corruption funds and black money legalization overseas.",
    descriptionBn: "অবৈধ উপায়ে ব্যাংক ডেকোরেটের টাকা স্থানান্তর এবং হুণ্ডির মাধ্যমে অর্থপাচার প্রতিরোধের কঠিন আইন।",
    chapters: [
      { num: 1, title: "Laundering Measures", titleBn: "মানিলন্ডারিং দমন অপরাধের ধরন ও শাখা", sections: "1-31" }
    ],
    sections: [
      { id: "mlpa-4", num: 4, title: "Punishment for Money Laundering", titleBn: "মানিলন্ডারিং ও বিদেশে টাকা পাচারের দণ্ড", text: "Attempting or helping to conceal illicit money gains abroad leads to sentencing from 4 to 12 years and freezing assets.", textBn: "কোনো নাগরিক হুণ্ডি বা চোরাচালানের উপার্জিত টাকা বিদেশে প্রেরণ বা আত্মসাৎ করলে অনূর্ধ্ব ৪ থেকে ১২ বছরের জেল এবং সম্পত্তি বাজেয়াপ্ত হবে।", chapter: 1, tag: ["money laundering", "assets", "টাকা পাচার"], isFavorite: false }
    ]
  },
  {
    id: "dvppa2010",
    code: "DVPPA",
    title: "Domestic Violence (Prevention and Protection) Act",
    titleBn: "পারিবারিক সহিংসতা (প্রতিরোধ ও সুরক্ষা) আইন, ২০১০",
    year: 2010,
    category: "Special",
    color: "#AE2E92",
    icon: "🏡",
    totalSections: 37,
    description: "Secures legal status for battered partners, immediate protection orders, and curbs domestic assaults.",
    descriptionBn: "পারিবারিক দ্বন্দ্বের কারণে শারিরীক ও মানসিক নির্যাতন প্রতিরোধে সুরক্ষাপ্রাপ্তি ও আদালতের আদেশের আইন।",
    chapters: [
      { num: 1, title: "Protection Orders", titleBn: "পারিবারিক সুরক্ষা প্রদান বিধি", sections: "1-37" }
    ],
    sections: [
      { id: "dvppa-30", num: 30, title: "Breach of protection order penalty", titleBn: "আদালত প্রদত্ত পারিবারিক সুরক্ষা আদেশ লঙ্ঘনের সাজা", text: "If the offender breaches an emergency residence order, court implements summary arrest without further investigations.", textBn: "পীড়িত ব্যক্তির সুরক্ষায় আদালত কোনো বাড়িছাড়া বা অবমাননার নিষেধাজ্ঞা দিলে, বিবাদী তা লঙ্ঘন করলে সরাসরি গ্রেফতার ও শাস্তিযোগ্য।", chapter: 1, tag: ["domestic help", "restraining order", "পারিবারিক সহিংসতা"], isFavorite: false }
    ]
  },
  {
    id: "gsdar2018",
    code: "GSDAR",
    title: "Government Servants (Discipline and Appeal) Rules",
    titleBn: "सरकारी कर्मचारी (শৃঙ্খলা ও আপিল) বিধিমালা, ২০১৮",
    year: 2018,
    category: "Administrative",
    color: "#6E2C00",
    icon: "💼",
    totalSections: 32,
    description: "Specifies suspension protocols, inquiry committees and departmental charges on public servants.",
    descriptionBn: "সরকারি কর্মকর্তা ও কর্মচারীদের কড়া শৃঙ্খলা, চাকরি থেকে বহিষ্কার বা বিভাগীয় মামলা ও আপিল রুলস।",
    chapters: [
      { num: 1, title: "Departmental Penalties", titleBn: "বিভাগীয় অসদাচরণ ও দণ্ডসমূহ", sections: "1-32" }
    ],
    sections: [
      { id: "gsdar-4", num: 4, title: "Minor and Major penalties", titleBn: "লঘু এবং গুরু দণ্ডের সারণি", text: "Lists salaries deduction, censure, or outright removal and compulsory retirement for verified corruption or misconduct.", textBn: "কর্মচারীর দুর্নীতি বা অসদাচরণের জন্য তিরস্কার, বেতন স্কেল কমানো, সাময়িক বরখাস্ত বা চাকরি থেকে স্থায়ী বহিষ্কারের বিধান।", chapter: 1, tag: ["government servant", "disciplinary", "সবকারি বিধিমালা"], isFavorite: false }
    ]
  },
  {
    id: "cmra2017",
    code: "CMRA",
    title: "Child Marriage Restraint Act",
    titleBn: "বাল্যবিবাহ নিরোধ আইন, ২০১৭",
    year: 2017,
    category: "Special",
    color: "#E056FD",
    icon: "👰",
    totalSections: 22,
    description: "Regulates underage marriages (defined as Male < 21, Female < 18) and prescribes penalties for registrars and guardians.",
    descriptionBn: "অনূর্ধ্ব বয়সের বালক বা বালিকার অনৈতিক পারিবারিক বিয়ে প্রতিরোধ এবং কাজী বা অভিভাবকদের সাজার আইন।",
    chapters: [
      { num: 1, title: "Prohibition Schemes", titleBn: "কড়া বাল্যবিবাহ নিরোধ বিধি", sections: "1-22" }
    ],
    sections: [
      { id: "cmra-8", num: 8, title: "Punishment for solemnizing child marriage", titleBn: "বাল্যবিবাহ সম্পন্ন করা বা সাহায্য করার সাজা", text: "Whoever conducts or aids underage marriage ceremony (such as parents, guardian, or registrar) faces direct criminal jail time.", textBn: "কাজী, কোনো অভিভাবক বা সাক্ষী যদি জেনেশুনে অনূর্ধ্ব বয়সের ছেলে-মেয়ের বিয়ে দেয় তবে ২ বছরের কঠোর জেল হতে পারে।", chapter: 1, tag: ["child marriage", "marriage registry", "বাল্যবিবাহ"], isFavorite: false }
    ]
  },
  {
    id: "ta2001",
    code: "TA",
    title: "Telecommunication Act",
    titleBn: "টেলিযোগাযোগ নিয়ন্ত্রক আইন, ২০০১",
    year: 2001,
    category: "Regulatory",
    color: "#1B4F72",
    icon: "📱",
    totalSections: 101,
    description: "Established BTRC and specifies laws regarding illegal VoIP, spectrum licensing, and mobile interception.",
    descriptionBn: "বিটিআরসি (BTRC) গঠন, অবৈধ ভিওআইপি (VoIP) কল রোধ এবং তরঙ্গের অবৈধ বণ্টনের বিচারের আইন।",
    chapters: [
      { num: 1, title: "BTRC & Licensing Controls", titleBn: "নিয়ন্ত্রণকারী কমিশন এবং লাইসেন্সিং", sections: "1-101" }
    ],
    sections: [
      { id: "ta-73", num: 73, title: "Penalty for running illegal telephony services", titleBn: "অবৈধ ভিওআইপি বা অননুমোদিত এক্সচেঞ্জ পরিচালনার দণ্ড", text: "Running parallel international telecom systems representing unlicensed voice services causes extreme fines & spectrum seizure.", textBn: "বিটিআরসির অনুমতি ব্যতীত চোরাইপথে আন্তর্জাতিক ভয়েস কল বা তথ্য বিনিময় (VoIP) করা কোটি টাকা অব্দি অর্থদণ্ডযোগ্য।", chapter: 1, tag: ["telecom", "BTRC", "টেলিকম"], isFavorite: false }
    ]
  },
  {
    id: "dpa2018",
    code: "DPA",
    title: "Dowry Prohibition Act",
    titleBn: "যৌতুক নিরোধ আইন, ২০১৮",
    year: 2018,
    category: "Special",
    color: "#C39BD3",
    icon: "💍",
    totalSections: 16,
    description: "Stricter revisions governing requests for dowry (যৌতুক) during or before weddings.",
    descriptionBn: "বিয়েতে কনের পরিবারের উপর যৌতুক দাবি করা বা উপহার গ্রহণের ছলে জোরপূর্বক টাকা নেয়ার শাস্তির আইন।",
    chapters: [
      { num: 1, title: "Dowry Schemes", titleBn: "যৌতুক দাবি সংক্রান্ত কড়াকড়ি", sections: "1-16" }
    ],
    sections: [
      { id: "dpa-3", num: 3, title: "Penalty for giving or demanding dowry", titleBn: "যৌতুক প্রদান বা দাবি করার কঠোর দণ্ড", text: "If any wedding party demands gold, heavy cash, or assets as dynamic condition of marriage, they face 5 years in jail.", textBn: "বিবাহে বরপক্ষ যৌতুক দাবি করলে বা উস্কানি দিলে অপরাধীকে অনূর্ধ্ব ৫ বছরের কারাদণ্ড ও অর্থদণ্ডে দণ্ডিত করা যাবে।", chapter: 1, tag: ["dowry demand", "marriage safety", "যৌতুকদাবি"], isFavorite: false }
    ]
  },
  {
    id: "gsa2018",
    code: "BGSA",
    title: "Bangladesh Government Service Act",
    titleBn: "সরকারি চাকরি আইন, ২০১৮",
    year: 2018,
    category: "Administrative",
    color: "#2E4053",
    icon: "👔",
    totalSections: 59,
    description: "Controls structural appointments, retirement benefits, and legal protection of administrative employees.",
    descriptionBn: "সরকারি কাজ নির্বাহকারী কর্মচারীদের নিয়োগের শর্তাবলী, অবসর বয়স এবং ফৌজদারী মামলা থেকে আইনি সুরক্ষার আইন।",
    chapters: [
      { num: 1, title: "Constitutional Employment Control", titleBn: "চাকরির আইনি সুরক্ষার শর্তসমূহ", sections: "1-59" }
    ],
    sections: [
      { id: "gsa-41", num: 41, title: "Requirement of prior approval before arrest of government staff", titleBn: "বিভাগীয় সরকারি কর্মচারীকে চার্জশিটের পূর্বে গ্রেফতারে অনুমতি", text: "Prior sanction from competent authority or ministry is required before arresting any active civil servant for duties actions.", textBn: "কোনো সরকারি কর্মচারী তার দাপ্তরিক কাজের অংশ হিসেবে কোনো ঘটনা ঘটালে চার্জশিট দাখিলের পূর্বে তাকে গ্রেফতারে বিভাগীয় অনুমতির প্রয়োজন।", chapter: 1, tag: ["arrest permission", "bureaucrats", "সরকারি চাকরি"], isFavorite: false }
    ]
  },
  {
    id: "bsqa2012",
    code: "PWQA",
    title: "Standards of Weights and Measures Act",
    titleBn: "পণ্যের মান নিয়ন্ত্রণ আইন, ২০১২",
    year: 2012,
    category: "Regulatory",
    color: "#17A085",
    icon: "⚖️",
    totalSections: 45,
    description: "Provides regulations on metric units, false weights, BSTI certifications, and general food standards.",
    descriptionBn: "পণ্যের পরিমাপে সঠিক বাটখারা ব্যবহার এবং বিএসটিআই (BSTI) অনুমোদনের নিয়মাবলী ও শাস্তির আইন।",
    chapters: [
      { num: 1, title: "Weights & Standards", titleBn: "পরিমাপ এবং মানদণ্ড নিয়ন্ত্রণ", sections: "1-45" }
    ],
    sections: [
      { id: "bsqa-24", num: 24, title: "Penalty for false commercial measurements", titleBn: "পরিমাপে কম দেওয়া বা ওজনে কারচুপির শাস্তি", text: "Intentionally weighting packages lower than the declared volume yields severe industrial penalties and cancellation of trade permit.", textBn: "ব্যবসায়ী বা পাইকারি দোকানদার ওজনে কারচুপি করলে বা বাটখারার তলায় মোম দিয়ে কম ওজন দিলে কারাদণ্ড ও বড় অঙ্কের জরিমানা হবে।", chapter: 1, tag: ["metric scale", "BSTI", "পরিমাপ"], isFavorite: false }
    ]
  },
  {
    id: "vca2006",
    code: "VCA",
    title: "Village Courts Act",
    titleBn: "গ্রাম আদালত আইন, ২০০৬",
    year: 2006,
    category: "Special",
    color: "#27AE60",
    icon: "🏡",
    totalSections: 21,
    description: "Decentralized law allowing local Union Parishads to resolve petty disputes fast without district courts.",
    descriptionBn: "ইউনিয়ন পরিষদের সহায়তায় ছোটখাটো জমিজমা বা মারামারি বিরোধ দ্রুত আপোষে মীমাংসার জন্য গ্রাম আদালত প্রবিধান।",
    chapters: [
      { num: 1, title: "UP Jurisdiction", titleBn: "ইউপি চেয়ারম্যান ও মেম্বারের বিচার পরিধি", sections: "1-21" }
    ],
    sections: [
      { id: "vca-6", num: 6, title: "Composition of Village Court panel", titleBn: "গ্রাম আদালত গঠন প্রক্রিয়া ও সদস্যদের নির্বাচন", text: "The village court is comprised of Union Parishad Chairman and four members chosen evenly by both conflicting parties.", textBn: "গ্রাম আদালত ৫ জন সদস্য নিয়ে গঠিত হয়: ইউনিয়ন পরিষদের চেয়ারম্যান এবং উভয় পক্ষ থেকে ২ জন করে স্থানীয় প্রতিনিধি।", chapter: 1, tag: ["local court", "village justice", "গ্রাম আদালত"], isFavorite: false }
    ]
  },
  {
    id: "pma2013",
    code: "PMA",
    title: "Parents Maintenance Act",
    titleBn: "পিতা-মাতার ভরণপোষণ আইন, ২০১৩",
    year: 2013,
    category: "Special",
    color: "#FF3F3F",
    icon: "👴",
    totalSections: 10,
    description: "Mandates children to provide shelter, food, healthcare, and active companion to elderly parents.",
    descriptionBn: "সন্তানদের জন্য পিতা-মাতার সযত্ন বাসস্থান, ভরনপোষণ ও মাসিক মর্যাদা নিশ্চিতকরণের বাধ্যবাধকতা আইন।",
    chapters: [
      { num: 1, title: "Maintenance Obligations", titleBn: "ভরণপোষণের আইনি বাধ্যবাধকতা সমূহ", sections: "1-10" }
    ],
    sections: [
      { id: "pma-4", num: 4, title: "Arrest & penalty of children for neglect", titleBn: "ভরণಪোষণ না দিয়ে পিতা-মাতাকে অবহেলা করার দণ্ড", text: "If children completely neglect to provide reasonable boarding and pocket funds to parents, they face regular imprisonment.", textBn: "পিতা-মাতাকে তাদের অমতে বৃদ্ধাশ্রমে ফেলে রাখলে বা খাবার ও বাসস্থান না দিলে সন্তানকে অনূর্ধ্ব ৩ বৎসরের জেল করা যাবে।", chapter: 1, tag: ["parents maintenance", "family", "ভরণপোষণ"], isFavorite: false }
    ]
  },
  {
    id: "iwta2019",
    code: "BIWTA",
    title: "Bangladesh Inland Water Transport Act",
    titleBn: "বাংলাদেশ অভ্যন্তরীণ নৌপরিবহন আইন, ২০১৯",
    year: 2019,
    category: "Transport",
    color: "#3498DB",
    icon: "🚢",
    totalSections: 76,
    description: "Regulates navigation parameters, ship fitness, cargo registry, and marine accident investigation panels on rivers.",
    descriptionBn: "লঞ্চ দুর্ঘটনা, নদী বন্দর সমূহের নাব্যতা রক্ষা এবং অতিরিক্ত যাত্রীবোঝাই করে লঞ্চ চালানোর শাস্তির আইন।",
    chapters: [
      { num: 1, title: "Port Control and Ship Safety", titleBn: "নদী নৌপথ এবং ফিটনেস নিয়ন্ত্রণ", sections: "1-76" }
    ],
    sections: [
      { id: "iwta-45", num: 45, title: "Penalty for overloading boats or launches", titleBn: "লঞ্চ বা স্টিমারে অতিরিক্ত যাত্রী বোঝাইয়ের শাস্তি", text: "Carrying cargo or passengers exceeding safe water limits risking lives is penalized with immediate cancellation of master permit.", textBn: "ঈদ বা উৎসবের সময় সীমাতিরিক্ত লঞ্চে যাত্রী উঠালে এবং ডুবে যাওয়ার ঝুঁকি তৈরি করলে মাস্টার বা সুকানি কঠোর শাস্তির মুখোমুখি হবেন।", chapter: 1, tag: ["shipping safety", "launch accident", "নৌপরিবহন"], isFavorite: false }
    ]
  },
  {
    id: "tcda2013",
    code: "TCDA",
    title: "Torture and Custodial Death (Prevention) Act",
    titleBn: "নির্যাতন ও হেফাজতে মৃত্যু (নিবারণ) আইন, ২০১৩",
    year: 2013,
    category: "Criminal",
    color: "#E74C3C",
    icon: "👮",
    totalSections: 22,
    description: "Guards human rights by penalizing police physical assault during remand or custody leading to death.",
    descriptionBn: "পুলিশ বা আইন প্রয়োগকারী সংস্থার হেফাজতে আসামির গায়ে হাত তোলা বা অমানবিক নির্যাতনের সাজার আইন।",
    chapters: [
      { num: 1, title: "Prevention schemes", titleBn: "হেফাজতে নির্যাতন নিয়ন্ত্রণ আইন ধারা", sections: "1-22" }
    ],
    sections: [
      { id: "tcda-12", num: 12, title: "Liability for custodial torture", titleBn: "জিজ্ঞাসাবাদের নামে হেফাজতে প্রহারের বিচার", text: "Any law enforcer torturing individuals under direct interrogation commits non-bailable offense resulting in severe imprisonment.", textBn: "জিজ্ঞাসাবাদের সময় আসামি গুরুতর জখম হলে বা মারা গেলে জড়িত পুলিশ কর্মকর্তাদের বিরুদ্ধে ফৌজদারী মামলা রুজু হবে।", chapter: 1, tag: ["torture prevention", "police violence", "হেফাজতে নির্যাতন"], isFavorite: false }
    ]
  },
  {
    id: "pa1920",
    code: "PA1920",
    title: "Passport Act",
    titleBn: "পাসপোর্ট আইন, ১৯২০",
    year: 1920,
    category: "Regulatory",
    color: "#2C3E50",
    icon: "✈️",
    totalSections: 16,
    description: "Historical British-era act defining basic border-crossing rules and passport entries.",
    descriptionBn: "ঐতিহাসিক ব্রিটিশ আমলে পাসপোর্টের ভিত্তিতে বৈদেশিক যাতায়াত নিয়ন্ত্রণের আইন।",
    chapters: [
      { num: 1, title: "Border Control", titleBn: "সীমান্তবর্তী যাতায়াত কড়াকড়ি", sections: "1-16" }
    ],
    sections: [
      { id: "pa-3", num: 3, title: "Power to prohibit entry in Bangladesh without passport", titleBn: "পাসপোর্ট ছাড়া বাংলাদেশে প্রবেশ সম্পূর্ণ নিষিদ্ধকরণ", text: "Authorizes border guards to bar and arrest any traveller entering without formal passport documents.", textBn: "বৈধ পাসপোর্ট ও ভিসা ব্যতীত অন্য কোনো বিদেশী বা নাগরিক সীমান্তে অবৈধ অনুপ্রবেশ করার চেষ্টা করলে সরাসরি আটকের সরকারি নির্দেশ।", chapter: 1, tag: ["passport borders", "border security", "পাসপোর্ট প্রবেশ"], isFavorite: false }
    ]
  },
  {
    id: "pa1952",
    code: "PA1952",
    title: "Passport Act",
    titleBn: "পাসপোর্ট আইন, ১৯৫২",
    year: 1952,
    category: "Regulatory",
    color: "#1A5276",
    icon: "🛂",
    totalSections: 17,
    description: "Regulates passport issuance, renewals, and legal trials for presenting passport forgery or false identity in Bangladesh.",
    descriptionBn: "নকল পাসপোর্ট তৈরি, ভুয়া ঠিকানা দিয়ে পাসপোর্ট বাগানো এবং নাগরিকের পাসপোর্ট বাতিলের ক্ষমতার আইন।",
    chapters: [
      { num: 1, title: "Forgery Controls", titleBn: "ভুয়া পাসপোর্ট জালিয়াতি দণ্ড", sections: "1-17" }
    ],
    sections: [
      { id: "pa1952-6", num: 6, title: "Penalty for false statements during passport creation", titleBn: "মিথ্যা ঠিকানা বা বয়স দিয়ে পাসপোর্ট তৈরিতে শাস্তি", text: "Attempting to forge documents or using proxy citizens database is a direct non-bailable offense.", textBn: "জেনেশুনে জালিয়াতি করা শিক্ষাগত সার্টিফিকেট বা জাতীয় পরিচয়পত্র জমা দিয়ে পাসপোর্ট নেয়ার চেষ্টা করলে ২ বছর অব্দি কঠিন জেলের বিধান।", chapter: 1, tag: ["passport forgery", "false passport", "পাসপোর্ট জালিয়াতি"], isFavorite: false }
    ]
  },
  {
    id: "cca2013",
    code: "CCA",
    title: "Contempt of Court Act",
    titleBn: "অমর্যাদা/অবমাননা সংক্রান্ত আইন",
    year: 2013,
    category: "Procedural",
    color: "#99A3A4",
    icon: "🏛️",
    totalSections: 15,
    description: "Specifies actions against willful disobedience of court decrees, defamation of judges or public disrespect.",
    descriptionBn: "আদালতের আদেশ অমান্য করা, বিচারক ও আইন বিভাগকে নিয়ে অশ্রদ্ধামূলক মন্তব্য প্রকাশের সাজার আইন।",
    chapters: [
      { num: 1, title: "Judicial Prestige Protection", titleBn: "বিচারিক মর্যাদা রক্ষা পদ্ধতি", sections: "1-15" }
    ],
    sections: [
      { id: "cca-5", num: 5, title: "Penalty for contempt of court", titleBn: "আদালত অবমাননার সর্বোচ্চ শাস্তি ও ক্ষমা প্রার্থনা", text: "Exposing bias or willfully ignoring High Court decisions causes brief summary prison or heavy monetary penalty.", textBn: "আদালতের রুল জারি উপেক্ষা করলে বা বিচারপতিকে নিয়ে বিভ্রান্তিকর পোস্ট করলে ৬ মাসের জেল ও জরিমানা হতে পারে।", chapter: 1, tag: ["contempt", "court respect", "আদালত অবমাননা"], isFavorite: false }
    ]
  },
  {
    id: "mla1869",
    code: "MLA",
    title: "Military Law",
    titleBn: "সামরিক আইন, ১৮৬৯",
    year: 1869,
    category: "Special",
    color: "#1E272C",
    icon: "🪖",
    totalSections: 120,
    description: "Historical military regulations governing mutiny, court-martials, and disciplined military operations.",
    descriptionBn: "সামরিক বাহিনীর বিশেষ আইন, শৃঙ্খলা ভঙ্গ, বিদ্রোহ এবং কোর্ট মার্শাল সংক্রান্ত বিচার প্রক্রিয়া।",
    chapters: [
      { num: 1, title: "Disciplinary Codes", titleBn: "সামরিক ডিসিপ্লিন ও কোড", sections: "1-120" }
    ],
    sections: [
      { id: "mla-27", num: 27, title: "Court Martial jurisdiction", titleBn: "কোর্ট মার্শাল বা বিশেষ সেনা ট্রাইব্যুনাল গঠন", text: "Provides special jurisdiction to try soldiers and officers for treason, desertion, or mutiny.", textBn: "বিদ্রোহে উস্কানি বা দায়িত্ব ফেলে পলাতক থাকার মত সংবেদনশীল কাজের বিচারের আওতা কোর্ট মার্শালের অধীন।", chapter: 1, tag: ["military", "court martial", "সামরিক বাহিনী"], isFavorite: false }
    ]
  },
  {
    id: "const1972",
    code: "CONST",
    title: "Constitution of Bangladesh",
    titleBn: "বাংলাদেশের সংবিধান, ১৯৭২",
    year: 1972,
    category: "Constitutional",
    color: "#7D3C98",
    icon: "🇧🇩",
    totalSections: 153,
    description: "The supreme law of the Republic of Bangladesh outlining fundamental rights and state structure.",
    descriptionBn: "প্রজাতন্ত্রী বাংলাদেশের সর্বোচ্চ ও পবিত্র আইন যা মৌলিক অধিকার ও রাষ্ট্রের রূপরেখা নির্ধারণ করে।",
    chapters: [
      { num: 1, title: "The Republic", titleBn: "প্রজাতন্ত্র", sections: "1-7" },
      { num: 3, title: "Fundamental Rights", titleBn: "মৌলিক জণ অধিকার", sections: "26-47" }
    ],
    sections: [
      { id: "const-27", num: 27, title: "Equality before law", titleBn: "আইনের দৃষ্টিতে সকল নাগরিকের সমতা", text: "All citizens are equal before law and are entitled to equal protection of law.", textBn: "বাংলাদেশের সকল নাগরিক আইনের দৃষ্টিতে সমান এবং আইনের সমান আশ্রয় লাভের অধিকারী।", chapter: 3, tag: ["equality", "human rights", "সমতা"], isFavorite: false }
    ]
  }
];

export const UPDATES: Update[] = [
  { id: 1, law: "Cyber Security Act", type: "Amendment", date: "2024-01-15", summary: "Section 28 amended to increase penalties for online defamation", summaryBn: "অনলাইন মানহানির জন্য ধারা ২৮ সংশোধন করে দণ্ড বৃদ্ধি করা হয়েছে", badge: "New" },
  { id: 2, law: "Nari O Shishu Nirjatan Daman Ain", type: "Amendment", date: "2023-11-20", summary: "Death penalty provisions strengthened for child abuse cases", summaryBn: "অত্যন্ত কঠোরভাবে শিশুদের উপর নির্যাতন রুখতে নতুন সার্কুলার জারি", badge: "Important" },
  { id: 3, law: "Bangladesh Penal Code", type: "Circular", date: "2023-08-05", summary: "Supreme Court interpretation on Section 302 published regarding murder trials", summaryBn: "ধারা ৩০২ এর খুন বা হত্যা মামলার দ্রুত বিচার নিয়ে সুপ্রিম কোর্টের নতুন ব্যাখ্যা", badge: "Case Law" },
];

export const CATEGORIES = ["All", "Criminal", "Constitutional", "Procedural", "Evidence", "Special", "Digital", "Transport", "Administrative", "Regulatory"];
