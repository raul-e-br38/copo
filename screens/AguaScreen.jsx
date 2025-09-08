import React, { useState } from "react";
import { View, Button, StyleSheet, Image, Text, ScrollView, Modal, TextInput } from "react-native";
import WaterGlass from "../components/WaterGlass";
import colors from "../design/colors";
import sizes from "../design/sizes";
import BtnPequeno from "../components/BtnPequeno";
import BtnPersonalizado from "../components/BtnPersonalizado"; // novo import

export default function AguaScreen() {
    const [ml, setMl] = useState(2000);
    const goal = 2000;

    const [modalVisible, setModalVisible] = useState(false);
    const [inputMl, setInputMl] = useState("");

    function addAgua(quantidade) {
        setMl(prev => prev + quantidade);
    }

    function confirmarPersonalizado() {
        const valor = parseInt(inputMl);
        if (!isNaN(valor) && valor > 0) {
            addAgua(valor);
            setInputMl("");
            setModalVisible(false);
        }
    }

    return (
        <ScrollView   style={styles.fundo}
                      contentContainerStyle={{ paddingBottom: 40 }}>
            <View style={styles.header}>
                <Image style={styles.logo} source={require("../assets/logo.png")} />
            </View>

            <Text style={styles.txtpadrao}>Você bebeu hoje:</Text>
            <WaterGlass currentMl={ml} goalMl={goal} />

            <View style={{ height: 20 }} />
            <Button title="+250 ml" onPress={() => setMl(ml + 250)} />
            <View style={{ height: 10 }} />
            <Button title="-250 ml" onPress={() => setMl(prev => Math.max(0, prev - 250))} />

            {/* Botões pequenos */}
            <View style={styles.botoesRow}>
                <BtnPequeno quantidade={200} onPress={addAgua} />
                <BtnPequeno quantidade={300} onPress={addAgua} />
            </View>

            {/* Botão personalizado */}
            <BtnPersonalizado onPress={() => setModalVisible(true)} />

            {/* Modal do input */}
            <Modal transparent={true} visible={modalVisible} animationType="slide">
                <View style={styles.modalFundo}>
                    <View style={styles.modalBox}>
                        <Text style={{ fontSize: 18, marginBottom: 10 }}>Digite a quantidade (ml):</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={inputMl}
                            onChangeText={setInputMl}
                            placeholder="Ex: 150"
                        />
                        <View style={{ flexDirection: "row", marginTop: 10, justifyContent: "space-between" }}>
                            <Button color={colors.azul_principal} title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button color={colors.azul_principal} title="Adicionar" onPress={confirmarPersonalizado} />
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: colors.azul_principal,
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
        marginLeft: 10,
    },
    botoesRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 10,
    },
    modalFundo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalBox: {
        backgroundColor: colors.azul_secundario,
        padding: 20,
        borderRadius: 12,
        width: "80%",
    },
    input: {
        borderWidth: 1,
        borderColor: colors.branco,
        backgroundColor: colors.branco,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
});
