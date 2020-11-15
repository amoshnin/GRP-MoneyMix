// PLUGINS IMPORTS //
import React from "react"
import { Text, TouchableOpacity, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  subtitle: string

  onPress?: any
}

const LineItem: React.FC<PropsType> = (props) => {
  return (
    <TouchableOpacity
      onPress={() => (props.onPress ? props.onPress() : undefined)}
    >
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.subtitle}>{props.subtitle}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 15,
    opacity: 0.8,
    marginBottom: 1,
    color: "black",
  },

  subtitle: {
    color: "#674ABE",
  },
})

export default React.memo(LineItem, isEqualMemoComparison)
