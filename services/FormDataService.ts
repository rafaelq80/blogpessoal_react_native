import Usuario from '../models/Usuario'

/**
 * Form Data
 * 
 * FormData é uma interface nativa do JavaScript utilizada para 
 * construir um conjunto de pares chave-valor que representam 
 * campos de um formulário. 
 * 
 * Form Data é amplamente usado em aplicativos web e mobile para 
 * enviar dados, especialmente arquivos, via requisições HTTP 
 * do tipo POST para servidores.
 */

/** 
 * Tipos que podem ser convertidos para string de forma segura.
 * O FormData trabalha primariamente com strings, mesmo que 
 * você passe um número ele será convertido para string internamente. 
 */ 
type StringConvertible = string | number | boolean | Date

/** 
 * Define os tipos de dados que o FormData pode aceitar,
 * garantindo que todas as propriedades do objeto passado 
 * podem ser usadas em um FormData.
 * 
 * Blob é uma abstração genérica para manipulação de dados 
 * binários.
 * 
 * File é uma extensão de Blob com informações específicas 
 * para representar arquivos.
 * 
 */ 
type FormDataValue = StringConvertible | Blob | File | null | undefined

/**
 * Tipo genérico para dados compatíveis com FormData
 * 
 * FormDataCompatible<T> é um tipo genérico que permite receber qualquer tipo T 
 * como entrada. Ele será usado para gerar uma nova estrutura de tipo baseada 
 * no tipo fornecido.
 * 
 * O utilitário Partial<> transforma todas as propriedades do tipo fornecido 
 * em opcionais, ou seja, não é necessário preencher os dados de todas as propriedades
 * 
 * [K in key of T] é um mapped type. funciona como um "for...in", só que para tipos, 
 * que itera sobre cada chave (k) do tipo recebido (T)
 * 
 * FormDataValue define os valores possíveis para as propriedades do tipo, ou seja,
 * cada propriedade só pode ter valores definidos no tipo FormDataValue.
 **/ 
type FormDataCompatible<T> = Partial<{
	[K in keyof T]: FormDataValue
}>

// Tipo específico para Usuario sem postagens
type UsuarioFormData = Omit<Usuario, 'postagem'>

// Função genérica para criar FormData
export function createFormData<T extends FormDataCompatible<T>>(
	data: T, // Objeto que contém os dados extraídos do input
	fileKey?: string, // Nome da chave que aramazenará o arquivo
	file?: File | null // Arquivo
): FormData {
	const formData = new FormData()

	Object.entries(data).forEach(([key, value]) => {
		if (value) {
			// Adiciona um valor para a chave como um arquivo ou como uma string
			formData.append(key, value instanceof File || value instanceof Blob ? value : String(value))
		}
	})

	// Adiciona arquivo separado, se ele foi enviado
	if (fileKey && file) {
		formData.append(fileKey, file)
	}

	return formData
}

/** 
 * Função Específica para criar FormData do tipo Usuario
 * 
 * Se precisar, você pode criar funções semelhantes a esta
 * para outros Recursos que trabalharão com envio de imagens 
 **/ 
export function createUsuarioFormData(
	usuario: Usuario,
	fotoFile?: File | null
): FormData {
	// Extrai apenas as propriedades relevantes do usuário
	const { id, nome, usuario: username, foto, senha } = usuario

	// Cria objeto compatível com FormData
	const usuarioData: FormDataCompatible<UsuarioFormData> = {
		id: id ? String(id) : undefined,
		nome,
		usuario: username,
		foto,
		senha,
	}

	return createFormData(usuarioData, 'file', fotoFile)
}
