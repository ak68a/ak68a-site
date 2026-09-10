# ak68a AI/ML Repositioning — Deferred Changes

*Changes to make as the career plan portfolio projects and research papers ship.*
*Reference: `fintech-engineer/career/PLAN.md` for the full skill-up roadmap.*

---

## 1. Own Work Section — Add Portfolio Projects

Replace or augment the current Open Source & Personal section (Zero, Clossir, ACK, Nighthawk) as each project ships. These are ordered by the career plan phases.

### Phase 1 ship
- **Transaction Anomaly Detector** — "Fraud detection models built from scratch. Isolation Forest, One-Class SVM, and a custom autoencoder compared on financial transaction data with proper precision-recall evaluation."

### Phase 2 ship
- **Fintech Document Intelligence** — "RAG pipeline for SEC filings and financial regulations. Fine-tuned embedding model for retrieval, LLM generation with faithfulness evaluation via RAGAS."

### Phase 3 ship
- **AML Transaction Screening** — "End-to-end ML pipeline for anti-money laundering. Real-time feature store, trained model, drift monitoring, and an LLM triage layer that drafts SAR narratives."

### Phase 4 ship
- **On-Chain Fraud Detection (GNN)** — "Graph Attention Network for detecting suspicious wallet clusters on blockchain data. LLM explanation layer translates graph features into human-readable alerts."
- **Credit Risk Engine** — "XGBoost + neural network ensemble for credit default prediction. SHAP explanations for every prediction, model monitoring dashboard, LLM-generated adverse action notices."

**Decision:** Keep Zero and ACK (security + agent commerce are still relevant to the AI/ML + fintech narrative). Consider removing Clossir and Nighthawk if they dilute the AI/ML positioning, or moving them to a secondary section.

---

## 2. Research Papers — Add New Papers

Add these to the `papers` array in `page.tsx` as they're written. They sit alongside existing papers (agent orchestration, agent reliability, shadow systems — which already support the AI narrative).

### Phase 2 paper
```
{
  id: "rag-compliance",
  title: "Retrieval-Augmented Generation for Financial Compliance: A Practical Framework",
  date: "TBD",
  tags: ["AI/ML", "fintech", "RAG", "compliance"],
  description: [
    "Benchmark of RAG approaches for compliance document Q&A. Fine-tuned embeddings vs. off-the-shelf, BM25 vs. dense retrieval, chunk size ablation. Measured on retrieval accuracy, answer faithfulness, latency, and cost."
  ],
}
```

### Phase 3 paper
```
{
  id: "mlops-fintech",
  title: "MLOps Patterns for Financial Services: Regulatory Constraints and Production Realities",
  date: "TBD",
  tags: ["AI/ML", "fintech", "MLOps", "compliance"],
  description: [
    "How model risk management requirements (SR 11-7, OCC guidance) shape ML infrastructure. Champion-challenger testing, audit trails, explainability requirements. Architecture diagrams and decision frameworks for regulated ML."
  ],
}
```

### Phase 4 paper
```
{
  id: "gnn-aml",
  title: "Graph Neural Networks for Anti-Money Laundering: Detecting Illicit Fund Flows in Cryptocurrency Networks",
  date: "TBD",
  tags: ["AI/ML", "fintech", "GNN", "blockchain"],
  description: [
    "GCN, GAT, and GraphSAGE applied to blockchain transaction graphs. Compared against rule-based, tabular ML, and network-feature-engineered baselines. Precision-recall analysis with false positive cost modeling for AML operations."
  ],
}
```

---

## 3. LedgerDrift Link — Reframe

Update the `/ledgerdrift` nav item or add a subtitle in the left pane. Current state is just a bare link. When blog posts are live, consider adding a descriptor:

```
[3] /ledgerdrift — AI/ML in fintech
```

Or add a line under the nav list:
> "Technical writing on fraud detection, ML infrastructure, and AI systems in financial services."

---

## 4. Existing Paper Descriptions — Reframe for ML

The current papers already lean AI/ML but their descriptions emphasize the security/agent angle. Consider rewriting descriptions to lead with the ML angle:

### "Evaluating Agent Reliability in Financial Tool Use"
**Current:** "AI agents using financial tools fail 75% of the time out of the box. A five-layer reliability stack brings that to near-zero."
**Consider:** Keep as-is. This already reads as ML/AI engineering. The "five-layer reliability stack" framing is strong.

### "Multi-Repo Agent Orchestration with Layered Code Intelligence"
**Current:** "Three-layer MCP intelligence hub giving AI agents cross-repo awareness across a 13-repo fintech platform."
**Consider:** Slightly reframe to emphasize the ML orchestration: "Three-layer intelligence system for AI agent coordination across a 13-repo fintech platform. Context routing, code awareness, and multi-agent orchestration."

### "Autonomous Shadow Systems for Continuous Adversarial Testing"
**Current:** "A production-mirror shadow system operated entirely by AI agents."
**Consider:** Add the ML angle: "Production-mirror shadow system operated by AI agents. Continuous adversarial testing with automated anomaly detection across financial infrastructure."

---

## 5. Value Prop Doc — Update

Update `docs/value-prop.md` to lead with AI/ML:
- "What I Do" section should open with ML systems, not architecture
- "What Makes Me Different" should lead with ML depth, not AI-native dev methodology
- Add a "Proof of Work" section for portfolio projects as they ship

---

## 6. Social Image

When enough projects are live, update `public/social.png` to reflect the AI/ML positioning. Current image likely matches the old "CTO & financial systems architect" tagline.

---

## Checklist

- [ ] Phase 1 project live → add Transaction Anomaly Detector to Own Work
- [ ] Phase 2 project live → add Fintech Document Intelligence + RAG paper
- [ ] Phase 3 project live → add AML Screening System + MLOps paper
- [ ] Phase 4 projects live → add GNN Fraud Detection + Credit Risk Engine + GNN paper
- [ ] First 3 LedgerDrift posts live → reframe the /ledgerdrift link
- [ ] All projects live → update value-prop.md, consider removing non-AI own work items
- [ ] Final pass → update social.png, review all copy for consistency
