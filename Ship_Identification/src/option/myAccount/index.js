import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import * as base from 'native-base';
import { getToken } from '../../../utils/getToken';
import { requestUserData } from '../../../utils/userInfoRequest';
import styles from './styles';
export default class MyAccount extends Component{
	constructor(props) {
		super(props);
		this.state = {
			serviceNum: '',
			password: '',
            name : '',
			rank : '',
			position : '',
			belong : '',
			phone : '',
			device_id : '',
		}
		this.getUserData = this.getUserData(this);
	}
	getUserData(){
		getToken().then((token) => {
			requestUserData(token).then((response) => {
            if(response.status == 200){
				this.setState({
					serviceNum: response.data.data.serviceNum,
					name : response.data.data.name,
					rank : response.data.data.rank,
					position : response.data.data.position,
					belong : response.data.data.belong,
					phone : response.data.data.phone,
					device_id : response.data.data.device_id,
				})
            }
            else{
                console.log('fail')
            }
		})
        })
	}
	render(){
		if(this.state.serviceNum == ''){
            return(
                <View style={{alignItems:'center', justifyContent: 'center', flex: 1}}>
				    <Text style ={{fontSize: 30}}>데이터 가져오는 중</Text>
				    <base.Spinner color='blue' />
                </View>
            )
        }
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20,}}>내정보</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Form style={{alignItems: 'center'}}>
						<Image source={require('/workspace/Ship_Identification/assets/img/logo.jpg')} resizeMode='contain' style={{width: 150, height: 250,}}/>
					</base.Form>
						<base.Item regular style={styles.detail}><base.Text style={{fontFamily: 'Nanum', fontSize: 15}}> 이름 : {this.state.name} </base.Text></base.Item>
						<base.Item regular style={styles.detail}><base.Text style={{fontFamily: 'Nanum', fontSize: 15}}> ID : {this.state.serviceNum} </base.Text></base.Item>
						<base.Item regular style={styles.detail}><base.Text style={{fontFamily: 'Nanum', fontSize: 15}}> 직급 : {this.state.rank} </base.Text></base.Item>
						<base.Item regular style={styles.detail}><base.Text style={{fontFamily: 'Nanum', fontSize: 15}}> 직책 : {this.state.position} </base.Text></base.Item>
						<base.Item regular style={styles.detail}><base.Text style={{fontFamily: 'Nanum', fontSize: 15}}> 소속 : {this.state.belong} </base.Text></base.Item>
						<base.Item regular style={styles.detail}><base.Text style={{fontFamily: 'Nanum', fontSize: 15}}> 연락처 : {this.state.phone} </base.Text></base.Item>
						<base.Item regular style={styles.detail}><base.Text style={{fontFamily: 'Nanum', fontSize: 15}}> 기기정보 : {this.state.device_id } </base.Text></base.Item>		
				</base.Content>
			</base.Container>
		);
	}
}