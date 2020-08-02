import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import AppContext from '../../context'
import Menu from '../../templates/menu'
import ViewList from '../../templates/viewlist'

class App extends React.Component {

  constructor(props)
  {    
  	super(props);    
  	this.state = {
  		viewdata:[]
  	}
  }
  addnew=()=>{
    this.props.history.push('/Customers/Add');
  }
  deleteItem=(id)=>{
    var r = window.confirm('Are u want to Delete?')
    if(r===true) {
      axios.post(this.context.serverURL+"/api/Customers/Update",{id:id,action:'del',userid:1},{headers:{auth:this.context.token}}).then(res=>{
        if(res.data.status==='success')
          this.loadDate();
      })
    }    
  }
  loadDate=()=>{
    axios.get(this.context.serverURL+"/api/Customers",{headers:{auth:this.context.token}}).then(res=>{
      if(res.data.status==='success')
        this.setState({viewdata:res.data.data})       
    })
  }
  componentDidMount=()=> {
    this.loadDate();
  }
  render() {
    const data={
      columns: [
      {            
        label: 'ID',
        field: 'id',
        sort: 'asc',
      },
      {            
        label: 'Customer Name',
        field: 'customername',
        sort: 'asc',
      },
      {
        label: 'Phone Number',
        field: 'phoneno',
        sort: 'asc',
      },
      {
        label: 'Email ID',
        field: 'email',
        sort: 'asc',
      },
      {
        label: 'Action',
        field: 'action',
      }], 
      rows: [...this.state.viewdata.map((res,i)=>({
        id:res.id,
        customername:res.customername,
        phoneno:res.phoneno,
        email:res.email,
        action:<><Link className="btn btn-primary btn-sm" to={{pathname:"/Customers/Add",state:{id:res.id} }} onClick={this.toggle}>Edit</Link>&nbsp;<Link to={{}} className="btn btn-danger btn-sm" onClick={()=>this.deleteItem(res.id)}>Delete</Link></>
      }))]
    }
    let	view=(
    <>
    <Menu />     

    <div className="menubar"> 
    <ViewList breadcrumb="Home,Customers,View" header="Customers" data={data} addnew={this.addnew}/>
    </div>

    </>
    )
    return view;
  }
}
App.contextType=AppContext;
export default App;