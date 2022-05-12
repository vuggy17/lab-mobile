import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import React, {useState} from 'react';
import {getDBConnection, saveUser} from '../modules/sqllite.module';

const AddUser = ({add, ...props}) => {
  const [name, setName] = useState();
  const [age, setAge] = useState();

  const handleSave = async () => {
    try {
      if (age && name && parseInt(age)) {
        const db = await getDBConnection();
        await saveUser(db, {name, age});
        add({name, age});
        props.navigation.navigate('Users');
      } else {
        throw new Error('missing field');
      }
    } catch (error) {
      console.warn('missing field');
    }
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.header}>Add user</Text>
      <TextInput
        placeholder="name"
        style={styles.input}
        onChangeText={setName}
        value={name}
      />
      <TextInput
        keyboardType="numeric"
        placeholder="age"
        style={styles.input}
        onChangeText={setAge}
        value={age}
      />
      <Button
        title="Add user"
        onPress={() => {
          handleSave();
        }}
      />
    </View>
  );
};

export default AddUser;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  header: {
    alignSelf: 'center',
    padding: 20,
    fontSize: 20,
  },
});
