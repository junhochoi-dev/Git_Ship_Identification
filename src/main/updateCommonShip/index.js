import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
import { updateCommonShipDetail, } from '../../utils/shipInfoRequest';
import { ValueInput } from './valueInput';
import { Picker } from '@react-native-picker/picker';
import { getToken } from '../../utils/getToken';
import { requestCommonShipDetail } from '../../utils/shipInfoRequest';

export default class UpdateCommonShip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			name: '', types: '',
			code: '',  tons: '', size: '', region: '',
			is_ais: false, is_vpass: false, is_vhf: false, is_ff: false,

			tmp_name: '', tmp_code: '', tmp_tons: '', tmp_size: '', tmp_region: '',
		};
		this.showCommonShipDetail = this.showCommonShipDetail(this);
	
		this.checkAIS = this.checkAIS.bind(this);
		this.checkVPASS = this.checkVPASS.bind(this);
		this.checkVHF = this.checkVHF.bind(this);
		this.checkFF = this.checkFF.bind(this);

		this.updateDetail = this.updateDetail.bind(this);
	}
	checkAIS(){ (this.state.is_ais == true) ? this.setState({is_ais: false}) : this.setState({is_ais: true}) }
	checkVPASS(){ (this.state.is_vpass == true) ? this.setState({is_vpass: false}) : this.setState({is_vpass: true}) }
	checkVHF(){ (this.state.is_vhf == true) ? this.setState({is_vhf: false}) : this.setState({is_vhf: true}) }
	checkFF(){ (this.state.is_ff == true) ? this.setState({is_ff: false}) : this.setState({is_ff: true}) }
	showCommonShipDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			requestCommonShipDetail(token, id).then((response) =>{
				if(response.status == 200){
					this.setState({
						id: id,
						img: response.data.data.main_img,
						name: response.data.data.name,
						code: response.data.data.code,
						types: response.data.data.types,
						is_ais: response.data.data.is_ais,
						is_vpass: response.data.data.is_vpass,
						is_vhf: response.data.data.is_vhf,
						is_ff: response.data.data.is_ff,
						port: response.data.data.region,
						tos: response.data.data.tons,
						size: response.data.data.size,
						regit_date: response.data.data.regit_date,
					})
				}
				else{
					console.log('fail')
				}
			})
        })
	}
	updateDetail(){
		getToken().then((token) => {
			const id = this.props.navigation.getParam('id');
			updateCommonShipDetail(token, this.state.id, this.state.tmp_name, this.state.types, this.state.tmp_code,
				this.state.tmp_tons, this.state.tmp_size, this.state.is_ais, this.state.is_vpass,
				this.state.is_vhf, this.state.is_ff, this.state.region).then((response) =>{
				if(response.status == 200){
					console.log('update success')
				}
				else{
					console.log('fail')
				}
			})
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
							<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>일반선박 정보수정</base.Title>
						</base.Right>
					</base.Header>
					<base.Content>
						<base.Form>
							<ValueInput label={this.state.name} onChange={(tmp_name) => this.setState({tmp_name})}/>
							<ValueInput label={this.state.code} onChange={(tmp_code) => this.setState({tmp_code})}/>
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
							<ValueInput label={this.state.size} onChange={(tmp_size) => this.setState({tmp_size})}/>
							<ValueInput label={this.state.tons} onChange={(tmp_tons) => this.setState({tmp_tons})}/>
							<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10, flexDirection: 'column', alignItems: 'flex-start',}}>
								<base.Text style={{color: 'grey', margin: 10}}>선박 위치 지역</base.Text>
								<Picker
									prompt='선박 위치 지역'
									style={{height: 50, width: '100%'}}>
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
							<base.Button block onPress={this.updateDetail}
								style={{backgroundColor: '#006eee', marginBottom: 10}}>
								<base.Text style={{fontFamily: 'Nanum'}}>선박정보 수정하기</base.Text>
							</base.Button>
						</base.Form>
					</base.Content>
				<StatusBar hidden/>
				</base.Container>
			</base.Root>
		);
	}
}