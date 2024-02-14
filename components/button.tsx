import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityComponent } from "react-native";

type ButtonProps = TouchableOpacityComponent & {
  children: ReactNode;//To be able to pass other component as a child to the touchableopcity
};

type ButtonTextProps = {
    children: ReactNode;
}

type ButtonIconProps = {
    children: ReactNode;
}

function Button({ children, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
}

function ButtonText({ children }: ButtonTextProps){
    return(
        <Text className="text-black font-heading text-base mx-2">
            {children}
        </Text>
    );
}

function ButtonIcon({ children }: ButtonIconProps){
    return children;
}

//Inject both text and icon to the main component if button
Button.Text = ButtonText
Button.Icon = ButtonIcon

//Export the button
export { Button }