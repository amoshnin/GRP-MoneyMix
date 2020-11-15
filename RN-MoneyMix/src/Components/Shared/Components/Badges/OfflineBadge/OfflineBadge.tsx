// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  style?: any

  iconSize?: number
  removeIcon?: boolean
}

const OfflineBadge: React.FC<PropsType> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {!props.removeIcon && (
        <Feather name="wifi-off" size={props.iconSize || 12} color="#512DA8" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    padding: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F4B400",
    position: "absolute",
  },
})

export default React.memo(OfflineBadge, isEqualMemoComparison)
