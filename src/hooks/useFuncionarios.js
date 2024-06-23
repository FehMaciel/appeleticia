// useFuncionarios.js
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const useFuncionarios = () => {
    const [funcionarios, setFuncionarios] = useState([]);
    const [selectedFuncionario, setSelectedFuncionario] = useState(null);
    const [openFuncionarioDropdown, setOpenFuncionarioDropdown] =
        useState(false);
    const navigation = useNavigation();

    const fetchFuncionarios = async () => {
        try {
            const response = await fetch(
                "https://eleticia.vercel.app/api/funcionarios"
            );
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setFuncionarios(
                    data.data.map((funcionario) => ({
                        label: funcionario.nome_funcionario,
                        value: funcionario.id_funcionario,
                        cpf: funcionario.cpf_funcionario,
                    }))
                );
            } else {
                console.error("Erro ao carregar funcionarios:", data.error);
            }
        } catch (error) {
            console.error("Erro na requisição:", error.message);
        }
    };

    return {
        funcionarios,
        setFuncionarios,
        fetchFuncionarios,
        selectedFuncionario,
        setSelectedFuncionario,
        openFuncionarioDropdown,
        setOpenFuncionarioDropdown,
    };
};

export default useFuncionarios;
