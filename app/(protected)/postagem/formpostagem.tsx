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
import Postagem from '../../../models/Postagem'
import { atualizar, cadastrar, listar } from '../../../services/AxiosService'
import { useAuthStore } from '../../../stores/AuthStore'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from '../../../styles/DropDownStyles'
import Tema from '../../../models/Tema'

export default function FormPostagem() {
	const router = useRouter()

	const { usuario, handleLogout } = useAuthStore()
	const token = usuario.token

    const [changeTema, setChangeTema] = useState<boolean>(false)

    const [temas, setTemas] = useState<Tema[]>([])

    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: '',
    })

	const { id } = useLocalSearchParams()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [postagem, setPostagem] = useState<Postagem>({} as Postagem)

	async function buscarPostagemPorId(id: string) {
		try {
			await listar(`/postagens/${id}`, setPostagem, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			error.toString().includes('401')
				? handleLogout()
				: ToastAlerta('Erro ao listar as postagens!', 'erro')
		}
	}

    async function buscarTemas() {
		try {
			await listar(`/temas`, setTemas, {
				headers: { Authorization: token },
			})
		} catch (error: any) {
			error.toString().includes('401')
				? handleLogout()
				: ToastAlerta('Erro ao listar os temas!', 'erro')
		}
	}

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
        buscarTemas()

		if (id !== undefined) {
			buscarPostagemPorId(id.toString())
            setTema(postagem.tema)
		}
	}, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
            usuario: usuario,
        })

    }, [tema])

	function atualizarEstado(
		e: NativeSyntheticEvent<TextInputChangeEventData>,
		name: string
	) {
		setPostagem({
			...postagem,
			[name]: e.nativeEvent.text,
		})
	}

    function atualizarTema(tema: Tema) {

        setTema({
            id: tema.id,
            descricao: tema.descricao
        });

        setChangeTema(true)

    }

	async function handleSubmit() {
		setIsLoading(true)

		try {
			const endpoint = id !== undefined ? atualizar : cadastrar

			await endpoint(`/postagens`, postagem, setPostagem, {
				headers: { Authorization: token },
			})

			ToastAlerta(
				id !== undefined
					? 'Postagem Atualizada!'
					: 'Postagem Cadastrada!',
				'sucesso'
			)
			retornar()
		} catch (error: any) {
			if (error.toString().includes('401')) {
				handleLogout()
			} else {
				ToastAlerta(
					id !== undefined
						? 'Erro ao atualizar a postagem!'
						: 'Erro ao cadastrar a postagem!',
					'erro'
				)
				console.error(error)
			}
		} finally {
			setIsLoading(false)
		}
	}

	function retornar() {
		router.replace('/postagem')
	}

    console.log(JSON.stringify(tema))
    console.log(JSON.stringify(postagem))

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
					{id ? 'Editar Postagem' : 'Cadastrar Postagem'}
				</Text>

				<TextInput
					className="w-10/12 my-2 px-4 py-2 rounded-3xl border border-gray-300
                    text-xl text-black bg-white"
					placeholder="Título da Postagem"
					value={postagem.titulo}
					onChange={(e) => atualizarEstado(e, 'titulo')}
				/>

				<TextInput
					className="w-10/12 my-2 px-4 py-2 rounded-3xl border border-gray-300
                    text-xl text-black bg-white"
					placeholder="Texto da Postagem"
					value={postagem.texto}
					onChange={(e) => atualizarEstado(e, 'texto')}
				/>

				<Dropdown
					style={styles.selectInput}
					placeholderStyle={styles.placeholder}
					selectedTextStyle={styles.selectedText}
					itemTextStyle={styles.itemText}
					itemContainerStyle={styles.itemContainer}
                    containerStyle={styles.container}
                    iconStyle={styles.icon}
					data={temas.sort((a, b) => a.id - b.id)}
					search={false}
					maxHeight={300}
					labelField="descricao"
					valueField="id"
					placeholder="Selecione um Tema"
					value={postagem.tema || ''}
					onChange={(value) => atualizarTema(value)}
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
