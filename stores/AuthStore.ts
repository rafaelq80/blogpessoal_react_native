import { create } from 'zustand';
import UsuarioLogin from '../models/UsuarioLogin';
import { login } from '../services/Service';
import { ToastAlerta } from '../utils/ToastAlerta';

interface AuthStoreProps {
    usuario: UsuarioLogin;
    handleLogout(): void;
    handleLogin(usuario: UsuarioLogin): Promise<void>;
    setFoto(novaFoto: string):  void;
    isLoading: boolean;
}

// Estado global com Zustand
export const useAuthStore = create<AuthStoreProps>((set) => ({
    usuario: {
        id: 0,
        nome: '',
        usuario: '',
        senha: '',
        foto: '',
        token: '',
    },
    isLoading: false,

    handleLogin: async (usuario: UsuarioLogin) => {
        
        set({ isLoading: true });

        try {
            await login('/usuarios/logar', usuario, (data: UsuarioLogin) => {
                set({ usuario: data });
            });
            ToastAlerta("Usuário autenticado!", 'sucesso')
        } catch (error: any) {
            ToastAlerta('Usuário não Encontrado!', 'erro');
        }finally{
            set({ isLoading: false });
        }
    },

    handleLogout: () => {
        set({
            usuario: {
                id: 0,
                nome: '',
                usuario: '',
                senha: '',
                foto: '',
                token: '',
            }
        });
    },

    setFoto: (novaFoto: string) => set((state) => ({
        usuario: { ...state.usuario, foto: novaFoto }
      })),
      
}));
