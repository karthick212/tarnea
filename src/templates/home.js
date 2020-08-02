import React from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import Menu from './menu'

class App extends React.Component {

  constructor(props)
  {
  	super(props);    
  	this.state = {
  		isModal:false  
  	}
  }
  toggle=()=>{
    console.log('hii triggered')
  }
  render() {    
    let	view=(
     <>
     <Menu />     

    <div className="menubar"> 
    Welcome Home
    </div>

    </>
    )
    return view;
  }
}

export default App;