<template>
<div class="row">
  <div class="col-sm-3">
  <div class="sidebar">
    <div class="heading">
      <h2> Dentist locations</h2>
    </div>
    <error-message :message="this.errorMessage" v-if="!this.isOnline"></error-message>
    <div v-else id="listings" class="listings">
      <div class="item" v-for="dentist in dentists" v-bind:key="dentist.name">
        {{ dentist.name }}
        <p class="address">Address: {{ dentist.address }}</p>
        <p>
          Monday: {{ dentist.openinghours.monday }} <br>
          Tuesday: {{ dentist.openinghours.tuesday }} <br>
          Wednesday: {{ dentist.openinghours.wednesday }} <br>
          Thursday: {{ dentist.openinghours.thursday }} <br>
          Friday: {{ dentist.openinghours.friday }}
        </p>
      </div>
    </div>
  </div>
  </div>
  <div class="col-sm-9">
  <div id="map" class="map"></div>
  <div id="app"></div>
  </div>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mqtt from "mqtt";
import ErrorMessage from '/src/components/ErrorMessage.vue'

export default {
  components: {
    ErrorMessage
  },
  mounted() {
    this.createMap();
    this.createConnection();
    this.getAllDentists();
  },
  data() {
    return {
      isOnline: false,
      connection: {
        host: "127.0.0.1",
        port: 9001,
        endpoint: "/mqtt",
        clean: true, // Reserved session
        // Certification Information
        clientId:
          "Dentistimo Team5 - Client n°" +
          Math.random().toString(16).substr(2, 8),
      },
      qosList: [
        { label: 0, value: 0 },
        { label: 1, value: 1 },
        { label: 2, value: 2 },
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
      subscriptionTopics: [
        'Team5/Dentistimo/BookingHandler/LastWill',
        'Team5/Dentistimo/ClinicHandler/LastWill',
        'Team5/Dentistimo/TimeSlotGenerator/LastWill',
        'Team5/Dentistimo/AvailabilityChecker/LastWill',
        "stored_new_clinic"
      ],
      errorMessage: "We are experiencing difficulties. Please try again later",
      map: {},
      dentists: [],
       // circuit breaker variables
      circuit: undefined,
          circuitTimeout: {
            timeout: 1000,
            errorThresholdPercentage: 50,
            resetTimeout: 5500
          }
    };
  },
  methods: {

       // initializing circuit breaker
    createdCircuit() {
     this.circuit = new circuitBreaker(),
      this.circuitTimeout
    },
    // Parsing the received binary array to JSON objects //
    decodeBinArray(binArray) {
      try {
        let utf8decoder = new TextDecoder("utf8");
        return JSON.parse(utf8decoder.decode(binArray));
      } catch (error) {
        console.log(error)
      }
    },
    goToBooking(dentist){
      localStorage.setItem('selectedDentist', JSON.stringify(dentist))
      this.$router.push({ name: 'Booking'})
      //TODO: Change this method to store dentist in local storage and go to booking page
    },
    // Create mqtt connection //
    createConnection() {
      // Connect string, and specify the connection method used through protocol //
      const { host, port, endpoint, ...options } = this.connection;
      const connectUrl = `ws://${host}:${port}${endpoint}`;

      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }

      this.client.on("connect", () => {
        console.log("Connection succeeded!");
        this.client.subscribe(this.subscriptionTopics, function (err) {
          if (err) {
            console.error(err);
          }
        }); //TODO: Define which topics to subscribe to for this page
      });

      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });

      this.client.on("message", (topic, message) => {
        switch(topic){
          case "stored_new_clinic":
            this.isOnline = true
            this.generateOnMap(message);
            break;
          case 'Team5/Dentistimo/ClinicHandler/LastWill':
                this.isOnline = false
                break;
          default:
            break
        }
      });
    },
    generateOnMap(message){
      const dentist = this.decodeBinArray(message);
      this.dentists.push(dentist);
      this.addMarker(dentist);
    },
    // Adds markers on the map and popups to the markers //
    addMarker(dentist) {
      //Creates a div and set the class name of that div for the marker
      const el = document.createElement("div");
      el.className = "marker";

      //Creates a parent div for the popup content
      const popupContent = document.createElement("div")

      //Creates a div for popup info and sets the html to display dentist info
      const popupInfo = document.createElement("div")
      popupInfo.innerHTML = `<div>${dentist.name}</div><div>${dentist.address}</div>`

      //Creates a div with a book button
      const bookingButton = document.createElement("div")
      bookingButton.innerHTML = `<button>Book</button>`

      //Adds a listener to the button calling a method
      bookingButton.addEventListener('click', (e) => {
        this.goToBooking(dentist)
      })

      //Add the popup info as a child of the popup content div
      popupContent.appendChild(popupInfo)
      //Add the booking button as a child of the popup content div
      popupContent.appendChild(bookingButton)

      //Creates a marker
      const marker = new mapboxgl.Marker(el)

      //Creates a popup
      const popup = new mapboxgl.Popup({ offset: 25 })
      popup.setDOMContent(popupContent) // sets the popup dom as the one defined in the popup content

      marker.setLngLat([dentist.coordinate.longitude, dentist.coordinate.latitude])
      marker.setPopup(popup)
      marker.addTo(this.map)
    },

    // Creates the map object on the page //

    createMap() {
      mapboxgl.accessToken =
        "pk.eyJ1Ijoib2xnYXJhdHUiLCJhIjoiY2t3YzhrdWQ3MXZlbDJwcGF3ZmsyYXp3YSJ9.UILiP1r9n3yZ7MbHuW-ovQ";
      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [11.97456, 57.70887],
        zoom: 12.5,
      });
      this.map = map;
      const geojson = {
        type: "FeatureCollection",
        features: [],
      };
      map.on("");
      map.on("load", () => {
        map.addLayer({
          id: "locations",
          type: "circle",
          source: {
            type: "geojson",
            data: geojson,
          },
        });
      });
    },
    getAllDentists() {
      this.client.publish("get_all_clinics");
    },
  },
  name: "Mapbox",
};
</script>

<style >
p {
  font-size: small;
  font-weight: lighter;
  position: relative;
}

p.address {
  font-size: medium;
  font-weight: normal;
  white-space: nowrap;
  
}

#map {
  height: 100vh;
  position: relative;
}
.col-sm-3{
  overflow: auto;
  margin: 0 auto;
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
  padding-top: 10%;
  height: 100%;
  padding-bottom: 60px;
  padding-left: 10%
}

.listings .item {
  border-bottom: 1px solid #eee;
  padding: 10px;
  text-decoration: none;
  color: #16653a;
  font-weight: bold;
  font-size: large;
  
}

.listings .item:last-child {
  border-bottom: none;
}

.listings .item .title {
  display: block;
  color: #00853e;
  font-weight: 700;
}

.listings .item .title small {
  font-weight: 400;
}

.listings .item.active .title,
.listings .item .title:hover {
  color: #8cc63f;
}

.listings .item.active {
  background-color: #f8f8f8;
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  border-left: 0;
  background: rgba(0, 0, 0, 0.1);
  margin: 0 auto;
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
  font: 400 15px/22px "Source Sans Pro", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
}

h2 {
  text-size-adjust: auto;
  padding-left: 10%;
}

a {
  color: #404040;
  text-decoration: none;
}

a:hover {
  color: #101010;
}

.sidebar {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border-right: 0px solid rgba(0, 0, 0, 0.25);
}

.map {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}

.heading {
  background: #fff;
  border-bottom: 1% solid #eee;
  height: 60px;
  line-height: 60px;
}
 button {
  background-color: #409443;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block; 
  font-size: 16px;
  border-radius: 5px!important;
  padding: 4px 14px;
}
button:hover{
  box-shadow: 0 6px 8px 0 rgba(0,0,0,0.24), 0 8px 25px 0 rgba(0,0,0,0.19);
} 
</style>
