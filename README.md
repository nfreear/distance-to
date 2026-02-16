[![Deploy][ci-badge]][ci]

# Distance To …?

What is the distance to [_X_] from my current location?

A minimalist [progressive web app][] to answer this question, designed for offline use and for when the mobile signal is poor.

* Web App: [nfreear.github.io/distance-to][ghp]
* Repo: [github.com/nfreear/distance-to][repo]

Uses the following:

* [`LatLng`][geo] and [`EarthCRS`][geo] JS classes from [Leaflet.js][].
* [Geolocation API][].
* [Haversine formula][].
* [Caching][].

[pen]: https://codepen.io/nfreear/pen/KwMbYwe
[crosshair pen]: https://codepen.io/nfreear/pen/MYedwqM
[compass pen]: https://codepen.io/nfreear/pen/PwzvNeE
[repo]: https://github.com/nfreear/distance-to.git
[ghp]: https://nfreear.github.io/distance-to/
[geo]: https://github.com/nfreear/distance-to/tree/main/src/leaflet/geo
[ci]: https://github.com/nfreear/distance-to/actions/workflows/node.js.yml
[ci-badge]: https://github.com/nfreear/distance-to/actions/workflows/node.js.yml/badge.svg

[progressive web app]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
[leaflet.js]: https://github.com/leaflet/leaflet
[leaflet ref]: https://leafletjs.com/reference-2.0.0.html#latlng
[geolocation api]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[haversine formula]: https://en.wikipedia.org/wiki/Haversine_formula
[caching]: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching
