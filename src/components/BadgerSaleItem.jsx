import { Text, View, Image, StyleSheet, Button } from "react-native";
import { useContext } from "react";
import BasketContext from "./BasketContext";

export default function BadgerSaleItem(props) {
  const [basket, setBasket] = useContext(BasketContext);
  //   Allow the user to add and remove items from their basket via "+" and "-" buttons.

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.imgSrc }}
        style={{ width: 250, height: 250 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.name}</Text>
      <Text>${props.price} each</Text>
      <Text>You can order up to {props.upperLimit} units!</Text>

      {/* Allow the user to add and remove items from their basket via "+" and "-" buttons. 
        The "-" button should be disabled when the user has 0 of that item in their basket, 
        and the "+" button should be disabled when the user has reached the upperLimit of that item. */}
      <View style={{ flexDirection: "row" }}>
        <View style={styles.buttonContainer}>
          <Button
            title=" - "
            color="white"
            disabled={basket[props.current] === 0}
            onPress={() =>
              setBasket({
                ...basket,
                [props.current]: basket[props.current] - 1,
              })
            }
          />
        </View>

        <Text style={styles.FruitContainer}>{basket[props.current]}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title=" + "
            color="white"
            disabled={basket[props.current] === props.upperLimit}
            onPress={() =>
              setBasket({
                ...basket,
                [props.current]: basket[props.current] + 1,
              })
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -200,
  },
  buttonContainer: {
    marginTop: 20, // Add top margin to move it down
    backgroundColor: "blue",
    marginHorizontal: 2,
    borderRadius: 3,
    marginHorizontal: 10,
  },
  FruitContainer: {
    marginTop: 25, // Add top margin to move it down
    marginHorizontal: 10,
    fontSize: 20,
  },
});
