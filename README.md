# Dentistimo UI (Book appointment)

## Description

This is the frontend part of the distributed system DENTISTIMO, a web application that offers a geolocalisation based dental care booking system.
Dentistimo GUI provides a graphical user interface of the system using dentistry data from the clinic handler component. More details can be found in the component diagram in the [documentation repository](https://git.chalmers.se/courses/dit355/test-teams-formation/team-5/team-4-project). 

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

# Project setup
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

# Backend configuration/setup
 
   In order to receive clinic data and see available bookings, it's necessary to setup a terminal running the clinic handler and one with mosquitto.

 ## Prerequisites
   Do you have Mosquitto installed on your computer? 

  **If yes**

  Continue to Setup column

  **Otherwise**

    Start by installing Mosquitto here(https://mosquitto.org/download/)
    
       After installing Mosquitto, to connect to MQTT broker we need to edit the config file to accept websockets on port 1884
       
       Depending on were you installed mosquitto, the path to the file could be different.

  **1.** Access hidden files 

          command + shift + .

 **2.** Navigate to where your mosquitto.conf file is located 

          for ex. Macintosh HD > opt > homebrew > opt > mosquitto > etc > mosquitto

 **3.** Open mosquttio.conf in code editor

 **4.** Add the following code at top of file and save

          port 1883
          listener 1884
          protocol websockets

**5.**
      Now you can continue to Setup



    
  ### Setup (on Mac terminal)
  1. Open new terminal window

  2. Copy and paste following command `/opt/homebrew/opt/mosquitto/sbin/mosquitto -c /opt/homebrew/etc/mosquitto/mosquitto.conf`

  3. If everything works, your terminal output should look like this 

  ![Screenshot_2021-12-25_at_15.35.58](/uploads/53b9f9b74c854b7a04cd188147d989e1/Screenshot_2021-12-25_at_15.35.58.png)

  **Running clinic handler**
 
 1. Clone the clinic handler repository [here](https://git.chalmers.se/courses/dit355/test-teams-formation/team-5/team-5-clinics-service)
    
 2. Open new terminal window

 3. type `ls` to see where you are

 4. You should be able to see the team-5-clinics-service folder, type `cd` to go in to the folder

 5. Inside the folder, type `npm start` to start the clinic handler
 
 6. If successful, your terminal output should look like this:

  ![Screenshot_2021-12-31_at_01.43.52](/uploads/3459b81b09343a48b094d7b0255670bc/Screenshot_2021-12-31_at_01.43.52.png)

