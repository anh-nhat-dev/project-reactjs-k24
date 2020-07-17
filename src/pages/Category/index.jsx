import React from "react";
import ProductItem from "../../shared/components/ProductItem";

import { getCategory, getProductsCategory } from "../../services/Api";

const Category = (props) => {
  const id = props.match.params.id;

  const [category, updateCategory] = React.useState(null);
  const [products, updatePropducts] = React.useState([]);
  const [totalProduct, updateTotalProduct] = React.useState(0);

  React.useEffect(() => {
    getCategory(id)
      .then(({ data }) => {
        if (data && !data.data) return props.history.push("/404");
        getProductsCategory(id, { params: { limit: 12 } }).then(({ data }) => {
          updatePropducts(data.data.docs);
          updateTotalProduct(data?.data?.items?.total || 0);
        });
        updateCategory(data.data);
      })
      .catch((err) => props.history.push("/404"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      <div>
        {/*	List Product	*/}
        <div className="products">
          <h3>
            {category?.name} (hiện có {totalProduct} sản phẩm)
          </h3>

          <div className="product-list card-deck">
            {products.map((product) => {
              return <ProductItem key={product._id} item={product} />;
            })}
          </div>
        </div>
        {/*	End List Product	*/}
        <div id="pagination">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                Trang trước
              </a>
            </li>
            <li className="page-item active">
              <a className="page-link" href="#">
                1
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#">
                Trang sau
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
