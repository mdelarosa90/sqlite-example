import React, { Component, useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

var db = SQLite.openDatabase('UserDatabase.db');

const ViewAllUser = ({navigation}) => {
    const [flatListItems, setItems] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
                setItems(results.rows._array);
            });
        });
    }, []);

    const ListViewItemSeparator = () => {
        return (
            <View style={{ height: 0.2, width: '100%', backgroundColor: '#808080' }}>

            </View>
        );
    }

    return (
        <View>
        <FlatList
          data={flatListItems}
          ItemSeparatorComponent={ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item,index}) => (
            <View key={item.user_id} style={{ backgroundColor: 'white', padding: 20 }}>
              <Text>Id: {item.user_id}</Text>
              <Text>Name: {item.user_name}</Text>
              <Text>Contact: {item.user_contact}</Text>
              <Text>Address: {item.user_address}</Text>
            </View>
          )}
        />
      </View>
    )
}

export default ViewAllUser;