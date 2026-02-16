/**
 * Latitude and longitute for train stations in Great Britain.
 *
 * @see https://www.distance.to/Tamworth,Staffordshire,England,GBR/Milton-Keynes,Buckinghamshire,England,GBR
 */
const PLACE_DATA = [
  {
    id: 'leeds',
    label: 'Leeds',
    address: 'New Station St, Leeds, LS1 4DY',
    distanceMK: '133.01 mi (214.06 km)',
    latlng: [53.794417, -1.5471143]
  }, {
    id: 'lbs',
    label: 'London Bridge', // overground
    address: 'Station Approach Rd, London, SE1 9SP',
    latlng: [51.5046069, -0.0842602]
  }, {
    id: 'eus',
    label: 'London Euston',
    address: 'Euston Station, Euston Road, London, NW1 2RT',
    mapUrl: 'https://www.google.co.uk/maps/place/Euston+Station/@51.5281278,-0.1322402,17z/',
    latlng: [51.5281278, -0.1322402]
  }, {
    id: 'mkc',
    label: 'Milton Keynes C',
    address: 'Milton Keynes Central station, 302 Eldergate, Milton Keynes, MK9 1LA',
    infoUrl: 'https://www.nationalrail.co.uk/stations/milton-keynes-central/',
    latlng: [52.0342905, -0.7732783]
  }, {
    id: 'tamworth',
    label: 'Tamworth',
    address: 'Victoria Rd, Tamworth, B79 7JT',
    distanceMK: '57.00 mi (91.74 km)',
    distanceLeeds: '86.97 mi (139.96 km)', // "127.6"
    latlng: [52.6373572, -1.6858901]
  }, {
    id: 'bns',
    label: 'Birmingham NS',
    address: 'New Street station, Station St, Birmingham, B2 4QA',
    latlng: [52.477767, -1.8987166]
  }, {
    id: 'leamington',
    label: 'Leamington',
    address: 'Leamington Spa Station, Old Warwick Road, Leamington Spa, Warwickshire, CV31 3NS',
    infoUrl: 'https://www.nationalrail.co.uk/stations/leamington-spa/',
    latlng: [52.284357, -1.5355562]
  }, {
    id: 'btm',
    label: 'Bristol TM',
    address: 'Bristol Temple Meads Station, Redcliffe, Bristol, BS1 6QF',
    latlng: [51.4494913, -2.5803766]
  }, {
    id: 'BDM',
    label: 'Bedford',
    address: 'Ashburnham Road, Bedford, MK40 1DS',
    infoUrl: 'https://www.nationalrail.co.uk/stations/bedford/',
    latlng: [52.1363992, -0.479345]
  }, {
    id: 'CRE',
    label: 'Crewe',
    address: '18 Weston Rd, Crewe, CW1 6FX',
    latlng: [53.0895546, -2.4335296]
  }, {
    id: 'MAN',
    label: 'Manchester Piccadilly',
    address: 'Piccadilly Station, Manchester, M1 2WD',
    latlng: [53.477357, -2.2307128]
  }, {
    id: 'YRK',
    label: 'York',
    address: 'Station Rd, York, YO24 1AB',
    latlng: [53.9581509, -1.092418]
  }
];

export default PLACE_DATA;
