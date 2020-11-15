// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import IconsSelectScreen from "./IconsSelectScreen/IconsSelectScreen"

import WhiteBlock from "../../../../../Components/WhiteBlock/WhiteBlock"
import LineItem from "./LineItem/LineItem"
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import {
  renderBillIcon,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  billType: string

  selectedIcon: string | null
  setSelectedIcon: (newSelectedIcon: string) => void

  description: string
  setDescription: (newDescription: string) => void
}

const UpperPart: React.FC<PropsType> = (props) => {
  const [iconsPopupVisible, setIconsPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  const [popupVisible, setPopupVisible] = useState(false as boolean)

  return (
    <>
      <WhiteBlock containerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{t("BillsScreen.Bills")}</Text>

          <LineItem
            title={t("CreateScreen.Body.Type")}
            subtitle={t(`BillsScreen.CreateNewBillPopup.${props.billType}`)}
          />
          <View style={styles.divider} />

          <LineItem
            title={t("CreateScreen.Body.Description")}
            subtitle={props.description || t("GeneralPhrases.no")}
            onPress={() => {
              setPopupVisible(true)
            }}
          />
        </View>

        <RoundButton
          backgroundColor={"#512DA8"}
          wrapperStyle={styles.icon}
          onPress={() => setIconsPopupVisible(!iconsPopupVisible)}
        >
          {renderBillIcon(
            props.billType,
            props.selectedIcon as string,
            "white"
          )}
        </RoundButton>
      </WhiteBlock>
      <InputPopup
        value={props.description}
        onChangeFunction={props.setDescription}
        title={t(`CreateScreen.Body.Description`)}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
      />
      <IconsSelectScreen
        navigation={props.navigation}
        selectedIcon={props.selectedIcon}
        setSelectedIcon={props.setSelectedIcon}
        popupVisible={iconsPopupVisible}
        setPopupVisible={setIconsPopupVisible}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 180,
    marginTop: -20,
    borderTopRightRadius: 20,
    elevation: 10,
  },

  content: {
    flex: 1,
  },

  icon: {
    marginTop: 20,
  },

  title: {
    fontSize: 20,
    marginTop: 17,
    marginBottom: 10,
    color: "black",
  },

  divider: {
    borderTopColor: "black",
    borderTopWidth: 1,
    opacity: 0.1,
    marginVertical: 12,
    width: "134%",
  },
})

export default React.memo(UpperPart, isEqualMemoComparison)
