import React from 'react';

const News = ({ headlines }) => {
  return (
    <div>
      <h1>Top Business Headlines</h1>
      <ul>
        {headlines.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.author}</p>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;