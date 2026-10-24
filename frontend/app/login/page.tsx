"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, ArrowUpRight, Building2, Clock, ExternalLink, FileCheck, Fingerprint, Landmark, Lock, Mail, ShieldAlert, ShieldCheck, UserCheck } from "lucide-react";
import { AnimatedRoleList, type RoleListOption } from "@/components/ui/animated-role-list";

type RoleOption = "aicte_admin" | "institution" | "verifier";
const personas: { role: RoleOption; email: string; name: string; detail: string; icon: typeof Building2 }[] = [
  { role: "institution", email: "principal@apextech.edu.in", name: "Institution admin", detail: "Apex Institute of Tech", icon: Building2 },
  { role: "aicte_admin", email: "admin@aicte.gov.in", name: "Central regulator", detail: "AICTE Central Admin", icon: ShieldCheck },
  { role: "verifier", email: "verifier@deloitte-audit.com", name: "External verifier", detail: "Demo token access", icon: UserCheck },
];

const roleOptions: RoleListOption[] = [
  { value: "institution", label: "Institution Admin / Operator (Apex Institute #SYN-MH-0001)", description: "Upload and review institutional enrolment batches" },
  { value: "aicte_admin", label: "AICTE Central Regulatory Administrator", description: "Review national compliance and resolve disputes" },
  { value: "verifier", label: "External Verification Screener (Token Gateway)", description: "Run purpose-bound, read-only verification" },
];
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<RoleOption>("institution");
  const [error, setError] = useState<string | null>(null);
  const [rateLimited, setRateLimited] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(300);
  const [isLoading, setIsLoading] = useState(false);

  const selectPersona = (persona: (typeof personas)[number]) => {
    setRole(persona.role); setEmail(persona.email); setPassword("regulatoryDemoPass2026!"); setError(null);
  };
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault(); setError(null);
    if (rateLimited) return;
    if (!email || !password) { setError("Please provide both email address and access key."); return; }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === "aicte_admin") router.push("/admin/overview");
      else if (role === "institution") router.push("/institution/submit");
      else router.push("/verify/chk_demo8723");
    }, 450);
  };
  const triggerRateLimitSimulation = () => {
    setRateLimited(true); setError("Too many failed attempts. Locked for 300s.");
    const interval = setInterval(() => setLockoutTimer((previous) => {
      if (previous <= 1) { clearInterval(interval); setRateLimited(false); setError(null); return 300; }
      return previous - 1;
    }), 1000);
  };

  return <div className="landing-shell">
    <div className="government-bar"><div className="page-container government-bar-inner"><div className="government-context"><span className="tricolor-mark" aria-hidden="true"><i /><i /><i /></span><strong>SMART INDIA HACKATHON</strong><span className="gov-divider" /> <span>AICTE · APAAR RegTech prototype</span></div><nav aria-label="Utility links"><a href="#compliance"><AlertCircle className="h-3.5 w-3.5" /> Important note</a><a href="#portal">Help &amp; access <ExternalLink className="h-3 w-3" /></a><span className="language-chip">EN <span aria-hidden="true">⌄</span></span></nav></div></div>
    <header className="landing-header">
      <a href="#overview" className="brand-lockup" aria-label="AICTE APAAR RegTech home"><span className="ministry-mark" aria-hidden="true"><Landmark className="h-5 w-5" /></span><span className="ministry-copy"><strong>MINISTRY OF EDUCATION</strong><small>AICTE · SIH 2026 prototype</small></span><span className="brand-divider" aria-hidden="true" /><span className="brand-mark"><ShieldCheck className="h-5 w-5" /></span><span className="brand-copy"><span className="brand-title">AICTE <i>APAAR REGTECH</i></span><span className="brand-subtitle">Academic governance · SIH 2026 prototype</span></span></a>
      <a href="#portal" className="nav-access specular-button">Explore portal <ArrowRight className="h-4 w-4" /></a>
    </header>
    <div className="status-strip"><div className="page-container status-strip-inner"><span className="status-live">DEMO</span><span>Institutional enrolment review · Capacity validation · Privacy-preserving verification</span><span className="status-cycle">ACADEMIC YEAR 2026–27</span></div></div>

    <main>
      <section id="overview" className="hero-section scroll-mt-24">
        <div className="hero-backdrop" aria-hidden="true"><div className="hero-glow" /></div>
        <div className="hero-content page-container">
          <div className="hero-copy"><div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> NATIONAL REGULATORY INTELLIGENCE PORTAL <i /> AY 2026–27</div>
            <h1 className="blur-reveal">Institutional approval &amp; regulatory scrutiny <span>verified with care.</span></h1>
            <p className="hero-description">Validate enrolment submissions, review sanctioned intake, and support secure student-record verification in one accountable workspace.</p>
            <div className="hero-portal-card glass-panel tilt-card"><div className="hero-card-actions"><a href="#compliance" className="button-secondary"><Landmark className="h-4 w-4" /> Explore the framework <ArrowRight className="h-4 w-4" /></a><a href="#portal" className="button-primary specular-button">Access demo portal <ArrowRight className="h-4 w-4" /></a></div><div className="quick-access"><strong>QUICK ACCESS</strong><a href="#portal"><Building2 className="h-3.5 w-3.5" /> Institution workspace</a><a href="#compliance"><FileCheck className="h-3.5 w-3.5" /> Compliance architecture</a><a href="#portal"><ShieldCheck className="h-3.5 w-3.5" /> Verification gateway</a></div></div>
            <div className="trust-chips"><span><Lock className="h-3.5 w-3.5" /> Privacy-first design</span><span><Landmark className="h-3.5 w-3.5" /> Sanctioned-intake checks</span><span><FileCheck className="h-3.5 w-3.5" /> Traceable review</span></div>
          </div>
        </div>
      </section>

      <section id="compliance" className="compliance-section scroll-mt-24"><div className="page-container">
        <div className="section-heading"><div><div className="eyebrow section-eyebrow"><i /> BUILT FOR TRUST AND ACCOUNTABILITY</div><h2 className="blur-reveal">Core boundaries &amp;<br className="mobile-break" /> compliance architecture</h2></div><p>Clear regulatory guardrails and privacy-by-design processes help keep student data workflows credible, accountable and compliant.</p></div>
        <div className="principle-grid">
          <article className="principle-card glass-panel"><span className="principle-icon"><Fingerprint className="h-6 w-6" /></span><div><h3>Data minimization</h3><p>Collect only what is necessary for enrolment, compliance and verification. Aadhaar numbers are not collected or stored.</p></div><span className="principle-index">01</span></article>
          <article className="principle-card glass-panel"><span className="principle-icon"><Landmark className="h-6 w-6" /></span><div><h3>Intake enforcement</h3><p>Validate admissions against sanctioned programme capacity and apply consistent regulatory rules.</p></div><span className="principle-index">02</span></article>
          <article className="principle-card glass-panel"><span className="principle-icon"><ShieldCheck className="h-6 w-6" /></span><div><h3>Privacy-preserving verification</h3><p>Support time-limited verification tokens that avoid exposing sensitive student details to external verifiers.</p></div><span className="principle-index">03</span></article>
        </div>
        <div className="compliance-note"><ShieldAlert className="h-4 w-4" /><span>Designed around accountable access, minimum necessary data and traceable regulatory decisions.</span></div>
      </div></section>

      <section id="portal" className="portal-section scroll-mt-24"><div className="page-container portal-layout">
        <div className="portal-intro"><div className="eyebrow section-eyebrow"><i /> AUTHORIZED ACCESS</div><h2 className="blur-reveal">Your regulatory workspace,<br /><span>ready when you are.</span></h2><p>Sign in with your assigned institutional or regulatory role. Evaluators can use a quick-launch profile to explore the demo.</p><div className="portal-assurance"><span className="assurance-icon"><ShieldCheck className="h-5 w-5" /></span><span><strong>Protected access</strong><small>Role-based entry to the APAAR RegTech workspace</small></span></div></div>
        <div className="login-card glass-panel"><div className="login-card-heading"><div><span className="login-kicker">APAAR REGTECH</span><h3>Sign in to your portal</h3><p>Use your authorized credentials to continue.</p></div><span className="login-shield"><ShieldCheck className="h-5 w-5" /></span></div>
          <div className="persona-heading"><span>Evaluator quick access</span><span>Choose a profile</span></div><div className="persona-grid">{personas.map((persona) => { const Icon = persona.icon; return <button key={persona.role} type="button" onClick={() => selectPersona(persona)} className={`persona-option ${role === persona.role ? "persona-selected" : ""}`} aria-pressed={role === persona.role}><Icon className="h-4 w-4" /><span><strong>{persona.name}</strong><small>{persona.detail}</small></span></button>; })}</div>
          {error && <div className="login-error" role="alert"><AlertCircle className="h-4 w-4 shrink-0" /><div><span>{error}</span>{rateLimited && <small>Lockout countdown: {lockoutTimer}s remaining</small>}</div></div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-field"><span>Authorization role</span><AnimatedRoleList id="authorization-role" value={role} options={roleOptions} onChange={(value) => setRole(value as RoleOption)} disabled={rateLimited} /></div>
            <label className="form-field"><span>Email address / institutional ID</span><span className="input-wrap"><Mail className="h-4 w-4" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@institution.edu.in" disabled={rateLimited} autoComplete="username" /></span></label>
            <label className="form-field"><span>Password / passkey</span><span className="input-wrap"><Lock className="h-4 w-4" /><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your secure access key" disabled={rateLimited} autoComplete="current-password" /></span></label>
            <button type="submit" disabled={isLoading || rateLimited} className="button-primary specular-button login-submit">{isLoading ? <><Clock className="h-4 w-4 animate-spin" /> Validating credentials...</> : <>Continue to workspace <ArrowRight className="h-4 w-4" /></>}</button>
          </form><div className="login-card-footer"><span><Lock className="h-3.5 w-3.5" /> Role-based secure access</span><button type="button" onClick={triggerRateLimitSimulation}>Simulate lockout</button></div>
        </div>
      </div></section>
    </main>
    <footer className="landing-footer"><div className="page-container footer-content"><a href="#overview" className="footer-brand"><ShieldCheck className="h-4 w-4" /> AICTE <i>|</i> SIH 2026</a><span>APAAR RegTech <i>/</i> Smart India Hackathon</span><a href="#overview" className="back-top">Back to top <ArrowUpRight className="h-3.5 w-3.5" /></a></div></footer>
  </div>;
}










