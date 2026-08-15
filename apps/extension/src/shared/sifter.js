/**
 * VeriLens SIFT Lateral Search Engine
 * Implements Mike Caulfield's SIFT Moves (Stop, Investigate, Find, Trace)
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.VeriLensSifter = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Comprehensive registry of publisher profiles for instant domain dossier
  const KNOWN_PUBLISHERS = {
    'snopes.com': {
      name: 'Snopes Fact-Checking Network',
      type: 'Independent Fact-Checking Organization (IFCN Signatory)',
      funding: 'Digital Advertising & Membership Support',
      credibility: 'High (Transparent Editorial Debunking Standards)',
      bias: 'Non-Partisan Fact-Checking'
    },
    'politifact.com': {
      name: 'PolitiFact (Poynter Institute)',
      type: 'Non-Profit Fact-Checking Project',
      funding: 'Poynter Institute (Grant & Foundation Funded)',
      credibility: 'High (Pulitzer Prize-Winning Fact Checks)',
      bias: 'Non-Partisan Fact-Checking'
    },
    'factcheck.org': {
      name: 'FactCheck.org (Annenberg Public Policy Center)',
      type: 'Non-Profit Educational Project',
      funding: 'Annenberg Foundation & University Endowment',
      credibility: 'High (Strict Journalistic & Academic Standards)',
      bias: 'Non-Partisan / Academic'
    },
    'wikipedia.org': {
      name: 'Wikipedia',
      type: 'Open Collaborative Encyclopedia',
      funding: 'Wikimedia Foundation (Donation Funded)',
      credibility: 'High (Crowdsourced Citation Framework)',
      bias: 'Consensus Oriented'
    },
    'reuters.com': {
      name: 'Reuters News',
      type: 'International News Wire Service',
      funding: 'Thomson Reuters Corp (Commercial & Subscriptions)',
      credibility: 'High (Global Primary Fact-Checking Unit)',
      bias: 'Center / Neutral Wire'
    },
    'apnews.com': {
      name: 'Associated Press (AP)',
      type: 'Not-For-Profit News Cooperative',
      funding: 'Media Cooperative Member Dues',
      credibility: 'High (Peer-Reviewed Journalistic Standards)',
      bias: 'Center / Neutral Wire'
    },
    'bbc.com': {
      name: 'BBC News',
      type: 'Public Broadcaster (UK)',
      funding: 'UK Television Licence Fee / BBC Studios',
      credibility: 'High (Strict Editorial Royal Charter)',
      bias: 'Center / Slight Left-Center'
    },
    'nytimes.com': {
      name: 'The New York Times',
      type: 'Major Daily Newspaper',
      funding: 'Subscription & Digital Advertising',
      credibility: 'High (Extensive Fact-Checking & Retraction Policy)',
      bias: 'Left-Center / Editorial Nuance'
    },
    'theguardian.com': {
      name: 'The Guardian',
      type: 'Independent Daily Newspaper',
      funding: 'Scott Trust Endowment & Reader Contributions',
      credibility: 'High (Rigorous Investigative Journalism)',
      bias: 'Left-Center'
    },
    'reddit.com': {
      name: 'Reddit',
      type: 'User-Generated Social Discussion Forum',
      funding: 'Digital Advertising & Premium Subscriptions',
      credibility: 'Variable / User Generated (Requires SIFT Verification)',
      bias: 'Community Dependent'
    },
    'x.com': {
      name: 'X (formerly Twitter)',
      type: 'Microblogging & Social Media Network',
      funding: 'Subscriptions & Digital Advertising',
      credibility: 'Variable / Unverified User Posts (High SIFT Need)',
      bias: 'Algorithm & Feed Dependent'
    },
    'twitter.com': {
      name: 'X (formerly Twitter)',
      type: 'Microblogging & Social Media Network',
      funding: 'Subscriptions & Digital Advertising',
      credibility: 'Variable / Unverified User Posts (High SIFT Need)',
      bias: 'Algorithm & Feed Dependent'
    },
    'instagram.com': {
      name: 'Instagram (Meta Platforms)',
      type: 'Photo & Video Social Network',
      funding: 'Meta Advertising Network',
      credibility: 'Variable / User-Created Visual Content',
      bias: 'Algorithm & Influencer Dependent'
    },
    'tiktok.com': {
      name: 'TikTok (ByteDance)',
      type: 'Short-Form Video Platform',
      funding: 'Digital Advertising & Creator Marketplace',
      credibility: 'Variable / Viral Short-Form (High Disinformation Risk)',
      bias: 'Algorithmic Engagement Driven'
    },
    'theweeklybeacon.com': {
      name: 'The Weekly Beacon (Demo Outlet)',
      type: 'Hyper-Partisan Opinion Blog',
      funding: 'Digital Ad Arbitrage & Private Advocacy Group',
      credibility: 'Mixed / Low Source Verification',
      bias: 'Sensationalist / High Rhetoric'
    }
  };

  /**
   * Generates lateral search URLs for claim verification
   */
  function buildLateralLinks(claimOrTitle, domain) {
    const cleanQuery = (claimOrTitle || '')
      .replace(/["'🚨😱⚠️]/g, '')
      .trim()
      .slice(0, 100);

    const factCheckUrl = `https://toolbox.google.com/factcheck/explorer/search/list:5?query=${encodeURIComponent(cleanQuery)}`;
    const consensusSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(cleanQuery + ' independent fact check analysis')}`;
    const domainInvestigateUrl = `https://en.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(domain || '')}`;
    const reverseImageSearchUrl = `https://lens.google.com/`;

    return {
      factCheckUrl,
      consensusSearchUrl,
      domainInvestigateUrl,
      reverseImageSearchUrl,
      cleanQuery
    };
  }

  /**
   * Retrieves or infers a domain trust dossier
   */
  function getDomainDossier(hostname) {
    if (!hostname) {
      return {
        name: 'Local or Demo Environment',
        type: 'Test / Local HTML Page',
        funding: 'Local Sandbox',
        credibility: 'N/A (Demonstration Page)',
        bias: 'Demo Mode'
      };
    }

    const cleanHost = hostname.replace(/^www\./, '').toLowerCase();

    if (KNOWN_PUBLISHERS[cleanHost]) {
      return KNOWN_PUBLISHERS[cleanHost];
    }

    return {
      name: cleanHost,
      type: 'Independent Web Domain',
      funding: 'Commercial / Ad Network / Undisclosed',
      credibility: 'Unverified Domain (Requires SIFT Lateral Investigation)',
      bias: 'Unknown - Check Lateral Sources'
    };
  }

  return {
    KNOWN_PUBLISHERS,
    buildLateralLinks,
    getDomainDossier
  };
});
