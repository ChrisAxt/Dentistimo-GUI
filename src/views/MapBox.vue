<template>
  <div id="map" />
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";
export default {
  name:'Mapbox',
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
</style>
