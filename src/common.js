import React from 'react'
export const validateEmail=(email)=> {
	const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

export const clear=(state,exceptions='')=>{
	const splitException=exceptions.split(",");
	Object.keys(state).forEach(key=> {
		if(!splitException.includes(key))
			state[key]=''
	});
	return state;
}

export const validateFields=(state,emptyFields=[],emailFields=[])=>{
	const data=state;
	let error=clear(data.error)

	const emptyKeyArr=emptyFields.map(m=>m.key)
	const emailKeyArr=emailFields.map(m=>m.key)
	data.isError=false;

	Object.keys(data).forEach(key=> {
		 if(emptyKeyArr.includes(key)&&data[key]==='') {
		 	data.isError=true;
		 	let errVal=emptyFields.filter(m=>m.key==key)[0].errVal
		 	error[key]=(<span className="error">{errVal}</span>)
		}
		else if(emailKeyArr.includes(key)&&!validateEmail(data[key])) {
		 	data.isError=true;
		 	let errVal=emailFields.filter(m=>m.key==key)[0].errVal
		 	error[key]=(<span className="error">{errVal}</span>)
		}
	});
	return data;
}

export const customValidation=(state,key,errVal)=>{
	const data=state;
	let error=data.error

	error[key]=(<span className="error">{errVal}</span>)
	data.isError=true
	return data
}
