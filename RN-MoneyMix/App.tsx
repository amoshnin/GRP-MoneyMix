// PLUGINS IMPORTS //
import React, { Suspense, useEffect, useState } from "react"
import { Text, StyleSheet, TouchableOpacity } from "react-native"
import * as Linking from "expo-linking"
import { useTranslation } from "react-i18next"

import { compose } from "redux"
import { connect } from "react-redux"

import Firebase from "./src/API/FirebaseConfig"
import * as Font from "expo-font"
import { Asset } from "expo-asset"
import { StatusBar } from "expo-status-bar"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import AsyncStorage from "@react-native-community/async-storage"
import NetInfo from "@react-native-community/netinfo"
import { YandexMetrica } from "react-native-appmetrica-yandex"
import appsFlyer from "react-native-appsflyer"

// COMPONENTS IMPORTS //
import DrawerNavigatorLayout from "./src/Components/NavigationCenter/DrawerNavigator/DrawerNavigatorLayout/DrawerNavigatorLayout"

import LoadingScreen from "./src/Components/Shared/Screens/LoadingScreen/LoadingScreen"
import AppInstallScreen from "./src/Components/Shared/Screens/AppInstallScreen/AppInstallScreen"
import PremiumVersionScreens from "./src/Components/Content/PremiumVersionScreens/PremiumVersionScreens"
// import BankSMSSettings from "./src/Components/Content/BankSMSSettings/BankSMS"
import PasswordScreenContainer from "./src/Components/Content/PremiumVersionScreens/PasswordScreen/PasswordScreenContainer"

import MoneyCategoriesTransferScreenContainer from "./src/Components/Shared/Screens/MoneyTransfers/MoneyCategoriesTransferScreen/MoneyCategoriesTransferScreenContainer"
import MoneyBillsTransferScreenContainer from "./src/Components/Shared/Screens/MoneyTransfers/MoneyBillsTransferScreen/MoneyBillsTransferScreenContainer"
import MoneyBillsRefillBalanceScreenContainer from "./src/Components/Shared/Screens/MoneyTransfers/MoneyBillsRefillBalanceScreen/MoneyBillsRefillBalanceScreenContainer"
import MoneyBudgetTransferScreen from "./src/Components/Shared/Screens/MoneyTransfers/MoneyBudgetTransferScreen/MoneyBudgetTransferScreenContainer"

import CreateNewScreenContainer from "./src/Components/Shared/Screens/CreateNewScreen/CreateNewScreenContainer"
import CreateNewTemplateScreenContainer from "./src/Components/Content/Category/Screens/CreateNewTemplateScreen/CreateNewTemplateScreenContainer"

import GalleryScreen from "./src/Components/Shared/Screens/GalleryScreen/GalleryScreen"
import PhotosMultipleGalleryContainer from "./src/Components/Shared/Screens/PhotosMultipleGallery/PhotosMultipleGalleryContainer"
import VoiceRecognitionScreenContainer from "./src/Components/Shared/Screens/VoiceRecognitionScreen/VoiceRecognitionScreenContainer"
import ReserveDataScreenContainer from "./src/Components/Shared/Screens/ReserveDataScreen/ReserveDataScreenContainer"
import RestoreDataScreenContainer from "./src/Components/Shared/Screens/RestoreDataScreen/RestoreDataScreenContainer"
import StorageSubscriptionsScreenContainer from "./src/Components/Shared/Screens/StorageSubscriptionsScreen/StorageSubscriptionsScreenContainer"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

import {
  registerForPushNotificationsAsync,
  scheduleDailyNotifications,
} from "./src/Components/Shared/Helpers/Functions/Notifications"

// EXTRA IMPORTS //
import "./src/Translations/i18next"

// IMPORTING FROM STORE (Redux) //
import store, { AppStateType } from "./src/Redux/ReduxStore"
import { Provider } from "react-redux"

// FIREBASE SETTINGS //
import firebase from "firebase/app"
import { createFirestoreInstance } from "redux-firestore"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"

// Importing Reducers //
import {
  getInitialGeneralDataThunkCreator,
  scheduleRatingPopupVisibilityThunkCreator,
  ActionCreatorsList as GeneralReducerActionCreatorsList,
} from "./src/Redux/Reducers/GeneralReducers/GeneralGetReducer"
import { getOperationsListThunkCreator } from "./src/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import {
  SetDefaultInfoThunkCreatior,
  subscriptionVerifierThunkCreator,
  RestoreDataFromCloudThunkCreator,
  RestoreDataFromDeviceThunkCreator,
} from "./src/Redux/Reducers/PremiumReducers/PremiumSetReducer"
import { LogoutUserThunkCreator } from "./src/Redux/Reducers/AuthReducers/AuthSetReducer"
import { reviewIncomeSMSThunkCreator } from "./src/Redux/Reducers/BankSMSReducers/BankSMSGetReducer"
// Importing selectors
import { getRatingPopupVisibility } from "./src/Redux/Selectors/GeneralSelectors"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  ratingPopupVisible: boolean
  //
  scheduleRatingPopupVisibilityThunkCreator: () => void
  setRatingPopupVisibilityActionCreator: (
    ratingPopupVisibility: boolean
  ) => void
  setOnlineStatusActionCreator: (onlineStatus: boolean) => void
  setAuthentificationStatusActionCreator: (isAuthentificated: boolean) => void
  getInitialGeneralDataThunkCreator: () => void
  getOperationsListThunkCreator: (selectedFilters: Array<any>) => void
  reviewIncomeSMSThunkCreator: () => void
  SetDefaultInfoThunkCreatior: (i18n: any) => void
  subscriptionVerifierThunkCreator: () => void
  //
  RestoreDataFromCloudThunkCreator: (email?: string | null) => void
  RestoreDataFromDeviceThunkCreator: (email?: string | null) => any
  //
  LogoutUserThunkCreator: () => void
}

const App: React.FC<PropsType> = (props) => {
  const [isOnline, setIsOnline] = useState(true as boolean)
  const [appUsed, setAppUsed] = useState(false as boolean)
  const [secretCodeVerified, setSecretCodeVerified] = useState(false as boolean)
  const [loading, setLoading] = useState(true as boolean)
  const [initialRouteName, setInitialRouteName] = useState("Category" as string)

  useEffect(() => {
    NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        setIsOnline(true)
        props.setOnlineStatusActionCreator(true)
      } else {
        await AsyncStorage.setItem("wasOffline", "True")
        setIsOnline(false)
        props.setOnlineStatusActionCreator(false)
      }
    })

    appsFlyer.initSdk(
      {
        devKey: "EEGfBYfiYER5Zb86y9i7SA",
        isDebug: false,
      },
      (result) => {},
      (error) => {}
    )

    YandexMetrica.activateWithConfig({
      apiKey: "7e383e00-6ca4-4cbd-b6d2-9562fd432e38",
      sessionTimeout: 120,
      firstActivationAsUpdate: false,
    })
  }, [])

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(async (user) => {
      setInitialRouteName(
        (await AsyncStorage.getItem("selectedInitialScreen")) as string
      )
      if (user) {
        const wasOffline = await AsyncStorage.getItem("wasOffline")
        const restoreMethod = await AsyncStorage.getItem("restoreMethod")
        if (wasOffline === "True") {
          props
            .RestoreDataFromDeviceThunkCreator()
            .then(async () => await AsyncStorage.removeItem("wasOffline"))
        } else {
          if (restoreMethod === "Cloud") {
            props.RestoreDataFromCloudThunkCreator(user.email)
          }
        }
        props.setAuthentificationStatusActionCreator(true)
        if (!secretCodeVerified && user.email) {
          const secretCode = await AsyncStorage.getItem("secretCode")
          if (secretCode) {
            setSecretCodeVerified(false)
            setInitialCall().then(() => {
              setLoading(false)
            })
          } else {
            setSecretCodeVerified(true)
            setInitialCall().then(() => {
              setLoading(false)
            })
          }
        }
      } else {
        await AsyncStorage.removeItem("restoreMethod")
        props.setAuthentificationStatusActionCreator(false)
        setSecretCodeVerified(true)
        setInitialCall().then(() => {
          setLoading(false)
        })
      }
    })

    // props.reviewIncomeSMSThunkCreator()
  }, [])

  console.disableYellowBox = true
  const Stack = createStackNavigator()

  const { i18n, t } = useTranslation()
  const setInitialCall = async () => {
    registerForPushNotificationsAsync()
    props.subscriptionVerifierThunkCreator()

    await Font.loadAsync({
      light: require("./assets/Fonts/Roboto-Light.ttf"),
      thin: require("./assets/Fonts/Roboto-Thin.ttf"),
    })

    if (await AsyncStorage.getItem("appUsed")) {
      setAppUsed(true)
      // props.scheduleRatingPopupVisibilityThunkCreator()
    } else {
      Asset.fromModule(require("./src/Images/logo.png")).downloadAsync()
      props.SetDefaultInfoThunkCreatior(i18n)
      setAppUsed(false)
    }

    props.getInitialGeneralDataThunkCreator()
    props.getOperationsListThunkCreator([])

    try {
      const language = await AsyncStorage.getItem("selectedLanguage")

      if (language === "Russian") {
        i18n.changeLanguage("ru")
        Firebase.auth().languageCode = "ru"
      } else if (language === "Spanish") {
        i18n.changeLanguage("es")
        Firebase.auth().languageCode = "es"
      } else if (language === "German") {
        i18n.changeLanguage("de")
        Firebase.auth().languageCode = "de"
      } else {
        i18n.changeLanguage("en")
        if (isOnline) {
          Firebase.auth().languageCode = "en"
        }

        language !== "English" &&
          (await AsyncStorage.setItem("selectedLanguage", "English"))
      }
    } catch (e) {}
  }

  const passwordStackScreenInfo = (navigation?: any) => {
    return {
      initialParams: {
        setSecretCodeVerified: setSecretCodeVerified,
        isForAuthentification: true as boolean,
        isSubmited: false as boolean,
        initialRouteName: initialRouteName,
      },

      options: {
        headerTitle: t("DrawerNavigator.ButtonsList.Password"),
        headerTintColor: "white",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#512DA8", elevation: 0 },
      },

      listeners: {
        focus: () => {
          navigation.setParams({
            initialRouteName: initialRouteName,
          })
        },
        blur: () => {
          navigation.setParams({
            isSubmited: false as boolean,
          })
        },
      },
    }
  }

  return (
    <>
      <NavigationContainer
        theme={
          {
            colors: {
              background: "#E5E5E5",
            },
          } as any
        }
      >
        <Stack.Navigator initialRouteName="DrawerNavigatorLayout">
          {loading ? (
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={({ navigation, route }: any) => ({
                headerShown: false,
              })}
            />
          ) : appUsed ? (
            !secretCodeVerified ? (
              <Stack.Screen
                name="PasswordScreen"
                component={PasswordScreenContainer}
                initialParams={passwordStackScreenInfo().initialParams}
                options={({ navigation, route }: any) =>
                  passwordStackScreenInfo(navigation).options as any
                }
                listeners={({ navigation, route }: any) =>
                  passwordStackScreenInfo(navigation).listeners
                }
              />
            ) : (
              <>
                <Stack.Screen
                  name="DrawerNavigatorLayout"
                  component={DrawerNavigatorLayout}
                  options={({ navigation, route }: any) => ({
                    headerShown: false,
                  })}
                  initialParams={{
                    initialRouteName: initialRouteName,
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        initialRouteName: initialRouteName,
                      })
                    },
                  })}
                />

                <Stack.Screen
                  name="RestoreDataScreen"
                  component={RestoreDataScreenContainer}
                  options={{
                    headerTitle: t("PremiumVersionScreen.RestoreData"),
                    headerLeft: () => <TouchableOpacity />,
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: "white" },
                    headerTitleStyle: { fontSize: 18 },
                    headerTintColor: "black",
                  }}
                />

                <Stack.Screen
                  name="CreateNewScreen"
                  component={CreateNewScreenContainer}
                  initialParams={{
                    category: null as string | null,
                    isIncome: null as boolean | null,
                    isCategoryCreate: false as boolean,
                    //
                    billType: null as string | null,
                    billEditData: {},
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        category: route.params.category as string | null,
                        isIncome: route.params.isIncome as boolean,
                        isCategoryCreate: route.params
                          .isCategoryCreate as boolean,
                        //
                        billType: route.params.billType as string | null,
                        billEditData: route.params.billEditData,
                      })
                    },

                    blur: () => {
                      navigation.setParams({
                        category: null as string | null,
                        isIncome: null as boolean | null,
                        isCategoryCreate: false as boolean,
                        //
                        billType: null as string | null,
                        billEditData: {},
                      })
                    },
                  })}
                  options={({ navigation, route }: any) => ({
                    headerShown: false,
                  })}
                />
                {/* <Stack.Screen
                  name="BankSMSSettings"
                  component={BankSMSSettings}
                /> */}
                <Stack.Screen
                  name="PremiumVersionScreen"
                  component={PremiumVersionScreens}
                  options={({ navigation, route }: any) => ({
                    headerShown: false,
                  })}
                />
                <Stack.Screen
                  name="PasswordScreen"
                  component={PasswordScreenContainer}
                  initialParams={{
                    ...passwordStackScreenInfo().initialParams,
                    isForAuthentification: false,
                  }}
                  options={({ navigation, route }: any) => ({
                    ...(passwordStackScreenInfo(navigation).options as any),
                    headerRight: () => (
                      <TouchableOpacity
                        style={styles.right_icon}
                        onPress={() =>
                          navigation.setParams({ isSubmited: true })
                        }
                      >
                        <AntDesign name="checkcircle" size={24} color="white" />
                      </TouchableOpacity>
                    ),
                  })}
                  listeners={({ navigation, route }: any) =>
                    passwordStackScreenInfo(navigation).listeners
                  }
                />
                <Stack.Screen
                  name="MoneyCategoriesTransferScreen"
                  component={MoneyCategoriesTransferScreenContainer}
                  initialParams={{
                    isIncome: null as boolean | null,
                    isSpecialBill: false as boolean,
                    categoryData: {},
                    billData: {},
                    transData: {
                      selectedCategory: null,
                      selectedBill: null,
                      selectedImages: [] as Array<any>,
                      comment: null as string | null,
                      moneyAmount: null as string | null,
                      isIncome: null as boolean | null,
                    },
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        isIncome: route.params.isIncome,
                        isSpecialBill: route.params.isSpecialBill,
                        categoryData: route.params.categoryData,
                        billData: route.params.billData,
                        transData: route.params.transData,
                      })
                    },
                    blur: () => {
                      navigation.setParams({
                        transData: {
                          selectedImages: [],
                          comment: null,
                          moneyAmount: null,
                          selectedCategory: null,
                          selectedBill: null,
                          isIncome: null,
                        },
                      })
                    },
                  })}
                  options={({ navigation, route }: any) => ({
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitle: t(
                      "MoneyCategoriesTransferScreen.Header.MoneyTransfer"
                    ),
                  })}
                />
                <Stack.Screen
                  name="MoneyBillsTransferScreen"
                  component={MoneyBillsTransferScreenContainer}
                  initialParams={{
                    sendingBillData: {},
                    billData: {},
                    transData: {
                      selectedCategory: null,
                      selectedBill: null,
                      selectedImages: [] as Array<any>,
                      comment: null as string | null,
                      moneyAmount: null as string | null,
                      isIncome: null as boolean | null,
                    },
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        sendingBillData: route.params.sendingBillData,
                        billData: route.params.billData,
                        transData: route.params.transData,
                      })
                    },
                    blur: () => {
                      navigation.setParams({
                        transData: {
                          selectedImages: [],
                          comment: null,
                          moneyAmount: null,
                          selectedCategory: null,
                          selectedBill: null,
                          isIncome: null,
                        },
                      })
                    },
                  })}
                  options={({ navigation, route }: any) => ({
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitle: t(
                      "MoneyCategoriesTransferScreen.Header.MoneyTransfer"
                    ),
                  })}
                />
                <Stack.Screen
                  name="MoneyBudgetTransferScreen"
                  component={MoneyBudgetTransferScreen}
                  initialParams={{
                    isIncome: null as boolean | null,
                    isSavingsBill: false as boolean,
                    data: {} as any,
                  }}
                  options={({ navigation, route }: any) => ({
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitle: t(
                      "MoneyCategoriesTransferScreen.Header.BudgetConfig"
                    ),
                  })}
                />
                <Stack.Screen
                  name="MoneyBillsRefillBalanceScreen"
                  component={MoneyBillsRefillBalanceScreenContainer}
                  initialParams={{
                    billData: {},
                  }}
                  options={({ navigation, route }: any) => ({
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitle: t(
                      "MoneyCategoriesTransferScreen.Header.MoneyTransfer"
                    ),
                  })}
                />
                <Stack.Screen
                  name="GalleryScreen"
                  component={GalleryScreen}
                  options={({ navigation, route }: any) => ({
                    headerTitle: t("Operations.Gallery.Gallery"),
                    headerStyle: { backgroundColor: "black" },
                    headerTintColor: "white",
                  })}
                  initialParams={{
                    PhotosURLsList: [] as Array<any>,
                    initialPage: 0 as number,
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        PhotosURLsList: route.params.PhotosURLsList,
                        initialPage: route.params.initialPage as number,
                      })
                    },
                    blur: () => {
                      navigation.setParams({
                        PhotosURLsList: route.params.PhotosURLsList,
                        initialPage: 0 as number,
                      })
                    },
                  })}
                />
                <Stack.Screen
                  name="CreateNewTemplateScreen"
                  component={CreateNewTemplateScreenContainer}
                  initialParams={{
                    isIncome: false,
                    transData: {
                      selectedCategory: null,
                      selectedBill: null,
                      selectedImages: [] as Array<any>,
                      comment: null as string | null,
                      moneyAmount: null as string | null,
                      isIncome: null as boolean | null,
                    },
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        isIncome: route.params.isIncome,
                        transData: route.params.transData,
                      })
                    },
                    blur: () => {
                      navigation.setParams({
                        transData: {
                          selectedImages: [],
                          comment: null,
                          moneyAmount: null,
                          selectedCategory: null,
                          selectedBill: null,
                          isIncome: null,
                        },
                      })
                    },
                  })}
                  options={({ navigation, route }: any) => ({
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitle: t("Categories.Templates.NewOperationTemplate"),
                    headerTitleStyle: {
                      fontSize: 18,
                    },
                  })}
                />
                <Stack.Screen
                  name="VoiceRecognitionScreen"
                  component={VoiceRecognitionScreenContainer}
                  options={({ navigation, route }: any) => ({
                    headerShown: false,
                  })}
                  initialParams={{
                    transData: {
                      selectedCategory: null,
                      selectedBill: null,
                      selectedImages: [] as Array<any>,
                      comment: null as string | null,
                      moneyAmount: null as string | null,
                      isIncome: null as boolean | null,
                    },
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        transData: route.params.transData,
                      })
                    },
                  })}
                />

                <Stack.Screen
                  name="ReserveDataScreen"
                  component={ReserveDataScreenContainer}
                  options={({ navigation, route }: any) => ({
                    headerTitle: t("DrawerNavigator.ButtonsList.ReserveData"),
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                      fontSize: 18,
                    },
                    headerRight: () => (
                      <TouchableOpacity
                        style={styles.right_icon}
                        onPress={() =>
                          navigation.setParams({ popupVisible: true })
                        }
                      >
                        <AntDesign name="plus" size={24} color="white" />
                      </TouchableOpacity>
                    ),
                  })}
                  initialParams={{
                    popupVisible: false as boolean,
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        popupVisible: route.params.popupVisible,
                      })
                    },
                    blur: () => {
                      navigation.setParams({
                        popupVisible: false,
                      })
                    },
                  })}
                />
                <Stack.Screen
                  name="StorageSubscriptionsScreen"
                  component={StorageSubscriptionsScreenContainer}
                  options={({ navigation, route }: any) => ({
                    headerTitle: t("StorageSubscriptions.StorageSubscriptions"),
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                      fontSize: 18,
                    },
                  })}
                />
                <Stack.Screen
                  name="PhotosMultipleGallery"
                  component={PhotosMultipleGalleryContainer}
                  options={({ navigation, route }: any) => ({
                    headerTitle: t("StorageSubscriptions.PhotosStorage"),
                    headerStyle: { backgroundColor: "#674ABE" },
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                      fontSize: 18,
                    },
                    headerRight: () => (
                      <TouchableOpacity
                        style={styles.right_icon}
                        onPress={() =>
                          navigation.setParams({
                            isDeleting: true,
                          })
                        }
                      >
                        <AntDesign name="delete" size={24} color="white" />
                      </TouchableOpacity>
                    ),
                  })}
                  initialParams={{
                    isDeleting: false as boolean,
                  }}
                  listeners={({ navigation, route }: any) => ({
                    focus: () => {
                      navigation.setParams({
                        isDeleting: route.params.isDeleting,
                      })
                    },
                  })}
                />
              </>
            )
          ) : (
            <Stack.Screen
              name="AppInstallScreen"
              component={AppInstallScreen}
              initialParams={{
                setInitialCall: setInitialCall,
                setAppUsed: setAppUsed,
              }}
              options={{
                headerShown: false,
              }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <AlertPopup
        popupVisible={props.ratingPopupVisible}
        setPopupVisible={props.setRatingPopupVisibilityActionCreator}
        title={t("DrawerNavigator.Popup.RateAppTitle")}
        content={<Text>{t("DrawerNavigator.Popup.PPRateApp")}</Text>}
        function={() =>
          Linking.openURL(`market://details?id=${"com.monmix"}`).catch((err) =>
            alert("Please check for the Google Play Store")
          )
        }
        cancelButtonText={t("GeneralPhrases.DoNotShowAgain")}
        cancelFunction={async () =>
          await AsyncStorage.setItem("ratePopupShownDate", "Block")
        }
      />
    </>
  )
}

const styles = StyleSheet.create({
  right_icon: {
    marginRight: 20,
  },
})

// TYPES
type MapStateToPropsType = {}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (
  state: AppStateType,
  props: any
): MapStateToPropsType => {
  return {
    ratingPopupVisible: getRatingPopupVisibility(state),
  }
}

const AppContainer = compose(
  connect(mapStateToProps, {
    setOnlineStatusActionCreator:
      GeneralReducerActionCreatorsList.setOnlineStatusActionCreator,
    setAuthentificationStatusActionCreator:
      GeneralReducerActionCreatorsList.setAuthentificationStatusActionCreator,
    setRatingPopupVisibilityActionCreator:
      GeneralReducerActionCreatorsList.setRatingPopupVisibilityActionCreator,
    getInitialGeneralDataThunkCreator,
    scheduleRatingPopupVisibilityThunkCreator,
    getOperationsListThunkCreator,
    reviewIncomeSMSThunkCreator,
    SetDefaultInfoThunkCreatior,
    subscriptionVerifierThunkCreator,
    RestoreDataFromCloudThunkCreator,
    RestoreDataFromDeviceThunkCreator,
    LogoutUserThunkCreator,
  })
)(App)

const AppWrapper = () => {
  const rrfConfig = {
    userProfile: "users",
    useFirestoreForProfile: true,
  }

  const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance,
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <AppContainer />
        </ReactReduxFirebaseProvider>
      </Provider>
      <StatusBar style="light" backgroundColor="#512DA8" />
    </Suspense>
  )
}

export default AppWrapper
