import { AntDesign } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'
import Tema from '../../models/Tema'

interface CardTemaProps {
	tema: Tema
}

export default function CardTemas({ tema }: CardTemaProps) {
	return (
		<View
			className="w-[90%] my-4 mx-4 flex items-center justify-center flex-col
        bg-eviolet-100 rounded-2xl border"
		>
			<View className="w-full py-2 px-6 bg-indigo-700 rounded-s-2xl">
				<Text className="text-white font-bold text-2xl text-center">
					Categoria
				</Text>
			</View>
			<View className="w-full flex flex-col justify-center items-center p-2">
				<Text className="p-2 text-2xl font-semibold text-black justify-start">
					{tema.descricao}
				</Text>

				<View className="flex flex-row">
					<Pressable
						onPress={() => console.log('Editar Tema...')}
						className="bg-indigo-700 rounded-full p-3 flex justify-center mx-1"
					>
						<AntDesign name="edit" size={20} color={'#ffffff'} />
					</Pressable>

					<Pressable
						onPress={() => console.log('Deletar Tema...')}
						className="bg-red-600 rounded-full p-3 flex justify-center mx-1"
					>
						<AntDesign name="delete" size={20} color={'#ffffff'} />
					</Pressable>
				</View>
			</View>
		</View>
	)
}
