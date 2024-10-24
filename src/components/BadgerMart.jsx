import { Text, View } from "react-native";
import BadgerSaleItem from "./BadgerSaleItem";

import CS571 from '@cs571/mobile-client'

export default function BadgerMart(props) {
    return <View>
        <Text style={{fontSize: 28}}>Welcome to Badger Mart!</Text>
        <BadgerSaleItem/>
        <BadgerSaleItem/>
        <BadgerSaleItem/>
    </View>
}