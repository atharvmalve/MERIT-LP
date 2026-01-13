import React, { useState, useEffect } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * SHADCN-LIKE COMPONENTS
 */
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' }>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-2 text-sm font-medium transition-colors disabled:opacity-50 whitespace-nowrap";
    const variants = {
      primary: "bg-black text-white hover:bg-neutral-800",
      outline: "border border-neutral-200 bg-white hover:bg-neutral-50 text-black"
    };
    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-10 w-full border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

/**
 * EDITORIAL COMPONENTS
 */
const SectionMarker: React.FC<{ number: string; title: string; align?: 'left' | 'center' }> = ({ number, title, align = 'left' }) => (
  <div className={`flex items-center gap-4 mb-6 md:mb-8 ${align === 'center' ? 'flex-col' : 'flex-row'}`}>
    <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-xs font-sans shrink-0">
      {number}
    </div>
    {align === 'left' && <div className="h-[1px] w-8 md:w-12 bg-neutral-200" />}
    {align === 'center' && <div className="h-8 md:h-12 w-[1px] bg-neutral-200" />}
    <span className="uppercase tracking-widest text-[10px] font-medium text-merit-gray font-sans">
      {title}
    </span>
  </div>
);

const GeometricPattern: React.FC = () => {
  const [barCount, setBarCount] = useState(48);
  
  useEffect(() => {
    const updateCount = () => setBarCount(window.innerWidth < 768 ? 20 : 48);
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  const bars = Array.from({ length: barCount });
  
  return (
    <div className="flex items-end gap-[3px] md:gap-[2px] h-32 md:h-48 overflow-hidden mb-10 md:mb-14 opacity-90">
      {bars.map((_, i) => {
        const isHireWorthy = i > 0 && i % (barCount === 20 ? 5 : 12) === 0; 
        const height = isHireWorthy 
          ? 80 + Math.random() * 20 
          : 20 + Math.random() * 30;

        let color = "bg-neutral-200";
        if (isHireWorthy) {
          color = (i / (barCount === 20 ? 5 : 12)) % 2 === 0 ? "bg-merit-blue" : "bg-neutral-900";
        }
        
        return (
          <div 
            key={i} 
            className={`flex-1 ${color} transition-all duration-1000 ease-in-out`}
            style={{ 
              height: `${height}%`,
              filter: isHireWorthy ? 'brightness(1.1)' : 'none'
            }}
          />
        );
      })}
    </div>
  );
};

/**
 * PAGE SECTIONS
 */
const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("mission");
  const sections = ["mission", "process", "audience", "join"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-10% 0px -80% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `transition-colors ${activeSection === id ? "text-merit-blue font-semibold" : "hover:text-merit-blue"}`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 md:py-10 flex justify-between items-center md:items-start pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-1">
        <img 
          src="/assets/meritlogo.svg" 
          alt="Merit Logo" 
          className="w-6 h-6 md:w-8 md:h-8 object-contain"
        />
        <h1 className="text-lg md:text-xl font-sans font-bold tracking-[0.05em] cursor-pointer">
          MERIT
        </h1>
      </div>

      <div className="hidden md:flex flex-col gap-2 text-[10px] font-sans uppercase tracking-[0.2em] pointer-events-auto text-right">
        <a href="#mission" className={linkClass("mission")}>Mission</a>
        <a href="#process" className={linkClass("process")}>Process</a>
        <a href="#audience" className={linkClass("audience")}>Audience</a>
        <a href="#join" className={linkClass("join")}>Access</a>
      </div>
    </nav>
  );
};

const Hero: React.FC<{
  email: string;
  setEmail: (v: string) => void;
  loading: boolean;
  success: boolean;
  onSubmit: () => void;
}> = ({ email, setEmail, loading, success, onSubmit }) => {
  return (
    <section id="mission" className="min-h-[90vh] flex flex-col items-center justify-center px-6 pt-24 pb-12 md:pt-32 md:pb-24">
      <div className="max-w-4xl w-full text-center">
        <GeometricPattern />
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-serif font-light leading-tight mb-6 md:mb-8">
          Hiring is <span className="italic">meaningful</span> when it is based on evidence.
        </h2>
        <p className="max-w-2xl mx-auto text-merit-gray text-base md:text-xl font-sans font-light leading-relaxed mb-8 md:mb-12">
          MERIT evaluates candidates using real work, verified skills, and consistent professional signals, so you reduce hiring risk and make confident decisions.
        </p>
        
        <div className="flex flex-col md:flex-row gap-0 max-w-lg mx-auto border border-neutral-200 p-1 bg-white">
          <Input 
            type="email" 
            placeholder="Professional email address" 
            className="border-none focus-visible:ring-0 h-12 flex-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="h-12 px-8 uppercase tracking-widest text-[10px] min-w-[160px]"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading ? "Joining..." : success ? "Joined" : "Join Early Access"}
          </Button>
        </div>
        <div className="mt-4 text-[10px] uppercase tracking-widest text-merit-gray font-sans">
          Currently 10+ Recruiters Waiting
        </div>
      </div>
      
      <div className="mt-12 md:mt-20 flex flex-col items-center gap-4">
        <div className="h-12 md:h-20 w-[1px] bg-neutral-200" />
        <span className="text-[10px] uppercase tracking-widest text-merit-gray animate-bounce">Scroll</span>
      </div>
    </section>
  );
};

const SectionOne: React.FC = () => (
  <section id="process" className="py-20 md:py-32 px-6 flex flex-col items-center border-t border-neutral-100">
    <div className="max-w-[800px] w-full">
      <SectionMarker number="1" title="The Process" />
      <div className="mb-8">
        <h3 className="text-2xl md:text-5xl font-serif leading-snug mb-4">
          A clear, unbiased evaluation, grounded in evidence, not intuition.
        </h3>
        <p className="text-sm md:text-lg text-merit-gray">Our tool verifies what candidates claim by examining real work, skill relevance, and consistency of professional activity.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16">
        {[
          { label: "Data Integrity", desc: "Validating claimed skills by cross-checking real-world work & professional signals." },
          { label: "Skill Alignment", desc: "Measuring how closely a candidate’s actual outputs match the skills required for the role." },
          { label: "Outcome Signals", desc: "Identifying patterns in past work and activity that indicate long-term performance in similar roles." }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col gap-3 md:gap-4">
            <span className="text-[10px] uppercase tracking-widest text-merit-blue font-bold">0{idx + 1}</span>
            <h4 className="font-serif text-lg">{item.label}</h4>
            <p className="text-sm text-merit-gray leading-relaxed font-sans">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const SectionTwo: React.FC = () => (
  <section id="audience" className="py-20 md:py-32 px-6 flex flex-col items-center bg-neutral-50">
    <div className="max-w-[800px] w-full flex flex-col items-center text-center">
      <SectionMarker number="2" title="The Audience" align="center" />
      <h3 className="text-2xl md:text-5xl font-serif leading-snug mb-8 md:mb-12">
        Built for teams that can’t afford hiring mistakes.
      </h3>
      <p className="text-merit-gray text-base md:text-lg mb-10 md:mb-16 font-sans font-light">
        MERIT is designed for early startups, HR teams, and recruitment agencies who want reliable hiring signals, without manual screening or guesswork.
      </p>
      
      <div className="w-full flex flex-col md:flex-row gap-6 justify-center border-y border-neutral-200 py-10 md:py-12">
        {[
          "Automated Work Verification",
          "Experience Gap Detection",
          "Industry Context Signals"
        ].map((feat, i) => (
          <div key={i} className="flex items-center gap-4 group cursor-pointer justify-center md:justify-start">
            <div className="w-5 h-5 flex items-center justify-center border border-neutral-300 rounded-full group-hover:bg-merit-blue group-hover:border-merit-blue transition-colors shrink-0">
                <div className="w-1 h-1 bg-neutral-300 rounded-full group-hover:bg-white" />
            </div>
            <span className="text-xs md:text-sm font-sans tracking-wide">{feat}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Footer: React.FC = () => (
  <footer className="py-12 md:py-16 px-8 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-neutral-100">
    <div className="flex flex-col gap-2 items-center md:items-start">
      <div className="flex items-center gap-1">
        <img src="/assets/meritlogo.svg" alt="Merit Logo" className="w-7 h-7" />
        <h4 className="text-lg font-bold tracking-tighter">MERIT</h4>
      </div>
      <p className="text-xs text-merit-gray font-sans">© 2026 Merit Inc. All rights reserved.</p>
    </div>
  </footer>
);

export default function App() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleJoinWaitlist = async () => {
    const SCRIPT_URL='https://script.google.com/macros/s/AKfycbwNi_TtRF-RSL9IlhIJs3ir6pDKsvft72HCb6ctSiknd6zIZpJZgCsqPjcyzmieucnwJg/exec'
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch(`${SCRIPT_URL}?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setEmail("");
      }
    } catch (err) {
      console.error("Join early access failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative font-sans text-neutral-900 selection:bg-merit-blue selection:text-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero email={email} setEmail={setEmail} loading={loading} success={success} onSubmit={handleJoinWaitlist} />
        <SectionOne />
        <SectionTwo />
        
        <section id="join" className="py-20 md:py-32 px-6 flex flex-col items-center">
          <div className="max-w-[800px] w-full text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-merit-blue flex items-center justify-center mb-8">
               <Mail className="text-white w-5 h-5" />
            </div>
            <h3 className="text-3xl md:text-6xl font-serif mb-6 md:mb-8">Ready to hire with clarity?</h3>
            <p className="text-merit-gray text-base md:text-lg mb-10 md:mb-12 max-w-xl font-sans font-light">
              Request early access to MERIT and be among the first teams evaluating candidates using verified work and evidence-based signals.
            </p>
            <div className="flex flex-col md:flex-row gap-0 w-full max-w-lg mx-auto border border-neutral-200 p-1 bg-white">
              <Input 
                type="email" 
                placeholder="Professional email address" 
                className="border-none focus-visible:ring-0 h-12 flex-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                className="h-12 px-8 uppercase tracking-widest text-[10px] w-full md:w-auto min-w-[160px]"
                onClick={handleJoinWaitlist}
                disabled={loading}
              >
                {loading ? "Joining..." : success ? "Joined" : "Join Early Access"}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Editorial Decorative Vertical Axes */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 h-full w-[1px] bg-neutral-100 -z-10 hidden md:block" />
      <div className="fixed top-0 left-24 h-full w-[1px] bg-neutral-50 -z-10 hidden lg:block" />
      <div className="fixed top-0 right-24 h-full w-[1px] bg-neutral-50 -z-10 hidden lg:block" />
    </div>
  );
}