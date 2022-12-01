import { Card, Offcanvas, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	checkoutCartThunk,
	deleteProductFromCartThunk,
	getCartProductsThunk,
} from "../store/slices/cart.splice";
import { useSelector } from "react-redux";
import Icon from "./Icon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const Cart = ({ show, handleClose }) => {
	const dispatch = useDispatch();

	const cart = useSelector((state) => state.cart);

	useEffect(() => {
		dispatch(getCartProductsThunk());
	}, []);

	let totalPrice = 0;
	for (let i = 0; i < cart.length; i++) {
		totalPrice =
			totalPrice +
			Number(cart[i].price * cart[i].productsInCart.quantity);
	}

	return (
		<>
			<Offcanvas show={show} onHide={handleClose} placement="end">
				<Offcanvas.Header closeButton>
					<Offcanvas.Title>
						Products in my cart: {cart.length}
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul style={{ paddingBottom: 100 }}>
						{cart.map((prod) => (
							<li
								key={prod.id}
								style={{
									listStyle: "none",
									marginTop: 5,
									padding: 5,
								}}
							>
								<Card style={{ width: "18rem" }}>
									<Card.Body>
										<Link
											to={`/products/${prod.id}`}
										>
											<Card.Title>
												{prod.title}{" "}
												<b
													style={{
														color: "black",
													}}
												>
													X
													{
														prod
															.productsInCart
															.quantity
													}
												</b>
											</Card.Title>
										</Link>
										<Card.Text>
											<b>{prod.brand}</b>
										</Card.Text>
										<Card.Text>
											<b>
												$
												{prod.price *
													prod
														.productsInCart
														.quantity}
											</b>
										</Card.Text>

										<Button
											variant="danger"
											onClick={() => {
												swal({
													title: "Delete this product from cart?",
													icon: "error",
													buttons: [
														"No",
														"Yes",
													],
													timmer: "2000",
												}).then((res) => {
													if (res) {
														dispatch(
															deleteProductFromCartThunk(
																prod.id
															)
														);
														swal({
															title: "Product has been deleted from cart",
															icon: "success",
															buttons: false,
															timmer: "2000",
														});
													}
												});
											}}
										>
											<Icon icon={faTrash} />
										</Button>
									</Card.Body>
								</Card>
							</li>
						))}
					</ul>
					<div
						style={{
							position: "fixed",
							bottom: 0,
							padding: 15,
							width: "100%",
							height: 70,
							backgroundColor: "white",
							borderTop: "gray 1px solid",
						}}
					>
						<b>Total: ${totalPrice}</b>
						<Button
							variant="success"
							style={{ marginLeft: 120 }}
							onClick={() => {
								dispatch(checkoutCartThunk());
								swal({
									title: "Thanks for your purchase",
									icon: "success",
									button: false,
									timmer: "2000",
								});
								totalPrice = 0;
							}}
						>
							CheckOut
						</Button>
					</div>
				</Offcanvas.Body>
			</Offcanvas>
		</>
	);
};

export default Cart;
