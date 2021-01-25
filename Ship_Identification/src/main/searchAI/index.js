import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import * as base from 'native-base';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { getToken } from '../../../utils/getToken';
import { requestAIResult } from '../../../utils/shipInfoRequest';

import { StackedBarChart } from 'react-native-svg-charts'
var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

const colors = ['#006eee', '#81d4fa']
const keys = [ 'value', 'remainder',]

export default class SearchAI extends Component{ 
	constructor(props) {
		super(props);
		this.state = {
			img: '',
			base64: '',
			data: [],
			percentage: [],
			functionOn: false,
		};
		this.pickPhoto = this.pickPhoto.bind(this);
		this.pickImage = this.pickImage.bind(this);
		this.getAIResult = this.getAIResult.bind(this);
		
		this.showAIResult = this.showAIResult.bind(this);
		this.loading = this.loading.bind(this);
		this.waiting = this.waiting.bind(this);
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
		if(this.state.img == '') {
			alert('검색할 사진을 등록하세요')
		}
		else {
			this.setState({
				functionOn: true,
				percentage: [],
				data: [],
			})
			getToken().then((token) =>{
				requestAIResult(token, this.state.base64).then((response) => {
					console.log(response.data.data.result)
					this.setState({ percentage: this.state.data.concat(response.data.data.percent),})
					this.setState({ data: this.state.data.concat(response.data.data.result),})
				}) 
			})
		}
	}
	
	showAIResult = () => {
		return(
			<base.Form>
			<TouchableHighlight onPress={()=>this.props.navigation.navigate('DetailCommonShip',{id: this.state.data[0].id})}>
				<base.Card>
					<base.CardItem>
						<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
							<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
								<base.Form style={{flex: 1,}}>
									<Image source={{uri: 'https://shipcheck-server-vrxqx.run.goorm.io' + this.state.data[0].main_img}} style={{width: 150, height: 100,}}/>
								</base.Form>
								<base.Form style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '100%', flex: 1}}>
									<base.Text style={{fontFamily: 'Nanum', fontSize: 30, flex: 1,}}>{this.state.data[0].name}</base.Text>
									<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>IMO : {this.state.data[0].imo}</base.Text>
									<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>CALLSIGN : {this.state.data[0].calsign}</base.Text>
									<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>MMSI : {this.state.data[0].mmsi}</base.Text>
								</base.Form>
							</base.Form>
							<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, width: '105%'}}>
								<base.Card style={{width: '100%', padding: 10, flexDirection: 'row', alignItems: 'center', height: '80%'}}>
									<StackedBarChart
										style={{ height: 90, width: '100%', flex: 1, backgroundColor: 'white',}}
										keys={keys}
										colors={colors}
										data={[{value: parseFloat(this.state.percentage[0]), remainder: 100 - parseFloat(this.state.percentage[0])}]}
										showGrid={true}
										contentInset={{ top: 30, bottom: 30 }}
										horizontal={true}
									/>
									<base.Text style={{fontFamily: 'Nanum', fontSize: 30, color: 'red', marginLeft: 10}}>{this.state.percentage[0]}</base.Text>
								</base.Card>
							</base.Form>
						</base.Form>
					</base.CardItem>
				</base.Card>	
			</TouchableHighlight>
			
			<TouchableHighlight onPress={()=>this.props.navigation.navigate('DetailCommonShip',{id: this.state.data[1].id})}>
			<base.Card>
				<base.CardItem>
					<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
							<base.Form style={{flex: 1,}}>
								<Image source={{uri: 'https://shipcheck-server-vrxqx.run.goorm.io' + this.state.data[1].main_img}} style={{width: 150, height: 100,}}/>
							</base.Form>
							<base.Form style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '100%', flex: 1}}>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 30, flex: 1,}}>{this.state.data[1].name}</base.Text>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>IMO : {this.state.data[1].imo}</base.Text>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>CALLSIGN : {this.state.data[1].calsign}</base.Text>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>MMSI : {this.state.data[1].mmsi}</base.Text>
							</base.Form>
						</base.Form>
						<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, width: '105%'}}>
							<base.Card style={{width: '100%', padding: 10, flexDirection: 'row', alignItems: 'center', height: '80%'}}>
								<StackedBarChart
									style={{ height: 90, width: '100%', flex: 1, backgroundColor: 'white',}}
									keys={keys}
									colors={colors}
									data={[{value: parseFloat(this.state.percentage[1]), remainder: 100 - parseFloat(this.state.percentage[1])}]}
									showGrid={true}
									contentInset={{ top: 30, bottom: 30 }}
									horizontal={true}
								/>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 30, color: 'red', marginLeft: 10}}>{this.state.percentage[1]}</base.Text>
							</base.Card>
						</base.Form>
					</base.Form>
				</base.CardItem>
			</base.Card>
			</TouchableHighlight>
			
			<TouchableHighlight onPress={()=>this.props.navigation.navigate('DetailCommonShip',{id: this.state.data[2].id})}>			
			<base.Card>
				<base.CardItem>
					<base.Form style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
						<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1}}>
							<base.Form style={{flex: 1,}}>
								<Image source={{uri: 'https://shipcheck-server-vrxqx.run.goorm.io' + this.state.data[2].main_img}} style={{width: 150, height: 100,}}/>
							</base.Form>
							<base.Form style={{flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', width: '100%', flex: 1}}>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 30, flex: 1,}}>{this.state.data[2].name}</base.Text>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>IMO : {this.state.data[2].imo}</base.Text>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>CALLSIGN : {this.state.data[2].calsign}</base.Text>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 10, flex: 1,}}>MMSI : {this.state.data[2].mmsi}</base.Text>
							</base.Form>
						</base.Form>
						<base.Form style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1, width: '105%'}}>
							<base.Card style={{width: '100%', padding: 10, flexDirection: 'row', alignItems: 'center', height: '80%'}}>
								<StackedBarChart
									style={{ height: 90, width: '100%', flex: 1, backgroundColor: 'white',}}
									keys={keys}
									colors={colors}
									data={[{value: parseFloat(this.state.percentage[2]), remainder: 100 - parseFloat(this.state.percentage[2])}]}
									showGrid={true}
									contentInset={{ top: 30, bottom: 30 }}
									horizontal={true}
								/>
								<base.Text style={{fontFamily: 'Nanum', fontSize: 30, color: 'red', marginLeft: 10}}>{this.state.percentage[2]}</base.Text>
							</base.Card>
						</base.Form>
					</base.Form>
				</base.CardItem>
			</base.Card>
			</TouchableHighlight>
			</base.Form>
		)
	}
	waiting = () => {
		return(
			<base.Card>
				<base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1, height: 300}}>
					<base.Icon name='ios-pulse' style={{color:'#006eee',fontSize: 150}}/>
					<base.Text style ={{fontFamily:'Nanum',fontSize: 30}}>AI 분석 대기 모드</base.Text>
				</base.Form>
			</base.Card>
		)
	}
	loading = () => {
		return(
			<base.Card>
				<base.Form style={{alignItems:'center', justifyContent: 'center', flex: 1, height: 300}}>
					<base.Text style ={{fontFamily:'Nanum',fontSize: 30}}>선박 AI 데이터 분석 중</base.Text>
					<base.Spinner color='blue' />
				</base.Form>
			</base.Card>
		)
	}
	render(){
		let AIResult
		if(this.state.data.length) { AIResult = this.showAIResult() }
		else if(this.state.functionOn) { AIResult = this.loading() }
		else { AIResult = this.waiting() }
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
							<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>선박AI검색</base.Title>
						</base.Right>
					</base.Header>
					<base.Content padder>
						<base.Card>
							<base.Form>
								<base.CardItem bordered>
									<base.Text style={{fontFamily:'Nanum',}}>검색 사진 등록</base.Text>
								</base.CardItem>
								<Image source={{uri:this.state.img}} style={{height: 250, width: '100%', flex: 1}}/>
								<base.Button transparent style={{position: 'absolute', right: 0, bottom: '5%',}}  
									onPress={() =>
										{
											this.setState({data: [], functionOn: false})
											base.ActionSheet.show({
												options: BUTTONS,
												cancelButtonIndex: CANCEL_INDEX,
												destructiveButtonIndex: DESTRUCTIVE_INDEX,
												title: "사진등록유형"
											},
											buttonIndex => {
												{buttonIndex == 0 ? this.pickPhoto() : this.pickImage()}
											})
										}
									}>
									<base.Icon name='ios-add-circle' style={{color:'#006eee',fontSize: 40}}/>
								</base.Button>
							</base.Form>
							<base.Button block onPress={this.getAIResult} style={{backgroundColor: '#006eee', margin: 10}}>
								<base.Text style={{fontFamily:'Nanum',}}>AI선박검색</base.Text>
							</base.Button>
						</base.Card>
							{AIResult}					
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}