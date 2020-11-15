// PLUGINS IMPORTS //
import React from "react"
import { TouchableOpacity, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  backgroundColor?: string
  borderColor?: string

  onPress?: any
  children: any
}

const ButtonItem: React.FC<PropsType> = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[
        styles.container,
        { borderColor: props.borderColor || "transparent", borderWidth: 1 },
        { backgroundColor: props.backgroundColor },
      ]}
    >
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 1000,
    height: 64,
    width: 64,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default React.memo(ButtonItem, isEqualMemoComparison)
