"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useScramble, useScrambleLoop, useScrambleOnHover } from "./useScramble";

const domains = [
  "AI & Machine Learning",
  "Payments",
  "Banking",
  "Lending & Credit",
  "Blockchain & Crypto",
  "Security & Compliance",
];

const services = [
  {
    name: "AI/ML Engineering",
    description: "Production ML systems for fintech — fraud detection, compliance automation, risk scoring, and LLM-powered intelligence pipelines.",
  },
  {
    name: "Fractional CTO",
    description: "Part-time technical leadership for startups that need a CTO but not a full-time one. Architecture decisions, team buildout, engineering culture, vendor evaluation, and board-level technical strategy.",
  },
  {
    name: "Systems Architecture",
    description: "Design and build financial infrastructure from scratch or restructure what's there.",
  },
  {
    name: "Security & Compliance",
    description: "Threat modeling, audit readiness, and hardened infrastructure for regulated environments.",
  },
  {
    name: "Due Diligence",
    description: "Technical assessment for investors, acquirers, or partners.",
  },
];

const clients = {
  enterprises: [
    { name: "PayPal", url: "https://www.paypal.com" },
    { name: "Fiserv", url: "https://www.fiserv.com" },
    { name: "Apex Fintech Solutions", url: "https://www.apexfintechsolutions.com" },
    { name: "Happen", url: "https://happen.com" },
    { name: "Tilt", url: "https://tilt.com" },
  ],
  startups: [
    { name: "Clossir", url: "https://clossir.com" },
    { name: "Magellan Payments", url: "https://magellanpayments.com/" },
    { name: "Path Crypto", url: "https://www.pathcrypto.com/", note: "Acq. Gemini" },
    { name: "Catena", url: "https://catena.com/" },
    { name: "Radius", url: "https://www.radiustech.xyz/" },
    { name: "GivEZ", url: "https://givezglobal.com/" },
  ],
};

const ownWork = [
  {
    name: "Zero",
    description:
      "Security intelligence platform for cross-chain fintech. Threat modeling, multi-framework audits, and vendor security scoring.",
  },
  {
    name: "Clossir",
    url: "https://clossir.com",
    description:
      "Complete infrastructure for tokenized finance. Identity, compliance, assets, and vaults, one platform, every chain.",
  },
  {
    name: "Agent Commerce Kit (ACK)",
    url: "https://www.agentcommercekit.com",
    description:
      "Open-source toolkit for agent-to-agent commerce. DIDs, verifiable credentials, JWT signing, and payment primitives.",
  },
  {
    name: "Nighthawk",
    description:
      "Supply chain defense CLI. Wraps package managers and analyzes dependency changes before installation.",
  },
];

const papers = [
  {
    id: "shadow-system",
    title: "Autonomous Shadow Systems for Continuous Adversarial Testing of Financial Infrastructure",
    date: "September 2026",
    tags: ["security", "fintech", "AI agents"],
    description: [
      "A production-mirror shadow system operated entirely by AI agents.",
    ],
  },
  {
    id: "fintech-security-posture",
    title: "Building a Nation-State-Resistant Security Posture for Cross-Chain Fintech",
    date: "August 2026",
    tags: ["security", "fintech", "compliance"],
    description: [
      "Security intelligence platform for cross-chain fintech. Threat modeling up to nation-state APTs, multi-framework audits verified against live code.",
    ],
  },
  {
    id: "agent-orchestration",
    title: "Multi-Repo Agent Orchestration with Layered Code Intelligence",
    date: "July 2026",
    tags: ["AI agents", "fintech", "MCP"],
    description: [
      "Three-layer MCP intelligence hub giving AI agents cross-repo awareness across a 13-repo fintech platform.",
    ],
  },
  {
    id: "supply-chain-defense",
    title: "Pre-Install Analysis for Supply Chain Defense",
    date: "April 2026",
    tags: ["security", "npm"],
    description: [
      "Pre-install gate that intercepts package managers and runs six parallel analyzers against every dependency change before it touches disk.",
    ],
  },
  {
    id: "agent-reliability",
    title: "Evaluating Agent Reliability in Financial Tool Use",
    date: "March 2026",
    tags: ["fintech", "AI agents"],
    description: [
      "AI agents using financial tools fail 75% of the time out of the box. A five-layer reliability stack brings that to near-zero.",
    ],
  },
];

function PinEntry({
  paperId,
  onError,
}: {
  paperId: string;
  onError: (msg: string) => void;
}) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlPin = params.get("pin");
    const urlPaper = params.get("paper");
    if (
      urlPin &&
      urlPin.length === 4 &&
      /^\d{4}$/.test(urlPin) &&
      (!urlPaper || urlPaper === paperId)
    ) {
      const digits = urlPin.split("");
      setPin(digits);
      submitPin(digits.join(""));
    }
  }, []);

  async function submitPin(code: string) {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: code, paper: paperId }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
        setLoading(false);
      } else {
        const data = await res.json();
        const msg = data.error || "Invalid PIN.";
        setError(msg);
        onError(msg);
        setPin(["", "", "", ""]);
        inputRefs[0].current?.focus();
        setLoading(false);
      }
    } catch {
      setError("Something went wrong.");
      setLoading(false);
    }
  }

  function handleInput(index: number, value: string) {
    if (!/^\d*$/.test(value)) return;

    const digit = value.slice(-1);
    const next = [...pin];
    next[index] = digit;
    setPin(next);
    setError("");

    if (digit && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (digit && index === 3) {
      const code = next.join("");
      if (code.length === 4) {
        inputRefs[index].current?.blur();
        submitPin(code);
      }
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);
    if (pasted.length === 4) {
      const digits = pasted.split("");
      setPin(digits);
      submitPin(pasted);
    }
  }

  return (
    <div style={{ margin: "24px 0" }}>
      <p style={{ opacity: 0.8, fontSize: "0.85em", marginBottom: "12px" }}>
        Enter PIN to access the full paper:
      </p>
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        {pin.map((digit, i) => (
          <input
            key={i}
            ref={inputRefs[i]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInput(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={i === 0 ? handlePaste : undefined}
            disabled={loading}
            style={{
              width: "28px",
              height: "32px",
              textAlign: "center",
              fontSize: "13px",
              fontFamily: "inherit",
              fontWeight: 500,
              letterSpacing: "1px",
              background: "var(--toggle-bg)",
              border: `1px solid ${error ? "#e55" : "var(--toggle-border)"}`,
              borderRadius: "5px",
              color: "var(--text-color)",
              outline: "none",
              transition: "border-color 0.2s ease",
              caretColor: "transparent",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = error
                ? "#e55"
                : "var(--text-color)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error
                ? "#e55"
                : "var(--toggle-border)";
            }}
          />
        ))}
        {loading && (
          <span style={{ opacity: 0.5, fontSize: "0.85em" }}>loading...</span>
        )}
      </div>
      {error && (
        <p
          style={{
            color: "#e55",
            fontSize: "0.8em",
            marginTop: "8px",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activePanel, setActivePanel] = useState<"consult" | "research" | null>(null);
  const [displayPanel, setDisplayPanel] = useState<"consult" | "research" | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useScramble(titleRef, { duration: 800, interval: 15, charset: "all", uppercase: true });
  useScrambleLoop(titleRef, { duration: 400, interval: 20, charset: "all", uppercase: true, minDelay: 30000, maxDelay: 60000 });
  const scrambleProps = useScrambleOnHover({ duration: 600, interval: 20, charset: "all", uppercase: true });

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    const footerTimer = setTimeout(() => setFooterVisible(true), 300);
    return () => { cancelAnimationFrame(timer); clearTimeout(footerTimer); };
  }, []);

  function togglePanel(panel: "consult" | "research") {
    setActivePanel(prev => prev === panel ? null : panel);
  }

  useEffect(() => {
    if (activePanel) {
      setDisplayPanel(activePanel);
    } else {
      const timer = setTimeout(() => setDisplayPanel(null), 350);
      return () => clearTimeout(timer);
    }
  }, [activePanel]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const active = document.activeElement;
      if (active instanceof HTMLInputElement || active instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case "0": setActivePanel(prev => prev === "consult" ? null : "consult"); break;
        case "1": setActivePanel(prev => prev === "research" ? null : "research"); break;
        case "2": window.open("https://handbook.fintechengineer.io", "_blank"); break;
        case "3": window.open("https://ledgerdrift.com", "_blank"); break;
        case "Escape":
        case "Backspace":
        case "Delete": setActivePanel(null); break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    let startX = 0;
    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
    }
    function onTouchEnd(e: TouchEvent) {
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 80) setActivePanel(null);
    }
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <>
      <div className={`site-layout ${activePanel ? "panel-open" : ""}`}
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease",
        }}
      >
        <header className="header">
          <a
            href="https://github.com/ak68a"
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 98 96" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 0 48.9043 0C21.8203 0 0 22.1074 0 49.1914C0 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z"/>
            </svg>
          </a>
          <button
            id="theme-toggle"
            className="theme-toggle"
            aria-label="Toggle dark mode"
            onClick={toggleTheme}
          >
            <span className="theme-icon">
              {theme === "dark" ? "☀️" : "🌙"}
            </span>
          </button>
        </header>

        <div className="left-pane">
          <h3 ref={titleRef}>AK68A</h3>
          <br />
          <div className="container">
            <p>
              AI/ML engineer & CTO building intelligent systems
              for financial infrastructure.
            </p>
            <p>
              I build AI-driven systems for fintech — fraud
              detection, compliance automation, and intelligent
              infrastructure for teams at scale.
            </p>
          </div>

          <ul>
            <li>
              [0]{" "}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); togglePanel("consult"); }}
                className={activePanel === "consult" ? "nav-active" : ""}
              >
                /consult
              </a>
            </li>
            <li>
              [1]{" "}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); togglePanel("research"); }}
                className={activePanel === "research" ? "nav-active" : ""}
              >
                /research
              </a>
            </li>
            <li>
              [2]{" "}
              <a href="https://handbook.fintechengineer.io" target="_blank" rel="noopener noreferrer">
                /handbook
              </a>
            </li>
            <li>
              [3]{" "}
              <a href="https://ledgerdrift.com" target="_blank" rel="noopener noreferrer">
                /ledgerdrift
              </a>
            </li>
          </ul>

          <br />
          <p>Cheers for dropping by.</p>

          <footer className="footer" style={{ opacity: footerVisible ? 1 : 0, transition: "opacity 0.6s ease" }}>
            AK68A RA= 12h 56.7m, Dec= +21&deg; 41&prime;
          </footer>
          <a
            href={theme === "dark" ? "https://drkmtr.sh" : "https://positiveparticles.co"}
            className="secret-link"
            data-text={theme === "dark" ? "DARKMATTER" : "POSITIVEPARTICLES"}
            {...scrambleProps}
          >
            {theme === "dark" ? "DARKMATTER" : "POSITIVEPARTICLES"}
          </a>
          <div className="copyright">&copy; 2030 ak68a</div>
        </div>

        <div ref={panelRef} className={`right-panel ${activePanel ? "right-panel-open" : ""}`}>
          {displayPanel === "consult" && (
            <div className="panel-content">
              <h4 className="panel-title">/consult</h4>
              <p className="consult-tagline">
                I build AI/ML systems and lead engineering for fintech teams.
              </p>
              <p className="consult-domains-line">
                {domains.join(" / ")}
              </p>
              <div className="consult-services">
                {services.map((s) => (
                  <div key={s.name} className="service-item">
                    <span className="service-name">{s.name}</span>
                    <span className="service-desc">{s.description}</span>
                  </div>
                ))}
              </div>
              <p className="consult-contact-top">
                <a href="mailto:hey@ak68a.co">hey@ak68a.co</a>
              </p>

              <div className="consult-clients">
                <h5 className="consult-section-title">Clients & Partners</h5>
                <div className="clients-grid">
                  <div className="clients-column">
                    <span className="clients-label">Enterprises</span>
                    {clients.enterprises.map((c) => (
                      <span key={c.name} className="client-name">
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a>
                        ) : c.name}
                      </span>
                    ))}
                  </div>
                  <div className="clients-column">
                    <span className="clients-label">Startups</span>
                    {clients.startups.map((c) => (
                      <span key={c.name} className="client-name">
                        {c.url ? (
                          <a href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a>
                        ) : c.name}
                        {c.note && <span className="client-note"> ({c.note})</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="consult-trio">
                <h5 className="consult-section-title">Trio</h5>
                <p className="trio-desc">
                  Staffing, recruiting, and software development for fintech teams.{" "}
                  <a href="https://trio.dev" target="_blank" rel="noopener noreferrer">trio.dev</a>
                </p>
              </div>

              <div className="consult-contact">
                <h5 className="consult-section-title">Get in Touch</h5>
                <p className="contact-desc">
                  <a href="mailto:hey@ak68a.co">hey@ak68a.co</a>
                </p>
              </div>

              <div className="consult-own-work">
                <h5 className="consult-section-title">Open Source & Personal</h5>
                <ul className="panel-project-list">
                  {ownWork.map((project) => (
                    <li key={project.name} className="project-item">
                      <span className="project-name">
                        {project.url ? (
                          <a href={project.url} target="_blank" rel="noopener noreferrer">{project.name}</a>
                        ) : project.name}
                      </span>
                      <span className="project-desc">{project.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {displayPanel === "research" && (
            <div className="panel-content">
              <h4 className="panel-title">/research</h4>
              {papers.map((paper) => (
                <div key={paper.id} className="panel-paper">
                  <h4 style={{ margin: "0 0 4px" }}>{paper.title}</h4>
                  <p style={{ opacity: 0.6, fontSize: "0.85em" }}>
                    {paper.date} &mdash; {paper.tags.join(", ")}
                  </p>
                  {paper.description.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                  <PinEntry paperId={paper.id} onError={() => {}} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
