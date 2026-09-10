export interface KootaDefinition {
  slug: string;
  name: string;
  points: number;
  order: number;
  oneLiner: string;
  was: string;
  now: string;
  description: string;
}

export interface GunaDefinition {
  number: number;
  slug: string;
  kootaSlug: string;
  name: string;
  description: string;
  guidance: string;
  sensitivity: 'standard' | 'sensitive' | 'intimate';
  was: string;
  now: string;
}

export interface VowDefinition {
  orderIndex: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  was: string;
  now: string;
  guidance: string[];
  connectedGunaNumbers: number[];
}

export const KOOTAS: KootaDefinition[] = [
  {
    slug: 'varna',
    name: 'Varna',
    points: 1,
    order: 1,
    oneLiner: 'Shared orientation & life values',
    was: 'traditional spiritual classification',
    now: 'whether your core values and sense of purpose point in the same direction',
    description: 'What gives your life meaning and what kind of person do you want to become?',
  },
  {
    slug: 'vashya',
    name: 'Vashya',
    points: 2,
    order: 2,
    oneLiner: 'Power balance & decision-making',
    was: 'dominance & control calculation',
    now: 'whether decision-making feels fair and balanced to both',
    description: 'How will two independent people make important decisions together?',
  },
  {
    slug: 'tara',
    name: 'Tara',
    points: 3,
    order: 3,
    oneLiner: 'Emotional support & resilience',
    was: "destiny's favor and luck",
    now: 'the emotional steadiness and support you actively build together',
    description: 'How do you respond to pressure, uncertainty, and unexpected setbacks?',
  },
  {
    slug: 'yoni',
    name: 'Yoni',
    points: 4,
    order: 4,
    oneLiner: 'Physical closeness & intimacy',
    was: 'animal-sign compatibility omen',
    now: 'how physical closeness and intimacy actually feel to both of you',
    description: 'How do you experience affection, touch, boundaries, and sexual communication?',
  },
  {
    slug: 'grahamaitri',
    name: 'Graha Maitri',
    points: 5,
    order: 5,
    oneLiner: 'Friendship & communication',
    was: 'planetary friendship',
    now: 'do you genuinely enjoy talking to each other as friends',
    description: 'Do you enjoy being together beyond romantic or ceremonial obligations?',
  },
  {
    slug: 'gana',
    name: 'Gana',
    points: 6,
    order: 6,
    oneLiner: 'Temperament & daily rhythm',
    was: 'cosmic temperament classification',
    now: 'how you each move through a hard day and handle disagreement',
    description: 'How do routines, schedules, social energy, and conflict habits fit together?',
  },
  {
    slug: 'bhakoot',
    name: 'Bhakoot',
    points: 7,
    order: 7,
    oneLiner: 'Life vision & practical life',
    was: 'predicted family fortune',
    now: 'what life you are building together and with what tools',
    description: 'Career, money, geography, parents, children, and long-term life vision.',
  },
  {
    slug: 'nadi',
    name: 'Nadi',
    points: 8,
    order: 8,
    oneLiner: 'Health pace & lifelong care',
    was: 'bloodline & genetic omen',
    now: 'energy levels, health habits, and supporting each other through life',
    description: 'Health transparency, hereditary context, caregiving, and sustainable living.',
  },
];

export const GUNAS: GunaDefinition[] = [
  // VARNA
  { number: 1, slug: 'core-values-direction', kootaSlug: 'varna', name: 'Core Values & Life Orientation', description: 'What gives your life meaning and what kind of person do you want to become?', guidance: 'Explore ambition, spirituality, individuality, ethics, personal growth, and traditional vs modern outlooks.', sensitivity: 'standard', was: 'birth-star spiritual orientation', now: 'whether your core values and sense of purpose point in the same direction' },
  // VASHYA
  { number: 2, slug: 'independence-space', kootaSlug: 'vashya', name: 'Independence & Personal Space', description: 'How much freedom, privacy, and individuality does each person need?', guidance: 'Discuss personal time, solitary hobbies, friendships outside the relationship, and boundaries.', sensitivity: 'standard', was: 'control & submission', now: 'balancing personal autonomy with togetherness' },
  { number: 3, slug: 'influence-decision-making', kootaSlug: 'vashya', name: 'Influence & Decision-Making', description: 'How will two independent people make important decisions together?', guidance: 'Examine who leads decisions on finances, relocation, career shifts, and family obligations.', sensitivity: 'standard', was: 'dominance ranking', now: 'equal voice and collaborative choice' },
  // TARA
  { number: 4, slug: 'emotional-support', kootaSlug: 'tara', name: 'Emotional Support', description: 'How do you want to be supported, understood, and comforted when vulnerable?', guidance: 'Consider how each partner offers reassurance during self-doubt, grief, or exhaustion.', sensitivity: 'standard', was: 'star sign luck', now: 'presence and empathy in difficult moments' },
  { number: 5, slug: 'stress-resilience', kootaSlug: 'tara', name: 'Stress & Resilience', description: 'How do you respond to pressure, uncertainty, and unexpected setbacks?', guidance: 'Look at coping mechanisms: shutting down, over-analyzing, seeking space, or acting quickly.', sensitivity: 'standard', was: 'misfortune predictor', now: 'building a calm, dependable floor together under stress' },
  { number: 6, slug: 'wellbeing-self-care', kootaSlug: 'tara', name: 'Wellbeing & Self-Care', description: 'How do you look after yourselves and support each other’s physical & mental health?', guidance: 'Discuss rest habits, mental health awareness, exercise, therapy openness, and wellness routines.', sensitivity: 'standard', was: 'auspicious planetary placement', now: 'mutual care and sustaining individual mental & physical health' },
  // YONI
  { number: 7, slug: 'affection-touch', kootaSlug: 'yoni', name: 'Affection & Touch', description: 'How do you experience and communicate non-sexual physical affection and closeness?', guidance: 'Explore comfort with public displays of affection, hugs, holding hands, and quiet physical presence.', sensitivity: 'sensitive', was: 'animal instinct matching', now: 'everyday warmth and physical love languages' },
  { number: 8, slug: 'sexual-desire-expectations', kootaSlug: 'yoni', name: 'Sexual Desire & Expectations', description: 'What place does sexual intimacy have in your relationship and what expectations do you carry?', guidance: 'Reflect on frequency, emotional intimacy link, curiosity, and pace of physical connection.', sensitivity: 'intimate', was: 'sexual omen calculation', now: 'open alignment on physical intimacy expectations' },
  { number: 9, slug: 'sexual-communication-boundaries', kootaSlug: 'yoni', name: 'Sexual Communication & Boundaries', description: 'How comfortably can you talk about intimacy, preferences, boundaries, and consent?', guidance: 'Check ease of discussing discomfort, trying new things, saying no gracefully, and mutual respect.', sensitivity: 'intimate', was: 'fixed instinct compatibility', now: 'psychological safety to talk about intimate needs' },
  { number: 10, slug: 'reproductive-intimate-health', kootaSlug: 'yoni', name: 'Reproductive & Intimate Health', description: 'What should each person understand about intimate health, contraception, and expectations?', guidance: 'Address health awareness, openness regarding fertility expectations, and intimate hygiene.', sensitivity: 'intimate', was: 'omen of fertility', now: 'mature disclosure and understanding of intimate health' },
  // GRAHA MAITRI
  { number: 11, slug: 'friendship-companionship', kootaSlug: 'grahamaitri', name: 'Friendship & Companionship', description: 'Do you genuinely enjoy being together beyond romantic or ceremonial obligations?', guidance: 'Notice whether you laugh together, enjoy ordinary downtime, and genuinely like each other as friends.', sensitivity: 'standard', was: 'planetary friendship', now: 'authentic friendship and companionship' },
  { number: 12, slug: 'communication', kootaSlug: 'grahamaitri', name: 'Communication', description: 'How do you express yourselves, articulate thoughts, and listen to each other?', guidance: 'Evaluate depth of conversation, listening habits, patience, and non-verbal understanding.', sensitivity: 'standard', was: 'mental alignment score', now: 'how freely and clearly you exchange ideas and feelings' },
  { number: 13, slug: 'emotional-connection', kootaSlug: 'grahamaitri', name: 'Emotional Connection', description: 'How do you experience closeness, warmth, and emotional intimacy in conversation?', guidance: 'Notice if you feel heard, if conversations leave you energized, and if vulnerability is welcomed.', sensitivity: 'standard', was: 'celestial affinity', now: 'genuine emotional resonance and safety' },
  { number: 14, slug: 'trust-reliability', kootaSlug: 'grahamaitri', name: 'Trust & Reliability', description: 'Can you depend on each other, and do words and actions consistently align?', guidance: 'Assess follow-through on commitments, honesty about small things, and confidence in promises.', sensitivity: 'standard', was: 'loyalty omen', now: 'steady reliability and alignment between words and actions' },
  { number: 15, slug: 'shared-enjoyment', kootaSlug: 'grahamaitri', name: 'Shared Enjoyment', description: 'What makes ordinary life enjoyable together when no special event is planned?', guidance: 'Look at shared humor, simple weekend routines, meals, quiet evenings, and casual activities.', sensitivity: 'standard', was: 'mutual pleasure chart', now: 'finding joy in mundane, unscripted everyday moments' },
  // GANA
  { number: 16, slug: 'temperament', kootaSlug: 'gana', name: 'Temperament', description: 'How are you naturally wired in terms of pace, emotional intensity, and reaction speed?', guidance: 'Understand introversion vs extroversion, quick-tempered vs calm, and emotional processing speed.', sensitivity: 'standard', was: 'cosmic temperament class', now: 'understanding natural personality wiring without judgment' },
  { number: 17, slug: 'everyday-rhythm', kootaSlug: 'gana', name: 'Everyday Rhythm', description: 'How do routines, schedules, punctuality, and daily habits fit together?', guidance: 'Examine sleep schedules, weekend planning, meal times, tidiness, and structure vs spontaneity.', sensitivity: 'standard', was: 'daily routine clash', now: 'meshing different daily paces and living habits' },
  { number: 18, slug: 'social-energy', kootaSlug: 'gana', name: 'Social Energy', description: 'How much people, socializing, hosting, and community does each person want around them?', guidance: 'Discuss frequency of social gatherings, hosting family/friends at home, and quiet downtime needs.', sensitivity: 'standard', was: 'social caste standing', now: 'balancing social appetite and quiet home life' },
  { number: 19, slug: 'lifestyle-interests', kootaSlug: 'gana', name: 'Lifestyle & Interests', description: 'How do you like to spend life: travel, food, music, sports, hobbies, pets, and entertainment?', guidance: 'Explore overlap in leisure, willingness to try each other’s interests, and respecting differences.', sensitivity: 'standard', was: 'habit compatibility formula', now: 'discovering shared passions while honoring individual hobbies' },
  { number: 20, slug: 'conflict-behaviour', kootaSlug: 'gana', name: 'Conflict Behaviour', description: 'What happens when you disagree: how do you express frustration and find resolution?', guidance: 'Notice tendencies to withdraw, argue immediately, raise voices, or seek immediate repair.', sensitivity: 'sensitive', was: 'hostility prediction', now: 'how you navigate disagreement with respect and find your way back' },
  { number: 21, slug: 'adaptability-difference', kootaSlug: 'gana', name: 'Adaptability & Difference', description: 'How comfortably can you live with differences, surprises, and changing circumstances?', guidance: 'Reflect on flexibility when plans fall apart, tolerance for imperfections, and compromise.', sensitivity: 'standard', was: 'stubbornness calculation', now: 'mutual adaptability and grace in the face of difference' },
  // BHAKOOT
  { number: 22, slug: 'life-vision', kootaSlug: 'bhakoot', name: 'Life Vision', description: 'What kind of life, purpose, and legacy are you each trying to build in the long run?', guidance: 'Explore overarching goals, definition of success, risk appetite, and 10-year aspirations.', sensitivity: 'standard', was: 'family fortune omen', now: 'whether your long-term life trajectories point toward a shared horizon' },
  { number: 23, slug: 'career-work', kootaSlug: 'bhakoot', name: 'Career & Work', description: 'What role will work, ambition, relocation, and career play in your lives?', guidance: 'Discuss dual-career balance, working hours, relocations, career breaks, and support for ambition.', sensitivity: 'standard', was: 'economic prosperity predictor', now: 'supporting each other’s professional life and balance' },
  { number: 24, slug: 'money-financial-life', kootaSlug: 'bhakoot', name: 'Money & Financial Life', description: 'How do you think about earning, spending, saving, investing, independence, and joint accounts?', guidance: 'Unpack financial transparency, debt attitudes, luxury vs frugal choices, and helping extended family.', sensitivity: 'sensitive', was: 'wealth compatibility formula', now: 'alignment on money habits, transparency, and financial values' },
  { number: 25, slug: 'home-geography', kootaSlug: 'bhakoot', name: 'Home & Geography', description: 'Where and how do you imagine living: city, neighborhood, living with/near parents, house style?', guidance: 'Discuss mobility, living arrangements, urban vs quiet towns, and international moves.', sensitivity: 'standard', was: 'residential omen', now: 'concrete agreement on where and how to create home' },
  { number: 26, slug: 'family-parents', kootaSlug: 'bhakoot', name: 'Family & Parents', description: 'How will parents and extended families fit into your daily life, decisions, and home?', guidance: 'Examine parental influence, care for aging parents, joint vs nuclear living, and boundary management.', sensitivity: 'sensitive', was: 'in-law harmony chart', now: 'clear, healthy boundaries and respect for both family trees' },
  { number: 27, slug: 'children-parenthood', kootaSlug: 'bhakoot', name: 'Children & Parenthood', description: 'Do you want children, when, and how do you imagine raising them together?', guidance: 'Cover desire for kids, parenting values, schooling philosophy, timelines, or choosing child-free life.', sensitivity: 'sensitive', was: 'lineage prediction', now: 'shared clarity on parenthood desires and parenting values' },
  { number: 28, slug: 'culture-religion-shared-life', kootaSlug: 'bhakoot', name: 'Culture, Religion & Shared Life', description: 'What traditions, cultural practices, religious beliefs, and festivals will shape your home?', guidance: 'Discuss ritual involvement, dietary habits, cultural values in raising a family, and open-mindedness.', sensitivity: 'standard', was: 'ritual status match', now: 'creating a harmonious cultural and spiritual home environment' },
  // NADI
  { number: 29, slug: 'health-disclosure', kootaSlug: 'nadi', name: 'Health & Disclosure', description: 'What should you understand about each other’s current health, medical history, and habits?', guidance: 'Discuss chronic conditions, mental health history, lifestyle habits, and honest medical disclosure.', sensitivity: 'sensitive', was: 'bloodline omen (Nadi Dosha)', now: 'transparent health disclosure and mutual medical understanding' },
  { number: 30, slug: 'family-health-hereditary-context', kootaSlug: 'nadi', name: 'Family Health & Hereditary Context', description: 'Are there family medical considerations or genetic conditions relevant to your future?', guidance: 'Discuss hereditary health conditions with maturity, empathy, and medical awareness.', sensitivity: 'sensitive', was: 'genetic curse calculation', now: 'compassionate awareness of family health contexts' },
  { number: 31, slug: 'reproductive-health-fertility', kootaSlug: 'nadi', name: 'Reproductive Health & Fertility', description: 'What are your expectations around reproductive health, fertility testing, or alternative paths?', guidance: 'Explore attitudes toward fertility challenges, IVF, adoption, and medical support.', sensitivity: 'intimate', was: 'childbearing curse omen', now: 'open communication on reproductive expectations and options' },
  { number: 32, slug: 'parenthood-resilience', kootaSlug: 'nadi', name: 'Parenthood Resilience', description: 'How might you face unexpected challenges around becoming parents or raising a child?', guidance: 'Consider standing together during parenting stress, special needs, or fertility struggles.', sensitivity: 'sensitive', was: 'parental tragedy prediction', now: 'resilience and unity when parenting does not follow a script' },
  { number: 33, slug: 'long-term-care', kootaSlug: 'nadi', name: 'Long-Term Care', description: 'How would you want to care for each other through illness, disability, or aging over time?', guidance: 'Reflect on commitment during health setbacks, caregiving attitudes, and long-term devotion.', sensitivity: 'sensitive', was: 'longevity chart prediction', now: 'willingness to stand by each other through illness and age' },
  { number: 34, slug: 'family-responsibility-over-time', kootaSlug: 'nadi', name: 'Family Responsibility Over Time', description: 'What obligations toward parents, siblings, or dependants might shape your financial and home life?', guidance: 'Unpack future eldercare plans, supporting siblings, and financial responsibilities to relatives.', sensitivity: 'sensitive', was: 'family burden omen', now: 'practical coordination of eldercare and family responsibilities' },
  { number: 35, slug: 'sustainable-life', kootaSlug: 'nadi', name: 'Sustainable Life', description: 'Can the life and pace you are imagining remain workable and healthy as circumstances change?', guidance: 'Look at burnout prevention, long-term work-life balance, and adaptability to major life shifts.', sensitivity: 'standard', was: 'lifetime vitality index', now: 'building a sustainable, anti-burnout pace of life together' },
  { number: 36, slug: 'growing-old-together', kootaSlug: 'nadi', name: 'Growing Old Together', description: 'What do you imagine your relationship and life looking like many years from now?', guidance: 'Reflect on retirement visions, companionship in later years, and lifelong partnership.', sensitivity: 'standard', was: 'final longevity match', now: 'shared vision of growing old as lifelong companions' },
];

export const VOWS: VowDefinition[] = [
  { orderIndex: 1, slug: 'first-honest-conversation', title: 'The First Honest Conversation', subtitle: 'Saying the things that matter, especially what was postponed.', description: 'Say the things that matter, especially the things that have been postponed or assumed.', was: 'promise of food and nourishment', now: 'courage to speak the true thing instead of the comfortable one', guidance: ['What topic have you postponed bringing up out of fear of disrupting things?', 'What is one expectation you carry that you haven’t explicitly stated out loud?', 'What does radical honesty feel like when met with gentleness?', 'How do you handle hearing something unexpected without becoming defensive?'], connectedGunaNumbers: [1, 12, 14] },
  { orderIndex: 2, slug: 'meeting-the-families', title: 'Meeting the Families', subtitle: 'Understanding the households and responsibilities you become part of.', description: 'Understand the people, relationships, traditions and responsibilities you are becoming part of.', was: 'promise of strength and joint family honor', now: 'two households learning to respect and share space', guidance: ['How does your partner behave around their family versus around you?', 'What family traditions are non-negotiable for each of you to preserve?', 'How will you handle unsolicited family advice or interference as a united team?', 'What boundaries do you both agree to maintain around your home privacy?'], connectedGunaNumbers: [26, 28, 34] },
  { orderIndex: 3, slug: 'navigating-real-disagreement', title: 'Navigating a Real Disagreement', subtitle: 'Learning how to find your way back to each other when you differ.', description: 'Learn how you find your way back to each other when you do not see things the same way.', was: 'promise of wealth and prosperity', now: 'learning to disagree without jeopardizing the foundation of respect', guidance: ['What happens when one of you needs space and the other wants to resolve things immediately?', 'What does respect look like in the middle of a heated disagreement?', 'How do you repair and reconnect after a hard argument?', 'Can you agree to disagree on non-essential preferences without resentment?'], connectedGunaNumbers: [5, 20, 21] },
  { orderIndex: 4, slug: 'sharing-fear-out-loud', title: 'Sharing a Fear Out Loud', subtitle: 'Letting each other see the parts that need patience and support.', description: 'Let each other see the parts of you that may need understanding, patience or support.', was: 'promise of mutual happiness', now: 'risking vulnerability by showing the insecure parts of yourself', guidance: ['What fear about marriage or partnership have you hesitated to admit?', 'What insecurity from your past requires patience from your partner?', 'How can your partner best reassure you when fear or self-doubt arises?', 'What does emotional safety look like in your daily interaction?'], connectedGunaNumbers: [4, 13, 29] },
  { orderIndex: 5, slug: 'talking-about-next-ten-years', title: 'Talking About the Next Ten Years', subtitle: 'Imagining the life you are actually going to build beyond the wedding.', description: 'Imagine the life you are actually going to build, not only the wedding ahead.', was: 'promise of noble offspring and lineage', now: 'co-designing a ten-year life trajectory you both want to live', guidance: ['Where do you see yourselves living five to ten years from today?', 'How do career ambitions, parenthood, and personal growth fit into the decade ahead?', 'What financial milestones or lifestyle choices matter most over the next 10 years?', 'How will you handle major forks in the road if opportunities emerge abroad or in new fields?'], connectedGunaNumbers: [22, 23, 24, 25, 27] },
  { orderIndex: 6, slug: 'weathering-a-hard-season', title: 'Weathering a Hard Season', subtitle: 'Standing together when life does not go according to plan.', description: 'Talk about how you want to stand together when life does not go according to plan.', was: 'promise for the six weather seasons', now: 'remaining a team through grief, financial strain, or illness', guidance: ['How did your respective families handle crisis, and what did you learn from that?', 'What will help you stay connected if work, illness, or caregiving consumes all energy?', 'How will you ensure neither person carries the emotional burden alone during hardship?', 'What promises do you make to each other for the unexpected rainy seasons of life?'], connectedGunaNumbers: [5, 32, 33, 35] },
  { orderIndex: 7, slug: 'choosing-each-other-plainly', title: 'Choosing Each Other, Plainly', subtitle: 'Consciously choosing the person you are building a life with.', description: 'After everything you’ve discovered, consciously choose the person you’re building a life with.', was: 'lifelong friendship solemnized by seven steps', now: 'choosing each other plainly, not out of pressure, but out of deep clarity', guidance: ['What is the fundamental reason you choose this person to be your life companion?', 'How will you renew this choice every day in the ordinary years ahead?', 'What promise do you make to honor both individual growth and couple unity?', 'Standing here today, what makes you feel quiet confidence in your decision?'], connectedGunaNumbers: [1, 11, 36] },
];
