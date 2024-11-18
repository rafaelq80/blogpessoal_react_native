import { Stack } from 'expo-router'
import 'react-native-reanimated';

import './../global.css'

export default function RootLayoutNav() {
	return (
		<Stack>
			<Stack.Screen
				name="index"
				options={{ title: 'Login', headerShown: false }}
			/>
			<Stack.Screen
				name="cadastro"
				options={{ title: 'Cadastrar Usuário', headerShown: false }}
			/>
			<Stack.Screen name="(protected)" options={{ headerShown: false }} />
		</Stack>
	)
}
