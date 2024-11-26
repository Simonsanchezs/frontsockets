import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client'; // WebSocket library compatible with different browsers
import { Stomp } from '@stomp/stompjs'; // STOMP protocol for messaging over WebSocket
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'; // Material-UI components for the table
import GateForm from './GateForm'; // External component for managing gate forms

const GateBoard = () => {
  // State to store gate data
  const [gateData, setGateData] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection using SockJS
    const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    const stompClient = Stomp.over(socket); // STOMP protocol over WebSocket connection

    // Connect to the WebSocket server
    stompClient.connect({}, () => {
      // Subscribe to the '/topic/gates' channel to receive real-time updates
      stompClient.subscribe('/topic/gates', (message) => {
        if (message.body) {
          const updatedGate = JSON.parse(message.body); // Parse the received message to JSON

          setGateData((prevData) => {
            // Filter out duplicate entries and add the new information
            const updatedData = prevData.filter((data) => data.gate !== updatedGate.gate);
            return [...updatedData, updatedGate]; // Add the updated gate to the state
          });
        }
      });
    });

    // Cleanup: Disconnect from WebSocket when the component unmounts
    return () => {
      stompClient.disconnect();
    };
  }, []); // Empty dependency array ensures this effect runs only on mount/unmount

  return (
    <div>
      {/* Render the form to manage gate data */}
      <GateForm />

      {/* Table container for gate data */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {/* Table headers */}
              <TableCell>Gate</TableCell>
              <TableCell>Flight Number</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Departure Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render rows dynamically based on gate data state */}
            {gateData.map((gateInfo, index) => (
              <TableRow key={index}>
                {/* Table cells with gate information */}
                <TableCell>{gateInfo.gate}</TableCell>
                <TableCell>{gateInfo.flightNumber}</TableCell>
                <TableCell>{gateInfo.destination}</TableCell>
                <TableCell>{gateInfo.departureTime}</TableCell>
                <TableCell>{gateInfo.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GateBoard;
