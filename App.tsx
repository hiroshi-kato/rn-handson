import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, FlatList } from 'react-native';

import EetBox, { Eet } from './components/Eet';
import Input from './components/Input';

export default function App() {
  const user = 'mame-daifuku';
  const [eetList, setEetList] = useState<Eet[]>([]);
  const addEet = (text: string) => {
    const date = new Date();
    const yymmdd = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
    const newEet = eetList.slice().concat({
      text,
      id: Date.now().toString(),
      like: false,
      date: yymmdd,
      user,
    });
    setEetList(newEet);
  };
  const onLike = (index: number) => {
    const newEet = eetList.slice().map((elm, i) => {
      if (i === index) {
        return { ...elm, like: !elm.like };
      } else {
        return elm;
      }
    });

    setEetList(newEet);
  };
  const onDelete = (index: number) => {
    const newEet = eetList.filter((_, i) => i !== index);
    setEetList(newEet);
  };
  const editEet = (id: string, text: string) => {
    const newEet = eetList.slice().map((elm) => {
      if (elm.id === id) {
        return { ...elm, text };
      } else {
        return elm;
      }
    });

    setEetList(newEet);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Input addEet={addEet}></Input>
        <View style={styles.content}>
          <FlatList
            data={eetList}
            renderItem={({ item, index }) => (
              <EetBox
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
  content: {
    padding: 20,
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 50,
  },
});
