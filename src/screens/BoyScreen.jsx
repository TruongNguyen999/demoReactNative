import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { View, Text, Platform } from "react-native";
import { Button } from "@rneui/themed";

import styled from "styled-components";
import { useState } from 'react';
import { pushToken } from '../service/api';

const ViewContainer = styled(View)`
  padding: 20px 16px 0 16px;
`;

const Heading = styled(Text)`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
`;

async function getNotificationToken() {
  let token;

  // if (Platform.OS === 'android') {
  //   Notifications.setNotificationChannelAsync('default', {
  //     name: 'default',
  //     importance: Notifications.AndroidImportance.MAX,
  //     vibrationPattern: [0, 250, 250, 250],
  //     lightColor: '#FF231F7C',
  //   });
  // }

  // if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      // alert(existingStatus);
      console.log("TRUONG LOG existingStatus", existingStatus)
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig.extra.eas.projectId,
    });
    // alert(JSON.stringify(token));
    console.log("TRUONG LOG token", token)

    // console.log(token);
  // } else {
  //   alert('Must use physical device for Push Notifications');
  // }

  return token.data;
}

const BoyScreen = () => {
  const [token, setToken] = useState()
  const [demoToken, setDemoToken] = useState()

  const onGetNoti = async () => {
    const tokenData = await getNotificationToken()

    // test
    setDemoToken(tokenData)
    console.log("TRUONG LOG tokenData", tokenData)


    // console.log(tokenData);
    if(tokenData){
      const data = await pushToken(tokenData)
      setToken(data)
    }
  }

  return (
    <ViewContainer>
      <Heading> {demoToken ? demoToken : "" }</Heading>
      <Heading> {token ? `Mã số của bạn là ${token.id}` : "Bạn chưa có mã số, bấm vào để lấy mã" }</Heading>
      <Button title={"Bấm để lấy mã số"} onPress={onGetNoti} />
    </ViewContainer>
  );
};

export default BoyScreen;
