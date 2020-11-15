// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import { NavigationContainer } from "@react-navigation/native"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import IconsSelectScreen from "./IconsSelectScreen/IconsSelectScreen"
import ColorsSelectScreen from "./ColorsSelectScreen/ColorsSelectScreen"
import { Button } from "react-native-paper"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

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
  const [previousData, setPreviousData] = useState({
    icon: "shopping-bag",
    color: "#F34334",
  } as any)
  const Tab = createMaterialTopTabNavigator()
  const { t } = useTranslation()

  useEffect(() => {
    setPreviousData({
      icon: props.selectedIcon,
      color: props.selectedColor,
    })
  }, [props.popupVisible])

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
                    {t("CreateScreen.Popups.Icons").toUpperCase()}
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
                    {t("CreateScreen.Popups.Colors").toUpperCase()}
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
        <View style={styles.buttons_wrap}>
          <Button
            accessibilityStates
            labelStyle={styles.button_text}
            onPress={() => {
              props.setSelectedIcon(previousData.icon)
              props.setSelectedColor(previousData.color)
              props.setPopupVisible(false)
            }}
          >
            {t("GeneralPhrases.Cancel")}
          </Button>
          <Button
            accessibilityStates
            labelStyle={styles.button_text}
            onPress={() => props.setPopupVisible(false)}
          >
            {t("GeneralPhrases.Ok")}
          </Button>
        </View>
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
    marginHorizontal: -19,
  },

  text: {
    color: "#674ABE",
    fontWeight: "bold",
  },

  text_focused: {
    color: "#674ABE",
    fontWeight: "bold",
  },

  buttons_wrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: -21,
    marginTop: 4,
    marginRight: 5,
  },

  button_text: {
    color: "gray",
  },
})

export default React.memo(SelectCetegoryIconPopup, isEqualMemoComparison)
