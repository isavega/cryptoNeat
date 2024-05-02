import React from "react";
import { View, Image, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button, Card, ButtonGroup } from "@rneui/themed";
import style from "./styles";
import color from "../../styles/colors";

const HomeScreen = (props) => {
  const dummyCryptoData = [
    {
      name: "Bitcoin",
      priceUSD: "10000",
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    },
    {
      name: "Ethereum",
      priceUSD: "10000",
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    },
    {
      name: "Theter",
      priceUSD: "10000",
      image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    },
    {
      name: "Dogecoin",

      priceUSD: "10000",
      image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    },
  ];

  return (
    <View style={style.screen}>
      <Text style={style.title}>Valor Portafolio USD: $3,233</Text>
      <Text style={style.title}>Cryptos favoritas</Text>
      <View style={style.container}>
        {dummyCryptoData.map((crypto) => (
          <Card containerStyle={style.cardContainer} wrapperStyle={{}}>
            <Card.Title>{crypto.name}</Card.Title>
            <Card.Divider />
            <View
              style={{
                position: "relative",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: "50%", height: 50 }}
                resizeMode="contain"
                source={{
                  uri: `${crypto.image}`,
                }}
              />
              <Text>{crypto.price}</Text>
              <Text>{crypto.price}</Text>
            </View>
          </Card>
        ))}
      </View>

      <View style={style.buttonGroupContainer}>
        <Button
          title="Comprar"
          type="outline"
          buttonStyle={style.button.container}
          titleStyle={style.button.text}
        />
        <Button
          title="Vender"
          type="outline"
          buttonStyle={style.button.container}
          titleStyle={style.button.text}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
