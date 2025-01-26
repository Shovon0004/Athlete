import React, { useState, useEffect } from 'react';
import News from './News';

const App = () => {
  const [headlines, setHeadlines] = useState([]);

  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=96e8d8d338864e7cb30985681a6b4893')
      .then(response => response.json())
      .then(data => setHeadlines(data.articles));
  }, []);

  return (
    <div>
      <News headlines={headlines} />
    </div>
  );
};

export default S;