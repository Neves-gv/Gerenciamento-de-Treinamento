import { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EstilosPrincipal } from '../styles/EstilosPrincipal.js';

export default function Principal({ navigation }) {
  const [dadosLogin, setDadosLogin] = useState(null);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
        if (!usuarioLogado) {
          navigation.navigate('Login');
          return;
        }
        setDadosLogin(JSON.parse(usuarioLogado));
      } catch (error) {
        console.error('Erro ao ler usuário logado:', error);
        navigation.navigate('Login');
      }
    };
    buscarUsuario();
  }, [navigation]);

  const botaoLogout = async () => {
    try {
      await AsyncStorage.removeItem('UsuarioLogado');
      setDadosLogin(null);
      const parent = navigation.getParent();
      if (parent) {
        parent.navigate('Login');
        return;
      }
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  const saudacao = 'Acompanhe seus treinamentos';

  return (
    <View style={EstilosPrincipal.container}>
      <View style={EstilosPrincipal.painel}>
        <View style={EstilosPrincipal.header}>
          <TouchableOpacity style={EstilosPrincipal.logoutButton} onPress={botaoLogout}>
            <Text style={EstilosPrincipal.logoutButtonText}>Sair</Text>
          </TouchableOpacity>
        </View>
        <Image source={require('../assets/logo.png')} style={EstilosPrincipal.iconeLogo} />
        <Text style={EstilosPrincipal.titulo}>Gerenciamento de Treinamento</Text>
        <Text style={EstilosPrincipal.subtitulo}>Bem-vindo ao painel principal</Text>
        <View style={EstilosPrincipal.saudacaoCard}>
          <Text style={EstilosPrincipal.saudacaoTitulo}>{saudacao}</Text>
        </View>
      </View>
    </View>
  );
}
