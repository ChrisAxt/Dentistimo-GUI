<template>
<div class="row1">
  <!-- <div class="hi"></div> --></div>
    <div class="row">
  <div class="col-sm-4"></div>
  <div class="col-sm-4" >
    <h1 align="center">{{dentist.name}} </h1><br>
  <div class="date" @change="onChangeDate($event)">
    <label for="start"
      >Please select a date and time for your appointment: &nbsp; &nbsp;
      <br /><br />
      <input
        v-model= "booking.date"
        type="date"
        id="start"
        name="trip-start"
        min="2018-01-01"
        max="2022-12-31"
        width="1000"
        required
      />
      <span class="validity"></span>
    </label>
  </div>
  <br />
  <div>
    <div class="time">
      <select
        class="form-select form-control"
        @click="onClickTime($event)"
        v-model="booking.time"
        required
      >
        <option>------ Select Time ------</option>
        <option v-for="item in timeSlots" v-bind:key="item">
          {{ item.start + "-" + item.end }}
        </option>
      </select>
    </div>
  </div>
  <br />
  <form>
    <div class="userInput">
      <label> Social security number:</label><br />
      <input
        type="text"
        v-model="booking.ssn"
        name="fname"
        size="30"
        required
      /><br />
    </div>
    <div>
      <button type='button' v-on:click="sendBooking(); TimeStamp();"> Submit </button>
    </div>
  </form></div>
  <div class="col-sm-4"></div>
</div>
</template>

<script>
import mqtt from "mqtt";

export default {
  mounted() {
    try {
      this.dentist = JSON.parse(localStorage.getItem("selectedDentist"));
    } catch (error) {
      console.log(error);
    }

    this.createConnection();
  },
  data() {
    return {
      booking: {
        ssn: "",
        timeStamp: "",
        clinicId: "",
        date: "",
        time: "",
      },
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
        "Team5/Dentistimo/Booking/Create/Success",
        "Team5/Dentistimo/Booking/Create/Fail",
        "Team5/Dentistimo/Timeslots/Validated",
        "Team5/Dentistimo/Reject/Booking",
        //TODO: add here all topics to subscribe to
      ],
      onClickTime(e) {
        var tempDate = JSON.stringify(this.date)
        if(tempDate == undefined){
          alert('Please select a date in order to view time slots!');
        }
      },
      onChangeDate(e) {
        this.timeSlots = [];
        var day;
        try {
          this.date = new Date(Date.parse(e.target.value));
          var weekday = new Array(
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday"
          );
          day = weekday[this.date.getDay()];
        } catch (error) {
          console.log(error);
        }

        if (day == "saturday" || day == "sunday") {
          alert("Clinics are closed during the weekend");

        } else {

          var mqttPayload = { date: e.target.value, clinic: this.dentist };
          this.client.publish(
            "/Team5/Dentistimo/GenerateTimeSlots",
            JSON.stringify(mqttPayload),
            { qos: 1 }
          );
        }
      },
      dentist: {},
      timeSlots: [],
      date: Date
    };
  },
  methods: {
   // Return timestamp in milliseconds
    TimeStamp() {
      const date = Date.now()
      return date;
    },
    // Create connection
    createConnection() {
      // Connect string, and specify the connection method used through protocol
      // ws unencrypted WebSocket connection
      // wss encrypted WebSocket connection
      // mqtt unencrypted TCP connection
      // mqtts encrypted TCP connection
      // wxs WeChat mini app connection
      // alis Alipay mini app connection
      const { host, port, endpoint, ...options } = this.connection;
      const connectUrl = `ws://${host}:${port}${endpoint}`;
      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.log("mqtt.connect error", error);
      }
      this.client.on("connect", () => {
        console.log("Connection succeeded!");
        //**************************************************************************************************************************** */
        //TODO: change to subscribe to availabilty checker
        this.client.subscribe(this.subscriptionTopics, function (err) {
          if (!err) {
            console.log("Subscribed to all topics");
          } else {
            console.log(err.message);
          }
        });
        //**************************************************************************************************************************** */
      });
      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });
      //**************************************************************************************************************************** */
      //TODO: change to recieve from availablity checker
      this.client.on("message", (topic, message) => {
        console.log(topic);
        switch (topic) {
          case "Team5/Dentistimo/Booking/Create/Success":
            this.notifySuccess(message);
            break;
          case "Team5/Dentistimo/Booking/Create/Fail":
            this.notifyFailure(message);
            break;
          case "Team5/Dentistimo/Timeslots/Validated":
            this.reactToTimeSlots(message);
            break;
          case "Team5/Dentistimo/Reject/Booking":
            this.notifyRejection(message);
            break;
          default:
            break;
        }
      });
      //**************************************************************************************************************************** */
    },
    sendBooking(){
      //Reconstruct the JSON
      this.booking.timeStamp = this.TimeStamp();
      this.client.publish(
        "Team5/Dentistimo/Check/Booking",
        JSON.stringify(this.booking)
      );
      this.booking.ssn = "";
      this.booking.date = "";
      this.booking.time = "";
    },

    notifySuccess(message){
      try {
        let newBooking = JSON.parse(message);
        alert('You have a new appointment at the clinic ' + newBooking.clinic.name + ' on the ' + newBooking.date + ' at ' + newBooking.startTime);
      } catch (error) {
        console.log(error);
      }
    },
    notifyFailure(message){
      try {
        let error = JSON.parse(message);
        alert('Something went wrong. Please contact the administrator. \n'+ 'Error message: ' + error.error );
      } catch (error) {
        console.log(error);
      }
    },
    reactToTimeSlots(message) {
      try {
        console.log("Received message from timeSlotGenerator");
        let data = JSON.parse(message);
        this.timeSlots = data.timeSlots;
        this.booking.clinicId = data.clinicId;
      } catch (error) {
        console.log(error);
      }
    },
    notifyRejection(message){
      try {
        let rejection = JSON.parse(message)
        alert(rejection)
      } catch (error) {
        console.log(error)
      }
    }
  },
};
</script>

<style scoped>
.date {
  display: flex;
  align-items: center;
  padding-left: 18%;
  padding-top: 2%;
  padding-bottom: 0.5%;
}
.time {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 18%; 
  width: 70%;
  padding-bottom: 1%;
}
input{
  width: 70%;
}
.userInput {
  padding-left: 18%;
  padding-bottom: 0.5%;
}
span::after {
   padding-left: 5px; 
}
input:invalid + span::after {
  content: "✖";
  color: red;
}

input:valid + span::after {
  content: "✓";
  color: #8cc63f;
}

p {
  display: flex;
}
.row1 {
  background-image: linear-gradient(rgba(3, 3, 3, 0.7), rgba(3, 3, 3, 0.7)),
    url(../assets/smiling_woman_with_perfect_white_teeth-opt.png);
  background-size: cover;
  background-position: bottom;
  height: 40vh;
  background-attachment: fixed;
  color: white;
}
 button {
  background-color: #409443;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block; 
  font-size: 16px;
  border-radius: 10px!important;
  padding: 8px 28px;
}
button:hover{
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
} 
/* .col-sm-4 {
  outline: 2px solid #ccc;
    outline-offset: -10px;
    -moz-outline-radius: 10px;
    -webkit-outline-radius: 10px;
} */

</style>
