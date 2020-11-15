// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { useIsDrawerOpen } from "@react-navigation/drawer"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import DrawerItemComponent from "../Components/DrawerItemComponent/DrawerItemComponent"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Ionicons } from "@expo/vector-icons"
import { Fontisto } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  selectedCurrency: string
  budgetEnabledStatus: boolean
  isAuthentificated: boolean

  getBudgetStatusThunkCreator: () => void
  setCurrencyThunkCreator: (newCurrency: string) => void
}

const MiddleSettings: React.FC<PropsType> = (props) => {
  const [secretCode, setSecretCode] = useState(null as string | null)
  const [SelectedLanguage, setSelectedLanguage] = useState(undefined)
  const [selectedInitialScreen, setSelectedInitialScreen] = useState(undefined)
  const [selectedInitialStatsScreen, setSelectedInitialStatsScreen] = useState(
    undefined
  )
  const [passwordEnabled, setPasswordEnabled] = useState(
    props.isAuthentificated && secretCode ? true : false
  )
  const [budgetEnabledStatus, setBudgetEnabledStatus] = useState(false)

  const getValues = async () => {
    const secretCode = await AsyncStorage.getItem("secretCode")
    setSecretCode(secretCode)
    setBudgetEnabledStatus(props.budgetEnabledStatus)

    try {
      setPasswordEnabled(props.isAuthentificated && secretCode ? true : false)

      const language = await AsyncStorage.getItem("selectedLanguage")
      setSelectedLanguage((language as any) || "English")

      if ((await AsyncStorage.getItem("selectedInitialScreen")) === null) {
        await AsyncStorage.setItem("selectedInitialScreen", "Category")
      }

      setSelectedInitialScreen(
        (await AsyncStorage.getItem("selectedInitialScreen")) as any
      )

      if ((await AsyncStorage.getItem("selectedStatsInitialScreen")) === null) {
        await AsyncStorage.setItem("selectedStatsInitialScreen", "Expenses")
      }

      setSelectedInitialStatsScreen(
        (await AsyncStorage.getItem("selectedStatsInitialScreen")) as any
      )
    } catch (e) {}
  }

  useEffect(() => {
    getValues()
  }, [useIsDrawerOpen()])

  useEffect(() => {
    getValues()
  }, [])

  const [notificationsSwitch, setNotificationsSwitch] = useState(
    true as boolean
  )

  useEffect(() => {
    const fn = async () => {
      await AsyncStorage.setItem(
        "notificationsAllowed",
        `${notificationsSwitch}`
      )
    }

    fn()
  }, [notificationsSwitch])

  const { t } = useTranslation()

  return (
    <>
      <Text style={styles.title}>
        {t("DrawerNavigator.ButtonsList.Settings")}
      </Text>
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.Language")}
        subtitle={t(`DrawerNavigator.ButtonsList.${SelectedLanguage}`)}
        icon={<Fontisto name="world-o" size={23} color={"gray"} />}
        onPress={() => {}}
        popupContent={{
          title: t("DrawerNavigator.ButtonsList.Language"),
          fields: ["English", "Spanish", "German", "Russian"],
        }}
        storageName="selectedLanguage"
        getValues={getValues}
      />
      <View style={styles.half_divider} />
      {/* <DrawerItemComponent
        title="Тема"
        subtitle="Светлая"
        icon={<Ionicons name="md-color-palette" size={24} color="gray" />}
        onPress={() => {}}
        popupContent={{
          title: "Тема",
          fields: ["Светлая", "Тёмная"],
        }}
      />
      <View style={styles.half_divider} /> */}
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.MainCurrency")}
        subtitle={t(`DrawerNavigator.ButtonsList.${props.selectedCurrency}`)}
        icon={<FontAwesome name="dollar" size={24} color="gray" />}
        onPress={() => {}}
        popupContent={{
          title: t("DrawerNavigator.ButtonsList.MainCurrency"),
          fields: [
            "AustrDollar",
            "BritishFunt",
            "USDollar",
            "Euro",
            "CanadianDollar",
            "ChineseYuan",
            "RusRuble",
            "BelRuble",
            "Tenge",
            "Grivn",
            "SwissFrank",
          ],
        }}
        storageName="selectedCurrency"
        setDataFunction={props.setCurrencyThunkCreator}
      />
      <View style={styles.half_divider} />
      {/* <DrawerItemComponent
        title="Формат валюты"
        subtitle=`-1 234 567,90 ${selectedCurrency}`
        icon={<FontAwesome5 name="money-check-alt" size={24} color="gray" />}
        onPress={() => {
        }}
        popupContent={{
          title: "Формат валюты",
          fields: [
            `-1.323.232.232 ${selectedCurrency}`,
            `1.323.232.232 ${selectedCurrency}`,
            `-1.323.232.232 ${selectedCurrency}`,
            `1.323.232.232 ${selectedCurrency}`,
            `-1.323.232.232 ${selectedCurrency}`,
            `1.323.232.232 ${selectedCurrency}`,
          ],
        }}
      />
      <View style={styles.half_divider} /> */}
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.InitialScreen")}
        subtitle={t(`DrawerNavigator.ButtonsList.${selectedInitialScreen}`)}
        icon={<Ionicons name="md-open" size={24} color="gray" />}
        onPress={() => {}}
        popupContent={{
          title: t("DrawerNavigator.ButtonsList.InitialScreen"),
          fields: ["Bills", "Category", "Operations", "Stats"],
        }}
        storageName="selectedInitialScreen"
        getValues={getValues}
      />
      <View style={styles.half_divider} />
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.InitialStatsScreen")}
        subtitle={t(
          `DrawerNavigator.ButtonsList.${selectedInitialStatsScreen}`
        )}
        icon={<Entypo name="bar-graph" size={24} color="gray" />}
        onPress={() => {}}
        popupContent={{
          title: t("DrawerNavigator.ButtonsList.InitialStatsScreen"),
          fields: ["Income", "Expenses"],
        }}
        storageName="selectedStatsInitialScreen"
        getValues={getValues}
      />
      <View style={styles.half_divider} />
      {/* <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.Notifications")}
        icon={
          <MaterialCommunityIcons name="bell-outline" size={24} color="gray" />
        }
        onPress={() => {}}
        switchUsed
        switchValue={notificationsSwitch}
        setSwitchValue={setNotificationsSwitch}
      />
      <View style={styles.half_divider} /> */}
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.Password")}
        icon={<AntDesign name="lock1" size={24} color="gray" />}
        onPress={() => {}}
        switchValue={passwordEnabled}
        setSwitchValue={async () => {
          if (props.isAuthentificated) {
            if (secretCode) {
              await AsyncStorage.removeItem("secretCode")
              setPasswordEnabled(false)
            } else {
              props.navigation.navigate("PasswordScreen", {
                isForAuthentification: false,
              })
              props.navigation.closeDrawer()
            }
          } else {
            props.navigation.navigate("PremiumVersionScreen")
          }
        }}
        switchUsed
        vipOption={props.isAuthentificated ? false : true}
      />
      <View style={styles.half_divider} />
      <DrawerItemComponent
        title={t("DrawerNavigator.ButtonsList.Budget")}
        icon={
          <MaterialCommunityIcons name="rhombus-split" size={24} color="gray" />
        }
        onPress={() => {}}
        switchValue={budgetEnabledStatus}
        setSwitchValue={async () => {
          if (props.isAuthentificated) {
            if (budgetEnabledStatus) {
              setBudgetEnabledStatus(false)
              await AsyncStorage.removeItem("budgetEnabled")
              props.getBudgetStatusThunkCreator()
            } else {
              setBudgetEnabledStatus(true)
              await AsyncStorage.setItem("budgetEnabled", JSON.stringify(true))
              props.getBudgetStatusThunkCreator()
            }
          } else {
            props.navigation.navigate("PremiumVersionScreen")
          }
        }}
        switchUsed
        vipOption={props.isAuthentificated ? false : true}
      />
      <View style={styles.full_divider} />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    color: "#674ABE",
    fontWeight: "bold",
    marginHorizontal: 13,
    marginTop: 14,
  },

  star_img: {
    height: 24,
    width: 24,
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  full_divider: {
    borderTopColor: "black",
    opacity: 0.15,
    borderTopWidth: 1,
    marginVertical: 3,
  },

  half_divider: {
    borderTopColor: "black",
    opacity: 0.15,
    borderTopWidth: 1,
    marginLeft: 50,
    marginVertical: 1,
  },
})

export default React.memo(MiddleSettings, isEqualMemoComparison)
