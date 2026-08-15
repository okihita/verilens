/**
 * VeriLens SIFT Lateral Search Engine & Publisher Dossier (ES Module)
 */

export const PUBLISHER_REGISTRY = {
  'snopes.com': {
    name: 'Snopes Fact-Checking Network',
    type: 'Independent Fact-Checker',
    funding: 'Advertising & Membership',
    credibility: 'High (IFCN Signatory)',
    ratingColor: '#10B981',
    description: 'Pioneering digital fact-checking unit founded in 1994, certified by the International Fact-Checking Network.'
  },
  'politifact.com': {
    name: 'PolitiFact',
    type: 'Non-Profit Journalism (Poynter Institute)',
    funding: 'Grants & Individual Donors',
    credibility: 'High (Pulitzer Prize Winner, IFCN Signatory)',
    ratingColor: '#10B981',
    description: 'Fact-checking project run by the Poynter Institute, creator of the Truth-O-Meter.'
  },
  'factcheck.org': {
    name: 'FactCheck.org',
    type: 'Academic Non-Profit (Annenberg Public Policy)',
    funding: 'Annenberg Foundation & Grants',
    credibility: 'High (IFCN Signatory)',
    ratingColor: '#10B981',
    description: 'Project of the Annenberg Public Policy Center at the University of Pennsylvania.'
  },
  'reuters.com': {
    name: 'Reuters News',
    type: 'International Wire Service',
    funding: 'Thomson Reuters Corp (Commercial)',
    credibility: 'High (Strict Trust Principles)',
    ratingColor: '#10B981',
    description: 'Global news organization operating under Thomson Reuters Trust Principles of integrity and freedom from bias.'
  },
  'apnews.com': {
    name: 'Associated Press (AP)',
    type: 'News Cooperative',
    funding: 'Member News Organizations',
    credibility: 'High (Primary Wire Service)',
    ratingColor: '#10B981',
    description: 'Not-for-profit news cooperative providing unvarnished global wire reporting since 1846.'
  },
  'bbc.com': {
    name: 'BBC News',
    type: 'Public Broadcaster',
    funding: 'UK License Fee & Commercial Subsidies',
    credibility: 'High (Editorial Royal Charter)',
    ratingColor: '#10B981',
    description: 'World leading public service broadcaster operating under UK Royal Charter editorial standards.'
  },
  'wikipedia.org': {
    name: 'Wikipedia / Wikimedia',
    type: 'Open Collaborative Encyclopedia',
    funding: 'Wikimedia Foundation Donations',
    credibility: 'Moderate/Good (Requires Secondary Citations)',
    ratingColor: '#3B82F6',
    description: 'Free open encyclopedia written collaboratively by volunteers with strict neutral point of view (NPOV) guidelines.'
  },
  'reddit.com': {
    name: 'Reddit',
    type: 'Social Discussion & Community Aggregator',
    funding: 'Public Corp (Advertising / Subscriptions)',
    credibility: 'User-Generated (Unverified by Default)',
    ratingColor: '#F59E0B',
    description: 'Open social forum where claims represent personal user submissions requiring external verification.'
  },
  'twitter.com': {
    name: 'X (Formerly Twitter)',
    type: 'Social Microblogging Network',
    funding: 'X Corp (Subscriptions & Advertising)',
    credibility: 'User-Generated (Unverified by Default)',
    ratingColor: '#F59E0B',
    description: 'Real-time social media platform with algorithmic distribution and user-generated posts.'
  },
  'x.com': {
    name: 'X (Formerly Twitter)',
    type: 'Social Microblogging Network',
    funding: 'X Corp (Subscriptions & Advertising)',
    credibility: 'User-Generated (Unverified by Default)',
    ratingColor: '#F59E0B',
    description: 'Real-time social media platform with algorithmic distribution and user-generated posts.'
  }
};

export function getDomainDossier(hostname) {
  if (!hostname) {
    return {
      name: 'Unknown Domain',
      type: 'Web Source',
      funding: 'Undisclosed',
      credibility: 'Unverified',
      ratingColor: '#94A3B8',
      description: 'No verified registry entry found. Practice lateral reading.'
    };
  }

  const cleanHost = hostname.toLowerCase().replace(/^www\./, '');
  if (PUBLISHER_REGISTRY[cleanHost]) {
    return PUBLISHER_REGISTRY[cleanHost];
  }

  for (const key in PUBLISHER_REGISTRY) {
    if (cleanHost.endsWith(key)) {
      return PUBLISHER_REGISTRY[key];
    }
  }

  return {
    name: cleanHost,
    type: 'Independent Web Source',
    funding: 'Undisclosed / Commercial',
    credibility: 'Unverified (Check SIFT Sources)',
    ratingColor: '#F59E0B',
    description: 'Independent domain. Perform lateral reading on Google Fact Check and Wikipedia before trusting.'
  };
}

export function buildLateralLinks(claimOrTitle, domain) {
  const cleanQuery = encodeURIComponent(
    (claimOrTitle || 'news')
      .replace(/["'“”]/g, '')
      .trim()
      .slice(0, 100)
  );

  const cleanDomain = encodeURIComponent(domain || '');

  return {
    factCheckUrl: `https://toolbox.google.com/factcheck/explorer/search/list?query=${cleanQuery}`,
    consensusSearchUrl: `https://www.google.com/search?q=${cleanQuery}+news+reuters+OR+apnews+OR+bbc`,
    domainInvestigateUrl: `https://en.wikipedia.org/wiki/Special:Search?search=${cleanDomain}+publisher+ownership`,
    googleLensUrl: 'https://lens.google.com'
  };
}
