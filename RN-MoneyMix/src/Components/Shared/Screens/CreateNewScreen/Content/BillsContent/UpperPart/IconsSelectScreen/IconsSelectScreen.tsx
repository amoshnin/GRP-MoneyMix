// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import { icons } from "../../../Helpers/IconsArraysData"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  selectedIcon: string | null
  setSelectedIcon: (newSelectedIcon: string) => void

  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void
}

const IconsSelectScreen: React.FC<PropsType> = (props) => {
  const [selectedIcon, setSelectedIcon] = useState(props.selectedIcon as string)
  const { t } = useTranslation()
  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  const setIcon = async (icon?: string) => {
    props.setSelectedIcon(icon as string)
    setSelectedIcon(icon as string)
    props.setPopupVisible(false)
  }

  useEffect(() => {
    setSelectedIcon(props.selectedIcon as string)
  }, [props.popupVisible])

  return (
    <Dialog
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => props.setPopupVisible(false)}
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
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.header_text}>
              {t("Categories.Popups.CategoryIcon")}
            </Text>
            {selectedIcon && (
              <TouchableOpacity
                style={[
                  styles.header_icon,
                  {
                    backgroundColor: props.selectedIcon
                      ? props.selectedIcon
                      : "#674ABE",
                  },
                ]}
              >
                <FontAwesome name={selectedIcon} size={20} color={"white"} />
              </TouchableOpacity>
            )}
          </View>
          <ScrollView contentContainerStyle={styles.icons_list}>
            {icons.map((icon: string) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.icon,
                    selectedIcon === icon && {
                      backgroundColor: props.selectedIcon
                        ? "#674ABE"
                        : "#674ABE",
                    },
                  ]}
                  onPress={() => setIcon(icon)}
                >
                  <FontAwesome
                    name={icon}
                    size={24}
                    color={selectedIcon === icon ? "white" : "#674ABE"}
                  />
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  container: {
    width: 380,
    marginHorizontal: -17,
    backgroundColor: "#EFEFEF",
    height: 500,
  },

  header: {
    paddingBottom: 20,
    paddingTop: 15,
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderBottomWidth: 0.4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingRight: 40,
  },

  header_text: {
    marginLeft: 5,
    fontSize: 20,
  },

  header_icon: {
    borderRadius: 7,
    height: 36,
    width: 36,
    backgroundColor: "#674ABE",
    alignItems: "center",
    justifyContent: "center",
  },

  icons_list: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
  },

  icon: {
    borderColor: "#674ABE",
    borderWidth: 2,
    borderRadius: 7,
    height: 42,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginVertical: 20,
  },

  field_wrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },

  buttons_wrap: {
    borderTopColor: "gray",
    borderTopWidth: 0.4,
    backgroundColor: "white",
    marginVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 10,
    paddingBottom: 5,
  },
})

export default React.memo(IconsSelectScreen, isEqualMemoComparison)
