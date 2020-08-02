import React from 'react';
import { BrowserRouter as Router,basename } from 'react-router-dom';
import Cookies from 'universal-cookie';

import './App.css';
import history from "./history";
import AppContext from "./context";
import Routes from './Routes';
import Login from './login';

const cookies=new Cookies();
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			serverURL:'http://18.213.86.227:4000',
			token:'',
			userdata:[],
			isLogin:false
		}
		// global.serverURL='http://localhost:4000';
		// global.token=''
		//console.log(useContext(AppContext))
	}
	storeData=()=>{
		let store=cookies.get('login')
		if(store && store.login)
		{
			this.setState({isLogin:true,token:store.token,userdata:store.userdata})
		}
	}
	componentDidMount=() =>{
		this.storeData();
	}
	render() {
		if(!this.state.isLogin) return <Login {...this.state} storeData={this.storeData} />
		else return (
			<AppContext.Provider value={{serverURL:this.state.serverURL,token:this.state.token,userdata:this.state.userdata}} >
			<Router basename="/Tarnea" history={history}>
			<Routes />
			</Router>
			</AppContext.Provider>
			);	
	}  
}

export default App;
