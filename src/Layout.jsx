import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";



import injectContext from "./store/AppContext";

import ScrollToTop from "./components/ScrollToTop";

//create your first component
const Layout = () => {

	return (
		<div>
			<BrowserRouter>
				<ScrollToTop>
			
					<Routes>
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext (Layout);