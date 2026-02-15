const { resolve } = import.meta;

export default function urlsToCache () {
  return [
    resolve('../'),
    resolve('../index.html'),
    resolve('../manifest.json'),
    resolve('../service-worker.js'),
    resolve('../leaflet/geo/LatLng.js'),
    resolve('../leaflet/geo/crs/EarthCRS.js'),
    resolve('../data/gbr-place-data.js'),
    resolve('../style/app.css'),
    resolve('./DistanceToAppElement.js'),
    resolve('./app.js'),
    resolve('./icon.svg'),
    import.meta.url
  ];
}
