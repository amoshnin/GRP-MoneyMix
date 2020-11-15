// PLUGINS IMPORTS //
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  action?: any
  icon?: any

  onPress?: any
}

const LineItem: React.FC<PropsType> = (props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.icon && { justifyContent: "flex-start", alignItems: "center" },
      ]}
      onPress={props.onPress ? () => props.onPress() : undefined}
    >
      {props.icon && props.icon}
      <Text style={[styles.title, props.icon && styles.title_w_icon]}>
        {props.title}
      </Text>
      {props.action}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 16,
    color: "black",
  },

  title_w_icon: {
    marginLeft: 10,
    color: "red",
  },
})

export default React.memo(LineItem, isEqualMemoComparison)
