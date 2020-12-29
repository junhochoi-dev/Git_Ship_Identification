import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import { inputDetail } from './inputDetail';

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
			clicked: null,
			
			img: '',
			base64: '',
			flag: 'Normal',
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
			base64: true,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		}).then((result) => this.setState({img: result.uri, base64: result.base64}))
	};
	
	render(){
		let detailInput
		if(this.state.flag == 'Normal') { detailInput = inputDetail(this.state.flag) }
		else if(this.state.flag == 'Wasted') { detailInput = inputDetail(this.state.flag) }
		
		switch(this.state.clicked){
			case 0:{
				this.pickPhoto();
				this.setState({clicked: null});
				break;
			}
			case 1:{
				this.pickImage();
				this.setState({clicked: null});
				break;
			}
			case 3:{
				this.setState({clicked: null, img: ''});
				break;
			}
		}
		
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
							<base.Title>선박등록</base.Title>
						</base.Right>
					</base.Header>
					<base.Content>
						<base.Card>
							<Image source={{uri:this.state.img}} style={{height: 250, width: null, flex: 1}}/>
							<base.Button transparent style={{position: 'absolute', right: 0, bottom: 0,}}  
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
								)}>
								<base.Icon name='ios-add-circle' />
							</base.Button>
							
						</base.Card>
						<base.Card>
							<base.Text>  선박유형선택</base.Text>
							<base.Picker
								mode='dropdown'
								style={{ width: '100%' }}
								selectedValue={this.state.flag}
								onValueChange={this.onValueChange.bind(this)}
								>
								<base.Picker.Item label='일반선박' value='Normal' />
								<base.Picker.Item label='유기,폐선박' value='Wasted' />
							</base.Picker>
						</base.Card>
						{detailInput}
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}