import { NextResponse } from "next/server";

export const revalidate = 300; // cache for 5 minutes

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return NextResponse.json({ repo: null }, { status: 200 });
  }

  const res = await fetch(
    "https://api.github.com/user/repos?sort=pushed&per_page=1&affiliation=owner",
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ repo: null }, { status: 200 });
  }

  const repos = await res.json();
  if (!repos.length) {
    return NextResponse.json({ repo: null }, { status: 200 });
  }

  const repo = repos[0];
  return NextResponse.json({
    repo: {
      name: repo.name,
      pushedAt: repo.pushed_at,
    },
  });
}
