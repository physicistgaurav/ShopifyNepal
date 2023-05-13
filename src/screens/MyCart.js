import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { Icon } from "react-native-elements";
import {
  addProductToMyCart,
  deleteMyCartItem,
  removeMyCartItem,
} from "../redux/MyCartSlice";
import { decreaseQty, increaseQty } from "../redux/MyProductSlice";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const MyCart = ({ navigation }) => {
  const myCartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const saveCartData = async (cartItems) => {
    try {
      const jsonValue = JSON.stringify(cartItems);
      await AsyncStorage.setItem("cartItems", jsonValue);
    } catch (error) {
      console.log("Error saving cart data:", error);
    }
  };

  const loadCartData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("cartItems");
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.log("Error loading cart data:", error);
      return [];
    }
  };

  const [myCartItemStored, setMyCartItemStored] = useState([]);

  useEffect(() => {
    loadCartData().then((data) => setMyCartItemStored(data));
  }, []);

  useEffect(() => {
    saveCartData(myCartItemStored);
  }, [myCartItemStored]);

  const getTotal = () => {
    let total = 0;
    myCartItems.map((item) => {
      total = total + item.qty * item.price;
    });
    return total;
  };

  return (
    <>
      <MyStatusBar backgroundColor="#5E8D48" barStyle="light-content" />
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrow-back" type="material" color="#000" />
        </TouchableOpacity>
        <Image source={require("../images/logonew.png")} style={styles.logo} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("MyCart");
          }}
        >
          <FontAwesome name="shopping-cart" size={30} color="#0a5b92" />
          <View style={styles.notificationContainer}>
            <Text style={styles.notificationText}>{myCartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <FlatList
          data={myCartItems}
          renderItem={({ item }) => {
            return (
              <>
                <View style={styles.cart}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <View style={styles.detailText}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productBrand}>{item.brand}</Text>
                    <Text style={styles.productPrice}>
                      {"रु " + item.price}
                    </Text>
                    <View style={styles.buttonView}>
                      {item.qty == 0 ? null : (
                        <>
                          <TouchableOpacity
                            style={styles.buttonPlus}
                            onPress={() => {
                              dispatch(addProductToMyCart(item));
                              dispatch(increaseQty(item.id));
                            }}
                          >
                            <Text style={styles.buttonText}>+</Text>
                          </TouchableOpacity>
                          <Text style={styles.quantity}>{item.qty}</Text>
                          <TouchableOpacity
                            style={styles.buttonMinus}
                            onPress={() => {
                              if (item.qty > 1) {
                                dispatch(removeMyCartItem(item));
                                dispatch(decreaseQty(item.id));
                              } else {
                                dispatch(deleteMyCartItem(item.id));
                                dispatch(decreaseQty(item.id));
                              }
                            }}
                          >
                            <Text style={styles.buttonText}>-</Text>
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonPrice}>{"Total: " + getTotal()}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    backgroundColor: "#fff",
    elevation: 1,
    justifyContent: "space-between",
    paddingRight: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationContainer: {
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -5,
    right: -5,
  },
  notificationText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cart: {
    width: "94%",
    alignSelf: "center",
    height: 120,
    backgroundColor: "#fff",
    marginTop: 10,
    borderRadius: 10,
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  productImage: {
    width: 105,
    height: 105,
    borderRadius: 10,
    resizeMode: "cover",
  },
  productName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#134b5f",
  },
  productBrand: {
    fontSize: 16,
    fontWeight: "600",
    color: "#165a72",
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
  },
  detailText: {
    padding: 10,
  },
  buttonView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  buttonCart: {
    backgroundColor: "#66b6d2",
    borderRadius: 7,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonPlus: {
    backgroundColor: "#6c9870",
    borderRadius: 7,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    // marginLeft: 10,
  },
  buttonMinus: {
    backgroundColor: "#d04e0e",
    borderRadius: 7,
    height: 27,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
  quantity: {
    color: "#000",
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  logo: {
    height: 50,
  },
  button: {
    backgroundColor: "#302298",
    borderRadius: 20,
    padding: 10,
    margin: 14,
    width: "78%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    alignSelf: "center",
  },
  buttonPrice: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
});
