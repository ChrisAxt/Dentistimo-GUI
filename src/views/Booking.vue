<template>
<div class="hi">
</div>

  <form>
    <div class="date">
  <label for="start">Please select a date and time for your appointment: &nbsp; &nbsp;
  <input type="date" id="start" name="trip-start"
         min="2018-01-01" max="2022-12-31" required>
  <span class="validity"></span>
  </label></div>
  <div class="time">
    <label for="time">Time: &nbsp;
  <input type="time" id="start" name="trip-start"
         value="2018-07-22"
         min="2018-01-01" max="2018-12-31">
         </label></div>
      <div class="userInput">
<label for="fname">First name:</label><br>
  <input type="text" id="fname" name="fname" value="" size="30"><br>
  <label for="lname">Emailadress:</label><br>
  <input type="text" id="emailadress" style="" name="lname" value="" size="30"><br>
  <label for="lname">Phone number:</label><br>
  <input type="text" id="pnumber" name="lname" value="" size="40" required><br>
  </div>
  <p>
    <button>Submit</button>
  </p>
  </form>
</template>

<script>
import mqtt from "mqtt"

export default {
  mounted() {
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
      subscriptionTopics: [
        'Team5/Dentistimo/Booking/Create/Success',
        'Team5/Dentistimo/Booking/Create/Fail'
          //TODO: add here all topics to subscribe to
      ]
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
        this.client.subscribe(this.subscriptionTopics)
      })
      this.client.on('error', error => {
        console.log('Connection failed', error)
      })
      this.client.on('message', (topic, message) => {
        //TODO: Describe reaction to message here: process data and store it into an object in data()

        switch (topic){
          case 'Team5/Dentistimo/Booking/Create/Success':
            this.notifySuccess(message)
                break;
            case 'Team5/Dentistimo/Booking/Create/Fail':
              this.notifyFailure(message)
        }
      })
    },
    notifySuccess(message){
      let newBooking = JSON.parse(message)
      alert('You have a new appointment at the clinic ' + newBooking.clinic.name + ' on the ' + newBooking.date + ' at ' + newBooking.startTime)
    },
    notifyFailure(message){
      let error = JSON.parse(message)
      alert('Something went wrong. Please contact the administrator. \n'+ 'Error message: ' + error.error )
    }
  }
}
</script>

<style>

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
  height: 50vh;
  background-attachment: fixed;
  color: white;
}
</style>
