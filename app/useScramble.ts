"use client";

import { useEffect, useRef } from "react";

interface ScrambleOptions {
  duration?: number;
  interval?: number;
  charset?: "numbers" | "alphabet" | "punctuation" | "alphanumeric" | "all";
  uppercase?: boolean;
}

const charsets = {
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  alphabet: [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  ],
  punctuation: [
    "@", "#", "$", "%", "^", "*", "(", ")", "&", "+", "=", "}", "{",
    "|", ":", ";", ">", "<", "?", "~", " ",
  ],
  get alphanumeric() {
    return [...this.numbers, ...this.alphabet];
  },
  get all() {
    return [...this.alphanumeric, ...this.punctuation];
  },
};

function randomChar(chars: string[], upper: boolean): string {
  const c = chars[Math.floor(Math.random() * chars.length)];
  return upper ? c.toUpperCase() : c;
}

export function useScrambleLoop(
  ref: React.RefObject<HTMLElement | null>,
  options: ScrambleOptions & { minDelay?: number; maxDelay?: number } = {}
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const duration = options.duration ?? 400;
    const interval = options.interval ?? 20;
    const charsetName = options.charset ?? "all";
    const uppercase = options.uppercase ?? true;
    const minDelay = options.minDelay ?? 30000;
    const maxDelay = options.maxDelay ?? 60000;
    const chars = charsets[charsetName];

    let timeout: number;
    let scrambleTimer: number;

    function runScramble() {
      const originalText = el!.getAttribute("data-text") || el!.textContent || "";
      if (!el!.getAttribute("data-text")) {
        el!.setAttribute("data-text", originalText);
      }

      const len = originalText.length;
      const arr = originalText.split("");
      const totalSteps = Math.max(1, Math.floor(duration / interval / len));

      let iteration = 0;
      let spliceIteration = 0;

      scrambleTimer = window.setInterval(() => {
        iteration++;
        const scrambled: string[] = [];
        for (let i = 0; i < len; i++) {
          scrambled.push(randomChar(chars, uppercase));
        }

        if (iteration % totalSteps === 0) {
          spliceIteration++;
        }

        const realChars = arr.slice(0, spliceIteration);
        for (let i = 0; i < realChars.length; i++) {
          scrambled[i] = realChars[i];
        }

        el!.textContent = scrambled.join("");

        if (spliceIteration >= len) {
          window.clearInterval(scrambleTimer);
          scheduleNext();
        }
      }, interval);
    }

    function scheduleNext() {
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      timeout = window.setTimeout(runScramble, delay);
    }

    scheduleNext();

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(scrambleTimer);
    };
  }, [ref, options.duration, options.interval, options.charset, options.uppercase, options.minDelay, options.maxDelay]);
}

export function useScrambleOnHover(options: ScrambleOptions = {}) {
  const duration = options.duration ?? 800;
  const interval = options.interval ?? 30;
  const charsetName = options.charset ?? "all";
  const uppercase = options.uppercase ?? false;
  const chars = charsets[charsetName];

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const originalText = el.getAttribute("data-text") || el.textContent || "";
    if (!el.getAttribute("data-text")) {
      el.setAttribute("data-text", originalText);
    }

    const len = originalText.length;
    const arr = originalText.split("");
    const totalSteps = Math.max(1, Math.floor(duration / interval / len));

    let iteration = 0;
    let spliceIteration = 0;

    const existing = (el as unknown as Record<string, unknown>)._scrambleTimer as number | undefined;
    if (existing) window.clearInterval(existing);

    const timer = window.setInterval(() => {
      iteration++;
      const scrambled: string[] = [];
      for (let i = 0; i < len; i++) {
        scrambled.push(randomChar(chars, uppercase));
      }

      if (iteration % totalSteps === 0) {
        spliceIteration++;
      }

      const realChars = arr.slice(0, spliceIteration);
      for (let i = 0; i < realChars.length; i++) {
        scrambled[i] = realChars[i];
      }

      el.textContent = scrambled.join("");

      if (spliceIteration >= len) {
        window.clearInterval(timer);
      }
    }, interval);

    (el as unknown as Record<string, unknown>)._scrambleTimer = timer;
  };

  return { onMouseEnter };
}

export function useScramble(
  ref: React.RefObject<HTMLElement | null>,
  options: ScrambleOptions = {}
) {
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;
    hasRun.current = true;

    const duration = options.duration ?? 3000;
    const interval = options.interval ?? 30;
    const charsetName = options.charset ?? "all";
    const uppercase = options.uppercase ?? true;
    const chars = charsets[charsetName];

    const originalText = el.textContent || "";
    const len = originalText.length;
    const arr = originalText.split("");
    const totalSteps = Math.floor(duration / interval / len);

    let iteration = 0;
    let spliceIteration = 0;

    el.textContent = "";

    const timer = window.setInterval(() => {
      iteration++;
      const scrambled: string[] = [];
      for (let i = 0; i < len; i++) {
        scrambled.push(randomChar(chars, uppercase));
      }

      if (iteration % totalSteps === 0) {
        spliceIteration++;
      }

      // Replace first spliceIteration chars with real chars
      const realPart = arr.slice(0, spliceIteration).join("");
      const realChars = realPart.split("");
      for (let i = 0; i < realChars.length; i++) {
        scrambled[i] = realChars[i];
      }

      el.textContent = scrambled.join("");

      if (spliceIteration >= len) {
        window.clearInterval(timer);
      }
    }, interval);

    return () => window.clearInterval(timer);
  }, [ref, options.duration, options.interval, options.charset, options.uppercase]);
}
