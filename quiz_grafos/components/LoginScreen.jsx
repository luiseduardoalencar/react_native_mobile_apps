import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Colors } from '@/constants/Colors';
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = 
            await startOAuthFlow();

            if (createdSessionId){
                setActive({ session: createdSessionId });
            } else {

            }
        } catch (err){
            console.error("OAuth error", err)
        }
    }, [])


  return (
    <View>
        <View style = {{
            display:'flex',
            alignItems:'center',
            marginTop:100
        }}>
        <Image source = {require('./../assets/images/grafo.png')} 
        style={{
            width:250,
            height:450,
           
        }}
        />
        </View>
        <View style = {styles.subContainer}>
            <Text style = {{
                fontSize:30,
                fontFamily:'outfit-bold',
                textAlign: 'center'
            }}>Quiz App
                <Text style = {{
                    color:Colors.PRIMARY,
                }}> Teoria dos Grafos </Text> Educational</Text>
                <Text
                style={{
                    fontFamily: 'outfit',
                    textAlign:'center',
                    fontSize: 15,
                    color:Colors.GRAY
                }}>Inclusão e tecnologia</Text>
            <TouchableOpacity style = {styles.btn}
            onPress={onPress}>
                <Text style = {{
                    textAlign:'center',
                    color:'#fff',
                    fontFamily:'outfit'
                }}>Sign In</Text>
            </TouchableOpacity>
        </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
    subContainer:{
        backgroundColor:"#fff",
        padding: 20,
        margintTop: -20,  
    },
    btn:{
        backgroundColor: Colors.PRIMARY,
        padding: 16,
        borderRadius: 99,
        marginTop:20
    }
})