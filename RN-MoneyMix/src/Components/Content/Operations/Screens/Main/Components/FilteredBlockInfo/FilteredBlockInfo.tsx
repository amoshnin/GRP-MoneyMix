// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import {
  renderBillName,
  renderCategoryTitle,
  renderBillIcon,
  renderPrice,
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  data?: {
    title: string
    icon: string
    color: string
    price: string
    type: string
  }

  isCategory: boolean
  selectedCurrency: string
  operationsCount: number
}

const FilteredBlockInfo: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.icon}>
          {renderBillIcon(
            props.data?.type as string,
            props.data?.icon,
            "#01CA5C"
          )}
        </View>
        <View>
          <Text style={styles.subtitle}>
            {props.operationsCount || 0}{" "}
            {t("BillsScreen.EditBillPopup.Operations").toLowerCase()}
          </Text>
          <Text style={styles.title}>
            {props.isCategory
              ? sliceString(
                  renderCategoryTitle(
                    props.data?.title as string,
                    t,
                    true
                  ).toUpperCase(),
                  13
                )
              : sliceString(
                  renderBillName(props.data?.title as string, t).toUpperCase(),
                  13
                )}
          </Text>
        </View>
      </View>
      <Text style={styles.price}>
        {renderPrice(props.data?.price as string, props.selectedCurrency, t)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#01CA5C",
    height: 70,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  container: {
    flexDirection: "row",
  },

  icon: {
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },

  subtitle: {
    color: "white",
  },

  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default React.memo(FilteredBlockInfo, isEqualMemoComparison)
