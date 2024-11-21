import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	NativeSyntheticEvent,
	Platform,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TextInputChangeEventData,
	View,
} from 'react-native'
import Tema from '../../../models/Tema'
import { atualizar, cadastrar, listar } from '../../../services/AxiosService'
import { useAuthStore } from '../../../stores/AuthStore'
import { ToastAlerta } from '../../../utils/ToastAlerta'

export default function FormTema() {
	const router = useRouter()
	const { usuario, handleLogout } = useAuthStore()
	const token = usuario.token
	const { id } = useLocalSearchParams()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [tema, setTema] = useState<Tema>({
		id: 0,
		descricao: '',
	})

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
		if (id !== undefined) {
			buscarTemaPorId(id.toString())
		}
	}, [id])

	function atualizarEstado(
		e: NativeSyntheticEvent<TextInputChangeEventData>,
		name: string
	) {
		setTema({
			...tema,
			[name]: e.nativeEvent.text,
		})
	}

	async function handleSubmit() {
		setIsLoading(true)

		try {
			const endpoint = id !== undefined ? atualizar : cadastrar

			await endpoint(`/temas`, tema, setTema, {
				headers: { Authorization: token },
			})

			ToastAlerta(
				id !== undefined ? 'Tema Atualizado!' : 'Tema Cadastrado!',
				'sucesso'
			)
			retornar()
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta(
					id !== undefined
						? 'Erro ao atualizar o tema!'
						: 'Erro ao cadastrar o tema!',
					'erro'
				)
			}
		} finally {
			setIsLoading(false)
		}
	}

	function retornar() {
		router.replace('/tema')
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
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: 'flex-start',
				alignItems: 'center',
			}}
			className="flex-1"
			keyboardShouldPersistTaps="handled"
		>
			<View className="flex flex-col items-center justify-center w-full my-8">
				<Text className="text-3xl font-semibold text-eviolet-900 py-4">
					{id ? 'Editar Tema' : 'Cadastrar Tema'}
				</Text>

				<TextInput
					className="w-10/12 px-4 py-2 rounded-3xl border border-gray-300
                    text-xl text-black bg-white"
					placeholder="Tema"
					value={tema.descricao}
					onChange={(e) => atualizarEstado(e, 'descricao')}
				/>

				<View className="w-8/12 flex flex-row gap-4 my-6">
					<Pressable
						onPress={handleSubmit}
						disabled={isLoading}
						className="w-1/2 px-4 py-2 rounded-2xl bg-indigo-900"
					>
						<Text className="text-white text-xl text-center font-bold">
							{id ? 'Atualizar' : 'Cadastrar'}
						</Text>
					</Pressable>

					<Pressable
						onPress={retornar}
						disabled={isLoading}
						className="w-1/2 px-4 py-2 rounded-2xl bg-red-500"
					>
						<Text className="text-white text-xl text-center font-bold">
							Cancelar
						</Text>
					</Pressable>
				</View>
			</View>
		</ScrollView>
	)
}
