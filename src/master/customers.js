import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios'

import AppContext from '../context'
import Menu from '../templates/menu'
import ViewBreadcrumb from '../templates/viewbreadcrumb'

class Customer extends React.Component {

	constructor(props)	{
		super(props);
		this.state = {
			id:'',customername:'',address:'',phoneno:'',email:'',isUpdate:false,
			error:{id:'',customername:'',address:'',phoneno:'',email:''}
		}
	}
	clear=()=>{
		const data=this.state;		
		Object.keys(data).forEach(key=> {
			if(key!=='id'&&key!=='isUpdate'&&key!=='error')
				data[key]=''
		});
		this.setState({data})
	}
	validateEmail=(email)=> {
		// eslint-disable-next-line
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	validateFields=()=>{
		const data=this.state;
		let error=this.state.error
		Object.keys(error).forEach(key=> {
			error[key]=''
		});

		let isError=false;
		if(data.id==='') {error.id='Please Fill ID';isError=true;}
		if(data.customername==='') {error.customername='Please Fill CustomerName';isError=true;}
		if(data.address==='') {error.address='Please Fill Address';isError=true;}
		if(data.phoneno==='') {error.phoneno='Please Fill PhoneNo';isError=true;}
		else if(data.phoneno.length<10) {error.phoneno='Enter Valid PhoneNo';isError=true;}
		if(data.email==='') {error.email='Please Fill EmailID';isError=true;}
		else if(!this.validateEmail(data.email)) {error.email='Please Fill Valid EmailID';isError=true;}
		this.setState({error})

		return isError;
	}

	componentDidMount=()=>{
		if(this.props.location.state!==undefined)
		{
			axios.get(this.context.serverURL+"/api/Customers",{headers:{auth:this.context.token},params: {id:this.props.location.state.id}}).then(res=>{
				let view=res.data.data[0];
				this.setState({id:view.id,customername:view.customername,address:view.address,phoneno:view.phoneno,email:view.email,isUpdate:true})
			})
		}
		else 
		{
			axios.get(this.context.serverURL+"/api/Customers/Auto",{headers:{auth:this.context.token}}).then(res=>{
				this.setState({id:res.data.data[0].id})
			})
		}		
	}
	onChange=(event)=>{
		this.setState({[event.target.name]:event.target.value})
	}

	onSubmit=(e)=>{
		e.preventDefault();
		if(!this.validateFields())
		{
			if(this.state.isUpdate)	{
				let data=this.state
				data.action='update'     		
				data.userid=1     		
				axios.post(this.context.serverURL+"/api/Customers/Update",data,{headers:{auth:this.context.token}}).then(res=>{
					if(res.data.status==='success')
						this.props.history.push('/Customers')
				})	
				alert('Customer Details Updated Successfully..!!')
			}
			else {
				let data=this.state     		
				data.userid=1     		
				axios.post(this.context.serverURL+"/api/Customers/Add",data,{headers:{auth:this.context.token}}).then(res=>{
					if(res.data.status==='success')
						this.props.history.push('/Customers')
				})
				alert('Customer Details Added Successfully..!!')
			}
		}
	}

	render() {
		let propsBread=!this.state.isUpdate?"Home,Customers,Add New":"Home,Customers,Update";
		let propsTitle=!this.state.isUpdate?"Add":"Update";
		let	view=(
			<>
			<Menu />     

			<div className="menubar"> 
			<ViewBreadcrumb breadcrumb={propsBread}/>

			<div className="row text-left"> 
			<div className="col-2"></div>
			<div className="col-8">
			<Card>
			<CardHeader tag="h4">{propsTitle} Customer</CardHeader>      
			<CardBody className="padding-20 font-weight-bold">

			<div className="form-group">
			<label>ID</label>
			<input name="id" type="text" className="form-control" disabled value={this.state.id} />
			</div>
			<div className="form-group">
			<label>Customer Name</label>
			<input name="customername" type="text" className="form-control" required onChange={this.onChange} value={this.state.customername} />
			{this.state.error.customername!==''?<span className="error">{this.state.error.customername}</span>:''}
			</div>
			<div className="form-group">
			<label>Customer Address</label>
			<textarea name="address" className="form-control" required onChange={this.onChange}  value={this.state.address} />
			{this.state.error.address!==''?<span className="error">{this.state.error.address}</span>:''}
			</div>
			<div className="form-group">
			<label>Phone No</label>
			<input name="phoneno" type="text" className="form-control" maxLength='10' required onChange={this.onChange}  value={this.state.phoneno} />
			{this.state.error.phoneno!==''?<span className="error">{this.state.error.phoneno}</span>:''}
			</div>
			<div className="form-group">
			<label>Email ID</label>
			<input name="email" type="email" className="form-control" required onChange={this.onChange}  value={this.state.email} />
			{this.state.error.email!==''?<span className="error">{this.state.error.email}</span>:''}
			</div>
			
			<div className="text-right">
			<Button color="primary" onClick={this.onSubmit}>Submit</Button>{'  '}
			<Button color="secondary" onClick={this.clear}>Clear</Button>
			</div>

			</CardBody>
			</Card>
			</div>
			<div className="col-2"></div>
			</div>
			</div>

			</>
			)
		return view;
	}
}
Customer.contextType=AppContext;
export default Customer;