import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	Image,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	View,
} from 'react-native'
import Navbar from '../components/navbar'
import Usuario from '../models/Usuario'
import { createUsuarioFormData } from '../services/FormDataService'
import ImageService from '../services/ImageService'
import { cadastrarUsuario } from '../services/AxiosService'
import { ToastAlerta } from '../utils/ToastAlerta'
import {
	isValidImageUrl,
	UsuarioFormData,
	usuarioSchema,
} from '../validations/UsuarioSchema'

export default function Cadastro() {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const [photoUri, setPhotoUri] = useState<string>('')
	const [fotoPreview, setFotoPreview] = useState<string>('')
	const [file, setfile] = useState<any>(null)
	const [showUrlInput, setShowUrlInput] = useState<boolean>(false)

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: '',
		usuario: '',
		foto: '',
		senha: '',
	})

	const {
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(usuarioSchema),
		defaultValues: {
			nome: '',
			usuario: '',
			senha: '',
			confirmarSenha: '',
			foto: '',
		},
	})

	function limparUriInput() {
		setUsuario({
			id: 0,
			nome: '',
			usuario: '',
			foto: '',
			senha: '',
		})
		setPhotoUri('')
		setFotoPreview('')
		setShowUrlInput(false)
	}

	const toggleUrlInput = () => {
		if (showUrlInput || file) {
			setPhotoUri('')
			setFotoPreview('')
		}

		setShowUrlInput((prev) => !prev)
	}

	async function handleFoto(method: 'camera' | 'gallery') {
		limparUriInput()

		const fotoFile =
			method === 'camera'
				? await ImageService.takePhotoWithCamera()
				: await ImageService.pickImageFromGallery()

		if (fotoFile) {
			setPhotoUri(fotoFile.uri)
			setFotoPreview(fotoFile.uri)
			setfile(fotoFile.file)
		}
	}

	const handleInputChange = (name: keyof UsuarioFormData, value: string) => {
		setValue(name, value)

		if (name === 'foto') {
			setPhotoUri(value)

			isValidImageUrl(value) ? setFotoPreview(value) : setFotoPreview('')
		}
	}

	async function cadastrar(data: any) {
		setIsLoading(true)

		const formData = createUsuarioFormData(
			{ ...data, foto: photoUri },
			file || undefined
		)

		try {
			await cadastrarUsuario('/usuarios/cadastrar', formData, setUsuario)
			ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso')
			router.replace('/')
		} catch (error) {
			ToastAlerta('Erro ao cadastrar o usuário!', 'erro')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<>
			<Navbar />
			<ScrollView
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: 'space-evenly',
					alignItems: 'center',
				}}
				className="flex-1"
				keyboardShouldPersistTaps="handled"
			>
				<Text className="text-4xl font-bold text-indigo-900 my-6">
					Cadastrar Usuário
				</Text>

				<View className="flex flex-col items-center justify-center w-full gap-4">
					<View className="flex flex-col items-center justify-center w-9/12 gap-4 my-6">
						{fotoPreview ? (
							<Image
								source={{ uri: fotoPreview }}
								className="w-40 h-40 rounded-full"
							/>
						) : (
							<View className="w-40 h-40 flex justify-center items-center rounded-full border-2 border-gray-400 bg-gray-200">
								<Text className="text-2xl font-semibold text-center">
									<MaterialIcons
										name="no-photography"
										size={28}
										color={'#000000'}
										filter="brightness(1)"
									/>
								</Text>
							</View>
						)}

						<View className="flex flex-row items-center gap-3">
							<Pressable
								onPress={toggleUrlInput}
								className="w-1/4 py-2 bg-indigo-200 border-2 border-indigo-900 rounded-2xl items-center justify-center"
							>
								<Text className="text-white text-lg">
									<AntDesign
										name="link"
										size={20}
										color={'#312e81'}
										filter="brightness(1)"
									/>
								</Text>
							</Pressable>
							<Pressable
								onPress={() => handleFoto('camera')}
								className="w-1/4 py-2 bg-indigo-200 border-2 border-indigo-900 rounded-2xl items-center justify-center"
							>
								<Text className="text-white text-lg">
									<AntDesign
										name="camera"
										size={20}
										color={'#312e81'}
										filter="brightness(1)"
									/>
								</Text>
							</Pressable>
							<Pressable
								onPress={() => handleFoto('gallery')}
								className="w-1/4 py-2 bg-indigo-200 border-2 border-indigo-900 rounded-2xl items-center justify-center"
							>
								<Text className="text-white text-lg">
									<AntDesign
										name="picture"
										size={20}
										color={'#312e81'}
										filter="brightness(1)"
									/>
								</Text>
							</Pressable>
						</View>

						{showUrlInput && (
							<View className="w-full">
								<TextInput
									className="w-full px-4 py-2 rounded-3xl border border-gray-300
                         text-base text-black bg-white break-words"
									placeholder="Cole a URL da imagem aqui"
									onChangeText={(text) =>
										handleInputChange('foto', text)
									}
								/>
								{errors.foto && (
									<View className="w-9/12 flex justify-start px-4">
										<Text className="font-semibold text-red-500 text-sm">
											{errors.foto.message}
										</Text>
									</View>
								)}
							</View>
						)}
					</View>

					<TextInput
						className="w-9/12 px-4 py-2 rounded-3xl border border-gray-300
                         text-xl text-black bg-white"
						placeholder="Nome"
						onChangeText={(text) => handleInputChange('nome', text)}
					/>
					{errors.nome && (
						<View className="w-9/12 flex justify-start px-4">
							<Text className="font-semibold text-red-500 text-sm">
								{errors.nome.message}
							</Text>
						</View>
					)}

					<TextInput
						className="w-9/12 px-4 py-2 rounded-3xl border border-gray-300
                         text-xl text-black bg-white"
						placeholder="Usuário (e-mail)"
						autoCapitalize="none"
						keyboardType="email-address"
						onChangeText={(text) =>
							handleInputChange('usuario', text)
						}
					/>
					{errors.usuario && (
						<View className="w-9/12 flex justify-start px-4">
							<Text className="font-semibold text-red-500 text-sm">
								{errors.usuario.message}
							</Text>
						</View>
					)}
					<TextInput
						className="w-9/12 px-4 py-2 rounded-3xl border border-gray-300
                         text-xl text-black bg-white"
						placeholder="Senha"
						secureTextEntry
						onChangeText={(text) =>
							handleInputChange('senha', text)
						}
					/>
					{errors.senha && (
						<View className="w-9/12 flex justify-start px-4">
							<Text className="font-semibold text-red-500 text-sm">
								{errors.senha.message}
							</Text>
						</View>
					)}
					<TextInput
						className="w-9/12 px-4 py-2 rounded-3xl border border-gray-300
                         text-xl text-black bg-white"
						placeholder="Confirma Senha"
						secureTextEntry
						onChangeText={(text) =>
							handleInputChange('confirmarSenha', text)
						}
					/>
					{errors.confirmarSenha && (
						<View className="w-9/12 flex justify-start px-4">
							<Text className="font-semibold text-red-500 text-sm">
								{errors.confirmarSenha.message}
							</Text>
						</View>
					)}
				</View>

				<View className="w-9/12 flex flex-row gap-4 my-6">
					<Pressable
						onPress={handleSubmit(cadastrar)}
						disabled={isLoading}
						className="w-1/2 px-4 py-2 rounded-2xl bg-indigo-900"
					>
						<Text className="text-white text-xl text-center font-bold">
							{isLoading ? 'Enviando...' : 'Cadastrar'}
						</Text>
					</Pressable>

					<Pressable
						onPress={() => router.replace('/')}
						disabled={isLoading}
						className="w-1/2 px-4 py-2 rounded-2xl bg-red-500"
					>
						<Text className="text-white text-xl text-center font-bold">
							Cancelar
						</Text>
					</Pressable>
				</View>
			</ScrollView>
		</>
	)
}
