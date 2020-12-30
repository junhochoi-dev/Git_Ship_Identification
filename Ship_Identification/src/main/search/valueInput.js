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
