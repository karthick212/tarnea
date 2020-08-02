import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom'

import AppContext from './context'
import Home from './templates/home'

import ViewSuppliers from './master/views/viewsuppliers'
import ViewCustomers from './master/views/viewcustomers'
import ViewEmployees from './master/views/viewemployees'

import AddStores from './master/stores'
import AddSuppliers from './master/suppliers'
import AddCustomers from './master/customers'
import AddEmployees from './master/employees'

class App1 extends React.Component
{
	static contextType=AppContext;
	render()
	{
		return(
			<Switch>
			
			<Route exact path='/' component={Home} />
			<Route exact path='/Employees' component={ViewEmployees} />
			<Route exact path='/Suppliers' component={ViewSuppliers} />
			<Route exact path='/Customers' component={ViewCustomers} />

			<Route path='/Stores' component={AddStores} />
			<Route path='/Employees/Add' component={AddEmployees} />
			<Route path='/Suppliers/Add' component={AddSuppliers} />
			<Route path='/Customers/Add' component={AddCustomers} />
			<Route
			render={function() {
				return <h1>Page Not Found</h1>;
			}} 
			/>
			</Switch>
			)
		}
	}

	export default withRouter(App1);