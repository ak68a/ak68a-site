"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useScramble, useScrambleLoop } from "./useScramble";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [visible, setVisible] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [footerVisible, setFooterVisible] = useState(false);

  useScramble(titleRef, { duration: 800, interval: 15, charset: "all", uppercase: true });
  useScrambleLoop(titleRef, { duration: 400, interval: 20, charset: "all", uppercase: true, minDelay: 30000, maxDelay: 60000 });

  useEffect(() => {
    const timer = requestAnimationFrame(() => setVisible(true));
    const footerTimer = setTimeout(() => setFooterVisible(true), 300);
    return () => { cancelAnimationFrame(timer); clearTimeout(footerTimer); };
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
            Software engineer building at the intersection of AI,
            security, and payments.
          </p>
          <p>
            Currently at{" "}
            <a href="https://trio.dev" target="_blank" rel="noopener noreferrer">
              Trio
            </a>{" "}
            &mdash; shipping fintech infrastructure for the next generation of
            finance.
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

        <footer className="footer" style={{ opacity: footerVisible ? 1 : 0, transition: "opacity 0.6s ease" }}>
          AK68A RA= 12h 56.7m, Dec= +21&deg; 41&prime;
        </footer>
        <div className="copyright">&copy; 2030 ak68a</div>
      </div>
    </>
  );
}
