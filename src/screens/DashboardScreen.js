import { React, useState, useEffect } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Pressable,
    ScrollView,
    Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen = ({ route }) => {
    const { cpf_funcionario, nome_funcionario, id_funcionario, nivel } =
        route.params;
    const [appointments, setAppointments] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(
                    `https://eleticia.vercel.app/api/agendamentos/funcionario/${id_funcionario}`
                );
                const data = await response.json();
                setAppointments(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchAppointmentsAll = async () => {
            try {
                const response = await fetch(
                    `https://eleticia.vercel.app/api/agendamentos`
                );
                const data = await response.json();
                setAppointments(data.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (nivel == "admin") {
            fetchAppointmentsAll();
        } else {
            fetchAppointments();
        }
    }, [id_funcionario]);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.appointmentsContainer}>
                <Text style={styles.welcomeText}>
                    Bem-vindo, {nome_funcionario}!
                </Text>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.buttonPrimary}
                        onPress={() => {
                            navigation.navigate("AgendarHorario", {
                                id_funcionario,
                                nivel,
                            });
                        }}
                    >
                        <Text style={styles.textButtonPrimary}>
                            Agendar Horario
                        </Text>
                    </Pressable>

                    <View style={styles.buttonContainerSecondary}>
                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                navigation.navigate("Agenda", {
                                    id_funcionario,
                                    nivel,
                                });
                            }}
                        >
                            <Text style={styles.textButton}>Agenda</Text>
                        </Pressable>

                        <Pressable
                            style={styles.button}
                            onPress={() => {
                                if (nivel == "admin") {
                                    navigation.navigate("Funcionarios");
                                } else {
                                    Alert.alert(
                                        "Funcionários",
                                        "Apenas administradores podem acessar essa tela."
                                    );
                                }
                            }}
                        >
                            <Text style={styles.textButton}>Funcionários</Text>
                        </Pressable>
                    </View>

                    <Pressable
                        style={styles.buttonSecondary}
                        onPress={() => {
                            navigation.navigate("Procedimentos");
                        }}
                    >
                        <Text style={styles.textButtonSecondary}>
                            Procedimentos
                        </Text>
                    </Pressable>
                </View>
                <Text style={styles.welcomeText}>Seus agendamentos:</Text>

                {appointments
                    .filter(
                        (appointment) =>
                            appointment.pedido_concluido === 0 &&
                            appointment.funcionarios != null
                    )
                    .sort((a, b) => {
                        if (a.data_agendamento > b.data_agendamento) return -1;
                        if (a.data_agendamento < b.data_agendamento) return 1;

                        if (a.horario_agendamento > b.horario_agendamento)
                            return -1;
                        if (a.horario_agendamento < b.horario_agendamento)
                            return 1;

                        return 0;
                    })
                    .map((appointment) => (
                        <View
                            key={appointment.id_agendamento}
                            style={styles.appointment}
                        >
                            <Pressable
                                style={styles.buttonAgendamento}
                                onPress={() => {
                                    navigation.navigate(
                                        "DetalhesAgendamentos",
                                        {
                                            appointment: appointment,
                                        }
                                    );
                                }}
                            >
                                <Text style={styles.textButtonAgendamento}>
                                    Cliente: {appointment.clientes.nome_cliente}{" "}
                                    -{" "}
                                    {
                                        appointment.procedimentos
                                            .nome_procedimento
                                    }
                                </Text>

                                <Text style={styles.textButtonAgendamento}>
                                    Funcionário:{" "}
                                    {appointment.funcionarios.nome_funcionario}
                                </Text>

                                <Text style={styles.textButtonAgendamento}>
                                    Data: {appointment.data_agendamento} -{" "}
                                    {appointment.horario_agendamento}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                {appointments
                    .filter(
                        (appointment) =>
                            appointment.pedido_concluido === 1 &&
                            appointment.funcionarios != null
                    )
                    .sort((a, b) => {
                        if (a.data_agendamento > b.data_agendamento) return -1;
                        if (a.data_agendamento < b.data_agendamento) return 1;

                        if (a.horario_agendamento > b.horario_agendamento)
                            return -1;
                        if (a.horario_agendamento < b.horario_agendamento)
                            return 1;

                        return 0;
                    })
                    .map((appointment) => (
                        <View
                            key={appointment.id_agendamento}
                            style={styles.appointment}
                        >
                            <Pressable
                                style={[
                                    styles.buttonAgendamento,
                                    styles.buttonSuccess,
                                ]}
                                onPress={() => {
                                    navigation.navigate(
                                        "DetalhesAgendamentos",
                                        {
                                            appointment: appointment,
                                        }
                                    );
                                }}
                            >
                                <Text style={styles.textButtonAgendamento}>
                                    Cliente: {appointment.clientes.nome_cliente}{" "}
                                    -{" "}
                                    {
                                        appointment.procedimentos
                                            .nome_procedimento
                                    }
                                </Text>

                                <Text style={styles.textButtonAgendamento}>
                                    Funcionário:{" "}
                                    {appointment.funcionarios.nome_funcionario}
                                </Text>

                                <Text style={styles.textButtonAgendamento}>
                                    Data: {appointment.data_agendamento} -{" "}
                                    {appointment.horario_agendamento}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
                {appointments
                    .filter(
                        (appointment) =>
                            appointment.pedido_concluido === 2 &&
                            appointment.funcionarios != null
                    )
                    .sort((a, b) => {
                        if (a.data_agendamento > b.data_agendamento) return -1;
                        if (a.data_agendamento < b.data_agendamento) return 1;

                        if (a.horario_agendamento > b.horario_agendamento)
                            return -1;
                        if (a.horario_agendamento < b.horario_agendamento)
                            return 1;

                        return 0;
                    })
                    .map((appointment) => (
                        <View
                            key={appointment.id_agendamento}
                            style={styles.appointment}
                        >
                            <Pressable
                                style={[
                                    styles.buttonAgendamento,
                                    styles.buttonCanceled,
                                ]}
                                onPress={() => {
                                    navigation.navigate(
                                        "DetalhesAgendamentos",
                                        {
                                            appointment: appointment,
                                        }
                                    );
                                }}
                            >
                                <Text style={styles.textButtonAgendamento}>
                                    Cliente: {appointment.clientes.nome_cliente}{" "}
                                    -{" "}
                                    {
                                        appointment.procedimentos
                                            .nome_procedimento
                                    }
                                </Text>

                                <Text style={styles.textButtonAgendamento}>
                                    Funcionário:{" "}
                                    {appointment.funcionarios.nome_funcionario}
                                </Text>

                                <Text style={styles.textButtonAgendamento}>
                                    Data: {appointment.data_agendamento} -{" "}
                                    {appointment.horario_agendamento}
                                </Text>
                            </Pressable>
                        </View>
                    ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: "start",
        padding: 20,
        backgroundColor: "#EFEFEF",
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 10,
        width: "100%",
        justifyContent: "space-between",
    },

    buttonSuccess: {
        backgroundColor: "#00b70030",
        borderColor: "#00b700",
    },

    buttonCanceled: {
        backgroundColor: "#d6000030",
        borderColor: "#d60000",
    },

    buttonContainerSecondary: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "46%",
        justifyContent: "space-between",
    },

    button: {
        backgroundColor: "#CFB44600",
        borderColor: "#CFB446",
        borderWidth: 2,
        borderStyle: "solid",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        height: 110,
        borderRadius: 20,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    textButton: {
        color: "#CFB446",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
    },

    buttonPrimary: {
        backgroundColor: "#CFB446",
        borderColor: "#CFB446",
        borderWidth: 2,
        borderStyle: "solid",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        height: 130,
        borderRadius: 20,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    textButtonPrimary: {
        color: "#EFEFEF",
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
    },

    buttonSecondary: {
        backgroundColor: "#CFB44600",
        borderColor: "#CFB446",
        borderWidth: 2,
        borderStyle: "solid",
        width: "46%",
        paddingLeft: 20,
        paddingRight: 20,
        height: 240,
        borderRadius: 20,
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    textButtonSecondary: {
        color: "#CFB446",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "left",
    },

    buttonAgendamento: {
        backgroundColor: "#CFB44600",
        borderColor: "#00000055",
        borderWidth: 2,
        borderStyle: "solid",
        width: "100%",
        paddingLeft: 20,
        paddingRight: 20,
        height: 80,
        borderRadius: 20,
        marginBottom: 20,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
    },
    textButtonAgendamento: {
        color: "#000",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "left",
    },
});

export default DashboardScreen;
