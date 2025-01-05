import { useContext } from "react";
import { CreateContextApi } from "../../context/MyContextApi";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const Categories = () => {
    const context = useContext(CreateContextApi)
    const { categoriesA, loading } = context;

    if (loading) { 
        return <Spinner />
    }

    return (
        <div className="categories-wrapper">
            {categoriesA?.map((category, index) => {
                const categoryClass = category.toLowerCase().replace(" ", "").replace("'", "");
                return (
                    <div className="category-item" key={index}>
                        <Link to={`/collection/${categoryClass}`} className="full-link">&nbsp;</Link>
                        <div className="cat-content">
                            <img src={`/categories/${categoryClass}.jpg`} alt={category} />
                            <h3 className="cat-name">{category}</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Categories;