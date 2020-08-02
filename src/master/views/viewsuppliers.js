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
    this.props.history.push('/Suppliers/Add');
  }
  deleteItem=(id)=>{
    var r = window.confirm('Are u want to Delete?')
    if(r===true) {
      axios.post(this.context.serverURL+"/api/Suppliers/Update",{id:id,action:'del',userid:1},{headers:{auth:this.context.token}}).then(res=>{
        if(res.data.status==='success')
          this.loadDate();
      })
    }    
  }
  loadDate=()=>{
    axios.get(this.context.serverURL+"/api/Suppliers",{headers:{auth:this.context.token}}).then(res=>{
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
        label: 'Supplier Name',
        field: 'suppliername',
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
        label: 'GSTIN',
        field: 'gstin',
        sort: 'asc',
      },
      {
        label: 'Action',
        field: 'action',
      }], 
      rows: [...this.state.viewdata.map((res,i)=>({
        id:res.id,
        suppliername:res.suppliername,
        phoneno:res.phoneno,
        email:res.email,
        gstin:res.gstin,
        action:<><Link className="btn btn-primary btn-sm" to={{pathname:"/Suppliers/Add",state:{id:res.id} }} onClick={this.toggle}>Edit</Link>&nbsp;<Link to={{}} className="btn btn-danger btn-sm" onClick={()=>this.deleteItem(res.id)}>Delete</Link></>
      }))]
    }
    let	view=(
    <>
    <Menu />     

    <div className="menubar"> 
    <ViewList breadcrumb="Home,Suppliers,View" header="Suppliers" data={data} addnew={this.addnew}/>
    </div>

    </>
    )
    return view;
  }
}
App.contextType=AppContext;
export default App;