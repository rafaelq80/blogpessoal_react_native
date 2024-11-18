import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function Login() {
	const router = useRouter()

	const handleLogin = () => {
		router.replace('/postagem')
	}

	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-3xl font-bold text-indigo-900">Login</Text>
			<Pressable
				onPress={handleLogin}
				className="w-2/3 my-3 rounded-2xl bg-indigo-900 text-white text-xl text-center font-bold"
			>
				<Text className="text-white text-xl text-center font-bold py-2">
					Entrar
				</Text>
			</Pressable>

			<View className="flex-row items-center">
				<Text className="text-black text-base">
					Ainda não tem uma conta?
				</Text>
				<Pressable
					className="ml-1"
					onPress={() => router.push('/cadastro')}
				>
					<Text className="text-indigo-800 text-base font-bold">
						Cadastre-se
					</Text>
				</Pressable>
			</View>
		</View>
	)
}
