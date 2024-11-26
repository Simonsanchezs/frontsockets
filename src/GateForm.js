import React, { useState } from 'react'; // Import React and useState hook for state management
import { Button, TextField, Container, Typography, Box } from '@mui/material'; // Material-UI components
import SockJS from 'sockjs-client'; // Library for establishing WebSocket connections
import { Stomp } from '@stomp/stompjs'; // STOMP protocol for messaging over WebSocket

const GateForm = () => {
  // Local state for form fields
  const [gate, setGate] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [status, setStatus] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Establish a WebSocket connection using SockJS
    const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    const stompClient = Stomp.over(socket); // STOMP protocol over WebSocket

    // Connect to the WebSocket server
    stompClient.connect({}, () => {
      // Gate information to send
      const gateInfo = {
        gate,
        flightNumber,
        destination,
        departureTime,
        status,
      };

      // Send gateInfo to the server via '/app/updateGate'
      stompClient.send('/app/updateGate', {}, JSON.stringify(gateInfo));
    });
  };

  return (
    <Container maxWidth="sm">
      {/* Form title */}
      <Typography variant="h4" align="center" gutterBottom>
        Update Gate Information
      </Typography>

      {/* Form for updating gate information */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        {/* Gate field */}
        <TextField
          fullWidth
          label="Gate"
          value={gate}
          onChange={(e) => setGate(e.target.value)} // Update gate state on change
          margin="normal"
        />
        {/* Flight Number field */}
        <TextField
          fullWidth
          label="Flight Number"
          value={flightNumber}
          onChange={(e) => setFlightNumber(e.target.value)} // Update flightNumber state on change
          margin="normal"
        />
        {/* Destination field */}
        <TextField
          fullWidth
          label="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)} // Update destination state on change
          margin="normal"
        />
        {/* Departure Time field */}
        <TextField
          fullWidth
          label="Departure Time"
          value={departureTime}
          onChange={(e) => setDepartureTime(e.target.value)} // Update departureTime state on change
          margin="normal"
        />
        {/* Status field */}
        <TextField
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)} // Update status state on change
          margin="normal"
        />
        {/* Submit button */}
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Update Gate
        </Button>
      </Box>
    </Container>
  );
};

export default GateForm;
