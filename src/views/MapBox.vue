<template>
  <div class='sidebar'>
    <div class='heading'>
        <h1>Dentist locations</h1>
    </div>
    <div id='listings' class='listings'></div>
</div>
<div id="map" class="map"></div>
  <div id="app"></div>
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
              description: "Spannmålsgatan 20  ",

            },
          },
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [11.940386, 57.709872]
            },
            properties: {
              title: "The Crown",
              description: "Lindholmsallén 19",

            }
          }
        ],
      };
      function buildLocationList(geojson) {
        for (const geojson of geojson.features) {
          /* Add a new listing section to the sidebar. */
          const listings = document.getElementById('listings');
          const listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = `listing-${geojson.properties.id}`;
          /* Assign the `item` class to each listing for styling. */
          listing.className = 'item';

          /* Add the link to the individual listing created above. */
          const link = listing.appendChild(document.createElement('a'));
          link.href = '#';
          link.className = 'title';
          link.id = `link-${geojson.properties.id}`;
          link.innerHTML = `${geojson.properties.title}`;

          /* Add details to the individual listing. */
          const details = listing.appendChild(document.createElement('div'));
          details.innerHTML = `${geojson.properties.description}`;
          if (geojson.properties.phone) {
            details.innerHTML += ` · ${geojson.properties.phoneFormatted}`;
          }
          if (geojson.properties.distance) {
            const roundedDistance = Math.round(geojson.properties.distance * 100) / 100;
            details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`;
          }
        }
      }

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
                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p><form action="./booking">
    <input type="submit" value="Book" />
</form>`
              )
          )
          .addTo(map);
      }

      geojson.features.forEach(function (geojson, i) {
        geojson.properties.id = i;
      }); //Assign a unique ID to each location/marker

      map.on("load", () => {
        map.addLayer({
          id: 'locations',
          type: 'circle',
          /* Add a GeoJSON source containing place coordinates and information. */
          source: {
            type: 'geojson',
            data: geojson
          }
          // TODO: Here we want to load a layer
          // TODO: Here we want to load/setup the popup
        })
        buildLocationList(geojson);
        });
    });
  },
  methods:{
    getAllClinics(){
    // TODO: Fetch JSON data from storedClinics topic
    // TODO: Convert JSON to GeoJSON
    }
  }
};
</script>

<style>
.button{
  background-color: blue
}
#map {
  height: 100vh;
  position: relative;
}
.marker {
  background-image: url("../assets/be_a_denist.png");
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

.listings {
  height: 100%;
  overflow: auto;
  padding-bottom: 60px;
}

.listings .item {
  border-bottom: 1px solid #eee;
  padding: 10px;
  text-decoration: none;
}

.listings .item:last-child { border-bottom: none; }

.listings .item .title {
  display: block;
  color: #00853e;
  font-weight: 700;
}

.listings .item .title small { font-weight: 400; }

.listings .item.active .title,
.listings .item .title:hover { color: #8cc63f; }

.listings .item.active {
  background-color: #f8f8f8;
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  border-left: 0;
  background: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-track {
  background: none;
}

::-webkit-scrollbar-thumb {
  background: #00853e;
  border-radius: 0;
}
* {
  box-sizing: border-box;
}

body {
  color: #404040;
  font: 400 15px/22px 'Source Sans Pro', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

h1 {
  font-size: 22px;
  margin: 0;
  font-weight: 400;
  line-height: 20px;
  padding: 20px 2px;
}

a {
  color: #404040;
  text-decoration: none;
}

a:hover {
  color: #101010;
}

/* The page is split between map and sidebar - the sidebar gets 1/3, map
gets 2/3 of the page. You can adjust this to your personal liking. */
.sidebar {
  position: absolute;
  width: 33.3333%;
  height: 100%;
  top: 0;
  left: 0;
  overflow: hidden;
  border-right: 1px solid rgba(0, 0, 0, 0.25);
}

.map {
  position: absolute;
  left: 33.3333%;
  width: 66.6666%;
  top: 0;
  bottom: 0;
}

.heading {
  background: #fff;
  border-bottom: 1px solid #eee;
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
}
</style>
