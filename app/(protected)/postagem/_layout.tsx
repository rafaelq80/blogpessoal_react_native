import { Slot, Stack } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';

export default function PostagemLayoutStack() {
	return (
        <SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
			<Stack
				screenOptions={{
					headerShown: false,
					animation: 'slide_from_right',
				}}
			>
				<Stack.Screen name="index" options={{ title: 'Listar Temas' }} />
				<Stack.Screen name="formpostagem" options={{ title: 'Formulário - Postagem' }} />
				<Stack.Screen name="deletarpostagem" options={{ title: 'Deletar Postagem' }} />
			</Stack>
		</SafeAreaView>
    );
}
