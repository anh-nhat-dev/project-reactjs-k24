import React from "react";
import ProductItem from "../../shared/components/ProductItem";
import { getProducts } from "../../services/Api";

const Home = () => {
  const [productNews, updateProductNews] = React.useState([]);
  const [productFeature, updateProductFeature] = React.useState([]);

  React.useEffect(() => {
    getProducts({ params: { limit: 6 } }).then(({ data }) => {
      updateProductNews(data.data.docs);
    });

    getProducts({
      params: {
        limit: 6,
        "filter[is_featured]": true,
      },
    }).then(({ data }) => {
      updateProductFeature(data.data.docs);
    });
  }, []);

  return (
    <>
      <div className="products">
        <h3>Sản phẩm nổi bật</h3>
        <div className="product-list card-deck">
          {productFeature.map((product) => {
            return <ProductItem key={product._id} item={product} />;
          })}
        </div>
      </div>
      <div className="products">
        <h3>Sản phẩm mới</h3>
        <div className="product-list card-deck">
          {productNews.map((product) => {
            return <ProductItem key={product._id} item={product} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
