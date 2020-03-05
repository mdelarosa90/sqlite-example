import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import Mytextinput from './components/MyTextInput';
import Mybutton from './components/MyButton';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var db = SQLite.openDatabase('UserDatabase.db');

const UpdateUser = ({navigation}) => {
  const [input_user_id, setUserID] = useState('');
  const [userData, setUserData] = useState('');

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
                    setUserData(results.rows.item(0));
                } else {
                    alert('No user found');
                    setUserData('');
                }
            }
        );
    });
};

  return (
    <View>
        <Mytextinput
          placeholder="Enter User Id"
          onChangeText={input_user_id => setUserID(input_user_id)}
          style={{ padding:10 }}
        />
        <Mybutton
          title="Search User"
          customClick={searchUser.bind(this)}
        />
        <View style={{ marginLeft: 35, marginRight: 35, marginTop: 10 }}>
          <Text>User Id: {userData.user_id}</Text>
          <Text>User Name: {userData.user_name}</Text>
          <Text>User Contact: {userData.user_contact}</Text>
          <Text>User Address: {userData.user_address}</Text>
        </View>
      </View>
  );
}

export default UpdateUser;