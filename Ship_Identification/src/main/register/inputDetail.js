import React, { Component } from 'react';
import * as base from 'native-base'

export const inputDetail = (flag) => {
	if(flag == 'Normal'){
		return(
			<base.Container>
				<base.Content>
					<base.Card>
						<base.Form style={{flex: 1,}}>
							<base.Item floatingLabel>
								<base.Label>선박명</base.Label>
								<base.Input />
							</base.Item>

							<base.Item floatingLabel>
								<base.Label>국제선박일련번호 [IMO]</base.Label>
								<base.Input keyboardType="number-pad" />
							</base.Item>

							<base.Item floatingLabel>
								<base.Label>호출부호 [CALLSIGN]</base.Label>
								<base.Input />
							</base.Item>

							<base.Item floatingLabel>
								<base.Label>해상이동통신식별번호 [MMSI]</base.Label>
								<base.Input keyboardType="number-pad" />
							</base.Item>

							<base.Item floatingLabel>
								<base.Label>선박용도</base.Label>
								<base.Input />
							</base.Item>

							<base.Item floatingLabel>
								<base.Label>제작년도</base.Label>
								<base.Input keyboardType="number-pad" />
							</base.Item>

							<base.Item floatingLabel>
								<base.Label>입항국가</base.Label>
								<base.Input />
							</base.Item>

							<base.Item floatingLabel last>
								<base.Label>정박항구</base.Label>
								<base.Input />
							</base.Item>
						</base.Form>
					</base.Card>
					<base.Button block light>
						<base.Text>선박등록하기</base.Text>
					</base.Button>
				</base.Content>
			</base.Container>
		)
	}
	else { // flag == 'Wasted'
		return(
		<base.Container>
			<base.Content>
				<base.Card>
					<base.Form style={{flex: 1,}}>
						<base.Item floatingLabel>
							<base.Label>선박명</base.Label>
							<base.Input />
						</base.Item>
						
						<base.Item floatingLabel>
							<base.Label>선박용도</base.Label>
							<base.Input />
						</base.Item>
						
						<base.Item floatingLabel>
							<base.Label>제작년도</base.Label>
							<base.Input keyboardType="number-pad" />
						</base.Item>
						
						<base.Item floatingLabel last>
							<base.Label>정박항구</base.Label>
							<base.Input />
						</base.Item>
					</base.Form>
				</base.Card>
				<base.Button block light>
					<base.Text>선박등록하기</base.Text>
				</base.Button>
			</base.Content>
		</base.Container>
		)
	}
}
