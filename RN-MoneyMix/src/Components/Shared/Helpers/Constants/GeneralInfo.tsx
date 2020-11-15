import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"

export const serverUrl = "https://us-central1-moneymix-f7423.cloudfunctions.net/" as string
export const renderSelectedCurrency = (selectedCurrency: string, t: any) => {
  return t(`DrawerNavigator.ButtonsList.${selectedCurrency}Currency`)
}

////////////////////////////////

/////////////////////////////////

const category1ID = generateRandomID()
const category2ID = generateRandomID()
const category3ID = generateRandomID()
const category4ID = generateRandomID()
const category5ID = generateRandomID()
const category6ID = generateRandomID()
const category7ID = generateRandomID()
const category8ID = generateRandomID()
const category9ID = generateRandomID()
const category10ID = generateRandomID()
const category11ID = generateRandomID()

export const DefaultInitialData = {
  operations: [
    {
      bill: null,
      category: {
        budget: 0,
        color: "#3D51B4",
        icon: "cutlery",
        id: category1ID,
        price: 0,
        subCategories: [],
        title: "Restaurant",
      },
      categoryID: category1ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#FD9800",
        icon: "bus",
        id: category2ID,
        price: 0,
        subCategories: [],
        title: "Transport",
      },
      categoryID: category2ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#1F96F2",
        icon: "shopping-bag",
        id: category3ID,
        price: 0,
        subCategories: [],
        title: "Products",
      },
      categoryID: category3ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#4BAF4F",
        icon: "medkit",
        id: category4ID,
        price: 0,
        subCategories: [],
        title: "Health",
      },
      categoryID: category4ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#F34334",
        icon: "money",
        id: category5ID,
        price: 0,
        subCategories: [],
        title: "Salary",
      },
      categoryID: category5ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: true,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#9B27AE",
        icon: "legal",
        id: category6ID,
        price: 0,
        subCategories: [],
        title: "Job",
      },
      categoryID: category6ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: true,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#CCDD39",
        icon: "bar-chart",
        id: category7ID,
        price: 0,
        subCategories: [],
        title: "Percentage",
      },
      categoryID: category7ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: true,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#009687",
        icon: "gift",
        id: category8ID,
        price: 0,
        subCategories: [],
        title: "Gifts",
      },
      categoryID: category8ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#ff414e",
        icon: "child",
        id: category9ID,
        price: 0,
        subCategories: [],
        title: "Children",
      },
      categoryID: category9ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#0f2862",
        icon: "shopping-basket",
        id: category10ID,
        price: 0,
        subCategories: [],
        title: "Groceries",
      },
      categoryID: category10ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
    {
      bill: null,
      category: {
        budget: 0,
        color: "#eb1736",
        icon: "recycle",
        id: category11ID,
        price: 0,
        subCategories: [],
        title: "Leisure",
      },
      categoryID: category11ID,
      comment: null,
      createdAt: null,
      id: generateRandomID(),
      image: null,
      imageStorageID: null,
      isIncome: false,
      moneyAmount: null,
      user: null,
    },
  ],

  GeneralInfo: {
    budgetEnabled: false,
    selectedCurrency: "RusRuble",
    importantBills: [
      {
        type: "Cash",
        name: "Cash",
      },
      {
        type: "Card",
        name: "Card",
      },
    ],
  },

  billsList: {
    normalBillsList: [
      {
        name: "Cash",
        accountBalance: 0,
        type: "NormalBill",
        icon: "dollar",
        takeIntoTotalBalance: true,
      },
      {
        name: "Card",
        type: "NormalBill",
        accountBalance: 0,
        icon: "credit-card",
        takeIntoTotalBalance: true,
      },
    ],
    debtsBillsList: null,
    savingsBillsList: null,
  },
}

export const DefaultCategoriesNames = [
  "Restaurant",
  "Transport",
  "Groceries",
  "Health",
  "Salary",
  "Job",
  "Percentage",
  "Gifts",
  "Children",
  "Groceries",
  "Leisure",
  "Products",
]
