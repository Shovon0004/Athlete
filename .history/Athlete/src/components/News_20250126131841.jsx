import React from 'react';

const NewsContainer = ({ headlines }) => (
  <div className="container mx-auto space-y-6">
    {headlines.map(({ title, author, url, description, urlToImage }, i) => (
      <NewsArticle key={i} title={title} author={author} url={url} description={description} urlToImage={urlToImage} />
    ))}
  </div>
);

const NewsArticle = ({ title, author, url, description, urlToImage }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
      {urlToImage && (
        <img src={urlToImage} alt={title} className="mb-4 w-full rounded-t-lg" />
      )}
      <h3 className="text-lg font-medium">{title}</h3>
    </a>
    <p className="text-gray-500 mb-2">{author}</p>
    <p className="text-gray-700">{description}</p>
  </div>
);

export default NewsContainer;