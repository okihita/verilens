/**
 * VeriLens Tier-1 Heuristics Engine
 * High-speed, comprehensive regex pattern matcher for real-world news, scams, and clickbait.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VeriLensHeuristics = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const HEURISTIC_PATTERNS = [
    // 1. Scams & Financial/Urgent Action Triggers
    {
      id: 'scam_urgency',
      name: 'Urgent Action / Financial Lure',
      category: 'Scam & Social Engineering',
      severity: 'high',
      color: '#E11D48',
      regex: /\b(act\s+now|limited\s+time\s+only|claim\s+your\s+(prize|reward|grant|refund|tokens?)|guaranteed\s+(profit|returns?|income)|miracle\s+(cure|remedy|supplement|treatment)|secret\s+loophole|verify\s+your\s+account\s+immediately|your\s+account\s+(has\s+been\s+)?(suspended|compromised|locked)|urgent\s+security\s+alert|get\s+rich\s+quick|100%\s+free\s+money)\b/gi,
      explanation: 'Uses artificial urgency, fear of loss, or unbelievable financial promises to rush the victim into clicking or complying without verification.',
      reflection: 'Why is this message rushing you to act immediately before independent verification can take place?',
      milSkill: 'SIFT (Stop): Pause on Urgency & Financial Lures'
    },

    // 2. Censorship / Conspiracy & Virality Friction
    {
      id: 'urgency_scarcity',
      name: 'Viral Urgency & Conspiracy Framing',
      category: 'Engagement Hacking',
      severity: 'high',
      color: '#E11D48',
      regex: /\b(share\s+(this\s+)?before\s+(it'?s?|it\s+is)\s+(deleted|taken\s+down|censored|banned)|mainstream\s+media\s+(is\s+)?(hiding|won'?t\s+show|refuses\s+to\s+report)|wake\s+up\s+(people|sheeple)|they\s+don'?t\s+want\s+you\s+to\s+know|what\s+they'?re?\s+not\s+telling\s+you|shocking\s+secret\s+revealed|you\s+won'?t\s+believe\s+what\s+happened|cover-?up\s+exposed|the\s+truth\s+about|hidden\s+agenda)\b/gi,
      explanation: 'Uses conspiracy framing and censorship panic to bypass critical reasoning and provoke instant viral sharing.',
      reflection: 'Why does this author frame the claim as a suppressed secret rather than providing verifiable evidence?',
      milSkill: 'SIFT (Stop): Check Emotional Urgency'
    },

    // 3. Catastrophizing & Appeal to Fear (Ad Metum)
    {
      id: 'ad_metum',
      name: 'Catastrophizing & Appeal to Fear',
      category: 'Emotional Manipulation',
      severity: 'high',
      color: '#DC2626',
      regex: /\b(absolute,?\s+irreversible\s+catastrophe|total\s+(annihilation|collapse|ruin|destruction|chaos)|inevitable\s+doom|sleepwalking\s+into\s+disaster|blood\s+on\s+their\s+hands|mass\s+(poisoning|extinction|hysteria|panic)|the\s+end\s+of\s+(society|civilization|humanity|the\s+world)|unprecedented\s+(nightmare|disaster|threat))\b/gi,
      explanation: 'Uses apocalyptic doomsday language to provoke a fear-based fight-or-flight reaction rather than evidence-based thinking.',
      reflection: 'Does the underlying peer-reviewed data justify this extreme level of alarm, or is fear being used as persuasion?',
      milSkill: 'Identify Fear-Based Framing'
    },

    // 4. Weasel Words & Speculative Sourcing (Unverified Rumors)
    {
      id: 'weasel_words',
      name: 'Weasel Words / Speculative Attribution',
      category: 'Attribution Failure',
      severity: 'medium',
      color: '#F59E0B',
      regex: /\b(leading\s+scientists\s+(all\s+)?agree(\s+without\s+a\s+doubt)?|experts\s+(now\s+)?warn\s+that|unnamed\s+(insiders|officials|sources)\s+(confirm|reveal|claim)|sources\s+(close\s+to\s+the\s+matter|say|claim|suggest)|unconfirmed\s+reports\s+(indicate|suggest)|rumors\s+(swirl|suggest|circulate)\s+that|it\s+is\s+alleged\s+that|allegedly|studies\s+conclusively\s+prove|it\s+is\s+widely\s+known\s+that|everyone\s+knows\s+that|many\s+(people\s+)?are\s+saying)\b/gi,
      explanation: 'Attributed to unnamed sources, vague authority figures, or passive rumors without citing named primary documents.',
      reflection: 'Which specific institutions, researchers, or public records are actually being cited as primary sources?',
      milSkill: 'SIFT (Trace): Locate Primary Sources'
    },

    // 5. Sensationalist Clickbait Headlines
    {
      id: 'clickbait_hyperbole',
      name: 'Sensational Clickbait / Outrage Bait',
      category: 'Sensationalism',
      severity: 'medium',
      color: '#D97706',
      regex: /\b(bombshell\s+revelation|shocking\s+truth|mind-?blowing|sparks?\s+fury|outrage\s+erupts?|furious\s+backlash|destroys\s+opponent|slams?\s+critics?|rips?\s+into|brutally\s+mocks?|leaves?\s+everyone\s+stunned|jaw-?dropping)\b/gi,
      explanation: 'Uses hyper-charged emotional combat verbs to frame disagreements as dramatic battles for click engagement.',
      reflection: 'Is this headline reporting neutral facts, or is it trying to manipulate your emotions to generate clicks?',
      milSkill: 'Evaluate Emotional Word Choice'
    },

    // 6. False Dilemma / Forced Polarizers
    {
      id: 'false_dilemma',
      name: 'False Dilemma / Forced Dichotomy',
      category: 'Structural Logic',
      severity: 'high',
      color: '#D97706',
      regex: /\b(either\s+you\s+(support|stand\s+with|agree)\s+.*?\s+or\s+you\s+(hate|oppose|destroy)|if\s+you'?re?\s+not\s+with\s+us,?\s+you'?re?\s+against\s+us|there\s+are\s+only\s+two\s+choices)\b/gi,
      explanation: 'Forces the issue into two extreme opposing camps while erasing valid middle grounds or alternative solutions.',
      reflection: 'What alternative compromise or nuanced perspective is excluded by this either/or ultimatum?',
      milSkill: 'Evaluate Nuance & Spectrum'
    },

    // 7. Ad Hominem & Character Smears
    {
      id: 'ad_hominem',
      name: 'Ad Hominem & Character Smear',
      category: 'Dialectical Deflection',
      severity: 'medium',
      color: '#EA580C',
      regex: /\b(corrupt\s+(clowns?|shills?|puppets?|stooges?)|brainwashed\s+(idiots?|morons?)|evil\s+traitors?|bought-and-paid-for\s+agents?|pure\s+incompetence\s+and\s+greed)\b/gi,
      explanation: 'Attacks character and motives rather than evaluating the empirical validity of the opposing argument.',
      reflection: 'If you strip away the personal insults, what actual evidence or argument remains?',
      milSkill: 'Separate Character from Claim'
    }
  ];

  /**
   * Scans a text string and returns all heuristic matches with offsets and metadata
   */
  function scanText(text) {
    if (!text || typeof text !== 'string') return [];
    
    const results = [];
    
    for (const rule of HEURISTIC_PATTERNS) {
      const regex = new RegExp(rule.regex);
      let match;
      
      while ((match = regex.exec(text)) !== null) {
        results.push({
          id: rule.id,
          name: rule.name,
          category: rule.category,
          severity: rule.severity,
          color: rule.color,
          matchedText: match[0],
          startIndex: match.index,
          endIndex: match.index + match[0].length,
          explanation: rule.explanation,
          reflection: rule.reflection,
          milSkill: rule.milSkill,
          tier: 'Tier-1 Heuristic'
        });
      }
    }
    
    return results;
  }

  /**
   * Computes a Sensationalism Index (0 to 100) based on pattern density
   */
  function calculateSensationalismIndex(text, matches) {
    if (!text || text.length < 50) {
      return matches.length > 0 ? 50 : 10;
    }
    
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount === 0) return 0;
    
    let weightedScore = 0;
    for (const m of matches) {
      if (m.severity === 'high') weightedScore += 25;
      else if (m.severity === 'medium') weightedScore += 14;
      else weightedScore += 8;
    }
    
    if (matches.length === 0) {
      return 12; // Baseline reflective score for sober journalism
    }
    
    // Normalization curve based on word count
    const densityRatio = (weightedScore / Math.max(100, wordCount)) * 100;
    const baseScore = Math.min(100, Math.round(densityRatio * 3.5));
    
    const hasHighSeverity = matches.some(m => m.severity === 'high');
    if (hasHighSeverity && baseScore < 55) {
      return 60;
    }
    
    return Math.max(15, Math.min(98, baseScore));
  }

  return {
    HEURISTIC_PATTERNS,
    scanText,
    calculateSensationalismIndex
  };
});
