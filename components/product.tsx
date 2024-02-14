import { forwardRef } from "react";
import {
  Image,
  View,
  ImageProps,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";

type ProductDataProps = {
  title: string;
  description: string;
  thumbnail: ImageProps;
  quantity?: number;
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

/*
 For we to pass the component product to the info page, we need to use the forwarRef so when we click on the touchableOpacity
 We pass the info to that page
*/

export const Product = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="w-full flex-row items-center pb-4"
        {...rest}
      >
        <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />

        <View className="flex-1 ml-3">
          <View className="flex-row pr-5">
            <Text className="text-slate-100 font-subtitle text-base flex-1">
              {data.title}
            </Text>

            {data.quantity && (
              <View className="flex-row gap-2 items-center justify-center">
                <TouchableOpacity>
                  <Text className="text-white text-lg font-body">-</Text>
                </TouchableOpacity>
                <Text className="text-slate-400 font-subtitle text-sm">
                  x {data.quantity}
                </Text>
                <TouchableOpacity>
                  <Text className="text-white text-lg font-body">+</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text className="text-slate-400 font-body text-xs leading-5 mt-0.5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);
