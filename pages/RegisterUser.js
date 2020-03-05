import React, { Component, useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import Mytextinput from './components/MyTextInput';
import Mybutton from './components/MyButton';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var db = SQLite.openDatabase('UserDatabase.db');

const RegisterUser = ({navigation}) => {
    const [user_name, setUserName] = useState('');
    const [user_contact, setUserContact] = useState('');
    const [user_address, setUserAddress] = useState('');

    const register_user = () => {
        if (user_name) {
            if (user_contact) {
                if (user_address) {
                    db.transaction(function(tx){
                        tx.executeSql(
                            'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
                            [user_name, user_contact, user_address],
                            (tx, results) => {
                                console.log('Results', results.rowsAffected);
                                if (results.rowsAffected > 0){
                                    Alert.alert(
                                        'Success',
                                        'You are Registerd Successfully',
                                        [
                                            {
                                                text: 'Ok',
                                                onPress: () => navigation.navigate('Home'),
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                                } else {
                                    alert('Registration Failed');
                                }
                            }
                        );
                    });
                } else {
                    alert('Please fill Address');
                }
            } else {
                alert('Please fill Contact Number');
            }
        } else {
            alert('Please fill Name');
        }
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={user_name => setUserName(user_name)}
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={user_contact => setUserContact(user_contact)}
              maxLength={10}
              keyboardType="numeric"
              style={{ padding:10 }}
            />
            <Mytextinput
              placeholder="Enter Address"
              onChangeText={user_address =>setUserAddress(user_address)}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{ textAlignVertical: 'top',padding:10 }}
            />
            <Mybutton
              title="Submit"
              customClick={register_user.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
}

export default RegisterUser;

