import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const HomeScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const checkLoginStatus = async () => {
        try {
            const userData = await AsyncStorage.getItem("userData");
            if (userData) {
                const {
                    cpf_funcionario,
                    nome_funcionario,
                    nivel,
                    id_funcionario,
                } = JSON.parse(userData);
                navigation.navigate("Dashboard", {
                    cpf_funcionario,
                    nome_funcionario,
                    nivel,
                    id_funcionario,
                });
            }
        } catch (error) {
            console.error("Erro ao verificar o status de login:", error);
        }
    };

    const handleLogin = () => {
        checkLoginStatus();
        navigation.navigate("Login");
    };

    return (
        <View style={styles.heroSection}>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image}
                    source={{
                        uri: "https://snack-code-uploads.s3.us-west-1.amazonaws.com/~asset/d29d739f90c441288d1fecc40cde5c2a",
                    }}
                />
                <Text style={styles.titleHero}>Eleticia Campos</Text>
            </View>

            <Pressable style={styles.buttonHero} onPress={handleLogin}>
                <Text style={styles.textButton}>Logar</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    heroSection: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EFEFEF",
        padding: 20,
    },
    imageContainer: {
        height: 200,
        marginTop: 180,
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    titleHero: {
        marginTop: 20,
        fontSize: 32,
        fontWeight: "700",
        color: "#000",
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

export default HomeScreen;
