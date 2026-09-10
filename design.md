# 36to7 — Design.md

## 1. Design Intent

36to7 should feel like a **beautiful, calm, contemporary private space for an important life decision**.

It should feel:

- warm rather than clinical;
- intelligent rather than technical;
- culturally rooted without looking traditionalist or ceremonial;
- premium without looking expensive or flashy;
- intimate without becoming romanticised or childish;
- spacious without feeling empty;
- modern enough for an urban Indian audience, while culturally legible to a much wider Indian audience;
- private and trustworthy at every step.

The product should never look like:

- a matchmaking marketplace;
- a horoscope/astrology website;
- a personality test;
- a medical assessment;
- a CRM;
- a wedding-planning SaaS dashboard;
- a therapy app;
- a gamified questionnaire.

### Core design idea

> **The user's life is the primary experience. 36to7 is the quiet layer that gives it shape.**

The interface should therefore have enough structure to be useful, but enough restraint that users forget they are “using a framework”.

---

# 2. Design North Star

## Before you say yes, understand what you're saying yes to.

The visual language should support four emotional states throughout the product:

1. **Curiosity** — I want to know more.
2. **Clarity** — I understand this better now.
3. **Reflection** — I need a little space to think.
4. **Connection** — I understand us better.

The UI should avoid creating:

- urgency;
- competition;
- fear-based decision pressure;
- completion anxiety;
- “pass/fail” psychology.

There are no streaks, badges, confetti, completion percentages, or compatibility meters in the core experience.

---

# 3. Brand Personality

### Personality keywords

**Warm · Intelligent · Quietly confident · Human · Contemporary · Respectful · Thoughtful · Private · Culturally aware**

### Writing personality

Use:

- plain language;
- short sentences;
- gentle invitations;
- precise wording;
- emotionally intelligent language.

Avoid:

- exaggerated promises;
- spiritual grandstanding;
- pseudo-scientific claims;
- relationship jargon;
- corporate language;
- “unlock your soulmate” language;
- deterministic compatibility claims.

### Preferred vocabulary

| Avoid | Prefer |
|---|---|
| Assessment | Journey / reflection |
| Test | Framework |
| Score | Understanding / picture |
| Evidence | What you've experienced / noticed / learned |
| Risk score | Something worth pausing on |
| Compatibility percentage | Understanding / alignment |
| Complete | Explore / discover |
| Questions to ask | Things worth discovering / conversation pointers |
| Red flag (generic) | Something worth pausing on |
| Partner evaluation | Getting to know them |

---

# 4. Visual Direction

## 4.1 Overall visual concept

Think:

**editorial magazine + premium personal journal + modern Indian design sensibility + quiet digital product**

The interface should have the softness of paper and the precision of a premium digital product.

### Visual qualities

- generous whitespace;
- strong typographic hierarchy;
- soft surfaces;
- subtle borders;
- rounded cards used selectively;
- occasional full-bleed photography;
- restrained iconography;
- delicate motion;
- minimal visual noise.

### Avoid

- overly rounded “startup SaaS” cards everywhere;
- bright gradients;
- neon accent colors;
- cartoon illustrations;
- generic stock couples smiling at each other;
- astrology symbols used literally;
- crowded dashboards;
- excessive glassmorphism;
- decorative mandalas/om symbols used as visual shortcuts.

---

# 5. Colour System

The exact brand palette can evolve, but V1 should use a **warm neutral foundation with one deep editorial accent and a restrained secondary accent**.

## Suggested palette

### Canvas
- Warm Ivory — `#F8F5EF`
- Soft Paper — `#FFFDF9`
- Warm Surface — `#F1ECE4`

### Text
- Ink — `#20201D`
- Muted Ink — `#69665F`
- Quiet Ink — `#929087`

### Primary accent
- Deep Plum — `#4B3344`

### Secondary accent
- Muted Terracotta — `#B86A55`

### Positive / alignment
- Sage — `#617565`

### Attention / unresolved
- Amber — `#B58A45`

### Serious concern
- Brick — `#9B4B48`

### Safety
- Deep Red — `#8A3131`

**Implementation note:** semantic status colours should remain muted and should never dominate the interface.

Do not use colour as the only way to communicate meaning. Always pair with text and/or iconography.

---

# 6. Typography

## Primary typeface

Use a highly readable contemporary grotesk/sans-serif for product UI.

Recommended characteristics:

- excellent small-size readability;
- strong numerals;
- friendly but not playful;
- broad character support for Indian names and future Indic-language content.

Examples of suitable classes of typeface:

- Inter-like modern UI sans;
- Geist-like modern product sans;
- Manrope-like humanist sans.

## Editorial / display typeface

A refined serif may be used sparingly for:

- major landing-page headlines;
- selected Koota/Vow statements;
- pull quotes;
- emotional narrative moments.

Examples of suitable classes:

- Canela-like editorial serif;
- Fraunces-like contemporary serif;
- Cormorant-like expressive serif.

Do not use the serif for dense app UI.

### Type hierarchy

| Token | Size | Weight | Usage |
|---|---:|---:|---|
| Display | 56–72px | 500–600 | Landing hero / key narrative |
| H1 | 40–48px | 600 | Major screen title |
| H2 | 28–34px | 600 | Section title |
| H3 | 20–24px | 600 | Card/section heading |
| Body large | 18px | 400 | Intro/supporting copy |
| Body | 15–17px | 400 | Default UI |
| Small | 13–14px | 400–500 | Metadata/helper text |
| Micro | 11–12px | 500 | Labels/status only |

Use a comfortable line-height, especially for emotionally sensitive copy.

---

# 7. Photography Direction

Photography should communicate **real life together**, not staged romantic perfection.

## Preferred imagery

- two people talking across a café table;
- walking together in a city;
- preparing food together;
- sitting quietly on a train or balcony;
- meeting friends/family;
- travel moments that feel candid;
- everyday domestic scenes;
- hands/objects/places that imply a relationship without always showing faces.

## Cultural representation

Show Indian life without relying on clichés.

Good examples:

- contemporary Indian apartments;
- cafés, streets and homes across Indian cities;
- multi-generational family environments;
- modern Indian clothing mixed naturally with western clothing;
- ordinary social situations;
- urban and smaller-city settings where appropriate.

Avoid using wedding attire on every page. The product is about the journey **before** the wedding and the relationship beyond the ceremony.

## Image treatment

- natural light;
- subtle grain where appropriate;
- editorial crop;
- slightly warm neutral treatment;
- no heavy filters;
- no over-saturated “Instagram” look.

---

# 8. Image Asset Map

The website should have a small, intentional image library rather than dozens of assets.

### Hero image
A wide, cinematic image of two adults in an ordinary, intimate moment of conversation.

### Framework image
An editorial visual representing a map / constellation / interconnected life dimensions without literal astrology.

### Guna imagery
Optional supporting images for selected Kootas only; do not assign a stock image to every Guna.

### Journey imagery
Use occasional real-life images to mark stages of the relationship journey.

### Vows imagery
7 strong editorial images or a smaller shared image system. Each Vow does not need its own photograph if it makes the interface feel repetitive.

### Profile imagery
User-supplied photos only for account/profile use. Never auto-generate partner imagery.

---

# 9. Image Generation / Art Direction Prompts

When custom hero/editorial imagery is generated, use a consistent art direction.

### Prompt family A — Hero

“Contemporary Indian couple in their late 20s or early 30s having a genuine quiet conversation in a modern Indian city setting, candid editorial photography, natural evening light, understated clothing, emotionally warm but not romanticised, authentic body language, cinematic composition, subtle film grain, warm neutral palette, premium magazine photography, no text, no wedding attire.”

### Prompt family B — Framework

“Abstract editorial visual representing eight interconnected dimensions of a life together, elegant Indian-inspired geometry used subtly, contemporary art direction, warm ivory paper texture, deep plum and muted terracotta accents, sophisticated, minimal, no literal horoscope symbols, no text.”

### Prompt family C — Family

“Modern Indian multigenerational family gathering at home, candid documentary photography, natural expressions, contemporary clothing, warm ambient light, realistic Indian home, subtle emotional depth, no wedding stage, no posed catalogue feel.”

### Prompt family D — Future life

“Editorial cinematic scene of a contemporary Indian couple imagining their future together, ordinary home environment, notes/maps/books on a table, natural daylight, sophisticated lifestyle photography, authentic and understated, no wedding clichés.”

Keep generated image identity generic. Do not imply a real person or specific user.

---

# 10. Video Direction

Video should be used **sparingly** and primarily for emotion, explanation and atmosphere.

Do not turn 36to7 into a video-heavy marketing site.

## Video principles

- silent autoplay only for decorative background loops;
- captions and transcript for every meaningful video;
- always provide poster image;
- never require video to understand product functionality;
- keep clips 8–25 seconds where possible;
- avoid stock footage montages;
- use real-life editorial footage where available.

## Recommended public-site videos

### Hero micro-film
8–15 seconds.

A series of quiet moments:

conversation → walk → family interaction → laughter → reflection → two people sitting together.

No dialogue required.

### “How it works” visual story
20–40 seconds.

Show:

**Know yourself → Get to know them → Reflect → Discover → Choose → Grow**

### 7 Vows film
15–30 seconds.

Slowly moving through intimate everyday moments rather than showing literal wedding rituals.

## In-product video

Use only when it genuinely helps. For example:

- a 30–60 second explanation of the 36 Guna framework;
- a short welcome to the 7 Vows.

Never make users watch a video before continuing.

---

# 11. Motion Design

Motion should feel like **breathing**, not entertainment.

## Motion principles

- 150–250ms for standard transitions;
- 250–450ms for larger narrative transitions;
- use ease-out for entering content;
- use subtle fade/translate combinations;
- avoid bounce animations;
- avoid excessive parallax;
- avoid motion on every interaction.

### Examples

- Guna cards expand gently rather than snap open.
- Reflection save state fades from “Saving…” to “Saved”.
- Understanding changes appear as a soft highlight, not a celebratory animation.
- 7 Vows transition with slow editorial movement.

Respect `prefers-reduced-motion`.

---

# 12. Public Website Information Architecture

Top-level navigation:

**36to7**

- Why 36to7
- The 36 Guna
- The 7 Vows
- How it works
- FAQ
- Sign in
- **Start** (primary CTA)

### Public home page structure

#### Hero

**Before you say yes, understand what you're saying yes to.**

Supporting copy + primary CTA + subtle editorial image/video.

#### Cultural foundation

Introduce the 8 Kootas / 36 Guna.

#### The problem

Marriage is not only chemistry. A life together contains many dimensions.

#### The modern framework

Show selected Kootas and examples.

#### How 36to7 works

**Know → Experience → Reflect → Discover**

#### Why it is different

Not matchmaking. Not compatibility scoring. Not a questionnaire.

#### 7 Vows

Introduce them as the next stage after choosing each other.

#### Privacy

Make private-by-default a visible brand promise.

#### CTA

**Start your 36to7 journey.**

---

# 13. App Shell

Once authenticated, the shell should feel very light.

## Desktop

Left navigation or compact top navigation depending on viewport.

Recommended primary navigation:

**Home**

**My 36 Guna**

**My Journey**

**7 Vows** (shown once decision stage is active)

**Account**

The active journey should always be obvious.

## Mobile web

Use a bottom navigation or compact top bar with 4–5 primary destinations.

Recommended:

**Home · Guna · Journey · Vows · More**

Do not duplicate complex desktop navigation.

---

# 14. Home Screen — Daily Experience

The home screen should not look like a task dashboard.

## Top

**Good evening, [Name].**

Then the relationship context:

> **Your journey with [Partner Name]**

### Main card

## **Your understanding is growing.**

A compact visual summary:

**14 understood · 8 taking shape · 5 worth exploring · 3 important differences**

Numbers are allowed here only as navigation/support. They are not a compatibility score.

### Primary action

**What stayed with you?**

### Secondary content

**Worth discovering next**

Show 1–3 items maximum.

### Recent reflection

One short excerpt with date.

### Privacy reminder

Small indicator:

**🔒 Private by default**

---

# 15. 36 Guna Framework Interface

## Framework landing page

Hero:

# **36 Guna**

**36 things worth understanding when two people consider a life together.**

Then 8 Koota cards.

Each card shows:

- Koota name;
- number of Guna;
- one-line modern interpretation;
- progress/understanding state for the current journey where applicable.

### Koota card example

**BHAKOOT**

`7 GUNA`

**The life you build together.**

Career · Money · Home · Family · Children · Culture · Life Vision

**[ Explore ]**

### Guna detail

Large title:

**25 — Home & Geography**

Subheadline:

> Where and how do you imagine living?

Then:

- what this can include;
- what the user currently understands;
- their own priority;
- optional reflection;
- things worth discovering;
- shared state if partner participation exists.

Never show 10+ questions.

---

# 16. “Start With Yourself” Experience

This should be visually calm and progressively disclosed.

### Opening

> **Before getting to know someone, know what matters to you.**

Then show Koota-level cards.

The user selects broad areas.

Selected cards expand into relevant Guna.

### Priority control

Use segmented controls or chips:

**Essential · Important · Flexible · Not sure yet**

Do not use 1–10 sliders in the primary UI.

### Interaction pattern

Tap → card expands → choose importance → optional note → continue.

Avoid long multi-page forms.

---

# 17. Journey Creation

The journey creation screen should feel like opening a journal, not creating a CRM record.

### Heading

**Who are you getting to know?**

Fields:

**Name** — required

**How did you meet?** — optional

**Anything you'd like to remember about how this began?** — optional

Primary CTA:

**Begin this journey**

---

# 18. Journey Overview

### Header

**You + [Name]**

Stage label:

**Getting to know each other**

### Main blocks

#### Your picture

What the user currently understands.

#### Worth discovering

1–3 suggested areas.

#### Differences

Only meaningful/relevant differences.

#### Recent reflections

A quiet chronological feed.

#### Private space

Private notes and personal thoughts.

### Avoid

No red/green “compatibility gauge”.

No giant spider/radar chart.

No 36-cell heatmap unless used very carefully as an optional advanced view.

---

# 19. Reflection Composer

This should be one of the best interfaces in the whole product.

### Heading

# **What stayed with you?**

Large paper-like text area.

Placeholder:

> Something you learned, noticed, felt, wondered about, or want to remember…

Optional chips:

- I learned something
- Something surprised me
- Something changed for me
- I'm still wondering
- Something about me
- Just write

Optional metadata:

- date;
- interaction type.

Primary CTA:

**Save reflection**

### Privacy control

A persistent visible pill:

**🔒 Private**

with explicit sharing control separately.

Do not show AI analysis while the user is typing unless specifically requested.

---

# 20. Reflection Result

After saving, use a quiet transition.

### Title

# **A few things are taking shape**

Then show at most 3–4 cards.

#### Card structure

**Career & Work**

> You have a clearer sense of how they think about continuing their work after marriage.

**Worth understanding**

> How might work change if children become part of your life?

Small link:

**Why am I seeing this?**

This is important for trust. Show the source of the interpretation without exposing chain-of-thought.

Example:

> “This came from your latest reflection.”

---

# 21. Understanding Detail View

For each Guna, use a 3-layer structure.

## Me

**Essential**

> I want to continue working after marriage.

## My understanding of them

**Pretty clear**

> I think they also want to continue working, but may be open to changing pace later.

## What we've learned together

A concise shared summary where applicable.

### Status

**Taking shape**

Possible states:

- Not explored
- Taking shape
- Understood
- Aligned
- Different but okay
- Worth discussing
- Important unresolved

Do not make state changes look like scores.

---

# 22. Difference Presentation

Differences should be visually calm and non-judgmental.

### Example

## **You're imagining this differently.**

**You**
Prefer to remain in India.

**Them**
Interested in living abroad.

Then:

> This may or may not be important. The next useful step is understanding what each of you actually means by it.

Actions:

**Explore this**

**Mark as comfortable difference**

**Keep this private**

No “compatibility failed”.

---

# 23. “Things Worth Pausing On” Interface

This must be visually distinct from normal differences, but not alarmist.

### Explore
Muted amber/neutral treatment.

> You don't have enough understanding yet.

### Important
Stronger amber treatment.

> This matters to you and there is a meaningful unresolved difference.

### Serious concern
Use muted brick/red.

> Some of what you've described may be a serious relationship concern.

### Safety concern
Use clear text and safety-first guidance.

Do not rely on icons or colour alone.

Never label a person with a diagnosis.

---

# 24. Partner Invitation UX

The invitation should come only when appropriate in the journey.

### Heading

# **Would you like to explore this together?**

Copy:

> 36to7 can work on its own, or both of you can bring your own perspective.

Then privacy explanation:

> Your private reflections remain yours unless you choose to share them.

CTA:

**Invite them**

Secondary:

**Continue on my own**

Partner invite should use a simple secure link or email invitation.

---

# 25. Couple View

When both people join, the main visual should change from **“my journey”** to **“our understanding”** without collapsing individuality.

### Header

# **Our 36 Guna**

Supporting line:

> What we understand about each other so far.

Top summary:

**Well understood · Taking shape · Differences we've noticed · Not explored yet**

### Main content

Show 3–5 meaningful items, not all 36.

For each:

**We seem aligned**

or

**We're imagining this differently**

or

**We may want to understand this better**

Private information must never leak into this view.

---

# 26. 7 Vows Interface

7 Vows should visually feel **warmer and more intimate** than the 36 Guna.

The visual transition can use:

- more photography;
- a warmer background;
- slightly more editorial typography;
- larger narrative cards.

### Intro

# **You've chosen each other.**

> Now comes a different kind of journey — preparing to build a life together.

Then seven Vows as large cards.

Each card has:

- number;
- vow title;
- one-line meaning;
- optional image;
- “explore” action.

No completion bars.

No lock icons suggesting “levels”.

---

# 27. Vow Detail Interface

### Example

# **3 — Navigating a Real Disagreement**

**You will not always agree. Learn how you disagree, and how you find your way back.**

Then 4–5 large editorial pointers.

Each pointer is a statement/question-like invitation, not a required task.

Example:

> What happens when one of you needs space and the other wants to talk?

> What does respect look like when you disagree?

> What helps you reconnect?

Then:

**A place to reflect**

Large optional writing area.

Shared/private controls.

### Footer

> You don't have to finish this. Come back whenever it feels relevant.

---

# 28. Decision Transition — “We're Getting Married”

This should be one of the most emotionally polished states in the product.

### Visual treatment

A calm full-screen or modal transition with generous whitespace and a subtle image.

### Copy

# **You've chosen each other.**

> The journey changes now.

> The question is no longer whether. It becomes how you build the life you've chosen together.

CTA:

**Explore the 7 Vows**

Secondary:

**Not now**

The decision should remain editable in account/journey settings.

---

# 29. Account & Privacy UI

Privacy should be visible and beautiful rather than hidden in settings.

## Account sections

**Profile**

**Security**

**Notifications**

**Sharing**

**Your data**

**Delete account**

### Data controls

- export my data;
- delete a reflection;
- delete a journey;
- delete shared information;
- disconnect partner;
- delete account.

### Sharing language

Every shared/private item should have a clear indicator:

**🔒 Private**

**👥 Shared**

**💬 Suggested for discussion**

Do not hide visibility settings behind ambiguous icons alone.

---

# 30. UI Components

Core component library should include:

### Foundations
- Button
- IconButton
- Link
- Badge
- Divider
- Tooltip
- Toast
- Modal
- Drawer
- Dropdown
- Tabs
- SegmentedControl
- Chip

### Content
- KootaCard
- GunaCard
- VowCard
- ReflectionCard
- InsightCard
- DifferenceCard
- ConcernCard
- PrioritySelector
- UnderstandingSelector
- PrivacyPill
- TimelineItem

### Navigation
- AppHeader
- SideNav
- BottomNav
- Breadcrumbs

### Inputs
- TextInput
- TextArea
- SearchInput
- DateInput
- Select
- MultiSelect
- InviteField

Avoid building dozens of specialised components until repeated patterns are proven.

---

# 31. Buttons

Primary button style:

- solid deep accent;
- medium radius, not pill-shaped by default;
- strong readable label.

Secondary:

- soft surface / outline;
- lower visual weight.

Tertiary:

- text link.

### Copy

Prefer:

**Explore the framework**

**Start with yourself**

**Begin this journey**

**Save reflection**

**Explore this**

**Invite them**

**Keep discovering**

Avoid:

**Get started now!!!**

**Complete assessment**

**Check compatibility**

**Generate score**

---

# 32. Cards and Surfaces

Cards should be used to group meaning, not to turn every line of content into a box.

### Default

- subtle border;
- warm surface;
- small to medium radius;
- soft shadow used rarely.

### Editorial card

- image + text;
- larger radius;
- more whitespace;
- strong title.

### Private note card

Use a slightly different paper/surface treatment so users immediately recognise personal content.

---

# 33. Responsive Behaviour

Design desktop-first for the initial website while making every screen responsive.

## Desktop

- max content width: ~1200–1280px;
- editorial sections may use wider image bands;
- two-column layouts for framework/journey detail;
- persistent navigation where useful.

## Tablet

- reduce navigation density;
- preserve typography hierarchy;
- stack content earlier.

## Mobile web

- single-column first;
- large touch targets;
- shorter card copy;
- bottom navigation;
- sticky primary action only when useful;
- reflections should feel excellent on mobile because users may capture thoughts immediately after a call/meeting.

Minimum interactive target: approximately 44×44px.

---

# 34. Accessibility

Target WCAG 2.2 AA where practical.

Requirements:

- keyboard navigation;
- visible focus state;
- semantic headings;
- form labels;
- sufficient contrast;
- reduced-motion support;
- alt text for informative imagery;
- decorative imagery marked appropriately;
- captions/transcripts for meaningful video;
- screen-reader accessible status indicators;
- no colour-only communication.

Privacy controls and share states must be accessible through text, not only icons.

---

# 35. Empty States

Empty states should feel encouraging, not like system errors.

### No reflections yet

> **Your journey hasn't been captured yet.**

> When something stays with you, come back and write it here.

CTA:

**Write your first reflection**

### No partner yet

> **This journey is yours for now.**

> You can invite them when it feels right.

### No differences yet

> **Nothing to compare yet.**

> Keep getting to know each other naturally.

---

# 36. Loading States

Avoid generic spinners wherever possible.

Use skeletons for structural loading.

For AI analysis:

> **Making sense of your reflection…**

Keep this short and understated.

Do not imply the AI is judging the relationship.

---

# 37. Error States

Tone should remain human.

Example:

> **We couldn't finish organising this reflection.**

> Your reflection is safely saved. You can come back and try again.

CTA:

**Try again**

This reassures the user that saving their personal writing and AI processing are separate operations.

---

# 38. Notifications

Notifications must be low-pressure.

Good:

> You saved a reflection yesterday. Want to revisit what you noticed?

> You have something new to explore in your journey.

Avoid:

> You're falling behind.

> Complete your journey today.

> Don't miss your compatibility update!

Allow users to control frequency completely.

---

# 39. Trust Moments

The UI should repeatedly reinforce:

> **Private by default.**

Use small, elegant trust cues at moments of sensitivity:

- intimate reflection;
- health information;
- family issues;
- financial information;
- partner sharing;
- AI analysis.

### Example

**🔒 This stays private unless you choose to share it.**

Keep this language consistent throughout the product.

---

# 40. AI Transparency in UI

When AI produces an insight, use subtle transparency.

Example:

### **You may want to understand this better**

> You both seem interested in continuing your careers, but you may be imagining the next stage differently.

Small disclosure:

> **Based on your reflections from the last 3 conversations.**

Actions:

**This feels right**

**Not quite**

**Edit my understanding**

The user must be able to correct the AI.

Never make the AI's interpretation authoritative.

---

# 41. Design for User Agency

Every major insight should preserve agency.

Examples:

Instead of:

> “You are incompatible on children.”

Use:

> “Children are essential to you. Their position currently seems less certain.”

Instead of:

> “Your partner has poor family boundaries.”

Use:

> “You may have different expectations about family involvement.”

Instead of:

> “Conflict is a red flag.”

Use:

> “You may be learning something important about how you handle disagreement.”

---

# 42. Design for Cultural Respect

The website should make users feel that the product **understands the cultural meaning of marriage in India**, without becoming a traditionalist product.

### Use

- Koota names;
- Guna terminology;
- subtle Indian visual references;
- modern Indian family/life imagery;
- wedding symbolism only at the appropriate stage;
- clear distinction between historical framework and 36to7 interpretation.

### Avoid

- treating astrology as scientific truth;
- assigning contemporary meanings to ancient terminology without saying they are modern interpretations;
- using caste/status meanings associated with historical Varna classification;
- making Nadi into a genetic diagnosis;
- using religious symbolism as a proxy for compatibility.

---

# 43. Design for Sensitive Topics

Some topics are more intimate than others.

Use progressive disclosure for:

- sex/intimacy;
- fertility/reproductive health;
- mental health;
- financial issues;
- family conflict;
- trauma/fear;
- caregiving;
- substance use.

Do not put these topics into visually sensational cards.

Use neutral, respectful headings and clear privacy cues.

---

# 44. Design Tokens / Engineering

Centralise design tokens so the visual system can evolve without rewriting components.

Recommended token groups:

```text
color.*
type.*
space.*
radius.*
shadow.*
motion.*
breakpoint.*
zindex.*
```

Example spacing scale:

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128`

Use a 4/8px rhythm throughout.

---

# 45. Design-to-Code Rules

1. Every screen should have one obvious primary action.
2. Every page should have a clear visual hierarchy.
3. Do not put more than 3–5 important items above the fold unless the screen is specifically a framework overview.
4. Use progressive disclosure instead of long forms.
5. Keep technical status information secondary to human meaning.
6. Keep privacy state visible.
7. Preserve user's exact language where possible in reflections.
8. Do not over-animate.
9. Do not use charts unless they actually help understanding.
10. All design components must work in keyboard, screen-reader and touch contexts.

---

# 46. Visual QA Checklist

Before shipping any page, verify:

### Brand
- Does it feel like 36to7 rather than generic SaaS?
- Is the cultural connection present but subtle?
- Is the interface warm and premium?

### UX
- Is there one clear next action?
- Is the user being asked to do unnecessary work?
- Could this be explained in fewer words?
- Does the user understand whether something is private or shared?

### Framework
- Is the 36 Guna a map rather than a checklist?
- Is the 7 Vows a set of pointers rather than tasks?
- Is the user's judgment preserved?

### AI
- Is the AI organizing rather than judging?
- Can the user correct it?
- Does it clearly indicate what source of reflection it used?

### Mobile
- Does the reflection experience work one-handed?
- Are touch targets large enough?
- Does the typography remain comfortable?

### Accessibility
- Is colour supplemented by text?
- Is focus visible?
- Are images and videos accessible?

---

# 47. Recommended Design System Structure

```text
/design-system
  /tokens
    colors
    typography
    spacing
    motion
    breakpoints
  /foundations
    typography
    icons
    surfaces
  /components
    buttons
    inputs
    cards
    navigation
    privacy
    status
  /patterns
    onboarding
    framework
    reflection
    journey
    difference
    partner-sharing
    vows
  /templates
    public-page
    app-page
    detail-page
```

The design system should be implemented as reusable components in the web application, not only documented in Figma.

---

# 48. Figma / Design File Organisation

Recommended pages:

1. **Cover / Principles**
2. **Brand**
3. **Foundations**
4. **Components**
5. **Public Website**
6. **Onboarding**
7. **36 Guna**
8. **Journey**
9. **Reflections**
10. **Partner / Couple**
11. **7 Vows**
12. **Account / Privacy**
13. **Responsive**
14. **Prototype**
15. **Design QA**

Prototype links should cover the full primary journey:

**Landing → Framework → Start with yourself → Create journey → Reflection → Insight → Partner invitation → Decision → 7 Vows**

---

# 49. V1 Design Scope

The first website release should prioritise visual quality in these areas:

### Must feel exceptional

- Landing page
- 36 Guna framework
- Start with yourself
- Journey home
- Reflection composer
- AI reflection result
- Privacy/sharing
- 7 Vows

### Can remain simple

- Account settings
- Admin surfaces
- Advanced analytics
- Data export UI
- Notification preferences

Do not spend early design effort on dashboards that users rarely need.

---

# 50. Final Design Principle

The strongest version of 36to7 will not feel like software that is trying to manage a relationship.

It should feel like a **beautiful space people return to when something in their relationship matters enough to pause and understand.**

The product should quietly help the user move from:

> **“I met someone.”**

To:

> **“I understand myself better.”**

To:

> **“I understand them better.”**

To:

> **“I understand us better.”**

To:

> **“We have chosen each other.”**

And then:

> **“Now let's grow into the life we've chosen.”**

That is the visual, interaction and emotional arc the entire design system should reinforce.
