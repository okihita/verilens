const heuristics = require('./heuristics.js');
const sifter = require('./sifter.js');
const fallaciesData = require('./fallacies.json');
const scenariosData = require('./scenarios.json');

module.exports = {
  ...heuristics,
  ...sifter,
  fallacies: fallaciesData.fallacies,
  scenarios: scenariosData.scenarios
};
