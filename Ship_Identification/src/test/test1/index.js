import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import * as base from 'native-base';

import { Camera } from 'expo-camera';
	
import { Ionicons, Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 

export default class TEST1 extends Component{
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render(){
		let camera: Camera
		const __startCamera = async () => {
			const {status} = await Camera.requestPermissionsAsync()
			if (status === 'granted') {
				// start the camera
				setStartCamera(true)
			} else {
				Alert.alert('Access denied')
			}
		}
		const __takePicture = async () => {
			if (!camera) return
			const photo = await camera.takePictureAsync()
			console.log(photo)
			setPreviewVisible(true)
			setCapturedImage(photo)
		}
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
				<base.Content contentContainerStyle={{ flex: 1 }}>
					<Camera style={{flex: 1,width:"100%", height: '100%'}} ref={(r) => { camera = r }}>
						<View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', flexDirection:'column', height: '100%', width: '100%'}}>
							<Entypo name="document-landscape" size={250} color="red" />
							<base.Text style={{color: 'white', fontFamily: 'Nanum', fontSize: 20}}> 해당 레이아웃에 맞춰 선박을 촬영하세요 </base.Text>
						</View>
						<View style={{position: 'absolute', justifyContent: 'flex-end', alignItems: 'center', flexDirection:'column', height: '95%', width: '100%'}}>
							<AntDesign name="camerao" size={50} color="white" />
						</View>
						
					</Camera>
				</base.Content>				
			</base.Container>
		);
	}
}

//https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/