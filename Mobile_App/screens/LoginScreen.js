import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button,Input,Image} from 'react-native-elements';
import { onAuthStateChanged,signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const LoginScreen = ({navigation}) => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(user)=>{
            if(user){
                navigation.replace("Home")
            }
        });
        return unsubscribe;
    },[]);
    const signIn =()=>{
        if(email==='' && password===''){
            alert("Enter details to SignIn!")
        }else{
            signInWithEmailAndPassword(auth,email,password)
            .then((res)=>{
                console.log(res)
                setEmail('');
                setPassword('');
                navigation.navigate("Home")
            })
            .catch(error=>alert('Please enter correct details'));
        }
    }
    return (
        <View style={styles.container}>
            <Image source={require("../assets/CoVigilence.png")}
                style={{width:200,height:200}}

                />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autoFocus type="Email" value={email} onChangeText={(text)=>setEmail(text)}/>
                <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text)=>setPassword(text)}/>
            </View>
            <Button buttonStyle={{ backgroundColor: '#FF5678' }} raised containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button buttonStyle={{ borderColor: '#FF5678' }} titleStyle={{ color: '#FF5678' }} containerStyle={styles.button} onPress={()=>navigation.navigate("Register")} type="outline" title="Register" />
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white',
         
    },
    inputContainer:{
        width:300,

    },
    button:{
        width:200,
        marginTop:10,
        color:'red',
    },
});
