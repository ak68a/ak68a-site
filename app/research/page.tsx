"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";
import { useScramble } from "../useScramble";

const papers = [
  {
    id: "supply-chain-defense",
    title: "Pre-Install Analysis for Supply Chain Defense",
    date: "April 2026",
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

export default function Research() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useScramble(titleRef, {
    duration: 3000,
    interval: 30,
    charset: "all",
    uppercase: true,
  });

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      if (!el) return;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 0) return;
      const progress = el.scrollLeft / maxScroll;
      const index = Math.round(progress * (papers.length - 1));
      setActiveIndex(Math.min(index, papers.length - 1));
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
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
            {theme === "dark" ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </span>
        </button>
      </header>

      <h3 ref={titleRef}>RESEARCH</h3>
      <br />

      <p>
        <a href="/">&larr; back</a>
      </p>

      <div
        ref={scrollRef}
        style={{
          display: "flex",
          gap: "140px",
          overflowX: "auto",
          paddingBottom: "16px",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {papers.map((paper) => (
          <div
            key={paper.id}
            className="paper-card"
          >
            <h4 style={{ margin: "0 0 4px" }}>{paper.title}</h4>
            <p style={{ opacity: 0.6, fontSize: "0.85em" }}>{paper.date}</p>
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

      <div className="paper-indicators">
        {papers.map((_, i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "2px",
              background: "var(--text-color)",
              opacity: i === activeIndex ? 1 : 0.2,
              transition: "opacity 0.2s ease",
            }}
          />
        ))}
      </div>

      <div className="copyright">&copy; 2030 ak68a</div>
    </div>
  );
}
