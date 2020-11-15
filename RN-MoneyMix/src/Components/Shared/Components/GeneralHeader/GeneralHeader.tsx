// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  leftIcons?: any
  middleContent: any
  rightIcons?: any

  middleContentStyles?: any
  rightIconsWrapStyle?: any
}

const GeneralHeader: React.FC<PropsType> = (props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <View style={styles.content}>
          <View>{props.leftIcons && props.leftIcons}</View>

          <View style={props.middleContentStyles}>{props.middleContent}</View>
        </View>
        <View style={[styles.right_icon, props.rightIconsWrapStyle]}>
          {props.rightIcons}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#674ABE",
    alignItems: "center",
  },

  background: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: "#674ABE",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  right_icon: {
    marginHorizontal: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
})

export default React.memo(GeneralHeader, isEqualMemoComparison)
