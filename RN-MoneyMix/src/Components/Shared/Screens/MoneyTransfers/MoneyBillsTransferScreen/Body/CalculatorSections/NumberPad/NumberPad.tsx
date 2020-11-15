// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"

// COMPONENTS IMPORTS //
import SettingsBlock from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/SettingsBlock/SettingsBlock"
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  isAuthentificated: boolean

  selectedDate: Date
  setSelectedDate: (newSelectedDate: Date) => void

  newMoneyAmount: string
  setNewMoneyAmount: (newMoneyAmount: string) => void

  sendNewMoney: () => void
}

const NumberPad: React.FC<PropsType> = (props) => {
  const concatToAmount = (number: string) => {
    props.setNewMoneyAmount(props.newMoneyAmount.concat(number))
  }

  const removeLastChar = () => {
    const newStr = props.newMoneyAmount.slice(0, -1)
    props.setNewMoneyAmount(newStr)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <BlockItem isGray removeRipple />
        <BlockItem
          icon={<Text style={styles.number}>1</Text>}
          onPress={() => concatToAmount("1")}
        />
        <BlockItem
          icon={<Text style={styles.number}>2</Text>}
          onPress={() => concatToAmount("2")}
        />
        <BlockItem
          icon={<Text style={styles.number}>3</Text>}
          onPress={() => concatToAmount("3")}
        />
        <BlockItem
          icon={<Feather name="delete" size={24} color="#674ABE" />}
          onPress={removeLastChar}
          isGray
        />
      </View>

      <View style={styles.container}>
        <BlockItem isGray removeRipple />
        <BlockItem
          icon={<Text style={styles.number}>4</Text>}
          onPress={() => concatToAmount("4")}
        />
        <BlockItem
          icon={<Text style={styles.number}>5</Text>}
          onPress={() => concatToAmount("5")}
        />
        <BlockItem
          icon={<Text style={styles.number}>6</Text>}
          onPress={() => concatToAmount("6")}
        />
        <SettingsBlock
          navigation={props.navigation}
          isOnline={props.isOnline}
          isAuthentificated={props.isAuthentificated}
          isIncome={null}
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
          totalValue={props.newMoneyAmount}
        />
      </View>

      <View style={[styles.container, { marginTop: -0.5 }]}>
        <BlockItem isGray removeRipple />
        <BlockItem
          icon={<Text style={styles.number}>7</Text>}
          onPress={() => concatToAmount("7")}
        />
        <BlockItem
          icon={<Text style={styles.number}>8</Text>}
          onPress={() => concatToAmount("8")}
        />
        <BlockItem
          icon={<Text style={styles.number}>9</Text>}
          onPress={() => concatToAmount("9")}
        />
        <BlockItem
          icon={<Feather name="check" size={35} color="white" />}
          onPress={() => {
            props.sendNewMoney()
          }}
          containerStyle={{
            height: 162,
            flex: 1,
            backgroundColor: "#FF3940",
          }}
        />
      </View>

      <View style={[styles.container, { marginTop: -90, marginRight: "20%" }]}>
        <BlockItem isGray removeRipple />
        <BlockItem
          icon={<Text style={styles.number}>.</Text>}
          onPress={() => props.newMoneyAmount.length > 0 && concatToAmount(".")}
        />
        <BlockItem
          icon={<Text style={styles.number}>0</Text>}
          onPress={() => concatToAmount("0")}
        />
        <BlockItem removeRipple />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
  },

  number: {
    color: "#674ABE",
    fontSize: 30,
  },
})

export default React.memo(NumberPad, isEqualMemoComparison)
