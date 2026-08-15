/**
 * VeriLens Options Page Logic
 */

const DEFAULT_MODEL = 'gemini-2.0-flash-lite';

document.addEventListener('DOMContentLoaded', () => {
  loadOptions();

  document.getElementById('save-btn').addEventListener('click', saveOptions);
  document.getElementById('reset-stats-btn').addEventListener('click', resetStats);
});

function loadOptions() {
  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.get(['vl_custom_api_key', 'vl_sensitivity', 'vl_gemini_model'], (res) => {
      const currentKey = res.vl_custom_api_key || '';
      document.getElementById('api-key-input').value = currentKey;

      const currentModel = res.vl_gemini_model || DEFAULT_MODEL;
      const modelSelect = document.getElementById('model-select');
      if (modelSelect) modelSelect.value = currentModel;

      if (res.vl_sensitivity) {
        const radio = document.querySelector(`input[name="sensitivity"][value="${res.vl_sensitivity}"]`);
        if (radio) radio.checked = true;
      }
    });
  }
}

function saveOptions() {
  const apiKey = document.getElementById('api-key-input').value.trim();
  const model = document.getElementById('model-select')?.value || DEFAULT_MODEL;
  const sensitivity = document.querySelector('input[name="sensitivity"]:checked')?.value || 'normal';

  if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
    chrome.storage.local.set({
      vl_custom_api_key: apiKey,
      vl_gemini_model: model,
      vl_sensitivity: sensitivity
    }, () => {
      showStatus('✓ Preferences & Gemini Model configuration saved!');
    });
  } else {
    showStatus('✓ Preferences saved (Local mode)');
  }
}

function resetStats() {
  if (confirm('Are you sure you want to reset your local Cognitive Gym streaks and mastered fallacies?')) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({
        vl_streak_count: 0,
        vl_fallacies_spotted: []
      }, () => {
        showStatus('✓ Learning stats have been reset to zero.');
      });
    }
  }
}

function showStatus(text) {
  const msgEl = document.getElementById('status-message');
  msgEl.textContent = text;
  msgEl.style.display = 'block';
  setTimeout(() => {
    msgEl.style.display = 'none';
  }, 3000);
}
