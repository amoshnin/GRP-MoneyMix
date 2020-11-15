// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { View, ScrollView, Text, StyleSheet, Keyboard } from "react-native"
import { TextInput } from "react-native-paper"
import { Formik } from "formik"
import * as yup from "yup"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import PasswordInput from "~/Components/Shared/Components/PasswordInput/PasswordInput"
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  isOnline: boolean
  LoginResponse: string | null

  LoginUserThunkCreatior: (
    email: string,
    password: string,
    navigation: any
  ) => any
  setLoginResponseActionCreator: (loginResponse: string | null | null) => void
}

const LoginScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      props.setLoginResponseActionCreator(null)
    })
  }, [props.navigation])

  const ValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("Validation.EmailRequired"))
      .email(t("Validation.InvalidEmail"))
      .typeError(t("Validation.EmailRequired")),
    password: yup
      .string()
      .required(t("Validation.PasswordRequired"))
      .typeError(t("Validation.PasswordRequired")),
  })

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          validationSchema={ValidationSchema}
          initialValues={{
            email: null as number | null,
            password: null as string | null,
          }}
          onSubmit={(values: any) => {
            Keyboard.dismiss()
            props.LoginUserThunkCreatior(
              values.email,
              values.password,
              props.navigation
            )
          }}
        >
          {(FormikProps) => (
            <>
              {props.LoginResponse && props.LoginResponse === "Error" && (
                <Text style={[styles.error_message, styles.top_error]}>
                  {props.isOnline
                    ? t("PremiumVersionScreen.Auth.PPWrongLogin")
                    : t("PremiumVersionScreen.Auth.PPNetworkProblem")}
                </Text>
              )}
              <TextInput
                accessibilityStates
                label="Email"
                onChangeText={FormikProps.handleChange("email")}
                onBlur={() => FormikProps.handleBlur("email")}
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

              <PasswordInput
                value={FormikProps.values.password as any}
                placeholder={t("PremiumVersionScreen.Auth.EnterPassword")}
                onChangeText={FormikProps.handleChange("password")}
                onBlur={() => {
                  FormikProps.handleBlur("password")
                }}
              />
              {FormikProps.touched.password && FormikProps.errors.password && (
                <Text style={styles.error_message}>
                  {FormikProps.touched.password && FormikProps.errors.password}
                </Text>
              )}

              <Button
                title={t("PremiumVersionScreen.Auth.Login")}
                onPress={FormikProps.handleSubmit}
                containerStyle={styles.button}
                textStyle={styles.button_text}
                unSliceTitle
                showLoading={props.LoginResponse !== "Error"}
              />

              <Button
                title={t("PremiumVersionScreen.Auth.DontHavePremPP")}
                onPress={() => props.navigation.navigate("AdvertismentScreen")}
                containerStyle={styles.bottom_button}
                textStyle={styles.text}
                unSliceTitle
              />
              <Button
                title={t("PremiumVersionScreen.Auth.PPForgotPass")}
                onPress={() => props.navigation.navigate("ResetPasswordScreen")}
                containerStyle={styles.bottom_button}
                textStyle={styles.text}
                unSliceTitle
              />
            </>
          )}
        </Formik>
      </ScrollView>
    </View>
  )
}

//   STYLES   //
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },

  container: {
    marginHorizontal: "6%",
  },

  input: {
    width: 315,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "white",
  },

  pass_input: {
    paddingRight: 35,
  },

  eye_icon: {
    position: "absolute",
    right: 10,
    top: 15,
  },

  button: {
    marginTop: 5,
    height: 50,
    width: 315,
    borderRadius: 6,
    backgroundColor: "#512DA8",
  },

  bottom_button: {
    marginTop: 10,
    height: 50,
    width: 315,
    borderRadius: 6,
    backgroundColor: "transparent",
    elevation: 0,
  },

  button_text: {
    color: "white",
    fontSize: 16,
    letterSpacing: 0.3,
  },

  text: {
    color: "black",
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

  top_error: {
    marginTop: 20,
    textAlign: "center",
  },
})

export default React.memo(LoginScreen, isEqualMemoComparison)
