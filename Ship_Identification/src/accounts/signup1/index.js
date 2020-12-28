import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base'

const alertMessage =
	  ' 1. 숫자, 문자, 특수문자를 혼합하여 9자리 이상으로 조합\n' +
	  ' 2. 사용자 아이디와 미일치\n' +
	  ' 3. 개인신상 및 부서명칭 등과 관련 내용 미기입\n' +
	  ' 4. 일반 사전에 등록된 단어 미기입\n' +
	  ' 5. 동일문자 3회 이상 반복 미사용\n' +
	  ' 6. 연속적인 오름차순, 내림차순 미사용'

export default class Signup1 extends Component{
	constructor(props){
		super(props)
		this.state={
			serviceNum: '',
			password: '',
			passwordCheck: '',
		}
		this.executeSignup1 = this.executeSignup1.bind(this)
	}
	componentWillMount(){}
	componentDidMount(){}
	executeSignup1(){
		if(this.state.serviceNum == '') alert('생성할 아이디를 입력하십시오')
		else if(this.state.password == '') alert('첫번째 비밀번호를 입력하십시오')
		else if(this.state.passwordCheck == '') alert('두번째 비밀번호를 입력하십시오')
		else if(this.state.password != this.state.passwordCheck) alert('비밀번호가 일치하지 않습니다')
		else {
			this.props.navigation.navigate('Signup2',{
				serviceNum : this.state.serviceNum,
				password : this.state.password,
		})}
	}
	render(){
		return(
			<base.Container>
				<base.Content>
					<base.Form>
						<base.Item floatingLabel>
							<base.Label>아이디</base.Label>
							<base.Input onChangeText={(serviceNum) => this.setState({serviceNum})} keyboardType="number-pad"/>
						</base.Item>
						<base.Button bordered onPress={() => alert( alertMessage )}>
							<base.Text>아이디조건</base.Text>
						</base.Button>
						<base.Item floatingLabel>
							<base.Label>비밀번호</base.Label>
							<base.Input onChangeText={(password) => this.setState({password})} secureTextEntry={ true }/>
						</base.Item>
						<base.Item floatingLabel>
							<base.Label>비밀번호확인</base.Label>
							<base.Input onChangeText={(passwordCheck) => this.setState({passwordCheck})} secureTextEntry={ true }/>
						</base.Item>
						<base.Button bordered onPress={()=>this.props.navigation.popToTop()}>
							<base.Text>취소</base.Text>
						</base.Button>
						<base.Button bordered onPress={this.executeSignup1}>
							<base.Text>다음</base.Text>
						</base.Button>
					</base.Form>
				</base.Content>
			</base.Container>
		);
	}
}