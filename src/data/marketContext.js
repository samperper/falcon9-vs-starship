const asOf = '2026-05-09';

export const priceCeilingBand = {
  id: 'ulaHistoricalPricing',
  label: 'ULA historical pricing',
  value: { low: 150_000_000, mid: 275_000_000, high: 400_000_000 },
  unit: 'USD',
  sources: ['ula_historical_pricing', 'crs_nssl_2026'],
  note: 'Reference band for legacy high-reliability launch pricing. Used as context only, not as an input to SpaceX marginal-cost economics.',
  asOf,
};

export const customerTypes = [
  {
    id: 'government',
    iconLabel: 'GOV',
    title: 'Government / NASA / DoD',
    examples: ['NASA', 'U.S. Space Force', 'NRO'],
    priceTier: 'Highest price tier',
    note: 'Mission assurance, schedule certainty, and bespoke requirements can matter more than lowest unit price.',
  },
  {
    id: 'commercial',
    iconLabel: 'SAT',
    title: 'Commercial satellite operators',
    examples: ['Comms', 'Earth observation', 'Mobility networks'],
    priceTier: 'Market-rate launch',
    note: 'Price-sensitive buyers, but reliability and cadence still carry real value.',
  },
  {
    id: 'starlink',
    iconLabel: 'INT',
    title: 'Starlink internal',
    examples: ['SpaceX manifest', 'High-volume replenishment'],
    priceTier: 'Marginal cost economics',
    note: 'Internal demand turns launch cost into a capacity and deployment-speed advantage.',
  },
  {
    id: 'emerging',
    iconLabel: 'NEW',
    title: 'Emerging markets',
    examples: ['Private stations', 'Tourism', 'Point-to-point'],
    priceTier: 'Future demand curve',
    note: 'Lower $/kg expands the set of missions that can make economic sense.',
  },
  {
    id: 'dragon',
    iconLabel: 'DRG',
    title: 'Dragon crew & cargo',
    examples: ['Crew rotation', 'Cargo return', 'Private astronaut missions'],
    priceTier: 'Premium mission service',
    note: 'Dragon is the economic bridge between launch and transportation: Falcon 9 plus spacecraft, operations, crew safety, docking, return, and refurbishment.',
    featured: true,
    sources: ['spacex_dragon_page', 'nasa_oig_commercial_crew'],
  },
];
