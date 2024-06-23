import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const FuncionariosScreen = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await fetch(
                    "https://eleticia.vercel.app/api/funcionarios"
                );
                const data = await response.json();
                if (response.ok) {
                    setFuncionarios(data.data);
                } else {
                    throw new Error(data.error);
                }
            } catch (error) {
                console.error("Erro ao buscar funcionários:", error);
                // Tratar erro de busca (ex: exibir mensagem para o usuário)
            }
        };

        fetchFuncionarios();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Lista de Funcionários</Text>
                    <Pressable
                        style={styles.button}
                        onPress={() =>
                            navigation.navigate("CadastrarFuncionario", {
                                procedimento: null,
                            })
                        }
                    >
                        <Text style={styles.buttonText}>+</Text>
                    </Pressable>
                </View>
                {funcionarios.map((funcionario) => (
                    <Pressable
                        key={funcionario.id_funcionario}
                        style={styles.item}
                        onPress={() => {
                            navigation.navigate("CadastrarFuncionario", {
                                funcionario: funcionario,
                            });
                        }}
                    >
                        <Text style={styles.itemText}>
                            Nome: {funcionario.nome_funcionario}
                        </Text>
                        <Text style={styles.itemText}>
                            CPF: {funcionario.cpf_funcionario}
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
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#000",
        width: 50,
        borderRadius: 10,
        padding: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 24,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
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
});

export default FuncionariosScreen;
