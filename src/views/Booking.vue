<template>
<div class="hi">
</div>
  <div class="message">
    <h3> Pick your time for appointment at Tooth Fairy Dentist</h3><br>
</div>
<div style="height:280px; width: 700px; position: center;">
  <div class="days">
  <div class="day">
    <div class="datelabel"><strong>Monday</strong><br/>August 23</div>
    <div class="timeslot">9:00am</div>
    <div class="timeslot">9:30am</div>
    <div class="timeslot">10:00am</div>
  </div>
  <div class="day">
    <div class="datelabel"><strong>Tuesday</strong><br/>August 24</div>
    <div class="timeslot">10:30pm</div>
  </div>  
  <div class="day">
    <div class="datelabel"><strong>Wednesday</strong><br/>August 25</div>
    <div class="timeslot">10:30pm</div>
  </div>
  <div class="day">
    <div class="datelabel"><strong>Thursday</strong><br/>August 26</div>
    <div class="timeslot">10:30pm</div>
  </div>
  <div class="day">
    <div class="datelabel"><strong>Friday</strong><br/>August 27</div>
    <div class="timeslot">10:30pm</div>
  </div>
  </div>
  <div class="arrow-leftright"><i class='fas fa-angle-left' style='font-size:24px'></i>&nbsp;<i class='fas fa-angle-right' style='font-size:24px'></i></div>
    <div class="selectedTime">
    <h3> Selected time: 24 aug 10:30 am </h3><br>
    <h4> Add contact details and click submit to confirm booking </h4><br>
    </div>
     <form>
      <div class="userInput">
<label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="" size="30"><br>
  <label for="lname">Emailadress:</label><br>
  <input type="text" id="emailadress" style="" name="lname" value="" size="30"><br>
  <label for="lname">Phone number:</label><br>
  <input type="text" id="pnumber" name="lname" value="" size="40" required><br>
   <p id = "submit">
    <button>Submit</button>
  </p>
  </div>
  </form>
</div>

</template>

<script>
import mqtt from "mqtt"

export default {
  mounted() {
    console.log('mounted')
    this.createConnection()
  },
  data() {
    return {
      connection: {
        host: '127.0.0.1',
        port: 9001,
        endpoint: '/mqtt',
        clean: true, // Reserved session
        // Certification Information
        clientId: 'Dentistimo Team5 - Client n°' + Math.random().toString(16).substr(2, 8)
      },
      qosList: [
        {label: 0, value: 0},
        {label: 1, value: 1},
        {label: 2, value: 2},
      ],
      client: {
        connected: false,
      },
      subscribeSuccess: false,
    }
  },
  methods: {
    // Create connection
    createConnection() {
      // Connect string, and specify the connection method used through protocol
      // ws unencrypted WebSocket connection
      // wss encrypted WebSocket connection
      // mqtt unencrypted TCP connection
      // mqtts encrypted TCP connection
      // wxs WeChat mini app connection
      // alis Alipay mini app connection
      const {host, port, endpoint, ...options} = this.connection
      const connectUrl = `ws://${host}:${port}${endpoint}`
      try {
        this.client = mqtt.connect(connectUrl, options)
      } catch (error) {
        console.log('mqtt.connect error', error)
      }
      this.client.on('connect', () => {
        console.log('Connection succeeded!')
        //this.client.subscribe() //TODO: Define which topics to subscribe to for this page
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        //TODO: Describe reaction to message here: process data and store it into an object in data()
      })
    }
  }
}
</script>

<style>
h4{
  font-weight: 400;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-left: 350px;
}
.arrow-leftright{
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
}

 .userInput {
  padding-left: 350px;
}


span::after {
  padding-left: 5px;
}

input:invalid + span::after {
  content: '✖';
  color: red;
}

input:valid+span::after {
  content: '✓';
  color: #8cc63f;
}

p {
  display: flex;
  padding-top: 40px;
  padding-left: 350px;
}
.hi{
  background-image: linear-gradient(rgba(3, 3, 3, 0.7), rgba(3, 3, 3, 0.7)), url(../assets/smiling_woman_with_perfect_white_teeth-opt.png);
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
  background-color: #efeff6;
  padding:10px;
  float:left;
  margin-right:7px;
  margin-bottom:5px;
}

.datelabel {
  margin-bottom: 15px;
}

.timeslot {
  background-color: #00c09d;
  width: auto;
  height: 30px;
  color: white;
  padding:7px;
  margin-top: 5px;
  font-size: 14px;
  border-radius: 3px;
  vertical-align: center;
  text-align:center;
}

.timeslot:hover { 
  background-color: #2CA893;
  cursor: pointer;
}
</style>
