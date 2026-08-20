const DIRECTUS_URL = 'https://burnes-center.directus.app/items/cw_intake';
const REQUIRED_FIELDS = ['first_name', 'last_name', 'email', 'country', 'gov_org', 'workshop_series'];

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = req.body || {};
  const missing = REQUIRED_FIELDS.filter((field) => !body[field]);
  if (missing.length > 0) {
    return res.status(400).json({ error: `Missing required field(s): ${missing.join(', ')}` });
  }

  const payload = {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    country: body.country,
    state: body.state || null,
    gov_org: body.gov_org,
    gov_level: body.gov_level || null,
    workshop_series: body.workshop_series,
    workshops: body.workshops || null,
    newsletter: Boolean(body.newsletter),
    consent_at: body.consent_at || new Date().toISOString(),
  };

  try {
    const directusRes = await fetch(DIRECTUS_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.DIRECTUS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await directusRes.json().catch(() => ({}));

    if (!directusRes.ok) {
      const message = data?.errors?.[0]?.message || 'Directus rejected the submission.';
      return res.status(directusRes.status).json({ error: message });
    }

    return res.status(200).json({ success: true, id: data?.data?.id });
  } catch (err) {
    return res.status(502).json({ error: 'Could not reach Directus. Please try again.' });
  }
};
