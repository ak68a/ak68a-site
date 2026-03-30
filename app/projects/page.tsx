"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTheme } from "../ThemeProvider";
import { useScramble } from "../useScramble";

const categories = [
  {
    name: "AI & Agents",
    projects: [
      {
        name: "OpenClam",
        description:
          "Personal AI assistant built from scratch. Custom agent loops, markdown-driven memory, vector search over SQLite, and 15+ channel adapters — Slack, Discord, Signal, iMessage, Telegram.",
      },
      {
        name: "Archon",
        description:
          "Workflow engine for AI coding agents. Define development processes as YAML workflows — planning, implementation, validation, review, and PR creation. Isolated git worktrees, parallel execution, multi-platform adapters.",
      },
      {
        name: "Orbis",
        description:
          "Conversational CRM agent inside Slack. Natural language interface to Pipedrive with 28+ tools — contact lookup, follow-up tracking, deal management, email drafting and scheduling via Gmail.",
      },
      {
        name: "Claude Code Mobile",
        description:
          "Native iOS interface for Claude Code. Manage sessions, review diffs, approve tool calls, and monitor agent progress from your phone.",
      },
    ],
  },
  {
    name: "Security",
    projects: [
      {
        name: "Nighthawk",
        description:
          "Supply chain defense CLI. Wraps package managers and analyzes dependency changes before installation — typosquatting detection, maintainer change tracking, risk signal analysis.",
      },
      {
        name: "Spectre",
        description:
          "Browser fingerprinting lab. Detection, analysis, and evasion research across canvas, WebGL, audio, and navigator surfaces.",
      },
      {
        name: "Crypt",
        description:
          "Lightweight CLI for finding, encrypting, and restoring .env files. Collects environment files into a single AES-256-GCM encrypted vault.",
      },
    ],
  },
  {
    name: "Fintech & On-Chain",
    projects: [
      {
        name: "Signum",
        description:
          "Full-stack fintech platform. API, contracts, cross-chain messaging via LayerZero, event processing, agent orchestration, and infrastructure.",
      },
      {
        name: "Agent Commerce Kit (ACK)",
        description:
          "Open-source toolkit for agent-to-agent commerce. DIDs, verifiable credentials, JWT signing, CAIP-based addressing, and payment primitives. TypeScript monorepo, Swift package for iOS/macOS, and Go libraries for identity and payments.",
      },
      {
        name: "Xeno",
        description:
          "AI agent payment sandbox. Dual-rail settlement with x402 and ACK-Pay, DID-based identity, MCP banking tools, and a security evaluation framework.",
      },
      {
        name: "AgentId",
        description:
          "On-chain identity and delegation verification for autonomous AI agents.",
      },
      {
        name: "Kasho",
        description:
          "Full-stack banking application. Account management, transactions, and transfers built with Go, PostgreSQL, SQLC, and Next.js. JWT auth, ACID-compliant data layer, containerized deployment.",
      },
    ],
  },
  {
    name: "Mesh Networking",
    projects: [
      {
        name: "Soverign",
        description:
          "LoRa mesh networking on custom hardware. Multi-hop routing, off-grid communication, and RF protocol design on postmarketOS.",
      },
    ],
  },
  {
    name: "Voice & Interface",
    projects: [
      {
        name: "Yappr",
        description:
          "On-device iOS keyboard extension for real-time voice-to-text. Runs WhisperKit locally — no cloud, no latency. Three-target architecture with IPC over Darwin notifications.",
      },
      {
        name: "Vokl",
        description:
          "Multi-platform voice assistant with waveform-based audio interface. Next.js + Swift + Firebase.",
      },
    ],
  },
  {
    name: "Developer Tools",
    projects: [
      {
        name: "SwiftKit",
        description:
          "SwiftUI ecosystem — expert skill guides for AI agents, MCP server, marketing site, and developer tooling.",
      },
    ],
  },
  {
    name: "Misc",
    projects: [
      {
        name: "Fintech Engineer",
        description:
          "Fintech-focused job board and talent platform. Next.js + Supabase.",
      },
    ],
  },
];

export default function Projects() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const [currentRepo, setCurrentRepo] = useState<string | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/status");
      const data = await res.json();
      if (data.repo?.name) {
        setCurrentRepo(data.repo.name);
      }
    } catch {}
  }, []);

  useScramble(titleRef, {
    duration: 800,
    interval: 15,
    charset: "all",
    uppercase: true,
  });
  useScramble(footerRef, {
    duration: 800,
    interval: 15,
    charset: "all",
    uppercase: true,
  });


  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return (
    <>
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

        <h3 ref={titleRef}>/projects</h3>
        <br />
        <div className="container">
          <p>
            <a href="/">&larr; back</a>
          </p>
          {currentRepo && (
            <p style={{ fontSize: "12px", opacity: 0.6 }}>
              currently hacking on: {currentRepo}
            </p>
          )}
        </div>

        {categories.map((category, catIndex) => (
          <div key={category.name} className="project-category">
            <h4 className="category-title">
              [{String(catIndex).padStart(2, "0")}] {category.name}
            </h4>
            <ul className="project-list">
              {category.projects.map((project) => (
                <li key={project.name} className="project-item">
                  <span className="project-name">{project.name}</span>
                  <span className="project-desc">{project.description}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <footer ref={footerRef} className="footer">
          AK68A RA= 12h 56.7m, Dec= +21° 41´
        </footer>
        <div className="copyright">&copy; 2030 ak68a</div>
      </div>
    </>
  );
}
