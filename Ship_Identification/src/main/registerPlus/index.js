import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import { SliderBox } from 'react-native-image-slider-box';
import * as ImagePicker from 'expo-image-picker';
var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class RegisterPlus extends Component{
	constructor(props) {
		super(props);
		this.state = {
			flag: 'Normal',
			images: [],
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);
	}
	onValueChange(value: string) { this.setState({ flag: value }); }
	
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
			this.setState({ images: this.state.images.concat(result.uri) })
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 50, height: 50}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {this.setState({base64: result.base64})})
		})
	}
	
	render(){
		return(
			<base.Root>
				<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
						<base.Left>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back'/>
							</base.Button>
						</base.Left>
						<base.Right>
							<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>선박추가등록</base.Title>
						</base.Right>
					</base.Header>
					<base.Content padder>
						<base.Card style={{width: '100%', height: 350,}}>
							<base.Card><base.CardItem><base.Text>추가할 선박 사진 목록</base.Text></base.CardItem></base.Card>
							<SliderBox
								images={this.state.images}
								sliderBoxHeight={300}
								sliderBoxWidth={350}
								ImageComponentStyle={{ width: '100%', height: 300 }}
								onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
								currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
								circleLoop
								resizeMode={'contain'}
								paginationBoxStyle={{
									position: "absolute",
									alignItems: "center",
									alignSelf: "center",
									justifyContent: "center",
								}}
							/>
						</base.Card>
						<base.Card>
							<base.Button style={{width: '100%', backgroundColor: '#006eee'}}
									onPress={() =>
										base.ActionSheet.show(
										{
										options: BUTTONS,
										cancelButtonIndex: CANCEL_INDEX,
										destructiveButtonIndex: DESTRUCTIVE_INDEX,
										title: "Testing ActionSheet"
										},
										buttonIndex => {
											{buttonIndex == 0 ? this.pickPhoto() : this.pickImage()}
										}
									)}>
								<base.Text>추가할 사진 불러오기</base.Text>
							</base.Button>
						</base.Card>
						<base.Card>
							<base.Card><base.CardItem><base.Text>선박유형선택</base.Text></base.CardItem></base.Card>
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
						<base.Card>
							<base.Item floatingLabel>
								<base.Label>선박명</base.Label>
								<base.Input></base.Input>
							</base.Item>
						</base.Card>
						<base.Button style={{width: '100%', backgroundColor: '#006eee'}}>
							<base.Text>추가 사진 등록하기</base.Text>
						</base.Button>
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}