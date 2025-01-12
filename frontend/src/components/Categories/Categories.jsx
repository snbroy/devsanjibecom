import { useContext } from "react";
import { CreateContextApi } from "../../context/MyContextApi";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Categories = () => {
    const context = useContext(CreateContextApi)
    const { categoriesA, loading } = context;

    const handleError = (e) => {
        e.target.src = "https://res.cloudinary.com/djnv06fje/image/upload/v1630702866/ecommerce/default-image_ql6v0z.jpg";
    }

    if (loading) {
        return <Spinner />
    }

    const sliderSettings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
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
        <div className="categories-wrapper">
            <h2 className="content-heading">Categories</h2>
            <Slider {...sliderSettings}>
                {categoriesA?.map((category, index) => {
                    // const categoryClass = category.toLowerCase().replace(" ", "").replace("'", "");
                    return (
                        <div className="category-item" key={index}>
                            <Link to={`/collection/${encodeURIComponent(category.name)}`} className="full-link">&nbsp;</Link>
                            <div className="cat-content">
                                <img src={category.img} alt={category.name} onError={(e)=>handleError(e)} />
                                <h3 className="cat-name">{category.name}</h3>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        </div>
    );
}

export default Categories;