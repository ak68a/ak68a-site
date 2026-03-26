"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "../ThemeProvider";
import { useScramble } from "../useScramble";

export default function Research() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
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

      <div className="container">
        <p>
          <a href="/">&larr; back</a>
        </p>

        <h4>Evaluating Agent Reliability in Financial Tool Use</h4>
        <p style={{ opacity: 0.6, fontSize: "0.85em" }}>March 2026</p>
        <p>
          AI agents using financial tools fail 75% of the time out of the box.
          Not because they pick the wrong tool, but because they construct
          malformed arguments and break data chaining between steps. I built an
          evaluation framework that identifies three failure categories and a
          layered orchestration architecture that brings the failure rate to zero.
        </p>
        <p>
          The journey: 25% pass rate (raw LLM) &rarr; 50% (validation + retry)
          &rarr; 100% (output labeling + schema-rich prompting). Each layer
          solves a different failure category. No single layer is sufficient
          alone.
        </p>
        <p>
          Built on the Agent Commerce Kit (ACK) protocol with real
          cryptographic operations: W3C credentials, DID resolution, JWT
          signing, payment request/receipt issuance. No mocks.
        </p>

        <p style={{ opacity: 0.6, fontSize: "0.85em" }}>
          Full research writeup and technical paper available on request.
          Reach out at <a href="mailto:hey@ak68a.co">hey@ak68a.co</a>.
        </p>
      </div>

      <div className="copyright">&copy; 2030 ak68a</div>
    </div>
  );
}
