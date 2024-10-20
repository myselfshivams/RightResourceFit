import "../styles/Feedback.css"

const Feedback = () => {
  return (
    <div className="Feedback">
       <div className="container">
      <div className="textContainer">
        <h1 className="header">We Value Your Feedback</h1>
        <p className="description">
          Your opinion helps us improve our services. Share your thoughts and let us know how we can serve you better.
        </p>
        <button className="button">Leave Feedback →</button>
      </div>
      <div className="imageContainer">
        {/* Replace with your image source */}
        <img
          src="src\assets\7.png"
          alt="Feedback illustration"
          className="image"
        />
      </div>
    </div>
    </div>
  )
}

export default Feedback
