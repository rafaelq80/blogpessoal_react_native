import { AntDesign } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import NavBar from '../components/navbar'

export default function ProtectedLayout() {
	return (
		<>
			<NavBar />
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: '#ffffff',
					tabBarInactiveTintColor: '#a5b4fc',
					headerShown: false,
					tabBarStyle: {
						backgroundColor: '#312e81',
						borderTopColor: 'transparent',
						height: 64,
					},
					tabBarLabelStyle: {
						fontSize: 16,
						paddingBottom: 4,
						fontWeight: '500',
					},
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
								filter="brightness(1)"
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
								filter="brightness(1)"
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
								filter="brightness(1)"
							/>
						),
					}}
				/>
			</Tabs>
		</>
	)
}
