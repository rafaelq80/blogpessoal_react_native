import { Slot } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';

export default function UsuarioLayoutStack() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
			<StatusBar barStyle="light-content" />
            <Slot />
        </SafeAreaView>
    );
}
