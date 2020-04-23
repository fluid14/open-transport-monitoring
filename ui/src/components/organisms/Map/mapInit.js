import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import route1 from 'data/route_1.json';

const showAllVehicles = mapBox => {
  let geoJsonData;
  let counter = 0;
  geoJsonData = {
    geometry: {
      type: 'Point',
      coordinates: [route1[counter].lng, route1[counter].lat],
    },
    type: 'Feature',
    properties: {},
  };

  mapBox.on('load', () => {
    window.setInterval(() => {
      geoJsonData = {
        geometry: {
          type: 'Point',
          coordinates: [route1[counter].lng, route1[counter].lat],
        },
        type: 'Feature',
        properties: {},
      };
      mapBox.getSource('vehicle1').setData(geoJsonData);
      counter += 1;
    }, 1000);

    mapBox.addSource('vehicle1', { type: 'geojson', data: geoJsonData });
    mapBox.addLayer({
      id: 'vehicle1',
      type: 'symbol',
      source: 'vehicle1',
      layout: {
        'icon-image': 'rocket-15',
      },
    });
  });
};

const mapInit = position => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZmx1aWQxNCIsImEiOiJjazZ4eXp5d2QwZWk2M2ZsbTNvMGE0ZmRrIn0.XSK0YW6ckdSAg12F3NRsdg';
  const mapBox = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/fluid14/ck6xzkds71nzm1ipnfq5k2puw',
    center: [position.lng, position.lat],
    zoom: 12,
  });
  showAllVehicles(mapBox);
};

export default mapInit;
