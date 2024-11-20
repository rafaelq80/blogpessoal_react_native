import { Slot } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function UsuarioLayoutStack() {
    return (
        <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar />
            <Slot />
        </SafeAreaProvider>
    );
}
