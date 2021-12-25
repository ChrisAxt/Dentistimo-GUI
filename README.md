# Frontend

## Description

This is the frontend part of the distributed system DENTISTIMO, a web application that offers a geolocalisation based dental care booking system.
Dentistimo GUI provides a graphical user interface of the system using dentistry data from the clinic handler component. More details can be found below in this README.md file.

## System Architecture - Component Diagram

![System_Component_Diagram_v2.0__1_](/uploads/45a7fa0c8ac9aeace2ea507ccfce552b/System_Component_Diagram_v2.0__1_.png)


## Components Responsibilities

- Display interactive map allowing users to navigate to dentist practices
- Display info about clinics 
- Allow user to book an appointment 
- Publish booking (date + time) to MQTT broker 

## Data Input and Output

#### Data Input

- The client subscribes to a topic in the clinic handler and expects to recieve dentist data via MQTT.  This data is then displayed on the map in line with the requirements. 

#### Data Output
- The client publishes a request for dentist data every time the page reloads, which is subscribed by the clinic handler. 

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Configuration with backend
 
   In order to receive clinic data and see available bookings, it's necessary to setup a terminal running the clinic handler and one with mosquitto.

 **Mosquitto terminal (on Mac)**

Before you continue, make sure you have [mosquitto](https://mosquitto.org/download/) installed on your computer 

  1. Open new terminal window

  2. Copy and paste following command `/opt/homebrew/opt/mosquitto/sbin/mosquitto -c /opt/homebrew/etc/mosquitto/mosquitto.conf`

  3. If everything works, you should recieve the following message 

  ![Screenshot_2021-12-25_at_15.35.58](/uploads/53b9f9b74c854b7a04cd188147d989e1/Screenshot_2021-12-25_at_15.35.58.png)

  **Running clinic handler**
 
 1. Clone the clinic handler repository 
    
 2. Open new terminal window

 3. type _ls_ to see where you are

 4. You should be able to see the team-5-clinic-handler folder, type cd to go in to the folder

 5. Inside the folder, type npm start to start the clinic handler


### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
