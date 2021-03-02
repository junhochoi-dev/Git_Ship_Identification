import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import styles from './styles';
import * as base from 'native-base';
import { Linking, Image, Alert, Dimensions } from 'react-native';
import * as Font from 'expo-font';

export default class Home extends Component{
	render(){
		return(
            <base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.openDrawer()}>
							<base.Icon name='ios-menu'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontSize: 20,}}>선박확인체계TESTversion</base.Title>
					</base.Right>
				</base.Header>
                <base.Content padder contentContainerStyle={{alignItems: 'center', justifyContent:'center', flex: 1,}}>
					<base.Form style={{width: '100%', flex: 1,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 10, flex: 1,}}>선박 검색</base.Text>
						<base.Card style={{
								flex: 5,
								flexDirection: 'row', 
								alignItems: 'center',
								justifyContent: 'center',
								height: 120,
							}}>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('Search')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='ios-search' style={{fontSize:35, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5,}}>통합검색</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('SearchAI')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='ios-pulse' style={{fontSize:35, color: '#006eee',}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5, }}>인공지능검색
								</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('SearchMap')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='ios-map' style={{fontSize:35, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5, }}>지도검색</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form style={{width: '100%', flex: 1,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 10, flex: 1,}}>선박 목록 및 등록</base.Text>
						<base.Card style={{
								flex: 5,
								flexDirection: 'row', 
								alignItems: 'center',
								justifyContent: 'center',
								height: 120,
							}}>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('ListCommonShip')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='logo-buffer' style={{fontSize:35, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5}}>일반선박 목록</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('ListWastedShip')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='logo-buffer' style={{fontSize:35, color: '#006eee',}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5}}>유기선박 목록</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>this.props.navigation.navigate('Register')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='ios-add-circle' style={{fontSize:35, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5}}>선박등록</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form style={{width: '100%', flex: 1,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 10, flex: 1,}}>선박 검색</base.Text>
						<base.Card style={{
								flex: 5,
								flexDirection: 'row', 
								alignItems: 'center',
								justifyContent: 'center',
								height: 120,
							}}>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>Linking.openURL('http://m.kma.go.kr')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='ios-sunny' style={{fontSize:35, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5,}}>기상정보</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>
									Alert.alert(
										'선박확인체계 알림',
										'개발 중인 기능입니다',
									)	
								}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='ios-boat' style={{fontSize:35, color: '#006eee',}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5,}}>조업알리미</base.Text>
							</base.CardItem>
							<base.CardItem button style={{ flexDirection: 'column', flex: 1,}} onPress={()=>Linking.openURL('http://m.khoa.go.kr/')}>
								<base.Form style={{ backgroundColor: '#EDF5FE', width: 65, height: 65, borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
									<base.Icon name='ios-podium' style={{fontSize:35, color: '#006eee'}}/>
								</base.Form>
								<base.Text style={{fontFamily:'Nanum', marginTop: 5,}}>수치조류도</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
                </base.Content>
			<StatusBar hidden/>
            </base.Container>
		);
	}
}