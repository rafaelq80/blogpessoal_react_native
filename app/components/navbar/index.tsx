import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Image, Pressable, Text, View } from 'react-native'

export default function NavBar() {
	const router = useRouter()

	function handleLogout() {
		router.push('/')
	}

	return (
		<View className='w-full h-1/6 flex flex-col items-center justify-center bg-indigo-900'>

            <View className='w-fit h-4/6 flex flex-row items-center justify-between gap-x-6'>
               
                <Image
                    source={{
                        uri: 'https://ik.imagekit.io/vzr6ryejm/blog.png?updatedAt=1730838761033',
                    }}
                    className="w-16 h-16"
                />

                <Text className='text-white text-3xl font-bold'>
                    Blog Pessoal
                </Text>

                <Pressable
                    onPress={() => handleLogout()}
                    className='flex justify-center'
                >
                    <AntDesign
                        name='logout'
                        size={32}
                        color={'#ffffff'}
                    />
                </Pressable>

            </View>

        </View>
	)
}
