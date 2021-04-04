import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type InputProps = {
  addEet: (text: string) => void;
};

function Input({ addEet }: InputProps) {
  const [text, setText] = useState('');
  const onPress = () => {
    addEet(text);
    setText('');
  };
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={(_text) => setText(_text)}
        value={text}
      ></TextInput>
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
        disabled={!text}
      >
        <Text style={styles.buttonText}>イートする</Text>
      </TouchableOpacity>
    </View>
  );
}

const eetStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: 'rgb(29,161,242)',
    marginBottom: 10,
    borderRadius: 5,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  user: {
    color: 'white',
    fontWeight: '900',
    marginBottom: 5,
  },
  date: {
    color: 'white',
    marginLeft: 'auto',
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  actionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    // alignItems: 'flex-start',
    // justifyContent: 'center',
    paddingTop: 5,
    marginTop: 20,
    flexDirection: 'row',
  },
  userAction: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  edit: {
    marginRight: 20,
  },
});

function Eet({
  id,
  text,
  like,
  date,
  user,
  onLike,
  onDelete,
  editEet,
}: {
  id: string;
  text: string;
  like: boolean;
  date: string;
  user?: string;
  onLike: () => void;
  onDelete: () => void;
  editEet: (id: string, text: string) => void;
}) {
  const [editText, setEditText] = useState(text);
  const [isEdit, setIsEdit] = useState(false);
  const toggleEdit = () => {
    if (isEdit) {
      editEet(id, editText);
    }
    setIsEdit(!isEdit);
  };
  return (
    <View style={eetStyles.container}>
      <View style={eetStyles.header}>
        <Text style={eetStyles.user}>{user || 'unknown'}</Text>
        <Text style={eetStyles.date}>{date}</Text>
      </View>
      {!isEdit ? (
        <Text style={eetStyles.text}>{text}</Text>
      ) : (
        <TextInput
          style={styles.input}
          value={editText}
          onChangeText={(_text) => setEditText(_text)}
        />
      )}
      <View style={eetStyles.actionContainer}>
        <TouchableOpacity onPress={onLike}>
          {like ? (
            <Ionicons
              name='heart-circle-sharp'
              size={22}
              color='rgb(252,108,133)'
            />
          ) : (
            <Ionicons name='heart-circle-outline' size={22} color='#aaa' />
          )}
        </TouchableOpacity>
        <View style={eetStyles.userAction}>
          <TouchableOpacity style={eetStyles.edit} onPress={toggleEdit}>
            <Ionicons name='ios-pencil' size={22} color='gray' />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Ionicons name='trash-outline' size={22} color='gray' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

type Eet = {
  text: string;
  id: string;
  like: boolean;
  date: string;
  user?: string;
};

export default function App() {
  const user = 'mame-daifuku';
  const [eet, setEet] = useState<Eet[]>([]);
  const addEet = (text: string) => {
    const date = new Date();
    const yymmdd = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    const newEet = eet.slice().concat({
      text,
      id: Date.now().toString(),
      like: false,
      date: yymmdd,
      user,
    });
    setEet(newEet);
  };
  const onLike = (index: number) => {
    const newEet = eet.slice();
    newEet[index].like = !newEet[index].like;
    setEet(newEet);
  };
  const onDelete = (index: number) => {
    const newEet = eet.filter((_, i) => i !== index);
    setEet(newEet);
  };
  const editEet = (id: string, text: string) => {
    const newEet = eet.slice().map((elm) => {
      if (elm.id === id) {
        return { ...elm, text };
      } else {
        return elm;
      }
    });

    setEet(newEet);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input addEet={addEet}></Input>
        <View style={styles.content}>
          <FlatList
            data={eet}
            renderItem={({ item, index }) => (
              <Eet
                id={item.id}
                text={item.text}
                like={item.like}
                date={item.date}
                user={item.user}
                onLike={() => {
                  onLike(index);
                }}
                onDelete={() => {
                  onDelete(index);
                }}
                editEet={editEet}
              />
            )}
            // keyExtractor={(item) => item.id.toString()} // もとから文字列
            contentContainerStyle={styles.contentContainer}
          />
        </View>
        <StatusBar style='light'></StatusBar>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#222',
  },
  container: {
    flex: 1,
    paddingTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: 'rgb(29,161,242)',
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    color: 'white',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgb(29,161,242)',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 16,
  },
  content: {
    padding: 20,
    flex: 1,
  },
  contentText: {
    color: 'white',
    fontSize: 22,
  },
  contentContainer: {
    paddingBottom: 50,
  },
});
