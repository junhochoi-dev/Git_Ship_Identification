import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { getToken } from '../../../utils/getToken';
import { registerCommonShipDetail } from '../../../utils/shipInfoRequest';
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
			img: '',
			latitude: 0,
			longitude: 0,
			detail: '',
			base64: '',
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);
		this.getLocation = this.getLocation(this);
		this.registerShipDetail = this.registerShipDetail.bind(this);
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
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 100, height: 100}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => this.setState({img: result.uri, base64: result.base64}))
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
				[{resize: {width: 100, height: 100}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => {
				console.log(this.state.base64)
				this.setState({base64: result.base64})
			})
		})
	}
	
	getLocation = async () => {
		try {
			const response = await Location.requestPermissionsAsync();
			const location = await Location.getCurrentPositionAsync();
			await this.setState({latitude: location.coords['latitude'], longitude: location.coords['longitude']})
		} catch (error) {
		  Alert.alert("Can't find you.", "Please Try Again!")
		}
	}
	
	registerShipDetail(){
		getToken().then((token) =>{
			registerCommonShipDetail(token, this.props.navigation.getParam('id'), this.state.base64, this.state.latitude, this.state.longitude, this.state.detail)
			this.props.navigation.goBack()
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
							<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>선박정보추가등록</base.Title>
						</base.Right>
					</base.Header>
					<base.Content padder>
						<base.Card>
							<base.Form style={{margin: 10,}}>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>선박유형선택</base.Text>
								<base.Item regular style={{width:'100%', height: 40, borderRadius: 10, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
									<base.Picker
										mode='dropdown'
										style={{ width: '100%',}}
										selectedValue={this.state.flag}
										itemTextStyle={{fontFamily:'Nanum',}}
										onValueChange={this.onValueChange.bind(this)}
										>
										<base.Picker.Item label='일반선박' value='Normal'/>
										<base.Picker.Item label='유기,폐선박' value='Wasted'/>
									</base.Picker>
								</base.Item>
							</base.Form>
							<base.Form style={{margin: 10,}}>
								<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, height: 50}}>
									<base.Text style={{fontFamily:'Nanum'}}> 선박명 : {this.props.navigation.getParam('name')} </base.Text>
								</base.Item>
							</base.Form>
							<base.Form style={{margin: 10,}}>
								<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, height: 50}}>
									<base.Text style={{fontFamily:'Nanum'}}> 위도 : {this.state.latitude} </base.Text>
								</base.Item>
							</base.Form>
							<base.Form style={{margin: 10,}}>
								<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, height: 50}}>
									<base.Text style={{fontFamily:'Nanum'}}> 경도 : {this.state.longitude} </base.Text>
								</base.Item>
							</base.Form>
							<base.Form style={{margin: 10,}}>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>선박사진등록</base.Text>
								<base.Item regular style={{width:'100%', height: 350, borderRadius: 10, flexDirection: 'column', marginBottom: 10,}}>
									<Image source={{uri:this.state.img}} style={{height: 250, width: '100%', flex: 1}}/>
									<base.Button transparent style={{position: 'absolute', right: 0, bottom: '5%'
											,}}  
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
										<base.Icon name='ios-add-circle' style={{color:'#006eee',fontSize: 40}}/>
									</base.Button>
								</base.Item>
							</base.Form>
							
							<base.Form style={{margin: 10,}}>
								<base.Textarea rowSpan={3} bordered placeholder="세부사항등록"
								onChangeText={(detail) => this.setState({detail})}
								style={{fontFamily: 'Nanum', marginTop:10, marginBottom: 10, borderRadius: 10,}}/>
							</base.Form>
							<base.Form style={{margin: 10,}}>
								<base.Button block style={{backgroundColor: '#006eee'}} onPress={this.registerShipDetail}>
									<base.Text style={{fontFamily: 'Nanum'}}>추가 정보 등록하기</base.Text>
								</base.Button>
							</base.Form>
						</base.Card>
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}