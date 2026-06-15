import { useState, useEffect, useRef, useMemo } from "react";
import { LAWS, UPDATES, CATEGORIES } from "./data";
import { Law, Section, Chapter, Update } from "./types";
import {
  Search,
  Home,
  Book,
  Bookmark,
  Star,
  Bell,
  Moon,
  Sun,
  ChevronRight,
  Share2,
  FileText,
  X,
  Globe,
  ArrowLeft,
  Check,
  Copy,
  Scale,
  Calendar,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Eye,
  Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const toBengaliNumber = (num: number | string): string => {
  const bnNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/[0-9]/g, (w) => bnNumerals[parseInt(w)]);
};

export default function App() {
  // ── CORE STATES (With LocalStorage Hydration) ──────────────────────────────
  const [dark, setDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("blh_dark");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [lang, setLang] = useState<"en" | "bn">(() => {
    try {
      const saved = localStorage.getItem("blh_lang");
      return saved === "bn" ? "bn" : "en";
    } catch {
      return "en";
    }
  });

  const [tab, setTab] = useState<string>("home");
  const [selectedLaw, setSelectedLaw] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [searchQ, setSearchQ] = useState<string>("");
  const [searchFilterCat, setSearchFilterCat] = useState<string>("All");

  const [filterCat, setFilterCat] = useState<string>("All");

  // Dynamic law section browser states
  const [lawActiveTab, setLawActiveTab] = useState<"all" | "key" | "chapters">("all");
  const [localSectionSearch, setLocalSectionSearch] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiViewMode, setAiViewMode] = useState<"collapsed" | "example" | "full">("collapsed");

  // Cached dynamic section copies
  const [customGeneratedSections, setCustomGeneratedSections] = useState<Record<string, Section & { lawColor?: string; lawTitle?: string; lawCode?: string; lawId?: string; lawIcon?: string; category?: string }>>(() => {
    try {
      const saved = localStorage.getItem("blh_custom_sections");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("blh_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("blh_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem("blh_notes");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<Section[]>(() => {
    try {
      const saved = localStorage.getItem("blh_recently_viewed");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state overlays
  const [showNote, setShowNote] = useState<boolean>(false);
  const [noteText, setNoteText] = useState<string>("");
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ── EFFECT PERSISTENCE ──────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem("blh_dark", JSON.stringify(dark));
  }, [dark]);

  useEffect(() => {
    localStorage.setItem("blh_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("blh_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("blh_favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("blh_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("blh_recently_viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem("blh_custom_sections", JSON.stringify(customGeneratedSections));
  }, [customGeneratedSections]);

  // Toast feedback helper
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ── COMPUTED LEGAL DIRECTORIES ──────────────────────────────────────────────
  const isBn = lang === "bn";
  const bg = dark ? "bg-[#0B0F17]" : "bg-[#F4F6F9]";
  const surface = dark ? "bg-[#161B26]" : "bg-white";
  const surfaceAlt = dark ? "bg-[#1E2533]" : "bg-[#F0F2F5]";
  const textPrimary = dark ? "text-[#E6EDF3]" : "text-[#1A253C]";
  const textMuted = dark ? "text-[#8B949E]" : "text-[#627285]";
  const borderCol = dark ? "border-[#2D3648]" : "border-[#E2E8F0]";
  const bgBadge = dark ? "bg-emerald-950/40 text-emerald-400 border-emerald-900" : "bg-emerald-50 text-emerald-800 border-emerald-100";

  const accentBNRed = "#C8102E"; // Flag Red
  const accentBNEmerald = "#006A4E"; // Flag green

  // Aggregate all sections with parent metadata for simple search/bookmark listing
  const allSectionsWeighted = useMemo(() => {
    const base = LAWS.flatMap((law) => {
      return law.sections.map((sec) => ({
        ...sec,
        lawCode: law.code,
        lawTitle: isBn ? law.titleBn : law.title,
        lawId: law.id,
        lawColor: law.color,
        lawIcon: law.icon,
        category: law.category
      }));
    });
    const custom = Object.values(customGeneratedSections);
    return [...base, ...custom];
  }, [isBn, customGeneratedSections]);

  // Full-text search and catalog filter
  const searchResults = useMemo(() => {
    if (!searchQ.trim()) return [];
    const q = searchQ.toLowerCase();
    return allSectionsWeighted.filter((sec) => {
      const matchesCategory = searchFilterCat === "All" || sec.category === searchFilterCat;
      if (!matchesCategory) return false;

      return (
        sec.num.toString().includes(q) ||
        sec.title.toLowerCase().includes(q) ||
        sec.titleBn.includes(q) ||
        sec.text.toLowerCase().includes(q) ||
        sec.textBn.includes(q) ||
        sec.tag.some((t) => t.toLowerCase().includes(q)) ||
        sec.lawCode.toLowerCase().includes(q)
      );
    });
  }, [searchQ, allSectionsWeighted, searchFilterCat]);

  // Handlers
  const getResolvedSection = (law: Law, num: number): Section & { lawColor?: string; lawTitle?: string; lawCode?: string; lawId?: string; lawIcon?: string; category?: string } => {
    const existing = law.sections.find(s => s.num === num);
    if (existing) {
      return {
        ...existing,
        lawColor: law.color,
        lawTitle: isBn ? law.titleBn : law.title,
        lawCode: law.code,
        lawId: law.id,
        lawIcon: law.icon,
        category: law.category
      };
    }

    const sectionId = `${law.id}-${num}`;
    const chapter = (() => {
      const match = law.chapters.find(ch => {
        const parts = ch.sections.split("-");
        if (parts.length === 2) {
          const start = parseInt(parts[0]);
          const end = parseInt(parts[1]);
          return num >= start && num <= end;
        }
        return false;
      });
      return match ? match.num : 1;
    })();

    const title = `Section ${num}`;
    const titleBn = `ধারা ${toBengaliNumber(num)}`;

    const defaultText = `Statutory prescription of Section ${num} of the ${law.title} (${law.code}). Engage our AI legal compass below to fetch authentic clausal text, explanation of grounds, penalties, and practical case studies immediately.`;
    const defaultTextBn = `${law.titleBn}-এর ${toBengaliNumber(num)} নং ধারার কানুনি বিধি ও নিয়ম। এই ধারার ধারাভিত্তিক মূল আইনি বিবরণ, সাজার শর্তাবলী এবং বাস্তব উদাহরণ দেখতে নিচে 'এআই ধারা বিশ্লেষণ ও উদাহরণ তৈরি' বোতামটিতে ক্লিক করুন।`;

    return {
      id: sectionId,
      num,
      title,
      titleBn,
      text: defaultText,
      textBn: defaultTextBn,
      chapter,
      tag: [law.code.toLowerCase(), "section-" + num],
      lawColor: law.color,
      lawTitle: isBn ? law.titleBn : law.title,
      lawCode: law.code,
      lawId: law.id,
      lawIcon: law.icon,
      category: law.category
    };
  };

  const handleOpenSection = (section: Section & { lawColor?: string; lawTitle?: string; lawCode?: string; lawId?: string; lawIcon?: string; category?: string }) => {
    // Save dynamic sections into customGeneratedSections so standard bookmarks/favorites filter works isomorphic
    const holdsPredefined = LAWS.find((l) => l.id === section.lawId)?.sections.some((s) => s.id === section.id);
    if (!holdsPredefined) {
      setCustomGeneratedSections((prev) => ({
        ...prev,
        [section.id]: section
      }));
    }

    setSelectedSection(section);
    setNoteText(notes[section.id] || "");
    setRecentlyViewed((prev) => {
      const currentFiltered = prev.filter((s) => s.id !== section.id);
      return [section, ...currentFiltered].slice(0, 10);
    });

    // Reset AI view mode for progressive disclosure
    setAiViewMode("collapsed");
  };

  const handleFetchAiExplanation = async (sectionOverride?: any) => {
    const sectionToFetch = sectionOverride || selectedSection;
    if (!sectionToFetch) return;
    setAiLoading(true);
    try {
      const response = await fetch("/api/section-explanation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lawTitle: sectionToFetch.lawTitle,
          lawCode: sectionToFetch.lawCode,
          sectionNum: sectionToFetch.num
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch AI explanation.");
      }

      const data = await response.json();
      
      const updatedSec = {
        ...sectionToFetch,
        title: data.title || sectionToFetch.title,
        titleBn: data.titleBn || sectionToFetch.titleBn,
        text: data.text || sectionToFetch.text,
        textBn: data.textBn || sectionToFetch.textBn,
        explanation: data.explanation,
        explanationBn: data.explanationBn,
        example: data.example,
        exampleBn: data.exampleBn,
        isAiGenerated: true
      };

      setSelectedSection((curr) => {
        if (curr && curr.id === updatedSec.id) {
          return updatedSec;
        }
        return curr;
      });

      // Save customGeneratedSections state
      setCustomGeneratedSections(prev => ({
        ...prev,
        [updatedSec.id]: updatedSec
      }));

      // Cache updated in recently viewed
      setRecentlyViewed((prev) => {
        return prev.map((s) => s.id === updatedSec.id ? updatedSec : s);
      });

      triggerToast(isBn ? "এআই বিশ্লেষণ সফল হয়েছে!" : "AI detailed analysis processed successfully!");
    } catch (err: any) {
      console.error(err);
      triggerToast(isBn ? "এআই সংযোগ সাময়িক ব্যর্থ হয়েছে" : "AI connection temporarily failed");
    } finally {
      setAiLoading(false);
    }
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        triggerToast(isBn ? "বুকমার্ক সরানো হয়েছে" : "Removed bookmark");
        return prev.filter((item) => item !== id);
      } else {
        triggerToast(isBn ? "সফলভাবে বুকমার্ক করা হয়েছে" : "Added to bookmarks");
        return [...prev, id];
      }
    });
  };

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        triggerToast(isBn ? "প্রিয় তালিকা থেকে সরানো হয়েছে" : "Removed from favorites");
        return prev.filter((item) => item !== id);
      } else {
        triggerToast(isBn ? "প্রিয়তালিকায় যুক্ত করা হয়েছে" : "Marked as favorite");
        return [...prev, id];
      }
    });
  };

  const handleSaveNote = () => {
    if (selectedSection) {
      setNotes((prev) => ({
        ...prev,
        [selectedSection.id]: noteText.trim()
      }));
      setShowNote(false);
      triggerToast(isBn ? "নোট সফলভাবে সংরক্ষণ করা হয়েছে" : "Note saved successfully");
    }
  };

  const handleShareSection = (sec: Section & { lawCode?: string }) => {
    const shareText = `[Bangladesh Law Hub] ${sec.lawCode} § Section ${sec.num}: ${isBn ? sec.titleBn : sec.title}\n\n${isBn ? sec.textBn : sec.text}`;
    navigator.clipboard.writeText(shareText);
    triggerToast(isBn ? "ক্লিপবোর্ডে কপি করা হয়েছে!" : "Copied description to clipboard!");
  };

  const handleClearRecentlyViewed = () => {
    setRecentlyViewed([]);
    triggerToast(isBn ? "ইতিহাস মুছে ফেলা হয়েছে" : "Cleared search history");
  };

  return (
    <div className={`min-h-screen ${bg} transition-colors duration-300 font-sans flex items-center justify-center py-0 md:py-4 lg:py-8`}>
      {/* Visual Workspace Container for realistic desktop frame context, adapting fully to mobile */}
      <div 
        className={`w-full max-w-md lg:max-w-6xl xl:max-w-7xl h-screen lg:h-[820px] ${surface} border ${borderCol} md:rounded-3xl shadow-2xl relative overflow-hidden flex flex-col`} 
        style={typeof window !== "undefined" && window.innerWidth >= 1024 ? { height: "820px", minHeight: "820px", maxHeight: "820px" } : { minHeight: "100vh", height: "100vh", maxHeight: "100vh" }}
      >
        
        {/* TOAST SYSTEM */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -40, x: "-50%" }}
              animate={{ opacity: 1, y: 16, x: "-50%" }}
              exit={{ opacity: 0, y: -20, x: "-50%" }}
              className="absolute left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 border border-slate-800 text-white text-xs font-medium tracking-wide shadow-2xl flex items-center gap-2 whitespace-nowrap"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              {toastMessage}
            </motion.div>
          )}
        </AnimatePresence>

        {/* NOTIFICATIONS FEED SCREEN */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className={`absolute inset-x-0 top-16 bottom-16 z-40 ${surface} p-4 flex flex-col`}
            >
              <div className="flex justify-between items-center pb-3 border-b mb-4 border-slate-200 dark:border-slate-800">
                <span className={`text-base font-bold ${textPrimary}`}>
                  {isBn ? "সাম্প্রতিক প্রজ্ঞাপন" : "Recent Circulars & Updates"}
                </span>
                <button onClick={() => setShowNotifications(false)} className={`p-1.5 rounded-lg ${surfaceAlt} ${textPrimary}`}>
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                {UPDATES.map((u) => (
                  <div key={u.id} className={`p-3 rounded-xl border ${borderCol} ${surfaceAlt}`}>
                    <div className="flex justify-between items-start mb-1 gap-2">
                      <span className="text-xs font-bold text-[#006A4E]">{u.law}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white bg-[${accentBNRed}] bg-red-600`}>
                        {u.badge}
                      </span>
                    </div>
                    <p className={`text-xs ${textPrimary} leading-relaxed`}>{isBn ? u.summaryBn : u.summary}</p>
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 text-[10px] text-slate-400">
                      <span>{u.type}</span>
                      <span>{u.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. PRIMARY APP HEADER */}
        <div className={`bg-gradient-to-br from-[#006A4E] via-[#005841] to-[#004230] p-4 text-white flex flex-col shrink-0 border-b-3 border-[#C8102E] ${(!selectedSection && !selectedLaw) ? "flex" : "hidden lg:flex"}`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-lg font-bold tracking-tight font-serif flex items-center gap-1.5">
                <Scale className="w-5 h-5 text-emerald-400" />
                {isBn ? "বাংলাদেশ আইন হাব" : "Bangladesh Law Hub"}
              </h1>
              <p className="text-[10px] text-emerald-100 font-mono tracking-wider">
                BILINGUAL DIGITAL REPOSITORY v2.4
              </p>
            </div>

            {/* Desktop Centered Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-md mx-auto relative px-4">
              <Search className="w-4.5 h-4.5 absolute left-7 top-1/2 -translate-y-1/2 text-emerald-200" />
              <input
                type="text"
                value={searchQ}
                onChange={(e) => {
                  setSearchQ(e.target.value);
                  if (tab !== "search") setTab("search");
                }}
                placeholder={isBn ? "ধারা, শব্দ বা কীওয়ার্ড দিয়ে খুঁজুন..." : "Search sections, topics, codes..."}
                className="w-full pl-9 pr-4 py-1.5 rounded-full bg-[#00553E] text-white placeholder-emerald-200 text-xs outline-none focus:ring-1 focus:ring-emerald-300 tracking-wide font-sans border border-transparent"
              />
            </div>

            {/* Utility Panel */}
            <div className="flex items-center gap-2">
              {/* Notification trigger button */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-1 px-2.5 rounded-lg bg-emerald-950/40 text-emerald-100 hover:text-white transition relative hover:bg-emerald-950/60"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 inline-block" />
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#C8102E]" />
              </button>

              {/* Translate Toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "bn" : "en")}
                className="p-1 px-2.5 text-xs text-emerald-100 hover:text-white transition font-bold bg-emerald-950/40 rounded-lg flex items-center gap-1 hover:bg-emerald-950/60"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === "en" ? "বাং" : "EN"}
              </button>

              {/* Theme Toggle */}
              <button
                onClick={() => setDark(!dark)}
                className="p-1 px-2 rounded-lg bg-emerald-950/40 text-emerald-100 hover:text-white transition hover:bg-emerald-950/60"
              >
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* 1.1 SUB-NAVBAR (Desktop only, responsive alignment) */}
        <nav className={`hidden lg:flex items-center justify-between px-6 py-3 bg-white dark:bg-[#1E2533] border-b ${borderCol} shrink-0`}>
          <div className="text-[#006A4E] dark:text-emerald-400 font-bold text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            {isBn ? "সর্বশেষ আপডেট: ১৮ জানুয়ারি ২০২৪" : "Last Updated: 18 January 2024"}
          </div>
          <div className="flex items-center gap-6 font-semibold text-xs text-slate-500 dark:text-slate-400">
            {[
              { id: "home", label: "Dashboard", labelBn: "ড্যাশবোর্ড" },
              { id: "book", label: "Laws Directory", labelBn: "আইনসমূহ" },
              { id: "search", label: "Search Engine", labelBn: "অনুসন্ধান" },
              { id: "bookmark", label: "Saved Bookmarks", labelBn: "বুকমার্ক" },
              { id: "star", label: "Favorites Checklist", labelBn: "প্রিয় তালিকা" }
            ].map((nav) => {
              const active = tab === nav.id && !selectedLaw && !selectedSection;
              return (
                <button
                  key={nav.id}
                  onClick={() => {
                    setSelectedLaw(null);
                    setSelectedSection(null);
                    setTab(nav.id);
                  }}
                  className={`transition-colors duration-150 hover:text-[#006A4E] dark:hover:text-emerald-400 ${
                    active ? "text-[#006A4E] dark:text-emerald-400 font-bold border-b-2 border-[#006A4E] dark:border-emerald-400 pb-1" : ""
                  }`}
                >
                  {isBn ? nav.labelBn : nav.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* 2. MAIN CORE VIEWS PORT (Wrapped in 3-column layout on desktop) */}
        <div className="flex-1 flex overflow-hidden min-h-0">

          {/* Left Sidebar (Desktop Only) */}
          <aside className={`hidden lg:flex flex-col w-[280px] shrink-0 border-r ${borderCol} ${surface} overflow-y-auto`}>
            <div className={`p-3 font-bold text-xs ${textMuted} bg-[#F8FAFC] dark:bg-[#1A2533] border-b ${borderCol} uppercase tracking-wider`}>
              {isBn ? "আইনের তালিকা (Laws)" : "Statutes Directory"}
            </div>
            <div className="flex-grow divide-y divide-slate-100 dark:divide-slate-800">
              {LAWS.map((law) => {
                const isActive = selectedLaw === law.id;
                return (
                  <div
                    key={law.id}
                    onClick={() => {
                      setSelectedLaw(law.id);
                      setSelectedSection(null);
                    }}
                    className={`p-3 cursor-pointer transition-all ${
                      isActive 
                        ? "bg-emerald-500/10 border-l-4 border-[#006A4E]" 
                        : `hover:${surfaceAlt}`
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className={`text-[13px] font-bold leading-tight ${isActive ? "text-[#006A4E] dark:text-emerald-400" : textPrimary}`}>
                        {isBn ? law.titleBn : law.title}
                      </span>
                      <span className="text-sm shrink-0 select-none mt-0.5">{law.icon}</span>
                    </div>
                    <div className="flex justify-between items-center mt-1 text-[10px] text-slate-400">
                      <span>{law.totalSections} {isBn ? "টি ধারা" : "Clauses"}</span>
                      <span className="font-mono uppercase text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/60 tracking-wider">
                        {law.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Central Scrolling Content Viewport */}
          <div className="flex-1 overflow-y-auto pb-20 lg:pb-0 flex flex-col bg-slate-50 dark:bg-[#0B0F17]">
          
          {/* A. DRILL-DOWN IF SECTION SELECTED */}
          {selectedSection && (
            <div className="flex flex-col h-full min-h-full">
              {/* Specialized Header */}
              <div 
                className="p-4 text-white tracking-tight sticky top-0 z-10 flex items-center justify-between shadow-md"
                style={{ background: `linear-gradient(135deg, ${selectedSection.lawColor || accentBNEmerald} 0%, #17202A 100%)` }}
              >
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setSelectedSection(null)}
                    className="p-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white transition shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="leading-tight">
                    <span className="text-[10px] uppercase font-bold text-white/70 block tracking-wider">
                      {selectedSection.lawCode} / CHAPTER {selectedSection.chapter}
                    </span>
                    <h2 className="text-sm font-bold font-serif line-clamp-1">
                      {isBn ? selectedSection.lawTitle : selectedSection.lawTitle}
                    </h2>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-white/20">
                    § {selectedSection.num}
                  </span>
                </div>
              </div>

              {/* Detail Canvas */}
              <div className="p-5 flex-1 space-y-5">
                
                {/* Dual Title Header */}
                <div className="border-b border-dashed border-slate-300 dark:border-slate-800 pb-4">
                  <h3 className={`text-xl font-bold font-serif ${textPrimary} leading-tight`}>
                    {isBn ? selectedSection.titleBn : selectedSection.title}
                  </h3>
                  <p className={`text-xs ${textMuted} mt-1 font-sans`}>
                    {isBn ? selectedSection.title : selectedSection.titleBn}
                  </p>
                </div>

                {/* Core Clausal Reading Room */}
                <div className="flex items-center justify-between mt-2 mb-1 px-1">
                  <span className="text-xs uppercase font-extrabold tracking-wider text-[#006A4E] dark:text-emerald-400 block">
                    {isBn ? "ধারার সারসংক্ষেপ:" : "Section Summary:"}
                  </span>
                </div>
                <div className={`p-5 rounded-2xl ${surfaceAlt} border ${borderCol} relative overflow-hidden shadow-inner`}>
                  <div 
                    className="absolute left-0 top-0 bottom-0 w-1.5"
                    style={{ backgroundColor: selectedSection.lawColor || accentBNEmerald }}
                  />
                  <p className={`text-base leading-relaxed ${textPrimary} font-serif whitespace-pre-line`}>
                    {isBn ? selectedSection.textBn : selectedSection.text}
                  </p>
                  
                  {/* Opposite language translation preview accordion under the hood */}
                  <div className="mt-4 pt-4 border-t border-slate-300/60 dark:border-slate-700/60">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#006A4E] dark:text-emerald-400 block mb-1">
                      {isBn ? "ENGLISH TRANSCRIPTION" : "বাংলা অনুবাদ (অফিসিয়াল সংস্করণ)"}
                    </span>
                    <p className={`text-xs leading-relaxed ${textMuted} font-serif italic`}>
                      {isBn ? selectedSection.text : selectedSection.textBn}
                    </p>
                  </div>
                </div>

                {/* Saved Context Note block */}
                {notes[selectedSection.id] && (
                  <div className="p-4 rounded-xl border border-amber-300/50 bg-amber-500/10 text-amber-900 dark:text-amber-300 flex items-start gap-2">
                    <FileText className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-xs font-serif">
                      <span className="font-bold block text-amber-700 dark:text-amber-400 uppercase tracking-wider text-[9px] mb-1">
                        {isBn ? "আমার গুরুত্বপূর্ণ টীকা (MY NOTE)" : "PERSONAL LEGAL ANNOTATION"}
                      </span>
                      <p className="italic leading-relaxed">{notes[selectedSection.id]}</p>
                    </div>
                  </div>
                )}

                {/* Structural Tags Row */}
                {selectedSection.tag && selectedSection.tag.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 items-center">
                    <span className={`text-[10px] font-bold ${textMuted}`}>{isBn ? "ট্যাগসমূহ:" : "Tags:"}</span>
                    {selectedSection.tag.map((tg) => (
                      <span 
                        key={tg} 
                        className="px-2 py-0.5 text-[10px] rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-mono"
                      >
                        #{tg}
                      </span>
                    ))}
                  </div>
                )}

                {/* Additional Detailed Explanation & Illustrations */}
                {aiLoading ? (
                  <div className="space-y-4 animate-pulse">
                    {/* Skeleton for Explanation */}
                    <div className={`p-4 rounded-xl bg-emerald-500/5 border ${borderCol} space-y-3`}>
                      <div className="flex items-center gap-2">
                        <Scale className="w-4 h-4 text-emerald-500 animate-spin" style={{ animationDuration: '3s' }} />
                        <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider font-sans">
                          {isBn ? "স্মার্ট এআই ধারাটি বিশ্লেষণ করছে..." : "Smart AI is analyzing the section..."}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded w-5/6"></div>
                        <div className="h-3.5 bg-slate-200/60 dark:bg-slate-800/60 rounded w-full"></div>
                        <div className="h-3.5 bg-slate-200/60 dark:bg-slate-800/60 rounded w-4/5"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded w-2/3"></div>
                      </div>
                    </div>

                    {/* Skeleton for Example */}
                    <div className={`p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-3`}>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-rose-500 animate-bounce" />
                        <span className="text-xs uppercase font-bold text-rose-500 tracking-wider font-sans">
                          {isBn ? "বাস্তব মামলার ঘটনা (Case Study) তৈরি হচ্ছে..." : "Generating practical lawsuit scenario..."}
                        </span>
                      </div>
                      <div className="space-y-2">
                        <div className="h-4 bg-slate-200/80 dark:bg-slate-800/80 rounded w-4/5"></div>
                        <div className="h-3.5 bg-slate-200/60 dark:bg-slate-800/60 rounded w-11/12"></div>
                        <div className="h-3 bg-slate-100 dark:bg-slate-900 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ) : (aiViewMode === "collapsed" && !selectedSection.explanation && !selectedSection.example) ? (
                  /* Collapsed & Not Generated yet state */
                  <div className={`p-5 rounded-2xl border ${borderCol} ${surfaceAlt} text-center space-y-3.5`}>
                    <div className="space-y-1.5">
                      <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg">
                        ✨
                      </div>
                      <h4 className={`text-xs sm:text-sm font-bold ${textPrimary} font-serif`}>
                        {isBn ? "এআই ধারা বিশ্লেষণ ও উদাহরণ" : "AI-Powered Explanation & Example"}
                      </h4>
                      <p className={`text-[11px] sm:text-xs ${textMuted} max-w-sm mx-auto leading-relaxed font-serif`}>
                        {isBn 
                          ? "এই ধারার বাস্তব প্রয়োগ, উদাহরণ এবং ধারাভিত্তিক গভীর বিশ্লেষণ এআই দিয়ে তৈরি করুন।" 
                          : "Generate practical legal implementation, case study scenario, and clausal analysis using artificial intelligence."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                      <button
                        onClick={async () => {
                          await handleFetchAiExplanation();
                          setAiViewMode("example");
                        }}
                        className="px-3 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer border border-rose-500/10"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        {isBn ? "উদাহরণ দেখুন" : "View Example"}
                      </button>
                      <button
                        onClick={async () => {
                          await handleFetchAiExplanation();
                          setAiViewMode("full");
                        }}
                        className="px-3 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#004e39] text-white text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <span>✨</span>
                        {isBn ? "AI বিশ্লেষণ" : "AI Explanation"}
                      </button>
                    </div>
                  </div>
                ) : (aiViewMode === "collapsed" && (selectedSection.explanation || selectedSection.example)) ? (
                  /* Collapsed but ALREADY generated in session or custom cache state */
                  <div className={`p-5 rounded-2xl border ${borderCol} ${surfaceAlt} text-center space-y-3.5`}>
                    <div className="space-y-1.5">
                      <div className="w-9 h-9 mx-auto rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-lg">
                        ✨
                      </div>
                      <h4 className={`text-xs sm:text-sm font-bold ${textPrimary} font-serif`}>
                        {isBn ? "এআই ধারা বিশ্লেষণ ও উদাহরণ সফলভাবে তৈরি হয়েছে" : "AI Section Analysis Loaded"}
                      </h4>
                      <p className={`text-[11px] sm:text-xs ${textMuted} max-w-sm mx-auto leading-relaxed font-serif`}>
                        {isBn 
                          ? "নিচের বোতামগুলো ব্যবহার করে ঝটপণ বাস্তব উদাহরণ কিংবা গভীর আইনি ব্যাখ্যা উন্মোচন করুন।" 
                          : "Use the buttons below to instantly reveal the generated practical scenario or complete smart analysis."}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 max-w-sm mx-auto">
                      <button
                        onClick={() => setAiViewMode("example")}
                        className="px-3 py-2.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer border border-rose-500/10"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        {isBn ? "উদাহরণ দেখুন" : "View Example"}
                      </button>
                      <button
                        onClick={() => setAiViewMode("full")}
                        className="px-3 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#004e39] text-white text-[11px] font-bold transition flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <span>✨</span>
                        {isBn ? "AI বিশ্লেষণ" : "AI Explanation"}
                      </button>
                    </div>
                  </div>
                ) : aiViewMode === "example" ? (
                  /* Show example ONLY with a CTA to show full analysis */
                  <div className="space-y-4">
                    {selectedSection.example && (
                      <div className={`p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-2`}>
                        <h4 className="text-xs uppercase font-bold text-rose-500 tracking-wider flex items-center gap-1.5 font-sans">
                          <BookOpen className="w-4 h-4" />
                          {isBn ? "AI উদাহরণ" : "AI Example"}
                        </h4>
                        <p className={`text-xs sm:text-sm leading-relaxed ${textPrimary} whitespace-pre-line font-serif`}>
                          {isBn ? selectedSection.exampleBn : selectedSection.example}
                        </p>
                        <p className={`text-[10px] sm:text-xs leading-relaxed italic ${textMuted} font-serif`}>
                          {isBn ? selectedSection.example : selectedSection.exampleBn}
                        </p>
                      </div>
                    )}

                    {/* Big button to show detailed AI explanation */}
                    <div className="p-4 rounded-xl border border-dashed border-emerald-500/20 bg-[#006A4E]/5 flex flex-col items-center justify-center text-center gap-3">
                      <p className={`text-xs ${textMuted} font-serif max-w-xs`}>
                        {isBn 
                          ? "এই ধারার উদ্দেশ্য, জরুরি শর্তাবলি এবং আদালতের ব্যাখ্যা সহ সম্পূর্ণ বিশদ বিশ্লেষণ দেখতে চান?" 
                          : "Would you like to view the full detailed analysis including purpose, vital requirements, and judicial rulings?"}
                      </p>
                      <button
                        onClick={() => setAiViewMode("full")}
                        className="px-4 py-2 rounded-xl bg-[#006A4E] hover:bg-[#004e39] text-white text-[11px] font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        {isBn ? "বিস্তারিত AI বিশ্লেষণ" : "Detailed AI Analysis"}
                      </button>
                    </div>

                    {/* Back to main controls */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => setAiViewMode("collapsed")}
                        className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition font-serif cursor-pointer underline underline-offset-4"
                      >
                        {isBn ? "← পেছনে ফিরে যান" : "← Go Back"}
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Show BOTH (Full Mode) code block */
                  <div className="space-y-4">
                    {/* Practical Case Study / Example Block */}
                    {selectedSection.example && (
                      <div className={`p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 space-y-2`}>
                        <h4 className="text-xs uppercase font-bold text-rose-500 tracking-wider flex items-center gap-1.5 font-sans">
                          <BookOpen className="w-4 h-4" />
                          {isBn ? "AI উদাহরণ" : "AI Example"}
                        </h4>
                        <p className={`text-xs sm:text-sm leading-relaxed ${textPrimary} whitespace-pre-line font-serif`}>
                          {isBn ? selectedSection.exampleBn : selectedSection.example}
                        </p>
                        <p className={`text-[10px] sm:text-xs leading-relaxed italic ${textMuted} font-serif`}>
                          {isBn ? selectedSection.example : selectedSection.exampleBn}
                        </p>
                      </div>
                    )}

                    {/* Legal Explanation Block with structured subheaders */}
                    {selectedSection.explanation && (
                      <div className={`p-4 rounded-xl bg-emerald-500/5 border ${borderCol} space-y-2`}>
                        <h4 className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400 tracking-wider flex items-center gap-1.5 font-sans">
                          <Scale className="w-4 h-4" />
                          {isBn ? "বিস্তারিত AI বিশ্লেষণ" : "Detailed AI Analysis"}
                        </h4>
                        <p className={`text-xs sm:text-sm leading-relaxed ${textPrimary} whitespace-pre-line font-serif`}>
                          {isBn ? selectedSection.explanationBn : selectedSection.explanation}
                        </p>
                        <p className={`text-[10px] sm:text-xs leading-relaxed italic ${textMuted} font-serif`}>
                          {isBn ? selectedSection.explanation : selectedSection.explanationBn}
                        </p>
                      </div>
                    )}

                    {/* Control keys to switch / collapse */}
                    <div className="flex items-center justify-center gap-4">
                      <button
                        onClick={() => setAiViewMode("example")}
                        className="text-[11px] text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 transition font-serif cursor-pointer underline underline-offset-4"
                      >
                        {isBn ? "শুধু উদাহরণ দেখুন" : "View Example Only"}
                      </button>
                      <span className="text-slate-300 dark:text-slate-700">|</span>
                      <button
                        onClick={() => setAiViewMode("collapsed")}
                        className="text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition font-serif cursor-pointer underline underline-offset-4"
                      >
                        {isBn ? "বিশ্লেষণ বন্ধ করুন" : "Collapse Analysis"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Toolbar Trigger controls */}
                <div className={`grid grid-cols-2 gap-2 pt-4 border-t ${borderCol}`}>
                  <button 
                    onClick={() => handleToggleBookmark(selectedSection.id)}
                    className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      bookmarks.includes(selectedSection.id)
                        ? "bg-slate-900 border-slate-950 text-white"
                        : `${surface} hover:${surfaceAlt} ${textPrimary} ${borderCol}`
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${bookmarks.includes(selectedSection.id) ? "fill-amber-400 text-amber-400" : ""}`} />
                    {bookmarks.includes(selectedSection.id)
                      ? (isBn ? "সংরক্ষিত" : "Saved Book")
                      : (isBn ? "বুকমার্ক করুন" : "Bookmark")}
                  </button>

                  <button 
                    onClick={() => handleToggleFavorite(selectedSection.id)}
                    className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                      favorites.includes(selectedSection.id)
                        ? "bg-rose-950/20 border-rose-900 text-rose-500"
                        : `${surface} hover:${surfaceAlt} ${textPrimary} ${borderCol}`
                    }`}
                  >
                    <Star className={`w-4 h-4 ${favorites.includes(selectedSection.id) ? "fill-rose-500 text-rose-500" : ""}`} />
                    {favorites.includes(selectedSection.id)
                      ? (isBn ? "প্রিয় তালিকাভুক্ত" : "Favorited")
                      : (isBn ? "প্রিয়তে যোগ করুন" : "Add Favorite")}
                  </button>

                  <button 
                    onClick={() => {
                      setNoteText(notes[selectedSection.id] || "");
                      setShowNote(true);
                    }}
                    className={`p-3 rounded-xl border ${borderCol} ${surface} hover:${surfaceAlt} ${textPrimary} font-bold text-xs flex items-center justify-center gap-2 transition-all col-span-2`}
                  >
                    <FileText className="w-4 h-4 text-emerald-500" />
                    {notes[selectedSection.id] ? (isBn ? "টীকা সংশোধন করুন" : "Edit Saved Note") : (isBn ? "ব্যক্তিগত টীকা যোগ করুন" : "Compose Personal Note")}
                  </button>

                  <button 
                    onClick={() => handleShareSection(selectedSection)}
                    className={`p-2 py-2.5 rounded-lg bg-emerald-800/15 text-emerald-400 border border-emerald-900/40 hover:bg-emerald-800/25 transition font-bold text-xs flex items-center justify-center gap-1.5 col-span-2`}
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    {isBn ? "এই ধারা ও অনুবাদ শেয়ার করুন" : "Share Clause & Translation"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* B. DRILL-DOWN IF LAW SELECTED */}
          {selectedLaw && !selectedSection && (
            <div>
              {(() => {
                const law = LAWS.find((l) => l.id === selectedLaw);
                if (!law) return <p className="p-4 text-destructive">Law not found</p>;
                return (
                  <div className="flex flex-col">
                    {/* Hero Header Frame */}
                    <div 
                      className="p-5 text-white relative overflow-hidden shadow-lg pb-7 shrink-0"
                      style={{ background: `linear-gradient(135deg, ${law.color} 0%, #17202A 100%)` }}
                    >
                      <button 
                        onClick={() => setSelectedLaw(null)}
                        className="p-1.5 rounded-lg bg-black/20 hover:bg-black/30 text-white transition mb-4 inline-flex items-center gap-1"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-mono tracking-widest uppercase">
                              {law.category} Law
                            </span>
                            <span className="px-2 py-0.5 rounded bg-white/20 text-[10px] font-mono">
                              ESTD {law.year}
                            </span>
                          </div>
                          <h2 className="text-xl font-bold font-serif tracking-tight pr-4">
                            {isBn ? law.titleBn : law.title}
                          </h2>
                          <p className="text-xs text-white/80 mt-1 dark:text-slate-300">
                            {isBn ? law.title : law.titleBn}
                          </p>
                        </div>
                        <span className="text-4xl filter drop-shadow-md shrink-0 block">{law.icon}</span>
                      </div>
                    </div>

                    {/* Metadata & Chapters section */}
                    <div className="p-4 space-y-4">
                      
                      {/* Legal description */}
                      <div className={`p-4 rounded-xl ${surfaceAlt} border ${borderCol} text-xs leading-relaxed`}>
                        <p className={`font-serif text-sm ${textPrimary} italic mb-1.5`}>
                          " {isBn ? law.descriptionBn : law.description} "
                        </p>
                        <span className="text-[10px] font-mono font-bold text-slate-400">
                          {law.totalSections} {isBn ? "মোট ধারা সূচী" : "Total indexed sections available"}
                        </span>
                      </div>

                      {/* Interactive Section Selector Tabs */}
                      <div className="flex rounded-xl bg-slate-200/50 dark:bg-slate-800/40 p-1 border border-slate-200 dark:border-slate-800/80">
                        {[
                          { id: "all", label: "সকল ধারা (১-" + toBengaliNumber(law.totalSections) + ")", labelEn: "All Sections (1-" + law.totalSections + ")" },
                          { id: "key", label: "গুরুত্বপূর্ণ ধারা", labelEn: "Key Sections" },
                          { id: "chapters", label: "অধ্যায় সূচী", labelEn: "Chapters" }
                        ].map((t) => {
                          const active = lawActiveTab === t.id;
                          return (
                            <button
                              key={t.id}
                              onClick={() => {
                                setLawActiveTab(t.id as any);
                                setLocalSectionSearch("");
                              }}
                              className={`flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-all ${
                                active
                                  ? "bg-white dark:bg-[#161B26] shadow-sm text-[#006A4E] dark:text-emerald-400 font-bold"
                                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                              }`}
                            >
                              {isBn ? t.label : t.labelEn}
                            </button>
                          );
                        })}
                      </div>

                      {/* TAB CONTENT: CHAPTERS */}
                      {lawActiveTab === "chapters" && (
                        <div>
                          <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${textMuted} flex items-center gap-1`}>
                            <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                            {isBn ? "কানুনি বিভাগসমূহ (অধ্যায় সূচী)" : "Chapters Grid"}
                          </h4>
                          <div className="space-y-2">
                            {law.chapters.map((ch) => (
                              <div 
                                key={ch.num} 
                                className={`p-3 rounded-xl border ${borderCol} ${surface} flex flex-col`}
                              >
                                <div className="flex justify-between items-center text-xs">
                                  <span className="font-mono font-bold text-emerald-500 uppercase tracking-widest">
                                    Chapter {ch.num}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded bg-slate-200/60 dark:bg-slate-800 text-[10px] font-mono ${textMuted}`}>
                                    Sec. {ch.sections}
                                  </span>
                                </div>
                                <span className={`text-sm font-bold ${textPrimary} mt-1 font-serif`}>
                                  {isBn ? ch.titleBn : ch.title}
                                </span>
                                <span className="text-[10px] text-slate-400">
                                  {isBn ? ch.title : ch.titleBn}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* TAB CONTENT: KEY SECTIONS */}
                      {lawActiveTab === "key" && (
                        <div>
                          <h4 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${textMuted} flex items-center gap-1`}>
                            <Scale className="w-3.5 h-3.5 text-rose-500" />
                            {isBn ? "গুরুত্বপূর্ণ আইনি ধারাসমূহ" : "Key Auditable Sections"}
                          </h4>
                          <div className="space-y-2.5">
                            {law.sections.map((sec) => {
                              const hasAnnot = notes[sec.id];
                              return (
                                <div
                                  key={sec.id}
                                  onClick={() => handleOpenSection({ ...sec, lawColor: law.color, lawTitle: isBn ? law.titleBn : law.title, lawCode: law.code, lawId: law.id, lawIcon: law.icon, category: law.category })}
                                  className={`p-4 rounded-xl border ${borderCol} ${surface} hover:bg-slate-100/40 dark:hover:bg-slate-800/30 transition-all cursor-pointer flex justify-between gap-3 relative overflow-hidden`}
                                >
                                  <div className="space-y-1.5 flex-1 pr-2">
                                    <div className="flex items-center gap-2">
                                      <span 
                                        className="px-2 py-0.5 rounded text-[10px] font-bold font-mono text-white" 
                                        style={{ backgroundColor: law.color }}
                                      >
                                        § {sec.num}
                                      </span>
                                      {bookmarks.includes(sec.id) && <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500" />}
                                      {favorites.includes(sec.id) && <Star className="w-3 h-3 text-rose-500 fill-rose-500" />}
                                      {hasAnnot && <FileText className="w-3 h-3 text-green-500" />}
                                    </div>
                                    <h5 className={`text-sm font-bold ${textPrimary} font-serif leading-snug line-clamp-1`}>
                                      {isBn ? sec.titleBn : sec.title}
                                    </h5>
                                    <p className={`text-xs ${textMuted} font-serif leading-normal line-clamp-2`}>
                                      {isBn ? sec.textBn : sec.text}
                                    </p>
                                  </div>
                                  <div className="flex flex-col justify-between items-end text-slate-400 select-none">
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="text-[9px] font-mono">{law.code}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* TAB CONTENT: BROWSE ALL SECTIONS (1 to N) */}
                      {lawActiveTab === "all" && (
                        <div className="space-y-3">
                          {/* Inner Search Box */}
                          <div className="relative">
                            <input
                              type="text"
                              placeholder={isBn ? "ধারা নম্বর লিখুন (যেমন: ৩০২)..." : "Enter section number (e.g. 302)..."}
                              value={localSectionSearch}
                              onChange={(e) => setLocalSectionSearch(e.target.value)}
                              className={`w-full px-4 py-2.5 pl-10 rounded-xl border ${borderCol} ${surface} text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] dark:focus:ring-emerald-400`}
                            />
                            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                            {localSectionSearch && (
                              <button onClick={() => setLocalSectionSearch("")} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <div className={`text-[11px] ${textMuted} font-semibold flex justify-between px-1`}>
                            <span>{isBn ? "ধারা সূচী ১ থেকে " + toBengaliNumber(law.totalSections) : "All sections 1 to " + law.totalSections}</span>
                            <span>{isBn ? "মোট ধারা: " + toBengaliNumber(law.totalSections) : "Total: " + law.totalSections}</span>
                          </div>

                          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                            {(() => {
                              // Dynamically construct all section indexes
                              const indexes = Array.from({ length: law.totalSections }, (_, i) => i + 1);
                              // Filter by the local search number
                              const filteredIndexes = indexes.filter(num => {
                                const q = localSectionSearch.trim();
                                if (!q) return true;
                                const matchBn = toBengaliNumber(num);
                                return num.toString().includes(q) || matchBn.includes(q);
                              });

                              if (filteredIndexes.length === 0) {
                                return (
                                  <p className="p-8 text-center text-xs text-slate-400">
                                    {isBn ? "কোনো ধারা পাওয়া যায়নি" : "No sections found with this number"}
                                  </p>
                                );
                              }

                              return filteredIndexes.map((num) => {
                                // Resolve section details dynamically or from hardcoded list
                                const sec = getResolvedSection(law, num);
                                const isPredefined = law.sections.some(s => s.num === num);
                                const hasAnnot = notes[sec.id];
                                const isCached = customGeneratedSections[sec.id]?.isAiGenerated;

                                return (
                                  <div
                                    key={sec.id}
                                    onClick={() => handleOpenSection({
                                      ...sec,
                                      lawIcon: law.icon,
                                      category: law.category,
                                      ...(customGeneratedSections[sec.id] || {})
                                    })}
                                    className={`p-3.5 rounded-xl border ${borderCol} ${surface} hover:bg-slate-100/40 dark:hover:bg-slate-800/20 transition cursor-pointer flex justify-between items-center gap-2`}
                                  >
                                    <div className="flex-1 min-w-0 space-y-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span 
                                          className="px-2 py-0.5 rounded text-[10px] font-bold font-mono text-white" 
                                          style={{ backgroundColor: law.color }}
                                        >
                                          § {isBn ? toBengaliNumber(num) : num}
                                        </span>
                                        {isPredefined && (
                                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-[#006A4E] dark:text-emerald-400 font-bold text-[9px]">
                                            {isBn ? "গুরুত্বপূর্ণ" : "Key"}
                                          </span>
                                        )}
                                        {isCached && (
                                          <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-bold text-[9px] flex items-center gap-0.5">
                                            <span>✨</span>
                                            {isBn ? "এআই তথ্য" : "AI Info"}
                                          </span>
                                        )}
                                        {bookmarks.includes(sec.id) && <Bookmark className="w-3 h-3 text-amber-500 fill-amber-500" />}
                                        {favorites.includes(sec.id) && <Star className="w-3 h-3 text-rose-500 fill-rose-500" />}
                                        {hasAnnot && <FileText className="w-3 h-3 text-green-500" />}
                                      </div>
                                      <h5 className={`text-sm font-bold ${textPrimary} font-serif truncate`}>
                                        {isBn 
                                          ? (sec.titleBn || `ধারা ${toBengaliNumber(num)}`) 
                                          : (sec.title || `Section ${num}`)
                                        }
                                      </h5>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                                  </div>
                                );
                              });
                            })()}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* C. GENERAL TAB DRAWER */}
          {!selectedLaw && !selectedSection && (
            <div>
              {/* TAB 1: DASHBOARD / HOME */}
              {tab === "home" && (
                <div>
                  
                  {/* Hero Welcoming Card */}
                  <div className="bg-gradient-to-br from-[#006A4E] to-[#004C38] px-4 pb-6 pt-2 text-white relative shadow-md">
                    <p className="text-emerald-200/90 text-xs mb-3 font-medium">
                      {isBn ? "স্মার্ট ডিজিটাল লিগ্যাল কমপ্যানিয়ন" : "Smart digital legal directory of Bangladesh"}
                    </p>

                    {/* Integrated Search Console triggering tab redirect */}
                    <div className="relative mb-4">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="w-4.5 h-4.5" />
                      </div>
                      <input
                        type="text"
                        value={searchQ}
                        onChange={(e) => {
                          setSearchQ(e.target.value);
                          setTab("search");
                        }}
                        placeholder={isBn ? "ধারা নম্বর, শিরোনাম বা শব্দ অনুসন্ধান..." : "Search sections, topics, codes..."}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white text-slate-900 text-xs outline-none focus:ring-2 focus:ring-emerald-400 tracking-wide font-sans shadow-md"
                      />
                    </div>

                    {/* Macro Counters Panel */}
                    <div className="bg-emerald-950/45 border border-emerald-800/50 rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-white">
                      <div>
                        <span className="text-base font-bold font-serif tracking-tight block">
                          {LAWS.length}
                        </span>
                        <span className="text-[10px] text-emerald-200 block">
                          {isBn ? "আইন গ্রন্থ" : "Statutes"}
                        </span>
                      </div>
                      <div>
                        <span className="text-base font-bold font-serif tracking-tight block">
                          {allSectionsWeighted.length}
                        </span>
                        <span className="text-[10px] text-emerald-200 block">
                          {isBn ? "গুরুত্বপূর্ণ ধারা" : "Key Clauses"}
                        </span>
                      </div>
                      <div>
                        <span className="text-base font-bold font-serif tracking-tight block">
                          {bookmarks.length}
                        </span>
                        <span className="text-[10px] text-emerald-200 block">
                          {isBn ? "সংরক্ষিত" : "My Bookmarks"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Scroll Quick-launch laws */}
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className={`text-xs font-bold uppercase tracking-wider ${textMuted}`}>
                        {isBn ? "সংবিধিবদ্ধ আইন সমূহ" : "Core Legal Statutes"}
                      </span>
                    </div>
                    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                      {LAWS.map((law) => (
                        <div
                          key={law.id}
                          onClick={() => setSelectedLaw(law.id)}
                          className={`flex-shrink-0 p-3 h-28 w-28 rounded-xl border ${borderCol} ${surface} hover:${surfaceAlt} transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden`}
                        >
                          <div 
                            className="absolute left-0 top-0 right-0 h-1" 
                            style={{ backgroundColor: law.color }}
                          />
                          <div className="flex justify-between items-center">
                            <span className="text-lg">{law.icon}</span>
                            <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold font-mono`} style={{ color: law.color, background: `${law.color}15` }}>
                              {law.code}
                            </span>
                          </div>
                          <div>
                            <h4 className={`text-xs font-bold leading-tight line-clamp-2 ${textPrimary} font-serif`}>
                              {isBn ? law.titleBn : law.title}
                            </h4>
                            <span className="text-[9px] text-slate-400 block mt-0.5">
                              ESTD {law.year}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recently Viewed History list */}
                  {recentlyViewed.length > 0 && (
                    <div className="px-4 pb-4">
                      <div className="flex justify-between items-center mb-2.5">
                        <span className={`text-xs font-bold uppercase tracking-wider ${textMuted} flex items-center gap-1`}>
                          <Eye className="w-3.5 h-3.5 text-teal-500" />
                          {isBn ? "সম্প্রতি পর্যবেক্ষণ করেছেন" : "Recently Visited"}
                        </span>
                        <button 
                          onClick={handleClearRecentlyViewed}
                          className="text-[10px] text-rose-500 dark:text-rose-400 font-bold hover:underline"
                        >
                          {isBn ? "মুছে ফেলুন" : "Clear History"}
                        </button>
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {recentlyViewed.map((s) => (
                          <div
                            key={s.id}
                            onClick={() => handleOpenSection(s)}
                            className={`flex-shrink-0 p-3 rounded-xl border ${borderCol} ${surface} hover:${surfaceAlt} cursor-pointer w-36 flex flex-col`}
                          >
                            <span 
                              className="text-[9px] font-bold font-mono tracking-wider w-fit px-1.5 py-0.5 rounded text-white"
                              style={{ backgroundColor: s.lawColor || accentBNEmerald }}
                            >
                              § {s.num}
                            </span>
                            <h5 className={`text-xs font-bold ${textPrimary} font-serif mt-1.5 line-clamp-1`}>
                              {isBn ? s.titleBn : s.title}
                            </h5>
                            <span className="text-[9px] text-slate-400 mt-1 font-mono">{s.lawCode}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Circular Bullet Feed */}
                  <div className="px-4 pt-1 pb-4">
                    <div className="flex justify-between items-center mb-2.5">
                      <span className={`text-xs font-bold uppercase tracking-wider ${textMuted} flex items-center gap-1`}>
                        <Calendar className="w-3.5 h-3.5 text-rose-500" />
                        {isBn ? "আইন সংশোধন ও প্রজ্ঞাপন ফিড" : "Supreme Court Circulars & Updates"}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {UPDATES.map((u) => (
                        <div 
                          key={u.id} 
                          className={`p-3.5 rounded-xl border ${borderCol} ${surface} flex flex-col gap-1 hover:border-slate-400 transition-colors`}
                        >
                          <div className="flex justify-between items-center text-[10px] font-sans">
                            <span className="font-bold text-[#006A4E] dark:text-emerald-400">{u.law}</span>
                            <span className="text-slate-400 font-mono">{u.date}</span>
                          </div>
                          <p className={`text-xs font-serif ${textPrimary} leading-relaxed font-semibold`}>
                            {isBn ? u.summaryBn : u.summary}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="px-2 py-0.5 rounded text-[8px] bg-amber-500/10 text-amber-500 font-bold font-mono">
                              {u.type}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[8px] bg-red-500/10 text-rose-500 font-bold font-mono">
                              {u.badge}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: LAWS CATALOG PAGE */}
              {tab === "book" && (
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
                    <h3 className={`text-base font-bold ${textPrimary}`}>
                      {isBn ? "আইন গ্রন্থ ও আইন সংকলন" : "Laws & Legal Codes"}
                    </h3>
                    <span className={`text-xs font-mono ${textMuted}`}>{LAWS.length} Codes</span>
                  </div>

                  {/* Category Pills Slider */}
                  <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilterCat(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                          filterCat === cat
                            ? "bg-[#006A4E] text-white"
                            : `${surfaceAlt} ${textMuted} hover:${surface}`
                        }`}
                      >
                        {isBn ? (
                          cat === "All" ? "সব বিভাগ" : cat === "Criminal" ? "ফৌজদারি" : cat === "Constitutional" ? "সাংবিধানিক" : cat === "Procedural" ? "পদ্ধতিগত" : cat === "Evidence" ? "সাক্ষ্য" : cat === "Special" ? "বিশেষ আইন" : cat === "Digital" ? "ডিজিটাল" : cat === "Transport" ? "পরিবহন" : "প্রশাসনিক"
                        ) : cat}
                      </button>
                    ))}
                  </div>

                  {/* Law Catalog Cards Listing */}
                  <div className="space-y-3.5">
                    {LAWS.filter((l) => filterCat === "All" || l.category === filterCat).map((law) => (
                      <div
                        key={law.id}
                        onClick={() => setSelectedLaw(law.id)}
                        className={`p-4 rounded-2xl border ${borderCol} ${surface} hover:bg-slate-500/5 cursor-pointer transition-all flex justify-between items-start relative overflow-hidden`}
                      >
                        <div 
                          className="absolute left-0 top-0 bottom-0 w-1.5"
                          style={{ backgroundColor: law.color }}
                        />
                        <div className="space-y-2 flex-1 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 text-[9px] font-bold font-mono rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                              {law.category}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              YEAR {law.year}
                            </span>
                          </div>
                          <h4 className={`text-base font-bold ${textPrimary} font-serif leading-tight`}>
                            {isBn ? law.titleBn : law.title}
                          </h4>
                          <h5 className={`text-[10px] ${textMuted}`}>
                            {isBn ? law.title : law.titleBn}
                          </h5>
                          <p className={`text-xs ${textMuted} font-serif line-clamp-2 leading-relaxed`}>
                            {isBn ? law.descriptionBn : law.description}
                          </p>
                        </div>
                        <div className="text-right flex flex-col justify-between h-full self-stretch items-end">
                          <span className="text-3xl filter drop-shadow-sm select-none">{law.icon}</span>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold mt-4`} style={{ backgroundColor: `${law.color}15`, color: law.color }}>
                            {law.totalSections} Secs
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SEARCH CONSOLE */}
              {tab === "search" && (
                <div className="p-4 space-y-4">
                  
                  {/* Search Header Form */}
                  <div className="space-y-2">
                    <h3 className={`text-base font-bold ${textPrimary}`}>
                      {isBn ? "পূর্ণাঙ্গ অনুসন্ধান" : "Full-text Bilingual Search"}
                    </h3>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="w-4 h-4" />
                      </div>
                      {searchQ && (
                        <button 
                          onClick={() => setSearchQ("")}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <input
                        type="text"
                        value={searchQ}
                        onChange={(e) => setSearchQ(e.target.value)}
                        placeholder={isBn ? "ধারা নম্বর, বিষয় বা অপরাধ খুঁজুন..." : "Types code name, section number, details..."}
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl border ${borderCol} ${surface} ${textPrimary} text-xs outline-none focus:ring-1 focus:ring-emerald-500`}
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Filters within Search Results */}
                  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSearchFilterCat(cat)}
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${
                          searchFilterCat === cat
                            ? "bg-slate-900 text-white"
                            : `${surfaceAlt} ${textMuted} hover:${surface}`
                        }`}
                      >
                        {isBn ? (
                          cat === "All" ? "সব ক্যাটাগরি" : cat === "Criminal" ? "ফৌজদারি" : cat === "Constitutional" ? "সাংবিধানিক" : cat === "Procedural" ? "পদ্ধতিগত" : cat === "Evidence" ? "সাক্ষ্য" : cat === "Special" ? "বিশেষ" : cat === "Digital" ? "ডিজিটাল" : "পরিবহন/অন্যান্য"
                        ) : cat}
                      </button>
                    ))}
                  </div>

                  {/* Results Panel */}
                  <div className="space-y-3">
                    {searchQ.trim() === "" ? (
                      <div className="py-12 text-center text-slate-400 space-y-2">
                        <Scale className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                        <p className="text-xs">
                          {isBn ? "ধারা নম্বর অথবা关键词 লিখে অনুসন্ধান করুন" : "Search any statute by code word, section, or subject query"}
                        </p>
                        <div className="flex flex-wrap justify-center gap-1.5 max-w-xs mx-auto pt-2">
                          {["murder", "arrest", "theft", "equality", "302", "54", "ধর্ষণ", "মানহানি"].map((term) => (
                            <button
                              key={term}
                              onClick={() => setSearchQ(term)}
                              className={`px-2.5 py-1 rounded text-[10px] ${surfaceAlt} ${textMuted} hover:bg-slate-200`}
                            >
                              "{term}"
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : searchResults.length === 0 ? (
                      <div className="py-12 text-center text-slate-400 space-y-1.5">
                        <AlertCircle className="w-8 h-8 mx-auto text-amber-500/80" />
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {isBn ? "কোনো ফলাফল পাওয়া যায়নি" : "No Matches Found"}
                        </h4>
                        <p className="text-xs max-w-xs mx-auto">
                          {isBn ? "অনুগ্রহ করে আপনার বানান পরীক্ষা করে অন্য শব্দ দিয়ে চেষ্টা করুন।" : "Try modifying your keywords or check spelling errors."}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
                          <span>{isBn ? "অনুসন্ধান ম্যাচ সমূহ:" : "Search Results Match"}</span>
                          <span>{searchResults.length} Match(es)</span>
                        </div>
                        {searchResults.map((sec) => (
                          <div
                            key={sec.id}
                            onClick={() => handleOpenSection(sec)}
                            className={`p-4 rounded-xl border ${borderCol} ${surface} hover:bg-slate-500/5 cursor-pointer transition-all flex flex-col gap-1.5 relative overflow-hidden`}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs">{sec.lawIcon}</span>
                                <span className={`text-[10px] font-mono font-bold uppercase ${textMuted}`}>
                                  {sec.lawCode} / CHAPTER {sec.chapter}
                                </span>
                              </div>
                              <span 
                                className="px-2 py-0.5 text-[9px] font-bold rounded text-white font-mono"
                                style={{ backgroundColor: sec.lawColor }}
                              >
                                § {sec.num}
                              </span>
                            </div>
                            <h4 className={`text-sm font-bold ${textPrimary} font-serif leading-snug line-clamp-1`}>
                              {isBn ? sec.titleBn : sec.title}
                            </h4>
                            <p className={`text-xs ${textMuted} font-serif line-clamp-2 leading-relaxed`}>
                              {isBn ? sec.textBn : sec.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* TAB 4: BOOKMARKS & NOTES */}
              {tab === "bookmark" && (
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
                    <h3 className={`text-base font-bold ${textPrimary}`}>
                      {isBn ? "সংরক্ষিত ধারা ও বুকমার্ক সূচী" : "Bookmarks & Saved Clauses"}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">{bookmarks.length} saved</span>
                  </div>

                  {bookmarks.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 space-y-2">
                      <Bookmark className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                      <p className="text-xs max-w-xs mx-auto">
                        {isBn ? "কোনো ধারা বুকমার্ক করা নেই। গুরুত্বপূর্ণ ধারাগুলো বুকমার্ক করতে ধারা বিস্তারিত পাতায় বুকমার্ক বাটনে চাপুন।" : "No bookmarked clauses present. Access details of any section to press 'Bookmark' to save them here."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allSectionsWeighted
                        .filter((s) => bookmarks.includes(s.id))
                        .map((sec) => {
                          const hasAnnot = notes[sec.id];
                          return (
                            <div
                              key={sec.id}
                              className={`p-4 rounded-xl border ${borderCol} ${surface} flex flex-col gap-2 relative overflow-hidden`}
                            >
                              <div className="flex justify-between items-start">
                                <div onClick={() => handleOpenSection(sec)} className="flex items-center gap-1.5 cursor-pointer">
                                  <span>{sec.lawIcon}</span>
                                  <span className={`text-[9px] font-mono font-bold uppercase ${textMuted}`}>
                                    {sec.lawCode} / SECTION {sec.num}
                                  </span>
                                </div>
                                <button 
                                  onClick={() => handleToggleBookmark(sec.id)}
                                  className="text-slate-400 hover:text-red-500 p-0.5"
                                  aria-label="Remove Bookmark"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div onClick={() => handleOpenSection(sec)} className="cursor-pointer space-y-1">
                                <h4 className={`text-sm font-bold ${textPrimary} font-serif leading-snug line-clamp-1`}>
                                  {isBn ? sec.titleBn : sec.title}
                                </h4>
                                <p className={`text-xs ${textMuted} font-serif line-clamp-2 leading-relaxed`}>
                                  {isBn ? sec.textBn : sec.text}
                                </p>
                              </div>

                              {hasAnnot && (
                                <div className="mt-1.5 pt-2 border-t border-dashed border-slate-300 dark:border-slate-800 flex justify-between items-start gap-2 bg-amber-400/5 p-2 rounded-lg">
                                  <div className="space-y-0.5 flex-1">
                                    <span className="text-[8px] uppercase tracking-wider font-bold text-amber-500 block">
                                      {isBn ? "আমার নোট:" : "My Annotation:"}
                                    </span>
                                    <p className="text-[11px] text-slate-700 dark:text-slate-300 italic line-clamp-2 leading-snug">
                                      {hasAnnot}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => {
                                      setSelectedSection(sec);
                                      setNoteText(hasAnnot);
                                      setShowNote(true);
                                    }}
                                    className="text-[9px] px-1.5 py-0.5 rounded border border-amber-400/30 text-amber-500 hover:bg-amber-400/10 font-bold"
                                  >
                                    {isBn ? "সংশোধন" : "Edit"}
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: FAVORITES CLUSTER */}
              {tab === "star" && (
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-200 dark:border-slate-800">
                    <h3 className={`text-base font-bold ${textPrimary}`}>
                      {isBn ? "গুরুত্বপূর্ণ প্রিয় ধারাসমূহ" : "Priority Favorite Clauses"}
                    </h3>
                    <span className="text-xs text-slate-500 font-mono">{favorites.length} items</span>
                  </div>

                  {favorites.length === 0 ? (
                    <div className="py-12 text-center text-slate-400 space-y-2">
                      <Star className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                      <p className="text-xs max-w-xs mx-auto">
                        {isBn ? "কোনো ধারা প্রিয় তালিকায় অন্তর্ভুক্ত করা নেই। অতিগুরুত্বপূর্ণ ধারা যুক্ত করে রাখুন।" : "No prioritized legal points favorited. Hit the star icon to append important sections to this premium checklist."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {allSectionsWeighted
                        .filter((s) => favorites.includes(s.id))
                        .map((sec) => (
                          <div
                            key={sec.id}
                            className={`p-4 rounded-xl border ${borderCol} ${surface} flex flex-col gap-2 relative overflow-hidden`}
                          >
                            <div className="flex justify-between items-start">
                              <div onClick={() => handleOpenSection(sec)} className="flex items-center gap-1.5 cursor-pointer">
                                <span>{sec.lawIcon}</span>
                                <span className={`text-[9px] font-mono font-bold uppercase ${textMuted}`}>
                                  {sec.lawCode} / SECTION {sec.num}
                                </span>
                              </div>
                              <button 
                                onClick={() => handleToggleFavorite(sec.id)}
                                className="text-rose-500 p-0.5"
                                aria-label="Remove From Favorites"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <div onClick={() => handleOpenSection(sec)} className="cursor-pointer space-y-1">
                              <h4 className={`text-sm font-bold ${textPrimary} font-serif leading-snug line-clamp-1`}>
                                {isBn ? sec.titleBn : sec.title}
                              </h4>
                              <p className={`text-xs ${textMuted} font-serif line-clamp-2 leading-relaxed`}>
                                {isBn ? sec.textBn : sec.text}
                              </p>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>

        {/* Right Sidebar (Desktop Only) */}
        <aside className={`hidden lg:flex flex-col w-[300px] shrink-0 border-l ${borderCol} ${surface} p-4 overflow-y-auto space-y-4`}>
          {/* Quick Statistics Title */}
          <div className={`font-bold text-xs flex items-center gap-1.5 ${textPrimary} border-b ${borderCol} pb-2 uppercase tracking-wider`}>
            <span>📊</span>
            <span>{isBn ? "কুইক পরিসংখ্যান" : "Quick Statistics"}</span>
          </div>

          {/* Quick Statistics Stats Card */}
          <div className="grid grid-cols-2 gap-2">
            <div className={`p-3 rounded-xl ${surfaceAlt} border ${borderCol} text-center`}>
              <div className="text-xl font-bold text-[#006A4E] dark:text-emerald-400 font-serif">
                {LAWS.length}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                {isBn ? "মোট আইন" : "Statutes Count"}
              </div>
            </div>
            <div className={`p-3 rounded-xl ${surfaceAlt} border ${borderCol} text-center`}>
              <div className="text-xl font-bold text-[#C8102E] dark:text-red-400 font-serif">
                {allSectionsWeighted.length}
              </div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 mt-0.5">
                {isBn ? "মোট ধারা" : "Key Clauses"}
              </div>
            </div>
          </div>

          {/* Supreme Court Bulletins Feed */}
          <div className={`font-bold text-xs ${textPrimary} pt-1`}>
            {isBn ? "সাম্প্রতিক নোটিশসমূহ" : "Supreme Court Bulletins"}
          </div>
          <div className="space-y-2.5">
            {UPDATES.map((u) => {
              let badgeColor = "border-red-600";
              if (u.type === "Circular") badgeColor = "border-amber-500";
              if (u.type === "Directive") badgeColor = "border-blue-500";
              return (
                <div 
                  key={u.id} 
                  className={`p-2.5 rounded-lg border-l-2 ${badgeColor} ${surfaceAlt} text-[11px] leading-snug flex flex-col gap-0.5`}
                >
                  <div className="font-bold flex justify-between text-[9px] text-[#006A4E] dark:text-emerald-400">
                    <span>{u.law}</span>
                    <span className="text-slate-400 font-mono italic">{u.date}</span>
                  </div>
                  <p className={`${textPrimary} font-semibold font-serif`}>
                    {isBn ? u.summaryBn : u.summary}
                  </p>
                  <span className="text-[8px] text-slate-400 uppercase font-mono tracking-widest block mt-0.5">
                    {u.type}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Offline DB Widget */}
          <div className="bg-[#006A4E] text-white p-4 rounded-2xl text-center shadow-lg relative overflow-hidden mt-auto">
            <div className="absolute right-0 bottom-0 text-white/5 font-bold font-serif text-6xl pointer-events-none select-none">
              BD
            </div>
            <div className="text-xs uppercase tracking-widest text-[#D1FAE5] opacity-95 font-semibold">
              {isBn ? "অফলাইন ডাটাবেস" : "Offline Database"}
            </div>
            <div className="font-bold text-sm my-1 leading-snug text-white">
              {isBn ? "স্মার্ট ডাউনলোড করুন" : "Sync Local Repository"}
            </div>
            <div className="text-[10px] text-emerald-100 opacity-80 mb-3">
              {isBn ? "আপডেট সাইজ: ১২.৫ এমবি" : "Update Size: 12.5 MB"}
            </div>
            <button 
              onClick={() => triggerToast(isBn ? "স্থানীয় ডেটাবেস সফলভাবে সিনক্রোনাইজড!" : "Successfully synchronized legal library!")}
              className="w-full bg-white text-[#006A4E] hover:bg-slate-100 transition duration-200 font-bold py-1.5 px-3 rounded-xl text-xs shadow-md"
            >
              {isBn ? "সিঙ্ক করুন" : "Sync Database"}
            </button>
          </div>
        </aside>

      </div>

        {/* 3. MODAL: COMPOSE NOTE OVERLAY */}
        {showNote && selectedSection && (
          <div className="absolute inset-0 bg-black/60 z-50 flex items-end justify-center transition-opacity">
            <div className={`w-full max-w-md ${surface} rounded-t-3xl shadow-2xl p-5 border-t ${borderCol} pb-8 flex flex-col gap-4 animate-slide-up`}>
              <div className="flex justify-between items-center pb-2 border-b">
                <div>
                  <h4 className={`text-sm font-bold uppercase tracking-wider ${textMuted}`}>
                    {isBn ? "গুরুত্বপূর্ণ আইনি টীকা যোগ" : "Legal Annotation Note"}
                  </h4>
                  <span className={`text-[10px] font-mono text-slate-400 mt-0.5 block`}>
                    {selectedSection.lawCode} § Section {selectedSection.num}
                  </span>
                </div>
                <button 
                  onClick={() => setShowNote(false)}
                  className={`p-1.5 rounded-lg ${surfaceAlt} ${textPrimary}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder={isBn ? "এই আইনি ধারা বা বিধান সম্পর্কে আপনার ব্যক্তিগত নোট অথবা মামলা নজির টাইপ করুন..." : "Compose legal note elements, case numbers, or procedural details about this clause..."}
                rows={5}
                className="w-full p-4 rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500 tracking-wide font-sans bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-100 leading-relaxed resize-none"
              />

              <div className="flex gap-2">
                <button 
                  onClick={handleSaveNote}
                  className="flex-1 py-3 bg-[#006A4E] text-white hover:bg-emerald-800 transition font-bold text-xs rounded-xl"
                >
                  {isBn ? "সংরক্ষণ করুন" : "Save Note"}
                </button>
                <button 
                  onClick={() => setShowNote(false)}
                  className={`flex-1 py-3 ${surfaceAlt} ${textPrimary} hover:bg-slate-300/40 transition font-bold text-xs rounded-xl`}
                >
                  {isBn ? "বাতিল" : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. NAVIGATION BAR (STICKY FOOTER FRAME) */}
        <div className={`absolute bottom-0 inset-x-0 h-16 lg:hidden ${surface} border-t ${borderCol} grid grid-cols-5 z-20 shrink-0 select-none shadow-lg px-2`}>
          {[
            { id: "home", label: "Home", labelBn: "প্রধান", icon: Home },
            { id: "book", label: "Laws", labelBn: "আইন গ্রন্থ", icon: Book },
            { id: "search", label: "Search", labelBn: "অনুসন্ধান", icon: Search },
            { id: "bookmark", label: "Saved", labelBn: "বুকমার্ক", icon: Bookmark },
            { id: "star", label: "Favorites", labelBn: "প্রিয় তালিকা", icon: Star }
          ].map((nav) => {
            const IconComponent = nav.icon;
            const active = tab === nav.id && !selectedLaw && !selectedSection;
            return (
              <button
                key={nav.id}
                onClick={() => {
                  setSelectedLaw(null);
                  setSelectedSection(null);
                  setTab(nav.id);
                  setShowNotifications(false);
                }}
                className={`flex flex-col items-center justify-center gap-1.5 transition-colors duration-200 outline-none ${
                  active ? "text-[#006A4E] dark:text-emerald-400 font-bold" : textMuted
                }`}
              >
                <div className="relative">
                  <IconComponent className="w-5 h-5 leading-none block" />
                  {nav.id === "bookmark" && bookmarks.length > 0 && (
                    <span className="absolute -top-1 -right-1 text-[8px] bg-amber-500 text-slate-950 font-bold font-mono h-3.5 w-3.5 flex items-center justify-center rounded-full">
                      {bookmarks.length}
                    </span>
                  )}
                  {nav.id === "star" && favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                  )}
                </div>
                <span className="text-[9px] leading-none tracking-wide text-center uppercase block font-medium">
                  {isBn ? nav.labelBn : nav.label}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
