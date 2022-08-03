import React from "react";
import Cardlist from "../Components/Cardlist";
import SearchBox from "../Components/SearchBox";
import './App.css';
import Scroll from "../Components/Scroll";
import ErrorBoundary from "../Components/ErrorBoundary";

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

	componentDidMount(){
		fetch('https://jsonplaceholder.typicode.com/users')
		.then(response => {
			return response.json();
		 })
		.then(users => {
		this.setState({ robots: users })
	})
	}
	onSearchChange = (event) => {	
		this.setState({searchfield: event.target.value})
	}

	render(){
		const filteredRobots = this.state.robots.filter(robots => {
			return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
		})
		if(this.state.robots.length===0){
			return <h1 className="tc pa7">Loading...</h1>}
			else{
			<div className="tc">
				<h1 className="f1">RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Cardlist robots={filteredRobots}/>
			</div>
			}
		
		return (
		<div className="tc">
				<h1 className="f2">Vasu</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
					<Cardlist robots={filteredRobots} />
					</ErrorBoundary>
				</Scroll>
		</div>
	);
	}
}
export default App;