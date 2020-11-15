// PLUGINS IMPORTS //
import React, { useState } from "react"
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { BorderlessButton } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"
import { createStackNavigator } from "@react-navigation/stack"

// COMPONENTS IMPORTS //
import MainScreenContainer from "./Screens/MainScreen/MainScreenContainer"
import TemplatesScreenContainer from "./Screens/TemplatesScreen/TemplatesScreenContainer"

import SelectPopup from "~/Components/Shared/Components/Popups/SelectPopup/SelectPopup"
import GeneralHeader from "~/Components/Shared/Components/GeneralHeader/GeneralHeader"
import CalendarHeaderOptionContainer from "~/Components/Shared/Components/GeneralHeader/CalendarHeaderOption/CalendarHeaderOptionContainer"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

import OfflineBadge from "~/Components/Shared/Components/Badges/OfflineBadge/OfflineBadge"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  ProfilesList: Array<any>

  isOnline: boolean
  isAuthentificated: boolean

  getProfilesListThunkCreator: () => void
  createNewProfileThunkCreator: (newProfileName: string) => void
  deleteProfileThunkCreator: (oldProfileName: string) => void
  RestoreDataFromCloudThunkCreator: () => void
}

const Category: React.FC<PropsType> = (props) => {
  const [offlinePopup, setOfflinePopup] = useState(false as boolean)
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  const Stack = createStackNavigator()

  return (
    <>
      <Stack.Navigator initialRouteName="CategoryMain">
        <Stack.Screen
          name="CategoryMain"
          component={MainScreenContainer}
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
                rightIcons={
                  <>
                    <BorderlessButton
                      rippleColor="#808080"
                      style={styles.header_icon}
                      hitSlop={{ horizontal: 20, vertical: 20 }}
                      onPress={() =>
                        props.isAuthentificated
                          ? props.isOnline
                            ? setPopupVisible(!popupVisible)
                            : setOfflinePopup(true)
                          : navigation.navigate("PremiumVersionScreen")
                      }
                    >
                      <MaterialCommunityIcons
                        name="account"
                        size={24}
                        color="white"
                      />
                      {!props.isAuthentificated ? (
                        <Image
                          source={require("~/Images/star.png")}
                          style={styles.vip_star_img}
                        />
                      ) : (
                        !props.isOnline && <OfflineBadge iconSize={17} />
                      )}
                    </BorderlessButton>

                    <BorderlessButton
                      rippleColor="#808080"
                      style={{ paddingHorizontal: 4, paddingVertical: 4 }}
                      hitSlop={{ horizontal: 20, vertical: 20 }}
                      onPress={() => {
                        navigation.setParams({
                          isEditMode: !route.params.isEditMode,
                        })
                      }}
                    >
                      <FontAwesome5 name="pen" size={16} color="white" />
                    </BorderlessButton>
                  </>
                }
                rightIconsWrapStyle={styles.right_icons_wrap}
              />
            ),
          })}
          initialParams={{
            isIncome: false,
            isEditMode: false as boolean,
          }}
          listeners={({ navigation, route }: any) => ({
            focus: () => {
              navigation.setParams({
                isIncome: route.params.isIncome,
                isEditMode: route.params.isEditMode,
              })
            },
          })}
        />
        <Stack.Screen
          name="TemplatesScreen"
          component={TemplatesScreenContainer}
          options={({ navigation, route }: any) => ({
            headerStyle: {
              backgroundColor: "#674ABE",
            },
            headerTintColor: "white",
            headerTitleAlign: "center",
            headerTitle: t("Categories.Templates.TemplatesList"),
            headerRight: () => (
              <TouchableOpacity
                style={styles.right_icon}
                onPress={() =>
                  navigation.navigate("CreateNewTemplateScreen", {
                    isIncome: route.params.isIncome,
                  })
                }
              >
                <AntDesign name="plus" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
          initialParams={{
            isIncome: false,
          }}
          listeners={({ navigation, route }: any) => ({
            focus: () => {
              navigation.setParams({
                isIncome: route.params.isIncome,
              })
            },
          })}
        />
      </Stack.Navigator>

      <SelectPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        profilesArray={props.ProfilesList}
        createNewProfileThunkCreator={props.createNewProfileThunkCreator}
        deleteProfileThunkCreator={props.deleteProfileThunkCreator}
        RestoreDataFromCloudThunkCreator={
          props.RestoreDataFromCloudThunkCreator
        }
        getProfilesListThunkCreator={props.getProfilesListThunkCreator}
      />

      <AlertPopup
        popupVisible={offlinePopup}
        setPopupVisible={setOfflinePopup}
        title={t("GeneralPhrases.Popups.TitleNetProblem")}
        content={
          <Text style={styles.text}>
            {t("GeneralPhrases.Popups.PPNetworkProblem")}
          </Text>
        }
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  header_text_wrap: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -70,
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

  right_icons_wrap: {
    width: 69,
  },

  right_icon: {
    marginRight: 23,
  },

  content_wrap: {
    flexDirection: "row",
    marginLeft: 80,
  },

  vip_star_img: {
    position: "absolute",
    height: 17.65,
    width: 17.65,
    right: -5,
    top: -5,
  },

  text: {
    color: "black",
  },
})

export default React.memo(Category, isEqualMemoComparison)
