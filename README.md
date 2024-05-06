# React Native App

En este proyecto se desarrolló un simulador de transacciones de criptomonedas con React Native, Expo y Firebase.

## Local

Instala las dependencias

```
yarn
```

Correr el proyecto

```
yarn start
```

## Aclaraciones

1. Funciona tanto en IOS como Android.
2. Por simplicidad, no agregué la confirmación del correo electrónico al momento de crear una cuenta. Pero esto se puede configurar desde la consola del proyecto en Firebase.
3. Para el portafolio, consideré a las 4 criptomonedas en las cuales asumo un precio fijo en USD (Mayo 2024).
4. Al crear cada usuario se le asigna un portafolio con montos iniciales de criptomonedas para facilitar la simulación de compra/venta. Las asignaciones son las siguientes:

```
BTC: 10,000 USD
ETC: 1,000 USD
THETHER: 500 USD
DOGECOIN: 100 USD
```
