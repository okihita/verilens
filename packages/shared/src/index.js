const heuristics = require('./heuristics.js');
const sifter = require('./sifter.js');
const fallaciesData = require('./fallacies.json');
const scenariosData = require('./scenarios.json');
const illustrationsData = require('./illustrations.js');

module.exports = {
  ...heuristics,
  ...sifter,
  fallacies: fallaciesData.fallacies,
  scenarios: scenariosData.scenarios,
  FALLACY_ILLUSTRATIONS: illustrationsData.FALLACY_ILLUSTRATIONS || {}
};
