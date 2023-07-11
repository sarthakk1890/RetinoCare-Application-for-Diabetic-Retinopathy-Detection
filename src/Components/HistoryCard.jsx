import React from 'react';

const HistoryCard = ({ imgPath, imgResult, imgDate }) => {
  return (
    <div className="card custom-shadow custom-card" style={{ width: '18rem' }}>
      <img className="card-img-top" src={imgPath} style={{ height: '200px', objectFit: 'cover' }} alt="" />
      <div className="card-body">
        <div className="card-body">
          <h5 className="card-title">{imgResult.charAt(0).toUpperCase() + imgResult.slice(1)}</h5>
          <p className="card-text">
            <small className="text-muted">Uploaded on {new Date(imgDate).toGMTString()}</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
