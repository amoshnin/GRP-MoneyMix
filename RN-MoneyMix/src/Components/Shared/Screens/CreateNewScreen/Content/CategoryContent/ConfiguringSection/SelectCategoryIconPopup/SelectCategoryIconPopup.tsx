// PLUGINS IMPORTS //
import React from "react"
import { Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"

// COMPONENTS IMPORTS //
import IconsSelectScreen from "./IconsSelectScreen/IconsSelectScreen"
import ColorsSelectScreen from "./ColorsSelectScreen/ColorsSelectScreen"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  usedIconsArray?: Array<string>

  selectedIcon: string | null
  setSelectedIcon: (selectedIcon: string) => void
  selectedColor: string
  setSelectedColor: (selectedColor: string) => void

  setPopupVisible: (popupVisibilityStatus: boolean) => void
}

const SelectCetegoryIconPopup: React.FC<PropsType> = (props) => {
  const Tab = createMaterialTopTabNavigator()
  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  return (
    <Dialog
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => {
        props.setPopupVisible(false)
      }}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
    >
      <DialogContent style={styles.container}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarPosition="top"
            initialRouteName="IconsSelectScreen"
            tabBarOptions={{
              style: styles.tab_bar,
              indicatorStyle: {
                backgroundColor: "#674ABE",
              },
              activeTintColor: "#674ABE",
              inactiveTintColor: "black",
            }}
          >
            <Tab.Screen
              name="IconsSelectScreen"
              component={IconsSelectScreen}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text style={focused ? styles.text_focused : styles.text}>
                    ICONS
                  </Text>
                ),
              }}
              initialParams={{
                setPopupVisible: props.setPopupVisible,
                usedIconsArray: props.usedIconsArray,
                selectedIcon: props.selectedIcon,
                setSelectedIcon: props.setSelectedIcon,
                selectedColor: props.selectedColor,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setPopupVisible: props.setPopupVisible,
                    usedIconsArray: props.usedIconsArray,
                    selectedIcon: props.selectedIcon,
                    setSelectedIcon: props.setSelectedIcon,
                    selectedColor: props.selectedColor,
                  })
                },
              })}
            />
            <Tab.Screen
              name="ColorsSelectScreen"
              component={ColorsSelectScreen}
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text style={focused ? styles.text_focused : styles.text}>
                    COLORS
                  </Text>
                ),
              }}
              initialParams={{
                setPopupVisible: props.setPopupVisible,
                usedIconsArray: props.usedIconsArray,
                setSelectedIcon: props.setSelectedIcon,
                setSelectedColor: props.setSelectedColor,
                selectedIcon: props.selectedIcon,
              }}
              listeners={({ navigation, route }: any) => ({
                focus: () => {
                  navigation.setParams({
                    setPopupVisible: props.setPopupVisible,
                    usedIconsArray: props.usedIconsArray,
                    setSelectedIcon: props.setSelectedIcon,
                    setSelectedColor: props.setSelectedColor,
                    selectedIcon: props.selectedIcon,
                  })
                },
              })}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    bottom: 0,
    position: "absolute",
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  container: {
    width: 372,
    height: "90.4%",
    marginHorizontal: -19,
  },

  tab_bar: {
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },

  text: {
    color: "#674ABE",
    fontWeight: "bold",
  },

  text_focused: {
    color: "#674ABE",
    fontWeight: "bold",
  },
})

export default SelectCetegoryIconPopup
