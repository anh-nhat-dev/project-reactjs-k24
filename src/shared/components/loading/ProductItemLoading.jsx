import React from "react";
import Skeleton from "react-loading-skeleton";

function ProductItemLoading({ loop }) {
  function renderLoading() {
    const arr = new Array(loop).fill(loop);
    return arr;
  }

  return (
    <>
      {renderLoading().map((item, index) => {
        return (
          <div
            key={index}
            style={{ padding: 30 }}
            className="product-item card text-center"
          >
            <Skeleton height={220} />
            <Skeleton style={{ marginTop: 7.5 }} height={20} />
            <Skeleton style={{ marginTop: 7.5 }} height={20} />
          </div>
        );
      })}
    </>
  );
}
ProductItemLoading.defaultProps = {
  loop: 6,
};

export default ProductItemLoading;
