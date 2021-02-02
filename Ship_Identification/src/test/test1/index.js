import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

import { RNCamera } from 'react-native-camera';

export default class TEST1 extends Component{
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>TEST 페이지1</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<RNCamera
						ref={ref => { this.camera = ref; }}
						style={{
							flex: 1,
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}
						type={RNCamera.Constants.Type.back}
						flashMode={RNCamera.Constants.FlashMode.on}
						androidCameraPermissionOptions={{
							title: 'Permission to use camera',
							message: 'We need your permission to use your camera',
							buttonPositive: 'Ok',
							buttonNegative: 'Cancel',
						}}
						androidRecordAudioPermissionOptions={{
							title: 'Permission to use audio recording',
							message: 'We need your permission to use your audio',
							buttonPositive: 'Ok',
							buttonNegative: 'Cancel',
						}}	
						onGoogleVisionBarcodesDetected={({ barcodes }) => { console.log(barcodes); }}
					/>
				</base.Content>				
			</base.Container>
		);
	}
}
