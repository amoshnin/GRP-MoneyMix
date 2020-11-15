// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, BackHandler } from "react-native"
import { Button } from "react-native-paper"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"
import { Formik } from "formik"
import * as yup from "yup"
import Firebase from "~/API/FirebaseConfig"

// COMPONENTS IMPORTS //
import PasswordInput from "~/Components/Shared/Components/PasswordInput/PasswordInput"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: any
}

const ChangePasswordPopup: React.FC<PropsType> = (props) => {
  const [isError, setIsError] = useState(false as boolean)
  const { t } = useTranslation()

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  const ValidationSchema = yup.object({
    currentPassword: yup
      .string()
      .matches(/[a-zA-Z]/ as any, t("Validation.PasswordLatin"))
      .required(t("Validation.PasswordRequired"))
      .typeError(t("Validation.PasswordRequired")),

    newPassword: yup
      .string()
      .matches(/[a-zA-Z]/ as any, t("Validation.PasswordLatin"))
      .required(t("Validation.PasswordRequired"))
      .typeError(t("Validation.PasswordRequired")),
  })

  const changeUserPassword = (currentPassword: string, newPassword: string) => {
    new Promise((resolve, reject) => {
      const user: any = Firebase.auth().currentUser
      const credential = Firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      )

      user.reauthenticateWithCredential(credential as any).then((res: any) => {
        user.updatePassword(newPassword)
        props.setPopupVisible(false)
      })
    }).catch(() => setIsError(true))
  }

  return (
    <Dialog
      width={320}
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => props.setPopupVisible(false)}
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
          validationSchema={ValidationSchema}
          initialValues={{
            currentPassword: null as number | null,
            newPassword: null as string | null,
          }}
          onSubmit={(values: any) => {
            changeUserPassword(values.currentPassword, values.newPassword)
          }}
        >
          {(FormikProps) => {
            useEffect(() => {
              isError && setIsError(false)
            }, [FormikProps.values.currentPassword])

            return (
              <>
                <Text style={styles.title}>
                  {t("DrawerNavigator.ButtonsList.ChangePassword")}
                </Text>

                <View style={styles.inputs_wrap}>
                  {isError && (
                    <Text style={styles.error_message}>
                      {t("PremiumVersionScreen.Auth.PPWrongPass")}
                    </Text>
                  )}
                  <PasswordInput
                    value={FormikProps.values.currentPassword as any}
                    placeholder={t("DrawerNavigator.Popup.currentPassword")}
                    onChangeText={FormikProps.handleChange("currentPassword")}
                    onBlur={() => {
                      FormikProps.handleBlur("currentPassword")
                    }}
                  />
                  {FormikProps.touched.currentPassword &&
                    FormikProps.errors.currentPassword && (
                      <Text style={styles.error_message}>
                        {FormikProps.touched.currentPassword &&
                          FormikProps.errors.currentPassword}
                      </Text>
                    )}
                  <PasswordInput
                    value={FormikProps.values.newPassword as any}
                    placeholder={t("DrawerNavigator.Popup.NewPassword")}
                    onChangeText={FormikProps.handleChange("newPassword")}
                    onBlur={() => {
                      FormikProps.handleBlur("newPassword")
                    }}
                  />
                  {FormikProps.touched.newPassword &&
                    FormikProps.errors.newPassword && (
                      <Text style={styles.error_message}>
                        {FormikProps.touched.newPassword &&
                          FormikProps.errors.newPassword}
                      </Text>
                    )}
                </View>
                <View style={styles.buttons_wrap}>
                  <Button
                    accessibilityStates
                    style={styles.button}
                    onPress={() => {
                      props.setPopupVisible(false)
                    }}
                  >
                    {t("GeneralPhrases.Cancel")}
                  </Button>

                  <Button
                    accessibilityStates
                    style={styles.button}
                    onPress={FormikProps.handleSubmit}
                  >
                    {t("GeneralPhrases.Change")}
                  </Button>
                </View>
              </>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 15,
  },

  container: {
    justifyContent: "center",
    marginTop: 18,
    marginBottom: -25,
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
    color: "black",
  },

  inputs_wrap: {
    marginTop: 10,
  },

  input: {
    backgroundColor: "white",
    height: 45,
    marginBottom: 15,
  },

  button: {
    height: 45,
  },

  buttons_wrap: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },

  error_message: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: -5,
    marginLeft: 6,
    fontSize: 12.5,
  },
})

export default React.memo(ChangePasswordPopup, isEqualMemoComparison)
