import React from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TextInput } from 'react-native';
import ListItem from './component/ListItem';
import TextInputDialog from './component/TextInputDialog';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clickType: '',
      selectedKey: '',
      items: [],
      text: '',
      showTextInputDialog: false,
      dialogTitle: ''
    };
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInputDialog
          display={this.state.showTextInputDialog}
          dialogTitle={this.state.dialogTitle}
          confirmAction={this.doOnConfirm}
          cancelAction={this.doOnCancel}>

        </TextInputDialog>

        <View style={styles.header}>
          <Text style={styles.headerText}> TO DO List </Text>
        </View>

        <FlatList style={styles.flatList}
          data={this.state.items}
          keyExtractor={item => item.id}
          extraData={this.state}
          renderItem={({ item }) =>
            <ListItem
              itemKey={item.id}
              title={item.title}
              date={item.date}
              deleteMethod={() => this.deleteClick(item.id)}
              editMethod={() => this.editClick(item.id)} />} />

        <TouchableOpacity style={styles.addButton}
          onPress={this.addClick}>
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
      </View>
    );
  }

  doOnConfirm = (text) => {
    if (this.state.clickType === ClickType.ADD) {
      this.addItem(text);
      console.log("add new todo to todo list");
    } else if (this.state.clickType === ClickType.EDIT) {
      this.editItem(text);
      console.log("update todo description from todo list");
    }
    this.setState({
      clickType: '',
      showTextInputDialog: false
    })
  }

  doOnCancel = () => {
    console.log("Cancal!");
    this.setState({
      clickType: '',
      showTextInputDialog: false
    })
  }

  addItem = (text) => {
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

  editItem = (text) => {
    const time = this.getCurrentTime(new Date());
    const items = this.state.items;
    const item = items.find(item => item.id === this.state.selectedKey)
    if (item) {
      item['title'] = text
      item['date'] = time
    }
    this.setState({
      selectedKey: '',
      items: items,
      text: ''
    })
  }

  getUniqueId = (text, date) => {
    return date.getUTCMilliseconds() + text;
  }

  getCurrentTime = (date) => {
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
      + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  addClick = () => {
    this.setState({
      clickType: ClickType.ADD,
      showTextInputDialog: true,
      dialogTitle: 'add new ToDo'
    });
  }

  deleteClick = (key) => {
    const items = this.state.items;
    items.splice(key, 1);
    this.setState({
      selectedKey: '',
      items: items
    })
  }

  editClick = (key) => {
    this.setState({
      clickType: ClickType.EDIT,
      selectedKey: key,
      showTextInputDialog: true,
      dialogTitle: 'edit exist ToDo'
    });
  }

}

const ClickType = {
  ADD: Symbol('ADD'),
  EDIT: Symbol('EDIT')
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
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    padding: 26
  },
  flatList: {
    flex: 1
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10
  },
  textInput: {
    height: 50,
    alignSelf: 'stretch',
    color: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 20,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 20,
    backgroundColor: '#E91E63',
    width: 60,
    height: 60,
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
