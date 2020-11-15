// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { RectButton } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string

  template: any
}

const TemplateItem: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <RectButton
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("IndividualBankSMSScreen", {
          bill: props.template.bill,
          templateInfo: props.template,
        })
      }
    >
      <View style={styles.icon}>
        {props.template.bill.icon === "dollar" ? (
          <FontAwesome name={"dollar"} size={24} color="white" />
        ) : props.template.bill.icon === "creditcard" ? (
          <AntDesign name={"creditcard"} size={24} color="white" />
        ) : (
          <FontAwesome5 name={"piggy-bank"} size={24} color="white" />
        )}
      </View>
      <View style={styles.content_container}>
        <View>
          <View style={styles.title_wrap}>
            <Text style={styles.name}>{props.template.bill.name}</Text>
            <Text style={styles.text}>
              {" "}
              - {props.template.originatingAddress}
            </Text>
          </View>
          <Text>{props.template.templateMessage}</Text>
        </View>
        <Text style={styles.name}>
          {props.template.bill.accountBalance}{" "}
          {t(`DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`)}
        </Text>
      </View>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    backgroundColor: "#674ABE",
    height: 45,
    width: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },

  content_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "83%",
    marginLeft: 10,
  },

  name: {
    fontWeight: "bold",
    fontSize: 18,
  },

  text: {
    fontSize: 16,
    marginTop: 2,
  },

  title_wrap: {
    flexDirection: "row",
  },
})

export default TemplateItem
