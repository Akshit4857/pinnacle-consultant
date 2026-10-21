---
name: anti-ai-slop-design
description: Redesigns an already-built web page or web app (a single HTML file, or a React / Next.js project) to strip the AI-generated visual look, replace emoji with a real icon set, and make deliberate design decisions instead of default ones. Use when a working product needs a visual pass before it ships, gets pitched, or goes on stage. Activates on "redesign," "beautify," "de-slop," "make this look less AI," "kill the AI look," "this looks like every other AI site," "make it look designed," or any request to improve the visual design of an existing product without touching its features.
---

# Anti-AI-Slop Design Directive

Takes a product that already works and makes it look like something a person designed on purpose. Every redesign under this skill follows these rules. This is the visual sibling to anti-ai-slop-writing: same author, same refusal to accept the default output.

## What This Skill Does

This is a redesign skill, not a build-from-scratch skill. The product already exists, either as one HTML file with inline CSS and JS, or as a React / Next.js project. Someone built it fast, it works, and now it needs to stop looking like every other page an AI generates in one shot.

Use it when a demo, a pitch, or a launch is close and the current version looks generated. Don't use it to add features. Don't use it to change what the product does. The job is narrower than that: same functionality, a visual language that looks considered instead of generated.

## The Core Idea: Slop Is the Average

AI slop isn't ugly. It's average: every design decision left at whatever value is most likely. Each default is harmless on its own. Stacked together they produce a page that could belong to any company, and people recognise it in about a second, the same way they recognise stock photography.

The fix is never "do the opposite of the AI." The opposite is just the next default. The fix is to **make the decisions**: work out what this specific product is, and let that decide each colour, font, layout and image.

## The Slop Has Moved

The 2023 tells (purple gradients, glowing orbs, "Supercharge your workflow") are now so widely mocked that strong models avoid them on their own. The current defaults are more tasteful, and that's why they slip through. Learn them by sight.

**The tasteful marketing page.** Warm off-white "paper" background with near-black text. A big serif or condensed headline with one word set in italics in a green, rust or terracotta accent. A small pill badge above the headline ("New: …"). A black pill button with an arrow next to an outlined "See how it works" button. A floating white product card with a soft shadow and a little success toast on its corner. A strip of four big stats. Small letter-spaced monospace labels over every section, often numbered ("01 — About"). It looks considered, which is exactly why nobody questions it, and it comes out the same for an invoicing app, a coffee roaster and an architecture studio.

**The launch page (the older face, still everywhere).** Dark navy or black background, a centred headline whose last words fade from indigo to violet, a purple glow behind it, a tilted product screenshot, a grey "Trusted by" logo strip, three feature cards each with an icon in a tinted rounded square, and a "Ready to get started?" band at the bottom.

**The light dashboard (most web apps).** A wide sidebar with outline icons and counts, a top bar with search, a bell and a blue "+ New" button, then a row of three or four metric cards with sparklines and "+20% from last month", then a chart card beside a list card. Small grey text everywhere, pastel status pills in six colours, white rounded boxes on grey, boxes inside boxes.

**The dark dev tool.** The same skeleton on near-black: grey text that fails contrast, a stat strip, filter tabs with counts, and a table of rows with mono text, green toggles, tag pills and initials in circles.

If the product shares more than three features with any of these, the visual pass isn't finished.

## The Overcorrection

When people (and models) learn the faces above, they swing to a look that's become a default of its own: off-white background, giant type, numbered monospace labels, a fake technical detail like coordinates or a live clock, one rust accent, and no images at all. It reads as "designer-made" for a week and then as a template. Avoid it the same way you avoid the others: by deciding from the product, not from a list of what to avoid.

## Decide From the Product, Not From the Default

Before changing any CSS, write these down (in the chat or in a short `DIRECTION.md`):

1. **The category default you're refusing.** What do the top three competitors in this space share: layout, palette, fonts? What's the cliché colour for this category? Name it so you don't drift back into it.
2. **One concept sentence:** "[Product] is a [thing]." For example, "This booking app is a well-run front desk", or "This waitlist is a hand-lettered shop sign." The thing should come from outside the web: a shop, an object, a place, a printed item, a game. That sentence decides the choices that follow.
3. **The richness on the first screen.** What makes the first screen worth looking at: a real photo, an illustration, a strong shape or colour field, the product itself working, or real data? Big type on a plain background isn't richness.
4. **Tokens, each with a one-line reason:** one accent colour, at most two font families, a type scale, a spacing unit, a corner-radius rule.

## Structure: Pages and Apps

**Sites and landing pages.**
- **The first screen carries three things:** evidence of what the product does, a plain statement of what it is, and the one action you want. That applies on a phone as well as desktop.
- **Build the sections from the visitor's questions, in the order they'd ask them.** A coffee shop's visitor asks what's on, what it tastes like and how fast it arrives. Most pages need four to six sections, not the standard twelve (pill, hero, logos, features, bento, testimonials, three-tier pricing, FAQ, closing band, footer).
- **Show features working instead of describing them in cards:** a real list, a before/after, a small live demo, one big example. If you must list features, list them as text, without boxes or icons.
- **One specific number in a sentence beats a row of four round ones.** "Tailors in Yaba got orders out two days sooner" is read. "10,000+ / 99.9% / 4.9★" is skipped.
- **Real customers or nothing.** No fake logos, no invented testimonials. If there are no customers yet, say nothing.
- **Pricing shows as many plans as the business actually has.** One price goes in the hero.
- **End on the last useful thing** (the price, the contact, the hours), with the action in it, not a band repeating the hero button.

**Web apps.**
- **The work owns the screen.** Ask what the user opens the app to do in the next ten seconds and give that the space. Numbers become a single quiet line, not a row of metric cards.
- **One surface, not boxes inside boxes.** Separate areas with space, alignment and thin dividers. A box is only for things that float: a dialog, a popover, a sheet.
- **One accent for the thing that needs attention.** Show status with words, shape and position as much as colour. A few status colours is fine; six is confetti.
- **Choose the layout from the work.** A top bar for an app with a few sections, a sidebar only when there are many, a split view for a queue.
- **Names as text instead of a circle of initials in every row,** unless the product has real photos.

## Content First

Write the actual words and data before arranging the layout: every headline, label, button, price, name and number. Use specific, uneven, believable data in a realistic state ("3 orders due Friday, one late"), never "Lorem ipsum", "John Doe" or "Acme". Content decides the layout, not the other way round. If anti-ai-slop-writing is available, run the copy through it.

## Banned AI-Slop Patterns: Never Do These

These are current, widely cited tells. Strip every one you find.

**Colour.** Purple-to-blue gradients on buttons, backgrounds or text, and floating blurred "orb" shapes. More than one accent colour competing for attention. Neon glows, coloured shadows with no logic behind them, low-contrast grey-on-dark body text. Gradient text on headings.

**Type.** One system-default sans used for everything with no hierarchy. One family carrying headline, body and labels at the same weight. All-caps or monospace labels stacked over every section. The serif headline with one italic accent word, as a reflex rather than a decision.

**Layout.** Everything centred and stacked in one column. Three identical cards in a row, each with an icon, a bold title and a sentence. A coloured border down the edge of every card. A pill badge above the hero headline. Numbered "1, 2, 3" steps when the content isn't actually sequential. Stat banners with numbers nobody can check.

**Texture and depth.** Glassmorphism on everything that holds text. The same 16px radius on every element regardless of size. Either completely flat with no depth cues, or shadows piled on everything. Shadows belong on things that float.

**Content.** Fake-precise numbers like "99.99% uptime" with nothing behind them. Placeholder names. Marketing clichés (elevate, seamless, unleash, next-gen, game-changing, all-in-one). Two-beat slogan headlines ("Less chasing. More getting paid.") as a reflex.

None of this means every gradient or every rounded corner is wrong. It means using them because a specific decision called for them, not because they're what comes out by default.

## Emoji to Icons: The Hard Rule

Strip every decorative emoji from the interface: headings, buttons, nav items, feature lists, empty states. Emoji in a UI reads as unfinished, and it's one of the fastest ways a reviewer clocks a product as AI-built. No ✨ for "AI" either.

Replace them with a real icon set, not hand-drawn SVG paths and not another emoji made smaller. Lucide is the default: MIT-licensed, actively maintained, and easy to add.

**In a React / Next.js project:** install `lucide-react` and import icons by name (`import { CheckCircle } from "lucide-react"`). Give every icon-only button an accessible name (`aria-label`).

**In a single HTML file, Method A: CDN script (fastest, needs a live connection).**

```html
<script src="https://unpkg.com/lucide@latest"></script>
...
<i data-lucide="check-circle"></i>
...
<script>
  lucide.createIcons();
</script>
```

**In a single HTML file, Method B: inline SVG (no network dependency).** Copy the icon's path data from lucide.dev or tabler.io and paste it in as an `<svg>` element. It renders even if the venue wifi drops mid-pitch, which matters for anything going on stage. For a handful of icons, inline SVG is the better default. For a dozen or more, the CDN script is less typing. Pick one method per file.

**When to use no icons at all.** If an icon doesn't make the meaning clearer than the word next to it, cut it. A list of fifteen items with fifteen icons nobody can tell apart is worse than plain text with good spacing. Skip the obvious metaphors too: a rocket for "launch" and a lightbulb for "ideas" are as tired as the emoji they replace.

## Design Fundamentals to Apply

**Typography.** Two font families at most, each chosen with a reason that comes from the concept, not because it was the first one that came to mind. Headings get tight line-height (about 1.1 to 1.2); body text gets 1.5 to 1.6. Use a real type scale (for example 14 / 16 / 20 / 28 / 40 / 56px) consistently. Use tabular figures where numbers line up in columns. In a single HTML file, load fonts with a Google Fonts `<link>`; in Next.js, use `next/font`.

**Spacing.** Pick a base unit (8px works for almost everything) and make every margin, padding and gap a multiple of it. Group things with space before reaching for boxes.

**Colour.** A proper off-black and off-white (never pure `#000` or `#fff` for large surfaces) plus one accent, used for one job everywhere it appears. Build 5 to 9 shades of each colour rather than relying on opacity. If the brief doesn't specify a colour, don't default to purple, and don't default to the category's cliché colour either. Take it from the concept sentence.

**Contrast.** Measurable, not a matter of taste: WCAG AA is 4.5:1 for body text and 3:1 for text 18px and above (or bold 14px and above). Check text sitting over images too.

**Whitespace.** Give the thing that matters most more room, not less. A page that fills every pixel reads as generated in a hurry.

## Keep It Usable: Guardrails While Beautifying

A prettier product that stops working has failed. Before calling a redesign finished:

- Every interactive element keeps a visible focus state, and touch targets stay at least 44px.
- Contrast holds at WCAG AA for every text/background pair that changed, in every colour mode the product supports.
- **The phone layout is designed, not just the desktop stacked.** No sideways scroll at 320px wide, no text that needs zooming.
- Content is visible without JavaScript; animation is an enhancement, and it respects `prefers-reduced-motion`.
- Loading, empty and error states that existed before still exist after.
- If there's a dark mode, it gets tested as carefully as the light one.
- It still reads well on Windows, where fonts render differently and scrollbars take up space. If you can only check on a Mac, say so in the report.

## The Redesign Workflow

Follow these steps in order.

1. **Read the whole thing.** For a single file: the markup, the `<style>` block, the scripts. For a project: the pages, components, global styles and any Tailwind or theme config. Understand what the product does before touching how it looks.
2. **Write the keep list.** Every page, section, feature, form, piece of real copy, real photo, logo and brand colour that must survive. The keep list is a contract: the redesign has to contain every item on it.
3. **List the slop present,** pointing at specific elements or lines. Say which face(s) from "The Slop Has Moved" it wears.
4. **Decide the direction** (see "Decide From the Product"): the default you're refusing, the concept sentence, the first-screen richness, the tokens. Commit to one direction and apply it everywhere, not section by section.
5. **Write or tidy the content** before the layout (see "Content First").
6. **Strip every decorative emoji** and replace it with the chosen icon method, or cut it.
7. **Rewrite the styles** against the fundamentals: tokens first (colour, type, spacing, radius), then the first screen, then the rest, then states and dark mode.
8. **Check that everything still works.** Every button, form and feature from the original must still exist and behave exactly as before. Nothing in this skill authorises removing features.
9. **Review it as a sceptic, at least twice.** Look at the result at phone width and desktop width. Run the self-check below. Fix what fails, then look again. Stop after a second clean round, or after four rounds at most.
10. **Deliver the result.** For a single file, output the complete revised HTML file, not a diff. For a project, make the changes in place (or as a pull request).
11. **Report in plain language:** the default you refused, the concept sentence, what changed and why, the keep list checked off, and any decisions you're leaving to the owner (renaming, changing the logo, removing a section, changing pricing). Make those changes only with the owner's say-so, never silently.

## Final Self-Check

1. Does it share more than three features with any of the four faces? Keep going.
2. Did you swing into the overcorrection (giant type, mono labels, one rust accent, no images)? Keep going.
3. Does the first screen show evidence, say what it is, and offer the one action, on a phone too?
4. Any purple-to-blue gradient, glow or gradient text? Remove it.
5. Any emoji left in the interface? Replace it or cut it.
6. More than two font families, or fonts chosen without a reason? Fix it.
7. Three identical cards in a row, a stats strip of round numbers, or a pill above the headline? Break the pattern.
8. Boxes inside boxes, or one radius on everything? Use space and a radius rule.
9. Any text failing WCAG AA contrast? Fix it before anything else ships.
10. Is every item on the keep list still there and still working?
11. Cover the logo: could this page belong to any other company in the category? If yes, it isn't done.
