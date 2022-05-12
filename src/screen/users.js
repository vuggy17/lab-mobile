import {
  View,
  Text,
  Button,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {loadOptions} from '@babel/core';
import {deleteUser, getDBConnection} from '../modules/sqllite.module';

const UserList = ({initData, load, deleteu, updateu}) => {
  // load();
  const onDelete = async id => {
    const db = await getDBConnection();
    deleteUser(db, id);
    deleteu(id);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [edit, setEdit] = useState();

  const handlePress = itemId => {
    setModalVisible(true);
    setEdit(initData.find(item => item.id === itemId));
  };

  const handleSave = () => {
    updateu(edit);
    setModalVisible(!modalVisible);
  };
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={initData}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>{item.age}</Text>
              <TouchableHighlight
                style={{backgroundColor: 'red'}}
                onPress={() => onDelete(item.id)}>
                <View>
                  <Text>Del </Text>
                </View>
              </TouchableHighlight>
            </View>
          </TouchableOpacity>
        )}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text> User info</Text>
              <TextInput
                placeholder="name"
                style={styles.input}
                onChangeText={name => setEdit({...edit, name: name})}
                defaultValue={edit?.name}
              />
              <TextInput
                placeholder="age"
                style={styles.input}
                defaultValue={edit?.age}
                onChangeText={age => setEdit({...edit, age: age})}
              />
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleSave()}>
                <Text style={styles.textStyle}>Save</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default function Users(props) {
  return (
    <View style={{flex: 1}}>
      {props.initData?.length > 0 ? (
        <UserList {...props} />
      ) : (
        <Text>No user</Text>
      )}
      <Button
        title="Add user"
        onPress={() => props.navigation.navigate('Add')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    height: 500,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
