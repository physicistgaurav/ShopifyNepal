import { NavigationContainer } from "@react-navigation/native";
import AppStack from "../navigation/AppStack";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { addMyProducts } from "../redux/MyProductSlice";

let productItems = [
  {
    id: 0,
    image:
      "https://www.travelandleisure.com/thmb/GrTwS9uLl928zA3sZlLCVHxK48c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/nike-air-force-1-07-sneaker-tout-9357f30a2d724401a7068dec3ea51a0e.jpg",
    name: "Air Force 1 Sneakers",
    brand: "Nike",
    price: 2200,
    qty: 0,
  },
  {
    id: 1,
    image:
      "https://project-e-commerce-irvexllao-sulaksha-acharya.vercel.app/static/media/b3.be53f905c65e81e00a7b.jpeg",
    name: "Winter Set for boy",
    brand: "Levis",
    price: 1800,
    qty: 0,
  },
  {
    id: 2,
    image:
      "https://fdn2.mobgsm.com/vv/pics/xiaomi/xiaomi-redmi-11-prime-4g-1.jpg",
    name: "Redmi 11",
    brand: "Redmi",
    price: 17000,
    qty: 0,
  },
  {
    id: 3,
    image:
      "https://static-01.daraz.com.np/p/507045ba85b09bc737892c492e23b3f8.jpg",
    name: "Sweatshirt for Men",
    brand: "Denim",
    price: 1500,
    qty: 0,
  },
  {
    id: 4,
    image:
      "https://i.rtings.com/assets/products/rEgUwq9o/logitech-g502-x-plus/design-large.jpg",
    name: "Logitech G502 Mouse",
    brand: "LogiTech",
    price: 750,
    qty: 0,
  },
  {
    id: 5,
    image:
      "https://project-e-commerce-irvexllao-sulaksha-acharya.vercel.app/static/media/k1.d0a2869e23f665025f4d.jpg",
    name: "Whitedress Baby Girl ",
    brand: "Adidas",
    price: 3200,
    qty: 0,
  },
];

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    productItems.map((item) => {
      dispatch(addMyProducts(item));
    });
  }, []);
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default Main;
