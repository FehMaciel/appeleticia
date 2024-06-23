import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const useProcedimentos = () => {
    const [procedimentos, setProcedimentos] = useState([]);
    const [selectedProcedimento, setSelectedProcedimento] = useState(null);
    const [openProcedimentoDropdown, setOpenProcedimentoDropdown] =
        useState(false);
    const navigation = useNavigation();

    const fetchProcedimentos = async () => {
        try {
            const response = await fetch(
                "https://eleticia.vercel.app/api/procedimentos"
            );
            const data = await response.json();
            if (response.ok) {
                setProcedimentos(
                    data.data.map((procedimento) => ({
                        label: procedimento.nome_procedimento,
                        value: procedimento.id_procedimento,
                        price: procedimento.valor_procedimento,
                    }))
                );
            } else {
                throw new Error("Erro ao carregar procedimentos");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Erro ao carregar procedimentos");
        }
    };

    const handleCadastrarProcedimento = () => {
        navigation.navigate("CadastrarProcedimento", {});
    };

    return {
        procedimentos,
        setProcedimentos,
        fetchProcedimentos,
        handleCadastrarProcedimento,
        selectedProcedimento,
        setSelectedProcedimento,
        openProcedimentoDropdown,
        setOpenProcedimentoDropdown,
    };
};

export default useProcedimentos;
