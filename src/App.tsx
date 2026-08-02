import React, { useState, useEffect } from 'react';
import ExecutiveSummary from './components/ExecutiveSummary';
import SkillsGrid from './components/SkillsGrid';
import ClientProjects from './components/ClientProjects';
import CareerTimeline from './components/CareerTimeline';
import PMStrategy from './components/PMStrategy';
import { PERSONAL_INFO } from './data';
import { 
  Sparkles, Calendar, Mail, FileText, ArrowUpRight, Check,
  ChevronRight, ArrowRight, Award, Linkedin, UserCheck,
  Sun, Moon, Phone, MapPin, Briefcase, Code, Database, Info, Trash2, Copy, Download
} from 'lucide-react';

interface BookedSpot {
  id: string;
  name: string;
  company: string;
  role: string;
  date: string;
  time: string;
  createdAt: string;
}

// Check for saved theme preference or system preference
function getInitialTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('dustin_portfolio_theme');
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Fall back to system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  }
  return 'light';
}

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  
  // Dynamic Tab State
  const [activeTab, setActiveTab] = useState<'overview' | 'strategy' | 'projects' | 'timeline' | 'scheduler'>('overview');
  
  // Live Requested Spots state persisted in localStorage
  const [bookedSpots, setBookedSpots] = useState<BookedSpot[]>([]);
  const [scheduleStep, setScheduleStep] = useState<number>(1);
  const [justBookedSpot, setJustBookedSpot] = useState<BookedSpot | null>(null);
  
  const [isSending, setIsSending] = useState<boolean>(false);
  const [sendError, setSendError] = useState<string | null>(null);
  
  const [scheduleData, setScheduleData] = useState({
    name: '',
    company: '',
    role: 'Technical Product Manager',
    date: '2026-07-20',
    time: '14:00',
  });

  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Sync theme with html element and localStorage on mount
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Load booked spots from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('dustin_portfolio_spots');
    if (saved) {
      try {
        setBookedSpots(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing saved spots", e);
      }
    }
  }, []);

  // Set initial default date to tomorrow's date for usability
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setScheduleData(prev => ({ ...prev, date: `${yyyy}-${mm}-${dd}` }));
  }, []);

  // Save spots to localStorage whenever they change
  const saveSpots = (spots: BookedSpot[]) => {
    setBookedSpots(spots);
    localStorage.setItem('dustin_portfolio_spots', JSON.stringify(spots));
  };

  // Automated Scroll and Set Tab
  const scrollAndSetActiveTab = (tab: 'overview' | 'strategy' | 'projects' | 'timeline' | 'scheduler') => {
    setActiveTab(tab);
    setTimeout(() => {
      const anchor = document.getElementById('portfolio-content-anchor');
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const triggerEmailRequest = (spot: BookedSpot) => {
    const subject = encodeURIComponent(`[Interview Spot Request] ${spot.name} from ${spot.company}`);
    const body = encodeURIComponent(
      `Hi Dustin,\n\n` +
      `I would like to request an interview spot with you. Here are the details of my request:\n\n` +
      `- Contact Name: ${spot.name}\n` +
      `- Company/Agency Name: ${spot.company}\n` +
      `- Target Role Focus: ${spot.role}\n` +
      `- Proposed Date: ${spot.date}\n` +
      `- Proposed Time Slot: ${spot.time} EST\n\n` +
      `This request is also saved live in my local browser dashboard. Please reply to let me know if this works or if we should align on another slot.\n\n` +
      `Best regards,\n` +
      `${spot.name}`
    );
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendError(null);

    const newSpot: BookedSpot = {
      id: String(Date.now()),
      name: scheduleData.name,
      company: scheduleData.company,
      role: scheduleData.role,
      date: scheduleData.date,
      time: scheduleData.time,
      createdAt: new Date().toLocaleDateString(),
    };

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: `New Interview Spot Request - ${newSpot.name} from ${newSpot.company}`,
          _captcha: "false",
          "Name": newSpot.name,
          "Company / Agency": newSpot.company,
          "Role Focus": newSpot.role,
          "Scheduled Date": newSpot.date,
          "Scheduled Time Slot": `${newSpot.time} EST`,
          "Dashboard Verification Key": newSpot.id
        })
      });

      const data = await response.json();
      
      if (response.ok && data.success === "true") {
        // Successful transmission
        const updated = [newSpot, ...bookedSpots];
        saveSpots(updated);
        setJustBookedSpot(newSpot);
        setScheduleStep(2); // Show confirmation
      } else {
        throw new Error(data.message || "Failed to deliver email through automated service.");
      }
    } catch (err: any) {
      console.warn("API delivery warning, executing fallback:", err);
      // Fallback: We still save the spot locally so user doesn't lose anything
      const updated = [newSpot, ...bookedSpots];
      saveSpots(updated);
      setJustBookedSpot(newSpot);
      setSendError(err.message || "The browser couldn't connect to the live email dispatch service. Your request is saved locally in this session, but the automated email wasn't delivered. Please use the button below to send manually.");
      setScheduleStep(2); // Still transition to confirm page, but with the warning/fallback panel
    } finally {
      setIsSending(false);
    }
  };

  const cancelSpot = (id: string) => {
    const updated = bookedSpots.filter(spot => spot.id !== id);
    saveSpots(updated);
    if (justBookedSpot && justBookedSpot.id === id) {
      setJustBookedSpot(null);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('dustin_portfolio_theme', newTheme);
    // Apply to html element for better control
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Generate and download live ICS calendar invite
  const downloadICS = (spot: BookedSpot) => {
    const dateStr = spot.date.replace(/-/g, '');
    const startTime = spot.time.replace(/:/g, '') + '00';
    // Add 1 hour for duration
    const hourInt = parseInt(spot.time.split(':')[0]);
    const endTime = (hourInt + 1).toString().padStart(2, '0') + spot.time.split(':')[1] + '00';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Dustin Pierce Portfolio//Scheduler//EN',
      'BEGIN:VEVENT',
      `UID:${spot.id}@dustinpierce.portfolio`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;TZID=America/New_York:${dateStr}T${startTime}`,
      `DTEND;TZID=America/New_York:${dateStr}T${endTime}`,
      `SUMMARY:Meeting with Dustin Pierce (${spot.role})`,
      `DESCRIPTION:Interview discussion with Dustin Pierce. Requested by ${spot.name} representing ${spot.company}. Role focus: ${spot.role}.`,
      'LOCATION:Google Meet / Zoom (Link to be shared)',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Meeting_Dustin_Pierce_${dateStr}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy meeting details to clipboard
  const copyToClipboard = (spot: BookedSpot) => {
    const text = `Interview Spot with Dustin Pierce\n` +
      `---------------------------------\n` +
      `Requested By: ${spot.name}\n` +
      `Company: ${spot.company}\n` +
      `Role Focus: ${spot.role}\n` +
      `Date Scheduled: ${spot.date}\n` +
      `Selected Time: ${spot.time} EST\n` +
      `Location: Video Conference (Link to follow)\n` +
      `Status: Live, Active Request Sent`;

    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(spot.id);
      setTimeout(() => setCopyFeedback(null), 3000);
    });
  };

  return (
    <div className="min-h-screen bg-editorial-bg text-editorial-text font-sans antialiased selection:bg-[#FF4E00] selection:text-white relative overflow-hidden transition-colors duration-300">
      
      {/* TOP HEADER & STICKY NAV */}
      <header className="sticky top-0 z-50 bg-editorial-bg/95 backdrop-blur-md border-b border-editorial-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 border border-editorial-border text-editorial-text flex items-center justify-center font-display font-bold text-sm tracking-tighter bg-editorial-panel">
              DP
            </div>
            <div>
              <span className="font-display font-black text-editorial-text text-sm md:text-base leading-none block uppercase tracking-tight">
                {PERSONAL_INFO.name}
              </span>
              <span className="text-[9px] text-[#FF4E00] font-mono tracking-[0.2em] uppercase block mt-1">
                Technical PM // Full Stack Engineer
              </span>
            </div>
          </div>

          {/* Navigation links - switching activeTab dynamically + smooth scroll down */}
          <nav className="hidden lg:flex items-center gap-5 text-[10px] uppercase tracking-[0.15em] font-bold text-editorial-muted" role="tablist" aria-label="Portfolio Sections">
            <button 
              onClick={() => scrollAndSetActiveTab('overview')} 
              className={`py-2 transition-all cursor-pointer ${activeTab === 'overview' ? 'text-editorial-text border-b-2 border-[#FF4E00]' : 'hover:text-editorial-text'}`}
              role="tab"
              aria-selected={activeTab === 'overview'}
              aria-controls="portfolio-content-anchor"
            >
              Overview &amp; Skills
            </button>
            <button 
              onClick={() => scrollAndSetActiveTab('strategy')} 
              className={`py-2 transition-all cursor-pointer ${activeTab === 'strategy' ? 'text-editorial-text border-b-2 border-[#FF4E00]' : 'hover:text-editorial-text'}`}
              role="tab"
              aria-selected={activeTab === 'strategy'}
              aria-controls="portfolio-content-anchor"
            >
              Product Strategy
            </button>
            <button 
              onClick={() => scrollAndSetActiveTab('projects')} 
              className={`py-2 transition-all cursor-pointer ${activeTab === 'projects' ? 'text-editorial-text border-b-2 border-[#FF4E00]' : 'hover:text-editorial-text'}`}
              role="tab"
              aria-selected={activeTab === 'projects'}
              aria-controls="portfolio-content-anchor"
            >
              Projects Portfolio
            </button>
            <button 
              onClick={() => scrollAndSetActiveTab('timeline')} 
              className={`py-2 transition-all cursor-pointer ${activeTab === 'timeline' ? 'text-editorial-text border-b-2 border-[#FF4E00]' : 'hover:text-editorial-text'}`}
              role="tab"
              aria-selected={activeTab === 'timeline'}
              aria-controls="portfolio-content-anchor"
            >
              Professional History
            </button>
            <button 
              onClick={() => scrollAndSetActiveTab('scheduler')} 
              className={`py-2 transition-all cursor-pointer ${activeTab === 'scheduler' ? 'text-editorial-text border-b-2 border-[#FF4E00]' : 'hover:text-editorial-text'}`}
              role="tab"
              aria-selected={activeTab === 'scheduler'}
              aria-controls="portfolio-content-anchor"
            >
              Request Interview
            </button>
          </nav>

          {/* Theme Switcher & Contact Links */}
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2 border border-editorial-border bg-editorial-panel text-[#FF4E00] hover:bg-[#FF4E00] hover:text-white transition-all cursor-pointer flex items-center justify-center"
              title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>

            <button 
              onClick={() => scrollAndSetActiveTab('scheduler')}
              className="px-4 py-2 border border-editorial-border text-[9px] uppercase tracking-widest hover:bg-editorial-text hover:text-editorial-bg bg-editorial-panel text-editorial-text font-mono transition-all flex items-center gap-2 cursor-pointer"
              aria-label="Request Interview Spot"
            >
              <Calendar className="w-3 h-3 text-[#FF4E00]" />
              Request Spot
            </button>
          </div>
        </div>
      </header>

      {/* HERO BANNER SECTION */}
      <section className="bg-editorial-bg border-b border-editorial-border py-12 md:py-20 relative overflow-hidden">
        {/* Background Graphic Element */}
        <div className="absolute top-[-80px] left-[-40px] text-[20rem] md:text-[32rem] font-black text-editorial-text/[0.03] leading-none select-none pointer-events-none font-display uppercase">DP</div>

        {/* Delicate tech mesh/dots background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,78,0,0.05),transparent_70%)] pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4E00]/10 text-[#FF4E00] text-[9px] font-mono tracking-[0.25em] uppercase border border-[#FF4E00]/20">
            <Sparkles className="w-3.5 h-3.5" />
            Interview-Ready PM Portfolio
          </div>

          <h1 className="text-4xl md:text-7xl leading-[0.9] font-black tracking-tighter uppercase font-display text-editorial-text">
            TECHNICAL <br />
            <span className="text-stroke">PRODUCT</span> LEADERSHIP
          </h1>
          
          <p className="text-base md:text-lg font-serif italic text-editorial-muted max-w-2xl mx-auto leading-relaxed">
            Bridging software engineering execution, AI systems, and direct stakeholder collaboration to deliver robust production-level solutions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button 
              onClick={() => scrollAndSetActiveTab('projects')}
              className={`px-5 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeTab === 'projects' ? 'bg-editorial-text text-editorial-bg' : 'bg-[#FF4E00] hover:bg-editorial-text hover:text-editorial-bg text-white'}`}
            >
              Projects Portfolio
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            
            <button 
              onClick={() => scrollAndSetActiveTab('scheduler')}
              className="px-5 py-2.5 bg-editorial-panel hover:bg-editorial-text hover:text-editorial-bg text-editorial-text text-[10px] uppercase tracking-widest font-bold border border-editorial-border transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Request Interview Spot
              <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4E00]" />
            </button>
          </div>

          {/* Quick Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto pt-8 border-t border-editorial-border mt-12 text-left">
            <div className="relative pl-4 border-l border-[#FF4E00]">
              <div className="text-2xl font-black text-editorial-text font-display">B.S. CS</div>
              <div className="text-[9px] text-editorial-muted font-bold uppercase tracking-widest mt-1">Computer Science</div>
            </div>
            <div className="relative pl-4 border-l border-editorial-border">
              <div className="text-2xl font-black text-editorial-text font-display">PM &amp; Dev</div>
              <div className="text-[9px] text-editorial-muted font-bold uppercase tracking-widest mt-1">Multi-Contract Rollouts</div>
            </div>
            <div className="relative pl-4 border-l border-editorial-border">
              <div className="text-2xl font-black text-editorial-text font-display">AI Fluent</div>
              <div className="text-[9px] text-editorial-muted font-bold uppercase tracking-widest mt-1">AI Build &amp; Integrations</div>
            </div>
            <div className="relative pl-4 border-l border-editorial-border">
              <div className="text-2xl font-black text-editorial-text font-display">Resilient</div>
              <div className="text-[9px] text-editorial-muted font-bold uppercase tracking-widest mt-1">Pro &amp; Semi-Pro Athlete</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PORTFOLIO CONTAINER WITH PAGES CONTROLLER */}
      {/* Target for auto scroll-down when any tab is clicked */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10" id="portfolio-content-anchor">
        
        {/* Dynamic Navigation Tabs inside Content Area for Mobile-Friendly view switching */}
        <div className="flex lg:hidden justify-center items-center gap-1.5 p-1 mx-[3px] bg-editorial-panel border border-editorial-border mb-8 overflow-x-auto w-full" role="tablist" aria-label="Portfolio Sections (Mobile)">
          <button 
            onClick={() => scrollAndSetActiveTab('overview')} 
            className={`px-3 py-2 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap rounded-none transition-all cursor-pointer ${activeTab === 'overview' ? 'bg-[#FF4E00] text-white' : 'text-editorial-muted'}`}
            role="tab"
            aria-selected={activeTab === 'overview'}
            aria-controls="portfolio-content-anchor"
          >
            Overview
          </button>
          <button 
            onClick={() => scrollAndSetActiveTab('strategy')} 
            className={`px-3 py-2 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap rounded-none transition-all cursor-pointer ${activeTab === 'strategy' ? 'bg-[#FF4E00] text-white' : 'text-editorial-muted'}`}
            role="tab"
            aria-selected={activeTab === 'strategy'}
            aria-controls="portfolio-content-anchor"
          >
            Strategy
          </button>
          <button 
            onClick={() => scrollAndSetActiveTab('projects')} 
            className={`px-3 py-2 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap rounded-none transition-all cursor-pointer ${activeTab === 'projects' ? 'bg-[#FF4E00] text-white' : 'text-editorial-muted'}`}
            role="tab"
            aria-selected={activeTab === 'projects'}
            aria-controls="portfolio-content-anchor"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollAndSetActiveTab('timeline')} 
            className={`px-3 py-2 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap rounded-none transition-all cursor-pointer ${activeTab === 'timeline' ? 'bg-[#FF4E00] text-white' : 'text-editorial-muted'}`}
            role="tab"
            aria-selected={activeTab === 'timeline'}
            aria-controls="portfolio-content-anchor"
          >
            History
          </button>
          <button 
            onClick={() => scrollAndSetActiveTab('scheduler')} 
            className={`px-3 py-2 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap rounded-none transition-all cursor-pointer ${activeTab === 'scheduler' ? 'bg-[#FF4E00] text-white' : 'text-editorial-muted'}`}
            role="tab"
            aria-selected={activeTab === 'scheduler'}
            aria-controls="portfolio-content-anchor"
          >
            Schedule
          </button>
        </div>

        {/* ACTIVE TAB DISPATCHER */}
        <div className="min-h-[500px]">
          {activeTab === 'overview' && (
            <div className="animate-fade-in space-y-12">
              <ExecutiveSummary />
              <SkillsGrid />
            </div>
          )}

          {activeTab === 'strategy' && (
            <div className="animate-fade-in">
              <PMStrategy />
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="animate-fade-in">
              <ClientProjects />
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="animate-fade-in">
              <CareerTimeline />
            </div>
          )}

          {activeTab === 'scheduler' && (
            <div className="animate-fade-in space-y-8">
              {/* CALL TO ACTION & INTERVIEW SCHEDULER */}
              <section className="bg-editorial-card text-editorial-text rounded-none p-6 md:p-12 border border-editorial-border grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Left panel: Info */}
                <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF4E00]/10 text-[#FF4E00] text-[9px] font-mono uppercase tracking-widest border border-[#FF4E00]/20">
                      <UserCheck className="w-3.5 h-3.5" />
                      Contact &amp; Coordinates
                    </div>

                    <h3 className="text-2xl md:text-3.5xl font-bold tracking-tighter uppercase text-editorial-text font-display leading-tight">
                      Ready to schedule a PM conversation?
                    </h3>

                    <p className="text-editorial-muted text-sm leading-relaxed font-serif italic">
                      Dustin Pierce offers a rare blend of deep technical engineering literacy (B.S. in Computer Science + hands-on full-stack development) coupled with disciplined team collaboration, AI integrations, lead qualification pipelines, and professional relationship management.
                    </p>

                    {/* Factual Contact block with requested links */}
                    <div className="space-y-4 pt-2 text-xs">
                      
                      {/* Email direct link */}
                      <div className="flex items-center gap-3 text-editorial-muted">
                        <a 
                          href={`mailto:${PERSONAL_INFO.email}`} 
                          className="w-9 h-9 border border-editorial-border text-editorial-text flex items-center justify-center font-display font-bold text-xs bg-editorial-panel hover:bg-[#FF4E00] hover:text-white hover:border-[#FF4E00] transition-all cursor-pointer"
                          aria-label="Send Email to Dustin Pierce"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                        <div>
                          <div className="font-bold text-editorial-text uppercase tracking-wider text-[10px]">Email Address</div>
                          <a href={`mailto:${PERSONAL_INFO.email}`} className="text-[11px] text-[#FF4E00] font-mono hover:underline">{PERSONAL_INFO.email}</a>
                        </div>
                      </div>

                      {/* LinkedIn direct link */}
                      <div className="flex items-center gap-3 text-editorial-muted">
                        <a 
                          href={PERSONAL_INFO.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-9 h-9 border border-editorial-border text-editorial-text flex items-center justify-center bg-editorial-panel hover:bg-[#FF4E00] hover:text-white hover:border-[#FF4E00] transition-all cursor-pointer"
                          aria-label="View Dustin Pierce's LinkedIn Profile"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                        <div>
                          <div className="font-bold text-editorial-text uppercase tracking-wider text-[10px]">LinkedIn Profile</div>
                          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#FF4E00] font-mono hover:underline truncate block max-w-xs md:max-w-md">{PERSONAL_INFO.linkedin}</a>
                        </div>
                      </div>

                      {/* Phone call link */}
                      <div className="flex items-center gap-3 text-editorial-muted">
                        <a 
                          href={`tel:${PERSONAL_INFO.phone.replace(/\D/g, '')}`} 
                          className="w-9 h-9 border border-editorial-border text-editorial-text flex items-center justify-center bg-editorial-panel hover:bg-[#FF4E00] hover:text-white hover:border-[#FF4E00] transition-all cursor-pointer"
                          aria-label="Call Dustin Pierce"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <div>
                          <div className="font-bold text-editorial-text uppercase tracking-wider text-[10px]">Phone Number</div>
                          <a href={`tel:${PERSONAL_INFO.phone.replace(/\D/g, '')}`} className="text-[11px] text-editorial-text font-mono hover:underline">{PERSONAL_INFO.phone}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-editorial-panel border border-editorial-border mt-6">
                    <span className="text-[10px] font-bold text-[#FF4E00] block uppercase tracking-wider font-display mb-1 flex items-center gap-1">
                      <Code className="w-3.5 h-3.5" /> Core Deliverable Competency
                    </span>
                    <p className="text-[11px] text-editorial-muted leading-relaxed font-serif italic">
                      Capable of driving high-impact digital initiatives from requirements gathering to active deployment. Experienced in managing cross-functional technical teams, integrating advanced AI services, and deploying containerized full-stack web solutions.
                    </p>
                  </div>
                </div>

                {/* Right panel: Recruiter Interactive Scheduler */}
                <div className="lg:col-span-6 bg-editorial-panel p-6 rounded-none border border-editorial-border flex flex-col justify-center">
                  {scheduleStep === 1 ? (
                    <form onSubmit={handleScheduleSubmit} className="space-y-4">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-editorial-muted border-b border-editorial-border pb-3 flex items-center justify-between">
                        <span>Interactive Scheduler Widget</span>
                        <span className="text-[8px] bg-[#FF4E00]/10 text-[#FF4E00] px-2 py-0.5 font-mono tracking-widest">Live Active Spot Selection</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <label htmlFor="scheduler-name" className="text-editorial-muted font-semibold tracking-wider text-[10px] block uppercase">Your Name</label>
                          <input 
                            id="scheduler-name"
                            type="text" 
                            required
                            placeholder="Sarah Jenkins" 
                            value={scheduleData.name}
                            onChange={(e) => setScheduleData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-editorial-bg border border-editorial-border hover:border-editorial-hover text-editorial-text rounded-none p-2.5 focus:outline-none focus:border-[#FF4E00] focus:ring-1 focus:ring-[#FF4E00] font-mono text-xs transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="scheduler-company" className="text-editorial-muted font-semibold tracking-wider text-[10px] block uppercase">Company / Agency</label>
                          <input 
                            id="scheduler-company"
                            type="text" 
                            required
                            placeholder="Recruitment Team" 
                            value={scheduleData.company}
                            onChange={(e) => setScheduleData(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full bg-editorial-bg border border-editorial-border hover:border-editorial-hover text-editorial-text rounded-none p-2.5 focus:outline-none focus:border-[#FF4E00] focus:ring-1 focus:ring-[#FF4E00] font-mono text-xs transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <label htmlFor="scheduler-role" className="text-editorial-muted font-semibold tracking-wider text-[10px] block uppercase">Target Role Focus</label>
                        <select 
                          id="scheduler-role"
                          value={scheduleData.role}
                          onChange={(e) => setScheduleData(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full bg-editorial-bg border border-editorial-border text-editorial-text rounded-none p-2.5 focus:outline-none focus:border-[#FF4E00] focus:ring-1 focus:ring-[#FF4E00] font-mono text-xs transition-colors"
                        >
                          <option value="Technical Product Manager">Technical Product Manager (PM)</option>
                          <option value="Product Owner / Agile Lead">Product Owner / Agile Lead</option>
                          <option value="Full Stack Software Engineer">Full Stack Software Engineer</option>
                          <option value="AI Integration Specialist">AI Integration Specialist</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <label htmlFor="scheduler-date" className="text-editorial-muted font-semibold tracking-wider text-[10px] block uppercase">Select Date</label>
                          <input 
                            id="scheduler-date"
                            type="date" 
                            required
                            value={scheduleData.date}
                            onChange={(e) => setScheduleData(prev => ({ ...prev, date: e.target.value }))}
                            className="w-full bg-editorial-bg border border-editorial-border text-editorial-text rounded-none p-2.5 focus:outline-none focus:border-[#FF4E00] focus:ring-1 focus:ring-[#FF4E00] font-mono text-xs transition-colors"
                          />
                        </div>
                        <div className="space-y-1">
                          <label htmlFor="scheduler-time" className="text-editorial-muted font-semibold tracking-wider text-[10px] block uppercase">Select Time Slot</label>
                          <select 
                            id="scheduler-time"
                            value={scheduleData.time}
                            onChange={(e) => setScheduleData(prev => ({ ...prev, time: e.target.value }))}
                            className="w-full bg-editorial-bg border border-editorial-border text-editorial-text rounded-none p-2.5 focus:outline-none focus:border-[#FF4E00] focus:ring-1 focus:ring-[#FF4E00] font-mono text-xs transition-colors"
                          >
                            <option value="09:00">09:00 AM EST</option>
                            <option value="11:00">11:00 AM EST</option>
                            <option value="14:00">02:00 PM EST (Recommended)</option>
                            <option value="16:00">04:00 PM EST</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        type="submit"
                        disabled={isSending}
                        className="w-full py-3 bg-[#FF4E00] hover:bg-editorial-text hover:text-editorial-bg text-white font-bold text-[10px] uppercase tracking-widest transition-all mt-2 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending Request...
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            Request Interview Spot
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="text-center p-4 space-y-4 py-6 animate-fade-in">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto ${sendError ? 'bg-[#FF4E00]/10 border border-[#FF4E00] text-[#FF4E00]' : 'bg-emerald-500/10 border border-emerald-500 text-emerald-500'}`}>
                        <Check className="w-6 h-6" />
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-editorial-text uppercase tracking-widest">
                          {sendError ? "Spot Saved with Warning" : "Interview Spot Requested!"}
                        </h4>
                        
                        {sendError ? (
                          <div className="space-y-2">
                            <p className="text-xs text-editorial-muted max-w-sm mx-auto leading-relaxed font-serif italic">
                              Thank you, <strong>{justBookedSpot?.name}</strong>. Your spot request was saved in your local browser workspace, but we encountered an issue delivering the notification email.
                            </p>
                            <div className="p-3 bg-[#FF4E00]/5 border border-[#FF4E00]/20 text-[10px] text-editorial-text text-left font-mono space-y-1">
                              <p className="font-bold text-[#FF4E00] uppercase tracking-wider">Delivery Note:</p>
                              <p className="text-editorial-muted">{sendError}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-editorial-muted max-w-sm mx-auto leading-relaxed font-serif italic">
                            Thank you, <strong>{justBookedSpot?.name}</strong> from <strong>{justBookedSpot?.company}</strong>. Your interview request has been sent directly from this browser. A live notification email has been dispatched to <strong>{PERSONAL_INFO.email}</strong> with all requested details.
                          </p>
                        )}
                      </div>

                      {justBookedSpot && (
                        <div className="space-y-2 pt-2">
                          <button
                            onClick={() => triggerEmailRequest(justBookedSpot)}
                            className="w-full py-2.5 bg-[#FF4E00] hover:bg-editorial-text hover:text-editorial-bg text-white font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Mail className="w-4 h-4" /> Send Email Manually
                          </button>
                          
                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <button
                              onClick={() => downloadICS(justBookedSpot)}
                              className="px-3 py-1.5 bg-[#FF4E00]/10 text-[#FF4E00] border border-[#FF4E00]/20 hover:bg-[#FF4E00] hover:text-white transition-all text-[9px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 w-full"
                            >
                              <Download className="w-3.5 h-3.5" /> Download .ICS Invite
                            </button>
                            <button
                              onClick={() => copyToClipboard(justBookedSpot)}
                              className="px-3 py-1.5 bg-editorial-bg text-editorial-text border border-editorial-border hover:bg-[#FF4E00] hover:text-white hover:border-[#FF4E00] transition-all text-[9px] font-mono uppercase tracking-wider flex items-center justify-center gap-1 w-full"
                            >
                              <Copy className="w-3.5 h-3.5" />
                              {copyFeedback === justBookedSpot.id ? "Copied!" : "Copy Spot Info"}
                            </button>
                          </div>
                        </div>
                      )}

                      <div className="pt-4 border-t border-editorial-border/60">
                        <button
                          onClick={() => setScheduleStep(1)}
                          className="text-[9px] font-bold uppercase tracking-widest text-[#FF4E00] hover:text-editorial-text transition-colors cursor-pointer"
                        >
                          &larr; Request Another Spot
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* LIVE ACTIVE SCHEDULED SPOTS FEEDBACK SECTION */}
              {bookedSpots.length > 0 && (
                <section className="bg-editorial-card border border-editorial-border p-6 md:p-8 space-y-4">
                  <div className="border-b border-editorial-border pb-3 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-editorial-text uppercase tracking-wider font-display">
                        Active Spot Requests ({bookedSpots.length})
                      </h4>
                      <p className="text-[10px] text-editorial-muted font-mono uppercase tracking-wider">
                        Your requested meetings stored securely in your client browser session.
                      </p>
                    </div>
                    <span className="text-[8px] bg-[#FF4E00]/10 text-[#FF4E00] px-2 py-0.5 font-mono tracking-widest uppercase">
                      Client-Side Active Data
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {bookedSpots.map(spot => (
                      <div key={spot.id} className="p-4 bg-editorial-panel border border-editorial-border flex flex-col justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-editorial-text uppercase tracking-wider font-display text-[11px]">
                              {spot.company}
                            </span>
                            <span className="text-[9px] text-[#FF4E00] font-mono font-bold">
                              {spot.time} EST
                            </span>
                          </div>
                          <p className="text-editorial-muted text-[11px] font-mono">
                            Attendee: {spot.name} &bull; Date: {spot.date}
                          </p>
                          <p className="text-editorial-muted/80 text-[11px] font-serif italic">
                            Focus: {spot.role}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-editorial-border/60 pt-2.5 mt-1 text-[9px] font-mono uppercase">
                          <button
                            onClick={() => downloadICS(spot)}
                            className="text-[#FF4E00] hover:underline flex items-center gap-1"
                          >
                            <Download className="w-3 h-3" /> ICS Invite
                          </button>
                          <button
                            onClick={() => copyToClipboard(spot)}
                            className="text-editorial-text hover:underline flex items-center gap-1"
                          >
                            <Copy className="w-3 h-3" /> {copyFeedback === spot.id ? "Copied!" : "Copy"}
                          </button>
                          <button
                            onClick={() => cancelSpot(spot.id)}
                            className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
                            title="Cancel Interview Spot"
                          >
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-editorial-card border-t border-editorial-border text-editorial-muted text-xs py-10 px-4 md:px-8 mt-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <span className="font-display font-black text-editorial-text tracking-widest uppercase text-xs block mb-4">
              {PERSONAL_INFO.name} Portfolio
            </span>
            <span className="font-display font-black text-[#FF4E00] tracking-widest uppercase text-xs block mb-1">
              Professional Capability
            </span>
            <p className="text-[11px] leading-relaxed max-w-xs text-editorial-muted font-serif italic">
              Driving modern web platform engineering, generative AI system integrations, and structured Agile requirement specifications that connect technical velocity with client-facing business strategy.
            </p>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-editorial-text tracking-widest uppercase text-xs block mb-4">
              Direct Contact &amp; Links
            </span>
            <ul className="space-y-2 text-[10px] text-editorial-muted font-mono uppercase tracking-wider">
              <li>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-[#FF4E00] transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#FF4E00]" /> {PERSONAL_INFO.email}
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-[#FF4E00] transition-colors flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#FF4E00]" /> LinkedIn Profile
                </a>
              </li>
              <li>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#FF4E00]" /> {PERSONAL_INFO.phone}
                </span>
              </li>
              <li>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF4E00]" /> {PERSONAL_INFO.location}
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <span className="font-bold text-editorial-text tracking-widest uppercase text-xs block mb-4">
              Strategic Engineering Execution
            </span>
            <p className="text-[10px] leading-relaxed text-editorial-muted/80">
              Adept at managing product backlogs, drafting precise user epics, containerizing environments with Docker, and developing interactive client solutions across AWS, React, and Angular.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-6 border-t border-editorial-border mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono tracking-widest uppercase text-editorial-muted/60">
          <span>&copy; {new Date().getFullYear()} Dustin Pierce. All rights reserved.</span>
          <span>Created with React, Vite &amp; Tailwind CSS</span>
        </div>
      </footer>

    </div>
  );
}
