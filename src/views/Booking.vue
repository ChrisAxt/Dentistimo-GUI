<template>
  <div class="hi"></div>

  <div class="date" @change="onChangeDate($event)">
    <label for="start"
      >Please select a date and time for your appointment: &nbsp; &nbsp; <br><br>
      <input
        type="date"
        id="start"
        name="trip-start"
        min="2018-01-01"
        max="2022-12-31"
        required
      />
      <span class="validity"></span>
    </label>
  </div>
  <br />
  <div>
    <div class="time">
      <select
        name="time"
        @change="onChangeTime($event)"
        class="form-select form-control"
      >
        <option>-- Select Time --</option>
        <option v-for="item in timeSlots" v-bind:key="item">
          {{ item.start + "-" + item.end }}
        </option>
      </select>
    </div>
  </div>
  <br />
  <form>
    <div class="userInput">
      <label for="fname">First name:</label><br />
      <input type="text" id="fname" name="fname" value="" size="30" /><br />
      <label for="lname">Emailadress:</label><br />
      <input
        type="text"
        id="emailadress"
        style=""
        name="lname"
        value=""
        size="30"
      /><br />
      <label for="lname">Phone number:</label><br />
      <input
        type="text"
        id="pnumber"
        name="lname"
        value=""
        size="40"
        required
      /><br />
      <p id="submit">
        <button type='button' v-onclick="booking">This Button</button>
        <!-- <button>Submit</button> -->
      </p>
    </div>
  </form>
</template>

<script>
import mqtt from "mqtt";

export default {
  mounted() {
    console.log("mounted");
    this.createConnection();
  },
  data() {
    return {
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
      onChangeTime(e) {
        console.log(e.target.value);
      },
      onChangeDate(e) {
        console.log(e.target.value);
        /* var mqttPayload;
        client.publish("/Team5/Dentistimo/GenerateTimeSlots", mqttPayload, {
          qos: 1,
        }); */
      },
      timeSlots: [
        {
          _id: "61b99f40a8ef5bf7d53703b4",
          start: "9:00",
          end: "9:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703b5",
          start: "9:30",
          end: "10:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703b6",
          start: "10:00",
          end: "10:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703b7",
          start: "10:30",
          end: "11:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703b8",
          start: "11:00",
          end: "11:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703b9",
          start: "11:30",
          end: "12:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703ba",
          start: "12:00",
          end: "12:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703bb",
          start: "12:30",
          end: "13:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703bc",
          start: "13:00",
          end: "13:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703bd",
          start: "13:30",
          end: "14:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703be",
          start: "14:00",
          end: "14:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703bf",
          start: "14:30",
          end: "15:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703c0",
          start: "15:00",
          end: "15:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703c1",
          start: "15:30",
          end: "16:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703c2",
          start: "16:00",
          end: "16:30",
          available: 3,
          date: "Thu Dec 02 2021",
        },
        {
          _id: "61b99f40a8ef5bf7d53703c3",
          start: "16:30",
          end: "17:00",
          available: 3,
          date: "Thu Dec 02 2021",
        },
      ],
    };
  },
  methods: {
    booking(){
      alert('inside booking')
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
        //this.client.subscribe() //TODO: Define which topics to subscribe to for this page
      });
      this.client.on("error", (error) => {
        console.log("Connection failed", error);
      });
      this.client.on("message", (topic, message) => {
        if (topic == "/Team5/Dentistimo/TimeSlots") {
          try {
            this.timeSlots = JSON.parse(message);
          } catch (error) {
            console.log(error)
          }
        }
      });
    },
  },
};
</script>

<style>
h4 {
  font-weight: 400;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-left: 350px;
}
.arrow-leftright {
  padding-left: 350px;
}
h3 {
  font-weight: 500;
  padding-top: 20px;
  padding-left: 350px;
}
.date {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-left: 350px;
}
input {
  margin-bottom: 20px;
}
.time {
  display: flex;
  align-items: center;
  padding-top: 0px;
  padding-left: 350px;
  width: fit-content;
}

.userInput {
  padding-left: 350px;
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
  padding-top: 40px;
  padding-left: 350px;
}
.hi {
  background-image: linear-gradient(rgba(3, 3, 3, 0.7), rgba(3, 3, 3, 0.7)),
    url(../assets/smiling_woman_with_perfect_white_teeth-opt.png);
  background-size: cover;
  background-position: bottom;
  height: 30vh;
  background-attachment: fixed;
  color: white;
}

.days {
  width: 1100px;
  padding-left: 350px;
}

.day {
  width: 120px;
  height: 230px;
  background-color: #f4f7ff;
  padding: 10px;
  float: left;
  margin-right: 7px;
  margin-bottom: 5px;
}

.datelabel {
  margin-bottom: 15px;
  color: rgb(77, 72, 72);
}

.timeslot {
  background-color: #d5e7ff;
  width: auto;
  height: 30px;
  color: rgb(49, 88, 138);
  font-weight: 500;
  padding: 7px;
  margin-top: 5px;
  font-size: 14px;
  border-radius: 3px;
  vertical-align: center;
  text-align: center;
}

.timeslot:hover {
  background-color: #3d83d3;
  cursor: pointer;
}
</style>
