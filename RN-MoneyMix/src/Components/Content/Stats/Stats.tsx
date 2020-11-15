// PLUGINS IMPORTS //
import React from "react"
import { StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"

import { createStackNavigator } from "@react-navigation/stack"

// COMPONENTS IMPORTS //
import MainContainer from "./Screens/Main/MainContainer"

import GeneralHeader from "~/Components/Shared/Components/GeneralHeader/GeneralHeader"
import CalendarHeaderOptionContainer from "~/Components/Shared/Components/GeneralHeader/CalendarHeaderOption/CalendarHeaderOptionContainer"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  InitialDate: Date | string
  FinalDate: Date | string
}

const Stats: React.FC<PropsType> = (props) => {
  const Stack = createStackNavigator()

  return (
    <Stack.Navigator initialRouteName="StatsMain">
      <Stack.Screen
        name="StatsMain"
        component={MainContainer}
        options={({ navigation, route }: any) => ({
          header: () => (
            <GeneralHeader
              middleContent={<CalendarHeaderOptionContainer />}
              leftIcons={
                <BorderlessButton
                  rippleColor="#808080"
                  style={styles.header_icon}
                  hitSlop={{ horizontal: 20, vertical: 20 }}
                  onPress={() => navigation.openDrawer()}
                >
                  <Feather name="menu" size={24} color="white" />
                </BorderlessButton>
              }
              rightIconsWrapStyle={{
                width: 69,
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  header_text_wrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -50,
  },

  header_title: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },

  header_day: {
    backgroundColor: "white",
    paddingHorizontal: 5,
    borderRadius: 4,
    marginRight: 10,
  },

  header_month: {
    color: "white",
    fontWeight: "bold",
    marginRight: 10,
    fontSize: 15,
  },

  header_icon: {
    paddingHorizontal: 2.5,
    paddingVertical: 2.5,
  },

  content_wrap: {
    flexDirection: "row",
    marginLeft: 80,
  },
})

export default React.memo(Stats, isEqualMemoComparison)
