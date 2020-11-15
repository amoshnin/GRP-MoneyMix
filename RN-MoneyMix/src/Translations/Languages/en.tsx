export default {
  Notifications: {
    PPUserNotOpenAppTitle: "Budget manager reminder",
    PPUserNotOpenApp: "Do not forget to add your expenses and income for today",
    //
    PPAutoOperationFillTitle: "Automatic operation set",
    PPAutoOperationFill: "Now added",
    //
    Date: "Date",
    Time: "Time",
    Confirmed: "Confirmed",
    ClickToSchedule: "Click to schedule",
    //
    OperationReminder: "Operation reminder",
    PPRemindToAdd: "Reminding you to add",
    Income: "income",
    Expense: "expense",
    for: "for",
  },

  GeneralPhrases: {
    yes: "Yes",
    no: "No",
    Cancel: "Cancel",
    Save: "Save",
    Confirm: "Confirm",
    Ok: "OK",
    Change: "Change",
    Until: "Until",
    From: "From",
    or: "or",
    for: "for",
    Apply: "Apply",
    DoNotShowAgain: "Do not show again",

    Popups: {
      TitleNetProblem: "Network problem",
      PPNetworkProblem:
        "This action cannot be done offline please connect to network",
    },
  },

  AppInstallScreen: {
    Start: "Start",
    PPStart: "Intuitive and incredibly simple personal finance management",
  },

  BillsScreen: {
    Bills: "Bills",
    Balance: "Balance",

    Lists: {
      Bills: "Bills",
      Savings: "Savings",
      Debts: "Debts",
      //
      TotalDebt: "Total debt",
      Returned: "Returned",
    },

    CreateNewBillPopup: {
      CreateBill: "Create new bill",

      NormalBill: "Normal",
      Cash_Card: "Cash, credit card",

      DebtBill: "Debt bill",
      Credit_Mortgage: "Credit, mortgage",

      SavingsBill: "Savings bill",
      Savings_Goal: "Savings, Goal",
      //
      Cash: "Cash",
      Card: "Card",
    },

    EditBillPopup: {
      Edit: "Edit",
      Balance: "Balance",
      Operations: "Operations",
      Replenish: "Replenish",
      Withdrawl: "Withdrawl",
      Transfer: "Transfer",

      Graphic: "Graphic",
      defaultBill: "Default bill",
    },
  },

  Categories: {
    Main: {
      Income: "Income",
      Expenses: "Expenses",
      Transaction: "Transaction",
      Names: "Names",
      Balance: "Balance",
      AddMore: "Add more",
      OpenTemplates: "Templates",
      ArchivedCategory: "Archived category",
      //
      Cash: "Cash",
      Card: "Card",
    },

    Popups: {
      CategoryIcon: "Category icon",
      CategoryColor: "Category color",
      CombineCategories: "Combine with a category",
      MoveToCategory: "Move to category",
    },

    Templates: {
      TemplatesList: "Templates list",
      NewOperationTemplate: "New operation template",
      TemplateTitle: "Template title",
      PPDeleteTemplate: "Are you sure you want to delete this template?",
      PPEmptyCreateTemplateScreenText:
        "You must first add at least one category and one bill to create a template.",
    },

    DefaultCategories: {
      Restaurant: "Restaurant",
      Transport: "Transport",
      Products: "Groceries",
      Health: "Health",
      Salary: "Salary",
      Job: "Job",
      Percentage: "Percentage",
      Gifts: "Gifts",
      Children: "Children",
      Groceries: "Groceries",
      Leisure: "Leisure",
    },
  },

  Operations: {
    Search: "Search",
    FilterScreen: {
      Filter: "Filter",
      OperationType: "Operation type",
    },

    Gallery: {
      Gallery: "Gallery",
      Camera: "Camera",
    },

    Popup: {
      Days: {
        Monday: "Monday",
        Tuesday: "Tuesday",
        Wednesday: "Wednesday",
        Thursday: "Thursday",
        Friday: "Friday",
        Saturday: "Saturday",
        Sunday: "Sunday",

        Today: "Today",
        Tomorrow: "Tomorrow",
        Yesterday: "Yesterday",
      },

      Notify: "Notify",
      Repeat: "Repeat",
      Delete: "Delete",
      Date: "Date",
      Duplicate: "Duplicate",
      AddComment: "Add comment",
    },
  },

  StatsScreen: {
    DayAvg: "Day (avg.)",
    Today: "Today",
    Week: "Week",
  },

  Budget: {
    MonthBudget: "Budget for month",
    Earned: "Earned",
    Spent: "Spent",
    PlacedOnHold: "postponed",

    Popup: {
      FastBudget: "Fast budget",
      CurrentExpenses: "Current expenses",
      LastMonthExpenses: "Last month expenses",
    },
  },

  CreateScreen: {
    Header: {
      // Create categories
      Name: "Name",
      CreateCategory: "Create category",
      EditCategory: "Edit category",
      NameIsRequired: "Name is required",
      // Create bills
      CreateNewBill: "New bill",
      EditBill: "Edit bill",
    },

    Body: {
      // Create categories
      Settings: "Settings",
      CategoryCurrency: "Category currency",
      SubCategory: "Sub-category",
      AddSubCategory: "Add sub-category",
      PPDeleteSubCategory:
        "Are you sure you would like to delete this sub-category?",
      PPConvertSubCategory:
        "Are you sure you would like to convert this sub-category into a category?",
      // Create bills
      Type: "Type",
      BillCurrency: "Bill currency",
      Description: "Description",

      AccountBalance: "Account balance",
      CreditLimit: "Credit limit",
      TakeInAccountInTotalBalance: "Take into account the overall balance",
      DisplayInExpenses: "Display in expenses",
      Goal: "Goal",
      IOwe: "Returned",
      TotalDebtSum: "Total debt sum",
      DeleteBill: "Delete bill",
      DeleteSubCategory: "Delete sub-category",
      ConvertSubCategory: "Convert sub-category to cateogry",
      //
      TitleDelAllBills: "Deletion denied",
      PPDelAllBills: "You cannot delete all bills",
      //
      TitleDeleteBill: "Bill deletion",
      PPDeleteBillVerify:
        "Are you sure you want to delete this bill? This action is irreversible.",
      TitleDeleteCategory: "Category deletion",
      PPDeleteCategoryVerify:
        "Are you sure you want to delete this category? This action is irreversible.",
    },

    Popups: {
      Colors: "Colors",
      Icons: "Icons",
      //
      MoveCategoryPopup: {
        Title: "Move to Category",
        PP1: "will be added to the category",
        PP2: "as subcategory",
      },
      CombineCategoryPopup: {
        Title: "Combine with Category",
        PP1: "All operations associated with a category",
        PP2: "will be moved to a category",
        PP3: "All subcategories will be moved to a category",
        PP4: "will be removed",
        Category: "Category",
      },
    },
  },

  DrawerNavigator: {
    Header: {
      Login: "Login",
      SyncDisabled: "Synchronisation deactivated...",
    },

    SubHeader: {
      PremiumVersion: "Premium version",
      PPUseAllFunctionality:
        "Use all the features of the application along with the premium version!",
    },

    ButtonsList: {
      AccountInfo: "Account info",
      Settings: "Settings",
      AppInfo: "App information",
      //
      Subscription: "Subscription",
      ChangePassword: "Change password",
      BankSMS: "Bank SMS",
      Logout: "Logout",
      Days: "Days",
      //
      Language: "Language",
      English: "English",
      Spanish: "Spanish",
      German: "German",
      Russian: "Russian",
      //
      MainCurrency: "Principal currency",
      AustrDollar: "Australian Dollar",
      BritishFunt: "British Pound",
      USDollar: "US Dollar",
      Euro: "Euro",
      CanadianDollar: "Canadian Dollar",
      ChineseYuan: "Chinese Yuan",
      RusRuble: "Russian Ruble",
      SwissFrank: "Swiss Franc",
      BelRuble: "Belarusian ruble",
      Tenge: "Tenge",
      Grivn: "Hryvnia ",
      //
      AustrDollarCurrency: "AU$",
      BritishFuntCurrency: "£",
      USDollarCurrency: "$",
      EuroCurrency: "€",
      CanadianDollarCurrency: "CA$",
      ChineseYuanCurrency: "¥",
      RusRubleCurrency: "₽",
      SwissFrankCurrency: "CHF",
      BelRubleCurrency: "BYN",
      TengeCurrency: "₸",
      GrivnCurrency: "₴",
      //
      InitialScreen: "Initial app screen",
      InitialStatsScreen: "Initial statistics screen",
      Bills: "Bills",
      Category: "Categories",
      Operations: "Operations",
      Stats: "Statistics",
      Income: "Income",
      Expenses: "Expenses",
      //
      Notifications: "Notifications",
      Password: "Password",
      Budget: "Budget",
      ReserveData: "Reserve data",
      ExportDataInCSV: "Export data in CSV",
      DeleteData: "Delete all data",
      ContactSupport: "Contact support",
    },

    Popup: {
      PPDeleteData:
        "Are you sure you want to delete all data? This action is not reversible.",
      PPLogoutUser:
        "Data synchronization and other premium features will be disabled.",
      RateAppTitle: "Enjoying Money Mix?",
      PPRateApp: "Please rate us on Google PlayStore",
      TitleCSVDownload: "Successful download",
      PPCSVDownload: `Your budget report was successfully downloaded`,
      TitlePCSFailDownload: "Download failure",
      PPCSVFailDownload: "CSV download failed. Please try again later",

      currentPassword: "Current password",
      NewPassword: "New password",
    },
  },

  Header: {
    AllTime: "All time",

    Popups: {
      Profile: "Profile",
      CreateNewProfile: "Create new profile",

      SelectDay: "Select day",
      Day: "Day",
      Year: "Year",
      Week: "Week",
      Month: "Month",
      SelectRange: "Select range",
      SelectDiap: "Select Range",
    },

    Months: {
      January: "January",
      February: "February",
      March: "March",
      April: "April",
      May: "May",
      June: "June",
      July: "July",
      August: "August",
      September: "September",
      October: "October",
      November: "November",
      December: "December",
    },
  },

  PremiumVersionScreen: {
    PremiumVersion: "Premium version",
    General: "General",
    RestoreData: "Data restoring",

    Auth: {
      EnterPassword: "Enter password",
      Registration: "Registration",
      Login: "Login",
      Register: "Register",
      ResetPassword: "Reset password",
      ResetPasswordTitle: "Password reset",
      //
      AlreadyHavePrem: "Already have premium? - Login here!",
      DontHavePremPP: "Don't have premium yet? Buy one here!",
      //
      PPForgotPass: "Forgot you password? Reset it",
      //
      PPWrongLogin: "Your email or password are invalid. Please try again.",
      PPWrongPass: "Your password is invalid. Please try again.",
      PPNetworkProblem:
        "You are having problems with your internet connection. Try later.",
      //
      PPWrongSecretCode: "Wrong secret code! Try again!",
      PPConfirmSecretCode: "Please confirm your secret code",
      //
      RestorePasscode: "Restore passcode",
      PPRestorePasscode:
        "Enter your account password to restore your passcode for account",
      PPRestoreSucces: "Passcode succesfully removed",
      PPRestoreFail: "Invalid password. Try again",
    },

    AdvertismentScreen: {
      Sale: "Sale",
      SaleText: "Just now! Discount up to 75% on the premium version.",

      Bills: "Bills",
      BillsText: "Create any number of accounts, debts, goals.",

      Categories: "Categories",
      CategoriesText: "Create any number of expense and income categories.",

      Sync: "Synchronization",
      SyncText:
        "Use an unlimited number of mobile devices for joint accounting.",

      Profiles: "Profiles",
      ProfilesText:
        "Use different profiles with independent accounts and categories",

      Templates: "Templates",
      TemplatesText: "Create payment templates and use them in one click",
    },

    BottomPannel: {
      month: "month",
      month1: "1 month",
      month3: "3 months",
      month6: "6 months",
      per: "per",
      for: "for",
    },

    RequsetResetPopup: {
      PPOflineAppUseAlert:
        "You have been using the app without being authorised. Do you want to restore data from cloud database or from your local device?",
      FromCloud: "From cloud",
      FromDevice: "From device",
    },

    Popups: {
      PPProfileCreateLoading: "New profile is creating...",
      TTDeleteProfile: "Profile deletion",
      PPDeleteProfile: "Are you sure you would to delete the profile:",
      //
      TitleProfileCreateError: "Profile creation error",
      PPProfileCreateError:
        "Profile with this name is already used, try another one",
      TitleBillCreateError: "Bill creation error",
      PPBillCreateError: "Bill with this name is already used, try another one",
      //
      PPPassResetSuccess: "The email was succesfully sent to your email!",
      PPPassResetFail: "User with this email doesn't exist, please try again!",
    },
  },

  MoneyCategoriesTransferScreen: {
    Header: {
      MoneyTransfer: "Money transfer",
      BudgetConfig: "Budget configuration",
    },

    TopSection: {
      ToBill: "To bill",
      FromBill: "From bill",
      ToCategory: "To category",
      FromCategory: "From category",
      YourComment: "Your comment",
    },

    Popups: {
      PPRepeatOperation: "Repeat the operation every",
      EveryHour: "Every hour",
      EveryDay: "Every day",
      Every3Days: "Every 3 days",
      EveryWeek: "Every week",
      Every2Weeks: "Every 2 weeks",
      EveryMonth: "Every month",
      //
      ChooseBill: "Choose bill",
      ChooseAction: "Choose action",
      //
      OperationSubmissionError: "Operation submission error",
      PPAlertEmptySum: "Transaction without sum will not be recorded",
      PPUnselectedCategoryOrBill: "Please select both bill and category fields",
      EnterSum: "Enter sum",
    },
  },

  EmptyLists: {
    EmptyOperations: "You don't have any operations",
    EmptyBankSMSSettings:
      "You do not have SMS templates associated with accounts yet, click plus for additions.",
    EmptyReservedCopies: "You don't have any reserved copies",
    EmptyPhotosMultipleGallery: "You don't have any photos in storage",
    Budget:
      "Please first add a category or a saving bill in order to add budget configuration.",
  },

  BankSMSSettings: {
    SelectBill: "Select bill",
    NewSMSTemplate: "SMS Template info",

    OriginatingAdress: "Originating adress",
    MessageBody: "Message body template",

    KeywordsList: "Keywords list",
    Keyword: "Keyword",
    AddKeyword: "Add keyword",
  },

  VoiceRecognitionScreen: {
    Speak: "Speak",
    Example: "Example",
    PPExample1: "Add 50 to category",
    PPExample2: "from bill",
    MoneyAmount: "Money amount",
    PPRecognitionFail: "Category or score not recognized. Try again.",
    RecognitionFailure: "Recognition failure",
    PopupRecognitionFailBody: `A category or score will not be recognized if they differ in name by at least one letter. For example, you say "Cards" and the account is called "Card".`,
  },

  ReservedDataScreen: {
    Popup: {
      TitleRequestRecieved: "The request has been processed",
      PPRequestCreateReserveData: "The backup is being created",
      TitleRestoreSuccess: "Restore successful",
      PPRestoreSuccess: "The backup data was successfully restored",
    },
  },

  StorageSubscriptions: {
    StorageSubscriptions: "Storage subscription",
    //
    TitleExceed: "Photos storage size exceeded",
    PPBody:
      "Sorry, you have exceeded the basic photo storage subscription limit. You can delete old or unnecessary photos or buy more space.",
    PPBodyUnused:
      "The amount of free space in the photo storage is displayed here. We apply the optimal compression of photos to ensure that receipts and invoices remain readable, up to A4 format, so the storage is designed for about 10,000 photos. If this is not enough for you, then you can expand or delete it old photos.",
    UpgradePlan: "Upgrade plan",
    PhotosStorage: "Photos storage",
    WhyPaid: "Why is it paid?",
    DeletePhotos: "Delete photos",
    //
    PPExplanation:
      "Our application uses an advanced database for storing your data and photos. 98% of the database is filled with photographs, which we compress moderately to create a compromise between size and quality. Unfortunately, only 1 GB of storage is included in the price of the basic subscription, and we cannot provide more, since the price of 1 GB storage costs a lot (don't confuse free 10 GB on google disk or similar cloud storage, these are completely different things). We pay monthly rent for servers that securely store your data, instantly download to your phone and sync it between devices. Please understand this.",
  },

  Validation: {
    InvalidEmail: "Invalid email",
    LongPassword: "Password is too long - should be 16 chars maximum.",
    ShortPassword: "Password is too long - should be 16 chars maximum.",
    PasswordLatin: "Password can only contain Latin letters.",
    //
    EmailRequired: "Email is required",
    PasswordRequired: "Password is required",
  },
}
