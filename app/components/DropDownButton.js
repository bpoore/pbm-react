import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'

class DropDownButton extends Component {
    render(){
        return(
            <Button
                title={this.props.title}
                onPress={() => this.props.onPress()}
                buttonStyle={s.dropdown}
                titleStyle={{
                    color:"#260204",
                    fontSize:16
                }}
                style={{borderRadius: 5}}
                icon={<Ionicons name='md-arrow-dropdown' style={s.dropdownIcon} />}
                iconRight
                containerStyle={{marginTop:5,marginBottom:10,marginRight:10,marginLeft:10}}
            />
        )
    }
}

DropDownButton.propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    accessibilityLabel: PropTypes.string,
    icon: PropTypes.node,
    disabled: PropTypes.bool,
}

const s = StyleSheet.create({
    dropdown: {
        backgroundColor:"#dddddd",
        width: '100%',
        elevation: 0,
        borderColor: '#888888',borderWidth:2
    },
    dropdownIcon: {
        color: "#888888",
        fontSize: 32
    }
})

export default DropDownButton