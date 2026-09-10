import { PrismaClient, SensitivityLevel } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFramework() {
  console.log('Seeding 36to7 Framework...');

  // 1. Create or upsert default FrameworkVersion
  const version = await prisma.frameworkVersion.upsert({
    where: { versionNumber: 1 },
    update: {},
    create: {
      versionNumber: 1,
      label: '36to7 Framework v1.0',
      description: '36 Guna / 8 Koota modern psychological re-interpretation and 7 Vows pointers.',
      publishedAt: new Date(),
    },
  });

  // 2. Kootas Seed Data
  const kootasData = [
    {
      slug: 'varna',
      name: 'Varna',
      traditionalPointValue: 1,
      orderIndex: 1,
      modernDescription: 'Core values, ambition, ethics, and shared direction in life.',
      wasReframe: 'was: traditional spiritual classification',
      nowReframe: 'now: whether your core values and sense of life purpose point in the same direction',
    },
    {
      slug: 'vashya',
      name: 'Vashya',
      traditionalPointValue: 2,
      orderIndex: 2,
      modernDescription: 'Power balance, independence, and mutual decision-making.',
      wasReframe: 'was: dominance & control calculation',
      nowReframe: 'now: whether decision-making feels fair and balanced to both',
    },
    {
      slug: 'tara',
      name: 'Tara',
      traditionalPointValue: 3,
      orderIndex: 3,
      modernDescription: 'Emotional support, stress resilience, and wellbeing.',
      wasReframe: "was: destiny's favor and luck",
      nowReframe: 'now: the emotional steadiness and support you actively build together',
    },
    {
      slug: 'yoni',
      name: 'Yoni',
      traditionalPointValue: 4,
      orderIndex: 4,
      modernDescription: 'Affection, physical intimacy, boundaries, and sexual communication.',
      wasReframe: 'was: animal-sign compatibility omen',
      nowReframe: 'now: how physical closeness and intimacy actually feel to both of you',
    },
    {
      slug: 'grahamaitri',
      name: 'Graha Maitri',
      traditionalPointValue: 5,
      orderIndex: 5,
      modernDescription: 'Friendship, communication, trust, and shared enjoyment.',
      wasReframe: 'was: planetary friendship',
      nowReframe: 'now: do you genuinely enjoy talking to each other as friends',
    },
    {
      slug: 'gana',
      name: 'Gana',
      traditionalPointValue: 6,
      orderIndex: 6,
      modernDescription: 'Temperament, daily rhythms, social energy, and conflict behavior.',
      wasReframe: 'was: cosmic temperament classification',
      nowReframe: 'now: how you each move through a hard day and handle disagreement',
    },
    {
      slug: 'bhakoot',
      name: 'Bhakoot',
      traditionalPointValue: 7,
      orderIndex: 7,
      modernDescription: 'Life vision, career, money, geography, family, and parenthood.',
      wasReframe: 'was: predicted family fortune',
      nowReframe: 'now: what life you are building together and with what tools',
    },
    {
      slug: 'nadi',
      name: 'Nadi',
      traditionalPointValue: 8,
      orderIndex: 8,
      modernDescription: 'Health disclosure, family medical context, caregiving, and life pace.',
      wasReframe: 'was: bloodline & genetic omen',
      nowReframe: 'now: energy levels, health habits, and supporting each other through life',
    },
  ];

  const createdKootas: Record<string, string> = {};
  for (const kData of kootasData) {
    const k = await prisma.koota.upsert({
      where: { slug: kData.slug },
      update: {
        ...kData,
        frameworkVersionId: version.id,
      },
      create: {
        id: `koota-${kData.slug}`,
        frameworkVersionId: version.id,
        ...kData,
      },
    });
    createdKootas[kData.slug] = k.id;
  }

  // 3. Gunas Seed Data (All 36)
  const gunasData: Array<{
    number: number;
    slug: string;
    kootaSlug: string;
    name: string;
    description: string;
    guidanceText: string;
    sensitivityLevel: SensitivityLevel;
    orderIndex: number;
    wasReframe: string;
    nowReframe: string;
  }> = [
    // VARNA (1)
    {
      number: 1,
      slug: 'core-values-direction',
      kootaSlug: 'varna',
      name: 'Core Values & Life Orientation',
      description: 'What gives your life meaning and what kind of person do you want to become?',
      guidanceText: 'Explore ambition, spirituality, individuality, ethics, personal growth, and traditional vs modern outlooks.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 1,
      wasReframe: 'was: birth-star spiritual orientation',
      nowReframe: 'now: whether your core values and sense of purpose point in the same direction',
    },
    // VASHYA (2-3)
    {
      number: 2,
      slug: 'independence-space',
      kootaSlug: 'vashya',
      name: 'Independence & Personal Space',
      description: 'How much freedom, privacy, and individuality does each person need?',
      guidanceText: 'Discuss personal time, solitary hobbies, friendships outside the relationship, and boundaries.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 2,
      wasReframe: 'was: control & submission',
      nowReframe: 'now: balancing personal autonomy with togetherness',
    },
    {
      number: 3,
      slug: 'influence-decision-making',
      kootaSlug: 'vashya',
      name: 'Influence & Decision-Making',
      description: 'How will two independent people make important decisions together?',
      guidanceText: 'Examine who leads decisions on finances, relocation, career shifts, and family obligations.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 3,
      wasReframe: 'was: dominance ranking',
      nowReframe: 'now: equal voice and collaborative choice',
    },
    // TARA (4-6)
    {
      number: 4,
      slug: 'emotional-support',
      kootaSlug: 'tara',
      name: 'Emotional Support',
      description: 'How do you want to be supported, understood, and comforted when vulnerable?',
      guidanceText: 'Consider how each partner offers reassurance during self-doubt, grief, or exhaustion.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 4,
      wasReframe: "was: star sign luck",
      nowReframe: 'now: presence and empathy in difficult moments',
    },
    {
      number: 5,
      slug: 'stress-resilience',
      kootaSlug: 'tara',
      name: 'Stress & Resilience',
      description: 'How do you respond to pressure, uncertainty, and unexpected setbacks?',
      guidanceText: 'Look at coping mechanisms: shutting down, over-analyzing, seeking space, or acting quickly.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 5,
      wasReframe: 'was: misfortune predictor',
      nowReframe: 'now: building a calm, dependable floor together under stress',
    },
    {
      number: 6,
      slug: 'wellbeing-self-care',
      kootaSlug: 'tara',
      name: 'Wellbeing & Self-Care',
      description: 'How do you look after yourselves and support each other’s physical & mental health?',
      guidanceText: 'Discuss rest habits, mental health awareness, exercise, therapy openness, and wellness routines.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 6,
      wasReframe: 'was: auspicious planetary placement',
      nowReframe: 'now: mutual care and sustaining individual mental & physical health',
    },
    // YONI (7-10)
    {
      number: 7,
      slug: 'affection-touch',
      kootaSlug: 'yoni',
      name: 'Affection & Touch',
      description: 'How do you experience and communicate non-sexual physical affection and closeness?',
      guidanceText: 'Explore comfort with public displays of affection, hugs, holding hands, and quiet physical presence.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 7,
      wasReframe: 'was: animal instinct matching',
      nowReframe: 'now: everyday warmth and physical love languages',
    },
    {
      number: 8,
      slug: 'sexual-desire-expectations',
      kootaSlug: 'yoni',
      name: 'Sexual Desire & Expectations',
      description: 'What place does sexual intimacy have in your relationship and what expectations do you carry?',
      guidanceText: 'Reflect on frequency, emotional intimacy link, curiosity, and pace of physical connection.',
      sensitivityLevel: SensitivityLevel.INTIMATE,
      orderIndex: 8,
      wasReframe: 'was: sexual omen calculation',
      nowReframe: 'now: open alignment on physical intimacy expectations',
    },
    {
      number: 9,
      slug: 'sexual-communication-boundaries',
      kootaSlug: 'yoni',
      name: 'Sexual Communication & Boundaries',
      description: 'How comfortably can you talk about intimacy, preferences, boundaries, and consent?',
      guidanceText: 'Check ease of discussing discomfort, trying new things, saying no gracefully, and mutual respect.',
      sensitivityLevel: SensitivityLevel.INTIMATE,
      orderIndex: 9,
      wasReframe: 'was: fixed instinct compatibility',
      nowReframe: 'now: psychological safety to talk about intimate needs',
    },
    {
      number: 10,
      slug: 'reproductive-intimate-health',
      kootaSlug: 'yoni',
      name: 'Reproductive & Intimate Health',
      description: 'What should each person understand about intimate health, contraception, and expectations?',
      guidanceText: 'Address health awareness, openness regarding fertility expectations, and intimate hygiene.',
      sensitivityLevel: SensitivityLevel.INTIMATE,
      orderIndex: 10,
      wasReframe: 'was: omen of fertility',
      nowReframe: 'now: mature disclosure and understanding of intimate health',
    },
    // GRAHA MAITRI (11-15)
    {
      number: 11,
      slug: 'friendship-companionship',
      kootaSlug: 'grahamaitri',
      name: 'Friendship & Companionship',
      description: 'Do you genuinely enjoy being together beyond romantic or ceremonial obligations?',
      guidanceText: 'Notice whether you laugh together, enjoy ordinary downtime, and genuinely like each other as friends.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 11,
      wasReframe: 'was: planetary friendship',
      nowReframe: 'now: authentic friendship and companionship',
    },
    {
      number: 12,
      slug: 'communication',
      kootaSlug: 'grahamaitri',
      name: 'Communication',
      description: 'How do you express yourselves, articulate thoughts, and listen to each other?',
      guidanceText: 'Evaluate depth of conversation, listening habits, patience, and non-verbal understanding.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 12,
      wasReframe: 'was: mental alignment score',
      nowReframe: 'now: how freely and clearly you exchange ideas and feelings',
    },
    {
      number: 13,
      slug: 'emotional-connection',
      kootaSlug: 'grahamaitri',
      name: 'Emotional Connection',
      description: 'How do you experience closeness, warmth, and emotional intimacy in conversation?',
      guidanceText: 'Notice if you feel heard, if conversations leave you energized, and if vulnerability is welcomed.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 13,
      wasReframe: 'was: celestial affinity',
      nowReframe: 'now: genuine emotional resonance and safety',
    },
    {
      number: 14,
      slug: 'trust-reliability',
      kootaSlug: 'grahamaitri',
      name: 'Trust & Reliability',
      description: 'Can you depend on each other, and do words and actions consistently align?',
      guidanceText: 'Assess follow-through on commitments, honesty about small things, and confidence in promises.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 14,
      wasReframe: 'was: loyalty omen',
      nowReframe: 'now: steady reliability and alignment between words and actions',
    },
    {
      number: 15,
      slug: 'shared-enjoyment',
      kootaSlug: 'grahamaitri',
      name: 'Shared Enjoyment',
      description: 'What makes ordinary life enjoyable together when no special event is planned?',
      guidanceText: 'Look at shared humor, simple weekend routines, meals, quiet evenings, and casual activities.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 15,
      wasReframe: 'was: mutual pleasure chart',
      nowReframe: 'now: finding joy in mundane, unscripted everyday moments',
    },
    // GANA (16-21)
    {
      number: 16,
      slug: 'temperament',
      kootaSlug: 'gana',
      name: 'Temperament',
      description: 'How are you naturally wired in terms of pace, emotional intensity, and reaction speed?',
      guidanceText: 'Understand introversion vs extroversion, quick-tempered vs calm, and emotional processing speed.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 16,
      wasReframe: 'was: cosmic temperament class (Deva/Manushya/Rakshasa)',
      nowReframe: 'now: understanding natural personality wiring without judgment',
    },
    {
      number: 17,
      slug: 'everyday-rhythm',
      kootaSlug: 'gana',
      name: 'Everyday Rhythm',
      description: 'How do routines, schedules, punctuality, and daily habits fit together?',
      guidanceText: 'Examine sleep schedules, weekend planning, meal times, tidiness, and structure vs spontaneity.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 17,
      wasReframe: 'was: daily routine clash',
      nowReframe: 'now: meshing different daily paces and living habits',
    },
    {
      number: 18,
      slug: 'social-energy',
      kootaSlug: 'gana',
      name: 'Social Energy',
      description: 'How much people, socializing, hosting, and community does each person want around them?',
      guidanceText: 'Discuss frequency of social gatherings, hosting family/friends at home, and quiet downtime needs.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 18,
      wasReframe: 'was: social caste standing',
      nowReframe: 'now: balancing social appetite and quiet home life',
    },
    {
      number: 19,
      slug: 'lifestyle-interests',
      kootaSlug: 'gana',
      name: 'Lifestyle & Interests',
      description: 'How do you like to spend life: travel, food, music, sports, hobbies, pets, and entertainment?',
      guidanceText: 'Explore overlap in leisure, willingness to try each other’s interests, and respecting differences.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 19,
      wasReframe: 'was: habit compatibility formula',
      nowReframe: 'now: discovering shared passions while honoring individual hobbies',
    },
    {
      number: 20,
      slug: 'conflict-behaviour',
      kootaSlug: 'gana',
      name: 'Conflict Behaviour',
      description: 'What happens when you disagree: how do you express frustration and find resolution?',
      guidanceText: 'Notice tendencies to withdraw, argue immediately, raise voices, or seek immediate repair.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 20,
      wasReframe: 'was: hostility prediction',
      nowReframe: 'now: how you navigate disagreement with respect and find your way back',
    },
    {
      number: 21,
      slug: 'adaptability-difference',
      kootaSlug: 'gana',
      name: 'Adaptability & Difference',
      description: 'How comfortably can you live with differences, surprises, and changing circumstances?',
      guidanceText: 'Reflect on flexibility when plans fall apart, tolerance for imperfections, and compromise.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 21,
      wasReframe: 'was: stubbornness calculation',
      nowReframe: 'now: mutual adaptability and grace in the face of difference',
    },
    // BHAKOOT (22-28)
    {
      number: 22,
      slug: 'life-vision',
      kootaSlug: 'bhakoot',
      name: 'Life Vision',
      description: 'What kind of life, purpose, and legacy are you each trying to build in the long run?',
      guidanceText: 'Explore overarching goals, definition of success, risk appetite, and 10-year aspirations.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 22,
      wasReframe: 'was: family fortune omen',
      nowReframe: 'now: whether your long-term life trajectories point toward a shared horizon',
    },
    {
      number: 23,
      slug: 'career-work',
      kootaSlug: 'bhakoot',
      name: 'Career & Work',
      description: 'What role will work, ambition, relocation, and career play in your lives?',
      guidanceText: 'Discuss dual-career balance, working hours, relocations, career breaks, and support for ambition.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 23,
      wasReframe: 'was: economic prosperity predictor',
      nowReframe: 'now: supporting each other’s professional life and balance',
    },
    {
      number: 24,
      slug: 'money-financial-life',
      kootaSlug: 'bhakoot',
      name: 'Money & Financial Life',
      description: 'How do you think about earning, spending, saving, investing, independence, and joint accounts?',
      guidanceText: 'Unpack financial transparency, debt attitudes, luxury vs frugal choices, and helping extended family.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 24,
      wasReframe: 'was: wealth compatibility formula',
      nowReframe: 'now: alignment on money habits, transparency, and financial values',
    },
    {
      number: 25,
      slug: 'home-geography',
      kootaSlug: 'bhakoot',
      name: 'Home & Geography',
      description: 'Where and how do you imagine living: city, neighborhood, living with/near parents, house style?',
      guidanceText: 'Discuss mobility, living arrangements, urban vs quiet towns, and international moves.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 25,
      wasReframe: 'was: residential omen',
      nowReframe: 'now: concrete agreement on where and how to create home',
    },
    {
      number: 26,
      slug: 'family-parents',
      kootaSlug: 'bhakoot',
      name: 'Family & Parents',
      description: 'How will parents and extended families fit into your daily life, decisions, and home?',
      guidanceText: 'Examine parental influence, care for aging parents, joint vs nuclear living, and boundary management.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 26,
      wasReframe: 'was: in-law harmony chart',
      nowReframe: 'now: clear, healthy boundaries and respect for both family trees',
    },
    {
      number: 27,
      slug: 'children-parenthood',
      kootaSlug: 'bhakoot',
      name: 'Children & Parenthood',
      description: 'Do you want children, when, and how do you imagine raising them together?',
      guidanceText: 'Cover desire for kids, parenting values, schooling philosophy, timelines, or choosing child-free life.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 27,
      wasReframe: 'was: lineage prediction',
      nowReframe: 'now: shared clarity on parenthood desires and parenting values',
    },
    {
      number: 28,
      slug: 'culture-religion-shared-life',
      kootaSlug: 'bhakoot',
      name: 'Culture, Religion & Shared Life',
      description: 'What traditions, cultural practices, religious beliefs, and festivals will shape your home?',
      guidanceText: 'Discuss ritual involvement, dietary habits, cultural values in raising a family, and open-mindedness.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 28,
      wasReframe: 'was: ritual status match',
      nowReframe: 'now: creating a harmonious cultural and spiritual home environment',
    },
    // NADI (29-36)
    {
      number: 29,
      slug: 'health-disclosure',
      kootaSlug: 'nadi',
      name: 'Health & Disclosure',
      description: 'What should you understand about each other’s current health, medical history, and habits?',
      guidanceText: 'Discuss chronic conditions, mental health history, lifestyle habits, and honest medical disclosure.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 29,
      wasReframe: 'was: bloodline omen (Nadi Dosha)',
      nowReframe: 'now: transparent health disclosure and mutual medical understanding',
    },
    {
      number: 30,
      slug: 'family-health-hereditary-context',
      kootaSlug: 'nadi',
      name: 'Family Health & Hereditary Context',
      description: 'Are there family medical considerations or genetic conditions relevant to your future?',
      guidanceText: 'Discuss hereditary health conditions with maturity, empathy, and medical awareness.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 30,
      wasReframe: 'was: genetic curse calculation',
      nowReframe: 'now: compassionate awareness of family health contexts',
    },
    {
      number: 31,
      slug: 'reproductive-health-fertility',
      kootaSlug: 'nadi',
      name: 'Reproductive Health & Fertility',
      description: 'What are your expectations around reproductive health, fertility testing, or alternative paths?',
      guidanceText: 'Explore attitudes toward fertility challenges, IVF, adoption, and medical support.',
      sensitivityLevel: SensitivityLevel.INTIMATE,
      orderIndex: 31,
      wasReframe: 'was: childbearing curse omen',
      nowReframe: 'now: open communication on reproductive expectations and options',
    },
    {
      number: 32,
      slug: 'parenthood-resilience',
      kootaSlug: 'nadi',
      name: 'Parenthood Resilience',
      description: 'How might you face unexpected challenges around becoming parents or raising a child?',
      guidanceText: 'Consider standing together during parenting stress, special needs, or fertility struggles.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 32,
      wasReframe: 'was: parental tragedy prediction',
      nowReframe: 'now: resilience and unity when parenting does not follow a script',
    },
    {
      number: 33,
      slug: 'long-term-care',
      kootaSlug: 'nadi',
      name: 'Long-Term Care',
      description: 'How would you want to care for each other through illness, disability, or aging over time?',
      guidanceText: 'Reflect on commitment during health setbacks, caregiving attitudes, and long-term devotion.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 33,
      wasReframe: 'was: longevity chart prediction',
      nowReframe: 'now: willingness to stand by each other through illness and age',
    },
    {
      number: 34,
      slug: 'family-responsibility-over-time',
      kootaSlug: 'nadi',
      name: 'Family Responsibility Over Time',
      description: 'What obligations toward parents, siblings, or dependants might shape your financial and home life?',
      guidanceText: 'Unpack future eldercare plans, supporting siblings, and financial responsibilities to relatives.',
      sensitivityLevel: SensitivityLevel.SENSITIVE,
      orderIndex: 34,
      wasReframe: 'was: family burden omen',
      nowReframe: 'now: practical coordination of eldercare and family responsibilities',
    },
    {
      number: 35,
      slug: 'sustainable-life',
      kootaSlug: 'nadi',
      name: 'Sustainable Life',
      description: 'Can the life and pace you are imagining remain workable and healthy as circumstances change?',
      guidanceText: 'Look at burnout prevention, long-term work-life balance, and adaptability to major life shifts.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 35,
      wasReframe: 'was: lifetime vitality index',
      nowReframe: 'now: building a sustainable, anti-burnout pace of life together',
    },
    {
      number: 36,
      slug: 'growing-old-together',
      kootaSlug: 'nadi',
      name: 'Growing Old Together',
      description: 'What do you imagine your relationship and life looking like many years from now?',
      guidanceText: 'Reflect on retirement visions, companionship in later years, and lifelong partnership.',
      sensitivityLevel: SensitivityLevel.STANDARD,
      orderIndex: 36,
      wasReframe: 'was: final longevity match',
      nowReframe: 'now: shared vision of growing old as lifelong companions',
    },
  ];

  for (const gData of gunasData) {
    const kId = createdKootas[gData.kootaSlug];
    const { kootaSlug, ...gClean } = gData;
    await prisma.guna.upsert({
      where: { number: gData.number },
      update: {
        ...gClean,
        kootaId: kId,
      },
      create: {
        id: `guna-${gData.number}`,
        ...gClean,
        kootaId: kId,
      },
    });
  }

  // 4. Vows Seed Data (All 7 Vows)
  const vowsData = [
    {
      orderIndex: 1,
      slug: 'first-honest-conversation',
      title: 'The First Honest Conversation',
      subtitle: 'Saying the things that matter, especially what was postponed.',
      description: 'Say the things that matter, especially the things that have been postponed or assumed.',
      wasReframe: 'was: promise of food and nourishment',
      nowReframe: 'now: courage to speak the true thing instead of the comfortable one',
      guidanceJson: [
        'What topic have you postponed bringing up out of fear of disrupting things?',
        'What is one expectation you carry that you haven’t explicitly stated out loud?',
        'What does radical honesty feel like when met with gentleness?',
        'How do you handle hearing something unexpected without becoming defensive?'
      ],
      connectedGunaNumbersJson: [1, 12, 14],
    },
    {
      orderIndex: 2,
      slug: 'meeting-the-families',
      title: 'Meeting the Families',
      subtitle: 'Understanding the households and responsibilities you become part of.',
      description: 'Understand the people, relationships, traditions and responsibilities you are becoming part of.',
      wasReframe: 'was: promise of strength and joint family honor',
      nowReframe: 'now: two households learning to respect and share space',
      guidanceJson: [
        'How does your partner behave around their family versus around you?',
        'What family traditions are non-negotiable for each of you to preserve?',
        'How will you handle unsolicited family advice or interference as a united team?',
        'What boundaries do you both agree to maintain around your home privacy?'
      ],
      connectedGunaNumbersJson: [26, 28, 34],
    },
    {
      orderIndex: 3,
      slug: 'navigating-real-disagreement',
      title: 'Navigating a Real Disagreement',
      subtitle: 'Learning how to find your way back to each other when you differ.',
      description: 'Learn how you find your way back to each other when you do not see things the same way.',
      wasReframe: 'was: promise of wealth and prosperity',
      nowReframe: 'now: learning to disagree without jeopardizing the foundation of respect',
      guidanceJson: [
        'What happens when one of you needs space and the other wants to resolve things immediately?',
        'What does respect look like in the middle of a heated disagreement?',
        'How do you repair and reconnect after a hard argument?',
        'Can you agree to disagree on non-essential preferences without resentment?'
      ],
      connectedGunaNumbersJson: [5, 20, 21],
    },
    {
      orderIndex: 4,
      slug: 'sharing-fear-out-loud',
      title: 'Sharing a Fear Out Loud',
      subtitle: 'Letting each other see the parts that need patience and support.',
      description: 'Let each other see the parts of you that may need understanding, patience or support.',
      wasReframe: 'was: promise of mutual happiness',
      nowReframe: 'now: risking vulnerability by showing the insecure parts of yourself',
      guidanceJson: [
        'What fear about marriage or partnership have you hesitated to admit?',
        'What insecurity from your past requires patience from your partner?',
        'How can your partner best reassure you when fear or self-doubt arises?',
        'What does emotional safety look like in your daily interaction?'
      ],
      connectedGunaNumbersJson: [4, 13, 29],
    },
    {
      orderIndex: 5,
      slug: 'talking-about-next-ten-years',
      title: 'Talking About the Next Ten Years',
      subtitle: 'Imagining the life you are actually going to build beyond the wedding.',
      description: 'Imagine the life you are actually going to build, not only the wedding ahead.',
      wasReframe: 'was: promise of noble offspring and lineage',
      nowReframe: 'now: co-designing a ten-year life trajectory you both want to live',
      guidanceJson: [
        'Where do you see yourselves living five to ten years from today?',
        'How do career ambitions, parenthood, and personal growth fit into the decade ahead?',
        'What financial milestones or lifestyle choices matter most over the next 10 years?',
        'How will you handle major forks in the road if opportunities emerge abroad or in new fields?'
      ],
      connectedGunaNumbersJson: [22, 23, 24, 25, 27],
    },
    {
      orderIndex: 6,
      slug: 'weathering-a-hard-season',
      title: 'Weathering a Hard Season',
      subtitle: 'Standing together when life does not go according to plan.',
      description: 'Talk about how you want to stand together when life does not go according to plan.',
      wasReframe: 'was: promise for the six weather seasons',
      nowReframe: 'now: remaining a team through grief, financial strain, or illness',
      guidanceJson: [
        'How did your respective families handle crisis, and what did you learn from that?',
        'What will help you stay connected if work, illness, or caregiving consumes all energy?',
        'How will you ensure neither person carries the emotional burden alone during hardship?',
        'What promises do you make to each other for the unexpected rainy seasons of life?'
      ],
      connectedGunaNumbersJson: [5, 32, 33, 35],
    },
    {
      orderIndex: 7,
      slug: 'choosing-each-other-plainly',
      title: 'Choosing Each Other, Plainly',
      subtitle: 'Consciously choosing the person you are building a life with.',
      description: 'After everything you’ve discovered, consciously choose the person you’re building a life with.',
      wasReframe: 'was: lifelong friendship solemnized by seven steps',
      nowReframe: 'now: choosing each other plainly, not out of pressure, but out of deep clarity',
      guidanceJson: [
        'What is the fundamental reason you choose this person to be your life companion?',
        'How will you renew this choice every day in the ordinary years ahead?',
        'What promise do you make to honor both individual growth and couple unity?',
        'Standing here today, what makes you feel quiet confidence in your decision?'
      ],
      connectedGunaNumbersJson: [1, 11, 36],
    },
  ];

  for (const vData of vowsData) {
    await prisma.vow.upsert({
      where: { orderIndex: vData.orderIndex },
      update: {
        ...vData,
        frameworkVersionId: version.id,
      },
      create: {
        id: `vow-${vData.orderIndex}`,
        frameworkVersionId: version.id,
        ...vData,
      },
    });
  }

  console.log('36to7 Framework Seeding Complete! (8 Kootas, 36 Gunas, 7 Vows)');
}

if (require.main === module) {
  seedFramework()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
