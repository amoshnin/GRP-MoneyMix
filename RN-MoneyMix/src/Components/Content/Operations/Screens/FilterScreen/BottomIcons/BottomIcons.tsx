// PLUGINS IMPORTS //
import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  selectedFilters: Array<any>
  setSelectedFilters: (newSelectedFilters: Array<any>) => void
}

const BottomIcons: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.icon, { backgroundColor: "#DB4437" }]}
        onPress={() => {
          props.setSelectedFilters([])
          props.navigation.goBack()
        }}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.icon, { backgroundColor: "#01CA5C" }]}
        onPress={() => {
          props.navigation.navigate("OperationsMain", {
            selectedFilters: props.selectedFilters,
          })
        }}
      >
        <AntDesign name="check" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
  },

  icon: {
    backgroundColor: "#DB4437",
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default React.memo(BottomIcons, isEqualMemoComparison)
