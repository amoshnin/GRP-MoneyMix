// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { renderProfile } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  profileTitle: string

  selectedProfile: string
  setSelectedProfile: (selectedProfile: string) => void
  setPopupVisible: (popupVisibility: boolean) => void
  deleteProfileThunkCreator: (oldProfileName: string) => void
}

const ProfileItem: React.FC<PropsType> = (props) => {
  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  const selectNewProfile = async () => {
    await AsyncStorage.setItem("selectedProfile", props.profileTitle).then(
      () => {
        props.setSelectedProfile(props.profileTitle)
        props.setPopupVisible(false)
      }
    )
  }

  const isSelected = props.selectedProfile === props.profileTitle

  return (
    <>
      <View
        style={[
          styles.container,
          isSelected && {
            backgroundColor: "rgba(213, 184, 255, 0.5)",
          },
        ]}
      >
        <TouchableOpacity
          style={styles.content}
          onPress={() => selectNewProfile()}
          hitSlop={{ left: 20, right: 20, top: 10, bottom: 10 }}
        >
          <MaterialIcons name="account-circle" size={24} color="gray" />
          <Text style={styles.title}>
            {renderProfile(props.profileTitle, t)}
          </Text>
        </TouchableOpacity>
        {!isSelected && (
          <TouchableOpacity onPress={() => setAlertPopupVisible(true)}>
            <AntDesign name="closecircle" size={18.5} color="gray" />
          </TouchableOpacity>
        )}
      </View>

      <AlertPopup
        popupVisible={alertPopupVisible}
        setPopupVisible={setAlertPopupVisible}
        title={t("PremiumVersionScreen.Popups.TTDeleteProfile")}
        content={
          <>
            <Text>{t("PremiumVersionScreen.Popups.PPDeleteProfile")}</Text>
            <Text style={styles.text_bold}>{props.profileTitle}</Text>
          </>
        }
        function={async () => {
          props.setPopupVisible(false)
          await props.deleteProfileThunkCreator(props.profileTitle)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 15,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#674ABE",
    fontWeight: "bold",
    marginHorizontal: 10,
    fontSize: 15,
    marginBottom: 2,
  },

  text_bold: {
    fontWeight: "bold",
  },
})

export default React.memo(ProfileItem, isEqualMemoComparison)
