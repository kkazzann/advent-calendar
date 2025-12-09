const CATEGORY_API_URL = 'https://fed2n8e59dpq.share.zrok.io/static/category_links';

export async function getCategoryLinks(apiUrl = CATEGORY_API_URL) {
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      skip_zrok_interstitial: '1',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error fetching category links! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}

export default getCategoryLinks;
