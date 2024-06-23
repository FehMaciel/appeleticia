import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const ProcedimentosScreen = () => {
    const [procedimentos, setProcedimentos] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchProcedimentos = async () => {
            try {
                const response = await fetch(
                    "https://eleticia.vercel.app/api/procedimentos"
                );
                const data = await response.json();
                if (response.ok) {
                    setProcedimentos(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (error) {
                console.error("Erro ao buscar procedimentos:", error);
            }
        };

        fetchProcedimentos();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Lista de Procedimentos</Text>
                    <Pressable
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("CadastrarProcedimento", {
                                procedimento: null,
                            })
                        }
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </Pressable>
                </View>
                {procedimentos.map((procedimento) => (
                    <Pressable
                        key={procedimento.id_procedimento}
                        style={styles.item}
                        onPress={() => {
                            navigation.navigate("CadastrarProcedimento", {
                                procedimento: procedimento,
                            });
                        }}
                    >
                        <Text style={styles.itemText}>
                            {procedimento.nome_procedimento}
                        </Text>
                        <Text style={styles.itemText}>
                            Valor: R$ {procedimento.valor_procedimento}
                        </Text>
                    </Pressable>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    item: {
        backgroundColor: "#f9f9f9",
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    itemText: {
        fontSize: 16,
        marginBottom: 5,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#000",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        width: 50,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default ProcedimentosScreen;
