import { View, TouchableOpacity, Text } from "react-native";
import { Input, Button } from "@rneui/themed";

import styled from "styled-components";

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
`;

const GirlScreen = () => {
  return (
    <ViewContainer>
      <Input
        label="Mã số gấu 😀"
        placeholder="Nhập mã số của gấu đực vào đây!"
      />
      <Button title={"Xác nhận mã số"} />
      <Heading>Triệu hồi gấu đực</Heading>
      <ViewContent>
        <ButonContainer color="#e74c3c">
          <ButonText>😹 Em nhớ anh quá</ButonText>
        </ButonContainer>
        <ButonContainer color="#2980b9">
          <ButonText>😻 Em đói quá</ButonText>
        </ButonContainer>
        <ButonContainer color="#2ecc71">
          <ButonText>😿 Em thèm trà sữa</ButonText>
        </ButonContainer>
        <ButonContainer color="#f1c40f">
          <ButonText>😾 Em muốn đi chơi</ButonText>
        </ButonContainer>
      </ViewContent>
    </ViewContainer>
  );
};

export default GirlScreen;
