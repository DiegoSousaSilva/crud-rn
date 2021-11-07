import React, {useContext} from 'react';
import {View, FlatList, Alert} from 'react-native';
import {ListItem, Avatar, Button, Icon} from 'react-native-elements';
import UsersContext from '../context/UsersContext';
//import users from '../data/users';

const UserList = ({navigation}) => {
  const {state, dispatch} = useContext(UsersContext);

  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuario', 'Deseja excluir o usuario?', [
      {
        text: 'SIM',
        onPress() {
          dispatch({
            type: 'deleteUser',
            payload: user,
          });
        },
      },
      {
        text: 'NÃO',
      },
    ]);
  }

  function getActions(user) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={() => navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="orange" />}
        />

        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </View>
    );
  }

  function getUserItem({item: user}) {
    return (
      <ListItem key={user.id} bottomDivider>
        <Avatar rounded source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Content right>{getActions(user)}</ListItem.Content>
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={state.users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};

export default UserList;
