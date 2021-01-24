import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import * as base from 'native-base';
export default class ErrorReport extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	render(){		
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>오류보고</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Card>
						<base.Label style={{fontFamily:'Nanum_Title', fontSize: 30}} >오류보고 목록</base.Label>
						<base.Card>
							<base.Form style={{flexDirection: 'row', alignItems: 'center'}}>
								<base.Button block danger style={{width: 85}}>
									<base.Text style={{fontSize: 20}}>조치대기</base.Text>
								</base.Button>
								<base.Form style={{flexDirection: 'column', margin: 10}}>
									<base.Text>2020.12.17 21:01</base.Text>
									<base.Text>웹뷰화면이 보이지않아요...</base.Text>
								</base.Form>
							</base.Form>
						</base.Card>
						<base.Card>
							<base.Form style={{flexDirection: 'row', alignItems: 'center'}}>
								<base.Button block success style={{width: 85}}>
									<base.Text style={{fontSize: 20}}>조치완료</base.Text>
								</base.Button>
								<base.Form style={{flexDirection: 'column', margin: 10}}>
									<base.Text>2020.11.28 07:13</base.Text>
									<base.Text>AI인식을 할 수 없다고 뜹니다</base.Text>
								</base.Form>
							</base.Form>
						</base.Card>
						<base.Card>
							<base.Form style={{flexDirection: 'row', alignItems: 'center'}}>
								<base.Button block danger style={{width: 85}}>
									<base.Text style={{fontSize: 20}}>조치대기</base.Text>
								</base.Button>
								<base.Form style={{flexDirection: 'column', margin: 10}}>
									<base.Text>2021.01.08 14:02</base.Text>
									<base.Text>다른 앱 넘어가는 링크 창이 안떠요..</base.Text>
								</base.Form>
							</base.Form>
						</base.Card>
						<base.Card>
							<base.Form style={{flexDirection: 'row', alignItems: 'center',}}>
								<base.Button block warning style={{width: 85}}>
									<base.Text style={{fontSize: 20}}>조치확인</base.Text>
								</base.Button>
								<base.Form style={{flexDirection: 'column', margin: 10}}>
									<base.Text>2021.01.02 22:12</base.Text>
									<base.Text>선박 등록이 안됩니다</base.Text>
								</base.Form>
							</base.Form>
						</base.Card>
					</base.Card>
					<base.Card>
						<base.Form style={{margin: 10,}}>
						<base.Card>
							<base.Item stackedLabel style={{margin: 10,}}>
								<base.Label>제목</base.Label>
								<base.Input></base.Input>
							</base.Item>
						</base.Card>
						<base.Card>
							<base.Item stackedLabel style={{margin: 10,}}>
								<base.Label>발견한 오류를 입력해주세요</base.Label>
								<base.Textarea rowSpan={7} bordered style={{width: '100%'}}/>
							</base.Item>
						</base.Card>
						<base.Button style={{width:'100%', marginBottom: 10,}}>
							<base.Text>제출하기</base.Text>
						</base.Button>
						</base.Form>
					</base.Card>
				</base.Content>
			</base.Container>
		);
	}
}