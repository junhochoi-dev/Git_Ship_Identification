import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import * as base from 'native-base';

const SIZE_MAIN = Dimensions.get('screen').width * 0.03
const SIZE_TITLE = Dimensions.get('screen').width * 0.08

export default class AccessRights extends Component{
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Body>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>앱 접근권한 동의 안내</base.Title>
					</base.Body>
				</base.Header>
				<base.Content padder>
					<base.Form style={{width: '100%', flex: 1,  justifyContent:'center'}}>
						<base.Form style={{alignItems: 'center', margin: 10,}}>
							<base.Text style={{ fontFamily:'Nanum_Title', fontSize: SIZE_TITLE, color: '#006eee' }}>
								앱 접근 권한 동의 안내
							</base.Text>
							<base.Text style={{ fontFamily:'Nanum', marginTop: 10, }}>
								선박확인체계 앱 사용을 위해 다음 접근권한 동의가 필요합니다
							</base.Text>
						</base.Form>

						<base.Form style={{margin: 10,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='ios-camera' style={{fontSize:30}}/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>카메라</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								일반선박, 유기선박 및 폐선박 등록과 AI알고리즘 검색을 위한 사진 촬영을 할 수 있도록 기기 카메라에 접근 권한을 허용합니다.
							</base.Text>
						</base.Form>
						
						<base.Form style={{margin: 10,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='ios-compass' style={{fontSize:30}}/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>앨범</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								일반선박, 유기선박 및 폐선박 등록과 AI알고리즘 검색을 위한 사진 불러오기를 할 수 있도록 기기 앨범(갤러리)에 접근 권한을 허용합니다.
							</base.Text>
						</base.Form>
						
						<base.Form style={{margin: 10,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='logo-buffer' style={{fontSize:30}}/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>저장공간</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								선박확인체계 앱 구동을 위한 기기 저장공간의 일부를 사용할 수 있도록 저장공간에 접근 권한을 허용합니다.
							</base.Text>
						</base.Form>
						
						<base.Form style={{margin: 10,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='ios-compass' style={{fontSize:30}}/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>위치정보</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								일반선박, 유기선박 및 폐선박 좌표 등록과 현재 위치에 따른 가까운 선박 조회를 위해 사용자 위치 정보를 가져올 수 있도록 위치정보 접근 권한을 허용합니다.
							</base.Text>
						</base.Form>
						
						<base.Form style={{margin: 10,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='ios-compass' style={{fontSize:30}}/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>디바이스 정보</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								사용자 회원가입, 로그인, 앱 기능 내 선박 데이터 사용 시, 보안적 기능을 위해 해당 디바이스 정보를 가져올 수 있도록 디바이스 정보 접근 권한을 허용합니다.
							</base.Text>
						</base.Form>
						<base.Form style={{flexDirection: 'row', alignItems:'center', marginTop: 10, marginBottom: 10,}}>
							<base.Button bordered style={{ flex: 1, width: '100%', marginRight: 5, borderRadius: 10, justifyContent: 'center'}} onPress={()=>this.props.navigation.popToTop()}>
								<base.Text style={{fontFamily:'Nanum'}}>취소</base.Text>
							</base.Button>
							<base.Button bordered style={{ flex: 1,width: '100%', marginLeft: 5, borderRadius: 10,  justifyContent: 'center'}} onPress={()=>this.props.navigation.navigate('Signup1')}>
								<base.Text style={{fontFamily:'Nanum'}}>동의합니다</base.Text>
							</base.Button>
						</base.Form>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}