import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import * as base from 'native-base';
import { Linking } from 'react-native';

export default class Home extends Component{
	render(){
		return(
			<base.Container>
				<base.Header>
					<base.Left>
						<base.Button transparent>
							<base.Icon name='ios-menu'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title>선박정보확인체계</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Form>
						<base.Text>TEST</base.Text>
						<base.Card style={{flexDirection: 'row', 
							alignItems: 'center',
							justifyContent: 'center',}}>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-construct'/>
								<base.Text>개발중</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-construct'/>
								<base.Text>개발중</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-construct'/>
								<base.Text>개발중</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form>
						<base.Text>검색</base.Text>
						<base.Card style={{flexDirection: 'row', 
							alignItems: 'center',
							justifyContent: 'center',}}>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10, }}>
								<base.Icon name='ios-camera'/>
								<base.Text>AI선박통합검색</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10, }} onPress={()=>this.props.navigation.navigate('Search')}>
								<base.Icon name='ios-search'/>
								<base.Text>선박통합검색</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}} onPress={()=>this.props.navigation.navigate('SearchMap')}>
								<base.Icon name='ios-map'/>
								<base.Text>지도검색{'\n'}[유기,폐선박]</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form>
						<base.Text>등록</base.Text>
						<base.Card style={{flexDirection: 'row', 
							alignItems: 'center',
							justifyContent: 'center',}}>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}} onPress={()=>this.props.navigation.navigate('Register')}>
								<base.Icon name='ios-add-circle'/>
								<base.Text>선박초기등록</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}} onPress={()=>this.props.navigation.navigate('Register')}>
								<base.Icon name='logo-buffer'/>
								<base.Text>선박추가등록</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form>
						<base.Text>추가기능</base.Text>
						<base.Card style={{flexDirection: 'row', 
							alignItems: 'center',
							justifyContent: 'center',}}>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10, }} onPress={()=>Linking.openURL('http://m.kma.go.kr')}>
								<base.Icon name='ios-sunny'/>
								<base.Text>기상정보</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-boat'/>
								<base.Text>수협조업정보알리미</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}} onPress={()=>Linking.openURL('http://m.khoa.go.kr/')}>
								<base.Icon name='ios-podium'/>
								<base.Text>수치조류도</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
				</base.Content>
			</base.Container>
		);
	}
}