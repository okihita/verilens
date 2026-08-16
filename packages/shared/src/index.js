const heuristics = require('./heuristics.js');
const sifter = require('./sifter.js');
const fallaciesData = require('./fallacies.json');
const scenariosData = require('./scenarios.json');
const illustrationsData = require('./illustrations.js');

function idToSlug(id) {
  return (id || '').replace(/_/g, '-');
}

function slugToId(slug) {
  return (slug || '').replace(/-/g, '_');
}

function getFallacyBySlug(slug) {
  const targetId = slugToId(slug);
  return fallaciesData.fallacies.find(f => f.id === targetId || (f.slug && f.slug === slug));
}

module.exports = {
  ...heuristics,
  ...sifter,
  fallacies: fallaciesData.fallacies,
  scenarios: scenariosData.scenarios,
  FALLACY_ILLUSTRATIONS: illustrationsData.FALLACY_ILLUSTRATIONS || {},
  idToSlug,
  slugToId,
  getFallacyBySlug
};
