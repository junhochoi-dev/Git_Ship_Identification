import { request } from './request'

export const registerCommonShip = (token, base64, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region) => 
    request.post('/Ships/ship/normal/create/', {
			image_data: base64,
			name: name,
            types: types,
            code: code,
            tons: tons,
            size: size,
            is_ais: is_ais,
            is_vpass: is_vpass,
            is_vhf: is_vhf,
            is_ff: is_ff,
            port: region,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const registerCommonShipDetail = (token, id, base64, latitude, longitude, detail) => 
    request.post('/Boats/boat/addImage/', {
			id: id,
			image_data: base64,
			lat: latitude,
			lon: longitude,
			point: detail,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const registerWastedShip = (token, base64, types, latitude, longitude, info, region) => 
    request.post('/Ships/ship/waste/create/', {
			image_data: base64,
            types: types,
			lat: latitude,
			lon: longitude,
			info: info,
            region: region,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// searchCommonShip with condition
export const searchCommonShip = (token, index, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port) => 
    request.post('/Ships/ship/normal/search/?page=' + index, {
			name: name,
            types: types,
            code: code,
            tons: tons,
            size: size,
            is_ais: is_ais,
            is_vpass: is_vpass,
            is_vhf: is_vhf,
            is_ff: is_ff,
            region: region,
            port: region,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// searchWastedShip with condition
export const searchWastedShip = (token, title) => 
    request.post('/Boats/boat/searchingwasted/', {
			title: title,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// requestCommonShip List
export const requestCommonShipList = (token, index) => 
    request.get('/Ships/ship/normal/list/?page=' + index, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

// requestWastedShip List
export const requestWastedShipList = (token, index) => 
    request.get('/Ships/ship/waste/list/?page=' + index, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestCommonShipDetail = (token, id) => 
    request.get('/Ships/ship/normal/' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipDetail = (token, id) => 
    request.get('/Ships/ship/waste/' + id, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestAIResult = (token, base64) => 
    request.post('/Boats/boat/predict/', {
			image_data: base64,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const requestWastedShipLocation = (token) =>
    request.get('Ships/ship/waste/location', {
    headers: {
        'AUTHORIZATION': 'jwt ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
}})

export const updateCommonShipDetail = (token, id, name, types, code, tons, size, is_ais, is_vpass, is_vhf, is_ff, region, port) =>
    request.put('Ships/ship/normal/' + id + '/',{
            name: name,
            types: types,
            code: code,
            tons: tons,
            size: size,
            is_ais: is_ais,
            is_vpass: is_vpass,
            is_vhf: is_vhf,
            is_ff: is_ff,
            region: region,
            port: region,
        },{
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})