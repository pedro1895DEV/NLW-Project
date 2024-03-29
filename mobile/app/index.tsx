//Code: e8c0bff028ea5292319e
import {useRouter} from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import blurBg from '../src/assets/bg-blur.png'
import Stripes from '../src/assets/stripes.svg'
import NLWLogo from '../src/assets/nlw-spacetime-logo.svg'
import { styled } from 'nativewind';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { api } from '../src/lib/api';
const StyledStripes = styled(Stripes)

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint: 'https://github.com/settings/connections/applications/89431dc05c9959ad56d8',
};


export default function App() {
    const router = useRouter()

  const [request, response, signInWithGithub] = useAuthRequest(
    {
      clientId: '89431dc05c9959ad56d8',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'nlwspacetime'
      }),
    },
    discovery
  );

   const handleGithubOAuthCode = async(code: string) =>{
    const response = await api.post('/register',{
        code,
      })
        const { token } = response.data
        
        await SecureStore.setItemAsync('token', token)
        router.push('/memories')
      }
  

    useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params

      handleGithubOAuthCode(code)
      
    }
  }, [response]);

  //Verifica o endereço
  /*useEffect(()=>{
    console.log(makeRedirectUri({
      scheme: 'nlwspacetime'
    }));
    
  })*/
  
  return (
    <ImageBackground source ={blurBg}
    className='relative flex-1 items-center bg-gray-900 px-8 py-10'
      imageStyle={{position: 'absolute', left: '-100%'}}
    >
        <StyledStripes className="absolute left-2" />

        <View className="flex-1 items-center justify-center gap-6">
        <NLWLogo />
        <View className="space-y-2">
        <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua cápsula do tempo</Text>
        <Text className="text-center font-body text-base leading-relaxed text-gray-50">Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!</Text>
        </View>
        <TouchableOpacity className="rounded-full bg-green-500 px-5 py-3" activeOpacity={0.7} onPress={()=> signInWithGithub()}>
        <Text className="font-alt text-sm uppercase text-black">Cadastrar Lembrança</Text>
        </TouchableOpacity>
        </View>

        <Text className="text-center font-body text-sm leading-relaxed text-gray-200">Feito com 💜 no NLW da Rocketseat</Text>

      <StatusBar style='light' translucent></StatusBar>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
