import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';

const Dimensions = require('Dimensions');
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class TextInputDialog extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <Modal
                visible={this.props.display}
                animationType='slide'
                onRequestClose={() => { }} // need this on android device
                transparent={true}>

                <View style={styles.bg}>
                    <View style={styles.dialog}>
                        <View style={styles.dialogTitleView}>
                            <Text style={styles.dialogTitle}>
                                {this.props.dialogTitle}
                            </Text>
                        </View>

                        <TextInput style={styles.textInput}
                            onChangeText={(text) => this.setState({ text })}
                            value={this.state.text}
                            placeholder='enter description'
                            placeholderTextColor='gray'>
                        </TextInput>

                        <View style={styles.dialogBtnView}>

                            <TouchableHighlight style={styles.dialogBtnViewItem}
                                onPress={this.onCancelClick}>
                                <Text style={styles.leftButton}>Cancel</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={styles.dialogBtnViewItem}
                                onPress={this.onConfirmClick}>
                                <Text style={styles.rightButton}>Confirm</Text>
                            </TouchableHighlight>

                        </View>

                    </View>
                </View>
            </Modal>
        );
    }

    onCancelClick = () => {
        this.setState({ text: '' })
        this.props.cancelAction();
    }

    onConfirmClick = () => {
        if (this.state.text) {
            this.props.confirmAction(this.state.text);
        }
        this.setState({ text: '' })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    textInput: {
        height: 50,
        alignSelf: 'stretch',
        color: 'black',
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 20,
        backgroundColor: '#FFF8DC',
        borderTopWidth: 2,
        borderTopColor: '#ededed'
    },
    bg: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.20,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    dialogTitleView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.08,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E91E63',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
    },
    dialogTitle: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
    dialogContentView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialogContent: {
        textAlign: 'center',
        fontSize: 16,
        color: '#4A4A4A',
    },
    dialogBtnView: {
        width: SCREEN_WIDTH * 0.8,
        height: SCREEN_HEIGHT * 0.08,
        flexDirection: 'row',
    },
    dialogBtnViewItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCEEFF',
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    leftButton: {
        fontSize: 18,
        color: 'black',
        borderBottomLeftRadius: 2,
    },
    rightButton: {
        fontSize: 18,
        color: 'black',
        borderBottomRightRadius: 2,
    }
});