import Usuario from '../models/Usuario'

// Tipos base para FormData
type StringConvertible = string | number | boolean | Date
type FormDataValue = StringConvertible | Blob | File | null | undefined

// Tipo para dados que podem ser convertidos para FormData
type FormDataCompatible<T> = {
	[K in keyof T]: FormDataValue
}

// Tipo específico para Usuario sem postagem
type UsuarioFormData = Omit<Usuario, 'postagem'> & {
	postagem?: never
}

export function createFormData<T extends FormDataCompatible<T>>(
	data: T,
	fileKey?: string,
	file?: File | null
): FormData {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value != null && value !== '') {
			if (value instanceof File || value instanceof Blob) {
				formData.append(key, value)
			} else {
				formData.append(key, String(value))
			}
		}
	})

	if (fileKey && file) {
		formData.append(fileKey, file)
	}

	return formData
}

export function createUsuarioFormData(
	usuario: Usuario,
	fotoFile?: File | null
): FormData {
	// Extrair apenas as propriedades necessárias do usuário
	const { id, nome, usuario: username, foto, senha } = usuario

	// Criar objeto compatível com FormData
	const usuarioData: FormDataCompatible<UsuarioFormData> = {
		id: String(id),
		nome,
		usuario: username,
		foto,
		senha,
	}

	return createFormData(usuarioData, 'file', fotoFile)
}
