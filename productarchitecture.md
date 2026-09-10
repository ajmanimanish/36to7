# 36to7 — Product Architecture

## 1. Architecture Goals

The system should support a private, longitudinal relationship journey where:

- a user can start alone;
- a partner can be invited later;
- both people can maintain independent views;
- selected content can be shared explicitly;
- the 36 Guna framework remains stable while modern interpretations can evolve;
- AI can organize reflections without becoming the decision-maker;
- the product can support multiple relationship journeys per account;
- sensitive data can be deleted/exported cleanly;
- the application remains simple at the UI layer even when the data model is richer underneath.

Recommended implementation: **responsive web application first**, with a backend/API architecture that can later support native mobile clients.

---

## 2. Recommended Technical Shape

### Frontend

- Next.js + React + TypeScript
- Tailwind CSS or equivalent utility/component styling system
- Accessible component primitives
- Rich text/editor only where necessary; normal text areas for MVP
- Client state kept lightweight; server state retrieved from API/query layer

### Backend

- Next.js server routes/server actions or a dedicated Node backend
- PostgreSQL relational database
- Object storage for optional profile/avatar/media files
- Background job mechanism for AI processing and emails

### Authentication

Use a managed authentication provider or a robust first-party/session implementation supporting:
- email/password;
- magic link;
- Google/Apple login if later desired;
- email verification;
- password reset;
- session/device management.

### AI

Use a server-side LLM abstraction (`src/lib/ai/llm-client.ts`) powered by **Groq** (`llama-3.3-70b-versatile` primary model, with `llama-3.1-8b-instant` rate-limit 429 fallback) using JSON mode (`response_format: { type: "json_object" }`).

AI should operate on the minimum necessary user content and produce structured outputs that are stored separately from raw journal text.

### Email

Transactional email for:
- verification;
- partner invitation;
- invitation accepted;
- account recovery;
- important privacy/security events.

Do not use relationship content for marketing personalization without explicit consent.

---

## 3. Major Domains

```text
Public Site
  ├── Home
  ├── Why 36to7
  ├── The Framework
  ├── 36 Guna
  ├── 7 Vows
  ├── Philosophy / FAQ
  ├── Privacy
  └── Sign in / Sign up

Authenticated App
  ├── Home / Journey Overview
  ├── My Priorities
  ├── 36 Guna Map
  ├── Journey(s)
  │   ├── Overview
  │   ├── Reflections
  │   ├── Understanding
  │   ├── Areas to Explore
  │   ├── Differences
  │   ├── Private Notes
  │   └── Sharing
  ├── Partner Invite / Couple Space
  ├── 7 Vows
  └── Account / Privacy / Data
```

---

## 4. Core Entities

### User

Represents an account owner.

Fields:
- id
- email
- display_name
- avatar_url
- timezone
- locale
- onboarding_state
- created_at
- updated_at

### UserProfile

Personal profile information relevant to the product.

Fields may include:
- user_id
- preferred_name
- broad life context (optional)
- profile_intro (optional)
- relationship_status
- profile_visibility

Avoid collecting unnecessary personal data.

### Journey

Represents a relationship journey with one potential/current life partner.

Fields:
- id
- owner_user_id
- partner_user_id (nullable until invite accepted)
- partner_display_name
- source_type (optional)
- stage
- decision_made_at (nullable)
- created_at
- updated_at

Stages:
- getting_to_know
- seriously_considering
- decided_to_marry
- wedding_preparation
- archived

### FrameworkVersion

Stores a versioned 36 Guna framework so that future taxonomy changes do not break historical user data.

Fields:
- id
- version_number
- label
- description
- published_at
- retired_at

### Koota

Fields:
- id
- framework_version_id
- slug
- name
- traditional_point_value
- order_index
- modern_description

### Guna

Fields:
- id
- koota_id
- number
- slug
- name
- description
- guidance_text
- sensitivity_level
- order_index

### UserGunaPriority

Represents the user's own importance for a Guna.

Fields:
- user_id
- guna_id
- importance
- personal_note
- updated_at

Importance enum:
- essential
- important
- flexible
- unsure

### JourneyGunaState

Represents the relationship journey's current understanding of a Guna.

Fields:
- journey_id
- guna_id
- state
- user_confidence
- last_reflected_at
- ai_summary
- last_updated_at

State enum:
- not_explored
- taking_shape
- understood
- aligned
- different_but_okay
- worth_discussing
- important_unresolved

### PersonPerspective

A structured representation of a person's position on a Guna.

Fields:
- journey_id
- guna_id
- user_id
- perspective_type
- position_text
- importance
- confidence
- source
- visibility
- created_at
- updated_at

Perspective types:
- my_view
- my_understanding_of_them
- their_view
- shared_understanding

### Reflection

A user's free-form journal entry.

Fields:
- id
- journey_id
- author_user_id
- title (optional)
- body
- interaction_date (optional)
- interaction_type (call, message, date, family_meeting, travel, disagreement, other)
- visibility (private/shared)
- created_at
- updated_at

### ReflectionAnalysis

AI-derived structured output.

Fields:
- reflection_id
- framework_version_id
- detected_guna[]
- summary
- clearer_points[]
- emerging_points[]
- differences[]
- self_discoveries[]
- areas_worth_exploring[]
- concern_flags[]
- confidence_by_item[]
- model_metadata
- created_at

### SharedItem

Explicit sharing permission for a reflection, perspective or insight.

Fields:
- id
- journey_id
- owner_user_id
- target_user_id
- object_type
- object_id
- visibility
- shared_at
- revoked_at

### PartnerInvitation

Fields:
- id
- journey_id
- inviter_user_id
- invitee_email
- invitation_token_hash
- status
- expires_at
- accepted_at
- created_at

### Discussion / Conversation

Optional structured chat between users about a selected area.

Fields:
- id
- journey_id
- guna_id (nullable)
- created_by
- created_at

### DiscussionMessage

Fields:
- id
- discussion_id
- author_user_id
- body
- visibility
- created_at

### Vow

Static/versioned product content.

Fields:
- id
- order_index
- title
- subtitle
- description
- guidance
- framework_version_id

### VowReflection

Fields:
- id
- vow_id
- journey_id
- author_user_id
- body
- visibility
- created_at
- updated_at

### ConcernFlag

AI/user-generated concern record.

Fields:
- id
- journey_id
- source_ref
- category
- severity
- text
- status
- created_at

Severity:
- explore
- important
- serious
- safety

### Notification

Fields:
- id
- user_id
- type
- payload
- read_at
- created_at

### AuditEvent

Security/audit trail for important events only.

Examples:
- login;
- password reset;
- invite sent;
- sharing changed;
- export requested;
- deletion requested.

Do not log sensitive journal text into audit logs.

---

## 5. Relationship Between Entities

```text
User
  ├── UserProfile
  ├── UserGunaPriority[]
  ├── Journey[]
  └── VowReflection[]

Journey
  ├── partner User (optional)
  ├── JourneyGunaState[]
  ├── PersonPerspective[]
  ├── Reflection[]
  ├── ReflectionAnalysis[]
  ├── SharedItem[]
  ├── Discussion[]
  ├── ConcernFlag[]
  └── VowReflection[]

FrameworkVersion
  ├── Koota[]
  │     └── Guna[]
  └── Vow[]
```

---

## 6. Privacy Architecture

Privacy must be implemented in the data layer, not just the UI.

### Default

Private content is private by default.

### Sharing

A user explicitly shares an item with a specific partner.

### Revocation

The owner should be able to revoke future access. Historical delivery/copy semantics must be made clear in product policy; revocation does not magically erase information a partner already saw.

### Row-level authorization

Every request for a sensitive object should validate:
- authenticated user;
- relationship membership;
- ownership or explicit sharing permission;
- allowed object operation.

### Data separation

Keep raw private journal content separate from shared summaries wherever practical.

### Deletion

Support account deletion and relationship-journey deletion with explicit confirmation.

### Export

Allow export of the user's own content in a human-readable format and a machine-readable format where practical.

---

## 7. AI Architecture

### Input

AI receives:
- the current reflection;
- relevant prior reflections for the same journey when needed;
- relevant framework definitions;
- the user's own priority information when appropriate;
- explicit sharing rules.

### Output

AI returns structured JSON matching a server-validated schema.

Example:

```json
{
  "guna": [
    {
      "number": 23,
      "state": "taking_shape",
      "summary": "You have started to understand how work may fit into her life.",
      "worth_exploring": "How might work and parenting fit together later?"
    }
  ],
  "self_discovery": [
    "You noticed you had not previously considered your own expectations about career breaks."
  ],
  "concerns": []
}
```

### Guardrails

AI must:
- avoid diagnosis;
- avoid pretending to know the partner's internal state;
- distinguish the user's interpretation from the partner's stated view;
- prefer “you seem to have learned…” over categorical statements where uncertainty exists;
- never calculate or display a marriage-worthiness score;
- never use manipulative language;
- never expose private content to the partner;
- never convert a cultural framework into medical or genetic claims.

### Human-readable output

The AI response should usually contain 1–3 useful observations, not a report.

---

## 8. Canonical Topic Mapping

A real-life topic may map to multiple Guna internally.

Example:

**“Moving abroad”** may map to:
- 22 Life Vision
- 23 Career & Work
- 25 Home & Geography
- 26 Family & Parents
- 27 Children & Parenthood

But the user should not see duplicate tasks/questions.

Use a canonical topic object internally when needed:

```text
Topic
  ├── canonical_name
  ├── primary_guna_id
  └── secondary_guna_ids[]
```

---

## 9. Scoring / Metrics Architecture

Do not implement a user-facing compatibility score in V1.

The system may calculate operational metrics for analytics, such as:
- number of Guna with user priority;
- number of Guna with reflections;
- number of Guna with independent perspectives;
- number of areas marked “worth discussing.”

These are product-state metrics, not relationship-quality scores.

---

## 10. Analytics

Track behaviour that helps validate the product:

- onboarding completion;
- framework exploration;
- priority edits;
- journey created;
- time from journey creation to first reflection;
- number of reflections;
- return frequency;
- Guna surfaced from natural writing;
- AI suggestion accepted/dismissed;
- partner invited;
- partner joined;
- shared item created;
- decision-to-marry stage entered;
- Vow opened/reflected;
- delete/export events.

Avoid capturing sensitive content in analytics events.

---

## 11. Recommended Route Architecture

```text
/
/about
/framework
/framework/36-guna
/framework/7-vows
/philosophy
/faq
/privacy
/terms
/auth/sign-in
/auth/sign-up
/auth/forgot-password

/app
/app/onboarding
/app/home
/app/priorities
/app/guna
/app/guna/[gunaId]
/app/journeys
/app/journeys/new
/app/journeys/[journeyId]
/app/journeys/[journeyId]/reflect
/app/journeys/[journeyId]/understanding
/app/journeys/[journeyId]/explore
/app/journeys/[journeyId]/differences
/app/journeys/[journeyId]/sharing
/app/journeys/[journeyId]/partner
/app/journeys/[journeyId]/vows
/app/journeys/[journeyId]/vows/[vowId]
/app/settings
/app/settings/privacy
/app/settings/account
/app/settings/data
```

---

## 12. Responsive Web Principle

The web application must be fully usable on small screens even though there is no native app in V1.

Design for:
- touch-friendly controls;
- single-column mobile layout;
- sticky primary action where appropriate;
- short sections;
- progressive disclosure;
- keyboard accessibility;
- calm visual hierarchy.

Do not build a desktop-only experience and assume a mobile browser will be enough.
