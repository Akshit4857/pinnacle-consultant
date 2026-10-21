# Anti-AI-Slop Design & Engineering Rules (Slop.md)

Concrete, checkable rules to ensure the codebase and user interface reflect intentional, human-crafted design and engineering rather than generic, machine-averaged LLM output.

---

## 1. The Core Philosophy: "Install Taste"

AI models default to the average of what they have seen: centered three-line headlines, little eyebrow pill badges, glowing borders, indigo gradients, and repetitive icon card grids.
**Every design and structural choice must be intentional, grounded in the subject's identity, and free of formulaic clichés.**

---

## 2. Cardinal Sins (Strictly Banned Patterns)

1. **Default AI Indigo / Purple Accents**
   - Never default to generic Tailwind indigos (`#6366f1`, `#4f46e5`, `#7c3aed`). Always use the project's semantic theme tokens (`--color-brand-light`, `--color-brand-dark`, `--color-brand-line`).
2. **Two-Stop "Trust" Gradients on Heros**
   - No generic purple→blue, blue→cyan, or indigo→pink gradient blobs. Rich solid materials, bespoke editorial imagery, and deliberate typography always beat generic gradient wash.
3. **Emoji as Feature Icons**
   - Never use `✨`, `🚀`, `🎯`, `⚡`, `🔥`, `💡` inside headings, buttons, or feature lists. Use refined, monoline SVG icons with matched stroke width and `currentColor`.
4. **The Generic "AI Dashboard / Card" Shape**
   - Avoid rounded cards with arbitrary colored left borders or glowing ambient drop-shadows on hover. Rely on clean subtle borders (`border-brand-edge`), tonal elevation, and structured whitespace.
5. **Formulaic SaaS Hero Stacks**
   - Do not repeat the predictable formula: `[Floating Eyebrow Pill] -> [Centered Headline] -> [Generic 2-line Subtitle] -> [Two Rounded CTA Buttons]`. Design layouts tailored to the subject's hierarchy and user workflow.
6. **Icons in Tinted Squares**
   - Avoid rows of repetitive colored squares containing a Lucide icon with two lines of placeholder copy below. Use varied layout compositions, data callouts, and interactive depth.

---

## 3. Execution & Motion Failures (Zero Tolerance)

1. **Content Gated by Entrance Animations**
   - **Content must always be readable by default.** Never leave critical content at `opacity: 0` waiting on an intersection observer that might fail, jank, or run off-screen.
   - Animate subtle offsets (`y: 8` or spring transforms) rather than full vanishing opacities.
2. **Horizontal Overflow & Clipped Containers**
   - Check all screen sizes (mobile, tablet, desktop). Text, badges, and cards must never clip or break parent boundaries.
3. **Typography Hygiene**
   - Never use default `system-ui` or hardcoded unconfigured fonts when brand font variables (`Plus Jakarta Sans`, etc.) are established.
   - Maintain strict typographic scale: clear contrast between display headings, section headers, and body prose.

---

## 4. Premium Craft Standards

- **Atmosphere & Real Assets**: Use authentic photography, real data, and contextual illustrations. Never use generic stock placeholders or uncalibrated mockups.
- **Layered Depth**: Use subtle background grids, feathered editorial overlays, and high-contrast readable typography.
- **Clean Code & Comments**:
  - Do not litter JSX or components with obvious, repetitive micro-comments (e.g. `{/* Full Name */}`, `{/* Button */}`, `{/* Section 1 */}`).
  - Never retain prompt-artifact comments (e.g. `"Inspiration: Apple / Linear"`, `"Matches reference"`, etc.).
  - Keep comments sparse, high-level, and meaningful.

---

## 5. Developer Instructions Override

Specific user instructions and brand guidelines in the project take precedence over default rules. These constraints serve as a quality floor, not a ceiling.
