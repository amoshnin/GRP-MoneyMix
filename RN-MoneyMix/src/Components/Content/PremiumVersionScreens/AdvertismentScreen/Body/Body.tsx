// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import ListItem from "./ListItem/ListItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {}

const Body: React.FC<PropsType> = (props) => {
  const images = {
    Sales: require("~/Images/vip-sale.png"),
    Bills: require("~/Images/vip-bills.png"),
    Categories: require("~/Images/vip-categories.png"),
    Sync: require("~/Images/vip-sync.png"),
    Profiles: require("~/Images/vip-profiles.png"),
    Templates: require("~/Images/vip-templates.png"),
  }

  const { t } = useTranslation()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ListItem
        title={t("PremiumVersionScreen.AdvertismentScreen.Sale")}
        desc={t("PremiumVersionScreen.AdvertismentScreen.SaleText")}
        image={images.Sales}
      />
      <View style={styles.divider} />
      <ListItem
        title={t("PremiumVersionScreen.AdvertismentScreen.Bills")}
        desc={t("PremiumVersionScreen.AdvertismentScreen.BillsText")}
        image={images.Bills}
      />
      <View style={styles.divider} />
      <ListItem
        title={t("PremiumVersionScreen.AdvertismentScreen.Categories")}
        desc={t("PremiumVersionScreen.AdvertismentScreen.CategoriesText")}
        image={images.Categories}
      />
      <View style={styles.divider} />
      <ListItem
        title={t("PremiumVersionScreen.AdvertismentScreen.Sync")}
        desc={t("PremiumVersionScreen.AdvertismentScreen.SyncText")}
        image={images.Sync}
      />
      <View style={styles.divider} />
      <ListItem
        title={t("PremiumVersionScreen.AdvertismentScreen.Profiles")}
        desc={t("PremiumVersionScreen.AdvertismentScreen.ProfilesText")}
        image={images.Profiles}
      />
      <View style={styles.divider} />
      <ListItem
        title={t("PremiumVersionScreen.AdvertismentScreen.Templates")}
        desc={t("PremiumVersionScreen.AdvertismentScreen.TemplatesText")}
        image={images.Templates}
      />
      <View style={styles.divider} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
    marginTop: -10,
  },

  divider: {
    borderTopColor: "black",
    borderTopWidth: 1,
    opacity: 0.1,
  },
})

export default React.memo(Body, isEqualMemoComparison)
