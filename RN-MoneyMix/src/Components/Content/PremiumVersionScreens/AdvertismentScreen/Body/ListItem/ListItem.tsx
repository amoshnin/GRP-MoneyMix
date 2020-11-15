// PLUGINS IMPORTS //
import React from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { RectButton } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  desc: string
  image: any
}

const ListItem: React.FC<PropsType> = (props) => {
  return (
    <RectButton style={styles.container}>
      <Image source={props.image} style={styles.image} />
      <View style={styles.text_wrap}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.desc}>{props.desc}</Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 31,
    paddingHorizontal: 14,
  },

  image: {
    width: 95,
    height: "100%",
    resizeMode: "center",
  },

  text_wrap: {
    marginHorizontal: 25,
    marginRight: 85,
  },

  title: {
    fontSize: 17,
    color: "#232323",
    marginBottom: 4,
    fontWeight: "bold",
  },

  desc: {
    color: "#232323",
    opacity: 0.5,
    fontSize: 14.5,
  },
})

export default React.memo(ListItem, isEqualMemoComparison)
