// PLUGINS IMPORTS //
import React, { useState } from "react"
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  icon: any
  text: string
  onPress: () => void
}

const ButtonItem: React.FC<PropsType> = (props) => {
  const [loading, setLoading] = useState(false as boolean)

  return (
    <TouchableOpacity
      onPress={() => {
        setLoading(true)
        props.onPress()
      }}
      style={styles.container}
    >
      {loading ? (
        <ActivityIndicator color={"white"} style={styles.loading_icon} />
      ) : (
        <>
          {props.icon}
          <Text style={styles.text}>{props.text}</Text>
        </>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#674ABE",
    borderRadius: 6,
    width: 140,
    alignItems: "center",
  },

  text: {
    color: "white",
    flexWrap: "wrap",
    textAlign: "center",
    marginTop: 5,
  },

  loading_icon: {
    marginTop: "15%",
  },
})

export default React.memo(ButtonItem, isEqualMemoComparison)
