import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Mytext from './components/MyText';
import Mybutton from './components/MyButton';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

var db = SQLite.openDatabase('UserDatabase.db');

const HomeScreen = ({navigation}) => {

  db.transaction(function(txn){
    txn.executeSql(
      "SELECT name FROM sqlite_master WHERE type='TABLE' AND name='table_user'",
      [],
      function(tx,res){
        console.log('item:', res.rows.length);
        if(res.rows.length === 0){
          txn.executeSql('DROP TABLE IF EXISTS table_user', []);
          txn.executeSql(
            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
            []
          );
        }
    });
  });
    return (
        <View style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
            <Mytext text="SQLite Example" />
        <Mybutton
          title="Register"
          customClick={() => navigation.navigate('Register')}
        />
        <Mybutton
          title="Update"
          customClick={() => navigation.navigate('Update')}
        />
        <Mybutton
          title="View"
          customClick={() => navigation.navigate('View')}
        />
        <Mybutton
          title="View All"
          customClick={() => navigation.navigate('ViewAll')}
        />
        <Mybutton
          title="Delete"
          customClick={() => navigation.navigate('Delete')}
        />
        </View>
    )
}

export default HomeScreen;