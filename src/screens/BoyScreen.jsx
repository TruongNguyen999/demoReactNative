import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { View, Text, Platform } from "react-native";
import { Button } from "@rneui/themed";

import styled from "styled-components";

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

  // const { status } = await Notifications.getPermissionsAsync()

  // if(status !== 'granted') {
  //   const {status} = await Notifications.requestPermissionsAsync()
  //   if(status !== 'granted') {
  //     alert('failed to get notification token')
  //     return
  //   }
  // }

  // const tokenData = await Notifications.getExpoPushTokenAsync({
  //   projectId: '123',
  // })
  // console.log(tokenData)

  // const token = tokenData.data
  // console.log({token})
  // return token

  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
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
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token.data;
}

const BoyScreen = () => {
  const onPressGetNoti = () => {
    getNotificationToken().then(token => console.log(token))
  }
  return (
    <ViewContainer>
      <Heading>Bạn chưa có mã số, bấm vào để lấy mã</Heading>
      <Button title={"Bấm để lấy mã số"} onPress={onPressGetNoti} />
    </ViewContainer>
  );
};

export default BoyScreen;
