# React Native App

En este proyecto se desarrolló un simulador de transacciones de criptomonedas con React Native, Expo y Firebase.

## Deployment 🚀

La APK está disponible para descargar en el siguiente link:

https://expo.dev/accounts/isavega/projects/cryptoneat/builds/5f8e072b-c39b-4c03-bcd6-d7873b21e550

## Local

Instala las dependencias

```
yarn
```

Correr el proyecto

```
yarn start
```

Y escanea el código QR con la aplicación de Expo. Funciona para Android y IOS 🙌

## Aclaraciones

1. Funciona tanto en IOS como Android. Se puede probar en ambos dispositivos con la app de Expo pero solo generé el build de desarrollo para Android. 
2. Por simplicidad, no agregué la confirmación del correo electrónico al momento de crear una cuenta. Esto se puede configurar desde la consola del proyecto en Firebase.
3. Para el portafolio, consideré 4 criptomonedas en las cuales asumo un precio fijo en USD (Mayo 2024).
4. Al crear cada usuario se le asigna un portafolio con montos iniciales de criptomonedas para facilitar la simulación de compra/venta. Las asignaciones son las siguientes:

```
BTC: 10,000 USD
ETC: 1,000 USD
THETHER: 500 USD
DOGECOIN: 100 USD
```
