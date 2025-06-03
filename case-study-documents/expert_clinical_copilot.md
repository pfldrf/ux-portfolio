# Case Study – ECR Copilot Assistant

*An embedded AI assistant that super‑charges Expert Clinical Review (ECR) nurses—triaging triggered charts, surfacing key evidence, and polishing documentation for consistency.*

---

## 1 Context & Constraints

| Item              | Details                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| **Client**        | ProvidenceCare System (12 hospitals, 1.8 M annual encounters)                                                 |
| **Domain**        | Expert Clinical Review of EHR charts (post‑trigger verification)                                              |
| **Primary Users** | ECR nurses, physician reviewers, quality analysts                                                             |
| **Team & Role**   | 1 × Product Owner, **UX Lead (me)**, 1 × Clinical SME, 2 × ML engineers, 2 × FE devs, 1 × Prompt engineer     |
| **Timeline**      | 15 weeks (Jan → Apr 2025)                                                                                     |
| **Regulatory**    | HIPAA, PSO confidentiality, SOC 2 type II (cloud), WCAG 2.2 AA                                                |
| **KPIs**          | ↓ median chart‑verification time ≤ 12 min; ↑ inter‑rater reliability (κ) ≥ 0.82; ↓ editing passes / doc ≤ 1.3 |

---

## 2 Strategic Foundation

### 2.1 Discovery Research

* **Contextual Inquiry** – shadowed 10 ECR nurses across two facilities; avg 28 min per chart, 3.2 doc revisions.
* **Pain Points** – manual signal hunting; inconsistent narrative tone; repetitive demographic entry.
* **Data Audit** – 11 common trigger types (med reversal, HAIs, falls) → 2 450 historical verified events.

### 2.2 Opportunity Framing

> *JTBD*: “When a trigger fires, I want the key chart excerpts summarized and templated so I can confirm harm quickly and record it consistently.”

* **North‑Star OKR** – *O1*: Cut verification cycle time in half while raising documentation quality.
  *KR1*: 50 % faster chart verification.
  *KR2*: κ ≥ 0.80 agreement across reviewers.

---

## 3 Design Process Highlights

| Phase                   | Key Activities                                                         | Artefacts                     |
| ----------------------- | ---------------------------------------------------------------------- | ----------------------------- |
| **Signal Mapping**      | LLM‑assisted prompt chain extracts vitals, orders, progress notes      | Prompt tree *(Fig 1)*         |
| **Wireframe Sprint**    | Split‑screen: evidence timeline + copilot chat                         | Mid‑fi prototype *(Fig 2)*    |
| **Copilot Behaviors**   | Clarify questions, best‑practice tone suggestions, ICD‑10 auto‑suggest | Conversation script *(Fig 3)* |
| **Pilot**               | 3‑week shadow rollout; n = 312 charts reviewed                         | Pilot metrics sheet *(Fig 4)* |
| **Design‑System Merge** | Added “Evidence Highlight” & “Copilot Chip” components                 | Token additions *(Fig 5)*     |

#### Figure Descriptions

* **Fig 1 – Prompt Tree:** System prompt → chart segmentation → role‑based summarizer → clarifier.
* **Fig 2 – Split‑Screen Prototype:** Left: note timeline with highlighted risk sentences; Right: copilot chat suggesting “Missing med dose?”
* **Fig 3 – Conversation Script:** Example clarifier: “Was the fall unassisted? Type Yes/No.”
* **Fig 4 – Pilot Metrics:** Column chart: avg review time down from 26.8 min → 11.7 min over 3 weeks.
* **Fig 5 – Tokens:** `--evidence‑highlight:#FFF3C4` (contrast 9.0:1), `--copilot‑blue:#2E8BC0`.

---

## 4 Polished UI Execution

### 4.1 Review Workspace (Web)

* **Evidence Timeline** – Chronological notes, labs, meds; AI highlights suspect entries.
* **Copilot Panel** – Suggests follow‑ups (“missing med route”) and offers auto‑fill for demographics.
* **Doc Editor** – Markdown w/ AI “Rewrite for clarity” button.

!\[Placeholder – Split‑screen UI with timeline evidence and copilot chat panel]

### 4.2 Smart Templates

* **Dynamic Fields** – Auto‑populated patient age, unit, trigger type.
* **Tone Check** – Copilot flags subjective language; offers concise alternative.

!\[Placeholder – Doc editor showing AI rewrite suggestion banner]

---

## 5 Outcome & Impact

| Metric                          | Baseline | Copilot v1      | Δ      |
| ------------------------------- | -------- | --------------- | ------ |
| Median verification time        | 27 min   | **11 min 54 s** | ↓ 56 % |
| Inter‑rater reliability (κ)     | 0.63     | **0.84**        | + 0.21 |
| Editing passes per doc          | 3.2      | **1.2**         | –2.0   |
| Verified charts / nurse / shift | 11.4     | **22.8**        | 2×     |

> “Copilot finds the smoking‑gun line in seconds—I just verify and move on.” – Senior ECR Nurse

---

## 6 Reflection & Next Steps

1. **Voice Commands** – Hands‑free ‘Highlight last vitals’ for accessibility.
2. **Explainability Overlay** – Show LLM evidence citations for reviewer trust.
3. **Auto‑generate legal summaries** – Tailored PDF export for malpractice counsel.

---

## 7 Artifact Links (Redacted)

* Figma prototype & copilot convo scripts
* Prompt‑chained notebook (synthetic data)
* Pilot evaluation report (31 slides)

---

> Insert censored screenshots or synthetic chart excerpts where placeholders appear before external sharing.
