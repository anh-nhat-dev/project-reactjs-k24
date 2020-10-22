import React from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RESET_CART } from "../../shared/constants/action-type";

function OrderSuccess(props) {
  const isOrderSuccess = props?.location?.state?.isOrderSuccess;

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch({
      type: RESET_CART,
    });
  }, [dispatch]);

  if (!isOrderSuccess) {
    return <Redirect to="/" />;
  }

  return (
    <div class="col-12 mt-5 ">
      <div className="alert alert-primary">
        <p>Đặt hàng thành công!</p>
      </div>
    </div>
  );
}

export default OrderSuccess;
