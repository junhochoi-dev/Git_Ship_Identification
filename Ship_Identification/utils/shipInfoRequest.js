import { request } from './request'

export const registerCommonShip = (token, flag, base64, name, imo, calsign, mmsi, vessel_type, build_year, current_flag, home_port) => 
    request.post('/Boats/boat/regist/', {
			flag: flag,
			image_data: base64,
			name: name,
			imo: imo,
			calsign: calsign,
			mmsi: mmsi,
			vessel_type: vessel_type,
			build_year: build_year,
			current_flag: current_flag,
            home_port: home_port,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const registerWastedShip = (token, flag, base64, title, latitude, longitude, detail) => 
    request.post('/Boats/boat/regist/', {
			flag: flag,
			image_data: base64,
			title: title,
			latitude: latitude,
			longitude: longitude,
			detail: detail,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const searchCommonShip = (token, name, imo, calsign, mmsi, vessel_type, build_year, current_flag, home_port) => 
    request.post('/Boats/boat/searching/', {
			name: name,
			imo: imo,
			calsign: calsign,
			mmsi: mmsi,
			vessel_type: vessel_type,
			build_year: build_year,
			current_flag: current_flag,
            home_port: home_port,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})

export const searchWastedShip = (token) => 
    request.post('/Boats/boat/wastedboats/', {
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})
// export const searchWastedShip = (token, flag, title) => 
//     request.post('/Boats/boat/searching/', {
// 			flag: flag,
// 			title: title,
// 		}, {
//         headers: {
//             'AUTHORIZATION': 'jwt ' + token,
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
// }})