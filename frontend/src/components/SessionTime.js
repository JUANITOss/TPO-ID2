import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SessionTime = () => {
  const [sessionTime, setSessionTime] = useState(null);

  useEffect(() => {
    const fetchSessionTime = async () => {
      try {
        const response = await axios.get('/api/users/session-time');
        setSessionTime(response.data.sessionTime);
      } catch (error) {
        console.error('Error fetching session time', error);
      }
    };

    fetchSessionTime();
  }, []);

  return (
    <div>
      {sessionTime !== null ? (
        <p>Tiempo de sesión activa: {sessionTime} minutos</p>
      ) : (
        <p>Cargando tiempo de sesión...</p>
      )}
    </div>
  );
};

export default SessionTime;
