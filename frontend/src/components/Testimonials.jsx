
const testimonialsData = [
    {
      id: 1,
      name: 'John Doe',
      text: 'This is the best service I have ever used. Highly recommend!',
      image: '/profile/profile.png'
    },
    {
      id: 2,
      name: 'Jane Smith',
      text: 'Amazing experience! Will definitely come back again.',
      image: '/profile/profile.png'
    },
    {
      id: 3,
      name: 'Sam Wilson',
      text: 'Top-notch service and great quality products.',
      image: '/profile/profile.png'
    },
    {
      id: 4,
      name: 'Sam Wilson',
      text: 'Top-notch service and great quality products.',
      image: '/profile/profile.png'
    }
  ];

const Testimonials = () =>{
    return(
        <div>
            <div className="testimonial-wrapper">
                <h2 className="content-heading">Testimonials</h2>
                <div className="testimonial-list flex gap-20">
                    {testimonialsData.map((testimonial) => (
                        <div key={testimonial.id} className="testimonial-item">
                            <img src={testimonial.image} alt={testimonial.name} />
                            <h2>{testimonial.name}</h2>
                            <p>{testimonial.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Testimonials;