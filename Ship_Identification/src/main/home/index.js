import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';

import * as base from 'native-base'

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
				<base.Content>
					<base.Form>
						<base.Text>DB관리/등록</base.Text>
						<base.Card style={{flexDirection: 'row', 
							alignItems: 'center',
							justifyContent: 'center',}}>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10, }}>
								<base.Icon name='ios-camera'/>
								<base.Text>AI검색</base.Text>
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
						<base.Text>DB관리/등록</base.Text>
						<base.Card style={{flexDirection: 'row', 
							alignItems: 'center',
							justifyContent: 'center',}}>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10, }}>
								<base.Icon name='ios-search'/>
								<base.Text>선박검색</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-map'/>
								<base.Text>일반선박{'\n'}지도검색</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-map'/>
								<base.Text>유기,폐선박{'\n'}지도검색</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}} onPress={()=>this.props.navigation.navigate('Register')}>
								<base.Icon name='ios-add-circle'/>
								<base.Text>DB 등록</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form>
						<base.Text>DB관리/등록</base.Text>
						<base.Card style={{flexDirection: 'row', 
							alignItems: 'center',
							justifyContent: 'center',}}>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10, }}>
								<base.Icon name='ios-sunny'/>
								<base.Text>기상정보</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-boat'/>
								<base.Text>수협조업정보알리미</base.Text>
							</base.CardItem>
							<base.CardItem button style={{flexDirection: 'column', marginLeft: 10, marginRight: 10,}}>
								<base.Icon name='ios-construct'/>
								<base.Text>개발중</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
				</base.Content>
			</base.Container>
		);
	}
}