// App.js
import React, { useState } from "react";
import {SafeAreaView, View, Button, StyleSheet, Image, Text, ScrollView} from "react-native";
import WaterGlass from "../components/WaterGlass";
import Colors from "../design/colors";
import colors from "../design/colors";
import sizes from "../design/sizes";


export default function AguaScreen() {
    const [ml, setMl] = useState(2000);
    const goal = 2000;

    return (
        <ScrollView style={styles.fundo} >
            <View style={styles.header}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
            </View>

            <Text style={styles.txtpadrao}>Você bebeu hoje:</Text>

            <WaterGlass currentMl={ml} goalMl={goal} />

            <View style={{ height: 20 }} />

            <Button title="+250 ml" onPress={() => setMl(ml + 250)} />
            <View style={{ height: 10 }} />
            <Button title="-250 ml" onPress={() => setMl((v) => Math.max(0, v - 250))} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: colors.azul_principal
    },
    logo: {
        width: sizes.logo.width,
        height: sizes.logo.height,
        resizeMode: "contain",
    },
    header: {
        justifyContent: "center",
        alignItems: "center",
    },

    txtpadrao: {
        fontSize: sizes.txtgrande.fontSize,
        color: colors.branco,
        fontFamily: "Poppins-bold",
        marginLeft: 10
    },
    ml: {
        fontWeight: "bold",
    }



})