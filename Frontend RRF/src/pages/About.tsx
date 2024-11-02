import '../styles/About.css';
import garg1 from '/pics3/hhh.avif';
import mov from '/pics3/mov.jpg';
import images from '/pics3/images.jpg';
import download from '/pics3/download.jpg';
import Navbar from '../components/Navbar3';
import Footer from '../components/Footer3';

const Header1: React.FC = () => {
  return (
    <header id="byy">
      <Navbar />
      <div className="banner">
        <div id="container5">
          <h1 id="banner-title1">ABOUT</h1>
        </div>
      </div>
    </header>
  );
};

const MainSection: React.FC = () => {
  return (
    <section id="design2">
      <div id="container5">
        <div id="title1">
          <h2>Bonjour!!</h2>
        </div>
        <div id="design2-content">
          <div id="design2-item">
            <div id="design2-img">
              <img src={download} alt="latest movie" />
            </div>
            <div id="design2-title1"></div>
          </div>
          <div id="design2-item">
            <h1>
              <b>"Right Resource Fit's Aesthetic"</b>
            </h1>
            <h2>
              <b>Right Resource Fit:</b>
            </h2>
            <p>
              <i>
                The soul creativity or love put the essence of yourself that is
                put into your work. ReelBite is the world's most popular and
                authoritative source for movie, TV and celebrity content. This
                site also has an exit-the-plugin feature. The site was created
                by Pranav Gupta. It is operated by P's, Inc.
              </i>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogSection: React.FC = () => {
  return (
    <section id="blog1">
      <div id="container5">
        <div id="title1">
          <h2> It's Aesthetic:)</h2>
        </div>
        <div id="blog1-content">
          <div id="blog1-item">
            <div id="blog1-img">
              <img src={mov} alt="mov1" />
              <span>
                <i className="far fa-heart"></i>
              </span>
            </div>
            <div id="blog1-text">
              <span>15 Mar, 2024</span>
              <h2 id="hey1">Aesthetic Wallpapers</h2>
              {/* <p><b>One Mile At A Time</b></p>
                            <p>Read More..</p> */}
            </div>
          </div>
          <div id="blog1-item">
            <div id="blog1-img">
              <img src={garg1} alt="mov2" />
              <span>
                <i className="far fa-heart"></i>
              </span>
            </div>
            <div id="blog1-text">
              <span>22 March, 2024</span>
              <h2 id="hey1">Aesthetic Photography</h2>
              {/* <p><b>Finding Staff</b></p>
                            <p>Read More..</p> */}
            </div>
          </div>
          <div id="blog1-item">
            <div id="blog1-img">
              <img src={images} alt="mov3" />
              <span>
                <i className="far fa-heart"></i>
              </span>
            </div>
            <div id="blog1-text">
              <span>24 May, 2024</span>
              <h2 id="hey1">Aesthetic Photography</h2>
              {/* <p><b>The Job Place</b></p>
                            <p>Read More..</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const About: React.FC = () => {
  return (
    <div className="App">
      <Header1 />
      <MainSection />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default About;
