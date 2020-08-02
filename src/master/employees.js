import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios'

import AppContext from '../context'
import Menu from '../templates/menu'
import ViewBreadcrumb from '../templates/viewbreadcrumb'

class Employee extends React.Component {

	constructor(props)	{
		super(props);
		this.state = {
			empid:'',empserial:'',empname:'',designation:'Owner',phoneno:'',email:'',password:'',isUpdate:false,
			error:{empid:'',empserial:'',empname:'',designation:'',phoneno:'',email:'',password:''}
		}
	}
	clear=()=>{
		const data=this.state;		
		Object.keys(data).forEach(key=> {
			if(key!=='empid'&&key!=='empserial'&&key!=='isUpdate'&&key!=='error')
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
		if(data.empname==='') {error.empname='Please Fill EmployeeName';isError=true;}
		if(data.designation==='') {error.designation='Please Fill Designation';isError=true;}
		if(data.phoneno==='') {error.phoneno='Please Fill PhoneNo';isError=true;}
		else if(data.phoneno.length<10) {error.phoneno='Enter Valid PhoneNo';isError=true;}
		if(data.email==='') {error.email='Please Fill EmailID';isError=true;}
		else if(!this.validateEmail(data.email)) {error.email='Please Fill Valid EmailID';isError=true;}
		if(data.password==='') {error.password='Please Fill Password';isError=true;}
		this.setState({error})

		return isError;
	}

	componentDidMount=()=>{
		if(this.props.location.state!==undefined)
		{
			axios.get(this.context.serverURL+"/api/Employees",{headers:{auth:this.context.token},params: {id:this.props.location.state.id}}).then(res=>{
				console.log(res)
				let view=res.data.data[0];
				console.log(view)
				this.setState({empid:view.employeeid,empserial:view.employeeserial,empname:view.employeename,designation:view.designation,phoneno:view.phoneno,email:view.email,password:view.password,isUpdate:true})
			})
		}
		else 
		{
			axios.get(this.context.serverURL+"/api/Employees/Auto",{headers:{auth:this.context.token}}).then(res=>{
				this.setState({empid:res.data.empid,empserial:res.data.empserial})
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
			if(this.state.isUpdate) {
				let data=this.state
				data.action='update'     		
				data.userid=1     		
				console.log(data)
				axios.post(this.context.serverURL+"/api/Employees/Update",data,{headers:{auth:this.context.token}}).then(res=>{
					if(res.data.status==='success')
						this.props.history.push('/Employees')
				})	
				alert('Employee Details Updated Successfully..!!')				
			}
			else {
				let data=this.state		
				data.userid=1     		
				console.log(data)
				axios.post(this.context.serverURL+"/api/Employees/Add",data,{headers:{auth:this.context.token}}).then(res=>{
					if(res.data.status==='success')
						this.props.history.push('/Employees')
				})
				alert('Employee Details Added Successfully..!!')
			}
		}
	}

	render() {
		let propsBread=!this.state.isUpdate?"Home,Employees,Add New":"Home,Employees,Update";
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
			<CardHeader tag="h4">{propsTitle} Employee</CardHeader>      
			<CardBody className="padding-20 font-weight-bold">

			<div className="form-group">
			<label>Employee ID</label>
			<input name="empid" type="text" className="form-control" disabled value={this.state.empid} />
			</div>
			<div className="form-group">
			<label>Employee Name</label>
			<input name="empname" type="text" className="form-control" required onChange={this.onChange} value={this.state.empname} />
			{this.state.error.empname!==''?<span className="error">{this.state.error.empname}</span>:''}
			</div>
			<div className="form-group">
			<label>Designation</label>
			<select name="designation" className="form-control" onChange={this.onChange} value={this.state.designation}>
			<option  value="Owner">Owner</option>
			<option  value="Manager">Manager</option>
			<option  value="SalesPerson">SalesPerson</option>
			</select>
			{this.state.error.designation!==''?<span className="error">{this.state.error.designation}</span>:''}
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
			<label>Password</label>
			<input name="password" type="text" className="form-control" required onChange={this.onChange}  value={this.state.password} />
			{this.state.error.password!==''?<span className="error">{this.state.error.password}</span>:''}
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
Employee.contextType=AppContext;
export default Employee;