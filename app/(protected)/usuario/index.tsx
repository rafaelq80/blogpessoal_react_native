import { MaterialIcons } from '@expo/vector-icons'
import { Image, ScrollView, Text, View } from 'react-native'
import { useAuthStore } from '../../../stores/AuthStore'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Perfil() {
	const { usuario, handleLogout } = useAuthStore()

	return (
		<SafeAreaView className='flex justify-center items-center'>
			<View className="h-[95%] w-[95%] rounded-2xl overflow-hidden container">
				<Image
					className="border-white w-full h-[45%] object-cover"
					source={{ uri: 'https://i.imgur.com/QjN5CSj.jpg' }}
				/>

				<Image
					source={{ uri: usuario.foto }}
					className="relative mx-auto mt-[-8rem] w-56 h-56 border-white border-8 rounded-full z-10"
				/>

				<View className="relative flex flex-col justify-center items-center bg-sky-500 mt-[-5rem] h-[46%] text-2xl text-white rounded-ee-lg rounded-se-lg">
					<Text className="text-xl font-semibold">
						Nome: {usuario.nome}{' '}
					</Text>
					<Text className="text-xl font-semibold">
						Email: {usuario.usuario}
					</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}
