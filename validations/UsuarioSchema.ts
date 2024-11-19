import { z } from 'zod'

export const usuarioSchema = z
	.object({
		nome: z.string().min(1, 'O Nome é obrigatório'),
		usuario: z.string().email('E-mail inválido'),
		foto: z.string().url('Endereço inválido').optional().or(z.literal('')),
		senha: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
		confirmarSenha: z.string(),
	})
	.refine((data) => data.senha === data.confirmarSenha, {
		message: 'As senhas não coincidem',
		path: ['confirmarSenha'],
	})

export type UsuarioFormData = z.infer<typeof usuarioSchema>
