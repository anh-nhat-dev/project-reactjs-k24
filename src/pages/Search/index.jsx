/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { getProducts } from "../../services/Api";
import ProductItem from "../../shared/components/ProductItem";
import Pagination from "../../shared/components/Pagination";
import ProductItemLoading from "../../shared/components/loading/ProductItemLoading";

const Search = (props) => {
  const query = new URLSearchParams(props.location.search);
  const q = query.get("q");
  const page = query.get("page") || 1;

  const [pages, updatePages] = React.useState({
    total: 0,
    limit: 12,
    currentPage: page,
  });

  const [loadingProduct, updateLoadingProduct] = React.useState(false);

  const [products, updateProducts] = React.useState([]);

  React.useEffect(() => {
    updateLoadingProduct(true);
    getProducts({
      params: {
        name: q,
        limit: 12,
        page: page,
      },
    }).then(({ data }) => {
      updateProducts(data.data.docs);
      updatePages({ ...pages, ...data.data.pages });
      updateLoadingProduct(false);
    });
  }, [q, page]);

  return (
    <>
      {/*	List Product	*/}
      <div className="products">
        <div id="search-result">
          Kết quả tìm kiếm với từ khóa <span>{q}</span>
        </div>
        <div className="product-list card-deck">
          {!loadingProduct ? (
            products.map((product) => {
              return <ProductItem key={product._id} item={product} />;
            })
          ) : (
            <ProductItemLoading loop={12} />
          )}
        </div>
      </div>
      {/*	End List Product	*/}
      <div id="pagination">
        <Pagination pages={pages} />
      </div>
    </>
  );
};

export default Search;
