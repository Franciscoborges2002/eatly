import { Text, View, ScrollView, Alert, Linking } from "react-native";
import { useNavigation } from "expo-router";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Product } from "@/components/product";
import { Header } from "@/components/header";

import { ProductCartProps, useCartStore } from "@/stores/cart-store";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const navigation = useNavigation();

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  );

  function handleProductRemoval(product: ProductCartProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: "Cancelar",
      },
      {
        text: "Remover",
        onPress: () => cartStore.removeItem(product.id),
      },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      //Simple verification if he inputed some text in the address
      return Alert.alert("Pedido", "Estão em falta os dados da entrega");
    }

    const products = cartStore.products
      .map((product) => `\n ${product.quantity}x ${product.title}`)
      .join("");

    const message = `
NOVO PEDIDO
    \n Endereço de entrega: ${address}

    ${products}
Valor total: ${total} 💸
    `;

    //removed the PHONE_NUMBER from here, if you want to use add this var
    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`);
    cartStore.clear();
    navigation.goBack();
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Carrinho" needCart={false} />

      <KeyboardAwareScrollView>
        <ScrollView className="p-1">
          {cartStore.products.length > 0 ? (
            <View className="p-5 flex-1">
              {cartStore.products.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                  onPress={() => handleProductRemoval(product)}
                />
              ))}
            </View>
          ) : (
            <Text className="font-body text-slate-400 text-center my-8">
              O carrinho está vazio!
            </Text>
          )}

          <Input
            placeholder="Endereço de entrega!"
            onChangeText={setAddress}
            onSubmitEditing={handleOrder}
            blurOnSubmit={true}
          />
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="flex-row items-center justify-between px-4">
        <View className="flex-row gap-2 items-center mt-5 mb-4">
          <Text className="text-white text-xl font-subtitle">Total:</Text>
          <Text className="text-lime-400 text-2xl font-title">{total}</Text>
        </View>
        <View className="flex-row items-center">
          <Button onPress={handleOrder}>
            <Button.Text>Enviar Pedido</Button.Text>
            <Button.Icon>
              <Feather name="arrow-right-circle" size={20} />
            </Button.Icon>
          </Button>
        </View>
      </View>
    </View>
  );
}
