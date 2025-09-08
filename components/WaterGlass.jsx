// WaterGlass.js
import React, { useMemo, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import Svg, { Polygon, Rect } from "react-native-svg";

export default function WaterGlass({
                                       currentMl = 2000,
                                       goalMl = 3000,
                                       width = 220,
                                       height = 320,
                                       accentColor = "#3C22FF",     // roxo do fundo
                                       glassColor = "#FFFFFF",       // cor do copo (traço / preenchimento)
                                       waterColor = "#3C22FF",       // cor da água
                                       showHeader = true,            // mostra "2000ml"
                                       showFooter = true             // mostra "de 3000ml"
                                   }) {
    const clamped = Math.max(0, Math.min(currentMl / goalMl, 1));
    const anim = useRef(new Animated.Value(clamped)).current;

    useEffect(() => {
        Animated.timing(anim, {
            toValue: clamped,
            duration: 700,
            useNativeDriver: false,
        }).start();
    }, [clamped]);

    // medidas do trapézio do copo
    const padding = 12;
    const topW = width * 0.78;
    const bottomW = width * 0.56;
    const topX = (width - topW) / 2;
    const bottomX = (width - bottomW) / 2;

    // pontos do copo (borda externa)
    const glassPoints = `${topX},${padding} ${topX + topW},${padding} ${bottomX + bottomW},${height - padding} ${bottomX},${height - padding}`;

    // pontos da água – calculados no nível "y" animado
    const waterPoints = useMemo(() => {
        const y = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [height - padding, padding], // 0% embaixo, 100% em cima
            extrapolate: "clamp",
        });

        // Para gerar o polígono da água com Animated precisamos montar 4 pontos dinamicamente:
        // largura no nível y = topW + (bottomW - topW) * (y/height)
        const getPoly = (yy) => {
            const levelWidth = topW + (bottomW - topW) * ((yy - padding) / (height - 2 * padding));
            const levelX = (width - levelWidth) / 2;

            // polígono (de baixo p/ cima, sentido horário)
            return `${bottomX},${height - padding} ${bottomX + bottomW},${height - padding} ${levelX + levelWidth},${yy} ${levelX},${yy}`;
        };

        // Como Polygon não aceita diretamente Animated string, usamos “as any”.
        return {
            toString: () => "", // apenas para evitar warnings
            getAnimatedString: () =>
                Animated.add(y, new Animated.Value(0)).interpolate({
                    inputRange: [padding, height - padding],
                    outputRange: [getPoly(padding), getPoly(height - padding)],
                }),
            y, // expor y para o Rect de máscara (fallback)
        };
    }, [anim, width, height]);

    // fallback para Android antigo: colocamos um retângulo-clip simples
    const AnimatedPolygon = Animated.createAnimatedComponent(Polygon);

    return (
        <View style={[styles.wrapper, { backgroundColor: accentColor }]}>
            {showHeader && (
                <Text style={styles.header}>
                    {currentMl.toFixed(0)}<Text style={styles.small}>ml</Text>
                </Text>
            )}

            <View style={{ width, height, alignSelf: "center" }}>
                <Svg width={width} height={height}>
                    {/* Copo (fundo branco) */}
                    <Polygon points={glassPoints} fill={glassColor} />

                    {/* Água (preenchimento animado) */}
                    <AnimatedPolygon
                        points={waterPoints.getAnimatedString ? waterPoints.getAnimatedString() : glassPoints}
                        fill={waterColor}
                        opacity={0.95}
                    />

                    {/* Borda do copo (fio branco mais grosso) */}
                    <Polygon
                        points={glassPoints}
                        fill="none"
                        stroke={glassColor}
                        strokeWidth={8}
                    />
                </Svg>
            </View>

            {showFooter && (
                <Text style={styles.footer}>
                    de <Text style={styles.footerBold}>{goalMl.toFixed(0)}ml</Text>
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        width: "100%",
        paddingVertical: 26,
        paddingHorizontal: 22,
        borderRadius: 18,
    },
    header: {
        color: "#FFFFFF",
        fontWeight: "900",
        fontSize: 56,
        lineHeight: 60,
        textAlign: "center",
    },
    small: { fontSize: 24, fontWeight: "700" },
    footer: {
        color: "#FFFFFF",
        fontSize: 20,
        alignSelf: "flex-end",
        marginTop: 6,
    },
    footerBold: { fontWeight: "900" },
});
