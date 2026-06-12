import { Text, View, Image } from 'react-native';
import { EstilosPrincipal } from '../styles/EstilosPrincipal.js';

export default function Principal({ navigation }) {
  return (
    <View style={EstilosPrincipal.container}>
      <Image source={require('../assets/logo.png')} style={EstilosPrincipal.iconeLogo} />
      <Text style={EstilosPrincipal.titulo}>Gerenciamento de Treinamento</Text>
      <Text style={EstilosPrincipal.subtitulo}>Bem-vindo ao painel principal</Text>
    </View>
  );
}
