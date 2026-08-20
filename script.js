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
const WORKSHOP_ICONS = [
  '📊', '⚡', '🧾', '🏛️', '🏥', '🔮', '⚖️',
  '👷', '🏗️', '📣', '🤖', '🧑‍💼', '🔒', '💬',
];

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'New Zealand',
  'Ireland', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'Belgium',
  'Switzerland', 'Austria', 'Sweden', 'Norway', 'Denmark', 'Finland', 'Iceland',
  'Portugal', 'Greece', 'Poland', 'Czech Republic', 'Hungary', 'Romania',
  'Bulgaria', 'Ukraine', 'Mexico', 'Brazil', 'Argentina', 'Chile', 'Colombia',
  'Peru', 'South Africa', 'Nigeria', 'Kenya', 'Egypt', 'India', 'Pakistan',
  'Bangladesh', 'China', 'Japan', 'South Korea', 'Singapore', 'Philippines',
  'Indonesia', 'Malaysia', 'Thailand', 'Vietnam', 'Israel', 'United Arab Emirates',
  'Saudi Arabia', 'Turkey', 'Other',
];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
  'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Puerto Rico',
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
const countrySelect = document.getElementById('country');
const stateField = document.getElementById('state-field');
const stateSelect = document.getElementById('state');
const govOrgSelect = document.getElementById('gov_org');
const govLevelField = document.getElementById('gov_level-field');
const govLevelSelect = document.getElementById('gov_level');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');
const seriesFieldset = document.querySelector('.series-fieldset');
const seriesList = document.getElementById('series-list');
const seriesCount = document.getElementById('series-count');
const selectAllBtn = document.getElementById('select-all-btn');

populateSelect(countrySelect, COUNTRIES, 'Select a country');
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
  badge.textContent = WORKSHOP_ICONS[i] || '📌';

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
  stateField.hidden = !isUS;
  stateSelect.required = isUS;
  if (!isUS) stateSelect.value = '';
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
    state: stateField.hidden ? null : stateSelect.value,
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
    govLevelField.hidden = true;
    updateSeriesCount();
  } catch (err) {
    formMessage.textContent = err.message || 'Something went wrong. Please try again.';
  } finally {
    submitBtn.disabled = false;
  }
});
