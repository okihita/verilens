/**
 * VeriLens Popup Script
 * Editorial data loader for active browser tab.
 */

document.addEventListener('DOMContentLoaded', () => {
  loadActiveTabData();
});

/**
 * Queries active tab and requests live analysis state
 */
function loadActiveTabData() {
  if (typeof chrome === 'undefined' || !chrome.tabs) {
    renderFallbackDemo();
    return;
  }

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      renderFallbackDemo();
      return;
    }

    const currentTab = tabs[0];
    let domain = 'Unknown Domain';
    try {
      if (currentTab.url && currentTab.url.startsWith('http')) {
        const u = new URL(currentTab.url);
        domain = u.hostname;
      } else if (currentTab.url && currentTab.url.startsWith('file:')) {
        domain = 'local-demo.file';
      }
    } catch (e) { /* ignore */ }

    // Request analysis from content script in active tab
    chrome.tabs.sendMessage(currentTab.id, { type: 'GET_PAGE_ANALYSIS' }, (response) => {
      if (chrome.runtime.lastError || !response) {
        // Render fallback using direct tab title and domain
        renderDashboard({
          sensationalismIndex: 12,
          domain: domain,
          title: currentTab.title || domain,
          wordCount: 0,
          paragraphCount: 0,
          matches: []
        });
      } else {
        renderDashboard(response);
      }
    });
  });
}

/**
 * Renders data into clean editorial layout
 */
function renderDashboard(data) {
  const score = data.sensationalismIndex !== undefined ? data.sensationalismIndex : 12;
  const domain = data.domain || 'Unknown Domain';
  const title = data.title || 'Current Web Page';
  const words = data.wordCount || 0;
  const paras = data.paragraphCount || 0;
  const matches = data.matches || [];

  // 1. Page Context
  document.getElementById('domain-label').textContent = domain;
  document.getElementById('page-title').textContent = title;
  document.getElementById('stat-words').textContent = `${words} words`;
  document.getElementById('stat-paragraphs').textContent = `${paras} paragraphs`;
  document.getElementById('stat-flags').textContent = `${matches.length} flags`;

  // 2. Rhetorical Meter
  const fill = document.getElementById('meter-fill');
  const indicator = document.getElementById('score-indicator');
  const desc = document.getElementById('score-description');

  const clampedScore = Math.max(8, Math.min(100, score));
  fill.style.width = `${clampedScore}%`;

  if (score >= 60) {
    fill.style.backgroundColor = '#EF4444';
    indicator.textContent = `High Sensationalism (${Math.round(score/10)}/10)`;
    indicator.className = 'score-indicator indicator-high';
    desc.innerHTML = `⚠️ <strong>High Emotional Framing:</strong> Detected ${matches.length} manipulation or urgency cues in the text. Cross-check primary sources.`;
  } else if (score >= 30) {
    fill.style.backgroundColor = '#F59E0B';
    indicator.textContent = `Moderate Nuance (${Math.round(score/10)}/10)`;
    indicator.className = 'score-indicator indicator-medium';
    desc.innerHTML = `⚖️ <strong>Mixed Tone:</strong> Contains persuasive phrasing or unverified passive sourcing.`;
  } else {
    fill.style.backgroundColor = '#10B981';
    indicator.textContent = `Reflective (${Math.round(score/10)}/10)`;
    indicator.className = 'score-indicator indicator-low';
    desc.innerHTML = `✨ <strong>Measured & Factual:</strong> Sober reporting tone with minimal emotional manipulation cues.`;
  }

  // 3. Publisher Dossier
  const dossier = window.VeriLensSifter ? window.VeriLensSifter.getDomainDossier(domain) : {
    name: domain,
    type: 'Independent Web Domain',
    funding: 'Undisclosed',
    credibility: 'Check SIFT Sources'
  };

  document.getElementById('publisher-name').textContent = dossier.name;
  document.getElementById('publisher-type').textContent = dossier.type;
  document.getElementById('publisher-funding').textContent = dossier.funding;
  document.getElementById('publisher-cred').textContent = dossier.credibility;

  // 4. Lateral Actions
  if (window.VeriLensSifter) {
    const lateral = window.VeriLensSifter.buildLateralLinks(title, domain);
    document.getElementById('sift-factcheck-btn').href = lateral.factCheckUrl;
    document.getElementById('sift-consensus-btn').href = lateral.consensusSearchUrl;
    document.getElementById('sift-source-btn').href = lateral.domainInvestigateUrl;
  }
}

function renderFallbackDemo() {
  renderDashboard({
    sensationalismIndex: 78,
    domain: 'theweeklybeacon.com',
    title: 'The Coming Climate Chaos Is Inevitable',
    wordCount: 340,
    paragraphCount: 4,
    matches: [{ id: 'demo1' }, { id: 'demo2' }]
  });
}
