const test = require('node:test');
const assert = require('node:assert/strict');

const { normalizeSettingsPayload } = require('../src/services/settingsPayload');

test('normalizes homepage impact stats for the public home page', () => {
  const normalized = normalizeSettingsPayload({
    organizationName: 'C4PDMD',
    projectsCompleted: '250+',
    livesImpacted: '25,000+',
    communitiesReached: '50+',
    activeVolunteers: '98',
    yearsOfExperience: '15+',
  });

  assert.equal(normalized.organizationName, 'C4PDMD');
  assert.equal(normalized.projectsCompleted, '250+');
  assert.equal(normalized.livesImpacted, '25,000+');
  assert.equal(normalized.communitiesReached, '50+');
  assert.equal(normalized.activeVolunteers, '98');
  assert.equal(normalized.yearsOfExperience, '15+');
  assert.equal(normalized.evidenceBasedText, 'Using data and research to drive sustainable change');
});

test('falls back to empty values when impact stats are missing', () => {
  const normalized = normalizeSettingsPayload({ organizationName: 'C4PDMD' });

  assert.equal(normalized.projectsCompleted, '');
  assert.equal(normalized.livesImpacted, '');
  assert.equal(normalized.communitiesReached, '');
  assert.equal(normalized.activeVolunteers, '');
  assert.equal(normalized.yearsOfExperience, '');
  assert.equal(normalized.evidenceBasedText, '');
});
