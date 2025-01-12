import ImageUrl from "./imageUrl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomeSlider = () => {
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 869,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                  initialSlide: 1
                }
              },
        ]
    };
    return (
        <div className="slider-wrapper">
            <div className="slider-container">

                <Slider {...sliderSettings}>
                    {

                        ImageUrl?.map((url, index) => (
                            <div key={index}>
                                <img src={url} alt="" className="slider-img" />
                            </div>
                        ))

                    }
                </Slider>

                {/* {ImageUrl?.map((img, index) => {
                    return (
                        <div key={index} className="slider-item">
                            <img src={img} alt="" className="slider-img" />
                        </div>
                    )
                }

                )
                } */}
            </div>
        </div>
    );
}

export default HomeSlider;