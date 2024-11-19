import { toast } from "sonner-native";

export function ToastAlerta(mensagem: string, tipo: string) {

    switch(tipo){
        case "sucesso":
            toast.success(mensagem);
        break;
        
        case "erro":
            toast.error(mensagem);
        break;
        
        case "info":
        default:
            toast.info(mensagem);
        break;
    }

}