import { Text, Pressable, PressableProps } from "react-native";
import { clsx } from "clsx";

/*
    For the category props have the PressableProps plus the ones that i want more
*/
type CategoryProps = PressableProps & {
  title: string;
  isSelected?: boolean;
};

/*
    ...rest: get all props of the Pressable
    {...rest}: give the Pressable all the props
*/
export function CategoryButton({ title, isSelected, ...rest }: CategoryProps) {
  return (
    <Pressable
      className={clsx(
        "bg-slate-800 px-3 justify-center rounded-md h-10",
        isSelected && "border-2 border-lime-300"
      )}
      {...rest}
    >
      <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
    </Pressable>
  );
}
