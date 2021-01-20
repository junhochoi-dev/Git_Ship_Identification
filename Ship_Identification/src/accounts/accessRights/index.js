import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as base from 'native-base';
export default class AccessRights extends Component{
	render(){
		return(
			<base.Container>
				<base.Header style={{backgroundColor: '#006eee'}}>
					<base.Body>
						<base.Title style={{fontFamily:'Nanum_Title', fontSize: 20}}>앱 접근권한 안내</base.Title>
					</base.Body>
				</base.Header>
				<base.Content padder>
					<base.Form style={{width: '100%', flex: 1,  justifyContent:'center'}}>
						<base.Form style={{margin: 20,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='logo-buffer'/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>저장공간</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								직접 촬영한 이미지를 저장하거나 앱 저장 경로를 이용하기 위해 파일 저장 공간에 접근합니다.
							</base.Text>
						</base.Form>

						<base.Form style={{margin: 20,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='ios-camera'/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>카메라</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								사진 촬영, 영상 촬영을 이용하기 위해 카메라 사용 권한에 접근합니다.
							</base.Text>
						</base.Form>
						<base.Form style={{margin: 20,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='ios-compass'/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>앨범</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								선박 등록을 위한 사진을 불러올 때에 앨범 접근 권한을 가져옵니다.
							</base.Text>
						</base.Form>
						<base.Form style={{margin: 20,}}>
							<base.Form style={{ flex: 1, flexDirection: 'row', alignItems: 'center'}}>
								<base.Icon name='ios-compass'/>
								<base.Text style={{ fontFamily:'Nanum', fontSize: 30, margin: 10,}}>위치정보</base.Text>
							</base.Form>
							<base.Text style={{ fontFamily:'Nanum' }}>
								위치 전송에서 현재 위치를 문자로 전송하거나, 선반 조회에서 현재 위치 기준으로 가까운 선박을 검색하기 위해 위치정보에 접근합니다.
							</base.Text>
						</base.Form>
						<base.Form style={{flexDirection: 'row', alignItems:'center', marginTop: 10, marginBottom: 10,}}>
							<base.Button bordered style={{ flex: 1, width: '100%', marginRight: 5, borderRadius: 10}} onPress={()=>this.props.navigation.popToTop()}>
								<base.Text style={{fontFamily:'Nanum'}}>취소</base.Text>
							</base.Button>
							<base.Button bordered style={{ flex: 1,width: '100%', marginLeft: 5, borderRadius: 10}} onPress={()=>this.props.navigation.navigate('Signup1')}>
								<base.Text style={{fontFamily:'Nanum'}}>위 내용에 대해 모두 동의합니다</base.Text>
							</base.Button>
						</base.Form>
					</base.Form>
				</base.Content>
			<StatusBar hidden/>
			</base.Container>
		);
	}
}