// AgendarHorarioScreen.js
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Alert,
    Switch,
    Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import useClientes from "../hooks/useClientes";
import useProcedimentos from "../hooks/useProcedimentos";
import DateTimePickerComponent from "../components/DateTimePicker";
import DropDownPicker from "react-native-dropdown-picker";
import useFuncionarios from "../hooks/useFuncionarios";

const AgendarHorarioScreen = ({ route }) => {
    const { id_funcionario, nivel } = route.params;
    const [date, setDate] = useState(new Date());
    const [valorAgendamento, setValorAgendamento] = useState("");
    const {
        clientes,
        setClientes,
        fetchClientes,
        handleCadastrarCliente,
        selectedCliente,
        setSelectedCliente,
        openClienteDropdown,
        setOpenClienteDropdown,
    } = useClientes();

    const {
        funcionarios,
        setFuncionarios,
        fetchFuncionarios,
        handleCadastrarFuncionario,
        selectedFuncionario,
        setSelectedFuncionario,
        openFuncionarioDropdown,
        setOpenFuncionarioDropdown,
    } = useFuncionarios();

    const {
        procedimentos,
        setProcedimentos,
        fetchProcedimentos,
        handleCadastrarProcedimento,
        selectedProcedimento,
        setSelectedProcedimento,
        openProcedimentoDropdown,
        setOpenProcedimentoDropdown,
    } = useProcedimentos();
    const [pedidoPago, setPedidoPago] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const [pickerMode, setPickerMode] = useState("date");

    const navigation = useNavigation();

    useEffect(() => {
        if (selectedProcedimento) {
            const procedimentoSelecionado = procedimentos.find(
                (item) => item.value === selectedProcedimento
            );
            if (procedimentoSelecionado) {
                setValorAgendamento(procedimentoSelecionado.price);
            }
        } else {
            setValorAgendamento(0);
        }
    }, [selectedProcedimento, procedimentos]);

    useEffect(() => {
        fetchClientes();
        fetchProcedimentos();
        if (nivel === "admin") {
            fetchFuncionarios();
        }
    }, []);

    const handleAgendar = async () => {
        if (!selectedCliente || !selectedProcedimento) {
            Alert.alert(
                "Erro",
                "Por favor, selecione um cliente e um procedimento."
            );
            return;
        }

        const dadosAgendamento = {
            data_agendamento: date.toISOString().split("T")[0],
            horario_agendamento: date.toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }),
            valor_agendamento: parseFloat(valorAgendamento),
            id_funcionario: selectedFuncionario || id_funcionario,
            id_cliente: selectedCliente,
            id_procedimento: selectedProcedimento,
            pedido_pago: pedidoPago,
            pedido_concluido: 0,
        };

        try {
            const response = await fetch(
                "https://eleticia.vercel.app/api/agendamentos",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ...dadosAgendamento,
                    }),
                }
            );

            const data = await response.json();
            if (response.ok) {
                Alert.alert("Sucesso", "Agendamento realizado com sucesso");
                navigation.goBack();
            } else {
                Alert.alert(
                    "Erro",
                    data.error || "Erro ao realizar agendamento"
                );
            }
        } catch (error) {
            Alert.alert("Erro", error.message);
        }
    };

    const showDatepicker = () => {
        setShowPicker(true);
        setPickerMode("date");
    };

    const showTimepicker = () => {
        setShowPicker(true);
        setPickerMode("time");
    };

    const onPickerChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowPicker(false);
        setDate(currentDate);
    };

    const formatDate = (date) => {
        return `${String(date.getDate()).padStart(2, "0")}/${String(
            date.getMonth() + 1
        ).padStart(2, "0")}/${date.getFullYear()}`;
    };

    const formatTime = (time) => {
        return `${String(time.getHours()).padStart(2, "0")}:${String(
            time.getMinutes()
        ).padStart(2, "0")}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Agendar Horário</Text>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.label}>Data:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Data"
                    value={formatDate(date)}
                    onFocus={showDatepicker}
                />
            </View>
            <View style={styles.dateTimeContainer}>
                <Text style={styles.label}>Horário:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Horário"
                    value={formatTime(date)}
                    onFocus={showTimepicker}
                />
            </View>
            <DateTimePickerComponent
                showPicker={showPicker}
                pickerMode={pickerMode}
                date={date}
                onPickerChange={onPickerChange}
                showDatepicker={showDatepicker}
                showTimepicker={showTimepicker}
                formatDate={formatDate}
                formatTime={formatTime}
            />
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={openClienteDropdown}
                    value={selectedCliente}
                    items={clientes}
                    setOpen={setOpenClienteDropdown}
                    setValue={setSelectedCliente}
                    setItems={setClientes}
                    searchable={true}
                    placeholder="Selecione um Cliente"
                    listMode="MODAL"
                    containerStyle={styles.dropdown}
                    onOpen={() => setOpenProcedimentoDropdown(false)}
                />
                <Pressable
                    style={styles.addButton}
                    onPress={handleCadastrarCliente}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </Pressable>
            </View>
            <View style={styles.dropdownContainer}>
                <DropDownPicker
                    open={openProcedimentoDropdown}
                    value={selectedProcedimento}
                    items={procedimentos}
                    setOpen={setOpenProcedimentoDropdown}
                    setValue={setSelectedProcedimento}
                    setItems={setProcedimentos}
                    searchable={true}
                    placeholder="Selecione um Procedimento"
                    containerStyle={styles.dropdown}
                    listMode="MODAL"
                    onOpen={() => setOpenClienteDropdown(false)}
                />
                <Pressable
                    style={styles.addButton}
                    onPress={handleCadastrarProcedimento}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </Pressable>
            </View>
            {nivel === "admin" && (
                <View style={styles.dropdownContainer}>
                    <DropDownPicker
                        open={openFuncionarioDropdown}
                        value={selectedFuncionario}
                        items={funcionarios}
                        setOpen={setOpenFuncionarioDropdown}
                        setValue={setSelectedFuncionario}
                        setItems={setFuncionarios}
                        searchable={true}
                        placeholder="Selecione um Funcionário"
                        containerStyle={styles.dropdown}
                        listMode="MODAL"
                        onOpen={() => {
                            setOpenClienteDropdown(false);
                            setOpenProcedimentoDropdown(false);
                        }}
                    />
                </View>
            )}
            <Text style={styles.label}>
                Valor do Agendamento: R${valorAgendamento}
            </Text>

            <View style={styles.switchContainer}>
                <Text>Pago:</Text>
                <Switch value={pedidoPago} onValueChange={setPedidoPago} />
            </View>
            <Button title="Agendar" onPress={handleAgendar} />
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
    input: {
        height: 40,
        borderColor: "#DDD",
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: "#FFF",
        borderRadius: 5,
    },
    dateTimeContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    dropdownContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    dropdown: {
        flex: 1,
    },
    addButton: {
        width: 40,
        height: 40,
        backgroundColor: "#000",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
    },
    addButtonText: {
        fontSize: 24,
        color: "#FFF",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
});

export default AgendarHorarioScreen;
