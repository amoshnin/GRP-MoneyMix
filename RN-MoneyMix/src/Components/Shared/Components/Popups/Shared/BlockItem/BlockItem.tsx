// PLUGINS IMPORTS //
import React from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  icon: any
  title: string
  subtitle?: string
  onPress?: any

  containerStyle?: any
}

const BlockItem: React.FC<PropsType> = (props) => {
  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={() => props.onPress && props.onPress()}
    >
      {props.icon}
      <Text style={styles.title}>{props.title}</Text>
      {props.subtitle && <Text style={styles.subtitle}>{props.subtitle}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.5,
    borderColor: "silver",
    width: "50%",
    paddingVertical: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    opacity: 0.8,
    marginTop: 7,
    color: "black",
  },

  subtitle: {
    opacity: 0.5,
    color: "black",
  },
})

export default React.memo(BlockItem, isEqualMemoComparison)
