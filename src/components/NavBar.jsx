import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "../App.css";
import Cart from "./Cart";
import Icon from "./Icon";
import { useSelector } from "react-redux";

const NavBar = () => {
	const [show, setShow] = useState(false);

	function handleClose() {
		setShow(false);
	}

	const cart = useSelector((state) => state.cart);

	return (
		<>
			{/* NAV-BAR */}
			<Navbar
				className="nav-bar"
				bg="success"
				expand="lg"
				style={{ position: "fixed", width: "100%", zIndex: 3 }}
			>
				<Container>
					<Navbar.Brand
						as={Link}
						to="/"
						style={{ color: "white" }}
					>
						Free Store
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link
								as={Link}
								to="/purchases"
								style={{ color: "white" }}
							>
								My purchases
							</Nav.Link>
							<Nav.Link
								as={Link}
								to="/login"
								style={{ color: "white" }}
							>
								Login
							</Nav.Link>
						</Nav>

						<div
							onClick={() => setShow(!show)}
							style={{
								width: 30,
								height: 30,
								display: "flex",
							}}
						>
							<Icon
								icon={faCartShopping}
								css={"icon-navbar-color"}
							/>
							<p
								style={{
									textAlign: "center",
									color: "white",
								}}
							>
								{cart.length}
							</p>
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			{/* SIDEBAR */}
			<Cart show={show} handleClose={handleClose} />
		</>
	);
};

export default NavBar;
