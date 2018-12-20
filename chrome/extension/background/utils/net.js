export async function getJSON(url) {
  const res = await fetch(url);

  if (res.status !== 200) {
    throw new Error(`Received non-200 status code: ${res.status}`)
  }

  return res.json();
}