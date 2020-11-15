// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"

// COMPONENTS IMPORTS //
import SettingsBlock from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/SettingsBlock/SettingsBlock"
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  isAuthentificated: boolean

  isIncome: boolean
  selectedDate: Date
  setSelectedDate: (newSelectedDate: Date) => void

  totalValue: string
  setTotalValue: (newTotalValue: string) => void

  newMoneyAmount: string
  setNewMoneyAmount: (newMoneyAmount: string) => void
  sendNewMoney: () => void

  sign: string
  setSign: (sign: string) => void
  removeDateSelection?: boolean
}

const NumberPad: React.FC<PropsType> = (props) => {
  const concatToAmount = (number: string) => {
    if (!props.sign) {
      props.setTotalValue(props.totalValue.concat(number))
    } else {
      props.setNewMoneyAmount(props.newMoneyAmount.concat(number))
    }
  }

  const removeLastChar = () => {
    props.setNewMoneyAmount("")
    props.setTotalValue("")
    props.setSign("")
  }

  const CleanedNewMoneyAmount = props.newMoneyAmount
    .replace("+", "")
    .replace("-", "")
    .replace("*", "")
    .replace("/", "")
    .replace(" ", "")

  const CleanedTotalAmount = props.totalValue
    .replace("+", "")
    .replace("-", "")
    .replace("*", "")
    .replace("/", "")
    .replace(" ", "")

  const OperateValue = (sign: string) => {
    if (props.totalValue || props.newMoneyAmount) {
      if (sign === "+") {
        props.setSign("+")
        concatToAmount("+")
      } else if (sign === "-") {
        props.setSign("-")
        concatToAmount("-")
      } else if (sign === "*") {
        props.setSign("*")
        concatToAmount("*")
      } else if (sign === "/") {
        props.setSign("/")
        concatToAmount("/")
      }
    }
  }

  const GetResult = () => {
    if (props.sign === "+") {
      props.setTotalValue(
        String(Number(CleanedTotalAmount) + Number(CleanedNewMoneyAmount))
      )
      props.setSign("")
    } else if (props.sign === "-") {
      props.setTotalValue(
        String(Number(CleanedTotalAmount) - Number(CleanedNewMoneyAmount))
      )
      props.setSign("")
    } else if (props.sign === "*") {
      props.setTotalValue(
        String(Number(CleanedTotalAmount) * Number(CleanedNewMoneyAmount))
      )
      props.setSign("")
    } else if (props.sign === "/") {
      props.setTotalValue(
        String(Number(CleanedTotalAmount) / Number(CleanedNewMoneyAmount))
      )
      props.setSign("")
    }

    props.setNewMoneyAmount("")
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <BlockItem
          icon={<Text style={styles.number}>+</Text>}
          onPress={() => {
            OperateValue("+")
          }}
          isGray
        />
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
        <BlockItem
          icon={<Text style={styles.number}>*</Text>}
          onPress={() => {
            OperateValue("*")
          }}
          isGray
        />
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
          isIncome={props.isIncome}
          totalValue={props.totalValue}
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
          removeDateSelection={props.removeDateSelection}
        />
      </View>

      <View style={styles.container}>
        <BlockItem
          icon={<Text style={styles.number}>-</Text>}
          onPress={() => {
            OperateValue("-")
          }}
          isGray
        />
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
          icon={
            props.sign ? (
              <FontAwesome5 name="equals" size={24} color="white" />
            ) : (
              <Feather name="check" size={35} color="white" />
            )
          }
          onPress={props.sign ? GetResult : props.sendNewMoney}
          containerStyle={[
            { height: 162, flex: 1 },
            props.isIncome
              ? {
                  backgroundColor: "#01CA5C",
                }
              : {
                  backgroundColor: "#FF3940",
                },
          ]}
        />
      </View>
      <View style={[styles.container, { marginTop: -90, marginRight: "20%" }]}>
        <BlockItem
          icon={<Text style={styles.number}>/</Text>}
          onPress={() => {
            OperateValue("/")
          }}
          isGray
        />
        <BlockItem
          icon={<Text style={styles.number}>.</Text>}
          onPress={() => props.totalValue.length > 0 && concatToAmount(".")}
        />
        <BlockItem
          icon={<Text style={styles.number}>0</Text>}
          onPress={() => concatToAmount("0")}
        />
        <BlockItem />
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
