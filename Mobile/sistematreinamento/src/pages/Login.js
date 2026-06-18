import { View, Text, TextInput, TouchableOpacity, Image, Switch } from 'react-native';
import { useState, useEffect } from "react";
import { enderecoServidor } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { EstilosLogin, coresLogin } from '../styles/EstilosLogin';
import { corFundo2, corPrincipal } from '../styles/Estilos';

export default function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const usuarioLogado = await AsyncStorage.getItem('UsuarioLogado');
        if (!usuarioLogado) return;
        const usuario = JSON.parse(usuarioLogado);
        if (usuario?.lembrar === true) {
          navigation.navigate('Principal');
        }
      } catch (error) {
        console.error('Erro ao ler usuário logado:', error);
      }
    };
    buscarUsuario();
  }, [navigation]);

  async function botaoEntrar() {
    try {
      if (email == "" || senha == "") {
        setMensagem("Preencha todos os campos")
        return
      }
      const dadoslogin = {
        email: email,
        senha: senha
      }
      const resposta = await fetch(`${enderecoServidor}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadoslogin)
      });

      console.log(resposta);
      

      if (resposta.status == 404) {
        setMensagem(`Rota nao encontrada: ${resposta.url}`);
        return;
      }
      const dados = await resposta.json();

      console.log(dados);

      if (resposta.status == 500) {
        setMensagem(`Erro no servidor: ${dados.message}`);
        return;
      }

      if (resposta.ok) {
        await AsyncStorage.setItem("UsuarioLogado", JSON.stringify({ ...dados, lembrar }));
        navigation.navigate("MenuDrawer");
      } else {
        setMensagem("Email ou senha incorretos");
      }
    } catch (erro) {
      setMensagem("Erro ao fazer login: " + erro.message);
    }
  }

  return (
    <View style={EstilosLogin.container}>
      <LinearGradient colors={[corFundo2, corPrincipal]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }}
        style={EstilosLogin.gradiente}>
        <View style={EstilosLogin.cabecalho}>
          <Image source={require('../assets/logo.png')} style={EstilosLogin.iconeLogo} />
          <View>
            <Text style={EstilosLogin.nomeApp}>Gerenciamento de Treinamento</Text>
            <Text style={EstilosLogin.subtituloApp}>Controle de Treinamento</Text>
          </View>
        </View>
        <View style={EstilosLogin.conteudoPrincipal}>
          <View style={EstilosLogin.formularioLogin}>
            <View style={EstilosLogin.titulo}>
              <View style={EstilosLogin.grupoInput}>
                <MaterialIcons name="email" size={22} color={coresLogin.icone} style={EstilosLogin.iconeInput} />
                <TextInput placeholder='Digite seu email' placeholderTextColor={coresLogin.placeholder} value={email}
                  onChangeText={setEmail} style={EstilosLogin.input}
                  keyboardType="email-address" autoCapitalize="none" />
              </View>
              <View style={EstilosLogin.grupoInput}>
                <MaterialIcons name="lock" size={22} color={coresLogin.icone} style={EstilosLogin.iconeInput} />
                <TextInput placeholder='Digite sua senha' placeholderTextColor={coresLogin.placeholder} value={senha}
                  onChangeText={setSenha} style={EstilosLogin.input}
                  secureTextEntry={!mostrarSenha} />
                <TouchableOpacity style={EstilosLogin.alternarVisibilidade} onPress={() => setMostrarSenha(!mostrarSenha)}>
                  <MaterialIcons color={coresLogin.icone} name={mostrarSenha ? "visibility" : "visibility-off"} size={22} />
                </TouchableOpacity>
              </View>
              <View style={EstilosLogin.entreOpcoes}>
                <View style={EstilosLogin.containerCheckbox}>
                  <Switch value={lembrar} onValueChange={setLembrar} />
                  <Text style={EstilosLogin.rotuloCheckbox}>Lembrar-me</Text>
                </View>
                <Text style={EstilosLogin.esqueceuSenha}>Esqueceu sua senha?</Text>
              </View>
              <TouchableOpacity style={EstilosLogin.botaoEntrar} onPress={botaoEntrar}>
                <Text style={EstilosLogin.textoBotao}>Entrar</Text>
              </TouchableOpacity>

              <Text style={EstilosLogin.mensagemFeedback}>{mensagem}</Text>
            </View>
          </View>

        </View>
      </LinearGradient>
    </View>
  )
}