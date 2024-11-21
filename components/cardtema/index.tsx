import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Pressable, Text, View } from 'react-native'
import Tema from '../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

export default function CardTemas({ tema }: CardTemaProps) {
    const router = useRouter()

    return (
        <View className="w-[90%] my-4 mx-4 rounded-2xl overflow-hidden bg-white">
            <View className="flex-row items-center justify-between py-4 px-6 bg-indigo-800">

                <Text className="text-white font-bold text-2xl flex-1 text-center">Tema</Text>
                
                <View className="flex-row gap-4">
                    <Pressable 
                        onPress={() => router.push(`/tema/formtema/?id=${tema.id}` as any)}
                    >
                        <AntDesign name="edit" size={24} color="#22d3ee" />
                    </Pressable>
                    
                    <Pressable 
                        onPress={() => router.push(`/tema/deletartema/?id=${tema.id}` as any)}
                    >
                        <AntDesign name="delete" size={24} color="#f87171" />
                    </Pressable>
                </View>
            </View>
            
            <View className="p-4">
                <Text className="text-xl font-semibold text-black text-justify">
                    {tema.descricao}
                </Text>
            </View>
        </View>
    )
}
