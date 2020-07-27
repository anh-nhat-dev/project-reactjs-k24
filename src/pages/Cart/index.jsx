/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import React from "react";
import { getImageProduct, formatPriceNumber } from "../../shared/utils";
import {
  UPDATE_CART,
  DELETE_ITEM_CART,
} from "../../shared/constants/action-type";
import { useSelector, useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();

  const { carts } = useSelector(({ Cart }) => ({ carts: Cart.items }));
  const totalPrice = carts.reduce((a, c) => a + c.qty * c.price, 0);

  function onChangeInput(e, id) {
    const value = parseInt(e?.target?.value);

    if (value <= 0) {
      // eslint-disable-next-line no-restricted-globals
      const isConfirm = confirm("Xóa sản phẩm khỏi giỏi hàng");

      return !isConfirm
        ? dispatch({
            type: UPDATE_CART,
            payload: {
              id,
              qty: 1,
            },
          })
        : dispatch({
            type: DELETE_ITEM_CART,
            payload: {
              id,
            },
          });
    }

    dispatch({
      type: UPDATE_CART,
      payload: {
        id,
        qty: value,
      },
    });
  }

  function onDeleteItem(e, id) {
    e.preventDefault();
    const isConfirm = confirm("Xóa sản phẩm khỏi giỏi hàng");

    return isConfirm
      ? dispatch({
          type: DELETE_ITEM_CART,
          payload: {
            id,
          },
        })
      : false;
  }

  return (
    <>
      <div>
        {/*	Cart	*/}
        <div id="my-cart">
          <div className="row">
            <div className="cart-nav-item col-lg-7 col-md-7 col-sm-12">
              Thông tin sản phẩm
            </div>
            <div className="cart-nav-item col-lg-2 col-md-2 col-sm-12">
              Tùy chọn
            </div>
            <div className="cart-nav-item col-lg-3 col-md-3 col-sm-12">Giá</div>
          </div>
          <form method="post">
            {carts.map((item) => {
              return (
                <div className="cart-item row">
                  <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                    <img src={getImageProduct(item?.image)} />
                    <h4>{item?.name}</h4>
                  </div>
                  <div className="cart-quantity col-lg-2 col-md-2 col-sm-12">
                    <input
                      type="number"
                      id="quantity"
                      className="form-control form-blue quantity"
                      value={item?.qty}
                      onChange={(e) => onChangeInput(e, item?._id)}
                    />
                  </div>
                  <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                    <b>{formatPriceNumber(item?.price)}</b>
                    <a onClick={(e) => onDeleteItem(e, item?._id)} href="#">
                      Xóa
                    </a>
                  </div>
                </div>
              );
            })}

            <div className="row">
              <div className="cart-thumb col-lg-7 col-md-7 col-sm-12">
                <button
                  id="update-cart"
                  className="btn btn-success"
                  type="submit"
                  name="sbm"
                >
                  Cập nhật giỏ hàng
                </button>
              </div>
              <div className="cart-total col-lg-2 col-md-2 col-sm-12">
                <b>Tổng cộng:</b>
              </div>
              <div className="cart-price col-lg-3 col-md-3 col-sm-12">
                <b>{formatPriceNumber(totalPrice)}</b>
              </div>
            </div>
          </form>
        </div>
        {/*	End Cart	*/}
        {/*	Customer Info	*/}
        <div id="customer">
          <form method="post">
            <div className="row">
              <div id="customer-name" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Họ và tên (bắt buộc)"
                  type="text"
                  name="name"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-phone" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Số điện thoại (bắt buộc)"
                  type="text"
                  name="phone"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-mail" className="col-lg-4 col-md-4 col-sm-12">
                <input
                  placeholder="Email (bắt buộc)"
                  type="text"
                  name="mail"
                  className="form-control"
                  required
                />
              </div>
              <div id="customer-add" className="col-lg-12 col-md-12 col-sm-12">
                <input
                  placeholder="Địa chỉ nhà riêng hoặc cơ quan (bắt buộc)"
                  type="text"
                  name="add"
                  className="form-control"
                  required
                />
              </div>
            </div>
          </form>
          <div className="row">
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Mua ngay</b>
                <span>Giao hàng tận nơi siêu tốc</span>
              </a>
            </div>
            <div className="by-now col-lg-6 col-md-6 col-sm-12">
              <a href="#">
                <b>Trả góp Online</b>
                <span>Vui lòng call (+84) 0988 550 553</span>
              </a>
            </div>
          </div>
        </div>
        {/*	End Customer Info	*/}
      </div>
    </>
  );
};

export default Cart;
