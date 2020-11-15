// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  filled: boolean
}

const PassFillCube: React.FC<PropsType> = (props) => {
  return (
    <View
      style={[styles.container, props.filled && { backgroundColor: "white" }]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 20,
    height: 18,
    width: 18,
    borderRadius: 4,
  },
})

export default React.memo(PassFillCube, isEqualMemoComparison)
