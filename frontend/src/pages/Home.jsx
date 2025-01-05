import Categories from "../components/Categories/Categories";
import Reviews from "../components/Reviews";
import HomeSlider from "../components/slider/Slider";
import Testimonials from "../components/Testimonials";

const Home = () => {

  return (
    <div className="homepage-wrapper">
      <div className="mx-container">
        <HomeSlider />
        <Categories />
        <Testimonials />
        <Reviews />
      </div>
    </div>
  );
};

export default Home;