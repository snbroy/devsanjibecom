import Product from "./Product";
const SearchResult = ({data}) => {
    return (
        <div className="search-result">
            <h5>Search Result</h5>
            <div className="search-result-content">
            {data.map((post, index) => {
                if (index >= 4) {
                    return;
                }
                return (
                    <>
                        <Product key={post.id} post={post} />
                    </>
                    
                )
            })}
            </div>
        </div>
    );
}

export default SearchResult;