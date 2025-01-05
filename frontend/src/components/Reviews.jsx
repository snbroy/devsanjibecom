import React from 'react';

const reviewsData = [
  {
    id: 1,
    name: 'John Doe',
    text: 'This is the best service I have ever used. Highly recommend!',
    rating: 5,
    image: '/profile/profile.png'
  },
  {
    id: 2,
    name: 'Jane Smith',
    text: 'Amazing experience! Will definitely come back again.',
    rating: 4,
    image: '/profile/profile.png'
  },
  {
    id: 3,
    name: 'Sam Wilson',
    text: 'Top-notch service and great quality products.',
    rating: 5,
    image: '/profile/profile.png'
  },
  {
    id: 4,
    name: 'Sam Wilson',
    text: 'Top-notch service and great quality products.',
    rating: 5,
    image: '/profile/profile.png'
  }
];

const Reviews = () => {
  return (
    <div className="review-wrapper">
      <h2 className='content-heading'>Customer Reviews</h2>
      <div className="review-container">
        {reviewsData.map((review) => (
          <div key={review.id} className="review-item">
            {/* <img src={review.image} alt={review.name} /> */}
            <h3>{review.name}</h3>
            <p>{review.text}</p>
            <div className="rating">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;