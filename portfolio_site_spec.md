# Scott Smith Portfolio Rebuild — Developer Spec

> **Purpose**\
> Rapidly refactor the existing static portfolio into a lean, accessible, and visually cohesive site that sells a senior‑level UX story at first glance.\
> This spec is intentionally atomised so any AI coding assistant (or human dev) can lift tasks verbatim into issues.

---

## 1 Tech Stack

| Layer            | Choice                                           | Notes                                                                                   |
| ---------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Static generator | **Eleventy** (Nunjucks)                          | Plain HTML output, partials for nav/footer.                                             |
| Bundler          | **Vite**                                         | Fast HMR, asset hashing, SCSS → CSS.                                                    |
| Styling          | **SCSS + CSS custom‑properties** (design tokens) | Tailwind utility classes allowed during prototyping, removed in final build if desired. |
| JS               | Vanilla ES6                                      | Only for nav drawer, section observer, Swiper gallery.                                  |
| Deploy           | Netlify                                          | `netlify.toml` with `npm build`.                                                        |

---

## 2 Design Tokens (v1)

```css
:root {
  /* Greys */
  --grey-900:#111827;
  --grey-700:#374151;
  --grey-500:#6B7280;
  --grey-100:#F3F4F6;

  /* Brand */
  --indigo-600:#4F46E5;
  --indigo-400:#6366F1;
  --cyan-500:#06B6D4;
  --amber-400:#FBBF24;
  --error-500:#EF4444;

  /* Radii & Elevation */
  --r-lg:1.25rem;
  --shadow-md:0 4px 10px rgba(17, 24, 39, .08);

  /* Spacing scale */
  --space-xs:.5rem;
  --space-s:.75rem;
  --space-m:1rem;
  --space-l:1.5rem;
  --space-xl:2rem;
}
```

*Edit tokens only here; cascade everywhere else.*

---

## 3 Information Architecture & Nav

1. **Root pages**\
   `/index.html`, `/about.html`, `/contact.html`, `/case/…` (one per study).
2. **Global nav partial**
   ```njk
   {% include "partials/site‑nav.njk" %}
   ```
   - Shows Work · About · Contact on desktop.
   - Hamburger drawer on ≤768 px, background content set `inert`.
3. **Section TOC** on each case study (auto‑generated `<nav aria-label="On‑page">`).
4. **Prev/Next pager** pulls titles from Front‑Matter `{% set title %}`.

---

## 4 Components

| Component           | Location                      | Responsibility                                                             |
| ------------------- | ----------------------------- | -------------------------------------------------------------------------- |
| `HeroCover`         | `components/hero-cover.njk`   | Blurred background image + gradient overlay + title, subtitle, meta strip. |
| `MetricCard`        | `components/metric-card.njk`  | Large number + label, used in Impact sections.                             |
| `ProjectCard`       | `components/project-card.njk` | Thumbnail, title, one‑line blurb (index grid).                             |
| `ScreenshotGallery` | `components/gallery.njk`      | Swiper container, accepts image array front‑matter.                        |

All components must:

- Accept props via Nunjucks macro params.
- Have BEM‑ish class names (`.metric-card`, `.metric-card__value`).

---

## 5 Page Templates

### 5.1 Index

```njk
{% extends "layouts/base.njk" %}
{% block content %}
  {{ HeroCover(title="Scott Smith", subtitle="Design leader translating messy healthcare data into elegant, money‑making products.", cta="/Scott_Smith_Resume.pdf") }}

  {{ SectionHeading("Featured Work") }}
  <div class="grid md:grid-cols-3 gap-6">
    {% for project in collections.featured %}
      {{ ProjectCard(project) }}
    {% endfor %}
  </div>

  {{ AboutSnapshot() }}  <!-- narrative + skills bullets -->
  {{ ContactCallout() }}
{% endblock %}
```

### 5.2 Case Study

Front‑matter example:

```yaml
---
layout: case-study
title: Payment Integrity Compass (PIC)
client: "Healthcare RevCycle SaaS"
role: "UX Lead"
domain: "Revenue Cycle"
cover: "/img/pic-cover.webp"
---
```

`case-study.njk` automatically renders:

- **HeroCover** with `cover`.
- Sections: **Challenge · Discovery · Design · Solution · Impact** (markdown injected).
- **ScreenshotGallery** if `gallery` array exists.
- **Prev/Next** component.

---

## 6 Accessibility & Performance Requirements

| Area            | Target                                               |
| --------------- | ---------------------------------------------------- |
| Lighthouse A11y | ≥ 95                                                 |
| Contrast        | WCAG AA text 4.5:1 (use tokens)                      |
| Focus styles    | Use `:focus-visible`, never remove outlines globally |
| Transfer size   | ≤ 1.2 MB on desktop (Fast 3G throttling)             |
| CLS             | < 0.1                                                |

---

## 7 Build & Lint Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build && eleventy",
  "serve": "vite preview",
  "lint:css": "stylelint \"src/**/*.scss\"",
  "lint:js": "eslint src/js"
}
```

---

## 8 Timeline (4‑Week Sprint)

| Week | Milestones                                                     |
| ---- | -------------------------------------------------------------- |
| 1    | Token layer, nav partial, hero asset swap, About/Contact pages |
| 2    | Index redesign complete, ProjectCard grid populated            |
| 3    | Case-study template built; migrate FLAER & PIC studies         |
| 4    | Remaining studies, image optimisation, a11y/perf audit, deploy |

---

### 9 Acceptance Checklist (per PR)

-

---

**Hand‑off complete — drop this file into the repo root as **``

