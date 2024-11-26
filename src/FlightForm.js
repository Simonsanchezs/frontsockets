import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const FlightForm = () => {
  const [flightData, setFlightData] = useState({
    flightCode: '',
    latitude: '',
    longitude: '',
    course: '',
    speed: '',
    altitude: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightData({ ...flightData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const socket = new SockJS('http://localhost:8080/flight-tracker-websocket');
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      console.log('Conectado al WebSocket');
      stompClient.send('/app/updateFlight', {}, JSON.stringify(flightData));
      alert('Datos enviados al radar');
    });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Flight Tracker
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField label="Flight Code" name="flightCode" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Latitude" name="latitude" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Longitude" name="longitude" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Course" name="course" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Speed" name="speed" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Altitude" name="altitude" onChange={handleChange} fullWidth margin="normal" />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
          Send Data
        </Button>
      </Box>
    </Container>
  );
};

export default FlightForm;
