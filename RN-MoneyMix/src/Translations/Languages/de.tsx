export default {
  Notifications: {
    PPUserNotOpenAppTitle: "Budget Manager Erinnerung",
    PPUserNotOpenApp:
      "Vergessen Sie nicht, Ihre Ausgaben und Einnahmen für heute hinzuzufügen",
    //
    PPAutoOperationFillTitle: "Automatischer Wiederholungsvorgang",
    PPAutoOperationFill: "Jetzt hinzugefügt",
    //
    Date: "Datum",
    Time: "Zeit",
    Confirmed: "Bestätigt",
    ClickToSchedule: "Zum Planen klicken",
    //
    OperationReminder: "Erinnerung an operationr",
    PPRemindToAdd: "Wir erinnern Sie daran, hinzuzufügen",
    Income: "Einkommen",
    Expense: "Ausgaben",
    for: "im Wert von",
  },

  GeneralPhrases: {
    yes: "Ja",
    no: "Nicht",
    Cancel: "Stornieren",
    Save: "Speichern",
    Confirm: "Bestätigen",
    Change: "Veränderung",
    Until: "Bis um",
    From: "Von",
    or: "oder",
    for: "zum",
    Apply: "Anwenden",
    DoNotShowAgain: "Nicht mehr anzeigen",

    Popups: {
      TitleNetProblem: "Netzwerkproblem",
      PPNetworkProblem:
        "Diese Aktion kann nicht offline ausgeführt werden. Bitte stellen Sie eine Verbindung zum Netzwerk her.",
    },
  },

  AppInstallScreen: {
    Start: "Start",
    PPStart:
      "Intuitives und unglaublich einfaches persönliches Finanzmanagement",
  },

  BillsScreen: {
    Bills: "Rechnungen",
    Balance: "Balance",

    Lists: {
      Bills: "Rechnungen",
      Savings: "Ersparnisse",
      Debts: "Schulden",
      //
      TotalDebt: "Gesamtschulden",
      Returned: "Zurückgekommen",
      //
    },

    CreateNewBillPopup: {
      CreateBill: "Konto erstellen",

      NormalBill: "Normal",
      Cash_Card: "Bargeld, Kreditkarte",

      DebtBill: "Schuldenkonto",
      Credit_Mortgage: "Kredit, Hipoteca",

      SavingsBill: "Ersparnisse",
      Savings_Goal: "Ersparnisse",
      //
      Cash: "Kasse",
      Card: "Kartenkredit",
    },

    EditBillPopup: {
      Edit: "Bearbeiten",
      Balance: "Balance",
      Operations: "Operationen",
      Replenish: "Auffüllen",
      Withdrawl: "Aufladen",
      Transfer: "Transfer",

      Graphic: "Grafik",
      defaultBill: "Standardrechnung",
    },
  },

  Categories: {
    Main: {
      Income: "Einkommen",
      Expenses: "Kosten",
      Transaction: "Transaktionen",
      Names: "Namen",
      Balance: "Balance",
      AddMore: "Fügen Sie mehr hinzu",
      OpenTemplates: "öffnen",
      ArchivedCategory: "Archivierte Kategorie",
      //
      Cash: "Kasse",
      Card: "Kreditkarte",
    },

    Popups: {
      CategoryIcon: "Kategoriesymbol",
      CategoryColor: "Kategorie Farbe",
      CombineCategories: "Mit Kategorie zusammenführen",
      MoveToCategory: "Zur Kategorie wechseln",
    },

    Templates: {
      TemplatesList: "Vorlagenliste",
      NewOperationTemplate: "Neue Operationsvorlage",
      TemplateTitle: "Vorlagentitel",
      PPDeleteTemplate: "Möchten Sie diese Vorlage wirklich löschen?",
      PPEmptyCreateTemplateScreenText:
        "Sie müssen zuerst mindestens eine Kategorie und eine Rechnung hinzufügen, um eine Vorlage zu erstellen.",
    },

    DefaultCategories: {
      Restaurant: "Restaurant",
      Transport: "Transport",
      Products: "Lebensmittel",
      Health: "Gesundheit",
      Salary: "Gehalt",
      Job: "Job",
      Percentage: "Prozentsatz",
      Gifts: "Geschenke",
      Children: "Kinder",
      Groceries: "Lebensmittel",
      Leisure: "Freizeit",
    },
  },

  Operations: {
    Search: "Suche",
    FilterScreen: {
      Filter: "Filter",
      OperationType: "Art der Transaktion",
    },

    Gallery: {
      Gallery: "Galerie",
      Camera: "Kamera",
    },

    Popup: {
      Days: {
        Monday: "Montag",
        Tuesday: "Dienstag",
        Wednesday: "Mittwoch",
        Thursday: "Donnerstag",
        Friday: "Freitag",
        Saturday: "Samstag",
        Sunday: "Sonntag",

        Today: "Heute",
        Tomorrow: "Morgen",
        Yesterday: "Gestern",
      },

      Notify: "Benachrichtigen",
      Repeat: "Wiederholen",
      Delete: "Löschen",
      Date: "Datum",
      Duplicate: "Duplikat",
      AddComment: "Kommentar hinzufügen",
    },
  },

  StatsScreen: {
    DayAvg: "Tag (mittl.)",
    Today: "Heute",
    Week: "Woche",
  },

  Budget: {
    MonthBudget: "Budget für Monat",
    Earned: "Verdient",
    Spent: "Verbraucht",
    PlacedOnHold: "Verschoben",

    Popup: {
      FastBudget: "Schnelles Budget",
      CurrentExpenses: "Laufende Ausgaben",
      LastMonthExpenses: "Ausgaben des letzten Monats",
    },
  },

  CreateScreen: {
    Header: {
      Name: "Name",
      NameIsRequired: "Name ist erforderlich",
      // Create categories
      CreateCategory: "Kategorie erstellen",
      EditCategory: "Kategorie bearbeiten",
      // Create bill
      CreateNewBill: "Neue Rechnung",
      EditBill: "Rechnung bearbeiten",
    },

    Body: {
      // Create categories
      Settings: "Die Einstellungen",
      CategoryCurrency: "Kategorie Währung",
      SubCategory: "Unterkategorie",
      AddSubCategory: "Hinzufügen Unterkategorie",
      DeleteSubCategory: "Unterkategorie löschen",
      PPDeleteSubCategory: "Möchten Sie diese Unterkategorie wirklich löschen?",
      ConvertSubCategory: "Unterkategorie in Kategorie konvertieren",
      PPConvertSubCategory:
        "Sind Sie sicher, dass Sie diese Unterkategorie in eine Kategorie konvertieren möchten?",
      // Create bills
      Type: "Art",
      BillCurrency: "Rechnungswährung",
      Description: "Beschreibung",

      AccountBalance: "Kontostand",
      CreditLimit: "Kreditlimit",
      TakeInAccountInTotalBalance: "Zeigen Sie im allgemeinen Gleichgewicht",
      DisplayInExpenses: "In Ausgaben anzeigen",
      Goal: "Tor",
      IOwe: "Ist zurückgekommen",
      TotalDebtSum: "Gesamtschuldensumme",
      DeleteBill: "Rechnung löschen",
      //
      TitleDelAllBills: "Entfernung verweigert",
      PPDelAllBills: "Sie können nicht alle Rechnungen löschen",
      //
      TitleDeleteBill: "Löschen von Rechnungen",
      PPDeleteBillVerify:
        "Sind Sie sicher, dass Sie diese Rechnung löschen möchten? Diese Aktion ist irreversibel.",
      TitleDeleteCategory: "Löschen von Kategorien",
      PPDeleteCategoryVerify:
        "Möchten Sie diese Kategorie wirklich löschen? Diese Aktion ist irreversibel.",
    },

    Popups: {
      Colors: "Farben",
      Icons: "Symbole",
      //
      MoveCategoryPopup: {
        Title: "In Kategorie verschieben",
        PP1: "wird der Kategorie hinzugefügt",
        PP2: "als Unterkategorie",
      },
      CombineCategoryPopup: {
        Title: "Mit Kategorie kombinieren",
        PP1: "Alle Operationen, die einer Kategorie zugeordnet sind",
        PP2: "wird in eine Kategorie verschoben",
        PP3: "Alle Unterkategorien werden in eine Kategorie verschoben",
        PP4: "wird entfernt",
        Category: "Kategorie",
      },
    },
  },

  DrawerNavigator: {
    Header: {
      Login: "Anmeldung",
      SyncDisabled: "Synchronisierung deaktiviert...",
    },

    SubHeader: {
      PremiumVersion: "Premium-Version",
      PPUseAllFunctionality:
        "Nutzen Sie alle Funktionen der Anwendung zusammen mit der Premium-Version!",
    },

    ButtonsList: {
      AccountInfo: "Konto",
      Settings: "Die Einstellungen",
      AppInfo: "Über die App",
      Days: "Tage",
      //
      Subscription: "Abonnement",
      ChangePassword: "Passwort ändern",
      BankSMS: "Bank SMS",
      Logout: "Abmelden",
      //
      Language: "Sprache",
      English: "Englisch",
      Spanish: "Spanisch",
      German: "Deutsche",
      Russian: "Russisch",
      //
      MainCurrency: "Hauptwährung",
      AustrDollar: "Australischer Dollar",
      BritishFunt: "Britisches Pfund",
      USDollar: "US-Dollar",
      Euro: "Euro",
      CanadianDollar: "Kanadischer Dollar",
      ChineseYuan: "Chinese Yuan",
      RusRuble: "Russischer Rubel",
      SwissFrank: "Schweizer Franken",
      BelRuble: "Weißrussischer Rubel",
      Tenge: "Tenge",
      Grivn: "Griwna",
      //
      InitialScreen: "Erster App-Bildschirm",
      InitialStatsScreen: "Erster Statistikbildschirm",
      Bills: "Konten",
      Category: "Kategorien",
      Operations: "Operationen",
      Stats: "Statistica",
      Income: "Einkommen",
      Expenses: "Ausgaben",
      //
      Notifications: "Benachrichtigungen",
      Password: "Passwort",
      Budget: "Budget",
      ReserveData: "Daten reservieren",
      ExportDataInCSV: "Daten in CSV exportieren",
      DeleteData: "Alle Daten löschen",
      ContactSupport: "Support kontaktieren",
    },

    Popup: {
      PPDeleteData:
        "Möchten Sie wirklich alle Daten löschen? Diese Aktion ist nicht umkehrbar.",
      PPLogoutUser:
        "Die Datensynchronisation und andere Premium-Funktionen werden deaktiviert.",
      RateAppTitle: "Genießen Money Mix?",
      PPRateApp: "Bitte bewerten Sie uns im Google PlayStore",
      TitleCSVDownload: "Erfolgreicher Download",
      PPCSVDownload: `Ihr Budgetbericht wurde erfolgreich heruntergeladen`,
      TitlePCSFailDownload: "Download fehlgeschlagen",
      PPCSVFailDownload:
        "CSV-Download fehlgeschlagen. Bitte versuchen Sie es später erneut",

      currentPassword: "Derzeitiges Passwort",
      NewPassword: "Neues Kennwort",
    },
  },

  Header: {
    AllTime: "Alle Zeit",

    Popups: {
      Profile: "Profil",
      CreateNewProfile: "Neues Profil erstellen",
      SelectDay: "Tag auswählen",
      Day: "Tag",
      Year: "Jahr",
      Week: "Woche",
      Month: "Monat",
      SelectRange: "Bereich auswählen",
      SelectDiap: "Bereich auswählen",
    },

    Months: {
      January: "Januar",
      February: "Februar",
      March: "März",
      April: "April",
      May: "Mai",
      June: "Juni",
      July: "Juli",
      August: "August",
      September: "September",
      October: "Oktober",
      November: "November",
      December: "Dezember",
    },
  },

  PremiumVersionScreen: {
    PremiumVersion: "Premium-Version",
    General: "Allgemein",
    RestoreData: "Datenwiederherstellung",

    Auth: {
      EnterPassword: "Passwort eingeben",
      Registration: "Anmeldung",
      Login: "Anmeldung",
      Register: "Registrieren",
      ResetPassword: "Passwort zurücksetzen",
      ResetPasswordTitle: "Passwort zurücksetzen",
      //
      AlreadyHavePrem: "Haben Sie bereits eine Prämie? - Hier anmelden!",
      DontHavePremPP: "Noch keine Prämie? Kaufen Sie hier eine!",
      PPForgotPass: "Passwort vergessen? Zurücksetzen",
      PPWrongLogin:
        "Ihre E-Mail-Adresse oder Ihr Passwort sind ungültig. Bitte versuchen Sie es erneut.",
      PPWrongPass: "Ihr Passwort ist ungültig. Bitte versuchen Sie es erneut.",
      PPNetworkProblem:
        "Sie haben Probleme mit Ihrer Internetverbindung. Versuchen Sie es später.",
      PPWrongSecretCode: "Falscher Geheimcode! Versuchen Sie es erneut!",
      PPConfirmSecretCode: "Bitte bestätigen Sie Ihren Geheimcode",
      //
      RestorePasscode: "Passcode wiederherstellen",
      PPRestorePasscode:
        "Geben Sie Ihr Kontopasswort ein, um Ihren Passcode für das Konto wiederherzustellen",
      PPRestoreSucces: "Passcode erfolgreich entfernt",
      PPRestoreFail: "Ungültiges Passwort. Versuchen Sie es erneut.",
    },

    AdvertismentScreen: {
      Sale: "Rabatt",
      SaleText: "Gerade jetzt! Bis zu 75% Rabatt auf die Premium-Version.",

      Bills: "Rechnungen",
      BillsText:
        "Erstellen Sie eine beliebige Anzahl von Konten, Schulden, Zielen.",

      Categories: "Kategorien",
      CategoriesText:
        "Erstellen Sie eine beliebige Anzahl von Ausgaben- und Ertragskategorien.",

      Sync: "Synchronisation",
      SyncText:
        "Verwenden Sie eine unbegrenzte Anzahl mobiler Geräte für die gemeinsame Buchhaltung.",

      Profile: "Profile",
      ProfilesText:
        "Unterschiedliche Profile mit unabhängigen Konten und Kategorien verwenden",

      Vorlagen: "Vorlagen",
      TemplatesText:
        "Erstellen Sie Zahlungsvorlagen und verwenden Sie sie mit einem Klick.",
    },

    BottomPannel: {
      month: "Monat",
      month1: "1 Monat",
      month3: "3 Monate",
      month6: "6 Monate",
      per: "per",
      for: "für",
    },

    RequsetResetPopup: {
      PPOflineAppUseAlert:
        "Sie haben die Anwendung ohne Genehmigung verwendet. Möchten Sie Daten aus der Cloud-Datenbank oder von Ihrem lokalen Gerät wiederherstellen?",
      FromCloud: "Aus dem Cloud-Speicher",
      FromDevice: "Vom Gerät",
    },

    Popups: {
      PPProfileCreateLoading: "Neues Profil erstellt...",
      TTDeleteProfile: "Profil löschen",
      PPDeleteProfile: "Sind Sie sicher, dass Sie das Profil löschen würden:",
      //
      TitleProfileCreateError: "Fehler beim Erstellen des Profils",
      PPProfileCreateError:
        "Profil mit diesem Namen wird bereits verwendet, versuchen Sie es mit einem anderen",
      TitleBillCreateError: "Fehler beim Erstellen von Rechnungen",
      PPBillCreateError:
        "Rechnung mit diesem Namen wird bereits verwendet, versuchen Sie eine andere",
      //
      PPPassResetSuccess:
        "Die E-Mail wurde erfolgreich an Ihre E-Mail gesendet!",
      PPPassResetFail:
        "Benutzer mit dieser E-Mail existiert nicht, bitte versuchen Sie es erneut!",
    },
  },

  MoneyCategoriesTransferScreen: {
    Header: {
      MoneyTransfer: "Geldüberweisung",
      BudgetConfig: "Budgetkonfiguration",
    },

    TopSection: {
      ToBill: "Aufladen",
      FromBill: "Rechnung",

      ToCategory: "Zur Kategorie",
      FromCategory: "Kategorie",

      YourComment: "Deine Kommentar",
    },

    Popups: {
      PPRepeatOperation: "Wiederholen Sie den Vorgang alle",
      EveryHour: "Jede Stunde",
      EveryDay: "Jeden Tag",
      Every3Days: "Alle 3 Tage",
      EveryWeek: "Jede Woche",
      Every2Weeks: "Alle 2 Wochen",
      EveryMonth: "Jeden Monat",
      //
      ChooseBill: "Rechnung auswählen",
      ChooseAction: "Wählen Sie eine Aktion",
      //
      OperationSubmissionError: "Fehler beim Einreichen der Operation",
      PPAlertEmptySum: "Transaktion ohne Betrag wird nicht erfasst",
      PPUnselectedCategoryOrBill:
        "Bitte wählen Sie sowohl Rechnungs- als auch Kategoriefelder aus",
      EnterSum: "Summe eingeben",
    },
  },

  EmptyLists: {
    EmptyOperations: "Sie haben keine Operationen",
    EmptyBankSMSSettings:
      "Sie haben noch keine SMS-Vorlagen für Konten. Klicken Sie auf Plus für Ergänzungen.",
    EmptyReservedCopies: "Sie haben keine reservierten Kopien",
    EmptyPhotosMultipleGallery: "Sie haben keine Fotos im Speicher",
    Budget:
      "Bitte fügen Sie zuerst eine Kategorie oder eine Sparrechnung hinzu, um die Budgetkonfiguration hinzuzufügen.",
  },

  BankSMSSettings: {
    SelectBill: "Rechnung auswählen",
    NewSMSTemplate: "SMS-Vorlageninformationen",

    OriginatingAdress: "Originating adress",
    MessageBody: "Nachrichtentextvorlage",

    KeywordsList: "Keywords-Liste",
    Keyword: "Stichwort",
    AddKeyword: "Schlüsselwort hinzufügen",
  },

  VoiceRecognitionScreen: {
    Speak: "Sagen",
    Example: "Beispiel",
    PPExample1: "50 aus Kategorie hinzufügen",
    PPExample2: "vom Konto",
    MoneyAmount: "Summe",
    PPRecognitionFail:
      "Kategorie oder Punktzahl nicht erkannt. Versuch es noch einmal.",
    RecognitionFailure: "Erkennungsfehler",
    PopupRecognitionFailBody: `Eine Kategorie oder Punktzahl wird nicht erkannt, wenn sie sich im Namen um mindestens einen Buchstaben unterscheiden. Zum Beispiel sagen Sie "Karten" und das Konto heißt "Karte". `,
  },

  ReservedDataScreen: {
    Popup: {
      TitleRequestRecieved: "Die Anfrage wurde bearbeitet",
      PPRequestCreateReserveData: "Die Sicherung wird erstellt",
      TitleRestoreSuccess: "Wiederherstellung erfolgreich",
      PPRestoreSuccess:
        "Die Sicherungsdaten wurden erfolgreich wiederhergestellt",
    },
  },

  StorageSubscriptions: {
    StorageSubscriptions: "Storage-Abonnement",
    //
    TitleExceed: "Speichergröße für Fotos überschritten",
    PPBody:
      "Entschuldigung, Sie haben das grundlegende Abonnementlimit für den Fotospeicher überschritten. Sie können alte oder unnötige Fotos löschen oder mehr Speicherplatz kaufen.",
    PPBodyUnused:
      "Hier wird die Menge an freiem Speicherplatz im Fotospeicher angezeigt. Wir wenden die optimale Komprimierung von Fotos an, um sicherzustellen, dass Belege und Rechnungen bis zum A4-Format lesbar bleiben. Der Speicher ist also für etwa 10.000 Fotos ausgelegt. Wenn dies für Sie nicht ausreicht, können Sie ihn erweitern oder löschen alte Fotos.",
    UpgradePlan: "Upgrade-Plan",
    PhotosStorage: "Speicherung von Fotos",
    WhyPaid: "Warum wird es bezahlt?",
    DeletePhotos: "Fotos löschen",
    //
    PPExplanation:
      "Unsere Anwendung verwendet eine erweiterte Datenbank zum Speichern Ihrer Daten und Fotos. 98% der Datenbank sind mit Fotos gefüllt, die wir mäßig komprimieren, um einen Kompromiss zwischen Größe und Qualität zu erzielen. Leider ist nur 1 GB Speicherplatz im Preis des Basisabonnements enthalten, und wir können nicht mehr bereitstellen, da der Preis für 1 GB Speicherplatz viel kostet (verwechseln Sie nicht kostenlos 10 GB auf Google Disk oder ähnlichem Cloud-Speicher, dies sind völlig andere Dinge). Wir zahlen monatliche Miete für Server, die Ihre Daten sicher speichern, sofort auf Ihr Telefon herunterladen und zwischen Geräten synchronisieren. Bitte verstehe das.",
  },

  Validation: {
    InvalidEmail: "Ungültige E-Mail",
    LongPassword: "Passwort ist zu lang - sollte maximal 16 Zeichen betragen.",
    ShortPassword: "Passwort ist zu lang - sollte maximal 16 Zeichen betragen.",
    PasswordLatin: "Passwort darf nur lateinische Buchstaben enthalten.",
    //
    EmailRequired: "Email ist erforderlich",
    PasswordRequired: "Passwort ist erforderlich",
  },
}
