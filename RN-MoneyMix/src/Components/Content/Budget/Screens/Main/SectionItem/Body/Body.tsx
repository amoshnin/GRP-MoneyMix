// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import {
  renderPrice,
  renderBillIcon,
  renderCategoryTitle,
  renderBillName,
  renderBillMoney,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

import CategoryFieldItem from "./CategoryFieldItem/CategoryFieldItem"
import LongButton from "~/Components/Shared/Components/Buttons/LongButton/LongButton"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null
  fieldsArray: Array<any>
  budgetedFieldsArray: Array<any>

  isBill?: boolean
  isIncome?: boolean
}

const Body: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <View style={styles.container}>
        {props.budgetedFieldsArray.length > 0 &&
          props.budgetedFieldsArray.map((field: any) => {
            return (
              <CategoryFieldItem
                key={field.icon}
                navigation={props.navigation}
                selectedCurrency={props.selectedCurrency}
                field={field}
                isIncome={props.isIncome}
                isBill={props.isBill}
              />
            )
          })}
      </View>
      {props.budgetedFieldsArray &&
        props.budgetedFieldsArray.length > 0 &&
        props.fieldsArray &&
        props.fieldsArray.length > 0 && <View style={styles.divider} />}
      <View style={[styles.container, props.isBill && { paddingBottom: 15 }]}>
        <View
          style={[
            styles.categories_container,
            props.isBill && {
              flexDirection: "column",
              flexWrap: "nowrap",
              marginHorizontal: 20,
            },
          ]}
        >
          {props.fieldsArray.map((field: any) => {
            return props.isBill ? (
              <LongButton
                key={field.icon}
                title={renderBillName(field.name, t)}
                icon={renderBillIcon(field.type, field.icon)}
                content={renderPrice(
                  renderBillMoney(
                    field.type,
                    field.accountBalance,
                    field.iOwe,
                    field.totalDebtSum
                  ),
                  props.selectedCurrency,
                  t
                )}
                subtitle1={t("CreateScreen.Body.AccountBalance")}
                subtitle2={t("CreateScreen.Body.Goal")}
                subValue1={renderPrice(
                  field.accountBalance || 0,
                  props.selectedCurrency,
                  t
                )}
                subValue2={renderPrice(
                  field.goal || 0,
                  props.selectedCurrency,
                  t
                )}
                onPress={() => {
                  props.navigation.navigate("MoneyBudgetTransferScreen", {
                    isSavingsBill: true,
                    data: field,
                  })
                }}
              />
            ) : (
              <RoundButton
                key={field.icon}
                topText={renderCategoryTitle(field.title, t)}
                backgroundColor={field.color}
                selectedCurrency={props.selectedCurrency}
                wrapperStyle={styles.category_item}
                containerStyle={styles.round_btn}
                onPress={() =>
                  props.navigation.navigate("MoneyBudgetTransferScreen", {
                    isIncome: props.isIncome,
                    isSavingsBill: false,
                    data: field,
                  })
                }
              >
                <FontAwesome name={field.icon} size={24} color={"white"} />
              </RoundButton>
            )
          })}
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    marginBottom: -7,
  },

  categories_container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: -19,
    marginHorizontal: 10,
  },

  category_item: {
    marginRight: "3.5%",
  },

  round_btn: {
    marginTop: 4,
  },

  divider: {
    borderTopColor: "silver",
    borderTopWidth: 1,
    paddingVertical: 3,
    backgroundColor: "white",
    opacity: 0.8,
  },
})

export default React.memo(Body, isEqualMemoComparison)
