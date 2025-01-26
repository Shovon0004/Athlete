import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SportsPage = () => {
  const [commData, setCommData] = useState(null);

  useEffect(() => {
    const fetchCommData = async () => {
      try {
        const response = await axios.get('https://cricbuzz-cricket.p.rapidapi.com/mcenter/v1/41881/comm', {
          headers: {
            'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
            'x-rapidapi-key': '8b86613ae2msh4771cf9f202aaf6p10c215jsnd54097c8f0e1'
          }
        });
        setCommData(response.data);
      } catch (error) {
        console.error('Error fetching sports data:', error);
      }
    };
    fetchCommData();
  }, []);

  return (
    <div>
      {commData ? (
        <pre>{JSON.stringify(commData, null, 2)}</pre>
      ) : (
        <p>Loading sports data...</p>
      )}
    </div>
  );
};

export default SportsPage;