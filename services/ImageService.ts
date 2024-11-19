import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import { ToastAlerta } from '../utils/ToastAlerta'

class ImagePickerService {
  private cameraPermission: boolean = false

  constructor() {
    this.requestCameraPermission()
  }

  private async requestCameraPermission() {
    const { status } = await Camera.requestCameraPermissionsAsync()
    this.cameraPermission = status === 'granted'
  }

  // Limpa os estados relacionados à imagem
  private createImageFile(selectedUri: string, source: 'camera' | 'gallery') {
    return {
      uri: selectedUri,
      type: 'image/jpeg',
      name: `${source}.jpg`,
    }
  }

  // Selecionar imagem da galeria
  async pickImageFromGallery() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri
        return {
          uri: selectedUri,
          file: this.createImageFile(selectedUri, 'gallery')
        }
      }

      return null
    } catch (error) {
      console.error('Erro ao selecionar imagem da galeria:', error)
      ToastAlerta('Erro ao selecionar imagem da galeria', 'erro')
      return null
    }
  }

  // Tirar foto com a câmera
  async takePhotoWithCamera() {
    try {
      if (!this.cameraPermission) {
        ToastAlerta('Permissão de câmera não concedida', 'erro')
        return null
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      })

      if (!result.canceled && result.assets.length > 0) {
        const selectedUri = result.assets[0].uri
        return {
          uri: selectedUri,
          file: this.createImageFile(selectedUri, 'camera')
        }
      }

      return null
    } catch (error) {
      console.error('Erro ao tirar foto:', error)
      ToastAlerta('Erro ao tirar foto', 'erro')
      return null
    }
  }
}

export default new ImagePickerService()