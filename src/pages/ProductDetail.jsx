import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsThunk } from "../store/slices/products.slice";
import { Link } from "react-router-dom";
import { Button, Card, Col, Nav, Row } from "react-bootstrap";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Icon from "../components/Icon";
import { faAdd, faSubtract } from "@fortawesome/free-solid-svg-icons";
import {
	addProductToCartThunk,
	updateProductCartThunk,
} from "../store/slices/cart.splice";
import swal from "sweetalert";

const ProductDetail = () => {
	const { id } = useParams();

	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		dispatch(getProductsThunk());
	}, []);

	const productsList = useSelector((state) => state.products);

	const product = productsList.find((prod) => prod.id === Number(id));

	const relatedProducts = productsList.filter(
		(prod) =>
			prod.category.id === product.category.id &&
			product.title !== prod.title
	);

	// BOOTSTRAP PESTAÑAS
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};

	//Add to cart function
	const [inputValue, setInputValue] = useState(1);

	function addToCart(units) {
		const productToCart = {
			id: product.id,
			quantity: Number(units),
		};

		const existProduct = cart.find(
			(prod) => prod.id === productToCart.id
		);
		

		const productToCartT = {
			id: product.id,
			newQuantity: Number(
				units + existProduct?.productsInCart.quantity
			),
		};

		if (existProduct === undefined) {
			dispatch(addProductToCartThunk(productToCart));
			setInputValue(1);
			swal({
				title: "Added product to cart",
				icon: "success",
				timer: "2000",
				button: false,
			});
		} else {
			dispatch(updateProductCartThunk(productToCartT));
			setInputValue(1);
			swal({
				title: "Added product to cart",
				icon: "success",
				timer: "2000",
				button: false,
			});
		}
	}

	return (
		<div>
			<Nav variant="tabs" defaultActiveKey="/home">
				<Nav.Item>
					<Nav.Link href="/home" eventKey="link-1">
						Products
					</Nav.Link>
				</Nav.Item>

				<Nav.Item>
					<Nav.Link href="/home">{product?.title}</Nav.Link>
				</Nav.Item>
			</Nav>
			{/* PRODUCT AND DETAILS */}
			<Row style={{ marginTop: 50 }}>
				<Col lg={8}>
					<h2 style={{ textAlign: "center" }}>
						{product?.title}
					</h2>

					<Carousel
						variant="dark"
						activeIndex={index}
						onSelect={handleSelect}
						style={{
							height: 500,
							width: '100%',
							margin: "auto",
						}}
					>
						{product?.productImgs.map((img) => (
							<Carousel.Item key={img}>
								<img
									className="d-block w-100"
									src={img}
									alt="First slide"
									style={{
										height: 500,
										objectFit: "contain",
										padding: "5px",
									}}
								/>
							</Carousel.Item>
						))}
					</Carousel>
					<h3 style={{ color: "gray", marginTop: 70 }}>
						Product description:
					</h3>
					<p>{product?.description}</p>
				</Col>

				
				<Col
					lg={4}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "space-evenly",
						height: "34vh",
					}}
				>
					<div>
						<p>Price:</p>
						<h2>${product?.price * inputValue}</h2>
					</div>

					<div style={{ textAlign: "center" }}>
						<p>Quantity:</p>
						<div style={{ display: "flex", gap: 12 }}>
							<Button
								variant="light"
								onClick={() =>
									setInputValue(inputValue - 1)
								}
								disabled={inputValue === 1}
							>
								<Icon icon={faSubtract} />
							</Button>
							<h2>{inputValue}</h2>
							<Button
								variant="light"
								onClick={() =>
									setInputValue(inputValue + 1)
								}
								disabled={inputValue === 5}
							>
								<Icon icon={faAdd} />
							</Button>
						</div>
					</div>

					<Button
						variant="success"
						onClick={() => {
                     if(localStorage.getItem('token')){
                     addToCart(inputValue)
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
					>
						Add to Cart
					</Button>
				</Col>
			</Row>

{/* RELATED PRODUCTS */}
			<Row className="mt-5" style={{ height: "50vh"}}>
				<h3>Related products:</h3>
				<Col className='g-5'
					style={{
						display: "flex",
						overflowX: "overlay",
                  whiteSpace: 'nowrap'
					}}
				>
					{relatedProducts.map((prod) => (
						<Card
							key={prod.id}
							style={{
								minHeight: "320px",
                        minWidth: '288px',
                       maxHeight: "320px",
                       maxWidth: '288px',
								borderRadius: "10px",
								padding: 10,
                        margin: 10
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
                           overflow: 'hidden'
								}}
							>
								<div className="img-n-title">
									<Card.Img
										variant="top"
										src={prod.productImgs[0]}
										style={{
											height: 200,
											objectFit: "contain",
											padding: 10,
										}}
									/>

									<Card.Title>
										{prod.title} 
										
										
									</Card.Title>
                           <Card.Subtitle style={{
												color: "green",
												fontWeight: "600",
											}}>
										
										
											${prod.price}
									
										
									</Card.Subtitle>
								</div>
							</Link>
						</Card>
					))}
				</Col>
			</Row>
		</div>
	);
};
export default ProductDetail;
