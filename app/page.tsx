"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useScramble, useScrambleLoop } from "./useScramble";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useScramble(titleRef, { duration: 1500, interval: 25, charset: "all", uppercase: true });
  useScrambleLoop(titleRef, { duration: 400, interval: 20, charset: "all", uppercase: true, minDelay: 30000, maxDelay: 60000 });
  useScramble(footerRef, { duration: 1500, interval: 25, charset: "all", uppercase: true });

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(timer);
  }, []);


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

        <h3 ref={titleRef}>AK68A</h3>
        <br />
        <div className="container">
          <p>
            Co-founder &amp; CTO @{" "}
            <a href="https://trio.dev" target="_blank" rel="noopener noreferrer">
              Trio
            </a>{" "}
            &mdash; fintech-native partner helping teams build the future of finance.
          </p>
          <p>
            I like building things. Agents, security tools, compilers,
            voice interfaces, whatever&apos;s useful.
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
            <a href="/projects">
              /projects
            </a>
          </li>
          <li>
            [2]{" "}
            <a href="/research">
              /research
            </a>
          </li>
          <li>
            [3] <a href="mailto:hey@ak68a.co">hey@ak68a.co</a>
          </li>
        </ul>

        <br />
        <p>Cheers for dropping by.</p>

        <footer ref={footerRef} className="footer">
          AK68A RA= 12h 56.7m, Dec= +21° 41´
        </footer>
        <div className="copyright">&copy; 2030 ak68a</div>
      </div>
    </>
  );
}
