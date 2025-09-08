import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { colors } from "../design/colors";
import { sizes } from "../design/sizes";

export default function BtnPequeno({ quantidade = 200, onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress(quantidade)}>
            <View style={styles.content}>
                <Image
                    source={require("../assets/copo.png")}
                    style={styles.icon}
                />
                <Text style={styles.text}>+{quantidade}ml</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.btnAzul,
        paddingVertical: sizes.paddingBtn * 1.5,
        paddingHorizontal: sizes.paddingBtn * 1.8,
        borderRadius: sizes.radiusBtn * 1.2,
        alignItems: "center",
        justifyContent: "center",
        margin: sizes.marginBtn,
        elevation: 4,
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    icon: {
        width: sizes.iconBtn * 1.5, // icon maior
        height: sizes.iconBtn * 1.5,
        marginBottom: sizes.paddingBtn / 2,
        resizeMode: "contain",
    },
    text: {
        fontSize: sizes.textoBtn * 1.3, // texto maior
        fontWeight: "bold",
        color: colors.text,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
});
