import { AntDesign } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import {
	ActivityIndicator,
	Pressable,
	ScrollView,
	Text,
	View,
} from 'react-native'
import CardTemas from '../../../components/cardtema'
import Tema from '../../../models/Tema'
import { listar } from '../../../services/AxiosService'
import { useAuthStore } from '../../../stores/AuthStore'
import { ToastAlerta } from '../../../utils/ToastAlerta'

export default function ListarTemas() {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { usuario, handleLogout } = useAuthStore()
	const token = usuario.token

	const [temas, setTemas] = useState<Tema[]>([])

	async function buscarTemas() {
		setIsLoading(true)

		try {
			await listar('/temas', setTemas, {
				headers: {
					Authorization: token,
				},
			})
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta('Erro ao listar os temas!', 'erro')
			}
		} finally {
			setIsLoading(false)
		}
	}

	useFocusEffect(
		useCallback(() => {
			if (token === '') {
				ToastAlerta('Você precisa estar logado!', 'info')
				router.replace('/')
			}
			buscarTemas()
		}, [token])
	)

	return (
		<View className="w-full flex-1 flex-col pt-3">
			{isLoading ? (
				<View className="flex-1 justify-center items-center">
					<ActivityIndicator size="large" color="#312e81" />
					<Text className="text-lg font-semibold text-indigo-900">
						Carregando...
					</Text>
				</View>
			) : temas.length === 0 ? (
				<Text className="py-4 text-xl text-center text-black">
					Nenhum tema encontrado.
				</Text>
			) : (
				<ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
					<View className="flex justify-center items-center">
						{temas
							.sort((a, b) => a.id - b.id)
							.map((tema) => (
								<CardTemas key={tema.id} tema={tema} />
							))}
					</View>
				</ScrollView>
			)}
			<View className="absolute bottom-24 right-8">
				<Pressable
					onPress={() => router.push('/tema/formtema' as any)}
					className="bg-green-600 rounded-full p-4 shadow-lg flex items-center justify-center"
				>
					<AntDesign name="plus" size={24} color={'#ffffff'} />
				</Pressable>
			</View>
		</View>
	)
}
