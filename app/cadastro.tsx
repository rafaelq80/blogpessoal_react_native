import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

export default function Cadastro() {

	const router = useRouter()

	const voltar = () => {
		router.replace('/')
	}

	return (
		<View className="flex-1 items-center justify-center">
			<Text className="text-3xl font-bold text-indigo-900">Cadastrar Usuário</Text>
			<Pressable
				onPress={voltar}
				className="w-2/3 my-3 rounded-2xl bg-red-700 text-white text-xl text-center font-bold"
			>
				<Text className="text-white text-xl text-center font-bold py-2">
					Cancelar
				</Text>
			</Pressable>

		</View>
	)
}
