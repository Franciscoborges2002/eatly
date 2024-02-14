import { View, FlatList, SectionList, Text } from "react-native";
import { useState, useRef } from "react";
import { Link } from "expo-router";

import { Header } from "@/components/header";
import { CategoryButton } from "@/components/category-button";
import { Product } from "@/components/product";
import { CATEGORIES, MENU } from "@/utils/data/products";
import { useCartStore } from "@/stores/cart-store";

export default function Home() {
  const cartStore = useCartStore();
  const [category, setCategory] = useState(CATEGORIES[0]);

  const sectionListRef = useRef<SectionList>(null);

  //Pass on every product, add the quantity of each one and return, and start in 0
  const cartQuantityItems = cartStore.products.reduce(
    (total, product) => total + product.quantity,
    0
  );

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory);

    //Get the index of the category
    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    );

    if (sectionListRef.current) {
      //If the section list has the current item selected
      sectionListRef.current.scrollToLocation({
        animated: true, //To have animation
        sectionIndex, //The index we of the list we want to go
        itemIndex: 0, //Pu in which item of that section
      });
    }
  }

  return (
    <View className="flex-1 pt-8">
      <Header
        title="Faça o seu pedido!"
        cartQuantityItems={cartQuantityItems}
      />

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)}
          />
        )}
        horizontal //Put the list in horizontal
        className="max-10 mt-5"
        contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }} //To make the items in the list espaced
        showsHorizontalScrollIndicator={false} //Dont show the bottom scroll bar
      />

      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-heading mt-8 mb-3">
            {title}
          </Text>
        )}
        className="flex-1 p-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}
