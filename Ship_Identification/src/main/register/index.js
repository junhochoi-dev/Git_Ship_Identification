import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
import { ValueInput } from './valueInput';
import { getToken } from '../../../utils/getToken';
import { registerCommonShip, registerWastedShip } from '../../../utils/shipInfoRequest';
var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			base64: '',
			flag: 'Normal',
			
			name: '', IMO: '', Calsign: '', MMSI: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '', longitude: '', detail: '',
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);
		
		this.normalInput = this.normalInput.bind(this);
		this.wastedInput = this.wastedInput.bind(this);
		
		this.registerBoat = this.registerBoat.bind(this);
		
		this.getLocation = this.getLocation.bind(this);
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
		}).then((result) => this.setState({img: result.uri, base64: result.base64}))
	}
	
	normalInput = () => {
		return(
			<base.Form>
				<ValueInput label='선박명' onChange={(name) => this.setState({name})}/>
				<ValueInput label='국제선박일련번호 [IMO]' onChange={(IMO) => this.setState({IMO})}/>
				<ValueInput label='호출부호 [CALLSIGN]' onChange={(Calsign) => this.setState({Calsign})}/>
				<ValueInput label='해상이동통신식별번호 [MMSI]' onChange={(MMSI) => this.setState({MMSI})}/>
				<ValueInput label='선박용도' onChange={(vessel_type) => this.setState({vessel_type})}/>
				<ValueInput label='제작년도' onChange={(build_year) => this.setState({build_year})}/>
				<ValueInput label='입항국가' onChange={(current_flag) => this.setState({current_flag})}/>
				<ValueInput label='정박항구' onChange={(home_port) => this.setState({home_port})}/>
				<base.Button block light onPress={this.registerBoat} style={{backgroundColor: '#006eee'}}>
					<base.Text style={{fontFamily: 'Nanum'}}>선박등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	wastedInput = () => {
		return(
			<base.Form>
				<ValueInput label='선박명' onChange={(title) => this.setState({title})}/>
					<base.Form style={{flexDirection: 'row',}}>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 5,
							width: '100%',
							height: 50,
							margin: 5
							}}><base.Text style={{fontFamily: 'Nanum'}}>위도 {this.state.latitude}</base.Text></base.Item>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 5,
							width: '100%',
							height: 50,
							margin: 5
						}}><base.Text style={{fontFamily: 'Nanum'}}>경도 {this.state.longitude}</base.Text></base.Item>
					</base.Form>
					<base.Button light style={{width:'100%'}} onPress={this.getLocation}>
						<base.Text style={{fontFamily: 'Nanum'}}>현재위치등록하기</base.Text>
					</base.Button>
				<base.Textarea rowSpan={3} bordered placeholder="세부사항등록" onChangeText={(detail) => this.setState({detail})} style={{fontFamily: 'Nanum'}}/>
				<base.Button block light onPress={this.registerBoat} style={{backgroundColor: '#006eee'}}>
					<base.Text style={{fontFamily: 'Nanum'}}>선박등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
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
	
	
	registerBoat(){
		getToken().then((token) =>{
			if(this.state.flag == 'Normal') registerCommonShip(token, this.state.flag, this.state.base64, this.state.name, this.state.IMO, this.state.Calsign, this.state.MMSI, 
								   this.state.vessel_type, this.state.build_year, this.state.current_flag, this.state.home_port)
			else if (this.state.flag == 'Wasted') registerWastedShip(token, this.state.flag, this.state.base64, this.state.title, this.state.latitude, this.state.longitude, this.state.detail)
		})
	}
	
	render(){
		let detailInput
		if(this.state.flag == 'Normal') {
			detailInput = this.normalInput()
		}
		else if(this.state.flag == 'Wasted') {
			detailInput = this.wastedInput()
		}
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
							<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>선박등록</base.Title>
						</base.Right>
					</base.Header>
					<base.Content padder>
						<base.Card>
							<base.Card><base.CardItem><base.Text>추가할 선박 사진 목록</base.Text></base.CardItem></base.Card>
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
										{buttonIndex == 0 ? this.pickPhoto() : this.pickImage()}
									}
								)}>
								<base.Icon name='ios-add-circle' />
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
							<base.Form style={{margin: 10,}}>
								{detailInput}
							</base.Form>							
						</base.Card>
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}