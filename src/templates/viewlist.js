import React from 'react'
import { Card, Button, CardHeader, CardBody } from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';

import ViewBreadcrumb from './viewbreadcrumb'

export default class ViewList extends React.Component {
	constructor(props)
	{
		super();
	}
	
	render()
	{	
		return(
			<> 
			<ViewBreadcrumb {...this.props} />
			
			<div> 
			<Card>
			<CardHeader>
			<div className="row">
			<h4 className="col-10 text-left">{this.props.header}</h4>
			<div className="col-2"><Button color="primary" onClick={this.props.addnew}>Add New</Button></div>        
			</div>
			</CardHeader>      
			<CardBody>
			<MDBDataTableV5
			hover entriesOptions={[10, 25, 50]} pagesAmount={4}
			pagingTop searchTop searchBottom={false} 
			data={this.props.data}
			/>
			</CardBody>
			</Card>
			</div>

			</>
			)
	}
}