// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
} from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import TemplateItem from "./TemplateItem/TemplateItem"

// EXTRA IMPORTS //
import EmptyListSVG from "~/Images/SVG/EmptyListSVG"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string

  TemplatesList: Array<{
    bill: any
    originatingAddress: string
    templateMessage: string
  }>

  getTemplatesListThunkCreator: () => void
}

const Main: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  useEffect(() => {
    props.getTemplatesListThunkCreator()

    const askPermissions = async () => {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS)
    }

    askPermissions()
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {props.TemplatesList && props.TemplatesList.length > 0 ? (
        props.TemplatesList.map(
          (template: {
            bill: any
            originatingAddress: string
            templateMessage: string
          }) => {
            return (
              <TemplateItem
                navigation={props.navigation}
                selectedCurrency={props.selectedCurrency}
                template={template}
              />
            )
          }
        )
      ) : (
        <View style={styles.empty_container}>
          <EmptyListSVG height={225} width={225} />

          <Text style={styles.empty_text}>
            {t("EmptyLists.EmptyBankSMSSettings")}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate("ChooseBillScreenContainer")}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  empty_container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  empty_text: {
    marginBottom: 100,
    fontSize: 17,
    width: "90%",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#512DA8",
    height: 55,
    width: 55,
    position: "absolute",
    bottom: 22,
    right: 22,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default Main
