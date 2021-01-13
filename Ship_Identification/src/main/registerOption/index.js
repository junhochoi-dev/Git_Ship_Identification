import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
export default class RegisterOption extends Component{
	constructor(props) {
		super(props);
		this.state = {};
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
							<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>선박등록</base.Title>
						</base.Right>
					</base.Header>
					<base.Content padder>
						<base.Form style={{alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
							<base.Form style={{margin:50, width:'100%'}}>
								<base.Card>
									<base.CardItem button onPress={()=>this.props.navigation.navigate('Register')} style={{flexDirection: 'column'}}>
										<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
											<base.Icon name='ios-add-circle' style={{fontSize:35, color: '#006eee',}}/>
										</base.Form>
										<base.Text style={{fontFamily:'Nanum', margin: 10, fontSize: 40}}>선박초기등록</base.Text>
									</base.CardItem>
								</base.Card>
							</base.Form>
							<base.Form style={{margin:50, width:'100%',}}>
								<base.Card>
									<base.CardItem button onPress={()=>this.props.navigation.navigate('RegisterPlus')} style={{flexDirection: 'column'}}>
										<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
											<base.Icon name='ios-add-circle' style={{fontSize:35, color: '#006eee',}}/>
										</base.Form>
										<base.Text style={{fontFamily:'Nanum', margin: 10, fontSize: 40}}>선박추가등록</base.Text>
									</base.CardItem>
								</base.Card>
							</base.Form>
						</base.Form>
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}