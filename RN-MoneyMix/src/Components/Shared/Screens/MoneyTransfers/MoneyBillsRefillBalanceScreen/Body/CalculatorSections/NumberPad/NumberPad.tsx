// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  totalValue: string
  setTotalValue: (newTotalValue: string) => void

  newMoneyAmount: string
  setNewMoneyAmount: (newMoneyAmount: string) => void
  sendNewMoney: () => void

  sign: string
  setSign: (sign: string) => void
}

const NumberPad: React.FC<PropsType> = (props) => {
  const concatToAmount = (number: string) => {
    if (!props.sign) {
      props.setTotalValue(
        props.totalValue === "0"
          ? number
          : String(props.totalValue).concat(number)
      )
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
        <BlockItem isGray removeRipple />
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
          containerStyle={{
            flex: 1,
            height: 162,
            backgroundColor: "#FF3940",
          }}
          icon={
            props.sign ? (
              <FontAwesome5 name="equals" size={24} color="white" />
            ) : (
              <Feather name="check" size={35} color="white" />
            )
          }
          onPress={props.sign ? GetResult : props.sendNewMoney}
        />
      </View>
      <View style={[styles.container, { marginTop: -90 }]}>
        <BlockItem
          icon={<Text style={styles.number}>/</Text>}
          onPress={() => OperateValue("/")}
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
        <BlockItem removeRipple />
        <BlockItem
          containerStyle={{
            flex: 1,
            backgroundColor: "transparent",
          }}
          internalContainerStyle={{
            borderWidth: 0,
          }}
          onPress={props.sign ? GetResult : props.sendNewMoney}
        />
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
