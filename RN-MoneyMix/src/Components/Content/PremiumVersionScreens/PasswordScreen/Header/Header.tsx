// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"
import AsyncStorage from "@react-native-community/async-storage"

// COMPONENTS IMPORTS //
import PassFillCube from "./PassFillCube/PassFillCube"
import RestorePasscodePopup from "./RestorePasscodePopup/RestorePasscodePopup"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  isOnline: boolean

  secretCode: string
  setSecretCode: (newSecretCode: string) => void

  isForAuthentification: boolean
  setSecretCodeVerified: (secretCodeVerifiedStatus: boolean) => void
}

const Header: React.FC<PropsType> = (props) => {
  const [offlinePopup, setOfflinePopup] = useState(false as boolean)
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [isWrongPassword, setIsWrongPasword] = useState(false as boolean)
  const { t } = useTranslation()
  const initialRouteName = props.route.params.initialRouteName

  useEffect(() => {
    const authentificateUser = async () => {
      if (props.isForAuthentification) {
        if (props.secretCode.length >= 4) {
          const secretCode = await AsyncStorage.getItem("secretCode")
          if (secretCode && secretCode === props.secretCode) {
            props.setSecretCodeVerified(true)
            await props.navigation.navigate("DrawerNavigatorLayout", {
              initialRouteName: initialRouteName,
            })
            props.setSecretCode("")
          } else {
            props.setSecretCode("")
            setIsWrongPasword(true)
          }

          props.navigation.setParams({
            isSubmited: false as boolean,
          })
        }
      }
    }

    authentificateUser()
  }, [props.secretCode])

  const [tempPasscode, setTempPasscode] = useState(null as string | null)
  const [verifiyProcces, setVerifyProcess] = useState(false as boolean)

  useEffect(() => {
    const checkSubmitStatus = async () => {
      if (props.route.params.isSubmited) {
        if (!props.isForAuthentification) {
          if (verifiyProcces) {
            if (tempPasscode === props.secretCode) {
              await AsyncStorage.setItem(
                "secretCode",
                props.secretCode.slice(0, 4)
              )

              setVerifyProcess(false)
              await props.navigation.navigate("DrawerNavigatorLayout", {
                initialRouteName: initialRouteName,
              })
              props.setSecretCode("")
            } else {
              props.setSecretCode("")
              setIsWrongPasword(true)
            }
          } else {
            setTempPasscode(props.secretCode.slice(0, 4))
            setVerifyProcess(true)
            props.setSecretCode("")
          }
        }
      }
    }

    checkSubmitStatus()
  }, [props.route.params])

  useEffect(() => {
    if (props.secretCode.length > 0) {
      setIsWrongPasword(false)
    }
  }, [props.secretCode])

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("~/Images/pass-screen-img.png")}
        />
        <Text style={styles.title}>
          {t("PremiumVersionScreen.Auth.EnterPassword")}
        </Text>
        {props.isForAuthentification && (
          <TouchableOpacity
            style={styles.restore_wrap}
            onPress={() =>
              props.isOnline ? setPopupVisible(true) : setOfflinePopup(true)
            }
          >
            <Text style={styles.restore_text}>
              {t("PremiumVersionScreen.Auth.PPForgotPass")}
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.code_wrap}>
          <PassFillCube filled={(props.secretCode.length as any) >= 1} />
          <PassFillCube filled={(props.secretCode.length as any) >= 2} />
          <PassFillCube filled={(props.secretCode.length as any) >= 3} />
          <PassFillCube filled={(props.secretCode.length as any) >= 4} />
        </View>

        {verifiyProcces || isWrongPassword ? (
          <View style={styles.error_wrap}>
            {isWrongPassword ? (
              <Text style={[styles.error_text, { color: "#DB4437" }]}>
                {t("PremiumVersionScreen.Auth.PPWrongSecretCode")}
              </Text>
            ) : (
              verifiyProcces && (
                <Text style={[styles.error_text, { color: "white" }]}>
                  {t("PremiumVersionScreen.Auth.PPConfirmSecretCode")}
                </Text>
              )
            )}
          </View>
        ) : null}
      </View>

      <RestorePasscodePopup
        navigation={props.navigation}
        initialRouteName={initialRouteName}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        setSecretCodeVerified={props.route.params.setSecretCodeVerified}
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
  container: {
    backgroundColor: "#512DA8",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  image: {
    width: 148,
    height: 130,
  },

  title: {
    color: "white",
    marginTop: 38,

    fontWeight: "bold",
    letterSpacing: 0.3,
    textAlign: "center",
    fontSize: 16,
  },

  restore_wrap: {},

  restore_text: {
    color: "silver",
    marginTop: 5,
  },

  code_wrap: {
    flexDirection: "row",
    marginTop: 30,
  },

  arrow_wrap: {
    position: "absolute",
    right: 23,
    top: 45,
    backgroundColor: "white",
    borderRadius: 100,
    padding: 5,
  },

  error_wrap: {
    marginTop: 20,
    marginHorizontal: 30,
  },

  error_text: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },

  text: {
    color: "black",
  },
})

export default React.memo(Header, isEqualMemoComparison)
