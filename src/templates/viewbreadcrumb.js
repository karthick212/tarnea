import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class ViewBreadcrumb extends React.Component
{
	constructor(props) {
		super();
	}
	render()
	{
		const marginBottom={marginBottom:'0.2rem'}		
		let splitBreadcrumb=this.props.breadcrumb.split(',')
		let arrBreadcrumb=[]
		for(let j in splitBreadcrumb)
		{		
		let i=Number(j)
		let path='/'+splitBreadcrumb[i]
		if(i===splitBreadcrumb.length-1) arrBreadcrumb.push(<BreadcrumbItem key={i} className="text-right" active>{splitBreadcrumb[i]}</BreadcrumbItem>)
		else if(i===0) arrBreadcrumb.push(<BreadcrumbItem key={i} className="text-right"><Link to="/">{splitBreadcrumb[i]}</Link></BreadcrumbItem>)
		else arrBreadcrumb.push(<BreadcrumbItem key={i} className="text-right"><Link to={path}>{splitBreadcrumb[i]}</Link></BreadcrumbItem>)
		}
	return(<> 
			<Breadcrumb style={marginBottom}>
			{arrBreadcrumb}
			</Breadcrumb>
			</>
)	
	}
}

export default ViewBreadcrumb;