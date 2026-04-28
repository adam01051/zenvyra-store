// @ts-nocheck
import React, { Component } from "react";
import { type } from "../store";
import { clearScreenDown } from "readline";

class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			brand: "Ford",
			model: "Mustang",
			color: "red",
			year: 1964,
		};
	}

	changeColor = () => {
		this.setState({
			color: "blue",
			model: "model s",
			brand: "tesla",
			year: "2002",
		});
	};

	componentDidMount() {
		console.log("componentDidMount");
	}
	componentDidUpdate() {
		console.log("componentDidUpdate");
	}
	componentWillUnmount() {
		console.log("componentWillUnmount");
    }
    
    
	render() {
		return (
			<div>
				<h1>My {this.state.brand}</h1>
				<p>
					It is a {this.state.color} {this.state.model} from {this.state.year}.
				</p>
				<button type="button" onClick={this.changeColor}>
					change Color
				</button>
			</div>
		);
	}
}

export default Test;
