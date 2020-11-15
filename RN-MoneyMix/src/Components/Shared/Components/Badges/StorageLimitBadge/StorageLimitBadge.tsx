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

const StorageLimitBadge: React.FC<PropsType> = (props) => {
  return (
    <View style={[styles.container, props.style]}>
      {!props.removeIcon && (
        <Feather
          name="alert-octagon"
          size={props.iconSize || 18.5}
          color="white"
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 28,
    width: 28,
    padding: 5,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF555B",
    position: "absolute",
  },
})

export default React.memo(StorageLimitBadge, isEqualMemoComparison)
