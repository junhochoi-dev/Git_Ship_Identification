import { request } from './request'

// ID + PW + MAC address
export const requestLogin = (serviceNum, password, device_id) => 
	request.post('/Accounts/login/',{
	serviceNum: serviceNum,
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
export const requestSignup = (serviceNum, password, name, rank, position, belong, phone, device_id) => 
	request.post('/Accounts/signup/',{
		serviceNum : serviceNum,
		password : password,
		name : name,
		rank : rank,
		position : position,
		belong : belong,
		phone : phone,
		device_id : device_id,
})