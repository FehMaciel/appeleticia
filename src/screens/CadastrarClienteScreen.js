import React, { useState } from "react";
import { View, TextInput, Button, Alert, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const CadastrarClienteScreen = () => {
    const [nomeCliente, setNomeCliente] = useState("");
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const navigation = useNavigation();

    const handleCadastrarCliente = async () => {
        try {
            const response = await fetch(
                "https://eleticia.vercel.app/api/clientes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome_cliente: nomeCliente,
                        telefone_cliente: telefoneCliente,
                    }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sucesso", "Cliente cadastrado com sucesso");

                setNomeCliente("");
                setTelefoneCliente("");

                // Navegar de volta para a tela anterior
                navigation.goBack();
            } else {
                Alert.alert("Erro", data.error || "Erro ao cadastrar cliente");
            }
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20 }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        marginBottom: 20,
                    }}
                >
                    Cadastrar novo cliente
                </Text>
                <TextInput
                    style={{
                        height: 40,
                        width: "100%",
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 5,
                        marginBottom: 20,
                        padding: 10,
                    }}
                    placeholder="Nome do cliente"
                    value={nomeCliente}
                    onChangeText={(text) => setNomeCliente(text)}
                />
                <TextInput
                    style={{
                        height: 40,
                        width: "100%",
                        borderRadius: 5,
                        borderColor: "gray",
                        borderWidth: 1,
                        marginBottom: 20,
                        padding: 10,
                    }}
                    placeholder="Telefone do cliente"
                    value={telefoneCliente}
                    onChangeText={(text) => setTelefoneCliente(text)}
                />
            </View>
            <Pressable
                style={{
                    backgroundColor: "#000",
                    padding: 20,
                    borderRadius: 5,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        color: "#fff",
                        fontSize: 18,
                    }}
                    onPress={handleCadastrarCliente}
                >
                    Cadastrar Cliente
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default CadastrarClienteScreen;
