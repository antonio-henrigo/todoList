import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Image } from 'react-native';

import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {

    if (task.length < 8 || task === '') {
      alert("O texto deve ter pelo menos 8 caracteres.");
      return;
    }; 

    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask('');
    
  }

  const completeTask = (index) => {
    let itemsCopy  = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    
    <View style={styles.container}>
        
        <View style={styles.image}>
          <Image style={styles.logo} source={require('./assets/logo.png')} />
          <Text style={styles.sectionTitle}>Crie sua lista de taferas</Text>
        </View>

        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps='handled'>
        <View style={styles.taskWrapper}>
            <View style={styles.items}>
              {
                taskItems.map((item, index) => {
                  return (
                    <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                      <Task text={item} />
                    </TouchableOpacity>
                  )
                })
              }
            </View>
        </View>
        </ScrollView>
        
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? "padding" : "height"}
        style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Título da Tarefa'} value={task} minLength={8} onChangeText={text => setTask(text)}/>
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>Adicionar</Text>
            </View>
        </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    alignItems: 'center',
    marginTop: 50,
    margin: 20,
    justifyContent: 'center',
  },
  logo: {
    height: 120,
  },
  sectionTitle: {
    color: '#5ce1e6',
    fontWeight: 700,
    fontSize: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  taskWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 70,
  },
  items: {
    marginTop: 15,
  },
  writeTaskWrapper:  {
    position: 'absolute',
    bottom: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    fontSize: 28,
    },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#c0c0c0',
    borderWidth: 1,
    width: 350,
  },
  addWrapper: {
    margin: 25,
    width: 350,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#5ce1e6',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  addText: {
    fontSize: 18,
    color: '#fff',
  },

});
