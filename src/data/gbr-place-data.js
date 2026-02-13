// https://www.distance.to/Tamworth,Staffordshire,England,GBR/Milton-Keynes,Buckinghamshire,England,GBR
const PLACE_DATA = [
  {
    id: 'leeds',
    address: 'Premier Inn (Elland Road), City West One Office Park, Gelderd Rd, Holbeck, Leeds, LS12 6LX',
    distanceMK: '133.01 mi (214.06 km)',
    latlng: [53.77729557185507, -1.5798559343045304]
  }, {
    id: 'eus',
    address: 'Euston Station, Euston Road, London, NW1 2RT',
    url: 'https://www.google.co.uk/maps/place/Euston+Station/@51.5281278,-0.1322402,17z/',
    latlng: [51.5281278,-0.1322402]
  }, {
    id: 'mkc',
    address: 'Phoenix House, Milton Keynes, MK9 1AW',
    latlng: [52.0342905, -0.7732783]
  }, {
    id: 'tamworth',
    distanceMK: '57.00 mi (91.74 km)',
    distanceLeeds: '86.97 mi (139.96 km)', // "127.6"
    address: 'Victoria Rd, Tamworth, B79 7JT',
    latlng: [52.6373572, -1.6858901]
  }
];

export default PLACE_DATA;
