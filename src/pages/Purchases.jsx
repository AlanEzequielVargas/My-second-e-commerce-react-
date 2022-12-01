import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPurchasesThunk } from "../store/slices/purchases.slice";
import { useSelector } from "react-redux";

const Purchases = () => {
	const dispatch = useDispatch();

	const purchasesList = useSelector((state) => state.purchases);

	useEffect(() => {
		dispatch(getPurchasesThunk());
	}, []);

	return (
		<div>
			<h1>Purchases historial</h1>

			{purchasesList.data?.purchases.map((purchase) => (
				<ul key={purchase.id}>
					{purchase.cart.products.map((prod) => (
						<li
							key={prod.id}
							style={{
								padding: 10,
								border: "solid 1px gray",
								borderRadius: "10px",
								listStyle: "none",
								boxShadow:
									"19px -11px 106px -53px rgba(0,0,0,0.12) inset",
							}}
						>
							<h3>
								<b>Product: </b>
								{prod.title}
							</h3>
							<h3>
								<b>Price: </b>${prod.price}
							</h3>
							<h3>
								<b>Purchase Date: </b>
								{prod.createdAt}
							</h3>
						</li>
					))}
				</ul>
			))}
		</div>
	);
};

export default Purchases;
