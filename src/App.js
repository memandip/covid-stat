import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route
} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Dashboard from './components/dashboard'
import Map from './components/map'
import RNavbar from './partials/RNavbar'

function App() {
	return (
		<Router>
			<RNavbar />
			<Switch>
				<Route path="/" exact={true} component={Dashboard} />
				<Route path="/map" exact={true} component={Map} />
			</Switch>
		</Router>
	)
}

export default App;
