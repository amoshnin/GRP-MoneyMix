// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { View, Text, Keyboard, StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"
import { Formik } from "formik"
import * as yup from "yup"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  ResetPassResponseData: {
    popupVisible: boolean
    positive: boolean
  }
  setResetPassResponseDataActionCreator: (newResponseData: {
    popupVisible: boolean
    positive: boolean
  }) => void
  sendResetPasswordEmailThunkCreator: (emailAddress: string) => void
}

const ResetPasswordScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()
  const ValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("Validation.EmailRequired"))
      .email(t("Validation.InvalidEmail"))
      .typeError(t("Validation.EmailRequired")),
  })

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      props.setResetPassResponseDataActionCreator({
        popupVisible: false,
        positive: false,
      })
    })
  }, [props.navigation])

  return (
    <>
      <View style={styles.container}>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            email: null as number | null,
          }}
          onSubmit={(values: any) => {
            Keyboard.dismiss()
            props.sendResetPasswordEmailThunkCreator(values.email)
          }}
        >
          {(FormikProps) => (
            <>
              <TextInput
                accessibilityStates
                placeholder="Email"
                placeholderTextColor="rgba(26, 24, 36, 0.5)"
                onChangeText={FormikProps.handleChange("email")}
                onBlur={() => {
                  FormikProps.handleBlur("email")
                }}
                keyboardType="email-address"
                textContentType="emailAddress"
                value={FormikProps.values.email as any}
                style={styles.input}
              />
              {FormikProps.touched.email && FormikProps.errors.email && (
                <Text style={styles.error_message}>
                  {FormikProps.touched.email && FormikProps.errors.email}
                </Text>
              )}

              <Button
                title={t("PremiumVersionScreen.Auth.ResetPassword")}
                onPress={FormikProps.handleSubmit}
                containerStyle={styles.button}
                textStyle={styles.button_text}
                unSliceTitle
              />
            </>
          )}
        </Formik>
      </View>

      <AlertPopup
        popupVisible={props.ResetPassResponseData.popupVisible}
        setPopupVisible={(popupVisibility: boolean) =>
          props.setResetPassResponseDataActionCreator({
            ...props.ResetPassResponseData,
            popupVisible: popupVisibility,
          })
        }
        title={t("PremiumVersionScreen.Auth.ResetPasswordTitle")}
        content={
          <Text>
            {props.ResetPassResponseData.positive
              ? t("PremiumVersionScreen.Popups.PPPassResetSuccess")
              : t("PremiumVersionScreen.Popups.PPPassResetFail")}
          </Text>
        }
        removeCancelBtn
      />
    </>
  )
}

//   STYLES   //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  input: {
    height: 45,
    width: 315,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "white",
  },

  button: {
    marginTop: 5,
    height: 50,
    width: 315,
    borderRadius: 6,
    backgroundColor: "#512DA8",
  },

  button_text: {
    color: "white",
    fontSize: 16,
    letterSpacing: 0.3,
  },

  error_message: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: -10,
    marginLeft: 6,
    fontSize: 12.5,
  },
})

export default React.memo(ResetPasswordScreen, isEqualMemoComparison)
