const { resolve } = import.meta;

export default function urlsToCache () {
  return [
    resolve('../'),
    resolve('../index.html'),
    resolve('../manifest.json'), // https://stackoverflow.com/questions/45463181/should-i-cache-manifest-json-in-service-worker
    resolve('../service-worker.js'),
    resolve('../leaflet/geo/LatLng.js'),
    resolve('../leaflet/geo/crs/EarthCRS.js'),
    resolve('../data/gbr-place-data.js'),
    resolve('../style/app.css'),
    // resolve('../style/my-compass.css'),
    resolve('./DistanceToAppElement.js'),
    resolve('./LoadPlaceDataElement.js'),
    resolve('./WakeLockElement.js'),
    resolve('./app.js'),
    resolve('./icon.svg'),
    import.meta.url
  ];
}
