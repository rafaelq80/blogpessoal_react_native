import { Stack } from 'expo-router'
import React from 'react'
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
	StatusBar,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { Toaster } from 'sonner-native'
import './../global.css'

export default function RootLayoutNav() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView style={{ flex: 1 }}>
				<KeyboardAvoidingView
					style={{ flex: 1 }}
					behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				>
					<StatusBar />
					<Stack>
						<Stack.Screen
							name="index"
							options={{ title: 'Login', headerShown: false }}
						/>
						<Stack.Screen
							name="cadastro"
							options={{
								title: 'Cadastrar Usuário',
								headerShown: false,
							}}
						/>
						<Stack.Screen
							name="(protected)"
							options={{ headerShown: false }}
						/>
					</Stack>
					<Toaster
						richColors
						position="top-center"
						duration={3000}
						visibleToasts={1}
					/>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</GestureHandlerRootView>
	)
}
