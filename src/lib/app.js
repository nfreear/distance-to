import { LatLng } from '../leaflet/geo/LatLng.js';
import geoData from '../data/gbr-place-data.js';

// https://codepen.io/nfreear/pen/KwMbYwe
// https://leafletjs.com/reference-2.0.0.html#latlng - Latlng.distanceTo();
// https://github.com/Leaflet/Leaflet/blob/main/src/geo/LatLng.js#L140
// https://en.wikipedia.org/wiki/Haversine_formula
const formElement = document.querySelector('#form');
const fieldsetElem = formElement.elements.fs;
const placeField = formElement.elements.place;
const outputElem = formElement.elements.output;
// const startButton = formElementelements.startButton;

formElement.addEventListener('submit', (ev) => {
  ev.preventDefault();

  navigator.geolocation.watchPosition((pos) => distanceCallback(pos));

  fieldsetElem.addEventListener('change', (ev) => {
    console.log('change:', ev);
    navigator.geolocation.getCurrentPosition((pos) => distanceCallback(pos));
  });
});

function distanceCallback (pos) {
  const date = new Date(pos.timestamp);
  const { latitude, longitude } = pos.coords; // 53.777, -1.5797 -- Leeds.
  const fromLatlng = new LatLng([latitude, longitude]);

  const placeID = placeField.value;
  const toLatlng = new LatLng(getLatLng(placeID));

  const distanceM = fromLatlng.distanceTo(toLatlng);
  const distanceKM = format(distanceM / 1000);
  // WAS: const distanceKM = calculateDistance(fromLatlng, toLatlng);

  outputElem.value = `${distanceKM} km to ${placeID}`;

  console.log('coords:', distanceKM, 'km', placeID, fromLatlng, date, pos);
}

function getLatLng (placeId) {
  const found = geoData.find(it => it.id.toLowerCase() === placeId.toLowerCase());
  console.assert(found, `Place not found: ${placeId}`);
  return found.latlng;
}

// https://www.mathsisfun.com/algebra/distance-2-points.html
export function calculateDistance (fromLatlng, toLatlng) {
  const [xa, ya] = fromLatlng;
  const [xb, yb] = toLatlng;

  const delX = Math.pow(xa - xb, 2);
  const delY = Math.pow(ya - yb, 2);
  const RESULT = Math.sqrt(delX + delY);
  return RESULT * factorKM();
}

function factorKM () {
  return 214.06 / 1.9205730502321912;
}

function format (number) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(
    number
  );
}
