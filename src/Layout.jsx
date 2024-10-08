import { BrowserRouter, Route, Routes } from "react-router-dom";

import injectContext from "./js/store/AppContext";

import ScrollToTop from "./js/components/ScrollToTop";
import { Home } from "./js/views/Home";
import "./styles/index.css";
import { Categories } from "./js/views/Categories";
import { Subcategories } from "./js/views/Subcategories";
import { Colors } from "./js/views/Colors";
import { Results } from "./js/views/Results";
import "./i18n";
import { Navbar } from "./js/components/Navbar";
const Layout = () => {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/subcategories" element={<Subcategories />} />
              <Route path="/colors" element={<Colors />} />
              <Route path="/results" element={<Results />} />
              <Route path="*" element={<h1>Not found!</h1>} />
            </Routes>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
