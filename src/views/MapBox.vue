<template>
  <div id="map" />
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";
export default {
  name: "Mapbox",
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoib2xnYXJhdHUiLCJhIjoiY2t3YzhrdWQ3MXZlbDJwcGF3ZmsyYXp3YSJ9.UILiP1r9n3yZ7MbHuW-ovQ";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [11.97456, 57.70887],
        zoom: 12.5,
      });
      const geojson = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [11.969388, 57.707619],
            },
            properties: {
              title: "Your Dentist",
              description: "Spannmålsgatan 20",
            },
          },
          
        ],
      };

      // add markers to map
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement("div");
        el.className = "marker";

        // make a marker for each feature and add to the map
        //   new mapboxgl.Marker(el)
        //     .setLngLat(feature.geometry.coordinates)
        //     .addTo(map);
        // }

        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
              )
          )
          .addTo(map);
      }

      map.on("load", () => {
        // TODO: Here we want to load a layer
        // TODO: Here we want to load/setup the popup
      });
    });
    return {};
  },
};
</script>

<style>
#map {
  height: 100vh;
}
.marker {
  background-image: url("../assets/fairy-marker.png");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
}

.mapboxgl-popup-content {
  text-align: center;
  font-family: "Open Sans", sans-serif;
}
</style>
