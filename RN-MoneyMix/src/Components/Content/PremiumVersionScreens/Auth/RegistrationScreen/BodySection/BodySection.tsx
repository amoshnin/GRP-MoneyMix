// PLUGINS IMPORTS //
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { TextInput } from "react-native-paper"
import { RectButton } from "react-native-gesture-handler"
import { Formik } from "formik"
import * as yup from "yup"
import { GoogleSignin } from "@react-native-community/google-signin"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import PasswordInput from "~/Components/Shared/Components/PasswordInput/PasswordInput"
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  userInfo: {
    avatarURL: string | null
    name: string | null
    email: string | null
  }
  setUserInfo: (newUserInfo: {
    avatarURL: string | null
    name: string | null
    email: string | null
  }) => void
  RegisterUserThunkCreatior: (
    email: string,
    password: string,
    PremiumFinishDate: string | null,
    productId: string,
    userInfo: {
      avatarURL: string | null
      name: string | null
      email: string | null
    }
  ) => any
}

const BodySection: React.FC<PropsType> = (props) => {
  const [allowButtonLoading, setAllowButtonLoading] = useState(false as boolean)
  const { t } = useTranslation()

  const ValidationSchema = yup.object({
    email: yup
      .string()
      .required(t("Validation.EmailRequired"))
      .email(t("Validation.InvalidEmail"))
      .typeError(t("Validation.EmailRequired")),
    password: yup
      .string()
      .min(6, t("Validation.ShortPassword"))
      .max(16, t("Validation.LongPassword"))
      .matches(/[a-zA-Z]/ as any, t("Validation.PasswordLatin"))
      .required(t("Validation.PasswordRequired"))
      .typeError(t("Validation.PasswordRequired")),
  })

  useEffect(() => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: "moneymix-f7423@appspot.gserviceaccount.com",
    })
  }, [])

  useEffect(() => {
    props.navigation.addListener("blur", async () => {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
    })
  }, [props.navigation])

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const user = await GoogleSignin.signIn()
      props.setUserInfo({
        avatarURL: user.user.photo,
        name: user.user.name,
        email: user.user.email,
      })
    } catch (error) {}
  }

  return (
    <View style={styles.container}>
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          email: props.userInfo.email as string | null,
          password: null as string | null,
        }}
        onSubmit={(values: any) => {
          setAllowButtonLoading(true)
          props
            .RegisterUserThunkCreatior(
              values.email,
              values.password,
              props.route.params.PremiumFinishDate,
              props.route.params.productId,
              props.userInfo
            )
            .then(() => props.navigation.navigate("BottomTabNavigator"))
        }}
      >
        {(FormikProps) => {
          useEffect(() => {
            props.userInfo.email &&
              FormikProps.setValues({
                email: props.userInfo.email,
                password: FormikProps.values.password,
              })
          }, [props.userInfo.email])

          return (
            <>
              <View>
                <TextInput
                  accessibilityStates
                  label="Email"
                  onChangeText={FormikProps.handleChange("email")}
                  onBlur={() => {
                    FormikProps.handleBlur("email")
                  }}
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  value={FormikProps.values.email as any}
                  style={styles.input}
                />
              </View>
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
                title={t("PremiumVersionScreen.Auth.Register")}
                onPress={FormikProps.handleSubmit}
                containerStyle={styles.button}
                textStyle={styles.button_text}
                unSliceTitle
                showLoading={allowButtonLoading}
              />

              <RectButton
                style={styles.google_login}
                rippleColor="silver"
                onPress={() => signIn()}
              >
                <AntDesign name="google" size={24} color="white" />
              </RectButton>
            </>
          )
        }}
      </Formik>
    </View>
  )
}

//   STYLES   //
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
  },

  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },

  title: {
    width: 169,
    marginBottom: 12,
  },

  input: {
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

  google_login: {
    alignSelf: "center",
    marginTop: 20,
    elevation: 10,
    backgroundColor: "#DB4437",
    borderRadius: 100,
    padding: 10,
    paddingHorizontal: 100,
  },
})

export default React.memo(BodySection, isEqualMemoComparison)
