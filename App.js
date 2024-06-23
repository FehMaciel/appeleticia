import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import LoginScreen from "./src/screens/LoginScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import DetalhesAgendamentosScreen from "./src/screens/DetalhesAgendamentosScreen";
import AgendarHorarioScreen from "./src/screens/AgendarHorarioScreen";
import CadastrarClienteScreen from "./src/screens/CadastrarClienteScreen";
import CadastrarProcedimentoScreen from "./src/screens/CadastrarProcedimentoScreen";
import AgendaScreen from "./src/screens/AgendaScreen";
import ProcedimentosScreen from "./src/screens/ProcedimentosScreen";
import FuncionariosScreen from "./src/screens/FuncionariosScreen";
import CadastrarFuncionarioScreen from "./src/screens/CadastrarFuncionarioScreen";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen
                    name="DetalhesAgendamentos"
                    component={DetalhesAgendamentosScreen}
                />
                <Stack.Screen
                    name="AgendarHorario"
                    component={AgendarHorarioScreen}
                />
                <Stack.Screen
                    name="CadastrarCliente"
                    component={CadastrarClienteScreen}
                />
                <Stack.Screen
                    name="CadastrarProcedimento"
                    component={CadastrarProcedimentoScreen}
                />
                <Stack.Screen name="Agenda" component={AgendaScreen} />
                <Stack.Screen
                    name="Procedimentos"
                    component={ProcedimentosScreen}
                />
                <Stack.Screen
                    name="Funcionarios"
                    component={FuncionariosScreen}
                />
                <Stack.Screen
                    name="CadastrarFuncionario"
                    component={CadastrarFuncionarioScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
