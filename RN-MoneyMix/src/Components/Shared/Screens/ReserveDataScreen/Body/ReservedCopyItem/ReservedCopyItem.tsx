// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { RectButton, TouchableOpacity } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import TitledPopup from "~/Components/Shared/Components/Popups/TitledPopup/TitledPopup"
import LineItem from "~/Components/Shared/Components/LineItem/LineItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  reservedCopyID: string
  index: number

  setResponsePopupData: (newResponsePopupData: {
    visible: boolean
    title: string | null
    body: string | null
  }) => void
  removeReserveCopyThunkCreator: (ID: string) => any
  applyReserveCopyThunkCreator: (ID: string) => any
}

const ReservedCopyItem: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <>
      <RectButton style={styles.container}>
        <View style={styles.title_wrap}>
          <View style={styles.index_wrap}>
            <Text style={styles.index}>{props.index}</Text>
          </View>
          <Text style={styles.title}>
            {dayjs(props.reservedCopyID).format("DD/MM/YYYY-HH:mm")}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setPopupVisible(true)}
          hitSlop={{ right: 20, left: 20, top: 20, bottom: 20 }}
        >
          <Entypo name="dots-three-vertical" size={21} color="black" />
        </TouchableOpacity>
      </RectButton>

      <TitledPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        title={t("MoneyCategoriesTransferScreen.Popups.ChooseAction")}
        height={"22%"}
        wrapperStyle={styles.popup_wrapper}
      >
        <LineItem
          title={t("GeneralPhrases.Apply")}
          icon={<AntDesign name="checkcircleo" size={22} color="black" />}
          onPress={() => {
            setPopupVisible(false)
            props.applyReserveCopyThunkCreator(props.reservedCopyID).then(() =>
              props.setResponsePopupData({
                visible: true,
                title: t("ReservedDataScreen.Popup.TitleRestoreSuccess"),
                body: t("ReservedDataScreen.Popup.PPRestoreSuccess"),
              })
            )
          }}
          styles={styles.line_item}
        />
        <LineItem
          title={t("Operations.Popup.Delete")}
          icon={
            <MaterialCommunityIcons name="delete" size={24} color="black" />
          }
          onPress={() => {
            setPopupVisible(false)
            props.removeReserveCopyThunkCreator(props.reservedCopyID)
          }}
        />
      </TitledPopup>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 14,
    justifyContent: "space-between",
  },

  title_wrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  index_wrap: {
    backgroundColor: "#674ABE",
    borderRadius: 100,
    height: 25,
    width: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  index: {
    color: "white",
  },

  title: {
    fontSize: 15,
    color: "black",
  },

  popup_wrapper: {
    width: "86%",
  },

  line_item: {
    marginTop: 5,
  },
})

export default React.memo(ReservedCopyItem, isEqualMemoComparison)
