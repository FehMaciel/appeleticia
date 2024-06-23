import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CadastrarProcedimentoScreen = ({ route, navigation }) => {
    const { procedimento } = route.params;
    const [nomeProcedimento, setNomeProcedimento] = useState("");
    const [valorProcedimento, setValorProcedimento] = useState("");
    const [duracaoProcedimento, setDuracaoProcedimento] = useState("");

    useEffect(() => {
        if (procedimento) {
            setNomeProcedimento(procedimento.nome_procedimento);
            setValorProcedimento(procedimento.valor_procedimento.toString());
            setDuracaoProcedimento(
                procedimento.duracao_procedimento.toString()
            );
        }
    }, [procedimento]);

    const handleCadastrarProcedimento = async () => {
        try {
            const url = procedimento
                ? `https://eleticia.vercel.app/api/procedimentos/${procedimento.id_procedimento}`
                : "https://eleticia.vercel.app/api/procedimentos";

            const method = procedimento ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome_procedimento: nomeProcedimento,
                    valor_procedimento: parseFloat(valorProcedimento),
                    duracao_procedimento: parseInt(duracaoProcedimento),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const message = procedimento
                    ? "Procedimento atualizado com sucesso"
                    : "Procedimento cadastrado com sucesso";

                Alert.alert("Sucesso", message);
                navigation.goBack();
            } else {
                Alert.alert(
                    "Erro",
                    data.error || "Erro ao cadastrar procedimento"
                );
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
                        marginBottom: 20,
                        fontWeight: "bold",
                    }}
                >
                    {procedimento
                        ? "Atualizar procedimento"
                        : "Cadastrar novo procedimento"}
                </Text>
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
                    placeholder="Nome do procedimento"
                    value={nomeProcedimento}
                    onChangeText={(text) => setNomeProcedimento(text)}
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
                    placeholder="Valor do procedimento"
                    value={valorProcedimento}
                    onChangeText={(text) => setValorProcedimento(text)}
                    keyboardType="numeric"
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
                    placeholder="Duração do procedimento (minutos)"
                    value={duracaoProcedimento}
                    onChangeText={(text) => setDuracaoProcedimento(text)}
                    keyboardType="numeric"
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
                    onPress={handleCadastrarProcedimento}
                >
                    {procedimento
                        ? "Atualizar Procedimento"
                        : "Cadastrar Procedimento"}
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

export default CadastrarProcedimentoScreen;
