import React,{useState} from 'react'
import { StyleSheet, View,KeyboardAvoidingView } from 'react-native'
import {Button,Input,Image,Text} from 'react-native-elements';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth';
import { getDatabase, ref, onValue, set } from 'firebase/database';
const RegisterScreen = ({navigation}) => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const register=()=>{
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential)=>{
            updateProfile(userCredential.user,{
                displayName:name
            });
            const db = getDatabase();
            const reference = ref(db, 'users/' + auth.currentUser.uid);
            set(reference, {
                'name':name,
            });
        }).catch(error=>alert(error.message))
    }
    return (
        <KeyboardAvoidingView  style={styles.container}>
           <View style={styles.inputContainer}>
           <Text h3 style={{marginBottom:50}}>Create An Account</Text>
                <Input 
                    placeholder="Full Name" 
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={text=>setName(text)}
                />
                <Input 
                    placeholder="Email" 
                    type="email"
                    value={email}
                    onChangeText={text=>setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={text=>setPassword(text)}
                    onSubmitEditing={register}
                />


            </View>
            <Button
                buttonStyle={{ backgroundColor: '#FF5678' }}
                containerStyle={styles.button}
                raised 
                onPress={register}
                title='Register'
            /> 
            <Button

                containerStyle={styles.button}
                buttonStyle={{ borderColor: '#FF5678' }} titleStyle={{ color: '#FF5678' }}
                type="outline"
                onPress={()=>navigation.navigate("Login")}
                title='Back to Login'
            /> 
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        padding:10,
        backgroundColor:'white',
    },
    button:{
        width:200,
        marginTop:10,
    },
    inputContainer:{
        width:300,
    },
})

