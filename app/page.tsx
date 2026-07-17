"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useScramble, useScrambleLoop, useScrambleOnHover } from "./useScramble";

const projects = [
  {
    name: "Clossir",
    description:
      "Complete infrastructure for tokenized finance. Identity, compliance, assets, and vaults — one platform, every chain. Verify once, hold everywhere. Compliance enforced inside the token, not bolted on. NAV-based yield vaults, automated distributions, and a three-tier fee cascade — all cross-chain via LayerZero.",
  },
  {
    name: "Agent Commerce Kit (ACK)",
    description:
      "Open-source toolkit for agent-to-agent commerce. DIDs, verifiable credentials, JWT signing, CAIP-based addressing, and payment primitives. TypeScript monorepo, Swift package for iOS/macOS, and Go libraries for identity and payments.",
  },
  {
    name: "Nighthawk",
    description:
      "Supply chain defense CLI. Wraps package managers and analyzes dependency changes before installation — typosquatting detection, maintainer change tracking, risk signal analysis.",
  },
];

const papers = [
  {
    id: "agent-orchestration",
    title: "Multi-Repo Agent Orchestration with Layered Code Intelligence",
    date: "July 2026",
    tags: ["AI agents", "fintech", "MCP"],
    description: [
      "AI coding agents are blind beyond the repo they're sitting in. Across a 13-repo fintech platform with cross-chain contracts, event processing, and shared packages, an agent working in one service has zero awareness of upstream consumers, downstream breakage, or the architectural contracts that bind them. Every cross-repo change is a coin flip.",
      "The fix is a three-layer intelligence hub behind a single MCP gateway. A code graph built from AST-parsed property graphs provides deterministic blast-radius analysis — BFS over call/import edges, depth-bucketed risk scoring, and API surface diffing. Semantic memory pairs Voyage Code 3 embeddings with BM25 full-text search, merged via Reciprocal Rank Fusion. A live architecture registry loaded from TypeScript-defined contracts exposes every route, service, process flow, and Kafka topic as queryable tools. Each layer covers the others' blind spots: the graph answers what breaks, memory answers why it was built that way, the registry answers what the system promised.",
      "On top sits a gated autonomous workflow: plan-implement-verify-review with strict author-approver separation, tier-based safety escalation for on-chain and compliance-sensitive code, and grounding attestations that trace every AI-generated artifact back to the live MCP state it was grounded in. The system explicitly distinguishes server-enforced gates from LLM-discipline-only gates — no pretending the model can't forge a gate record.",
      "The retrieval plane adds reranking, an eval harness for retrieval quality, and tool-usage observability to close the feedback loop. A first-class governance corpus — security standards, internal policies, and company values — is ingested into the RAG layer so compliance context is available at planning time, not just review time. A time-boxed Speakeasy Gateway pilot provides unified API observability across all MCP tool calls.",
    ],
  },
  {
    id: "supply-chain-defense",
    title: "Pre-Install Analysis for Supply Chain Defense",
    date: "April 2026",
    tags: ["security", "npm"],
    description: [
      "npm packages execute arbitrary code at install time, before anyone reviews a single line. Every existing defense checks a vulnerability database and catches nothing that hasn't already been reported. Supply chain attacks are zero-day by nature.",
      "The fix is a pre-install gate: intercept the package manager, dry-run resolve, download, and run six parallel analyzers against every dependency change before it touches disk. No vulnerability database required. It catches install-script injection, typosquatting, dependency confusion, maintainer compromise, obfuscated payloads, and manifest confusion in one pass.",
      "331 tests. 17 end-to-end against crafted attack packages, one for every major supply chain vector. Zero false negatives. Zero false positives across seven clean-package edge cases. Full pipeline runs in under 3 seconds on 500-dependency projects.",
      "Every gate decision is HMAC-chained into a tamper-resistant audit log with cryptographic proof the record hasn't been modified after the fact. No trust required.",
    ],
  },
  {
    id: "agent-reliability",
    title: "Evaluating Agent Reliability in Financial Tool Use",
    date: "March 2026",
    tags: ["fintech", "AI agents"],
    description: [
      "AI agents using financial tools fail 75% of the time out of the box. Failures span malformed arguments, broken data chaining, and non-deterministic tool selection, and they're model-independent. Validated across Claude Sonnet 4 and GPT-4o: both fail identically.",
      "The fix is five layers stacked: Zod schemas enforce argument shapes, a retry loop catches transient failures, output labels let the model chain data across calls, schema-rich prompts ground tool selection, and a correction layer catches wrong-tool picks. Remove any one and the system regresses.",
      "Single-run evals give false confidence. The eval harness runs each workflow multiple times and tracks pass rates per layer, so non-deterministic failures and regressions surface immediately.",
      "Built on the Agent Commerce Kit (ACK) protocol with real cryptographic operations: W3C Verifiable Credentials, DID resolution, Ed25519 signing, and payment request/receipt issuance over JSON-RPC. No mocks, no stubs.",
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
  const [activePanel, setActivePanel] = useState<"projects" | "research" | null>(null);
  const [displayPanel, setDisplayPanel] = useState<"projects" | "research" | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useScramble(titleRef, { duration: 800, interval: 15, charset: "all", uppercase: true });
  useScrambleLoop(titleRef, { duration: 400, interval: 20, charset: "all", uppercase: true, minDelay: 30000, maxDelay: 60000 });
  const scrambleProps = useScrambleOnHover({ duration: 600, interval: 20, charset: "all", uppercase: true });

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    const footerTimer = setTimeout(() => setFooterVisible(true), 300);
    return () => { cancelAnimationFrame(timer); clearTimeout(footerTimer); };
  }, []);

  function togglePanel(panel: "projects" | "research") {
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
        case "0": window.open("https://github.com/ak68a", "_blank"); break;
        case "1": setActivePanel(prev => prev === "projects" ? null : "projects"); break;
        case "2": setActivePanel(prev => prev === "research" ? null : "research"); break;
        case "Escape":
        case "Backspace":
        case "Delete": setActivePanel(null); break;
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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
              Software engineer building at the intersection of AI,
              fintech, and security.
            </p>
            <p>
              CTO at{" "}
              <a href="https://trio.dev" target="_blank" rel="noopener noreferrer">
                Trio
              </a>
              . Co-founder at Clossir.
            </p>
          </div>

          <ul>
            <li>
              [0]{" "}
              <a href="https://github.com/ak68a" target="_blank" rel="noopener noreferrer">
                /github
              </a>
            </li>
            <li>
              [1]{" "}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); togglePanel("projects"); }}
                className={activePanel === "projects" ? "nav-active" : ""}
              >
                /projects
              </a>
            </li>
            <li>
              [2]{" "}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); togglePanel("research"); }}
                className={activePanel === "research" ? "nav-active" : ""}
              >
                /research
              </a>
            </li>
            <li>
              [3]{" "}
              <a href="https://fintechengineer.io" target="_blank" rel="noopener noreferrer">
                /fe
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

        <div className={`right-panel ${activePanel ? "right-panel-open" : ""}`}>
          <button
            className="panel-close"
            onClick={() => setActivePanel(null)}
            aria-label="Close panel"
          >
            &times;
          </button>

          {displayPanel === "projects" && (
            <div className="panel-content">
              <h4 className="panel-title">/projects</h4>
              <ul className="panel-project-list">
                {projects.map((project, i) => (
                  <li key={project.name} className="project-item">
                    <span className="project-name">{project.name}</span>
                    <span className="project-desc">{project.description}</span>
                  </li>
                ))}
              </ul>
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
                  <p style={{ opacity: 0.6, fontSize: "0.85em" }}>
                    Don&apos;t have a PIN? Reach out at{" "}
                    <a href="mailto:hey@ak68a.co">hey@ak68a.co</a>.
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
