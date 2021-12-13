# Team 5 Frontend

This is the frontend of the DENTISTIMO project.

Responsibilities:

- Display interactive map allowing users to navigate to dentist practices
- Display info about clinics 
- Allow user to book an appointment 
- Publish booking (date + time) to MQTT broker 

## Data Input 

The client subscribes to a topic in the clinic handler and expects to recieve dentist data via MQTT.   
This data is then displayed on the map in line with the requirements. 


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

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
