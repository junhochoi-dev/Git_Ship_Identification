import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import styles from './styles';
import * as base from 'native-base';
import { Linking, Image } from 'react-native';
import * as Font from 'expo-font';
export default class Home extends Component{
	render(){
		return(
			<base.Container>
				<base.Header>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.openDrawer()}>
							<base.Icon name='ios-menu'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title>선박정보확인체계</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Card>
						<base.Form style={{margin: 10,}}>
							<base.Text>일반검색</base.Text>
							<base.Card style={{
									flexDirection: 'row', 
									alignItems: 'center',
									justifyContent: 'center',
									height: 100,
								}}>
								<base.CardItem button style={styles.iconBackground} onPress={()=>this.props.navigation.navigate('Search')}>
									<base.Icon name='ios-search'/>
									<base.Text>선박통합검색</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.iconBackground} onPress={()=>this.props.navigation.navigate('SearchMap')}>
									<base.Icon name='ios-map'/>
									<base.Text>지도검색{'\n'}[유기,폐선박]</base.Text>
								</base.CardItem>
							</base.Card>
						</base.Form>
						<base.Form style={{margin: 10,}}>
							<base.Text>기능검색</base.Text>
							<base.Card style={{
									flexDirection: 'row', 
									alignItems: 'center',
									justifyContent: 'center',
									height: 100,
								}}>
								<base.CardItem button style={styles.iconBackground} onPress={()=>this.props.navigation.navigate('SearchAI')}>
									<base.Icon name='ios-camera'/>
									<base.Text>AI선박검색</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.iconBackground}>
									<base.Icon name='ios-paper-plane'/>
									<base.Text>드론검색</base.Text>
								</base.CardItem>
								<base.CardItem button style={styles.iconBackground}>
									<base.Icon name='ios-expand'/>
									<base.Text>선박QR코드검색</base.Text>
								</base.CardItem>
							</base.Card>
						</base.Form>
					</base.Card>
					<base.Form>
						<base.Text>선박 목록</base.Text>
						<base.Card style={{
								flexDirection: 'row', 
								alignItems: 'center',
								justifyContent: 'center',
								height: 100,
							}}>
							<base.CardItem button style={styles.iconBackground} onPress={()=>this.props.navigation.navigate('ListCommonShip')}>
								<base.Icon name='logo-buffer'/>
								<base.Text>일반선박 목록</base.Text>
							</base.CardItem>
							<base.CardItem button style={styles.iconBackground} onPress={()=>this.props.navigation.navigate('ListWastedShip')}>
								<base.Icon name='logo-buffer'/>
								<base.Text>유기,폐선박 목록</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form>
						<base.Text>등록</base.Text>
						<base.Card style={{
								flexDirection: 'row', 
								alignItems: 'center',
								justifyContent: 'center',
								height: 100,
							}}>
							<base.CardItem button style={styles.iconBackground} onPress={()=>this.props.navigation.navigate('Register')}>
								<base.Icon name='ios-add-circle'/>
								<base.Text>선박초기등록</base.Text>
							</base.CardItem>
							<base.CardItem button style={styles.iconBackground} onPress={()=>this.props.navigation.navigate('RegisterPlus')}>
								<base.Icon name='ios-add-circle'/>
								<base.Text>선박추가등록</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
					<base.Form>
						<base.Text>추가기능</base.Text>
						<base.Card style={{
								flexDirection: 'row', 
								alignItems: 'center',
								justifyContent: 'center',
								height: 100,
							}}>
							<base.CardItem button style={styles.iconBackground} onPress={()=>Linking.openURL('http://m.kma.go.kr')}>
								<base.Icon name='ios-sunny'/>
								<base.Text>기상정보</base.Text>
							</base.CardItem>
							<base.CardItem button style={styles.iconBackground}>
								<base.Icon name='ios-boat'/>
								<base.Text>수협{'\n'}조업정보알리미</base.Text>
							</base.CardItem>
							<base.CardItem button style={styles.iconBackground} onPress={()=>Linking.openURL('http://m.khoa.go.kr/')}>
								<base.Icon name='ios-podium'/>
								<base.Text>수치조류도</base.Text>
							</base.CardItem>
						</base.Card>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}