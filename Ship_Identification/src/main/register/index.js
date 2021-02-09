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
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

export default class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			base64: '',
			flag: 'Normal',
			
			name: '', IMO: '', Calsign: '', MMSI: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '0', longitude: '0', detail: '',
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
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 400, height: 400}}],
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
			ImageManipulator.manipulateAsync(
				result.uri,
				[{resize: {width: 400, height: 400}}],
				{base64: true, format: ImageManipulator.SaveFormat.JPEG}
			).then((result) => this.setState({img: result.uri, base64: result.base64}))
		})
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
				<base.Button block onPress={this.registerBoat} style={{backgroundColor: '#006eee', marginBottom: 10}}>
					<base.Text style={{fontFamily: 'Nanum'}}>선박등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	wastedInput = () => {
		return(
			<base.Form>
				<ValueInput label='유기선박 및 폐선박 관리번호' onChange={(title) => this.setState({title})}/>
				<base.Text style={{fontFamily: 'Nanum', color: 'dark', marginTop: 10,}}>세부정보 및 특이사항</base.Text>
				<base.Textarea rowSpan={5} bordered
					onChangeText={(detail) => this.setState({detail})}
					style={{fontFamily: 'Nanum', marginTop:10, marginBottom: 10, borderRadius: 10,}}/>
				
				
				<base.Form style={{flexDirection: 'row', alignItems: 'center', width: '100%',}}>
					<base.Form style={{flex: 7, flexDirection: 'column', width: '100%'}}>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
							}}><base.Text style={{fontFamily: 'Nanum', }}>  위도 : {this.state.latitude}</base.Text></base.Item>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
						}}><base.Text style={{fontFamily: 'Nanum', }}>  경도 : {this.state.longitude}</base.Text></base.Item>
					</base.Form>
					<base.Form style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Icon onPress={this.getLocation} name='ios-compass' style={{color:'#006eee',fontSize: 40}}/>
						<base.Text style={{fontFamily: 'Nanum'}}>위치정보{'\n'}불러오기</base.Text>
					</base.Form>
				</base.Form>
				<base.Button block onPress={this.registerBoat} style={{backgroundColor: '#006eee', marginBottom: 10}}>
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
		this.props.navigation.popToTop()
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
					<base.Segment style={{backgroundColor: '#006eee',}}>
						<base.Button first active={this.state.flag == 'Normal'} style={{width: '40%', justifyContent: 'center'}} onPress={() => this.setState({flag: 'Normal'})}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 15}}>일반선박 등록</base.Text>
						</base.Button>
						<base.Button last active={this.state.flag == 'Wasted'} style={{width: '40%', justifyContent: 'center'}} onPress={() => this.setState({flag: 'Wasted'})}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 15}}>유기 및 폐선박 등록</base.Text>
						</base.Button>
					</base.Segment>
					<base.Content padder>
						<base.Card>
							<base.Form style={{margin: 10,}}>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>선박사진등록</base.Text>
								<base.Item regular style={{width:'100%', height: 300, borderRadius: 10, flexDirection: 'column'}}>
									<Image source={{uri:this.state.img}} style={{height: 250, width: '100%', flex: 1}}/>
									<base.Button transparent style={{position: 'absolute', right: 0, bottom: '5%',}}  
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
							<base.Form style={{marginLeft: 10, marginRight: 10,}}>
								{detailInput}
							</base.Form>							
						</base.Card>
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}