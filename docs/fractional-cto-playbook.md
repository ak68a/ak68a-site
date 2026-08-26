# Fractional CTO Playbook

**For:** Personal operating manual — how I run a fractional CTO engagement from first call to offboarding.

---

## Phase 1: Sales & Qualification (Week 0)

### Discovery Call (30–45 min)

Questions I need answered before I quote:

1. **What's broken?** Why are they looking for a CTO now? (Common: founder is non-technical and drowning in vendor/hiring decisions, previous CTO left, team is building but nobody is steering, investors told them they need one)
2. **Do they have engineers?** If yes, how many, how senior, how long have they been there? This determines Mode A vs Mode B.
3. **What's their runway / stage?** Pre-seed building an MVP is a different engagement than Series B scaling a team from 5 to 20.
4. **What decisions are stuck?** Usually there are 2–3 concrete decisions they can't make without technical leadership. These become early wins.
5. **Who do I report to?** CEO? Board? This sets the communication structure.
6. **What's their compliance situation?** Fintech clients often underestimate this. If they're handling money and haven't thought about SOC 2 / OFAC / PCI, that's scope I need to flag early.

### Qualifying Out

Walk away if:
- They want a "CTO" title on their pitch deck but don't want to change anything
- The founder overrides every technical decision and wants a rubber stamp
- Budget is under $4K/mo — they need a senior engineer, not a CTO
- The codebase is a dumpster fire and they want me to fix it for $4K/mo (that's Mode A Intensive minimum)

### Proposal

Keep it to 1 page:
- What I heard (their pain)
- What I'll do (Mode A or B, specific tier)
- What they'll get in the first 30 days (3–5 concrete deliverables)
- Price and terms (monthly retainer, 3-month minimum, NET 15)

---

## Phase 2: Onboarding (Week 1–2)

### The First 48 Hours

This is where I earn the right to lead. No one trusts a new CTO who spends two weeks "getting up to speed."

**Day 1:**
- Get access: repos, CI/CD, cloud console, error tracking, project management tool, Slack/comms
- Read the README and deployment docs (or note that they don't exist)
- Run the app locally (or note that this is broken — that's finding #1)
- Review the last 20 PRs to understand code quality, review culture, and who's actually shipping

**Day 2:**
- 1:1 with every engineer (30 min each). Questions:
  - What are you working on and why?
  - What's the most frustrating part of your day?
  - What would you change if you could?
  - What's the scariest part of the codebase?
- Architecture sketch on paper — how does data flow, where does money move, what are the external dependencies?
- Identify the top 3 risks (technical debt that's about to bite, security gaps, single points of failure)

**End of Week 1 Deliverable: State of Engineering Memo**

A 2–3 page document for the CEO/founder:
- Current architecture (diagram + plain English)
- Team assessment (strengths, gaps, hiring needs)
- Top 3 risks with severity and timeline
- Quick wins (things I can fix or improve in the next 2 weeks)
- 90-day roadmap recommendation

This memo does two things: it shows the client I've done the work, and it sets expectations for what "good" looks like.

---

## Phase 3: Steady State Operations

### Weekly Rhythm

**Mode B (Pure CTO) — Standard Tier (~10 hrs/wk):**

| Day | Activity | Time |
|-----|----------|------|
| Monday | Team standup or async check-in. Review what shipped last week, what's blocked. | 1 hr |
| Monday | 1:1 with engineering lead(s). Technical direction, career growth, blockers. | 1 hr |
| Tuesday | Architecture / code review. Look at the PRs that matter — not all of them, the ones that touch critical paths. | 1.5 hr |
| Wednesday | Vendor / tooling / hiring. Evaluate tools, interview candidates, review job descriptions. | 1.5 hr |
| Thursday | Strategy work. Roadmap refinement, technical due diligence, board prep, compliance review. | 2 hr |
| Friday | CEO sync (30 min). What happened this week, what's coming, what decisions need their input. | 0.5 hr |
| Ongoing | Slack availability for async questions, unblocking, quick decisions. | 2.5 hr |

**Mode A (CTO + Builder) — add hands-on blocks:**

Same rhythm plus dedicated build time. The build time is protected — I'm not available for Slack during build blocks. The team learns to batch questions.

### Monthly Cadence

- **Month-end report** to CEO/founder: what shipped, what's at risk, team health, budget vs actuals on infrastructure
- **Architecture review**: zoom out. Is the system still heading where we said it should? Any drift?
- **Hiring pipeline review**: are we hiring the right roles? Are JDs still accurate? Interview process working?
- **Security check-in**: any new vulnerabilities, dependency updates needed, compliance deadlines approaching?

### Quarterly

- **Roadmap review** with CEO and stakeholders. Re-prioritize based on what we learned.
- **Team retro**: what's working in our engineering process, what's not. I facilitate, not dictate.
- **Tech debt assessment**: what's getting worse, what can we live with, what needs to be addressed this quarter.
- **Budget review**: cloud costs trending, tooling costs, team costs. Flag anything growing faster than revenue.

---

## Phase 4: Key CTO Functions

### Hiring

My hiring process:
1. Write the JD myself (not HR). Technical roles need technical descriptions.
2. Resume screen: I review, not a recruiter. 15 seconds per resume — I know what I'm looking for.
3. Technical screen (30 min): Can they talk about systems? Do they understand trade-offs? I don't do leetcode — I ask them to walk me through something they built.
4. Architecture exercise (60 min): Give them a real problem from the client's domain (anonymized). Watch how they think, not what they produce.
5. Team fit conversation: Let the team meet them. I have veto power but the team has input.
6. Offer: Competitive but not inflated. I benchmark against levels.fyi and the client's market.

If the client needs volume, I route through Trio for sourcing.

### Vendor Evaluation

Framework I use every time:
1. Does it solve the actual problem (not a related problem)?
2. What's the switching cost if it doesn't work out?
3. Who else in our space uses it? Call them.
4. What's the pricing model at 10x our current scale?
5. Security and compliance posture — SOC 2 report, data residency, encryption at rest.
6. Integration complexity — how long to get a working POC?

Decision documented in a short ADR (Architecture Decision Record): context, options considered, decision, consequences.

### Board / Investor Interface

What I prepare for board meetings:
- Engineering velocity metrics (not story points — actual shipped features, time-to-deploy, incident count)
- Infrastructure cost trends with forecast
- Team composition and hiring plan
- Technical risk register (top 3, with mitigations)
- Security/compliance status

What I DON'T do: Make engineering sound more impressive than it is. Boards figure out eventually. Credibility is the only currency.

### Crisis Management

When something breaks in production:
1. **Acknowledge** — tell the CEO/stakeholders immediately. "We have an issue, here's what we know, here's when I'll update you next."
2. **Triage** — is it data loss, money loss, or just downtime? This determines urgency.
3. **Fix** — assign the right person (or do it myself in Mode A). One person owns the fix, everyone else stays out of the way.
4. **Communicate** — updates every 30 min until resolved. No jargon in stakeholder updates.
5. **Post-mortem** — within 48 hours. Blameless. What happened, why, what we're changing so it doesn't happen again. Written doc, shared with the team.

---

## Phase 5: Offboarding

### The Goal

When I leave, the client should be BETTER off than when I started — not dependent on me.

### Offboarding Checklist

- [ ] Architecture docs are current and the team understands them
- [ ] Engineering processes (PR review, deployment, incident response) are documented and habitual
- [ ] Hiring pipeline is established — they can hire without me
- [ ] All vendor relationships are transferred to internal contacts
- [ ] Knowledge transfer sessions with my replacement (if they've hired a full-time CTO)
- [ ] Final state-of-engineering memo (compare to the one from Week 1)
- [ ] All access revoked (I ask them to revoke, then verify)

### Transition Period

Last month of engagement shifts from leading to shadowing. My replacement (internal promote or new hire) makes the decisions. I'm there for gut-checks and context, not execution.

---

## Rules for Myself

1. **Never surprise the CEO.** If something is going wrong, they hear it from me first, not from an angry customer or a board member.
2. **Protect the team from politics.** My job is to be the shield. The team builds. I handle the stakeholders.
3. **Say no more than yes.** Every feature request gets a "what do we stop doing to make room for this?" The backlog is not a wishlist.
4. **Write things down.** Decisions that aren't documented didn't happen. ADRs for architecture. Memos for strategy. Slack for everything else.
5. **One client at a time for Intensive. Two max for Standard. Three max for Advisory.** Beyond that, quality drops and nobody gets the CTO they're paying for.
6. **Don't become the bottleneck.** If every decision routes through me, I've failed. Build decision frameworks, delegate, and trust.
7. **Bill honestly.** If I spent 8 hours this week instead of 10, say so. Trust is worth more than 2 hours of billing.
