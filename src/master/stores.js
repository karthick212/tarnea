import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios'

import AppContext from '../context'
import Menu from '../templates/menu'
import ViewBreadcrumb from '../templates/viewbreadcrumb'

class Store extends React.Component {

	constructor(props)	{
		super(props);
		this.state = {
			id:'',storename:'',address:'',phoneno:'',email:'',gstin:'',registerdetails:'',isUpdate:false,
			error:{id:'',storename:'',address:'',phoneno:'',email:'',gstin:'',registerdetails:''}
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
		if(data.storename==='') {error.storename='Please Fill StoreName';isError=true;}
		if(data.address==='') {error.address='Please Fill Address';isError=true;}
		if(data.phoneno==='') {error.phoneno='Please Fill PhoneNo';isError=true;}
		else if(data.phoneno.length<10) {error.phoneno='Enter Valid PhoneNo';isError=true;}
		if(data.email==='') {error.email='Please Fill EmailID';isError=true;}
		else if(!this.validateEmail(data.email)) {error.email='Please Fill Valid EmailID';isError=true;}
		if(data.gstin==='') {error.gstin='Please Fill GSTIN';isError=true;}
		else if(data.gstin.length<15) {error.gstin='Enter Valid GSTIN';isError=true;}		
		if(data.registerdetails==='') {error.registerdetails='Please Fill Registration Details';isError=true;}
		this.setState({error})

		return isError;
	}

	componentDidMount=()=>{
		//if(this.props.location.state!==undefined)
		axios.get(this.context.serverURL+"/api/Stores",{headers:{auth:this.context.token},params: {id:1}}).then(res=>{
			console.log(res)
			if(res.data.data.length===0)
			{
				axios.get(this.context.serverURL+"/api/Stores/Auto",{headers:{auth:this.context.token}}).then(res=>{
					this.setState({id:res.data.data[0].id})
				})
			}
			else {
				let view=res.data.data[0];
				console.log(view)
				this.setState({id:view.id,storename:view.storename,address:view.address,phoneno:view.phoneno,email:view.email,gstin:view.gstin,registerdetails:view.registerdetails,isUpdate:true})
			}
		})
		// else 
		// {
		// 	axios.get(this.context.serverURL+"/api/Stores/Auto").then(res=>{
		// 		this.setState({id:res.data.data[0].id})
		// 	})
		// }		
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
				axios.post(this.context.serverURL+"/api/Stores/Update",data,{headers:{auth:this.context.token}}).then(res=>{
					if(res.data.status==='success')
						this.props.history.push('/')
				})
				alert('Store Details Updated Successfully..!!')
			}
			else {
				let data=this.state     		
				axios.post(this.context.serverURL+"/api/Stores/Add",data,{headers:{auth:this.context.token}}).then(res=>{
					if(res.data.status==='success')
						this.props.history.push('/')
				})
				alert('Store Details Added Successfully..!!')
			}
		}
	}

	render() {
		let propsBread=!this.state.isUpdate?"Home,Stores,Add New":"Home,Stores,Update";
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
			<CardHeader tag="h4">{propsTitle} Store</CardHeader>      
			<CardBody className="padding-20 font-weight-bold">

			<div className="form-group">
			<label>ID</label>
			<input name="id" type="text" className="form-control" disabled value={this.state.id} />
			</div>
			<div className="form-group">
			<label>Store Name</label>
			<input name="storename" type="text" className="form-control" required onChange={this.onChange} value={this.state.storename} />
			{this.state.error.storename!==''?<span className="error">{this.state.error.storename}</span>:''}
			</div>
			<div className="form-group">
			<label>Store Address</label>
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
			<div className="form-group">
			<label>GSTIN</label>
			<input name="gstin" type="text" className="form-control" maxLength='15' required onChange={this.onChange}  value={this.state.gstin} />
			{this.state.error.gstin!==''?<span className="error">{this.state.error.gstin}</span>:''}
			</div>
			<div className="form-group">			
			<label>Registration Details</label>
			<textarea name="registerdetails" className="form-control" required onChange={this.onChange}  value={this.state.registerdetails} />
			{this.state.error.registerdetails!==''?<span className="error">{this.state.error.registerdetails}</span>:''}
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
Store.contextType=AppContext;
export default Store;