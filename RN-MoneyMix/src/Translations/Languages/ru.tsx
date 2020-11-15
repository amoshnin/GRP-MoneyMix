export default {
  Notifications: {
    PPUserNotOpenAppTitle: "Напоминание менеджера бюджета",
    PPUserNotOpenApp: "Не забудьте добавить ваши расходы и доходы за сегодня",
    //
    PPAutoOperationFillTitle: "Автоматическое повторение операции",
    PPAutoOperationFill: "Сейчас добавлен",
    //
    Date: "Дата",
    Time: "Время",
    Confirmed: "Подтвержденно",
    ClickToSchedule: "Нажмите для подтверждения",
    //
    OperationReminder: "Операционное напоминание",
    PPRemindToAdd: "Напоминаем вам добавить",
    Income: "доход",
    Expense: "расход",
    for: "на сумму",
  },
  GeneralPhrases: {
    yes: "Да",
    no: "Нет",
    Cancel: "Отменить",
    Save: "Сохранить",
    Confirm: "Подтвердить",
    Change: "Изменить",
    Until: "До",
    From: "С",
    or: "или",
    for: "на",
    Apply: "Использовать",
    DoNotShowAgain: "Больше не показывать",

    Popups: {
      TitleNetProblem: "Сетевая проблема",
      PPNetworkProblem:
        "Это действие нельзя выполнить в офлайн режиме, подключитесь к сети",
    },
  },

  AppInstallScreen: {
    Start: "Начать",
    PPStart:
      "Интуитивно понятное и невероятно простое управление личными финансами",
  },

  BillsScreen: {
    Bills: "Счет",
    Balance: "Баланс",

    Lists: {
      Bills: "Счета",
      Savings: "Сбережения",
      Debts: "Долги",
      //
      TotalDebt: "Общий долг",
      Returned: "Возвращено",
    },

    CreateNewBillPopup: {
      CreateBill: "Новый счет",

      NormalBill: "Обычный",
      Cash_Card: "Наличные, карта",

      DebtBill: "Долговой",
      Credit_Mortgage: "Кредит, ипотека",

      SavingsBill: "Накопительный",
      Savings_Goal: "Сбережения, цель",
      //
      Cash: "Наличные",
      Card: "Карта",
    },

    EditBillPopup: {
      Edit: "Изменить",
      Balance: "Баланс",
      Operations: "Операции",
      Replenish: "Пополнить",
      Withdrawl: "Снять",
      Transfer: "Перевести",

      Graphic: "График",
      defaultBill: "Счет по умолчанию",
    },
  },

  Categories: {
    Main: {
      Income: "Доходы",
      Expenses: "Расходы",
      Transaction: "Транзакция",
      Names: "Имена",
      Balance: "Баланс",
      AddMore: "Добавить еще",
      OpenTemplates: "Шаблоны",
      ArchivedCategory: "Архивная категория",
      //
      Cash: "Наличные",
      Card: "Карта",
    },

    Popups: {
      CategoryIcon: "Иконка категории",
      CategoryColor: "Цвет категории",
      CombineCategories: "Объединить с категорией",
      MoveToCategory: "Переместить в категорию",
    },

    Templates: {
      TemplatesList: "Список шаблонов",
      NewOperationTemplate: "Новый шаблон операции",
      TemplateTitle: "Название шаблона",
      PPDeleteTemplate: "Вы уверены, что хотите удалить этот шаблон?",
      PPEmptyCreateTemplateScreenText:
        "Сначала необходимо добавить хотя бы одну категорию и один счет для создания шаблона.",
    },

    DefaultCategories: {
      Restaurant: "Ресторан",
      Transport: "Транспорт",
      Products: "Товары",
      Health: "Здоровье",
      Salary: "Зарплата",
      Job: "Подработка",
      Percentage: "Проценты",
      Gifts: "Подарки",
      Children: "Дети",
      Groceries: "Продукты",
      Leisure: "Досуг",
    },
  },

  Operations: {
    Search: "Поиск",
    FilterScreen: {
      Filter: "Фильтр",
      OperationType: "Тип операции",
    },

    Gallery: {
      Gallery: "Галерея",
      Camera: "Камера",
    },

    Popup: {
      Days: {
        Monday: "Понедельник",
        Tuesday: "Вторник",
        Wednesday: "Среда",
        Thursday: "Четверг",
        Friday: "Пятница",
        Saturday: "Суббота",
        Sunday: "Воскресение",

        Today: "Сегодня",
        Tomorrow: "Завтра",
        Yesterday: "Вчера",
      },

      Notify: "Уведомить",
      Repeat: "Повторить",
      Delete: "Удалить",
      Date: "Дата",
      Duplicate: "Дубликат",
      AddComment: "Добавить комментарий",
    },
  },

  StatsScreen: {
    DayAvg: "День (сред.)",
    Today: "Сегодня",
    Week: "Неделя",
  },

  Budget: {
    MonthBudget: "Бюджет на месяц",
    Earned: "Заработанно",
    Spent: "Отложено",
    PlacedOnHold: "Отложено",

    Popup: {
      FastBudget: "Быстрый бюджет",
      CurrentExpenses: "Текущие расходы",
      LastMonthExpenses: "Расходы за последний месяц",
    },
  },

  CreateScreen: {
    Header: {
      Name: "Имя",
      NameIsRequired: "Имя обязательно",
      // Create categories
      CreateCategory: "Создать категорию",
      EditCategory: "Редактировать категорию",
      // Create bill
      CreateNewBill: "Новый счет",
      EditBill: "Редактировать счет",
    },

    Body: {
      // Create categories
      Settings: "Настройки",
      CategoryCurrency: "Валюта категории",
      SubCategory: "Подкатегории",
      AddSubCategory: "Добавить подкатегорию",
      PPDeleteSubCategory: "Вы уверены, что хотите удалить эту подкатегорию?",
      PPConvertSubCategory:
        "Вы уверены, что хотите преобразовать эту подкатегорию в категорию?",
      // Create bills
      Type: "Тип",
      BillCurrency: "Валюта счета",
      Description: "Описание",

      AccountBalance: "Остаток",
      CreditLimit: "Кредитный лимит",
      TakeInAccountInTotalBalance: "Учитовать в общем балансе",
      DisplayInExpenses: "Отображать в расходах",
      Goal: "Цель",
      IOwe: "Возвращено",
      TotalDebtSum: "Общая сумма долга",
      DeleteBill: "Удалить счет",
      DeleteSubCategory: "Удалить подкатегорию",
      ConvertSubCategory: "Преобразовать подкатегорию в категорию",
      //
      TitleDelAllBills: "Удаление отклонено",
      PPDelAllBills: "Вы не можете удалить все счета",
      //
      TitleDeleteBill: "Удаление счета",
      PPDeleteBillVerify:
        "Вы действительно хотите удалить этот счет? Это действие необратимо.",
      TitleDeleteCategory: "Удаление категории",
      PPDeleteCategoryVerify:
        "Вы действительно хотите удалить эту категорию? Это действие необратимо.",
    },

    Popups: {
      Colors: "Цвета",
      Icons: "Иконки",
      //
      MoveCategoryPopup: {
        Title: "Переместить в категорию",
        PP1: "будет добавлена в категорию",
        PP2: "как подкатегория",
      },
      CombineCategoryPopup: {
        Title: "Объединить с категорией",
        PP1: "Все операции связанные с категорией",
        PP2: "будут перемещены  в категорию",
        PP3: "Все подкатегории будут перемещены в категорию",
        PP4: "будет удалена",
        Category: "Категория",
      },
    },
  },

  DrawerNavigator: {
    Header: {
      Login: "Войти",
      SyncDisabled: "Синхронизация отключена...",
    },

    SubHeader: {
      PremiumVersion: "Премиум-версия",
      PPUseAllFunctionality:
        "Используйте все возможности приложения вместе с премиум- версией!",
    },

    ButtonsList: {
      AccountInfo: "Учетная запись",
      Settings: "Настройки",
      AppInfo: "О программе",
      Days: "День",
      //
      Subscription: "Подписка",
      ChangePassword: "Изменить пароль",
      BankSMS: "Банковские SMS",
      Logout: "Выйти",
      //
      Language: "Язык",
      English: "Английский",
      Spanish: "Испанский",
      German: "Немецкий",
      Russian: "Русский",
      //
      MainCurrency: "Основная валюта",
      AustrDollar: "Австралийский доллар",
      BritishFunt: "Британский фунт",
      USDollar: "Доллар США",
      Euro: "Евро",
      CanadianDollar: "Канадский доллар",
      ChineseYuan: "Китайский юань",
      RusRuble: "Российский рубль",
      SwissFrank: "Швейцарский франк",
      BelRuble: "Белорусский рубль",
      Tenge: "Тенге",
      Grivn: "Гривна",
      //
      InitialScreen: "Начальный экран приложения",
      InitialStatsScreen: "Начальный экран статистики",
      Bills: "Счета",
      Category: "Категории",
      Operations: "Операции",
      Stats: "Статистика",
      Income: "Доходы",
      Expenses: "Расходы",
      //
      Notifications: "Уведомления",
      Password: "Пароль",
      Budget: "Бюджет",
      ReserveData: "Резервирование данных",
      ExportDataInCSV: "Экспорт данных в CSV",
      DeleteData: "Удалить данные",
      ContactSupport: "Написать в поддержку",
    },

    Popup: {
      PPDeleteData:
        "Вы уверены, что хотите удалить все данные? Это действие необратимо.",
      PPLogoutUser:
        "Синхронизация данных и другие возможности премиум-версии будут отключены.",
      RateAppTitle: "Наслаждаешься Money Mix?",
      PPRateApp: "Пожалуйста, оцените нас в Google PlayStore",
      TitleCSVDownload: "Успешная загрузка",
      PPCSVDownload: `Отчет о вашем бюджете был успешно загружен`,
      TitlePCSFailDownload: "Ошибка загрузки",
      PPCSVFailDownload: "Ошибка загрузки CSV. Повторите попытку позже",

      currentPassword: "Текущий пароль",
      NewPassword: "Новый пароль",
    },
  },

  Header: {
    AllTime: "Все время",

    Popups: {
      Profile: "Профиль",
      CreateNewProfile: "Cоздать новый профиль",
      SelectDay: "Выбрать день",
      Day: "День",
      Year: "Год",
      Week: "Неделя",
      Month: "Месяц",
      SelectRange: "Выберите период",
      SelectDiap: "Выберите диапазон",
    },

    Months: {
      January: "Январь",
      February: "Февраль",
      March: "Март",
      April: "Апрель",
      May: "Май",
      June: "Июнь",
      July: "Июль",
      August: "Август",
      September: "Сентябрь",
      October: "Октябрь",
      November: "Ноябрь",
      December: "Декабрь",
    },
  },

  PremiumVersionScreen: {
    PremiumVersion: "Премиум-версия",
    General: "Главный",
    RestoreData: "Восстановление данных",

    Auth: {
      EnterPassword: "Введите пароль",
      Registration: "Регистрация",
      Login: "Вход",
      Register: "Зарегистрироватся",
      ResetPassword: "Сбросить пароль",
      ResetPasswordTitle: "Сброс пароля",
      //
      AlreadyHavePrem: "Уже есть премиум? Войдите здесь!",
      DontHavePremPP: "Нет премиум? Получите его здесь!",
      PPForgotPass: "Забыли пароль? Сбросить его",

      PPWrongLogin:
        "Ваш адрес электронной почты или пароль недействительны. Пожалуйста, попробуйте еще раз.",
      PPWrongPass: "Ваш пароль недействителен. Повторите попытку.",
      PPNetworkProblem:
        "У вас проблемы с интернет соединением. Попробуйте позже.",
      PPWrongSecretCode: "Неверный секретный код! Попробуйте еще раз!",
      PPConfirmSecretCode: "Подтвердите свой секретный код",
      //
      RestorePasscode: "Восстановить код доступа",
      PPRestorePasscode:
        "Введите пароль учетной записи, чтобы восстановить пин для учетной записи",
      PPRestoreSucces: "Пароль успешно удален",
      PPRestoreFail: "Неверный пароль. Повторите попытку",
    },

    AdvertismentScreen: {
      Sale: "Скидка",
      SaleText: "Только сейчас! Скидка до 75% на премиум-версию.",

      Bills: "Счета",
      BillsText: "Создавайте любое количество счетов, долгов, целей.",

      Categories: "Категории",
      CategoriesText:
        "Создавайте любое количество категорий расходов и доходов.",

      Sync: "Синхронизация",
      SyncText:
        "Используйте неограниченное количество мобильных устройств для ведения совместного учёта.",

      Profiles: "Профили",
      ProfilesText:
        "Используй разные профили с независимыми счетами и категориями",

      Templates: "Шаблоны",
      TemplatesText: "Создавай шаблоны платежей и используй их в один клик",
    },

    BottomPannel: {
      month: "месяц",
      month1: "1 месяц",
      month3: "3 месяца",
      month6: "6 месяцев",
      per: "в",
      for: "за",
    },

    RequsetResetPopup: {
      PPOflineAppUseAlert:
        "Вы использовали приложение без авторизации. Вы хотите восстановить данные из облачной базы данных или с локального устройства?",
      FromCloud: "С облака",
      FromDevice: "С устройства",
    },

    Popups: {
      PPProfileCreateLoading: "Новый профиль создается...",
      TTDeleteProfile: "Удаление профиля",
      PPDeleteProfile: "Вы уверены что хотите удалить профиль:",
      //
      TitleProfileCreateError: "Ошибка создание профиля",
      PPProfileCreateError:
        "Профиль с таким названием уже используется, попробуйте другой",
      TitleBillCreateError: "Ошибка создания счета",
      PPBillCreateError:
        "Счет с таким именем уже используется, попробуйте другой",
      //
      PPPassResetSuccess:
        "Письмо было успешно отправлено на вашу электронную почту!",
      PPPassResetFail:
        "Пользователь с таким адресом электронной почты не существует, попробуйте еще раз!",
    },
  },

  MoneyCategoriesTransferScreen: {
    Header: {
      MoneyTransfer: "Денежный перевод",
      BudgetConfig: "Настройка бюджета",
    },

    TopSection: {
      ToBill: "На счет",
      FromBill: "С счета",

      ToCategory: "На категорию",
      FromCategory: "С категории",

      YourComment: "Ваш комментарий",
    },

    Popups: {
      PPRepeatOperation: "Повторять эту операцию каждый",
      EveryHour: "Каждый час",
      EveryDay: "Каждый день",
      Every3Days: "Каждые 3 дня",
      EveryWeek: "Каждую неделю",
      Every2Weeks: "Каждые 2 недели",
      EveryMonth: "Каждый месяц",
      //
      ChooseBill: "Выберите счет",
      ChooseAction: "Выберите действие",
      //
      OperationSubmissionError: "Ошибка отправки операции",
      PPAlertEmptySum: "Операция без суммы не будет записана",
      PPUnselectedCategoryOrBill: "Пожалуйста, выберите поля счета и категории",
      EnterSum: "Ввести сумму",
    },
  },

  EmptyLists: {
    EmptyOperations: "У вас нету операций",
    EmptyBankSMSSettings:
      "У вас пока нет шаблонов СМС приязанных к счетам, нажмите плюс для добавления.",
    EmptyReservedCopies: "У вас нет резервных копий",
    EmptyPhotosMultipleGallery: "У вас нет фотографий в хранилище",
    Budget:
      "Сначала добавьте категорию или счет сбережения, чтобы добавить настройки бюджета.",
  },

  BankSMSSettings: {
    SelectBill: "Выберите счет",
    NewSMSTemplate: "Информация по шаблону СМС",

    OriginatingAdress: "Номер отправителя",
    MessageBody: "Шаблонное сообщение",

    KeywordsList: "Список ключевых слов",
    Keyword: "Ключевое слово",
    AddKeyword: "Добавить ключевое слово",
  },

  VoiceRecognitionScreen: {
    Speak: "Говорите",
    Example: "Пример",
    PPExample1: "Добавить 50 на категорию",
    PPExample2: "со счета",
    MoneyAmount: "Сумма",
    PPRecognitionFail: "Категория или счёт не распознаны. Повторите попытку.",
    RecognitionFailure: "Ошибка распознавания",
    PopupRecognitionFailBody: `Категория или счёт не будут распознаны, если они отличаются по названиям хотя бы в одну букву. Например вы говорите "Карты", а счёт называется "Карта".`,
  },

  ReservedDataScreen: {
    Popup: {
      TitleRequestRecieved: "Запрос поступил в обработку",
      PPRequestCreateReserveData: "Резервная копия в процессе создания",
      TitleRestoreSuccess: "Успешное восстановление",
      PPRestoreSuccess: "Резервированные данные успешно восстановлены",
    },
  },

  StorageSubscriptions: {
    StorageSubscriptions: "Подписка на хранилище",
    //
    TitleExceed: "Превышен размер хранилища фотографий",
    PPBody:
      "К сожалению, вы превысили базовый лимит подписки на хранилище фотографий. Вы можете удалить старые или ненужные фотографии или купить дополнительное место.",
    PPBodyUnused:
      "Здесь отображается количество свободного места в хранилище фотографий. Мы применяем оптимальное сжатие фотографий, чтобы чеки и накладные оставались читаемы, вплоть до формата А4, поэтому хранилище рассчитано примерно на 10,000 фото. Если вам не хватит этого объёма, то вы можете расширить его или удалить старые фото.",
    UpgradePlan: "Увеличить хранилище",
    PhotosStorage: "Хранилище фотографий",
    WhyPaid: "Почему это платно?",
    DeletePhotos: "Удалить фото",
    //
    PPExplanation:
      "Наше приложение использует продвинутую базу хранения ваших данных и фотографий. 98% базы данных заполнено именно фотографиями, которые мы умеренно сжимаем, чтобы создать компромисс между размером и качеством. К сожалению в цену базовой подписки включен только 1 Гб хранилища и мы не можем предоставить больше, так как цена хранения 1 гб стоит не мало (не путайте бесплатные 10 Гб на google диске или подобном облачном хранилище, это совсем разные вещи). Мы ежемесячно оплачиваем аренду серверов, которые надежно хранят ваши данные, мгновенно загружаются на ваш телефон и синхронизируют их между устройствами. Просьба отнестись к этому с пониманием.",
  },

  Validation: {
    InvalidEmail: "Неверный адрес электронной почты",
    LongPassword: "Пароль слишком длинный - не более 16 символов.",
    ShortPassword: "Пароль слишком длинный - не более 16 символов.",
    PasswordLatin: "Пароль может содержать только латинские буквы.",
    //
    EmailRequired: "Требуется электронная почта",
    PasswordRequired: "Требуется пароль",
  },
}
