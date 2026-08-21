// Real Fall 2026 Live Series names, matching the "Selected Event Series"
// multi-select checklist rendered on the live innovate-us.org/register page
// (the Zoom Events widget renders this client-side, so it wasn't visible
// in a plain HTML fetch). workshop_series stores the checked series,
// comma-joined, per the Directus schema note.
const WORKSHOP_SERIES = [
  'Practical Approaches to Evaluating AI for Public Benefit',
  'AI, Energy, and the Environment: Use, Policy, and Tradeoffs',
  'AI for Public-Sector Procurement',
  'Democratic and Public AI: Practical Strategies for Buying, Building, and Governing AI',
  'AI in Public Health',
  'The Good, the Bad and the Ugly of Predictive AI',
  'Using AI in Public Sector Legal Practice',
  'Worker-Centered AI Adoption in the Public Sector',
  'AI Insourcing and the Government Product Model',
  'Amplify: Mastering Public Communication in the AI Age',
  'Working with AI Agents in the Public Sector: What Works (and What Doesn’t)',
  'AI for Public HR Professionals',
  'AI and Cybersecurity in the Public Sector for the Non-Expert',
  'The Prompting Lab: Real Prompts, Real Challenges, All Platforms',
];

// Decorative icons only — arbitrary, swappable, not tied to real site data.
// Inner path content of real Lucide icons (lucide.dev, ISC-licensed),
// one per series topic — a consistent stroke-icon system instead of emoji.
const WORKSHOP_ICON_PATHS = [
  '<rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>', // clipboard-check
  '<path d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"/>', // zap
  '<path d="M12 17V7"/><path d="M16 8h-6a2 2 0 0 0 0 4h4a2 2 0 0 1 0 4H8"/><path d="M4 3a1 1 0 0 1 1-1 1.3 1.3 0 0 1 .7.2l.933.6a1.3 1.3 0 0 0 1.4 0l.934-.6a1.3 1.3 0 0 1 1.4 0l.933.6a1.3 1.3 0 0 0 1.4 0l.933-.6a1.3 1.3 0 0 1 1.4 0l.934.6a1.3 1.3 0 0 0 1.4 0l.933-.6A1.3 1.3 0 0 1 19 2a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1 1.3 1.3 0 0 1-.7-.2l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.934.6a1.3 1.3 0 0 1-1.4 0l-.933-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-1.4 0l-.934-.6a1.3 1.3 0 0 0-1.4 0l-.933.6a1.3 1.3 0 0 1-.7.2 1 1 0 0 1-1-1z"/>', // receipt
  '<path d="M10 18v-7"/><path d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"/><path d="M14 18v-7"/><path d="M18 18v-7"/><path d="M3 22h18"/><path d="M6 18v-7"/>', // landmark
  '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>', // heart-pulse
  '<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.972a4 4 0 0 1 3.6 2.2"/><path d="M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45"/>', // shuffle
  '<path d="M12 3v18"/><path d="m19 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"/><path d="m5 8 3 8a5 5 0 0 1-6 0zV7"/><path d="M7 21h10"/>', // scale
  '<path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5"/><path d="M14 6a6 6 0 0 1 6 6v3"/><path d="M4 15v-3a6 6 0 0 1 6-6"/><rect x="2" y="15" width="20" height="4" rx="1"/>', // hard-hat
  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z"/>', // wrench
  '<path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/><path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/><path d="M8 6v8"/>', // megaphone
  '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>', // bot
  '<path d="M16 10h2"/><path d="M16 14h2"/><path d="M6.17 15a3 3 0 0 1 5.66 0"/><circle cx="9" cy="11" r="2"/><rect x="2" y="5" width="20" height="14" rx="2"/>', // id-card
  '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>', // shield-check
  '<path d="M12 19h8"/><path d="m4 17 6-6-6-6"/>', // terminal
];

function iconSvg(innerPaths) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${innerPaths}</svg>`;
}

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO',
  'CT', 'DE', 'DC', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
  'LA', 'ME', 'MD', 'MA', 'MI', 'MN',
  'MS', 'MO', 'MT', 'NE', 'NV', 'NH',
  'NJ', 'NM', 'NY', 'NC', 'ND',
  'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA',
  'WA', 'WV', 'WI', 'WY', 'PR',
];

function populateSelect(select, options, placeholder) {
  const placeholderOpt = document.createElement('option');
  placeholderOpt.value = '';
  placeholderOpt.disabled = true;
  placeholderOpt.selected = true;
  placeholderOpt.textContent = placeholder;
  select.appendChild(placeholderOpt);

  for (const value of options) {
    const opt = document.createElement('option');
    opt.value = value;
    opt.textContent = value;
    select.appendChild(opt);
  }
}

const form = document.getElementById('registration-form');
const countrySelect = document.getElementById('country_select');
const stateField = document.getElementById('state-field');
const stateSelect = document.getElementById('state_select');
const nonUsField = document.getElementById('non-us-field');
const nonUsRegion = document.getElementById('non_us_region');
const govOrgSelect = document.getElementById('gov_org');
const govLevelField = document.getElementById('gov_level-field');
const govLevelSelect = document.getElementById('gov_level');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const seriesFieldset = document.querySelector('.series-fieldset');
const seriesList = document.getElementById('series-list');
const seriesCount = document.getElementById('series-count');
const selectAllBtn = document.getElementById('select-all-btn');

populateSelect(stateSelect, US_STATES, 'Select a state');

WORKSHOP_SERIES.forEach((series, i) => {
  const item = document.createElement('div');
  item.className = 'series-item';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `series-${i}`;
  checkbox.name = 'workshop_series';
  checkbox.value = series;

  const badge = document.createElement('span');
  badge.className = 'icon-badge';
  badge.setAttribute('aria-hidden', 'true');
  badge.innerHTML = iconSvg(WORKSHOP_ICON_PATHS[i] || '');

  const label = document.createElement('label');
  label.htmlFor = `series-${i}`;
  label.className = 'title';
  label.textContent = series;

  item.appendChild(checkbox);
  item.appendChild(badge);
  item.appendChild(label);
  seriesList.appendChild(item);
});

function getSelectedSeries() {
  return Array.from(seriesList.querySelectorAll('input[type="checkbox"]:checked')).map((el) => el.value);
}

function updateSeriesCount() {
  const selected = getSelectedSeries();
  seriesCount.innerHTML = `You are registering for <strong>${selected.length}</strong> event series.`;
  selectAllBtn.textContent = selected.length === WORKSHOP_SERIES.length ? 'Deselect All Series' : 'Select All Series';
  return selected;
}

selectAllBtn.addEventListener('click', () => {
  const allChecked = getSelectedSeries().length === WORKSHOP_SERIES.length;
  seriesList.querySelectorAll('input[type="checkbox"]').forEach((el) => {
    el.checked = !allChecked;
  });
  if (updateSeriesCount().length > 0) seriesFieldset.classList.remove('invalid');
});

seriesList.addEventListener('change', () => {
  const selected = updateSeriesCount();
  if (selected.length > 0) seriesFieldset.classList.remove('invalid');
});

countrySelect.addEventListener('change', () => {
  const isUS = countrySelect.value === 'United States';
  const isOther = countrySelect.value !== '' && !isUS;

  stateField.hidden = !isUS;
  stateSelect.required = isUS;
  if (!isUS) stateSelect.value = '';

  nonUsField.hidden = !isOther;
  if (!isOther) nonUsRegion.value = '';
});

function getGovOrg() {
  return govOrgSelect.value;
}

govOrgSelect.addEventListener('change', () => {
  const selectedOption = govOrgSelect.selectedOptions[0];
  const showsLevel = selectedOption ? selectedOption.dataset.showsLevel === 'true' : false;
  govLevelField.hidden = !showsLevel;
  govLevelSelect.required = showsLevel;
  if (!showsLevel) govLevelSelect.value = '';
});

// Force a blank slate on every load/refresh — browsers can restore previously
// selected values on reload without firing 'change', which would otherwise
// leave conditional fields out of sync with the (restored) selection.
countrySelect.value = '';
stateField.hidden = true;
stateSelect.required = false;
nonUsField.hidden = true;

govOrgSelect.value = '';
govLevelField.hidden = true;
govLevelSelect.required = false;

function getWorkshopParam() {
  return new URLSearchParams(window.location.search).get('workshop');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!form.reportValidity()) return;

  const selectedSeries = getSelectedSeries();
  if (selectedSeries.length === 0) {
    seriesFieldset.classList.add('invalid');
    seriesFieldset.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  const payload = {
    first_name: document.getElementById('first_name').value.trim(),
    last_name: document.getElementById('last_name').value.trim(),
    email: document.getElementById('email').value.trim(),
    country: countrySelect.value,
    state: !stateField.hidden ? stateSelect.value : (!nonUsField.hidden ? nonUsRegion.value.trim() || null : null),
    gov_org: getGovOrg(),
    gov_level: govLevelField.hidden ? null : govLevelSelect.value,
    workshop_series: selectedSeries.join(', '),
    workshops: getWorkshopParam(),
    newsletter: document.getElementById('newsletter').checked,
    consent_at: new Date().toISOString(),
  };

  submitBtn.disabled = true;
  formMessage.textContent = 'Submitting…';

  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(result.error || 'Submission failed. Please try again.');
    }

    formMessage.textContent = 'You’re registered! Check your email for details.';
    form.reset();
    stateField.hidden = true;
    nonUsField.hidden = true;
    govLevelField.hidden = true;
    updateSeriesCount();
  } catch (err) {
    formMessage.textContent = err.message || 'Something went wrong. Please try again.';
  } finally {
    submitBtn.disabled = false;
  }
});
