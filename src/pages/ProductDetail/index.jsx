import React from "react";
import moment from "moment";

import {
  getProduct,
  getCommentsProduct,
  createCommentProduct,
} from "../../services/Api";
import { getImageProduct } from "../../shared/utils";

const ProductDetail = ({ match, history }) => {
  const { id } = match.params;

  const [product, updateProduct] = React.useState(null);
  const [comments, updateComments] = React.useState(null);
  const [inputComment, updateInputComment] = React.useState(null);

  function getComments(id) {
    getCommentsProduct(id, { params: { sort: "-_id" } }).then(({ data }) => {
      updateComments(data.data.docs);
    });
  }

  function onChangeInput(e) {
    const { name, value } = e.target;
    updateInputComment({ ...inputComment, [name]: value });
  }
  function onSubmitComment(e) {
    e.preventDefault();

    createCommentProduct(id, inputComment).then(({ data }) => {
      if (data.status === "success") {
        updateInputComment({});
        getComments(id);
      }
    });
  }

  React.useEffect(() => {
    getProduct(id).then(({ data }) => {
      if (data.data) {
        return updateProduct(data.data);
      }
      history.push("/404");
    });
    getComments(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <>
      {(product && (
        <div>
          <div id="product">
            <div id="product-head" className="row">
              <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
                <img src={product?.image && getImageProduct(product.image)} />
              </div>
              <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
                <h1>{product?.name}</h1>
                <ul>
                  {product?.accessories && (
                    <li>
                      <span>Đi kèm:</span> {product.accessories}
                    </li>
                  )}
                  {product?.status && (
                    <li>
                      <span>Tình trạng:</span> {product.status}
                    </li>
                  )}
                  {product?.promotion && (
                    <li>
                      <span>Khuyến Mại:</span> {product.promotion}
                    </li>
                  )}

                  <li id="price">Giá Bán (chưa bao gồm VAT)</li>
                  <li id="price-number"> {product?.price || 0} đ</li>
                  <li id="status">
                    {product?.is_stock ? (
                      <span className="badge badge-success">Còn hàng</span>
                    ) : (
                      <span className="badge badge-danger">Hết hàng</span>
                    )}
                  </li>
                </ul>
                {product?.is_stock ? (
                  <div id="add-cart">
                    <a href="#">Mua ngay</a>
                  </div>
                ) : null}
              </div>
            </div>
            <div id="product-body" className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h3>Đánh giá về {product?.name}</h3>
                {product?.details}
              </div>
            </div>
            {/*	Comment	*/}
            <div id="comment" className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h3>Bình luận sản phẩm</h3>
                <form method="post">
                  <div className="form-group">
                    <label>Tên:</label>
                    <input
                      name="name"
                      required
                      type="text"
                      value={inputComment?.name || ""}
                      onChange={onChangeInput}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      name="email"
                      required
                      type="email"
                      onChange={onChangeInput}
                      value={inputComment?.email || ""}
                      className="form-control"
                      id="pwd"
                    />
                  </div>
                  <div className="form-group">
                    <label>Nội dung:</label>
                    <textarea
                      name="content"
                      required
                      onChange={onChangeInput}
                      rows={8}
                      className="form-control"
                      value={inputComment?.content || ""}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={onSubmitComment}
                    name="sbm"
                    className="btn btn-primary"
                  >
                    Gửi
                  </button>
                </form>
              </div>
            </div>
            {/*	End Comment	*/}
            {/*	Comments List	*/}
            {comments?.length && (
              <div id="comments-list" className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  {comments.map((comment) => {
                    const m = moment(comment?.createdAt);
                    return (
                      <div key={comment?._id} className="comment-item">
                        <ul>
                          <li>
                            <b>{comment?.name}</b>
                          </li>
                          <li>{m.fromNow()}</li>
                          <li>
                            <p>{comment?.content}</p>
                          </li>
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/*	End Comments List	*/}
          </div>
          {/*	End Product	*/}
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
      )) ||
        null}
    </>
  );
};

export default ProductDetail;
