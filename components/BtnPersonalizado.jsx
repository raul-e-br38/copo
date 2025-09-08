import React from "react";
import { TouchableOpacity, Text, StyleSheet, View, Image } from "react-native";
import { colors } from "../design/colors";   // <- confere se é com { }
import { sizes } from "../design/sizes";     // <- idem

export default function BtnPersonalizado({ onPress }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <View style={styles.content}>
                <Image source={require("../assets/copo.png")} style={styles.icon} />
                <Text style={styles.text}> + Personalizado</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.btnAzul,
        paddingVertical: sizes.paddingBtn * 0.9,
        paddingHorizontal: sizes.paddingBtn * 0.9,
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
        width: sizes.iconBtn * 1.3,
        height: sizes.iconBtn * 1.3,
        marginBottom: sizes.paddingBtn / 2,
        resizeMode: "contain",
    },
    text: {
        fontSize: sizes.textoBtn * 1.2 ,
        fontWeight: "bold",
        color: colors.text,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
});
