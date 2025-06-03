# Case Study – FLAER Mobile AI Event Reporting

*A conversational mobile app that lets frontline clinicians capture harm & near‑miss events in under two minutes—while an on‑device LLM handles smart follow‑ups, data validation, and real‑time routing.*

---

## 1 Context & Constraints

| Item              | Details                                                                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client**        | UnityCare Health (29 hospitals, 140 outpatient clinics)                                                                                        |
| **Domain**        | Voluntary Adverse‑Event & Near‑Miss Reporting (PSO)                                                                                            |
| **Primary Users** | Nurses, physicians, respiratory therapists, pharmacists                                                                                        |
| **Team & Role**   | Product Owner, **UX Lead (me)**, 2 UI designers, 1 ML engineer, 2 iOS/Android devs, 1 FHIR architect                                           |
| **Timeline**      | 14 weeks (Aug → Nov 2024)                                                                                                                      |
| **Regulatory**    | HIPAA, PSQIA protections, NIST SP 800‑53 mobile hardening, WCAG 2.2 AA                                                                         |
| **KPIs**          | ↓ median report time < 3 min; ↑ data‑field completeness ≥ 90 %; ↑ monthly reporting volume +100 %; route high‑severity events to risk < 10 min |

---

## 2 Strategic Foundation

### 2.1 Discovery Research

* **Shadowing** – observed 18 frontline staff filing legacy web forms (avg 22 required fields, 9 min mean time).
* **Journey mapping** – emotional dip at “Which of the 47 categories?” dropdown; cognitive overload & abandonment.
* **Analytics** – only 31 % of events submitted within 24 h of occurrence.
* **Persona interviews** – clinicians desire “tell it once” narrative style, hate redundant picklists.

### 2.2 Opportunity Framing

> *JTBD:* “When something almost harms my patient, I want to report it quickly without leaving the bedside, so the right team can fix it.”

* **North‑Star OKR** – *O1:* Double event reporting with richer, more reliable data.
  *KR1:* ≥ 90 % reports filed ≤ 24 h.
  *KR2:* Achieve SUS ≥ 80.

---

## 3 Design Process Highlights

| Phase                    | Key Activities                                                               | Artefacts                        |
| ------------------------ | ---------------------------------------------------------------------------- | -------------------------------- |
| **Conversation Mapping** | NLP slot identification, intent taxonomy co‑created w/ patient‑safety SMEs   | Conversation flowchart *(Fig 1)* |
| **Prototype Sprint**     | Built Figma+Voiceflow hi‑fi tappable prototype; tested voice vs text         | Prototype screens *(Fig 2)*      |
| **LLM Fine‑tuning**      | 8 K synthetic + 2 K de‑identified real reports; RLHF on completion & brevity | Prompt library sheet *(Fig 3)*   |
| **Validation**           | Wizard‑of‑Oz bedside pilots on 2 med‑surg units (n = 42 reports)             | Pilot dashboard *(Fig 4)*        |
| **Design‑System Merge**  | Added “Chat Bubble”, “Voice Chip”, and risk color tokens to enterprise DS    | Token sheet *(Fig 5)*            |

#### Figure Descriptions

* **Fig 1 – Conversation Flowchart:** Linear‑yet‑branching diagram: initial free‑text → entity extraction → conditional follow‑ups (e.g., “Was a medication involved?”).
* **Fig 2 – Hi‑Fi Prototype Screens:** (a) Voice capture with live transcript; (b) AI clarification chip (“Which drug dosage was intended?”); (c) Summary confirm screen.
* **Fig 3 – Prompt Library Excerpt:** JSON: `role=system` ensures no PHI leakage; dynamic slot list.
* **Fig 4 – Pilot Metrics Dashboard:** Line graph showing report time median drop from 8.7 min → 2.3 min over 10 days.
* **Fig 5 – FLAER Tokens:** `--flaer-risk-critical:#D72638` (7.2:1 contrast), `--chat-bg:#F5F7FA`.

---

## 4 Polished UI Execution

### 4.1 Mobile Chat Interface (iOS & Android)

* **Natural Language First** – Large text box + mic button; streaming transcription.
* **Smart Follow‑Ups** – AI asks only missing required details; chips auto‑fill known context (e.g., unit, shift).
* **Privacy** – On‑device encryption until Wi‑Fi; “Hide screen” panic tap for public areas.

!\[Placeholder – Chat interface with live dictation and AI follow‑up chip]

### 4.2 Summary & Routing Screen

* **Structured Preview** – Parsed entities displayed in form groups with edit taps.
* **Auto‑Routing** – Risk level badge + destination team (e.g., “Falls Committee”) before submit.

!\[Placeholder – Summary card listing extracted fields and routing banner]

---

## 5 Outcome & Impact

| Metric                        | Legacy Portal | FLAER v1       | Δ      |
| ----------------------------- | ------------- | -------------- | ------ |
| Median report completion time | 9 min 12 s    | **2 min 41 s** | ↓ 70 % |
| Data‑field completeness       | 68 %          | **94 %**       | +26 pp |
| Monthly report volume         | 880           | **2 260**      | +157 % |
| High‑severity routed < 10 min | 11 %          | **79 %**       | +68 pp |
| SUS usability score           | 58            | **86**         | +28    |

**Clinician Quote**

> “I can talk, tap once, and get back to my patient—no more guessing which dropdown.” – RN, Night Shift

---

## 6 Reflection & Next Steps

1. **Realtime Signal Pushback** – Suggest immediate mitigation steps (e.g., “quarantine med lot”).
2. **Multilingual Model** – Fine‑tune Spanish & Tagalog to widen staff adoption.
3. **Wearables** – Explore Apple Watch quick‑note capture for code‑blue scenarios.

---

## 7 Artifact Links (Redacted)

* Voiceflow + Figma prototype (view‑only)
* LLM prompt & slot extraction library
* Pilot study slide‑deck (34 slides)
* Storybook components for chat UI

---

> Swap out placeholders with censored screenshots or synthetic data before external publication.
