import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const history = useHistory();
  const [keyword, updateKeyWord] = React.useState("");

  const totalCart = useSelector(({ Cart }) =>
    Cart.items.reduce((a, c) => a + c.qty, 0)
  );

  function handleOnChangeInput(e) {
    const { value } = e.target;
    updateKeyWord(value);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    history.push(`/search?q=${keyword}`);
  }

  return (
    <div id="header">
      <div className="container">
        <div className="row">
          <div id="logo" className="col-lg-3 col-md-3 col-sm-12">
            <h1>
              <a href="#">
                <img className="img-fluid" src="/images/logo.png" />
              </a>
            </h1>
          </div>
          <div id="search" className="col-lg-6 col-md-6 col-sm-12">
            <form onSubmit={handleOnSubmit} className="form-inline">
              <input
                className="form-control mt-3"
                type="search"
                value={keyword}
                placeholder="Tìm kiếm"
                aria-label="Search"
                onChange={handleOnChangeInput}
              />
              <button className="btn btn-danger mt-3" type="submit">
                Tìm kiếm
              </button>
            </form>
          </div>
          <div id="cart" className="col-lg-3 col-md-3 col-sm-12">
            <Link to="/cart" className="mt-4 mr-2" href="#">
              giỏ hàng
            </Link>
            <span className="mt-3">{totalCart}</span>
          </div>
        </div>
      </div>
      {/* Toggler/collapsibe Button */}
      <button
        className="navbar-toggler navbar-light"
        type="button"
        data-toggle="collapse"
        data-target="#menu"
      >
        <span className="navbar-toggler-icon" />
      </button>
    </div>
  );
};

export default Header;
