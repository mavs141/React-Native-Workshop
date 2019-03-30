import React from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import ListItem from './component/ListItem';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      text: ''
    };
  }

  render() {


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> -NOTER- </Text>
        </View>

        <FlatList
          data={this.state.items}
          renderItem={
            ({ item }) =>
              <ListItem
                itemKey={item.id}
                title={item.title}
                date={item.date}
                deleteMethod={() => this.deleteClick(item.id)}
                editMethod={() => this.editClick(item.id)} />
          }
          keyExtractor={item => item.id}
          extraData={this.state} />

        <View style={styles.footer} >

          <TextInput style={styles.textInput}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            placeholder='>input note description'
            placeholderTextColor='white'
            underlineColorAndroid='transparent'>
          </TextInput>

        </View>

        <TouchableOpacity style={styles.addButton}
          onPress={this.addClick}>
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
      </View>
    );
  }

  getUniqueId = (text, date) => {
    return date.getUTCMilliseconds() + text
  }

  getCurrentTime = (date) => {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  }

  addClick = () => {
    if (this.state.text) {
      const text = this.state.text;
      const time = this.getCurrentTime(new Date());
      const id = this.getUniqueId(text, new Date());
      const items = this.state.items;
      items.push({
        'id': id,
        'date': time,
        'title': text
      });

      this.setState({
        items: items,
        text: ''
      })
    }
  }

  deleteClick = (key) => {
    const items = this.state.items;
    items.splice(key, 1);
    this.setState({ items: items })
  }

  editClick = (key) => {
    if (this.state.text) {
      const text = this.state.text;
      const time = this.getCurrentTime(new Date());
      const items = this.state.items;

      let item = items.find(item => item.id === key)
      if (item) {
        item['title'] = text
        item['date'] = time
      }
      this.setState({
        items: items,
        text: ''
      })
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    width: '100%',
    backgroundColor: 'black'
  },
  header: {
    backgroundColor: '#E91E63',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8
  },
  addButtonText: {
    color: '#fff',
    fontSize: 34
  }
});
