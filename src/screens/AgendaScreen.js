import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    FlatList,
    Pressable,
    Modal,
    TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";

const AgendaScreen = ({ route }) => {
    const { id_funcionario, nivel } = route.params;

    const [agendamentos, setAgendamentos] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [latestAgendamentos, setLatestAgendamentos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDateAgendamentos, setSelectedDateAgendamentos] = useState(
        []
    );

    const navigation = useNavigation();

    useEffect(() => {
        const fetchAgendamentosAll = async () => {
            try {
                const response = await fetch(
                    "https://eleticia.vercel.app/api/agendamentos"
                );
                const data = await response.json();
                const agendamentosPorDia = {};

                data.data.forEach((agendamento) => {
                    const date = agendamento.data_agendamento;
                    if (!agendamentosPorDia[date]) {
                        agendamentosPorDia[date] = [];
                    }
                    if (agendamento.funcionario !== null) {
                        // Verifica se o funcionário não é null
                        agendamentosPorDia[date].push(agendamento);
                    }
                });

                setAgendamentos(agendamentosPorDia);

                // Marcar datas no calendário
                const marked = {};
                Object.keys(agendamentosPorDia).forEach((date) => {
                    marked[date] = {
                        marked: true,
                        dotColor: "blue",
                        customStyles: {
                            container: {
                                backgroundColor: "white",
                                borderColor: "blue",
                                borderWidth: 1,
                            },
                            text: {
                                color: "blue",
                            },
                        },
                    };
                });

                setMarkedDates(marked);

                // Ordenar agendamentos por data e pegar os mais recentes
                const sortedAgendamentos = data.data
                    .filter((agendamento) => agendamento.funcionario !== null)
                    .sort(
                        (a, b) =>
                            new Date(b.data_agendamento) -
                            new Date(a.data_agendamento)
                    );

                setLatestAgendamentos(sortedAgendamentos.slice(0, 5));
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
                Alert.alert("Erro", "Não foi possível buscar os agendamentos.");
            }
        };

        const fetchAgendamentos = async (id_funcionario) => {
            try {
                const response = await fetch(
                    `https://eleticia.vercel.app/api/agendamentos/funcionario/${id_funcionario}`
                );
                const data = await response.json();
                const agendamentosPorDia = {};

                data.data.forEach((agendamento) => {
                    const date = agendamento.data_agendamento;
                    if (!agendamentosPorDia[date]) {
                        agendamentosPorDia[date] = [];
                    }
                    if (agendamento.funcionarios !== null) {
                        // Verifica se o funcionário não é null
                        agendamentosPorDia[date].push(agendamento);
                    }
                });

                setAgendamentos(agendamentosPorDia);

                // Marcar datas no calendário
                const marked = {};
                Object.keys(agendamentosPorDia).forEach((date) => {
                    marked[date] = {
                        marked: true,
                        dotColor: "blue",
                        customStyles: {
                            container: {
                                backgroundColor: "white",
                                borderColor: "blue",
                                borderWidth: 1,
                            },
                            text: {
                                color: "blue",
                            },
                        },
                    };
                });

                setMarkedDates(marked);

                // Ordenar agendamentos por data e pegar os mais recentes
                const sortedAgendamentos = data.data
                    .filter((agendamento) => agendamento.funcionario !== null)
                    .sort(
                        (a, b) =>
                            new Date(b.data_agendamento) -
                            new Date(a.data_agendamento)
                    );

                setLatestAgendamentos(sortedAgendamentos.slice(0, 5));
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
                Alert.alert("Erro", "Não foi possível buscar os agendamentos.");
            }
        };

        if (nivel === "admin") {
            fetchAgendamentosAll();
        } else {
            fetchAgendamentos(id_funcionario);
        }
    }, [id_funcionario, nivel]);

    const renderHeader = (date) => {
        return (
            <View>
                <Text>{date.toString()}</Text>
            </View>
        );
    };

    const renderItem = ({ item }) => {
        if (item.funcionarios !== null) {
            return (
                <Pressable
                    onPress={() => {
                        navigation.navigate("DetalhesAgendamentos", {
                            appointment: item,
                        });
                    }}
                >
                    <View style={styles.item}>
                        <Text>Data: {item.data_agendamento}</Text>
                        <Text>Horário: {item.horario_agendamento}</Text>
                        <Text>Nome Cliente: {item.clientes.nome_cliente}</Text>
                        <Text>
                            Nome Funcionário:{" "}
                            {item.funcionarios.nome_funcionario}
                        </Text>
                        <Text>
                            Procedimento: {item.procedimentos.nome_procedimento}
                        </Text>
                    </View>
                </Pressable>
            );
        } else {
            return null; // Retorna null se o funcionário for null
        }
    };

    const renderModalItem = ({ item }) => {
        if (item.funcionarios != null) {
            // Verifica se o funcionário não é null
            return (
                <View style={styles.item}>
                    <Text>Data: {item.data_agendamento}</Text>
                    <Text>Horário: {item.horario_agendamento}</Text>
                    <Text>Nome Cliente: {item.clientes.nome_cliente}</Text>
                    <Text>
                        Nome Funcionário: {item.funcionarios.nome_funcionario}
                    </Text>
                    <Text>
                        Procedimento: {item.procedimentos.nome_procedimento}
                    </Text>
                </View>
            );
        } else {
            return null; // Retorna null se o funcionário for null
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Agenda de Agendamentos</Text>
            <Calendar
                markedDates={markedDates}
                markingType={"custom"}
                dayComponent={({ date, state }) => {
                    const agendamentosDoDia =
                        agendamentos[date.dateString] || [];
                    const agendamentosCount = agendamentosDoDia.filter(
                        (agendamento) => agendamento.funcionario !== null
                    ).length;

                    return (
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedDate(date.dateString);
                                setSelectedDateAgendamentos(agendamentosDoDia);
                                setModalVisible(true);
                            }}
                            style={{
                                backgroundColor:
                                    state === "disabled" ? "#f0f0f0" : "white",
                                padding: 5,
                                borderRadius: 5,
                                position: "relative",
                            }}
                        >
                            <Text
                                style={{
                                    color:
                                        state === "disabled" ? "gray" : "black",
                                }}
                            >
                                {date.day}
                            </Text>
                            {agendamentosCount > 0 && (
                                <View
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        right: 0,
                                        backgroundColor: "red",
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    <Text
                                        style={{ color: "white", fontSize: 9 }}
                                    >
                                        {agendamentosCount}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    );
                }}
                renderHeader={(date) => renderHeader(date)}
            />
            <Text style={styles.subtitle}>Últimas Agendas</Text>
            <FlatList
                data={latestAgendamentos}
                keyExtractor={(item) =>
                    item.id ? item.id.toString() : Math.random().toString()
                }
                renderItem={renderItem}
            />

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            Agendamentos em {selectedDate}
                        </Text>
                        <Text>
                            {selectedDateAgendamentos.length}
                            {selectedDateAgendamentos.length} agendamentos para
                            esta data
                        </Text>
                        <FlatList
                            data={selectedDateAgendamentos}
                            keyExtractor={(item) =>
                                item.id
                                    ? item.id.toString()
                                    : Math.random().toString()
                            }
                            style={styles.modalList}
                            renderItem={renderModalItem}
                        />
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10,
        textAlign: "center",
    },
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        width: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        alignItems: "center",
    },
    modalList: {
        width: "100%",
        maxHeight: 300,
        marginTop: 20,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "blue",
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default AgendaScreen;
