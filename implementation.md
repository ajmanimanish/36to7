# 36to7 — Implementation Plan

## 1. Implementation Strategy

Build the product as a **responsive web application first**.

The implementation should be incremental, but the codebase should be structured for the full product from the beginning.

Recommended delivery principle:

> **Build the simplest complete journey first, then deepen it.**

The first thin slice should allow one user to understand the framework, create a journey, record a reflection and receive a useful structured result.

---

## 2. Phase 0 — Project Foundation

### Objectives

Set up the engineering baseline before product features.

### Tasks

- Create Next.js/React/TypeScript application.
- Configure linting and formatting.
- Create environment variable strategy.
- Set up PostgreSQL.
- Set up migrations.
- Add authentication.
- Add secure session handling.
- Add error reporting.
- Add basic application logging without sensitive text.
- Add automated tests.
- Add CI checks.

### Deliverable

A deployable skeleton with:
- landing page;
- sign-up/sign-in;
- authenticated shell;
- database connectivity;
- protected routes.

---

## 3. Phase 1 — Public Website

### Pages

- Home
- Why 36to7
- The Framework
- 36 Guna
- 7 Vows
- Philosophy
- FAQ
- Privacy
- Terms

### Important copy principles

Keep the wording culturally respectful and intellectually honest.

The core explanation should say that:
- 36to7 is inspired by the traditional Indian Guna Milan framework;
- the product retains the 8 Koota / 36 Guna structure;
- the modern lenses are 36to7's interpretation;
- the product does not use astrology to predict marriage outcomes.

### Deliverable

A polished public site that can be shared independently of the application.

---

## 4. Phase 2 — Account + Profile

### User flow

1. Sign up.
2. Verify email.
3. Create basic profile.
4. Set preferred name.
5. See privacy explanation.
6. Enter the 36to7 framework.

### Privacy UX

At account creation, explain clearly:
- private by default;
- partner sharing is explicit;
- private notes remain private unless shared.

Do not bury this in a legal page only.

---

## 5. Phase 3 — Framework Experience

### Screen sequence

#### Screen A — Welcome

Message:

> **Before you say yes, understand what you're saying yes to.**

Explain the product in a few paragraphs.

#### Screen B — Why 36 Guna

Introduce:
- 8 Kootas;
- 36 Guna;
- practical reinterpretation;
- no prediction/score.

#### Screen C — 36 Guna

Show the complete framework grouped by Koota.

Use expandable cards/sections.

Do not show the 36 items as a questionnaire.

#### Screen D — Start with Yourself

User marks broad areas that matter.

#### Screen E — Importance

User chooses:
- essential;
- important;
- flexible;
- not sure yet.

Do not require completion of all areas.

---

## 6. Phase 4 — First Journey

### Create Journey

Fields:
- person's name;
- how they met (optional);
- relationship context (optional).

Keep this short.

### Journey Home

Primary areas:
- what I understand;
- what is taking shape;
- worth discovering next;
- differences;
- reflections;
- private notes.

The page should feel like a calm journal/dashboard, not a CRM.

---

## 7. Phase 5 — Reflection Experience

### Primary action

> **What stayed with you?**

Large free-text field.

Optional chips:
- learned something;
- surprised;
- something changed;
- still wondering;
- something about me;
- just write.

Optional interaction date.

Optional interaction type.

### Save behaviour

On save:
1. persist raw reflection immediately;
2. enqueue AI analysis;
3. show “Saved” confirmation;
4. allow the user to leave;
5. update analysis asynchronously.

Do not block saving while waiting for the model.

---

## 8. Phase 6 — AI Reflection Processing

### Pipeline

```text
Reflection saved
    ↓
Queue analysis job
    ↓
Load relevant framework context
    ↓
Load recent relevant journey context
    ↓
LLM structured extraction
    ↓
Schema validation
    ↓
Safety/consistency checks
    ↓
Persist ReflectionAnalysis
    ↓
Update JourneyGunaState
    ↓
Create optional notification
```

### Structured analysis requirements

The model should produce:
- likely Guna references;
- what seems clearer;
- what is still emerging;
- meaningful apparent differences;
- self-discovery;
- one or two possible areas worth exploring.

The model should also specify uncertainty where appropriate.

### Important

Do not auto-share any AI interpretation with the partner.

AI output remains private unless the user deliberately shares a specific result.

---

## 9. Phase 7 — Understanding View

For each relevant Guna, present something like:

### Career & Work

**Your view**
Essential

**What you're understanding about them**
Taking shape

**What you've discussed**
They want to continue working after marriage.

**Still worth understanding**
How work and parenting might fit together later.

**Your confidence**
Quite clear

The exact wording should adapt to the available data.

Never fabricate the “their view” layer from inference.

---

## 10. Phase 8 — Partner Invitation

### Entry point

After the user has created a journey and has enough engagement, surface:

> **Would you like to explore this together?**

Actions:
- Invite them;
- Continue on my own.

### Invitation

Send email link to join the journey.

The invitee should see:
- what 36to7 is;
- that the inviter cannot automatically see their private reflections;
- that they control what they share.

### Acceptance

Upon acceptance:
- create/attach partner user account;
- attach partner to journey;
- keep existing private data private;
- enable explicit sharing and shared areas.

---

## 11. Phase 9 — Shared Experience

The first shared experience should be simple.

For a Guna:

### You
Your current view.

### Them
Their current view, only when they choose to share it.

### Together
Shared understanding built from explicit discussion/shared statements.

Use clear visual privacy markers.

---

## 12. Phase 10 — Decision Transition

Provide a calm journey-state control:

> **Where are you in this journey?**

Options:
- getting to know each other;
- seriously considering;
- we've decided to marry;
- taking a pause;
- ended this journey.

When user selects **we've decided to marry**, show the transition message.

Do not imply that 36to7 approved the decision.

---

## 13. Phase 11 — 7 Vows

Display the seven Vows as a visual, expandable set of pointers.

No completion checklist.

For each Vow:
- title;
- short explanation;
- 4–6 thoughtful pointers;
- links to relevant 36 Guna context;
- optional private reflection;
- optional shared reflection.

### Vow 1
“The First Honest Conversation”

### Vow 2
“Meeting the Families”

### Vow 3
“Navigating a Real Disagreement”

### Vow 4
“Sharing a Fear Out Loud”

### Vow 5
“Talking About the Next Ten Years”

### Vow 6
“Weathring a Hard Season”

Correct spelling in production UI: **Weathering a Hard Season**.

### Vow 7
“Choosing Each Other, Plainly”

---

## 14. Phase 12 — Things Worth Pausing On

Create a separate surface, not a Guna score.

### AI categories

- Explore
- Important
- Serious concern
- Safety concern

Every flag should show:
- source context;
- why it was surfaced;
- user dismiss/resolve option;
- suggested next step only where appropriate.

Do not auto-label a person with a diagnosis.

---

## 15. Phase 13 — Settings + Data

Required pages:
- account;
- password/authentication;
- notification preferences;
- privacy;
- sharing overview;
- export data;
- delete account;
- delete relationship journey.

Users should be able to understand where their private content lives.

---

## 16. Frontend Component Plan

Suggested reusable components:

### Marketing
- Hero
- KootaCard
- GunaExplorer
- VowCard
- PhilosophyBlock
- FAQAccordion

### Auth
- AuthForm
- PasswordField
- VerificationState

### App
- AppShell
- JourneySwitcher
- JourneyHeader
- PriorityCard
- GunaCard
- GunaDetail
- ReflectionComposer
- ReflectionCard
- InsightCard
- ExploreNextCard
- UnderstandingCard
- DifferenceCard
- PrivacyBadge
- ShareDialog
- PartnerInviteCard
- VowCard
- VowDetail
- ConcernCard
- EmptyState
- LoadingState

### Accessibility
All interactive elements need:
- keyboard access;
- labels;
- visible focus;
- sufficient contrast;
- screen-reader names;
- reduced-motion support.

---

## 17. Backend Service Boundaries

Keep domain logic separated even if everything initially resides in one Next.js repository.

Suggested services/modules:

```text
/auth
/users
/framework
/journeys
/priorities
/reflections
/analysis
/perspectives
/sharing
/discussions
/vows
/concerns
/notifications
/privacy
/analytics
```

---

## 18. API Contract Principles

Every mutation should:
1. authenticate;
2. authorize;
3. validate input;
4. perform domain action;
5. write audit event if necessary;
6. return safe response.

Never trust a client-provided `user_id`, `journey_id` membership or visibility flag without server authorization.

---

## 19. Testing Strategy

### Unit tests

- priority transitions;
- journey stage transitions;
- sharing rules;
- privacy access checks;
- Guna/Koota relationships;
- AI response schema validation;
- concern severity logic.

### Integration tests

- registration → login;
- create journey → reflect → analysis;
- invite → accept → partner join;
- private note remains private;
- explicit sharing works;
- revoke sharing works;
- journey deletion;
- account deletion.

### E2E tests

At minimum:
1. new user enters framework;
2. sets priorities;
3. creates a journey;
4. creates a reflection;
5. receives analysis;
6. sees Guna state update;
7. invites partner;
8. partner joins;
9. private content stays private;
10. couple reaches “decided to marry”;
11. 7 Vows appear.

---

## 20. Security Checklist

Before launch:

- TLS everywhere;
- secure cookies;
- CSRF protection where applicable;
- rate limiting;
- password hashing through established auth provider/library;
- secure password reset;
- input validation;
- output encoding/sanitization;
- strict authorization tests;
- database backups;
- secret management;
- abuse monitoring;
- deletion workflows tested;
- no sensitive text in normal application logs;
- no relationship content sent to third-party analytics by default.

---

## 21. AI Safety/Quality Checklist

Before enabling AI broadly:

- schema-validate every model response;
- fail safely when model output is malformed;
- do not claim certainty from ambiguous text;
- do not invent a partner's view;
- do not infer medical/genetic diagnoses;
- do not provide relationship commands (“marry them”, “leave them”) as an automatic output;
- allow users to dismiss or correct AI interpretations;
- maintain model/version metadata for debugging;
- redact unnecessary private data where possible.

---

## 22. Deployment

Recommended environments:
- local development;
- staging;
- production.

Use separate:
- databases;
- auth configuration;
- AI keys;
- email configuration;
- storage buckets.

Continuous deployment should run:
- type checks;
- lint;
- unit tests;
- integration tests where practical;
- database migration checks.

---

## 23. Build Order for a Small Team

### Sprint 1
Foundation + public site shell + auth.

### Sprint 2
Framework pages + user priorities + profile.

### Sprint 3
Journey creation + reflection journal.

### Sprint 4
AI analysis + Guna state + “worth discovering.”

### Sprint 5
Partner invite + privacy/share model.

### Sprint 6
Shared journey + differences + concerns.

### Sprint 7
Decision transition + 7 Vows.

### Sprint 8
Polish + security + accessibility + analytics + beta instrumentation.

Exact sprint duration should be adjusted to team size.
