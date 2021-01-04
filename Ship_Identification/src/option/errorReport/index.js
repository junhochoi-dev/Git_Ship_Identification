import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
export default class ErrorReport extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	render(){		
		return(
			<base.Container>
				<base.Header>
					<base.Left>
						<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
							<base.Icon name='arrow-back'/>
						</base.Button>
					</base.Left>
					<base.Right>
						<base.Title>오류보고</base.Title>
					</base.Right>
				</base.Header>
				<base.Content padder>
					<base.Card>
						<base.Textarea rowSpan={7} bordered placeholder="발견한 오류를 입력해주세요"/>
						<base.Button style={{width:'100%', marginBottom: 10,}}>
						<base.Text>제출하기</base.Text>
						</base.Button>
					</base.Card>
					
				</base.Content>
			</base.Container>
		);
	}
}