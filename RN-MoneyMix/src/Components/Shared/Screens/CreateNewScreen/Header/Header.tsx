// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { BorderlessButton } from "react-native-gesture-handler"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"
import { Formik } from "formik"
import * as yup from "yup"

// COMPONENTS IMPORTS //
import {
  renderBillName,
  renderCategoryTitle,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  title: string
  isCategoryCreate: boolean

  name?: string
  setBillName?: any
  billEditData?: any
  isIncome?: boolean

  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    subCategories: Array<any>
    id: string
  }

  selectedIcon: string | null
  selectedColor: string | null
  archiveStatus: boolean
  subCategories: Array<any>
  deletingSubCategories: Array<any>
  submitNewCategory: (title: string) => void

  setUploadBillData: (uploadBillStatus: boolean) => void
  getCategoriesListsThunkCreator: () => void
}

const Header: React.FC<PropsType> = (props) => {
  const [title, setTitle] = useState(
    props.category && (props.category.title as any)
  )
  const { t } = useTranslation()

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      props.category && setTitle(props.category.title)
    })
    props.navigation.addListener("blur", () => {
      setTitle(null)
      props.setBillName(null)
    })
  }, [props.navigation])

  useEffect(() => {
    props.category && setTitle(props.category.title)
  }, [props.route])

  const clearTempStorageInfo = async () => {
    setTitle(null)
    await AsyncStorage.removeItem("tempNewCategoryInfo")
  }

  const submitNewBill = (field: string) => {
    props.setBillName(field)
    props.setUploadBillData(true)
  }

  const ValidationSchema = yup.object({
    field: yup
      .string()
      .required(t("CreateScreen.Header.NameIsRequired"))
      .typeError(t("CreateScreen.Header.NameIsRequired")),
  })

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        enableReinitialize
        validationSchema={ValidationSchema}
        initialValues={{
          field: props.category
            ? (renderCategoryTitle(title, t, true) as string | null)
            : renderBillName(props.billEditData?.name, t) ||
              renderBillName(props.name as string, t),
        }}
        onSubmit={(values: any) => {
          if (props.category || props.isCategoryCreate) {
            props.submitNewCategory(values.field)
          } else {
            submitNewBill(values.field)
          }

          values.field = ""
        }}
      >
        {(FormikProps) => {
          return (
            <>
              <View style={styles.header_wrap}>
                <View style={styles.side_wrap}>
                  <BorderlessButton
                    onPress={() => {
                      clearTempStorageInfo()
                      props.navigation.goBack()
                    }}
                    hitSlop={{ vertical: 20, horizontal: 20 }}
                  >
                    <AntDesign name="close" size={24} color="white" />
                  </BorderlessButton>
                  <Text style={styles.title}>
                    {t(`CreateScreen.Header.${props.title}`)}
                  </Text>
                </View>
                <BorderlessButton
                  onPress={() => {
                    FormikProps.handleSubmit()
                  }}
                  hitSlop={{ vertical: 20, horizontal: 20 }}
                >
                  <AntDesign name="check" size={24} color="white" />
                </BorderlessButton>
              </View>
              <TextInput
                placeholder={t("CreateScreen.Header.Name")}
                placeholderTextColor="silver"
                onChangeText={FormikProps.handleChange("field")}
                onBlur={() => {
                  FormikProps.handleBlur("field")
                }}
                value={FormikProps.values.field as string}
                style={styles.input}
              />
              {FormikProps.touched.field && FormikProps.errors.field && (
                <Text style={styles.error_message}>
                  {FormikProps.touched.field && FormikProps.errors.field}
                </Text>
              )}
            </>
          )
        }}
      </Formik>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#512DA8",
    borderBottomRightRadius: 40,
    height: 184,
  },

  header_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginHorizontal: 20,
    marginLeft: 15,
  },

  side_wrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
  },

  input: {
    backgroundColor: "transparent",
    marginHorizontal: 20,
    fontSize: 18,
    color: "white",
    borderBottomColor: "#808080",
    paddingBottom: 5,
    borderBottomWidth: 0.5,
    marginTop: 30,
  },

  error_message: {
    color: "pink",
    marginTop: 3,
    marginLeft: 20,
  },
})

export default React.memo(Header, isEqualMemoComparison)
