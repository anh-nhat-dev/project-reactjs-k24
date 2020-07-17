import React from "react";
import "moment/locale/vi";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./shared/components/Layout/Header";
import Footer from "./shared/components/Layout/Footer";
import Menu from "./shared/components/Layout/Menu";
import Slider from "./shared/components/Layout/Slider";
import SideBar from "./shared/components/Layout/SideBar";

import HomePage from "./pages/Home";
import ProductDetailPage from "./pages/ProductDetail";
import CategoryPage from "./pages/Category";
import SearchPage from "./pages/Search";
import CartPage from "./pages/Cart";
import NotFoundPage from "./pages/NotFound";

import { getCategories } from "./services/Api";

function App() {
  const [categories, updateCategores] = React.useState([]);

  React.useEffect(() => {
    getCategories().then(({ data }) => {
      updateCategores(data.data.docs);
    });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div id="body">
        <div className="container">
          <Menu data={categories} />
          <div className="row">
            <div id="main" className="col-lg-8 col-md-12 col-sm-12">
              <Slider />
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                  path="/product-detail-:id"
                  exact
                  component={ProductDetailPage}
                />
                <Route path="/category-:id" component={CategoryPage} exact />
                <Route path="/search" exact component={SearchPage} />
                <Route path="/cart" exact component={CartPage} />
                <Route path="/404" exact component={NotFoundPage} />
                <Route render={() => <Redirect to="/404" />} />
              </Switch>
            </div>
            <SideBar />
          </div>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
