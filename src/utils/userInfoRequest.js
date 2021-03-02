import { request } from './request'

// ID + PW + MAC address
export const requestLogin = (srvno, password, device_id) => 
	request.post('/Accounts/login/',{
		srvno: srvno,
	password: password,
	device_id: device_id,
})

// Destroy TOKEN
export const requestLogout = (token) => 
	request.post('/Accounts/logout/',{},{
		headers: {
		'AUTHORIZATION': 'jwt ' + token,
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
})

export const requestUserData = (token) => 
	request.post('/Accounts/info/',{},{
		headers: {
		'AUTHORIZATION': 'jwt ' + token,
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	}
})

// User's detail Info
export const requestSignup = (srvno, password, name, rank, position, unit, phone, device_id) => 
	request.post('/Accounts/signup/',{
		srvno : srvno,
		password : password,
		name : name,
		rank : rank,
		position : position,
		unit : unit,
		phone : phone,
		device_id : device_id,
})