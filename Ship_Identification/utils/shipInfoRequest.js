import { request } from '../../../utils/request.js'

export const registerCommonShip = (token, title, imo, calsign, mmsi, vessel_type, build_year, current_flag, home_port) => 
    request.post('/Boats/boat/searching/', {
			title: title,
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

export const registerWastedShip = (token, title, latitude, longitude) => 
    request.post('/Boats/boat/searching/', {
			title: title,
			latitude: latitude,
			longitude: longitude,
		}, {
        headers: {
            'AUTHORIZATION': 'jwt ' + token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
}})