import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Location from 'expo-location';
import { ValueInput } from './valueInput';
import { getToken } from '../../utils/getToken';
import { registerCommonShip, registerWastedShip } from '../../utils/shipInfoRequest';

import { Picker } from '@react-native-picker/picker';

import { SliderBox } from "react-native-image-slider-box";

var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "grey",},
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "grey" },
  { text: "취소", icon: "close", iconColor: "grey" }
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 2;

export default class Register extends Component{
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			flag: 'Normal',

			// Origin State
			types: '', region: '',
			// Common Ship States
			name: '', code: '',  tons: '', size: '', 
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,
			// Wasted Ship states
			latitude: '0', longitude: '0', info: '',
			
			clicked: '',

			images: [],
			base64: [],
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);
		
		this.normalInput = this.normalInput.bind(this);
		this.wastedInput = this.wastedInput.bind(this);
		
		this.registerBoat = this.registerBoat.bind(this);
		
		this.getLocation = this.getLocation.bind(this);

		this.checkAIS = this.checkAIS.bind(this);
		this.checkVPASS = this.checkVPASS.bind(this);
		this.checkVHF = this.checkVHF.bind(this);
		this.checkFF = this.checkFF.bind(this);
	}
	checkAIS(){ (this.state.is_ais == true) ? this.setState({is_ais: false}) : this.setState({is_ais: true}) }
	checkVPASS(){ (this.state.is_vpass == true) ? this.setState({is_vpass: false}) : this.setState({is_vpass: true}) }
	checkVHF(){ (this.state.is_vhf == true) ? this.setState({is_vhf: false}) : this.setState({is_vhf: true}) }
	checkFF(){ (this.state.is_ff == true) ? this.setState({is_ff: false}) : this.setState({is_ff: true}) }
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
			).then((result) => 
			{
				this.setState({ images: this.state.images.concat(result.uri)})
				this.setState({ base64: this.state.base64.concat(result.base64)})
			}
			)
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
				).then((result) => 
				{
					this.setState({ images: this.state.images.concat(result.uri)})
					this.setState({ base64: this.state.base64.concat(result.base64)})
				}
			)
		})
	}
	
	normalInput = () => {
		return(
			<base.Form>
				<ValueInput label='선박명' onChange={(name) => this.setState({name})}/>
				<ValueInput label='선박등록번호 (14자리 숫자)' onChange={(code) => this.setState({code})}/>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{color: 'grey', margin: 10}}>선박종류</base.Text>
					<Picker
						mode='dropdown'
						prompt='선박종류'
						selectedValue={this.state.types}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({types: itemValue}) }>
						<Picker.Item label="어선" value="어선"/>
						<Picker.Item label="목선" value="목선"/>
						<Picker.Item label="유선" value="유선"/>
						<Picker.Item label="어장관리선" value="어선관리선"/>
						<Picker.Item label="고무보트" value="고무보트"/>
						<Picker.Item label="모터보트(레저용)" value="모터보트(레저용)"/>
						<Picker.Item label="모터보트(선내기)" value="모터보트(선내기)"/>
						<Picker.Item label="모터보트(선외기)" value="모터보트(선외기)"/>
						<Picker.Item label="수상오토바이" value="수상오토바이"/>
						<Picker.Item label="세일링 보트" value="세일링 보트"/>
						<Picker.Item label="정보없음" value="정보없음"/>
					</Picker>							
				</base.Item>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{margin: 10, color: 'grey'}}>식별장치</base.Text>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_ais} color="#006eee" onPress={() => this.checkAIS()}/>
						<base.Body><base.Text>AIS</base.Text></base.Body>
					</base.ListItem>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_vpass} color="#006eee" onPress={() => this.checkVPASS()}/>
						<base.Body><base.Text>V-Pass</base.Text></base.Body>
					</base.ListItem>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_vhf} color="#006eee" onPress={() => this.checkVHF()}/>
						<base.Body><base.Text>VHF-DSC</base.Text></base.Body>
					</base.ListItem>
					<base.ListItem style={{width: '100%'}}>
						<base.CheckBox checked={this.state.is_ff} color="#006eee" onPress={() => this.checkFF()}/>
						<base.Body><base.Text>FF-GPS</base.Text></base.Body>
					</base.ListItem>
				</base.Item>
				<ValueInput label='선박 길이 (m)' onChange={(size) => this.setState({size})}/>
				<ValueInput label='선박 무게 (t)' onChange={(tons) => this.setState({tons})}/>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{color: 'grey', margin: 10}}>선박 위치 지역</base.Text>
					<Picker
						prompt='선박 위치 지역'
						selectedValue={this.state.region}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({region: itemValue}) }>
						<Picker.Item label="충청남도" value="충청남도"/>
					</Picker>
					<Picker
						prompt='선박 위치 지역'
						selectedValue={this.state.region}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({region: itemValue}) }>
						<Picker.Item label="당진" value="당진"/>
						<Picker.Item label="서산" value="서산"/>
						<Picker.Item label="태안" value="태안"/>
						<Picker.Item label="홍성" value="홍성"/>
						<Picker.Item label="보령" value="보령"/>
						<Picker.Item label="서천" value="서천"/>
						<Picker.Item label="정보없음" value="정보없음"/>
					</Picker>							
				</base.Item>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{color: 'grey', margin: 10}}>확인 항구 및 포구</base.Text>
					<Picker
						prompt='선박 위치 지역'
						selectedValue={this.state.region}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({region: itemValue}) }>
						<Picker.Item label="당진" value="당진"/>
						<Picker.Item label="서산" value="서산"/>
						<Picker.Item label="태안" value="태안"/>
						<Picker.Item label="홍성" value="홍성"/>
						<Picker.Item label="보령" value="보령"/>
						<Picker.Item label="서천" value="서천"/>
						<Picker.Item label="정보없음" value="정보없음"/>
					</Picker>							
				</base.Item>
				<base.Button block onPress={this.registerBoat} style={{backgroundColor: '#006eee', marginBottom: 10}}>
					<base.Text style={{fontFamily: 'Nanum'}}>선박등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	wastedInput = () => {
		return(
			<base.Form>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{color: 'grey', margin: 10}}>선박종류</base.Text>
					<Picker
						mode='dropdown'
						prompt='선박종류'
						selectedValue={this.state.types}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({types: itemValue}) }>
						<Picker.Item label="어선" value="어선"/>
						<Picker.Item label="목선" value="목선"/>
						<Picker.Item label="유선" value="유선"/>
						<Picker.Item label="어장관리선" value="어선관리선"/>
						<Picker.Item label="고무보트" value="고무보트"/>
						<Picker.Item label="모터보트(레저용)" value="모터보트(레저용)"/>
						<Picker.Item label="모터보트(선내기)" value="모터보트(선내기)"/>
						<Picker.Item label="모터보트(선외기)" value="모터보트(선외기)"/>
						<Picker.Item label="수상오토바이" value="수상오토바이"/>
						<Picker.Item label="세일링 보트" value="세일링 보트"/>
						<Picker.Item label="확인불가" value="확인불가"/>
					</Picker>							
				</base.Item>
				<base.Textarea rowSpan={5} bordered
					onChangeText={(info) => this.setState({info})} placeholder="세부정보 및 특이사항"
					style={{fontFamily: 'Nanum', marginTop:10, marginBottom: 10, borderRadius: 10, padding: 10,}}/>
				<base.Form style={{flexDirection: 'row', alignItems: 'center', width: '100%',}}>
					<base.Form style={{flex: 7, flexDirection: 'column', width: '100%'}}>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
							}}><base.Text style={{fontFamily: 'Nanum', color: 'grey'}}>  위도 : {this.state.latitude}</base.Text></base.Item>
						<base.Item regular style={{
							flex: 1,
							borderRadius: 10,
							width: '100%',
							height: 50,
							margin: 10
						}}><base.Text style={{fontFamily: 'Nanum', color: 'grey'}}>  경도 : {this.state.longitude}</base.Text></base.Item>
					</base.Form>
					<base.Form style={{flex: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Icon onPress={this.getLocation} name='ios-compass' style={{color:'#006eee',fontSize: 40}}/>
						<base.Text style={{fontFamily: 'Nanum'}}>위치정보{'\n'}불러오기</base.Text>
					</base.Form>
				</base.Form>
				<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
					<base.Text style={{color: 'grey', margin: 10}}>선박 위치 지역</base.Text>
					<Picker
						prompt='선박 위치 지역'
						selectedValue={this.state.region}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({region: itemValue}) }>
						<Picker.Item label="충청남도" value="충청남도"/>
					</Picker>
					<Picker
						prompt='선박 위치 지역'
						selectedValue={this.state.region}
						style={{height: 50, width: '100%'}}
						onValueChange={(itemValue) => this.setState({region: itemValue}) }>
						<Picker.Item label="당진" value="당진"/>
						<Picker.Item label="서산" value="서산"/>
						<Picker.Item label="태안" value="태안"/>
						<Picker.Item label="홍성" value="홍성"/>
						<Picker.Item label="보령" value="보령"/>
						<Picker.Item label="서천" value="서천"/>
						<Picker.Item label="정보없음" value="정보없음"/>
					</Picker>							
				</base.Item>
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
			if(this.state.flag == 'Normal')
				registerCommonShip(token, this.state.base64, this.state.name, this.state.types, this.state.code, this.state.tons, 
				this.state.size, this.state.is_ais, this.state.is_vpass, this.state.is_vhf, this.state.is_ff, this.state.region).then((response) => {
					if(response.status == 200){
						console.log('Register Common Ship Successfully')
					}
				})
			else if (this.state.flag == 'Wasted') registerWastedShip(token, this.state.base64, this.state.types,
				this.state.latitude, this.state.longitude, this.state.info, this.state.region).then((response) => {
					if(response.status == 200){
						console.log('Register Wasted Ship Successfully')
					}
				})
		})
		this.props.navigation.popToTop()
	}
	
	render(){
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
			case 2:{
				this.setState({clicked: null, img: ''});
				break;
			}
		}
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
						<base.Text style={{fontFamily:'Nanum', fontSize: 15}}>유기선박 등록</base.Text>
						</base.Button>
					</base.Segment>
					<base.Content>
						<base.Form style={{width:'100%', height: 300, borderBottomWidth: 1, borderColor: '#DDD', flexDirection: 'column',}}>
							<base.Form style={{flex: 1, height: 300, width:'100%',}}>
								<SliderBox
									images={this.state.images}
									sliderBoxHeight={300}
									onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
									currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
									autoplay
									circleLoop
									resizeMethod={'resize'}
									resizeMode={'cover'}
								/>
							</base.Form>
							<base.Button rounded
							style={{position: 'absolute', right: 10, bottom: '5%', backgroundColor: 'white', width: 60, height: 60,
								shadowColor: 'rgba(0, 0, 0, 0.1)', shadowOpacity: 0.8, elevation: 6, shadowRadius: 15 , shadowOffset : { width: 1, height: 13},}}  
								onPress={() =>
									base.ActionSheet.show({
										options: BUTTONS,
										cancelButtonIndex: CANCEL_INDEX,
										destructiveButtonIndex: DESTRUCTIVE_INDEX,
										title: "선박 사진 등록"
									},
									buttonIndex => {this.setState({ clicked: buttonIndex });}
							)}>
								<base.Icon name='ios-images' style={{color:'#006eee', fontSize: 25}}/>
							</base.Button>
						</base.Form>
						<base.Form style={{margin: 10,}}>
							<base.Text style={{fontSize: 30}}>등록선박</base.Text>
							<base.Text>선박 등록을 위해 아래 내용을 입력해주세요</base.Text>
						</base.Form>
						<base.Form style={{marginLeft: 10, marginRight: 10,}}>
							{detailInput}
						</base.Form>
					</base.Content>
				<StatusBar hidden/>
				</base.Container>
			</base.Root>
		);
	}
}