// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import {
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  value: string
}

const SectionBlock: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.value}>{sliceString(String(props.value), 9)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    borderWidth: 1,
    flex: 1,
    borderColor: "rgba(0, 0, 0, 0.15)",
    paddingVertical: 7,
  },

  title: {
    opacity: 0.5,
    color: "black",
  },

  value: {
    color: "#FF555B",
  },
})

export default React.memo(SectionBlock, isEqualMemoComparison)
