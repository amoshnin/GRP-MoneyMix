// PLUGINS IMPORTS //
import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  onPress: () => void
}

const PlusButton: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.plus} onPress={props.onPress}>
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  plus: {
    backgroundColor: "#674ABE",
    borderRadius: 20,
    padding: 5,
    alignSelf: "center",
    alignItems: "center",
    marginRight: 30,
  },
})

export default React.memo(PlusButton, isEqualMemoComparison)
