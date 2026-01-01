// Simple geocoding helper using OpenStreetMap Nominatim API
// Returns latitude and longitude for a given address string.

export async function geocode(address: string): Promise<{ lat: number; lng: number }> {
    const params = new URLSearchParams({
        format: 'json',
        q: address,
        limit: '1',
    });
    const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'VESTA-App/1.0 (wilsoncalcio)',
        },
    });
    if (!response.ok) {
        throw new Error('Geocoding request failed');
    }
    const data = await response.json();
    if (!data || data.length === 0) {
        throw new Error('No geocoding results found');
    }
    const { lat, lon } = data[0];
    return { lat: Number(lat), lng: Number(lon) };
}
