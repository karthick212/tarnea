import React from 'react'
import TreeMenu from 'react-simple-tree-menu';
import { withRouter } from 'react-router-dom'
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.css';
import AppContext from "../context";

const cookies=new Cookies();

class Menu extends React.Component {  
  onClick=()=>{
    cookies.remove('login');
    window.location.reload();
  }
	render()
	{    
    let userdata=this.context.userdata;
    let masterItems={
      'second-level-node-1': {
        label: 'Stores',
        index: 0,
        url:'/Stores',
        access:'Owner'
      },
      'second-level-node-2': {
        label: 'Employees',
        index: 1,
        url:'/Employees',
        access:'Owner'        
      },
      'second-level-node-3': {
        label: 'Suppliers',
        index: 2,
        url:'/Suppliers',
        access:'Owner,Manager'        
      },
      'second-level-node-4': {
        label: 'Customers',
        index: 3,
        url:'/Customers',
        access:'Owner,Manager,SalesPerson'        
      },        
    }
Object.keys(masterItems).forEach((key,index,obj)=>{
  if(!masterItems[key].access.includes(userdata.usertype))
  delete masterItems[key]
})
console.log(masterItems)

    const treeData = {
  'first-level-node-1': {               // key
    label: 'Master',
    index: 0, // decide the rendering order on the same level    
    nodes: masterItems,
  },
'first-level-node-2': {
  label: 'Logout',
  index: 1,
  url:''
},
};     

	return(
  <>
    <div className="main-header">
     <h4 className="logo sidewidth text-center padding-12">Admin Panel</h4>
     <div className="navbar navbar-top padding-12">
     Welcome {userdata.username}
     </div>
     </div>

<div className="main-header">
     <div className="menu sidewidth">
     <TreeMenu data={treeData}
     onClickItem={({ key, label, url }) => {      
      if(url!==undefined)
      {
        if(label==='Logout') this.onClick();
        else this.props.history.push(url);
      }       
    }} />
    </div>
    </div>
    </>
	)
	}	
}
Menu.contextType=AppContext;
export default withRouter(Menu);