import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

// Função para calcular medida relativa (rem)
const rem = (value: number) => wp(`${value * 4}%`);

export const styles = StyleSheet.create({
	selectInput: {
		width: '83.333333%',
		backgroundColor: '#ffffff',
		color: '#000000',
		borderColor: '#d1d5db',
		borderRadius: rem(1.5),
		borderWidth: 1,
		fontSize: 18,
		lineHeight: 24,
		marginTop: rem(0.5),
		marginBottom: rem(0.5),
		paddingVertical: rem(0.5),
		paddingHorizontal: rem(0.5),
	},
	placeholder: {
		color: '#a2a2a2',
		fontSize: 18,
		lineHeight: 24,
		paddingStart: rem(0.5),
	},
	selectedText: {
		color: '#000000',
		fontSize: 18,
		lineHeight: 24,
		paddingStart: rem(0.5),
	},
	itemText: {
		color: '#000000',
		fontSize: 18,
		lineHeight: 24,
	},
	itemContainer: {
		color: '#000000',
		backgroundColor: '#ffffff',
		fontSize: 18,
		lineHeight: 24,
	},
	container: {
		width: '75%',
		marginLeft: 18,
		color: '#000000',
		backgroundColor: '#ffffff',
		fontSize: 18,
		lineHeight: 24,
	},
	icon: {
		marginRight: 10,
		width: rem(1.5),
	},
})
