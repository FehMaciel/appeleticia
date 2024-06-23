import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Alert,
    Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const CadastrarFuncionarioScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { funcionario } = route.params ? route.params : {};

    const [nomeFuncionario, setNomeFuncionario] = useState("");
    const [cpfFuncionario, setCpfFuncionario] = useState("");
    const [senhaFuncionario, setSenhaFuncionario] = useState("");

    const isEdicao = funcionario ? true : false;

    useEffect(() => {
        if (funcionario) {
            setNomeFuncionario(funcionario.nome_funcionario);
            setCpfFuncionario(funcionario.cpf_funcionario);
            setSenhaFuncionario(funcionario.senha_funcionario);
        }
    }, [funcionario]);

    const handleSalvarFuncionario = async () => {
        try {
            const url = funcionario
                ? `https://eleticia.vercel.app/api/funcionarios/${funcionario.id_funcionario}`
                : "https://eleticia.vercel.app/api/funcionarios";

            const method = funcionario ? "PUT" : "POST";

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nome_funcionario: nomeFuncionario,
                    cpf_funcionario: cpfFuncionario,
                    senha_funcionario: senhaFuncionario,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const message = isEdicao
                    ? "Funcionário atualizado com sucesso"
                    : "Funcionário cadastrado com sucesso";
                Alert.alert("Sucesso", message);
                navigation.goBack();
            } else {
                Alert.alert(
                    "Erro",
                    data.error ||
                        `Erro ao ${
                            isEdicao ? "atualizar" : "cadastrar"
                        } funcionário`
                );
            }
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>
                    {isEdicao ? "Editar Funcionário" : "Cadastrar Funcionário"}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do funcionário"
                    value={nomeFuncionario}
                    onChangeText={setNomeFuncionario}
                />
                <TextInput
                    style={[
                        styles.input,
                        { backgroundColor: isEdicao ? "#f0f0f0" : "#ffffff" },
                    ]}
                    placeholder="CPF do funcionário"
                    value={cpfFuncionario}
                    onChangeText={setCpfFuncionario}
                    keyboardType="numeric"
                    editable={!isEdicao}
                />
                {!isEdicao && (
                    <TextInput
                        style={styles.input}
                        placeholder="Senha do funcionário"
                        value={senhaFuncionario}
                        onChangeText={setSenhaFuncionario}
                        secureTextEntry={true}
                    />
                )}
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
                    onPress={handleSalvarFuncionario}
                >
                    {isEdicao ? "Salvar Alterações" : "Cadastrar Funcionário"}
                </Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    form: {
        flex: 1,
    },
    input: {
        height: 40,
        width: "100%",
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default CadastrarFuncionarioScreen;
