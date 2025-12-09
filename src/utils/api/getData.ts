const API_URL = import.meta.env.VITE_API_URL;

export async function getData(tab: string) {
  const response = await fetch(`${API_URL}2025/${tab}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      skip_zrok_interstitial: '1',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}
