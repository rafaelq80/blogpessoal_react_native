import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { Stack } from 'expo-router'

export default function TemaLayoutStack() {
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
				<Stack.Screen name="formtema" options={{ title: 'Formulário - Tema' }} />
				<Stack.Screen name="deletartema" options={{ title: 'Deletar Tema' }} />
			</Stack>
		</SafeAreaView>
	)
}
