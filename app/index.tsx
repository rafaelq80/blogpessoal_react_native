import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import {
	Image,
	Linking,
	NativeSyntheticEvent,
	Pressable,
	ScrollView,
	Text,
	TextInput,
	TextInputChangeEventData,
	View,
} from 'react-native'
import { useAuthStore } from '../stores/AuthStore'
import { useState, useEffect } from 'react'
import UsuarioLogin from '../models/UsuarioLogin'

export default function Login() {
	const router = useRouter()

	const { usuario, handleLogin, isLoading } = useAuthStore()

	const [showPassword, setShowPassword] = useState(false)

	const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
		id: 0,
		nome: '',
		usuario: '',
		foto: '',
		senha: '',
		token: '',
	})

	useEffect(() => {
		if (usuario?.token && usuario.token !== '') {
			router.replace('/postagem')
		}
	}, [usuario?.token])

	function atualizarEstado(
		e: NativeSyntheticEvent<TextInputChangeEventData>,
		name: string
	) {
		setUsuarioLogin({
			...usuarioLogin,
			[name]: e.nativeEvent.text,
		})
	}

	async function login() {
		await handleLogin(usuarioLogin)

		setUsuarioLogin({
			id: 0,
			nome: '',
			usuario: '',
			foto: '',
			senha: '',
			token: '',
		})
	}

	return (
		<ScrollView
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: 'space-evenly',
				alignItems: 'center',
			}}
			className="flex-1"
			keyboardShouldPersistTaps="handled"
		>
			<View className="flex-1 flex-col items-center justify-center w-full gap-2 my-12">
				<Image
					source={{
						uri: 'https://ik.imagekit.io/vzr6ryejm/blog.png?updatedAt=1730838761033',
					}}
					className="w-40 h-40 mb-3"
				/>
				<Text className="text-indigo-900 text-3xl font-bold">
					Blog Pessoal App
				</Text>
				<Text className="text-indigo-900 text-xl font-bold">
					Expresse aqui os seus pensamentos!
				</Text>
			</View>
			<View className="flex flex-col items-center justify-center w-full my-4 gap-2">
				<TextInput
					className="w-9/12 my-3 px-4 py-2 rounded-3xl border-1 border-transparent
           text-xl text-black bg-white"
					placeholder="E-mail"
					autoCapitalize="none"
					keyboardType="email-address"
					value={usuarioLogin.usuario}
					onChange={(e) => atualizarEstado(e, 'usuario')}
				/>
				<View className="w-9/12 relative">
					<TextInput
						className="w-full my-3 px-4 py-2 rounded-3xl border-1 border-transparent
							text-xl text-black bg-white pr-12"
						placeholder="Senha"
						secureTextEntry={!showPassword}
						value={usuarioLogin.senha}
						onChange={(e) => atualizarEstado(e, 'senha')}
					/>
					<Pressable
						onPress={() => setShowPassword(!showPassword)}
						className="absolute right-4 top-1/2 -translate-y-1/2"
					>
						<AntDesign
							name={showPassword ? 'eye' : 'eyeo'}
							size={24}
							color="#312e81"
						/>
					</Pressable>
				</View>
				<Pressable
					onPress={login}
					disabled={isLoading}
					className="w-2/3 my-3 rounded-2xl bg-indigo-900 text-white text-xl text-center font-bold"
				>
					<Text className="text-white text-xl text-center font-bold py-2">
						{isLoading ? 'Entrando...' : 'Entrar'}
					</Text>
				</Pressable>

				<View className="flex-row items-center">
					<Text className="text-black text-base">
						Ainda não tem uma conta?
					</Text>
					<Pressable
						className="ml-1"
						onPress={() => router.replace('/cadastro')}
					>
						<Text className="text-indigo-800 text-base font-bold">
							Cadastre-se
						</Text>
					</Pressable>
				</View>
			</View>
			<View className="flex-1 justify-end w-full my-4">
				<Text className="text-indigo-950 text-base font-bold text-center">
					{' '}
					Desenvolvido por Rafael Queiróz
				</Text>
				<Text className="text-indigo-950 text-base font-bold text-center">
					{' '}
					Copyright: 2024
				</Text>
				<View className="flex flex-row gap-4 justify-center py-2">
					<AntDesign
						name="facebook-square"
						size={28}
						color={'#312e81'}
						onPress={() => Linking.openURL('')}
					/>
					<AntDesign
						name="linkedin-square"
						size={28}
						color={'#312e81'}
						onPress={() => Linking.openURL('')}
					/>
					<AntDesign
						name="instagram"
						size={28}
						color={'#312e81'}
						onPress={() => Linking.openURL('')}
					/>
				</View>
			</View>
		</ScrollView>
	)
}
