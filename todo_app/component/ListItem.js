import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

export default class ListItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container} key={this.props.id}>
                <TouchableOpacity style={styles.itemInfo} onPress={this.props.editMethod} >
                    <Text style={styles.textStyle}>{this.props.date}</Text>
                    <Text style={styles.textStyle}>{this.props.title}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={this.props.deleteMethod}>
                    <Text style={styles.deleteButtonText}> - </Text>
                </TouchableOpacity>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'yellow',
        position: 'relative',
        borderBottomWidth: 2,
        borderBottomColor: 'red'
    },
    itemInfo: {
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
    },
    textStyle: {
        padding: 10,
        fontSize: 18,
        height: 44
    },
    deleteButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        padding: 10,
        top: 10,
        right: 10,
        bottom: 10
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 34
    }
});