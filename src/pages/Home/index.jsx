import React from "react";
import ProductItem from "../../shared/components/ProductItem";
import { getProducts } from "../../services/Api";
import ProductItemLoading from "../../shared/components/loading/ProductItemLoading";

const Home = () => {
  const [productNews, updateProductNews] = React.useState([]);
  const [productFeature, updateProductFeature] = React.useState([]);

  const [loading, updateLoading] = React.useState({
    loadingProductNews: false,
    loadingProductFeature: false,
  });

  React.useEffect(() => {
    updateLoading({
      ...loading,
      loadingProductNews: true,
      loadingProductFeature: true,
    });

    getProducts({ params: { limit: 6 } }).then(({ data }) => {
      updateLoading({ ...loading, loadingProductNews: false });
      updateProductNews(data.data.docs);
    });
    getProducts({
      params: {
        limit: 6,
        "filter[is_featured]": true,
      },
    }).then(({ data }) => {
      updateProductFeature(data.data.docs);
      updateLoading({ ...loading, loadingProductFeature: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {!loading?.loadingProductFeature ? (
            productFeature.map((product) => {
              return <ProductItem key={product._id} item={product} />;
            })
          ) : (
            <ProductItemLoading />
          )}
        </div>
      </div>
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {!loading.loadingProductNews ? (
            productNews.map((product) => {
              return <ProductItem key={product._id} item={product} />;
            })
          ) : (
            <ProductItemLoading />
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
