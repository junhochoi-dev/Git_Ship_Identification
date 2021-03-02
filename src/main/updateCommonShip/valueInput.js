import React, { Component } from 'react';
import * as base from 'native-base'

export const ValueInput = ({ label, value, onChange }) => {
	return(
		<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
			<base.Input placeholder={label} value={value} onChangeText={onChange} style={{fontFamily:'Nanum'}} placeholderStyle={{fontFamily:'Nanum'}}/>
		</base.Item>
	)
}
