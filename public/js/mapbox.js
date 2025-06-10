// @ts-nocheck
/* global mapboxgl */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibXVydGF6YS15YXNlZW4zMjEiLCJhIjoiY21iYzJhczY1MDk1cTJpc2JjZGtpeTFseCJ9.jWDi_hq0QRYO8TT5p2fcXw';
  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/murtaza-yaseen321/cmbdptg47003301qw7miyaukn', // map style
    scrollZoom: false, // enable scroll zoom
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //create a marker
    const el = document.createElement('div');
    el.className = 'marker';
    //add marker to map
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<h4>Day ${loc.day}: ${loc.description}</h4>`)
      .addTo(map);

    //extend the map bounds to include this location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
