import axios from "axios";
import React from "react";
import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";
import Icon from "../components/Icon";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
	const { handleSubmit, register } = useForm();

	const navigate = useNavigate();

	function submit(data) {
		axios.post(
			"https://e-commerce-api.academlo.tech/api/v1/users/login/",
			data
		)
			.then((res) => {
				navigate("/");
				localStorage.setItem("token", res.data.data.token);
				localStorage.setItem(
					"userName",
					`${res.data.data.user.firstName} ${res.data.data.user.lastName}`
				);
			})
			.catch((error) => {
				if (error.response?.status === 404) {
					swal({
						title: "incorrect credentials",
						icon: "info",
						button: "retry",
					});
				} else {
					console.log(error.response?.data);
				}
			});
	}

	const [token, setToken] = useState(localStorage.getItem("token"));

	!token &&
		swal({
			title: "test this app with:",
			text: "napoleon-hill@gmail.com pass: napoleon1234",
		});

	return (
		<>
			{token ? (
				<div
					style={{
						width: 800,
						height: 800,
						margin: "13rem auto 0rem auto",
					}}
				>
					<Card
						style={{
							textAlign: "center",
							borderRadius: 15,
							width: "30rem",
							height: "30rem",
							margin: "auto",
							padding: 200,
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							gap: 25,
						}}
					>
						<Icon icon={faUser} css={"user-icon"} />
						<Card.Title style={{ margin: 0, width: 200 }}>
							{localStorage.getItem("userName")}
						</Card.Title>
						<Card.Body style={{ margin: 0, width: 200 }}>
							<Card.Link
								onClick={() => {
									setToken(
										localStorage.removeItem(
											"token"
										)
									);
									localStorage.removeItem(
										"userName"
									);
								}}
								style={{
									cursor: "pointer",
									margin: 0,
									width: 200,
								}}
							>
								Log out
							</Card.Link>
						</Card.Body>
					</Card>
				</div>
			) : (
				<div
					style={{
						width: 500,
						height: 500,
						margin: "13rem auto 0rem auto",
					}}
				>
					<h1>Login</h1>
					<Form onClick={handleSubmit(submit)}>
						<Form.Group
							className="mb-3"
							controlId="formBasicEmail"
						>
							<Form.Label>Email address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter email"
								{...register("email")}
							/>
							<Form.Text className="text-muted">
								We'll never share your email with anyone
								else.
							</Form.Text>
						</Form.Group>

						<Form.Group
							className="mb-3"
							controlId="formBasicPassword"
						>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type="password"
								placeholder="Password"
								{...register("password")}
							/>
						</Form.Group>

						<Button variant="primary" type="submit">
							Log in
						</Button>
					</Form>
				</div>
			)}
		</>
	);
};

export default Login;
