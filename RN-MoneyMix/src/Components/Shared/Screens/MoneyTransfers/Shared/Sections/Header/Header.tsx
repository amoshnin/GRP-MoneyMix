// PLUGINS IMPORTS //
import React from "react"
import { Text, StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"

// COMPONENTS IMPORTS //
import GeneralHeader from "~/Components/Shared/Components/GeneralHeader/GeneralHeader"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  title: string
}

const Header: React.FC<PropsType> = (props) => {
  return (
    <GeneralHeader
      middleContent={<Text style={styles.title}>{props.title}</Text>}
      middleContentStyles={styles.middle_content}
      leftIcons={
        <BorderlessButton
          rippleColor="#808080"
          style={styles.button}
          hitSlop={{ horizontal: 20, vertical: 20 }}
          onPress={() => props.navigation.navigate("BottomTabNavigator")}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </BorderlessButton>
      }
    />
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: "white",
    letterSpacing: 0.3,
    alignSelf: "center",
  },

  middle_content: {
    flex: 1,
    marginRight: "10%",
  },

  button: {
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
})

export default React.memo(Header, isEqualMemoComparison)
