// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import { TextInput } from "react-native-paper"
import { Formik } from "formik"
import * as yup from "yup"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  renderBillName,
  renderBillIcon,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  selectedCurrency: string

  createNewBankSMSThunkCreator: (
    bill: any,
    originatingAddress: string,
    templateMessage: string
  ) => any
}

const InputNewSMSInfoScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const ValidationSchema = yup.object({
    originatingAddress: yup
      .string()
      .required(`${t("BankSMSSettings.OriginatingAdress")} is required`)
      .typeError(`${t("BankSMSSettings.OriginatingAdress")} is required`),
  })

  const selecteBill = props.route.params.bill
  return (
    <View style={styles.container}>
      <Button
        title={renderBillName(selecteBill.name, t)}
        content={`${selecteBill.accountBalance || "0"} ${t(
          `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
        )}`}
        icon={renderBillIcon(selecteBill.type, selecteBill.icon)}
        containerStyle={styles.button}
      />
      <Formik
        validationSchema={ValidationSchema}
        initialValues={{
          originatingAddress: null as number | null,
        }}
        onSubmit={(values: any) => {
          props.createNewBankSMSThunkCreator(
            selecteBill,
            values.originatingAddress,
            ""
          )
          props.navigation.navigate("BankSMSMain")
        }}
      >
        {(FormikProps) => (
          <>
            <View>
              <TextInput
                accessibilityStates
                placeholder={t("BankSMSSettings.OriginatingAdress")}
                placeholderTextColor="rgba(26, 24, 36, 0.5)"
                onChangeText={FormikProps.handleChange("originatingAddress")}
                onBlur={() => {
                  FormikProps.handleBlur("originatingAddress")
                }}
                value={FormikProps.values.originatingAddress as any}
                style={styles.input}
              />
            </View>
            {FormikProps.touched.originatingAddress &&
              FormikProps.errors.originatingAddress && (
                <Text style={styles.error_message}>
                  {FormikProps.touched.originatingAddress &&
                    FormikProps.errors.originatingAddress}
                </Text>
              )}

            <Button
              title={t("GeneralPhrases.Save")}
              onPress={FormikProps.handleSubmit}
              containerStyle={styles.submit_button}
              textStyle={styles.submit_button_text}
            />
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: 50,
  },

  button: {
    alignSelf: "center",
    marginBottom: 50,
    width: "50%",
  },

  title: {
    width: 169,
    marginBottom: 12,
  },

  input: {
    height: 45,
    width: 315,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "white",
  },

  icon: {
    width: 20,
    height: 12,
    marginRight: 4,
  },

  error_message: {
    color: "crimson",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: -10,
    marginLeft: 6,
    fontSize: 12.5,
    alignSelf: "flex-start",
  },

  submit_button: {
    marginTop: 5,
    height: 50,
    width: 315,
    borderRadius: 6,
    backgroundColor: "#512DA8",
  },

  submit_button_text: {
    color: "white",
    fontSize: 16,
    letterSpacing: 0.3,
  },
})

export default InputNewSMSInfoScreen
