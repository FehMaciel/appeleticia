// screens/DashboardScreen.js
import React from "react";
import { View, Text, Button, StyleSheet, Alert, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

const DetalhesAgendamentosScreen = ({ route }) => {
    const { appointment } = route.params;
    const navigation = useNavigation();

    console.log(appointment);

    const handleAction = async (action) => {
        let payload = {
            data_agendamento: appointment.data_agendamento,
            horario_agendamento: appointment.horario_agendamento,
            valor_agendamento: appointment.valor_agendamento,
            id_funcionario: appointment.funcionarios.id_funcionario,
            id_cliente: appointment.clientes.id_cliente,
            id_procedimento: appointment.procedimentos.id_procedimento,
            pedido_pago: appointment.pedido_pago,
            pedido_concluido: appointment.pedido_concluido,
        };

        switch (action) {
            case "cancelar":
                payload.pedido_concluido = 2;
                break;
            case "reagendar":
                // Implementar lógica de reagendamento aqui, se necessário
                break;
            case "pago":
                payload.pedido_pago = true;
                break;
            case "concluido":
                payload.pedido_concluido = 1;
                break;
            default:
                break;
        }

        try {
            const response = await fetch(
                `https://eleticia.vercel.app/api/agendamentos/${appointment.id_agendamento}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            console.log(response);

            if (response.ok) {
                Alert.alert("Sucesso", `Agendamento ${action} com sucesso`);
                navigation.goBack();
            } else {
                Alert.alert("Erro", `Falha ao ${action} o agendamento`);
            }
        } catch (error) {
            Alert.alert(
                "Erro",
                `Falha ao ${action} o agendamento: ${error.message}`
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>Detalhes do Agendamento</Text>
            <View style={styles.detailsContainer}>
                <Text style={styles.textDetails}>
                    Nome do Funcionário:{" "}
                    {appointment.funcionarios.nome_funcionario}
                </Text>
                <Text style={styles.textDetails}>
                    Nome do cliente: {appointment.clientes.nome_cliente}
                </Text>
                <Text style={styles.textDetails}>
                    Serviço: {appointment.procedimentos.nome_procedimento}
                </Text>

                <Text style={styles.textDetails}>
                    Status do agendamento:{" "}
                    {appointment.pedido_concluido === 1
                        ? "Concluído"
                        : appointment.pedido_concluido === 2
                        ? "Cancelado"
                        : "Em andamento"}
                </Text>
                <Text style={styles.textDetails}>
                    Data: {appointment.data_agendamento}
                </Text>
                <Text style={styles.textDetails}>
                    Hora: {appointment.horario_agendamento}
                </Text>
                <Text style={styles.textDetails}>
                    Valor: {appointment.valor_agendamento}
                </Text>
                <Text style={styles.textDetails}>
                    Pago: {appointment.pedido_pago ? "Sim" : "Não"}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    style={styles.button}
                    onPress={() => handleAction("cancelar")}
                >
                    <Text style={styles.textButton}>Cancelar</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => handleAction("reagendar")}
                >
                    <Text style={styles.textButton}>Reagendar</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => handleAction("pago")}
                >
                    <Text style={styles.textButton}>Pago</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => handleAction("concluido")}
                >
                    <Text style={styles.textButton}>Concluído</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: 20,
    },
    textDetails: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: 20,
        marginTop: 20,
    },
    button: {
        backgroundColor: "#000",
        width: "100%",
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        alignItems: "center",
    },
    textButton: {
        color: "#fff",
        fontSize: 16,
    },
});

export default DetalhesAgendamentosScreen;
