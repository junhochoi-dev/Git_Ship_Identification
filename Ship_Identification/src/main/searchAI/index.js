import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { getToken } from '../../../utils/getToken';
import { requestAIResult } from '../../../utils/shipInfoRequest';
var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;
export default class SearchAI extends Component{ 
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			base64: '',
			first: [],
			second: [],
			third: [],
		};
		this.pickPhoto = this.pickPhoto.bind(this);
		this.pickImage = this.pickImage.bind(this);
		this.getAIResult = this.getAIResult.bind(this);
	}
	
	async pickPhoto() {
		if(ImagePicker.getCameraPermissionsAsync()) ImagePicker.requestCameraPermissionsAsync()
		await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		}).then((result) => {
			this.setState({img: result.uri})
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 50, height: 50}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {this.setState({base64: result.base64})})
		})
	}
	
	async pickImage() {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			base64: true,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		}).then((result) => {
			this.setState({img: result.uri})
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 50, height: 50}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {
				console.log(this.state.base64)
				this.setState({base64: result.base64})
			})
		})
	}
	
	getAIResult(){
		getToken().then((token) =>{
			requestAIResult(token, this.state.base64).then((response) => {
				console.log('test1')
				console.log(response.data.data)
				console.log('test2')
				console.log(response.data.data[0])
				this.setState({
					first: this.state.data.concat(response.data.data[0]),
					second: this.state.data.concat(response.data.data[1]),
					third: this.state.data.concat(response.data.data[2])
				})
				console.log('test3')
				console.log(this.state.first)
				
				console.log('test4')
				console.log(this.state.second)
				
				console.log('test5')
				console.log(this.state.third)
			}) 
		})
	}
	render(){
		return(
			<base.Root>
				<base.Container>
					<base.Header>
						<base.Left>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back'/>
							</base.Button>
						</base.Left>
						<base.Right>
							<base.Title>선박AI검색</base.Title>
						</base.Right>
					</base.Header>
					<base.Content padder>
						<base.Card>
							<base.CardItem bordered>
								<base.Text>검색 사진 등록</base.Text>
							</base.CardItem>
							<Image source={{uri:this.state.img}} style={{height: 250, width: '100%', flex: 1}}/>
							<base.Button transparent style={{position: 'absolute', right: 0, bottom: 0,}}  
								onPress={() =>
									base.ActionSheet.show(
									{
									options: BUTTONS,
									cancelButtonIndex: CANCEL_INDEX,
									destructiveButtonIndex: DESTRUCTIVE_INDEX,
									title: "사진등록유형"
									},
									buttonIndex => {
										{buttonIndex == 0 ? this.pickPhoto() : this.pickImage()}
									}
								)}>
								<base.Icon name='ios-add-circle' />
							</base.Button>
						</base.Card>
						<base.Button block light onPress={this.getAIResult}>
							<base.Text>AI선박검색</base.Text>
						</base.Button>
						<base.Text>1등 {this.state.first[0]}</base.Text>
						<base.Text>1등 {this.state.first[1]}</base.Text>
						
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}