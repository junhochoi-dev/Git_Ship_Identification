import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';

var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "등록한 사진 삭제하기", icon: "trash", iconColor: "#fa213b" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			flag: 'key1',
			clicked: null,
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);
	}
	onValueChange(value: string) { this.setState({ flag: value }); }
	
	async pickPhoto() {
		await ImagePicker.launchCameraAsync({
			allowsEditing: true,
      base64: true
		}).then((result) => this.setState({img: result.uri}))
	}
	
	async pickImage() {
		await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		}).then((result) => this.setState({img: result.uri}))
	};
	
	render(){
		let detailInput
		if(this.state.selected == 'key1') { detailInput = <base.Text>일반선박</base.Text> }
		else if(this.state.selected == 'key2') { detailInput = <base.Text>유기,폐선박</base.Text> }
		
	
		if(this.state.clicked == 0) {
			this.pickPhoto();
			this.setState({clicked: null});
		}
		else if(this.state.clicked == 1) {
			this.pickImage();
			this.setState({clicked: null});
		}
		return(
			<base.Root>
				<base.Container>
					<base.Header>
						<base.Body>
							<base.Title>선박등록</base.Title>
						</base.Body>
					</base.Header>
					<base.Content>
						<base.Card>
							<Image source={{uri:this.state.img}} style={{height: 200, width: null, flex: 1}}/>
							<base.Icon style={{position: 'absolute', right: 10, bottom: 10,}} name='ios-add-circle' 
								onPress={() =>
									base.ActionSheet.show(
									{
									options: BUTTONS,
									cancelButtonIndex: CANCEL_INDEX,
									destructiveButtonIndex: DESTRUCTIVE_INDEX,
									title: "Testing ActionSheet"
									},
									buttonIndex => {
									this.setState({ clicked: buttonIndex });
									}
								)}/>
						</base.Card>
						<base.Card>
							<base.Text>  선박유형선택</base.Text>
							<base.Picker
								mode='dropdown'
								style={{ width: '100%' }}
								selectedValue={this.state.selected}
								onValueChange={this.onValueChange.bind(this)}
								>
								<base.Picker.Item label='일반선박' value='key1' />
								<base.Picker.Item label='유기,폐선박' value='key2' />
								<base.Picker.Item label='고무보트 + 등등' value='key3' />
							</base.Picker>
						</base.Card>
						{detailInput}
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}