// PLUGINS IMPORTS //
import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import LineItem from "./LineItem/LineItem"
import {
  renderBillName,
  renderBillIcon,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  deleteBankSMSThunkCreator: (templateID: string) => void
}

const IndividualBankSMSScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const templateInfo = props.route.params.templateInfo

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <LineItem
          title={t("BillsScreen.Bills")}
          value={renderBillName(templateInfo.bill.name, t)}
          icon={renderBillIcon(templateInfo.bill.type, templateInfo.bill.icon)}
        />
        <LineItem
          title={t("BankSMSSettings.OriginatingAdress")}
          value={templateInfo.originatingAddress}
          icon={<MaterialIcons name="location-on" size={26} color="#674ABE" />}
        />
      </View>

      <TouchableOpacity
        style={styles.delete_icon}
        onPress={() => {
          props.deleteBankSMSThunkCreator(templateInfo.ID)
          props.navigation.goBack()
        }}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  container: {
    marginHorizontal: 15,
    backgroundColor: "white",
    elevation: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  delete_icon: {
    backgroundColor: "#DB4437",
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 22,
    right: 22,
  },
})

export default IndividualBankSMSScreen
