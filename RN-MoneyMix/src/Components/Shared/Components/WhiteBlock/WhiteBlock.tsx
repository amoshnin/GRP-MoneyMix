// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  containerStyle?: any
  children: any
}

const WhiteBlock: React.FC<PropsType> = (props) => {
  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    elevation: 30,
    marginRight: 16,
    paddingHorizontal: 17,
  },
})

export default React.memo(WhiteBlock, isEqualMemoComparison)
