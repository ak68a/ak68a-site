import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { join } from "path";

const papers: Record<string, { pin: string; file: string; filename: string }> = {
  "agent-reliability": {
    pin: process.env.PAPER_PIN?.trim() || "1992",
    file: "workflow-eval-paper.pdf",
    filename: "agent-reliability-financial-tool-use.pdf",
  },
  "supply-chain-defense": {
    pin: process.env.PAPER_PIN?.trim() || "1992",
    file: "supply-chain-defense.pdf",
    filename: "supply-chain-defense.pdf",
  },
};

const attempts = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = attempts.get(ip);

  if (!record || now > record.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return false;
  }

  record.count++;
  return record.count > 5;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { pin, paper: paperId } = body;

  const paper = papers[paperId || "agent-reliability"];
  if (!paper) {
    return NextResponse.json({ error: "Paper not found." }, { status: 404 });
  }

  if (!pin || pin !== paper.pin) {
    return NextResponse.json({ error: "Invalid PIN." }, { status: 401 });
  }

  const filePath = join(process.cwd(), "private", paper.file);

  try {
    const file = await readFile(filePath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${paper.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Paper not found." },
      { status: 404 }
    );
  }
}
