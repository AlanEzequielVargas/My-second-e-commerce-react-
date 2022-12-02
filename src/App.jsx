import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Purchases from "./pages/Purchases";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Spinner from "./components/Spinner";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Footer from "./components/Footer";
import swal from "sweetalert";

function App() {
	const isLoading = useSelector((state) => state.spinner);

	return (
		<div className="App">
			<HashRouter>
				{isLoading && <Spinner />}
				<NavBar />
				<br />
				<br />
				<br />
				<Container
					className="mb-5"
					style={{ minHeight: "100vh", width: "100%" }}
				>
					<Routes>
						<Route path="/" element={<Home />} />

						<Route
							path="/products/:id"
							element={<ProductDetail />}
						/>
						<Route path="/login" element={<Login />} />

						<Route element={<ProtectedRoutes />}>
							<Route
								path="/purchases"
								element={<Purchases />}
							/>
						</Route>
					</Routes>
				</Container>
				<Footer />
			</HashRouter>
		</div>
	);
}

export default App;
