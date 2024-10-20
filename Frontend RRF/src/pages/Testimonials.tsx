import "../styles/Testimonials.css"

interface TestimonialItem {
    name: string;
    role: string;
    testimonial: string;
    avatarUrl: string;
    rating: number;
  }
  
  const testimonialData: TestimonialItem[] = [
    {
      name: "Shivam Singh",
      role: "HR",
      testimonial: "Right Resource Fit has streamlined our hiring process! It's user-friendly and saves us so much time.",
      avatarUrl: "src/assets/uxer avtar/WhatsApp Image 2023-08-27 at 07.48.31.png",  
      rating: 5
    },
    {
      name: "Pranav Gupta",
      role: "Recruitment Specialist",
      testimonial: "A game changer! The analytics and tracking features have improved our recruitment efficiency significantly.",
      avatarUrl: "src/assets/uxer avtar/ai-generated-8772393_1280.png",  
      rating: 5
    },
    {
      name: "Rashmi",
      role: "Talent Acquisition",
      testimonial: "We've attracted higher-quality candidates and reduced our time-to-hire. Very satisfied with the results!",
      avatarUrl: "src/assets/uxer avtar/compressed_fc7d2208a932c3899f0093cb7eee32c7.png",
      rating: 5
    }
  ];

const Testimonials = () => {
  return (
    <div>
      <div className="testimonial-section">
      <h3>TESTIMONIAL</h3>
      <h1>💬 • What Our Users Say About Us</h1>
      <h4>
        Curious about the reviews from users who have used the Right Resource Fit website to find their
        next career opportunity? Let’s check below!
      </h4>

      <div className="testimonial-cards">
        {testimonialData.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <div className="testimonial-avatar">
              <img src={item.avatarUrl} alt={item.name} />
            </div>
            <p className="testimonial-text">"{item.testimonial}"</p>
            <p className="testimonial-name">{item.name}</p>
            <p className="testimonial-role">{item.role}</p>
            <div className="testimonial-rating">
              {Array.from({ length: item.rating }).map((_, i) => (
                <span key={i}>⭐</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Testimonials
