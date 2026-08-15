/**
 * VeriLens Content Script
 * Non-destructive TreeWalker DOM text parser, cognitive hovercards,
 * in-page collapsible SIFT sidebar, and Right-Click Context Menu listener.
 */

(function () {
  'use strict';

  if (window.__verilens_injected) return;
  window.__verilens_injected = true;

  let pageAnalysisCache = {
    title: document.title || window.location.hostname,
    url: window.location.href,
    domain: window.location.hostname,
    sensationalismIndex: 12,
    paragraphCount: 0,
    wordCount: 0,
    matches: [],
    extractedText: ''
  };

  let hovercardElement = null;
  let sidebarToggleElement = null;
  let sidebarPanelElement = null;
  let activeHoverTimeout = null;

  // Initialize VeriLens cleanly
  function init() {
    createHovercardPortal();
    createSidebarDOM();
    bindKeyboardShortcuts();

    // Run initial scan safely on idle
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => runSafeDOMScan(), { timeout: 1500 });
    } else {
      setTimeout(runSafeDOMScan, 200);
    }
  }

  /**
   * Creates the in-page floating hovercard portal
   */
  function createHovercardPortal() {
    if (document.getElementById('verilens-hovercard-portal')) return;

    hovercardElement = document.createElement('div');
    hovercardElement.id = 'verilens-hovercard-portal';
    hovercardElement.innerHTML = `
      <div class="verilens-card-body">
        <div class="verilens-card-header">
          <span class="verilens-badge" id="vl-card-badge">Rhetoric</span>
          <span class="verilens-card-source" id="vl-card-tier">Tier-1 Heuristic</span>
        </div>
        <h4 class="verilens-fallacy-title" id="vl-card-title">Fallacy Detected</h4>
        <p class="verilens-explanation-text" id="vl-card-exp">Explanation goes here.</p>
        <div class="verilens-reflection-box">
          <div class="verilens-reflection-label">💡 Think Critically</div>
          <p class="verilens-reflection-text" id="vl-card-prompt">Reflection question...</p>
        </div>
        <div class="verilens-card-actions">
          <a class="verilens-btn verilens-btn-primary" id="vl-card-sift-btn" target="_blank" rel="noopener noreferrer">
            🔍 Fact-Check Claim
          </a>
          <button class="verilens-btn verilens-btn-outline" id="vl-card-close-btn">Dismiss</button>
        </div>
      </div>
    `;

    document.body.appendChild(hovercardElement);

    hovercardElement.addEventListener('mouseenter', () => clearTimeout(activeHoverTimeout));
    hovercardElement.addEventListener('mouseleave', () => hideHovercard());
    document.getElementById('vl-card-close-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      hideHovercard();
    });
  }

  /**
   * Creates the in-page Collapsible Sidebar & Floating Toggle
   */
  function createSidebarDOM() {
    if (document.getElementById('verilens-sidebar-toggle')) {
      sidebarPanelElement = document.getElementById('verilens-sidebar-panel');
      sidebarToggleElement = document.getElementById('verilens-sidebar-toggle');
      return;
    }

    // 1. Floating Toggle Button (Right Edge)
    sidebarToggleElement = document.createElement('div');
    sidebarToggleElement.id = 'verilens-sidebar-toggle';
    sidebarToggleElement.title = 'Open VeriLens SIFT Sidebar (Alt + V)';
    sidebarToggleElement.innerHTML = `
      <span class="vl-toggle-spark">⚡</span>
      <span id="vl-toggle-label">VeriLens</span>
    `;
    sidebarToggleElement.addEventListener('click', toggleSidebar);
    document.body.appendChild(sidebarToggleElement);

    // 2. Collapsible Sidebar Panel
    sidebarPanelElement = document.createElement('aside');
    sidebarPanelElement.id = 'verilens-sidebar-panel';
    sidebarPanelElement.innerHTML = `
      <div class="vl-sb-header">
        <div class="vl-sb-brand">
          <span style="font-size:18px;">⚡</span>
          <div>
            <h3>VeriLens Sidebar</h3>
            <span style="font-size:10px; color:#F59E0B; font-weight:700; text-transform:uppercase;">UNESCO MIL Companion</span>
          </div>
        </div>
        <button class="vl-sb-close" id="vl-sb-close-btn" title="Close Sidebar">✕</button>
      </div>

      <div class="vl-sb-body">
        <!-- Target Selection Card (Shown on Right Click) -->
        <div class="vl-sb-card" id="vl-sb-selection-card" style="display:none; border-color:#3B82F6; background:#172554;">
          <div class="vl-card-tag">
            <span style="color:#60A5FA;">🎯 Verified Selection</span>
            <button id="vl-close-selection-btn" style="background:transparent; border:none; color:#94A3B8; cursor:pointer; font-size:14px; padding:0 4px;">✕</button>
          </div>
          <div id="vl-selection-quote" style="font-size:13px; font-style:italic; color:#F8FAFC; margin:6px 0 8px; line-height:1.4;"></div>
          <div id="vl-selection-result" style="font-size:12px; color:#CBD5E1;"></div>
        </div>

        <!-- Live DOM Extraction Card -->
        <div class="vl-sb-card">
          <div class="vl-card-tag">
            <span>📄 Live DOM Inspector</span>
            <span id="vl-sb-domain-tag">Domain</span>
          </div>
          <div class="vl-dom-title" id="vl-sb-title">Scanning document...</div>
          <div class="vl-dom-stat-chips">
            <span class="vl-chip" id="vl-sb-words">0 words</span>
            <span class="vl-chip" id="vl-sb-paras">0 paragraphs</span>
            <span class="vl-chip vl-chip-highlight" id="vl-sb-flags">0 flags</span>
          </div>
        </div>

        <!-- Sensationalism & Publisher Dossier -->
        <div class="vl-sb-card">
          <div class="vl-card-tag">
            <span>🧭 Trust & Rhetoric Score</span>
            <span id="vl-sb-score-badge">Score</span>
          </div>
          <div style="font-size:12.5px; margin-bottom:6px; font-weight:700;" id="vl-sb-pub-name">Publisher Name</div>
          <div style="font-size:11px; color:#94A3B8; margin-bottom:10px;" id="vl-sb-pub-desc">Publisher Details</div>
          <div style="font-size:11.5px; color:#CBD5E1; line-height:1.4;" id="vl-sb-rhetoric-desc">
            Rhetoric analysis status.
          </div>
        </div>

        <!-- AI Deep Scan Trigger -->
        <div>
          <button class="vl-ai-btn" id="vl-run-gemini-btn">
            <span>🤖</span>
            <span id="vl-gemini-btn-text">Run Gemini AI Deep Scan</span>
          </button>
          <div id="vl-ai-result-box" style="display:none; margin-top:10px; background:#1E293B; border:1px solid #334155; border-radius:8px; padding:10px; font-size:12px;"></div>
        </div>

        <!-- Detected Fallacies Feed -->
        <div>
          <div class="vl-card-tag" style="margin-bottom:8px;">
            <span>🚩 Flagged Rhetorical Devices</span>
          </div>
          <div id="vl-fallacies-list">
            <div style="font-size:12px; color:#94A3B8;">No manipulative patterns detected in DOM. Measured journalistic tone.</div>
          </div>
        </div>

        <!-- SIFT Lateral Toolkit -->
        <div class="vl-sb-card">
          <div class="vl-card-tag">
            <span>🌐 1-Click SIFT Lateral Actions</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; margin-top:6px;">
            <a id="vl-sb-factcheck-btn" href="#" target="_blank" class="verilens-btn verilens-btn-primary" style="justify-content:flex-start; gap:6px; padding:8px 10px;">
              🔍 Fact-Check Article Claim
            </a>
            <a id="vl-sb-consensus-btn" href="#" target="_blank" class="verilens-btn verilens-btn-outline" style="justify-content:flex-start; gap:6px; padding:8px 10px; color:#CBD5E1!important;">
              📰 Search Consensus Coverage
            </a>
            <a id="vl-sb-wiki-btn" href="#" target="_blank" class="verilens-btn verilens-btn-outline" style="justify-content:flex-start; gap:6px; padding:8px 10px; color:#CBD5E1!important;">
              🏛️ Investigate Publisher on Wikipedia
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(sidebarPanelElement);

    document.getElementById('vl-sb-close-btn').addEventListener('click', toggleSidebar);
    document.getElementById('vl-run-gemini-btn').addEventListener('click', runGeminiScanFromSidebar);
    document.getElementById('vl-close-selection-btn')?.addEventListener('click', () => {
      document.getElementById('vl-sb-selection-card').style.display = 'none';
    });
  }

  function toggleSidebar() {
    createSidebarDOM();
    if (!sidebarPanelElement) return;
    sidebarPanelElement.classList.toggle('vl-open');
    updateSidebarUI();
  }

  function bindKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (e.altKey && (e.key === 'v' || e.key === 'V')) {
        toggleSidebar();
      }
    });
  }

  /**
   * Handles Right-Click Selection Verification
   * Immediately slides out sidebar first, then streams results.
   */
  function handleSelectionVerification(selectedText) {
    if (!selectedText || selectedText.trim().length === 0) return;

    createSidebarDOM();

    // 1. Instantly slide out sidebar
    if (sidebarPanelElement) {
      sidebarPanelElement.classList.add('vl-open');
    }

    // 2. Populate Selection Card immediately
    const selectionCard = document.getElementById('vl-sb-selection-card');
    const quoteEl = document.getElementById('vl-selection-quote');
    const resultEl = document.getElementById('vl-selection-result');

    if (!selectionCard || !quoteEl || !resultEl) return;

    selectionCard.style.display = 'block';
    selectionCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    quoteEl.textContent = `"${selectedText.length > 150 ? selectedText.slice(0, 150) + '...' : selectedText}"`;

    // 3. Instant local heuristic check
    const localMatches = window.VeriLensHeuristics ? window.VeriLensHeuristics.scanText(selectedText) : [];
    let localHtml = '';
    if (localMatches.length > 0) {
      localHtml = `<div style="color:#FBBF24; margin-bottom:6px;"><strong>⚠️ ${localMatches.length} Pattern(s) Matched:</strong> ${localMatches.map(m => m.name).join(', ')}</div>`;
    }

    resultEl.innerHTML = localHtml + `<div style="display:flex; align-items:center; gap:6px; color:#94A3B8; margin-top:4px;"><span>⏳</span><span>Analyzing with Gemini Flash-Lite...</span></div>`;

    // 4. Send to Gemini Gateway
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({
        type: 'RUN_GEMINI_DEEP_SCAN',
        payload: {
          text: selectedText,
          title: pageAnalysisCache.title || 'Selected Text Quote',
          url: window.location.href
        }
      }, (res) => {
        if (!res || !res.success) {
          resultEl.innerHTML = localHtml + `<span style="color:#F87171;">⚠️ Gemini Note: ${res ? res.error : 'Gateway busy'}. Displaying heuristic analysis.</span>`;
        } else {
          const d = res.data;
          let html = localHtml + `
            <div style="font-weight:700; color:#38BDF8; margin-bottom:4px;">🤖 Gemini Analysis:</div>
            <div><strong>Tone:</strong> ${d.primaryTone || 'Evaluated'} (Sensationalism: ${d.sensationalismScore}/100)</div>
          `;
          (d.fallaciesFound || []).forEach(f => {
            html += `<div style="margin-top:4px;">• <strong>${f.fallacy}:</strong> <em>${f.explanation}</em></div>`;
            html += `<div style="color:#34D399; font-size:11px; margin-top:2px;">💡 <strong>Reflection:</strong> ${f.reflection}</div>`;
          });

          if (window.VeriLensSifter) {
            const lateral = window.VeriLensSifter.buildLateralLinks(selectedText, window.location.hostname);
            html += `
              <div style="margin-top:8px;">
                <a href="${lateral.factCheckUrl}" target="_blank" class="verilens-btn verilens-btn-primary" style="font-size:11px; padding:6px 10px; width:100%; text-align:center; justify-content:center;">
                  🔍 SIFT: Search Fact-Checks on this Quote
                </a>
              </div>
            `;
          }

          resultEl.innerHTML = html;
        }
      });
    }
  }

  /**
   * Safe, Non-Destructive DOM Scanner
   * Uses standard TreeWalker on NodeFilter.SHOW_TEXT.
   */
  function runSafeDOMScan() {
    if (!window.VeriLensHeuristics) return;

    pageAnalysisCache.title = document.title || window.location.hostname;
    pageAnalysisCache.url = window.location.href;
    pageAnalysisCache.domain = window.location.hostname;

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || node.nodeValue.trim().length < 15) {
            return NodeFilter.FILTER_REJECT;
          }
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;

          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'textarea', 'input', 'noscript', 'code', 'pre', 'svg'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('#verilens-hovercard-portal') ||
              parent.closest('#verilens-sidebar-panel') ||
              parent.closest('#verilens-sidebar-toggle') ||
              parent.classList.contains('verilens-flagged-text')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
      if (textNodes.length >= 120) break;
    }

    let allText = '';
    const allMatches = [];
    let spanIndexCounter = 0;

    for (const textNode of textNodes) {
      const text = textNode.nodeValue;
      allText += ' ' + text;

      const matches = window.VeriLensHeuristics.scanText(text);
      if (matches.length === 0) continue;

      matches.sort((a, b) => a.startIndex - b.startIndex);

      let currentNode = textNode;
      let offset = 0;

      for (const match of matches) {
        const start = match.startIndex - offset;
        const len = match.matchedText.length;

        if (start < 0 || start + len > currentNode.nodeValue.length) {
          continue;
        }

        try {
          const matchNode = currentNode.splitText(start);
          const afterNode = matchNode.splitText(len);

          const span = document.createElement('span');
          span.className = `verilens-flagged-text verilens-severity-${match.severity}`;
          span.dataset.vlId = match.id;
          span.dataset.vlName = encodeURIComponent(match.name);
          span.dataset.vlExp = encodeURIComponent(match.explanation);
          span.dataset.vlPrompt = encodeURIComponent(match.reflection);
          span.dataset.vlMatch = encodeURIComponent(match.matchedText);
          span.dataset.vlSeverity = match.severity;
          span.id = `vl-span-match-${++spanIndexCounter}`;
          span.textContent = matchNode.nodeValue;

          matchNode.parentNode.replaceChild(span, matchNode);
          bindSingleSpanEvents(span);

          match.elementId = span.id;
          allMatches.push(match);

          currentNode = afterNode;
          offset += start + len;
        } catch (err) {
          break;
        }
      }
    }

    const words = allText.trim().split(/\s+/).filter(w => w.length > 0).length;
    pageAnalysisCache.extractedText = allText.slice(0, 3500);
    pageAnalysisCache.matches = allMatches;
    pageAnalysisCache.wordCount = words;
    pageAnalysisCache.paragraphCount = textNodes.length;
    pageAnalysisCache.sensationalismIndex = window.VeriLensHeuristics.calculateSensationalismIndex(allText, allMatches);

    updateSidebarUI();
    notifyBackground();
  }

  function bindSingleSpanEvents(span) {
    span.addEventListener('mouseenter', (e) => {
      clearTimeout(activeHoverTimeout);
      showHovercard(e.currentTarget);
    });

    span.addEventListener('mouseleave', () => {
      activeHoverTimeout = setTimeout(hideHovercard, 300);
    });
  }

  function showHovercard(targetSpan) {
    if (!hovercardElement) return;

    const name = decodeURIComponent(targetSpan.dataset.vlName || 'Manipulation Detected');
    const exp = decodeURIComponent(targetSpan.dataset.vlExp || '');
    const prompt = decodeURIComponent(targetSpan.dataset.vlPrompt || '');
    const matched = decodeURIComponent(targetSpan.dataset.vlMatch || '');
    const severity = targetSpan.dataset.vlSeverity || 'medium';

    document.getElementById('vl-card-title').textContent = name;
    document.getElementById('vl-card-exp').textContent = exp;
    document.getElementById('vl-card-prompt').textContent = prompt;

    const badge = document.getElementById('vl-card-badge');
    badge.textContent = severity.toUpperCase() + ' IMPACT';
    badge.className = `verilens-badge verilens-badge-${severity}`;

    const lateralData = window.VeriLensSifter ? window.VeriLensSifter.buildLateralLinks(matched, window.location.hostname) : null;
    const siftBtn = document.getElementById('vl-card-sift-btn');
    if (lateralData) {
      siftBtn.href = lateralData.consensusSearchUrl;
      siftBtn.textContent = '🔍 SIFT: Fact-Check Phrase';
    }

    const rect = targetSpan.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = rect.bottom + scrollY + 8;
    let left = rect.left + scrollX;

    if (left + 330 > window.innerWidth) {
      left = Math.max(10, window.innerWidth - 340);
    }

    hovercardElement.style.top = `${top}px`;
    hovercardElement.style.left = `${left}px`;
    hovercardElement.style.display = 'block';

    recordInsightViewed(name);
  }

  function hideHovercard() {
    if (hovercardElement) {
      hovercardElement.style.display = 'none';
    }
  }

  /**
   * Updates Sidebar UI with clean data
   */
  function updateSidebarUI() {
    if (!sidebarPanelElement) return;

    const domain = pageAnalysisCache.domain || window.location.hostname;
    const title = pageAnalysisCache.title || document.title;
    const score = pageAnalysisCache.sensationalismIndex;
    const matches = pageAnalysisCache.matches || [];

    const toggleLabel = document.getElementById('vl-toggle-label');
    if (toggleLabel) {
      toggleLabel.textContent = `VeriLens (${matches.length} Flags)`;
    }

    document.getElementById('vl-sb-domain-tag').textContent = domain;
    document.getElementById('vl-sb-title').textContent = title.length > 55 ? title.slice(0, 55) + '...' : title;
    document.getElementById('vl-sb-words').textContent = `${pageAnalysisCache.wordCount} words`;
    document.getElementById('vl-sb-paras').textContent = `${pageAnalysisCache.paragraphCount} nodes`;
    document.getElementById('vl-sb-flags').textContent = `${matches.length} flags`;

    const dossier = window.VeriLensSifter ? window.VeriLensSifter.getDomainDossier(domain) : {
      name: domain,
      type: 'Independent Domain',
      credibility: 'Check SIFT Sources'
    };

    document.getElementById('vl-sb-pub-name').textContent = dossier.name;
    document.getElementById('vl-sb-pub-desc').textContent = `${dossier.type} • ${dossier.credibility}`;

    const scoreBadge = document.getElementById('vl-sb-score-badge');
    const rhetoricDesc = document.getElementById('vl-sb-rhetoric-desc');

    if (score >= 60) {
      scoreBadge.textContent = `High: ${Math.round(score/10)}/10`;
      scoreBadge.style.color = '#EF4444';
      rhetoricDesc.innerHTML = `⚠️ <strong>High Emotional Intensity</strong>: Detected ${matches.length} manipulation/urgency cues in text.`;
    } else if (score >= 30) {
      scoreBadge.textContent = `Moderate: ${Math.round(score/10)}/10`;
      scoreBadge.style.color = '#F59E0B';
      rhetoricDesc.innerHTML = `⚖️ <strong>Mixed Nuance</strong>: Some persuasive or unverified phrasing detected.`;
    } else {
      scoreBadge.textContent = `Reflective: ${Math.round(score/10)}/10`;
      scoreBadge.style.color = '#10B981';
      rhetoricDesc.innerHTML = `✨ <strong>Measured Reporting</strong>: Factual tone without significant sensationalism cues.`;
    }

    // Populate Flagged Devices List
    const fallaciesContainer = document.getElementById('vl-fallacies-list');
    if (matches.length === 0) {
      fallaciesContainer.innerHTML = `<div style="font-size:12px; color:#94A3B8;">No manipulative patterns detected in DOM. Measured journalistic tone.</div>`;
    } else {
      fallaciesContainer.innerHTML = '';
      matches.slice(0, 15).forEach((m) => {
        const item = document.createElement('div');
        item.className = 'vl-fallacy-item';
        item.innerHTML = `
          <div class="vl-fallacy-item-title">${m.name}</div>
          <div class="vl-fallacy-item-quote">"${m.matchedText}"</div>
        `;
        item.addEventListener('click', () => {
          if (m.elementId) {
            const target = document.getElementById(m.elementId);
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              target.style.transition = 'background-color 0.4s ease';
              target.style.backgroundColor = 'rgba(245, 158, 11, 0.45)';
              setTimeout(() => { target.style.backgroundColor = ''; }, 1400);
            }
          }
        });
        fallaciesContainer.appendChild(item);
      });
    }

    // SIFT Lateral Buttons
    if (window.VeriLensSifter) {
      const lateral = window.VeriLensSifter.buildLateralLinks(title, domain);
      document.getElementById('vl-sb-factcheck-btn').href = lateral.factCheckUrl;
      document.getElementById('vl-sb-consensus-btn').href = lateral.consensusSearchUrl;
      document.getElementById('vl-sb-wiki-btn').href = lateral.domainInvestigateUrl;
    }
  }

  function runGeminiScanFromSidebar() {
    const btn = document.getElementById('vl-run-gemini-btn');
    const resultBox = document.getElementById('vl-ai-result-box');
    const btnText = document.getElementById('vl-gemini-btn-text');

    btn.disabled = true;
    btnText.textContent = 'Analyzing with Gemini...';
    resultBox.style.display = 'block';
    resultBox.innerHTML = `<em>Connecting to Gemini AI Gateway & reading DOM text...</em>`;

    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({
        type: 'RUN_GEMINI_DEEP_SCAN',
        payload: {
          text: pageAnalysisCache.extractedText,
          title: pageAnalysisCache.title,
          url: pageAnalysisCache.url
        }
      }, (res) => {
        btn.disabled = false;
        btnText.textContent = 'Run Gemini AI Deep Scan';

        if (!res || !res.success) {
          resultBox.innerHTML = `<span style="color:#EF4444;">⚠️ AI Error: ${res ? res.error : 'Connection failed'}. Check your API Key in Extension Options (⚙️).</span>`;
        } else {
          const d = res.data;
          let html = `
            <div style="font-weight:700; color:#38BDF8; margin-bottom:4px;">🤖 Gemini Analysis Result:</div>
            <div><strong>Tone:</strong> ${d.primaryTone || 'Informative'}</div>
            <div><strong>Sensationalism Score:</strong> ${d.sensationalismScore}/100</div>
            <div style="margin-top:6px;"><strong>Key Fallacies:</strong></div>
            <ul style="padding-left:16px; margin:4px 0;">
          `;
          (d.fallaciesFound || []).forEach(f => {
            html += `<li><strong>${f.fallacy}:</strong> "${f.quote}" — <em>${f.explanation}</em></li>`;
          });
          html += `</ul>`;
          if (d.siftAction) {
            html += `<div style="margin-top:6px; color:#34D399;"><strong>🧭 SIFT Action:</strong> ${d.siftAction}</div>`;
          }
          resultBox.innerHTML = html;
        }
      });
    }
  }

  function recordInsightViewed(fallacyName) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['vl_streak_count', 'vl_fallacies_spotted'], (res) => {
        const streak = (res.vl_streak_count || 0) + 1;
        const list = res.vl_fallacies_spotted || [];
        if (!list.includes(fallacyName)) list.push(fallacyName);
        chrome.storage.local.set({ vl_streak_count: streak, vl_fallacies_spotted: list });
      });
    }
  }

  function notifyBackground() {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage({
        type: 'VERILENS_PAGE_DATA_UPDATED',
        data: pageAnalysisCache
      }, () => {
        if (chrome.runtime.lastError) { /* ignore */ }
      });
    }
  }

  if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
      if (msg.type === 'GET_PAGE_ANALYSIS') {
        sendResponse(pageAnalysisCache);
      } else if (msg.type === 'CONTEXT_MENU_VERIFY_SELECTION') {
        handleSelectionVerification(msg.text);
      }
      return true;
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
