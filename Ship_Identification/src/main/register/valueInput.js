import React, { Component } from 'react';
import * as base from 'native-base'

export const ValueInput = ({ label, value, onChange }) => {
	return(
		<base.Item floatingLabel>
			<base.Label>{label}</base.Label>
			<base.Input value={value} onChangeText={onChange}/>
		</base.Item>
	)
}

// export default class valueInput extends Component {
// 	render() {
// 		return (
// 			<base.Item floatingLabel>
// 				<base.Label>{this.props.label}</base.Label>
// 				<base.Input value={value} onChangeText={onChange}/>
// 			</base.Item>
// 		)
// 	}
// }