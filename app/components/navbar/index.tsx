import { MaterialIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'
import { useAuthStore } from '../../../stores/AuthStore'
import { ToastAlerta } from '../../../utils/ToastAlerta'

export default function NavBar() {
	const router = useRouter()

	const { usuario, handleLogout } = useAuthStore()

	function logout() {
		handleLogout()
		ToastAlerta('O usuário foi desconectado com sucesso!', 'info')
		router.replace('/')
	}

	return (
		<View className="w-full h-24 flex flex-col items-center justify-center bg-indigo-900 z-1000">
			<View className="w-fit h-4/6 flex flex-row items-center justify-between gap-x-6">
				<Image
					source={{
						uri: 'https://ik.imagekit.io/vzr6ryejm/blog.png?updatedAt=1730838761033',
					}}
					className="w-16 h-16"
				/>

				<Text className="text-white text-4xl font-bold">
					Blog Pessoal
				</Text>

				{usuario.token && (
					<Pressable
						onPress={() => logout()}
						className="flex justify-center items-center"
					>
						<MaterialIcons
							name="logout"
							size={28}
							color={'#ffffff'}
							filter="brightness(1)"
						/>
                        <Text className='text-xs text-white'>Logout</Text>
					</Pressable>
				)}
			</View>
		</View>
	)
}
