// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { RectButton } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  number?: any
  onPress?: any
}

const NumPadItem: React.FC<PropsType> = (props) => {
  return (
    <RectButton style={styles.wrapper} onPress={props.onPress}>
      <View style={styles.container}>{props.number}</View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    borderWidth: 0.5,
    borderColor: "#DCDCDC",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default React.memo(NumPadItem, isEqualMemoComparison)
