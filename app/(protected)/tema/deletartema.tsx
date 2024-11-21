import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'
import Tema from '../../../models/Tema'
import { deletar, listar } from '../../../services/AxiosService'
import { useAuthStore } from '../../../stores/AuthStore'
import { ToastAlerta } from '../../../utils/ToastAlerta'

export default function DeletarTema() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)
	const { usuario, handleLogout } = useAuthStore()
	const token = usuario.token
	const { id } = useLocalSearchParams()
	const [tema, setTema] = useState({} as Tema)

	async function buscarTemaPorId(id: string) {
		try {
			await listar(`/temas/${id}`, setTema, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			error.toString().includes('401')
				? handleLogout()
				: ToastAlerta('Erro ao listar os temas!', 'erro')
		}
	}

	useEffect(() => {
		if (token === '') {
			ToastAlerta('Você precisa estar logado!', 'info')
			router.replace('/')
		}
	}, [token])

	useEffect(() => {
		if (id) {
			buscarTemaPorId(id.toString())
		}
	}, [id])

	const deletarTema = async () => {
		setIsLoading(true)
		try {
			await deletar(`/temas/${id}`, {
				headers: { Authorization: usuario.token },
			})
			ToastAlerta('Tema Excluído!', 'sucesso')
			router.replace('/tema')
		} catch (error: any) {
			error.toString().includes('401')
				? handleLogout()
				: ToastAlerta('Erro ao Excluir o Tema!', 'erro')
		}
		setIsLoading(false)
	}

	if (isLoading) {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" color="#312e81" />
				<Text className="text-lg font-semibold text-indigo-900">
					Carregando...
				</Text>
			</View>
		)
	}

	return (
		<View className="w-full flex-1 flex-col">
			<Text className="p-8 text-2xl font-bold text-black text-center">
				Você deseja excluir o Tema?
			</Text>
			<View className="flex flex-col items-center justify-center w-11/12 bg-white rounded-2xl self-center">
				<View className="flex flex-row items-center w-full bg-indigo-800 rounded-t-2xl">
					<Text className="text-white font-bold text-xl p-3">
						Tema
					</Text>
				</View>
				<View className="w-full flex flex-col justify-center items-center p-2 bg-white">
					<Text className="p-4 text-2xl font-semibold text-black">
						{tema.descricao}
					</Text>
				</View>
				<View className="w-8/12 flex flex-row gap-4 my-4">
					<Pressable
						onPress={deletarTema}
						disabled={isLoading}
						className="w-1/2 px-4 py-2 rounded-2xl bg-indigo-900"
					>
						<Text className="text-white text-xl text-center font-bold">
							Sim
						</Text>
					</Pressable>
					<Pressable
						onPress={() => router.replace('/tema')}
						className="w-1/2 px-4 py-2 rounded-2xl bg-red-500"
					>
						<Text className="text-white text-xl text-center font-bold">
							Não
						</Text>
					</Pressable>
				</View>
			</View>
		</View>
	)
}
