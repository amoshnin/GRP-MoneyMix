// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { BaseButton } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  icon?: any
  content?: any

  onPress?: any
  isGray?: boolean
  removeRipple?: boolean
  containerStyle?: any
  internalContainerStyle?: any
}

const BlockItem: React.FC<PropsType> = (props) => {
  return (
    <BaseButton
      style={[
        styles.wrapper,
        { height: 72, width: 72, flex: 1 },
        props.containerStyle,
        props.isGray && { backgroundColor: "#F5F4F4" },
      ]}
      rippleColor={"gray"}
      enabled={!props.removeRipple}
      onPress={() => (props.onPress ? props.onPress() : undefined)}
    >
      <View style={[styles.container, props.internalContainerStyle]}>
        {props.icon}

        {props.content && props.content}
      </View>
    </BaseButton>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    width: 80,
    backgroundColor: "white",
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderColor: "#EBEBEB",
    borderWidth: 0.5,
  },
})

export default React.memo(BlockItem, isEqualMemoComparison)
