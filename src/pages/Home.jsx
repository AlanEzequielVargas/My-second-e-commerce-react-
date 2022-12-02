import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	getProductsThunk,
	filterProductsByCategoryThunk,
	filterProductsThunk,
} from "../store/slices/products.slice";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Row, Col, Card, Button, Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Icon from "../components/Icon";
import { faCartShopping, faSearch } from "@fortawesome/free-solid-svg-icons";
import "../styles/home.css";
import { addProductToCartThunk } from "../store/slices/cart.splice";

const Home = () => {
	const [categories, setCategories] = useState([]);

   const navigate = useNavigate()

	const [inputSearch, setInputSearch] = useState("");

	const dispatch = useDispatch();

	const [price, setPrice] = useState(5000);

	const products = useSelector((state) => state.products);

	const prices = products.filter((prod) => Number(prod.price) < price);

	useEffect(() => {
		dispatch(getProductsThunk());
		axios.get(
			"https://e-commerce-api.academlo.tech/api/v1/products/categories"
		).then((res) => setCategories(res.data.data.categories));
	}, []);

	function addToCart(id) {
		const producto = {
			id: id,
			quantity: 1,
		};
		dispatch(addProductToCartThunk(producto));
		swal({
			title: "Added product to cart",
			icon: "success",
			timer: "2000",
			button: false,
		});
	}

	return (
		<div>
			<Row>
				<h2>Products</h2>

				{/* INPUT */}
				<Col lg={12}>
					<InputGroup className="mb-3">
						<Form.Control
							placeholder="Search product"
							aria-label="Search product"
							aria-describedby="basic-addon2"
							value={inputSearch}
							onChange={(e) =>
								setInputSearch(e.target.value)
							}
						/>
						<Button
							onClick={() =>
								dispatch(
									filterProductsThunk(inputSearch)
								)
							}
							style={{ width: 100 }}
						>
							<Icon icon={faSearch} />
						</Button>
					</InputGroup>
				</Col>
			</Row>

			<Row >
				<Col lg={3} >
					{/* Input range price */}
					<Dropdown style={{ marginBottom: 20}}>
						<Dropdown.Toggle
							style={{ width: '100%' , margin: 'auto'}}
							variant="light"
							id="dropdown-basic"
						>
							Price
						</Dropdown.Toggle>
						<Dropdown.Menu style={{ padding: 10 }}>
							<Form.Label>
								Range of price ${price}
							</Form.Label>
							<Form.Range
								min={0}
								max={5000}
								value={price}
								onChange={(e) =>
									setPrice(e.target.value)
								}
							/>
						</Dropdown.Menu>
					</Dropdown>
					{/* CATEGORIES */}
					<Dropdown>
						<Dropdown.Toggle
							style={{ width: '100%' }}
							variant="light"
							id="dropdown-basic"
						>
							Categories
						</Dropdown.Toggle>

						<Dropdown.Menu style={{ width: '100%' }}>
							{categories.map((category) => (
								<Dropdown.Item
									key={category.id}
									onClick={() =>
										dispatch(
											filterProductsByCategoryThunk(
												category.id
											)
										)
									}
								>
									{category.name}
								</Dropdown.Item>
							))}
						</Dropdown.Menu>
					</Dropdown>
				</Col>

				{/* PRODUCTS */}
				<Col gap={3}>
					<Row md={3} className='products-container' >
						{prices.map((prod) => (
							<Card
								key={prod.id}
								style={{
									width: "18rem",
									height: "25rem",
									borderRadius: "10px",
								}}
							>
								<Link
									to={`/products/${prod.id}`}
									style={{
										textDecoration: "none",
										color: "black",
										height: "100%",
										display: "flex",
										flexDirection: "column",
										justifyContent: "center",
										alignContent: "space-between",
									}}
								>
									<div className="img-n-title">
										<Card.Img
											variant="top"
											src={prod.productImgs[0]}
											style={{
												height: 200,
												objectFit:
													"contain",
												padding: 10,
											}}
										/>

										<Card.Title>
											{prod.title}
										</Card.Title>
									</div>
								</Link>
								<Card.Body className="price-n-btn">
									<Card.Text
										style={{
											fontWeight: 1000,
											fontSize: 25,
										}}
									>
										${prod.price}
									</Card.Text>
									<Button
										onClick={() => {
                                 if(localStorage.getItem('token')){
                                 addToCart(prod.id)
                              }else {
                                 swal({
                                    title: "You have to be logged in to add products",
                                    text: 'Do you want to login?',
                                    icon: "error",
                                    
                                    buttons: ['No','Yes'],
                                 }).then(res => {if(res){
                                    navigate('/login')
                                 }});
                              }}
											
										}
										variant="success"
										style={{
											width: 50,
											height: 50,
											borderRadius: 100,
										}}
									>
										<Icon
											icon={faCartShopping}
											style={{
												padding: 10,
											}}
										/>
									</Button>
								</Card.Body>
							</Card>
						))}
					</Row>
				</Col>
			</Row>
		</div>
	);
};

export default Home;
