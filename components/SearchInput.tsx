import React, { useState } from 'react'
import { View, TextInput, StyleSheet } from 'react-native'

interface IProps {
    placeholder: string,
    setLocation: Function,
}

function SearchInput({ placeholder, setLocation }: IProps) {

    const [value, setValue] = useState('')
    const onSubmit = () => {
        if (value.length) setLocation(value)
    }

    return <View>
        <TextInput
            autoCorrect={false}
            placeholder={placeholder}
            placeholderTextColor="white"
            style={styles.textInput}
            clearButtonMode="always"
            underlineColorAndroid="transparent"
            onChangeText={setValue}
            onSubmitEditing={onSubmit}
        />
    </View>
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#666',
        color: 'white',
        height: 40,
        width: 300,
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
        borderRadius: 5,
    }
})

export default SearchInput