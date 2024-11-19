import { MaterialIcons } from '@expo/vector-icons'
import { Image, ScrollView, Text, View } from 'react-native'
import { useAuthStore } from '../../../stores/AuthStore'
import React from 'react'

export default function Perfil() {
	const { usuario, handleLogout } = useAuthStore()

	return (
		<>
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'center',
					alignItems: 'center',
					marginHorizontal: 12,
				}}
				className="flex-1"
				keyboardShouldPersistTaps="handled"
			>
				<View className="mx-auto mt-2 rounded-2xl overflow-hidden container">
					<Image
						className="border-white w-full h-[40%] object-cover"
						source={{ uri: 'https://i.imgur.com/QjN5CSj.jpg' }}
					/>

					<Image
						source={{ uri: usuario.foto }}
						className="relative mx-auto mt-[-8rem] w-56 h-56 border-white border-8 rounded-full z-10"
					/>

					<View className="relative flex flex-col justify-center items-center bg-sky-500 mt-[-5rem] h-[55%] text-2xl text-white rounded-ee-lg rounded-se-lg">
						<Text className="text-lg font-semibold">
							Nome: {usuario.nome}{' '}
						</Text>
						<Text className="text-lg font-semibold">
							Email: {usuario.usuario}
						</Text>
					</View>
				</View>
			</ScrollView>
		</>
	)
}
