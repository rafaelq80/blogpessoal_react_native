import { z } from 'zod'

export const isValidImageUrl = (url: string): boolean => {
	try {
		const parsedUrl = new URL(url)
		const validExtensions = [
			'.jpg',
			'.jpeg',
			'.png',
		]
		return validExtensions.some((ext) =>
			parsedUrl.pathname.toLowerCase().endsWith(ext)
		)
	} catch {
		return false
	}
}

export const usuarioSchema = z
	.object({
		nome: z.string().min(1, 'O Nome é obrigatório'),
		usuario: z.string().email('E-mail inválido'),
		senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
		confirmarSenha: z.string(),
		foto: z.string().optional().refine(
			(url) => !url || isValidImageUrl(url), 
			{ message: 'URL de imagem inválida' }
		  ).or(z.literal(''))
	})
	.refine((data) => data.senha === data.confirmarSenha, {
		message: 'As senhas não coincidem',
		path: ['confirmarSenha'],
	})

export type UsuarioFormData = z.infer<typeof usuarioSchema>
