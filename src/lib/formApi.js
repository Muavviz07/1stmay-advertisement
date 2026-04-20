export async function submitLeadForm(payload) {
  let response;
  try {
    response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (_error) {
    throw new Error('Cannot reach form backend. Start `npm run dev:server` and try again.');
  }

  const raw = await response.text();
  let data = {};
  try {
    data = raw ? JSON.parse(raw) : {};
  } catch (_error) {
    data = {};
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Form API route was not found. Ensure backend server is running on port 4000.');
    }
    throw new Error(data.message || 'Unable to submit form right now.');
  }

  return data;
}
