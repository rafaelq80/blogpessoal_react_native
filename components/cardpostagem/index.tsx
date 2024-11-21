import { AntDesign } from '@expo/vector-icons'
import { Image, Pressable, Text, View } from 'react-native'
import Postagem from '../../models/Postagem'
import { formatarDataCompleta } from '../../utils/FormatarData'

interface CardPostagemProps {
    postagem: Postagem
}

export default function CardPostagens({ postagem }: CardPostagemProps) {

    return (
        <View className="w-[90%] my-4 mx-4 rounded-2xl border-2 border-indigo-800 overflow-hidden bg-white">
            <View className="flex-row items-center justify-between py-4 px-6 bg-indigo-800">
                <View className="flex-row items-center gap-4">
                    <Image
                        source={{ uri: postagem.usuario?.foto }}
                        className="w-12 h-12 rounded-full"
                    />
                    <Text className="text-white font-bold text-xl">
                        {postagem.usuario?.nome}
                    </Text>
                </View>
                <View className="flex-row gap-4">
                    <Pressable onPress={() => console.log('Editar Postagem...')}>
                        <AntDesign name="edit" size={24} color="#22d3ee" />
                    </Pressable>
                    <Pressable onPress={() => console.log('Deletar Postagem...')}>
                        <AntDesign name="delete" size={24} color="#f87171" />
                    </Pressable>
                </View>
            </View>
            
            <View className="p-4 space-y-2">
                <Text className="text-2xl font-bold text-black">
                    {postagem.titulo}
                </Text>
                <Text className="text-lg text-black">
                    {postagem.texto}
                </Text>
                <Text className="text-lg text-black">
                    {formatarDataCompleta(postagem.data)}
                </Text>
                <Text className="text-lg text-black">
                    Tema: {postagem.tema?.descricao}
                </Text>
            </View>
        </View>
    )
}