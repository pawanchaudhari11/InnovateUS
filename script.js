// Placeholder for Phase 1 (static design). Real submit logic — POST to /api/submit —
// gets wired up in Phase 2, once the Directus schema check comes back.
document.getElementById('registration-form').addEventListener('submit', (e) => {
  e.preventDefault();
  document.getElementById('form-message').textContent = 'Submit logic lands in Phase 2.';
});
