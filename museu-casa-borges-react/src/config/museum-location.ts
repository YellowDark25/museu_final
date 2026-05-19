export const MUSEUM_LOCATION = {
  name: 'Museu Casa Borges',
  addressLines: [
    'R. Voluntários da Pátria, 80',
    'São Sebastião',
    'Barra do Bugres - MT, 78390-000',
  ],
  /** Museu Casa Borges — Rua Voluntários da Pátria (OpenStreetMap) */
  lat: -15.0744015,
  lng: -57.1835712,
  zoom: 17,
} as const

export function getMuseumGoogleMapsUrl(): string {
  const query =
    'R. Voluntários da Pátria, 80 - São Sebastião, Barra do Bugres - MT, 78390-000, Brazil'
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
