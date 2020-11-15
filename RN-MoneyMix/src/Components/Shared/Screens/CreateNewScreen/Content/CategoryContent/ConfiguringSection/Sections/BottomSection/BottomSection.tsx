// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import WhiteBlock from "../../../../../../../Components/WhiteBlock/WhiteBlock"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Ionicons } from "@expo/vector-icons"
import { Switch } from "react-native-paper"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    id: string
    subCategories: Array<any>
    archived: boolean
  }

  archiveStatus: boolean
  setArchiveStatus: (newArchiveStatus: boolean) => void
}

const BottomSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <WhiteBlock containerStyle={styles.container}>
      <View style={styles.title_wrap}>
        <Ionicons name="md-archive" size={24} color="#674ABE" />
        <Text style={styles.title}>
          {t("Categories.Main.ArchivedCategory")}
        </Text>
      </View>
      <Switch
        accessibilityStates
        value={props.archiveStatus}
        onValueChange={(value: boolean) => props.setArchiveStatus(value)}
        color={"#674ABE"}
      />
    </WhiteBlock>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title_wrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    fontSize: 16,
    marginLeft: 15,
    color: "black",
  },
})

export default React.memo(BottomSection, isEqualMemoComparison)
