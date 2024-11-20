import { Slot } from 'expo-router'
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function PostagemLayoutStack() {
	return (
        <SafeAreaProvider>
            <StatusBar />
            <Slot />
        </SafeAreaProvider>
    );
}
