import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import NavBar from '../../components/navbar'

export default function ProtectedLayout() {
	return (
		<>
			<NavBar />
			<SafeAreaView style={{ flex: 1 }}>
				<StatusBar barStyle="light-content" />
				<Tabs
					screenOptions={{
						tabBarStyle: {
							position: 'absolute',
							backgroundColor: '#312e81',
							borderTopColor: 'transparent',
							height: 64,
						},
						tabBarLabelStyle: {
							fontSize: 16,
							paddingBottom: 4,
							fontWeight: '500',
						},
						tabBarHideOnKeyboard: true,
						headerShown: false,
						tabBarActiveTintColor: '#ffffff',
						tabBarInactiveTintColor: '#a5b4fc',
					}}
				>
					<Tabs.Screen
						name="postagem"
						options={{
							title: 'Postagem',
							tabBarIcon: ({ focused }) => (
								<AntDesign
									name="message1"
									size={24}
									color={focused ? '#ffffff' : '#a5b4fc'}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name="tema"
						options={{
							title: 'Temas',
							tabBarIcon: ({ focused }) => (
								<AntDesign
									name="star"
									size={24}
									color={focused ? '#ffffff' : '#a5b4fc'}
								/>
							),
						}}
					/>
					<Tabs.Screen
						name="usuario"
						options={{
							title: 'Perfil',
							tabBarIcon: ({ focused }) => (
								<AntDesign
									name="user"
									size={24}
									color={focused ? '#ffffff' : '#a5b4fc'}
								/>
							),
						}}
					/>
				</Tabs>
			</SafeAreaView>
		</>
	)
}
