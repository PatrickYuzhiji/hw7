// [
//     {
//       "description": "A crisp, juicy fruit with a sweet to tart taste, commonly red, green, or yellow in skin color.",
//       "imgSrc": "https://raw.githubusercontent.com/CS571-F24/hw7-api-static-content/main/apple.png",
//       "name": "Apple",
//       "price": 0.75,
//       "upperLimit": 20
//     },
//     {
//       "description": "A dense, chewy bread roll, traditionally shaped into a ring, often topped with seeds or seasonings.",
//       "imgSrc": "https://raw.githubusercontent.com/CS571-F24/hw7-api-static-content/main/bagel.png",
//       "name": "Bagel",
//       "price": 0.5,
//       "upperLimit": 8
//     },
//     {
//       "description": "A large, tropical fruit with a hard shell, edible white flesh, and a clear liquid inside, known as coconut water.",
//       "imgSrc": "https://raw.githubusercontent.com/CS571-F24/hw7-api-static-content/main/coconut.png",
//       "name": "Coconut",
//       "price": 2.5,
//       "upperLimit": 4
//     },
//     {
//       "description": "A sweet, fried dough treat, typically circular with a hole in the center, and often glazed or topped with sugar and other sweets.",
//       "imgSrc": "https://raw.githubusercontent.com/CS571-F24/hw7-api-static-content/main/donut.png",
//       "name": "Donut",
//       "price": 1.5,
//       "upperLimit": 12
//     },
//     {
//       "description": "A versatile, oval-shaped ingredient with a hard outer shell, containing a protein-rich white and a nutrient-dense yolk inside.",
//       "imgSrc": "https://raw.githubusercontent.com/CS571-F24/hw7-api-static-content/main/eggs.png",
//       "name": "Eggs",
//       "price": 1,
//       "upperLimit": 6
//     }
//   ]

import { Text, View, Button, StyleSheet, Alert } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";
import { useState, useEffect, useContext } from "react";
import BasketContext from "./BasketContext";

export default function BadgerMart(props) {
  const [itemList, setItemList] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [basket, setBasket] = useState([]);
  //计算 baskt 里面有几个键值对value不会0的
  const totalItems = Object.values(basket).reduce((acc, val) => acc + val, 0);
  // 计算总价
  const totalCost = itemList.reduce(
    (acc, item, index) => acc + item.price * basket[index],
    0
  );

  useEffect(() => {
    fetch("https://cs571.org/rest/f24/hw7/items", {
      method: "GET",
      headers: {
        "X-CS571-ID":
          "bid_98c5657e8b78dd46d95d3bfc60ab9ce817f77ae20fbae7eefdf042a344e41552",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItemList(data);
        setBasket(data.map(() => 0));
      });
  }, []);

  const handleOrder = () => {
    Alert.alert(
      "Order Confirmed!",
      `Your order contains ${totalItems} items and costs $${totalCost.toFixed(
        2
      )}!`
    );
    setBasket(itemList.map(() => 0));
    setCurrentItem(0);
    // 更新itmelist的item的upperLimit，减去basket里面的值
    setItemList(
      itemList.map((item, index) => ({
        ...item,
        upperLimit: item.upperLimit - basket[index],
      }))
    );
  };

  return (
    <BasketContext.Provider value={[basket, setBasket]}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Badger Mart!</Text>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttonContainer}>
            <Button
              title="PREVIOUS"
              disabled={currentItem === 0}
              onPress={() => setCurrentItem(currentItem - 1)}
              color="white"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="NEXT"
              disabled={currentItem === itemList.length - 1}
              onPress={() => setCurrentItem(currentItem + 1)}
              color="white"
            />
          </View>
        </View>

        {itemList ? (
          <BadgerSaleItem {...itemList[currentItem]} current={currentItem} />
        ) : (
          <Text>Loading...</Text>
        )}
        {/* The (a) total cost (displayed to the nearest hundreth) 
        and (b) number of items in the users' basket should be shown 
        at the bottom of the screen. */}
        <View style={styles.costContainer}>
          <Text style={{ fontSize: 16 }}>
            You have {totalItems} item(s) costing ${totalCost.toFixed(2)} in
            your cart!
          </Text>
        </View>
      </View>

      {/* The user should be able to "submit" their order by pressing 
      a "place order" button. This button should be disabled if there are no items in their basket.
        Upon submitting an order, a message should be displayed that says "Order Confirmed! 
        Your order contains NUM_ITEMS items and costs $PRICE!" 
        Be sure to display both the number of items sold and the total price. 
        After, clear their basket and return to the first item.
 */}
      <View style={styles.orderContainer}>
        <Button
          title="Place Order"
          color="white"
          disabled={totalItems === 0}
          onPress={handleOrder}
        />
      </View>
    </BasketContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    marginTop: 100, // Add top margin to move it down
  },
  buttonContainer: {
    marginTop: 20, // Add top margin to move it down
    backgroundColor: "blue",
    marginHorizontal: 2,
    borderRadius: 3,
  },
  orderContainer: {
    position: "absolute",
    bottom: 100, // Adjust this value to move it up or down
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 3,
  },
  costContainer: {
    position: "absolute",
    bottom: 180, // Adjust this value to move it up or down
    alignItems: "center",
  },
});
