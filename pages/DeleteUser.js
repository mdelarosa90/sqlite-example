import React, { Component, useState } from 'react';
import { View, Text, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Mytextinput from './components/MyTextInput';
import Mybutton from './components/MyButton';
import * as SQLite from 'expo-sqlite';
var db = SQLite.openDatabase('UserDatabase.db');

const DeleteUser = ({navigation}) => {
    const [input_user_id, setUserID] = useState('');

    const deleteUser = () => {
        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM table_user where user_id=?',
                [input_user_id],
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'User Deleted Succesfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Home')
                                },
                            ],
                            { cancelable: false }
                        )
                    } else {
                        alert('Please insert a valid User ID');
                    }
                }
            );
        });
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
        <Mytextinput
          placeholder="Enter User Id"
          onChangeText={input_user_id => setUserID(input_user_id)}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Delete User"
          customClick={deleteUser.bind(this)}
        />
      </View>
    )
}

export default DeleteUser;