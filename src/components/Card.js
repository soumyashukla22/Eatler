import React from 'react';
import './Card.css';

const Card = ({title, image, description}) => {
  return (
    <div className="col-md-6">
      <div className="blog-entry-content card">
        <img src={image} alt={title}  />
        <div className="blog-entry-content-footer">
          <p className="blog-entry-content-title">{title}</p>
          <p className="blog-entry-content-desc">{description}</p>
          <p className="blog-entry-content-more">Read More</p>
        </div>
      </div>
    </div>
  )}

  export default Card
