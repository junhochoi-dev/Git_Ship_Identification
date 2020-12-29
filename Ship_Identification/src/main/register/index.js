import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import { ValueInput } from './valueInput';
import { getToken } from '../../../utils/getToken';
import { registerCommonShip, registerWastedShip } from '../../../utils/shipInfoRequest';
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
			
			name: '', IMO: '', Calsign: '', MMSI: '', vessel_type: '',
			build_year: '', current_flag: '', home_port: '',
			
			title: '', latitude: '', longitude: '', detail: '',
		};
		this.pickImage = this.pickImage.bind(this);
		this.pickPhoto = this.pickPhoto.bind(this);
		
		this.normalInput = this.normalInput.bind(this);
		this.wastedInput = this.wastedInput.bind(this);
		
		this.registerBoat = this.registerBoat.bind(this);
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
				<base.Button block light onPress={this.registerBoat}>
					<base.Text>선박등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
	}
	
	wastedInput = () => {
		return(
			<base.Form>
				<ValueInput label='선박명' onChange={(title) => this.setState({title})}/>
				<ValueInput label='위도' onChange={(latitude) => this.setState({latitude})}/>
				<ValueInput label='경도' onChange={(longitude) => this.setState({longitude})}/>
				<base.Button light>
							<base.Text>현재위치등록하기</base.Text>
				</base.Button>
				<base.Textarea rowSpan={3} bordered placeholder="세부사항등록" onChangeText={(detail) => this.setState({detail})}/>
				<base.Button block light onPress={this.registerBoat}>
					<base.Text>선박등록하기</base.Text>
				</base.Button>
			</base.Form>
		)
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
			this.setState({
				name: '', IMO: '', Calsign: '', MMSI: '', vessel_type: '',
				build_year: '', current_flag: '', home_port: '',
			})
			detailInput = this.normalInput()
		}
		else if(this.state.flag == 'Wasted') {
			this.setState({
				title: '', latitude: '', longitude: '', detail: '',
			})
			detailInput = this.wastedInput()
		}
		
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
						<base.Card>
							{detailInput}
						</base.Card>
						
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}