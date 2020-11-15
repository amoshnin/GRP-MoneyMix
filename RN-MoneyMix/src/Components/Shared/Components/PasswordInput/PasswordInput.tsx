// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { TextInput } from "react-native-paper"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Entypo } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  value: string
  placeholder: string

  styles?: any
  onBlur?: any
  onChangeText: (text: string) => void
}

const PasswordInput: React.FC<PropsType> = (props) => {
  const [passwordShown, setPasswordShown] = useState(false as boolean)

  return (
    <View>
      <TextInput
        accessibilityStates
        label={props.placeholder}
        placeholderTextColor="rgba(26, 24, 36, 0.5)"
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        secureTextEntry={!passwordShown}
        textContentType="password"
        autoCompleteType="password"
        value={props.value}
        style={[styles.input, props.styles]}
      />
      <TouchableOpacity
        style={styles.eye_icon}
        onPress={() => setPasswordShown(!passwordShown)}
      >
        {passwordShown ? (
          <Entypo name="eye-with-line" size={24} color="black" />
        ) : (
          <Entypo name="eye" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  )
}

//   STYLES   //
const styles = StyleSheet.create({
  input: {
    width: 315,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "white",
    paddingRight: 35,
  },

  eye_icon: {
    position: "absolute",
    right: 10,
    bottom: 29,
  },
})

export default React.memo(PasswordInput, isEqualMemoComparison)
