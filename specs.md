# 36to7 — Product & Technical Specifications

## 1. Product Requirements

### PR-001 — Public product explanation

The website must explain 36to7 before requiring sign-up.

Acceptance criteria:
- cultural connection is clear;
- 8 Kootas / 36 Guna structure is visible;
- modern interpretation is clearly identified as 36to7's own;
- product is explicitly not a matchmaking app or compatibility test;
- product is framed as a framework that supports user judgment.

### PR-002 — User account

Users must be able to:
- create an account;
- sign in;
- sign out;
- reset credentials;
- manage profile information.

### PR-003 — Personal priorities

Users can progressively identify what matters to them.

Each priority supports:
- Essential;
- Important;
- Flexible;
- Not sure yet.

Users can edit priorities at any time.

### PR-004 — Framework browsing

Users can browse:
- all 8 Kootas;
- all 36 Guna;
- each Guna's modern description.

The experience must not require completion.

### PR-005 — Journey creation

A user can create a relationship journey for another person.

Minimum required field:
- display name.

Optional:
- meeting source;
- description.

### PR-006 — Reflection journal

A user can create free-form reflections linked to a journey.

Required:
- body.

Optional:
- date;
- interaction type;
- title.

Visibility defaults to private.

### PR-007 — AI organization

The system can analyze a reflection and identify relevant Guna areas.

The analysis must distinguish between:
- what the user learned;
- what seems to be changing;
- what remains uncertain;
- what may be worth exploring.

### PR-008 — Understanding state

A Guna may transition through user-facing states:
- Not explored;
- Taking shape;
- Understood;
- Aligned;
- Different but okay;
- Worth discussing;
- Important unresolved.

State transitions must be editable and not permanently locked by AI.

### PR-009 — Partner invitation

A journey owner can invite another person.

The invitee can:
- create an account;
- join the journey;
- maintain private notes;
- explicitly share selected items.

### PR-010 — Privacy

Private content must not be visible to the partner unless explicitly shared.

The system must clearly label private/shared states in the UI.

### PR-011 — Differences

The product may summarize apparent differences.

A difference must not automatically imply incompatibility.

### PR-012 — Things Worth Pausing On

The product can surface concerns separately from Guna.

Severity:
- Explore;
- Important;
- Serious concern;
- Safety concern.

### PR-013 — Decision stage

Users can explicitly set a journey to:

> We have decided to marry.

This unlocks access to the 7 Vows.

### PR-014 — 7 Vows

Users can browse all seven Vows.

Each Vow supports:
- description;
- pointers;
- optional private reflection;
- optional shared reflection;
- relevant Guna references.

No completion requirement.

### PR-015 — Data controls

Users can:
- export their data;
- delete a journey;
- delete their account;
- manage sharing.

---

## 2. Functional Specifications

### 2.1 Onboarding

#### State 1

Show product proposition.

#### State 2

Show 8 Kootas / 36 Guna.

#### State 3

User selects important broad areas.

#### State 4

User can classify priorities.

#### State 5

User sees starting picture.

#### State 6

User creates first journey or exits to dashboard.

Onboarding can be resumed later.

---

### 2.2 Priorities

Priority change rules:

- any Guna can be set to one of four priority states;
- changing a priority never deletes past reflections;
- changing priority should update future surfaced recommendations;
- history may be stored for analytics/history, but the user-facing product should not shame changes.

---

### 2.3 Journey Dashboard

Required sections:

**Your journey**

- understanding snapshot;
- recent reflections;
- areas taking shape;
- things worth discovering;
- important differences;
- concerns if any.

**Primary action**

> What stayed with you?

Secondary actions:
- view 36 Guna;
- view understanding;
- invite partner (where appropriate);
- update journey stage.

---

### 2.4 Reflection Composer

Fields:

```text
Reflection body [required]
Interaction date [optional]
Interaction type [optional]
Visibility [private by default]
```

Optional prompt chips should not change the underlying structure.

Autosave draft is recommended.

When saved:
- show immediate save confirmation;
- queue analysis asynchronously.

---

### 2.5 Reflection Analysis

The AI should return a validated object matching the following conceptual schema:

```typescript
interface ReflectionAnalysis {
  guna: Array<{
    gunaNumber: number;
    state: JourneyGunaState;
    summary: string;
    worthExploring?: string;
    confidence?: 'low' | 'medium' | 'high';
  }>;
  clearer: string[];
  emerging: string[];
  differences: string[];
  selfDiscoveries: string[];
  concerns: Array<{
    severity: 'explore' | 'important' | 'serious' | 'safety';
    text: string;
  }>;
}
```

The backend must reject malformed responses.

---

### 2.6 Understanding Screen

For each relevant Guna:

```text
Guna title
Short meaning

My view
My importance

My understanding of them
Confidence

Their view [only when shared]

What we've understood together [only from explicit shared/confirmed content]

What may be worth understanding next
```

The UI should omit empty sections rather than display placeholders everywhere.

---

### 2.7 Partner Flow

#### Invite

- email input;
- privacy explanation;
- send invite;
- show pending status.

#### Accept

- open invitation;
- sign in/sign up;
- read privacy explanation;
- accept invitation.

#### Post-accept

Each person gets independent private state.

Shared content only appears after explicit sharing.

---

### 2.8 7 Vows

Vow content is static/configurable product content, not AI-generated by default.

Each Vow page should include:

- title;
- short emotional framing;
- 4–6 pointers;
- connected Guna areas;
- private reflection;
- shared reflection;
- “keep this in mind” option.

No progress bar is required.

A simple visual indicator can show whether the user has visited/reflected, but it must not imply required completion.

---

## 3. Non-Functional Requirements

### NFR-001 — Privacy

Private relationship content must be protected at every layer.

### NFR-002 — Performance

Marketing pages should load quickly.

Authenticated pages should avoid unnecessary full-page reloads.

AI analysis should not block reflection saving.

### NFR-003 — Accessibility

Target WCAG AA-level accessibility practices.

### NFR-004 — Mobile web

All core journeys must work on current mobile browsers even without a native application.

### NFR-005 — Reliability

A failed AI job must not lose user content.

### NFR-006 — Auditability

Important security and sharing actions should be auditable without storing sensitive text in audit logs.

### NFR-007 — Observability

Monitor:
- request errors;
- AI failures;
- queue failures;
- auth failures;
- latency.

---

## 4. Data Model Specification

### users

```sql
id uuid primary key
email text unique not null
display_name text
avatar_url text
timezone text
locale text
created_at timestamptz not null
updated_at timestamptz not null
```

### journeys

```sql
id uuid primary key
owner_user_id uuid not null references users(id)
partner_user_id uuid references users(id)
partner_display_name text not null
source_type text
stage text not null
 decision_made_at timestamptz
created_at timestamptz not null
updated_at timestamptz not null
```

Production schema must remove accidental whitespace before `decision_made_at`; shown here only as a readable field list.

### framework_versions

```sql
id uuid primary key
version_number integer unique not null
label text not null
description text
published_at timestamptz
retired_at timestamptz
```

### kootas

```sql
id uuid primary key
framework_version_id uuid not null references framework_versions(id)
slug text not null
name text not null
traditional_point_value integer not null
order_index integer not null
modern_description text
```

### gunas

```sql
id uuid primary key
koota_id uuid not null references kootas(id)
number integer not null
slug text not null
name text not null
description text
guidance_text text
sensitivity_level text
order_index integer not null
```

### user_guna_priorities

```sql
user_id uuid not null references users(id)
guna_id uuid not null references gunas(id)
importance text not null
personal_note text
updated_at timestamptz not null
primary key (user_id, guna_id)
```

### reflections

```sql
id uuid primary key
journey_id uuid not null references journeys(id)
author_user_id uuid not null references users(id)
title text
body text not null
interaction_date date
interaction_type text
visibility text not null default 'private'
created_at timestamptz not null
updated_at timestamptz not null
```

### journey_guna_states

```sql
journey_id uuid not null references journeys(id)
guna_id uuid not null references gunas(id)
state text not null
user_confidence text
ai_summary text
last_reflected_at timestamptz
updated_at timestamptz not null
primary key (journey_id, guna_id)
```

### partner_invitations

```sql
id uuid primary key
journey_id uuid not null references journeys(id)
inviter_user_id uuid not null references users(id)
invitee_email text not null
invitation_token_hash text not null
status text not null
expires_at timestamptz not null
accepted_at timestamptz
created_at timestamptz not null
```

---

## 5. API Specifications

### Authentication

```text
POST /api/auth/sign-up
POST /api/auth/sign-in
POST /api/auth/sign-out
POST /api/auth/reset
```

### Framework

```text
GET /api/framework
GET /api/framework/kootas
GET /api/framework/guna/:number
GET /api/framework/vows
```

### Priorities

```text
GET /api/me/priorities
PUT /api/me/priorities/:gunaId
```

### Journeys

```text
GET /api/journeys
POST /api/journeys
GET /api/journeys/:id
PATCH /api/journeys/:id
DELETE /api/journeys/:id
```

### Reflections

```text
GET /api/journeys/:id/reflections
POST /api/journeys/:id/reflections
GET /api/reflections/:id
PATCH /api/reflections/:id
DELETE /api/reflections/:id
```

### Analysis

```text
POST /api/reflections/:id/analyze
GET /api/reflections/:id/analysis
```

Analysis execution should normally be asynchronous.

### Understanding

```text
GET /api/journeys/:id/understanding
PATCH /api/journeys/:id/guna/:gunaId
```

### Partner

```text
POST /api/journeys/:id/invitations
GET /api/invitations/:token
POST /api/invitations/:token/accept
```

### Sharing

```text
GET /api/journeys/:id/sharing
POST /api/journeys/:id/sharing
DELETE /api/journeys/:id/sharing/:shareId
```

### Vows

```text
GET /api/journeys/:id/vows
GET /api/journeys/:id/vows/:vowId
POST /api/journeys/:id/vows/:vowId/reflections
```

---

## 6. Privacy & Authorization Rules

### Rule 1
A user can always read/write their own private reflections.

### Rule 2
A partner cannot read another person's private reflections.

### Rule 3
A shared item is readable only by the intended journey member(s).

### Rule 4
AI analysis of private text inherits the privacy of the source object.

### Rule 5
Deleting a reflection removes its derived analysis where policy requires it.

### Rule 6
Partner invites never grant retroactive access to private content.

### Rule 7
Changing a journey stage does not alter privacy rules.

---

## 7. UX Content Specifications

### Core recurring language

Prefer:
- understand;
- discover;
- notice;
- learn;
- taking shape;
- worth understanding;
- worth exploring;
- difference;
- aligned;
- different but okay;
- private;
- shared.

Avoid:
- evidence;
- pass/fail;
- compatibility percentage;
- prediction;
- test;
- score as a marriage verdict;
- diagnose;
- “you should marry them.”

### Empty states

Good:

> **Nothing here yet.**
> Your relationship is still unfolding. Come back when there is something you want to remember.

Bad:

> Complete your next task.

---

## 8. Analytics Event Specification

Event names should avoid sensitive payloads.

Examples:

```text
landing_viewed
framework_viewed
guna_viewed
priority_set
journey_created
reflection_saved
reflection_analysis_completed
insight_opened
insight_dismissed
partner_invite_sent
partner_joined
item_shared
item_unshared
journey_stage_changed
vow_viewed
vow_reflection_saved
export_requested
account_deleted
```

Do not send raw reflection bodies, intimate details, family-conflict details or health details to analytics systems.

---

## 9. AI Prompt Specification & Provider Details

**LLM Provider**: Groq API (`GROQ_API_KEY`)
- Primary Model: `llama-3.3-70b-versatile` with JSON mode (`response_format: { type: "json_object" }`).
- Rate Limit Fallback: On HTTP 429 rate limit errors, retries once on `llama-3.1-8b-instant`.

System-level instruction should establish:

1. You are organizing the user's reflection, not judging the relationship.
2. Use only information available in the provided context.
3. Distinguish what the user says, what the user believes about the partner, and what the partner explicitly said.
4. Treat uncertainty as uncertainty.
5. Do not invent motives or diagnoses.
6. Do not calculate marriage compatibility or recommend marriage/divorce.
7. Surface at most a few useful insights.
8. Use warm, respectful language.
9. The modern Guna meanings are 36to7's interpretation, not ancient claims.
10. Never expose private text to another user.

---

## 10. Definition of Done — V1

V1 is ready for controlled beta when:

- public site is live;
- authentication is reliable;
- user can create a profile;
- framework is browseable;
- priorities work;
- journey creation works;
- reflections persist reliably;
- AI analysis works asynchronously;
- Guna states update safely;
- partner invite works;
- private/shared controls are tested;
- 7 Vows become available at the correct stage;
- account/data deletion works;
- basic analytics are implemented;
- accessibility basics are covered;
- security review is completed;
- there is a feedback mechanism in the product.

---

## 11. Future-Compatible, Not V1

The architecture should leave room for, but not require:

- native iOS/Android apps;
- PWA installability;
- voice/journal capture;
- relationship timeline;
- deeper couple discussions;
- calendar-aware experiences;
- richer AI memory;
- expert-reviewed guidance;
- optional post-marriage journey;
- clinician-reviewed health exploration where appropriate;
- anonymized aggregate research only with strong consent/governance.

These are intentionally not V1 commitments.
