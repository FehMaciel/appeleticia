// screens/LoginScreen.js
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try {
            const response = await fetch(
                "https://eleticia.vercel.app/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cpf_funcionario: cpf,
                        senha_funcionario: senha,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);
            if (data.error) {
                Alert.alert("Revise os Dados", "Usuário ou Senha Incorretos");
            } else {
                // Salvar dados de login no AsyncStorage
                await AsyncStorage.setItem(
                    "userData",
                    JSON.stringify({
                        cpf_funcionario: cpf,
                        nome_funcionario: data.data.nome_funcionario,
                        id_funcionario: data.data.id_funcionario,
                        nivel: data.data.nivel,
                    })
                );

                // Navegar para a tela Dashboard
                navigation.navigate("Dashboard", {
                    cpf_funcionario: cpf,
                    nome_funcionario: data.data.nome_funcionario,
                    id_funcionario: data.data.id_funcionario,
                    nivel: data.data.nivel,
                });
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="CPF"
                value={cpf}
                onChangeText={(text) => setCpf(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={(text) => setSenha(text)}
                secureTextEntry={true}
            />
            <Pressable style={styles.buttonHero} onPress={handleLogin}>
                <Text style={styles.textButton}>Logar</Text>
            </Pressable>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#EFEFEF",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        height: 60,
        width: "100%",
        borderRadius: 5,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    error: {
        color: "red",
        fontSize: 16,
        marginBottom: 20,
    },
    buttonHero: {
        backgroundColor: "#CFB446",
        borderRadius: 10,
        minWidth: 250,
        width: "100%",
        minHeight: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    textButton: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default LoginScreen;
