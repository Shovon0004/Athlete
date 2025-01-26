import React, { useState, useEffect } from 'react';
import News from './News';

const SportsPage = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetch('')
      .then(response => response.json())
      .then(data => setHeadlines(data.articles));
  }, []);

  return (
    <div>
      <News headlines={headlines} />
    </div>
  );
};

export default SportsPage;