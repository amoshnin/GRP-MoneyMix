// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"
import AsyncStorage from "@react-native-community/async-storage"
import { Button } from "react-native-paper"
import Firebase from "~/API/FirebaseConfig"
import { Formik } from "formik"

// COMPONENTS IMPORTS //
import PasswordInput from "~/Components/Shared/Components/PasswordInput/PasswordInput"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  initialRouteName: string
  popupVisible: boolean
  setPopupVisible: (billPopupShownStatus: boolean) => void
  setSecretCodeVerified: (secretCodeVerifiedStatus: boolean) => void
}

const RestorePasscodePopup: React.FC<PropsType> = (props) => {
  const [result, setResult] = useState(null as string | null)
  const { t } = useTranslation()

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  useEffect(() => {
    setResult(null)
  }, [props.popupVisible])

  const verifyAccount = (password: string) => {
    new Promise((resolve, reject) => {
      const user: any = Firebase.auth().currentUser

      const credential = Firebase.auth.EmailAuthProvider.credential(
        user.email,
        password
      )

      user
        .reauthenticateWithCredential(credential as any)
        .then((res: any) => {
          setResult("Success")
          setTimeout(async () => {
            await AsyncStorage.removeItem("secretCode")
            props.setPopupVisible(false)
            props.setSecretCodeVerified(true)
            await props.navigation.navigate("DrawerNavigatorLayout", {
              initialRouteName: props.initialRouteName,
            })
            setResult(null)
          }, 1000)
        })
        .catch(() => {
          setResult("Fail")
          setTimeout(() => {
            props.setPopupVisible(false)
            setResult(null)
          }, 2200)
        })
    }).catch(() => {
      setResult("Fail")
      setTimeout(() => {
        props.setPopupVisible(false)
        setResult(null)
      }, 2200)
    })
  }

  const renderContent = (FormikProps: any) => {
    if (result === null) {
      return (
        <>
          <Text style={styles.title}>
            {t("PremiumVersionScreen.Auth.RestorePasscode")}
          </Text>
          <Text>{t("PremiumVersionScreen.Auth.PPRestorePasscode")}</Text>
          <Text>({userEmail})</Text>
          <PasswordInput
            value={FormikProps.values.password as any}
            placeholder={t("PremiumVersionScreen.Auth.EnterPassword")}
            onChangeText={FormikProps.handleChange("password")}
            onBlur={() => {
              FormikProps.handleBlur("password")
            }}
            styles={styles.input}
          />

          <View style={styles.buttons_wrap}>
            <Button
              accessibilityStates
              onPress={() => props.setPopupVisible(false)}
            >
              {t("GeneralPhrases.Cancel")}
            </Button>
            <Button accessibilityStates onPress={FormikProps.handleSubmit}>
              {t("GeneralPhrases.Ok")}
            </Button>
          </View>
        </>
      )
    } else if (result === "Success") {
      return (
        <View style={styles.content}>
          <Feather name="check-circle" size={100} color="#01CA5C" />
          <Text style={styles.res_title}>
            {t("PremiumVersionScreen.Auth.PPRestoreSucces")}
          </Text>
        </View>
      )
    } else if (result === "Fail") {
      return (
        <View style={styles.content}>
          <AntDesign name="closecircleo" size={100} color="#FF555B" />
          <Text style={styles.res_title}>
            {t("PremiumVersionScreen.Auth.PPRestoreFail")}
          </Text>
        </View>
      )
    }
  }

  const userEmail = Firebase.auth().currentUser?.email
  return (
    <Dialog
      height={250}
      width={"90%" as any}
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => {
        props.setPopupVisible(false)
      }}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        } as any)
      }
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
    >
      <DialogContent style={styles.container}>
        <Formik
          initialValues={{
            password: null as number | null,
          }}
          onSubmit={(values: any) => {
            verifyAccount(values.password)
          }}
        >
          {(FormikProps) => {
            return (
              <View style={styles.content_wrap}>
                {renderContent(FormikProps)}
              </View>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
  },

  container: {
    paddingVertical: 20,
  },

  content_wrap: {
    justifyContent: "space-between",
  },

  title: {
    fontSize: 20,
    color: "black",
  },

  input: {
    width: "100%",
  },

  buttons_wrap: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 5,
  },

  content: {
    alignItems: "center",
    marginTop: "10%",
  },

  res_title: {
    marginTop: 5,
    fontSize: 18,
    color: "black",
    textAlign: "center",
    marginHorizontal: 25,
  },
})

export default React.memo(RestorePasscodePopup, isEqualMemoComparison)
