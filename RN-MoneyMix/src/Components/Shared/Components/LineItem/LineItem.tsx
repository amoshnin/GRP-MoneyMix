// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { RectButton } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  icon: any
  onPress: () => void

  styles?: any
}

const LineItem: React.FC<PropsType> = (props) => {
  return (
    <RectButton
      style={[styles.container, props.styles]}
      onPress={props.onPress}
      rippleColor="silver"
    >
      <View style={styles.icon}>{props.icon}</View>
      <Text style={styles.text}>{props.title}</Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "113%",
    paddingHorizontal: 18,
  },

  icon: {
    width: 35,
  },

  text: {
    color: "black",
  },
})

export default React.memo(LineItem, isEqualMemoComparison)
