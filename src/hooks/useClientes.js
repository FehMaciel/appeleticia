import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const useClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState(null);
    const [openClienteDropdown, setOpenClienteDropdown] = useState(false);
    const navigation = useNavigation();

    const fetchClientes = async () => {
        try {
            const response = await fetch(
                "https://eleticia.vercel.app/api/clientes"
            );
            const data = await response.json();
            if (response.ok) {
                setClientes(
                    data.data.map((cliente) => ({
                        label: cliente.nome_cliente,
                        value: cliente.id_cliente,
                    }))
                );
            } else {
                console.error("Erro ao carregar clientes:", data.error);
            }
        } catch (error) {
            console.error("Erro na requisição:", error.message);
        }
    };

    const handleCadastrarCliente = () => {
        navigation.navigate("CadastrarCliente");
    };

    return {
        clientes,
        setClientes,
        fetchClientes,
        handleCadastrarCliente,
        selectedCliente,
        setSelectedCliente,
        openClienteDropdown,
        setOpenClienteDropdown,
    };
};

export default useClientes;
