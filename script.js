// Hardcoded to a real, currently-listed InnovateUS workshop series
// (innovate-us.org/workshops, Fall 2026 Live Series) since this is a
// hypothetical registration form, not tied to a live event page.
const WORKSHOP_SERIES = 'Practical Approaches to Evaluating AI for Public Benefit';

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
const seriesNameEl = document.getElementById('series-name');
const countrySelect = document.getElementById('country');
const stateField = document.getElementById('state-field');
const stateSelect = document.getElementById('state');
const govOrgSelect = document.getElementById('gov_org');
const govLevelField = document.getElementById('gov_level-field');
const govLevelSelect = document.getElementById('gov_level');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');

seriesNameEl.textContent = WORKSHOP_SERIES;
populateSelect(countrySelect, COUNTRIES, 'Select a country');
populateSelect(stateSelect, US_STATES, 'Select a state');

countrySelect.addEventListener('change', () => {
  const isUS = countrySelect.value === 'United States';
  stateField.hidden = !isUS;
  stateSelect.required = isUS;
  if (!isUS) stateSelect.value = '';
});

govOrgSelect.addEventListener('change', () => {
  const isYes = govOrgSelect.value === 'Yes';
  govLevelField.hidden = !isYes;
  if (!isYes) govLevelSelect.value = '';
});

function getWorkshopParam() {
  return new URLSearchParams(window.location.search).get('workshop');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!form.reportValidity()) return;

  const payload = {
    first_name: document.getElementById('first_name').value.trim(),
    last_name: document.getElementById('last_name').value.trim(),
    email: document.getElementById('email').value.trim(),
    country: countrySelect.value,
    state: stateField.hidden ? null : stateSelect.value,
    gov_org: govOrgSelect.value,
    gov_level: govLevelField.hidden ? null : govLevelSelect.value,
    workshop_series: WORKSHOP_SERIES,
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
  } catch (err) {
    formMessage.textContent = err.message || 'Something went wrong. Please try again.';
  } finally {
    submitBtn.disabled = false;
  }
});
