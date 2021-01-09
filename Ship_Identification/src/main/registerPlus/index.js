import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { Image } from 'react-native';
import * as base from 'native-base';
import { SliderBox } from 'react-native-image-slider-box';
var BUTTONS = [
  { text: "카메라로 등록하기", icon: "ios-camera", iconColor: "#2c8ef4" },
  { text: "갤러리에서 등록하기", icon: "ios-images", iconColor: "#f42ced" },
  { text: "취소", icon: "close", iconColor: "#25de5b" }
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

export default class RegisterPlus extends Component{
	constructor(props) {
		super(props);
		this.state = {
			images: [
				require('/workspace/Ship_Identification/assets/db/db1.jpg'),
				require('/workspace/Ship_Identification/assets/db/db2.jpg'),
				require('/workspace/Ship_Identification/assets/db/db3.jpg'),
				require('/workspace/Ship_Identification/assets/db/db4.jpg'),
			]
		};
	}
	render(){
		return(
			<base.Root>
				<base.Container>
					<base.Header>
						<base.Left>
							<base.Button transparent onPress={()=>this.props.navigation.goBack()}>
								<base.Icon name='arrow-back'/>
							</base.Button>
						</base.Left>
						<base.Right>
							<base.Title>선박추가등록</base.Title>
						</base.Right>
					</base.Header>
					<base.Content padder>
						<base.Card>
							<SliderBox
								images={this.state.images}
								sliderBoxHeight={300}
								sliderBoxWidth={350}
								ImageComponentStyle={{ width: '100%', height: 300 }}
								onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
								currentImageEmitter={index => console.warn(`current pos is: ${index}`)}
								circleLoop
								resizeMode={'contain'}
								paginationBoxStyle={{
									position: "absolute",
									bottom: 0,
									padding: 0,
									alignItems: "center",
									alignSelf: "center",
									justifyContent: "center",
								}}
							/>
						</base.Card>
					</base.Content>
				</base.Container>
			</base.Root>
		);
	}
}