import { View, TouchableOpacity, Text } from "react-native";
import { Input, Button } from "@rneui/themed";

import styled from "styled-components";
import { getToken, senPushNotification } from "../service/api";
import { useState } from "react";

const ViewContainer = styled(View)`
  padding: 20px 16px 0 16px;
`;

const ViewContent = styled(View)`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ButonContainer = styled(TouchableOpacity)`
  height: 150px;
  width: 48%;
  background-color: ${(p) => p.color || "red"};
  margin-bottom: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const ButonText = styled(Text)`
  color: white;
  font-weight: 600;
`;

const Heading = styled(Text)`
  margin-top: 16px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  ${p => p.mb ? 'margin-bottom: 16px' : ''}
`;

const GirlScreen = () => {

  const [code, setCode] = useState('')
  const [token, setToken] = useState('')

  const onAccept = async () => {
    if(code){
      const res = await getToken(code)
      if(res){
        setToken(res)
      }
    }
  }

  const onSendNoti = (title = '', content = '') => {
    senPushNotification(token.token, title, content)
  }

  return (
    <ViewContainer>
      {
        token ? <Heading mb>Có thể triệu hồi gấu số {token.id}</Heading>
              : <Input
                  label="Mã số gấu 😀"
                  placeholder="Nhập mã số của gấu đực vào đây!"
                  onChangeText={v => setCode(v)}
                />
      }
      
      <Button onPress={onAccept} title={"Xác nhận mã số"} />
      
      {
        !token ? ''
               : <View>
                    <Heading>Triệu hồi gấu đực</Heading>
                    <ViewContent>
                      <ButonContainer color="#e74c3c" onPress={() => onSendNoti('Gấu cái gọi 😹', '😹 Em nhớ anh quá huhuhu')}>
                        <ButonText>😹 Em nhớ anh quá</ButonText>
                      </ButonContainer>
                      <ButonContainer color="#2980b9" onPress={() => onSendNoti('Gấu cái gọi 😹', '😻 Em đói quá huhuhu')}>
                        <ButonText>😻 Em đói quá</ButonText>
                      </ButonContainer>
                      <ButonContainer color="#2ecc71" onPress={() => onSendNoti('Gấu cái gọi 😹', '😿 Em thèm trà sữa huhuhu')}>
                        <ButonText>😿 Em thèm trà sữa</ButonText>
                      </ButonContainer>
                      <ButonContainer color="#f1c40f" onPress={() => onSendNoti('Gấu cái gọi 😹', '😾 Em muốn đi chơi huhuhu')}>
                        <ButonText>😾 Em muốn đi chơi</ButonText>
                      </ButonContainer>
                    </ViewContent>
                </View>
      }
    </ViewContainer>
  );
};

export default GirlScreen;
