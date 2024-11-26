import React from 'react';
import { Container, Typography } from '@mui/material';
import GateBoard from './GateBoard';
import FlightForm from './FlightForm';

const App = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Gate Management System
      </Typography>

      {/* Tabla de las puertas */}
      <GateBoard />

      <Typography variant="h4" gutterBottom style={{ marginTop: '2rem' }}>
        Flight Tracking System
      </Typography>

      {/* Formulario para los vuelos */}
      <FlightForm />
    </Container>
  );
};

export default App;

