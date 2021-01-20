import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base'
import * as Font from 'expo-font';

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
		Font.loadAsync({
			Nanum: require('../../../assets/font/Nanum.ttf'),
			Nanum_Title: require('../../../assets/font/Nanum_Title.ttf'),
		})
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Body>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>회원가입</base.Title>
						<base.Subtitle style={{fontFamily:'Nanum_Title', fontSize: 10, marginTop: 5}}>아이디 비밀번호 생성</base.Subtitle>
					</base.Body>
				</base.Header>
				<base.Content padder>
					<base.Form style={{margin: 5,}}>
						<base.Text style={{fontFamily:'Nanum', fontSize: 40, color: '#006eee', margin: 5}}>환영합니다</base.Text>
						<base.Text style={{fontFamily:'Nanum', fontSize: 20, margin: 5}}>아래의 정보를 입력해주세요</base.Text>
					</base.Form>
					<base.Card>
						<base.Form style={{alignItems:'center', justifyContent: 'center', margin: 10}}>
							<base.Form style={{width: '100%',}}>
								<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
									<base.Input
										placeholder='아이디'
										onChangeText={(serviceNum) => this.setState({serviceNum})}
										style={{fontFamily:'Nanum'}}
										placeholderStyle={{fontFamily:'Nanum'}}
										keyboardType="number-pad"/>
								</base.Item>
							</base.Form>
							<base.Form style={{width: '100%', margin: 10,}}>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 개인신상 및 부서명칭 등과 관련 내용 미기입</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 일반 사전에 등록된 단어 미기입</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 동일문자 3회 이상 반복 미사용</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 연속적인 오름차순, 내림차순 미사용</base.Text>
							</base.Form>
							<base.Form style={{width: '100%',}}>
								<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
									<base.Input
										placeholder='비밀번호'
										onChangeText={(password) => this.setState({password})}
										style={{fontFamily:'Nanum'}}
										placeholderStyle={{fontFamily:'Nanum'}}
										secureTextEntry={ true }
										/>
								</base.Item>
							</base.Form>
							<base.Form style={{width: '100%',}}>
								<base.Item regular style={{ width:'100%', margin: 10, borderRadius: 10}}>
									<base.Input
										placeholder='비밀번호확인'
										onChangeText={(passwordCheck) => this.setState({passwordCheck})}
										style={{fontFamily:'Nanum'}}
										placeholderStyle={{fontFamily:'Nanum'}}
										secureTextEntry={ true }
										/>
								</base.Item>
							</base.Form>
							<base.Form style={{width: '100%', margin: 10,}}>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 개인신상 및 부서명칭 등과 관련 내용 미기입</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 일반 사전에 등록된 단어 미기입</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 숫자, 문자, 특수문자를 혼합하여 9자리 이상으로 조합</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 사용자 아이디와 미일치</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 동일문자 3회 이상 반복 미사용</base.Text>
								<base.Text style={{fontFamily:'Nanum', margin: 5}}>- 연속적인 오름차순, 내림차순 미사용</base.Text>
							</base.Form>
							<base.Form style={{flexDirection: 'row', alignItems:'center', marginTop: 10, marginBottom: 10,}}>
								<base.Button bordered style={{ flex: 1, width: '100%', marginRight: 5, borderRadius: 10}} onPress={()=>this.props.navigation.popToTop()}>
									<base.Text style={{fontFamily:'Nanum'}}>취소</base.Text>
								</base.Button>
								<base.Button bordered style={{ flex: 1,width: '100%', marginLeft: 5, borderRadius: 10}} onPress={this.executeSignup1}>
									<base.Text style={{fontFamily:'Nanum'}}>다음</base.Text>
								</base.Button>
							</base.Form>
						</base.Form>
					</base.Card>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}
