import React, { Component, useState } from 'react';
import { View, YellowBox, ScrollView, KeyboardAvoidingView, Alert, } from 'react-native';
import Mytextinput from './components/MyTextInput';
import Mybutton from './components/MyButton';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('UserDatabase.db');

const UpdateUser = ({navigation}) => {
    const [user_name, setUserName] = useState('');
    const [user_contact, setUserContact] = useState('');
    const [user_address, setUserAddress] = useState('');
    const [input_user_id, setUserID] = useState('');

    const searchUser = () => {
        console.log(input_user_id);
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM table_user where user_id = ?',
                [input_user_id],
                (tx, results) => {
                    var len = results.rows.length;
                    console.log('len', len);
                    if (len > 0) {
                        console.log(results.rows.item(0).user_contact);
                        setUserName(results.rows.item(0).user_name);
                        setUserContact(results.rows.item(0).user_contact);
                        setUserAddress(results.rows.item(0).user_address);
                    } else {
                        alert('No user found');
                        setUserName('');
                        setUserContact('');
                        setUserAddress('');
                    }
                }
            );
        });
    };
    const updateUser = () => {
        if (user_name) {
            if (user_contact) {
                if (user_address) {
                    db.transaction((tx) => {
                        tx.executeSql(
                            'UPDATE table_user set user_name=?, user_contact=?, user_address=? where user_id=?',
                            [user_name, user_contact, user_address, input_user_id],
                            (tx, results) => {
                                console.log('Results', results.rowsAffected);
                                if (results.rowsAffected > 0) {
                                    Alert.alert('Success', 'User updated successfully',
                                        [
                                            { text: 'Ok', onPress: () => navigation.navigate('Home')},
                                        ],
                                        { cancelable: false }
                                    );
                                } else {
                                    alert('Updation Failed');
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
    }
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior="padding"
            style={{ flex: 1, justifyContent: 'space-between' }}>
            <Mytextinput
              placeholder="Enter User Id"
              style={{ padding:10 }}
              onChangeText={input_user_id => setUserID(input_user_id)}
            />
            <Mybutton
              title="Search User"
              customClick={searchUser.bind(this)}
            />
            <Mytextinput
              placeholder="Enter Name"
              value={user_name}
              style={{ padding:10 }}
              onChangeText={user_name => setUserName(user_name)}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              value={''+ user_contact}
              onChangeText={user_contact => setUserContact(user_contact)}
              maxLength={10}
              style={{ padding:10 }}
              keyboardType="numeric"
            />
            <Mytextinput
              value={user_address}
              placeholder="Enter Address"
              onChangeText={user_address => setUserAddress(user_address)}
              maxLength={225}
              numberOfLines={5}
              multiline={true}
              style={{textAlignVertical : 'top', padding:10}}
            />
            <Mybutton
              title="Update User"
              customClick={updateUser.bind(this)}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    )
}

export default UpdateUser;