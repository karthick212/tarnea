import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import axios from 'axios'
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.css';

const cookies=new Cookies();
class App extends React.Component {
  constructor(props)
  {
  	super(props);    
  	this.state = {
  		username:'',password:'',error:{username:'',password:'',errmsg:''}
  	}
  }
  clear=()=>{
    const data=this.state;    
    Object.keys(data).forEach(key=> {
      if(key!=='error')
        data[key]=''
    });
    this.setState({data})
  }
  onChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  }
  validateFields=()=>{
    const data=this.state;
    let error=this.state.error
    Object.keys(error).forEach(key=> {
      error[key]=''
    });

    let isError=false;
    if(data.username==='') {error.username='Please Fill UserName';isError=true;}
    if(data.password==='') {error.password='Please Fill Password';isError=true;}
    this.setState({error})

    return isError;
  }
  onSubmit=(e)=>{
    e.preventDefault();
    if(!this.validateFields())  
    {     
      let data=this.state
      let error=this.state.error
      console.log(data)
      let dd=axios.post(this.props.serverURL+"/api/login",data).then(res=>{
        console.log(res)
        if(res.data.status==='success')
        {
          cookies.set('login',{token:res.data.token,userdata:res.data.data,login:true});
        }
        else error.errmsg='Invalid UserName/Password..!!'

        this.setState({error,isLogin:data.isLogin})
        this.props.storeData();
      })
      console.log(dd)          
    }
  }

  render() {  
    let	view=(
     <>
     <div className="row text-left centerscreen"> 
     <div className="col-4"></div>
     <div className="col-4">
     <Card>
     <CardHeader tag="h4">User Authentication</CardHeader>      
     <CardBody className="padding-20 font-weight-bold">

     <div className="form-group">
     <label>User Name</label>
     <input name="username" type="text" className="form-control" onChange={this.onChange} value={this.state.username} />
     {this.state.error.username!==''?<span className="error">{this.state.error.username}</span>:''}
     </div>
     <div className="form-group">
     <label>Password</label>
     <input name="password" type="password" className="form-control" required onChange={this.onChange}  value={this.state.password} />
     {this.state.error.password!==''?<span className="error">{this.state.error.password}</span>:''}
     </div>

     <div className="text-right">
     <Button color="primary" onClick={this.onSubmit}>Login</Button>{'  '}
     <Button color="secondary" onClick={this.clear}>Clear</Button>
     </div>
     {this.state.error.errmsg!==''?<span className="error">{this.state.error.errmsg}</span>:''}

     </CardBody>
     </Card>
     </div>
     <div className="col-4"></div>
     </div>
     </>
     )
    return view;
  }
}

export default App;