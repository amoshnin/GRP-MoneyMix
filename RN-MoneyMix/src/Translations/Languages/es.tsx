export default {
  Notifications: {
    PPUserNotOpenAppTitle: "Recordatorio de gerente de presupuesto",
    PPUserNotOpenApp: "No olvides agregar tus gastos e ingresos para hoy",
    //
    PPAutoOperationFillTitle: "Repetición de operacion automática",
    PPAutoOperationFill: "Ahora agregado",
    //
    Date: "Data",
    Time: "Hora",
    Confirmed: "Confirmado",
    ClickToSchedule: "Haga clic para confirmar",
    //
    OperationReminder: "Recordatorio de la operaciónr",
    PPRemindToAdd: "Le recordamos que agregue",
    Income: "ingresos",
    Expense: "gastos",
    for: "por",
  },

  GeneralPhrases: {
    yes: "Si",
    no: "No",
    //
    Date: "Date",
    Time: "Time",
    Cancel: "Cancelar",
    Save: "Guardar",
    Confirm: "Confirmar",
    Change: "Cambiar",
    Until: "Hasta",
    From: "Desde",
    or: "o",
    for: "para",
    Apply: "Aplicar",
    DoNotShowAgain: "No mostrar de nuevo",

    Popups: {
      TitleNetProblem: "Problema de red",
      PPNetworkProblema:
        "Esta acción no se puede realizar sin conexión, conéctese a la red",
    },
  },

  AppInstallScreen: {
    Start: "Inicio",
    PPStart:
      "Gestión de las finanzas personales intuitiva e increíblemente sencilla",
  },

  BillsScreen: {
    Bills: "Cuentas",
    Balance: "Balance",

    Lists: {
      Bills: "Cuentas",
      Savings: "Ahorros",
      Debts: "Deudas",
      //
      TotalDebt: "Deuda total",
      Returned: "Regresado",
    },

    CreateNewBillPopup: {
      CreateBill: "Nueva cuenta",

      NormalBill: "Normal",
      Cash_Card: "Efectivo, tarjeta de credito",

      DebtBill: "Cuenta de deuda",
      Credit_Mortgage: "Credito, hipoteca",

      SavingsBill: "Ahorros",
      Savings_Goal: "Ahorros, metas",
      //
      Cash: "Efectivo",
      Card: "Tarjeta",
    },

    EditBillPopup: {
      Edit: "Editar",
      Balance: "Balance",
      Operations: "Operaciones",
      Replenish: "Reponer",
      Withdrawl: "Retirar",
      Transfer: "Transferir",

      Graphic: "Gráfico",
      defaultBill: "Factura predeterminada",
    },
  },

  Categories: {
    Main: {
      Income: "Ingresos",
      Expenses: "Gastos",
      Transaction: "Transferencias",
      Names: "Nombres",
      Balance: "Balance",
      AddMore: "Añadir mas",
      OpenTemplates: "Plantillas",
      ArchivedCategory: "Categoría archivada",
      //
      Cash: "Efectivo",
      Card: "Tarjeta",
    },

    Popups: {
      CategoryIcon: "Icon de categoria",
      CategoryColor: "Color de categoria",
      CombineCategories: "Combinar con otra categoria",
      MoveToCategory: "Pasar a la categoria",
    },

    Templates: {
      TemplatesList: "Listado de plantillas",
      NewOperationTemplate: "Nueva plantilla de operacion",
      TemplateTitle: "Titulo de la plantilla",
      PPDeleteTemplate: "¿Seguro que quieres eliminar esta plantilla?",
      PPEmptyCreateTemplateScreenText:
        "Primero debe agregar al menos una categoría y una factura para crear una plantilla",
    },

    DefaultCategories: {
      Restaurant: "Restaurante",
      Transport: "Transporte",
      Products: "Comestibles",
      Health: "Salud",
      Salary: "Salario",
      Job: "Trabajo",
      Percentage: "Porcentaje",
      Gifts: "Regalos",
      Children: "Niños",
      Groceries: "Comestibles",
      Leisure: "Ocio",
    },
  },

  Operations: {
    Search: "Buscar",
    FilterScrSuche: {
      Filter: "Filtro",
      OperationType: "Tipo de operacion",
    },

    Gallery: {
      Gallery: "Galería",
      Camera: "Camara",
    },

    Popup: {
      Days: {
        Monday: "Lunes",
        Tuesday: "Martes",
        Wednesday: "Miercoles",
        Thursday: "Jueves",
        Friday: "Viernes",
        Saturday: "Sabado",
        Sunday: "Domingo",

        Today: "Hoy",
        Tomorrow: "Mañana",
        Yesterday: "Ayer",
      },

      Notify: "Notificar",
      Repeat: "Repitir",
      Delete: "Eliminar",
      Date: "Data",
      Duplicate: "Duplicar",
      AddComment: "Añadir comentario",
    },
  },

  StatsScreen: {
    DayAvg: "Dia (avg.)",
    Today: "Hoy",
    Week: "Semana",
  },

  Budget: {
    MonthBudget: "Presupuesto por mes",
    Earned: "Ganado",
    Spent: "Gastado",
    PlacedOnHold: "Pospuesto",

    Popup: {
      FastBudget: "Presupuesto rápido",
      CurrentExpenses: "Gastos corrientes",
      LastMonthExpenses: "Gastos del último mes",
    },
  },

  CreateScreen: {
    Header: {
      Name: "Nombre",
      NameIsRequired: "Se require el nombre",
      // Create categories
      CreateCategory: "Crear categoria",
      EditCategory: "Redactar categoria",
      // Create bill
      CreateNewBill: "Cuenta nueva",
      EditBill: "Editar cuenta",
    },

    Body: {
      // Create categories
      Settings: "Ajustes",
      CategoryCurrency: "La moneda de la categoria",
      SubCategory: "Sub-categoria",
      AddSubCategory: "Añadir sub-categoria",
      PPDeleteSubCategory:
        "¿Está seguro de que desea eliminar esta subcategoría?",
      PPConvertSubCategory:
        "¿Está seguro de que desea convertir esta subcategoría en una categoría?",
      // Create bills
      Type: "Tipo",
      BillCurrency: "Moneda de la cuenta",
      Description: "Descripcion",

      AccountBalance: "Balance",
      CreditLimit: "Limite de credito",
      TakeInAccountInTotalBalance: "Mostrar en el saldo general",
      DisplayInExpenses: "Mostrar en gastos",
      Goal: "Meta",
      IOwe: "Devuelto",
      TotalDebtSum: "Suma total de la deuda",
      DeleteBill: "Eliminar cuenta",
      DeleteSubCategory: "Eliminar subcategoría",
      ConvertSubCategory: "Convertir subcategoría en categoría",
      //
      TitleDelAllBills: "Eliminación denegada",
      PPDelAllBills: "No puedes borrar todas las facturas",
      //
      TitleDeleteBill: "Eliminación de factura",
      PPDeleteBillVerify:
        "¿Está seguro de que desea eliminar esta factura? Esta acción es irreversible",
      TitleDeleteCategory: "Eliminación de categoría",
      PPDeleteCategoryVerify:
        "¿Está seguro de que desea eliminar esta categoría? Esta acción es irreversible.",
    },

    Popups: {
      Colors: "Colores",
      Icons: "Icons",
      //
      MoveCategoryPopup: {
        Title: "Mover a categoría",
        PP1: "se agregará a la categoría",
        PP2: "como subcategoría",
      },
      CombineCategoryPopup: {
        Title: "Combinar con categoría",
        PP1: "Todas las operaciones asociadas a una categoría",
        PP2: "se moverá a una categoría",
        PP3: "Todas las subcategorías se moverán a una categoría",
        PP4: "será eliminado",
        Category: "Categoría",
      },
    },
  },

  DrawerNavigator: {
    Header: {
      Login: "Iniciar sesión",
      SyncDisabled: "Sincronización desactivada",
    },

    SubHeader: {
      PremiumVersion: "Versión premium",
      PPUseAllFunctionality:
        "¡Utiliza todas las funciones de la aplicación junto con la versión premium!",
    },

    ButtonsList: {
      AccountInfo: "Cuenta",
      Settings: "Ajustes",
      AppInfo: "Informacion de la applicacion...",
      Days: "Dias",
      //
      Subscription: "Suscripción",
      ChangePassword: "Cambiar contraseña",
      BankSMS: "SMS del banco",
      Logout: "Cerrar sesión",
      //
      Language: "Idioma",
      English: "Ingles",
      Spanish: "Español",
      German: "Aleman",
      Russian: "Ruso",
      //
      MainCurrency: "Moneda base",
      AustrDollar: "Dólar australiano",
      BritishFunt: "Libra esterlina",
      USDollar: "Dólar estadounidense",
      Euro: "Euro",
      CanadianDollar: "Dólar canadiense",
      ChineseYuan: "Yuan chino",
      RusRuble: "Rublo ruso",
      SwissFrank: "Franco suizo",
      BelRuble: "Rublo bielorruso",
      Tenge: "Tenge",
      Grivn: "Hryvnia",
      //
      InitialScreen: "Pantalla inicial de la aplicación",
      InitialStatsScreen: "Pantalla de estadísticas iniciales",
      Bills: "Cuentas",
      Category: "Categorias",
      Operations: "Operaciones",
      Stats: "Statistica",
      Income: "Ingresos",
      Expenses: "Gastos",
      //
      Notifications: "Notificaciones",
      Password: "Contraseña",
      Budget: "Presupuesto",
      ReserveData: "Reservar datos",
      ExportDataInCSV: "Exportar datos en CSV",
      DeleteData: "Eliminar datos",
      ContactSupport: "Contactar el soporte",
    },

    Popup: {
      PPDeleteData:
        "¿Estás seguro de que deseas eliminar todos los datos? Esta acción no es reversible.",
      PPLogoutUser:
        "La sincronización de datos y otras características premium se desactivarán.",
      RateAppTitle: "Disfrutando Money Mix?",
      PPRateApp: "Por favor califícanos en Google PlayStore",
      TitleCSVDownload: "Descarga exitosa",
      PPCSVDownload: `Su informe de presupuesto se descargó correctamente`,
      TitlePCSFailDownload: "Error de descarga",
      PPCSVFailDownload:
        "Error en la descarga de CSV. Vuelva a intentarlo más tarde",

      currentPassword: "Contraseña actual",
      NewPassword: "Nueva contraseña",
    },
  },

  Header: {
    AllTime: "Todo el tiempo",

    Popups: {
      Profile: "Cuenta",
      CreateNewProfile: "Crear nuevo perfil",
      SelectDay: "Seleccionar día",
      Day: "Día",
      Year: "Año",
      Week: "Semana",
      Month: "Mes",
      SelectRange: "Seleccionar rango",
      SelectDiap: "Seleccionar rango",
    },

    Months: {
      January: "Enero",
      February: "Febrero",
      March: "Marzo",
      April: "Abril",
      May: "Mayo",
      June: "Junio",
      July: "Julio",
      August: "Agosto",
      September: "Septiembre",
      October: "Octubre",
      November: "Noviembre",
      December: "Deciembre",
    },
  },

  PremiumVersionScreen: {
    PremiumVersion: "Versión premium",
    General: "General",
    RestoreData: "Restauración de datos",

    Auth: {
      EnterPassword: "Introduzca la contraseña",
      Registration: "Registro",
      Login: "Login",
      Register: "Registrarse",
      ResetPassword: "Restablecer contraseña",
      ResetPasswordTitle: "Restablecer contraseña",
      //
      AlreadyHavePrem: "Ya tiene premium? - Entra aqui!",
      DontHavePremPP: "No tienes premium aun? Compra uno aqui!",
      PPForgotPass: "¿Olvidó su contraseña? Restablezca",
      PPWrongLogin:
        "Su correo electrónico o contraseña no son válidos. Vuelva a intentarlo.",
      PPWrongPass: "Su contraseña no es válida. Vuelva a intentarlo",
      PPNetworkProblem:
        "Tiene problemas con su conexión a Internet. Inténtelo más tarde.",
      PPWrongSecretCode: "¡Código secreto incorrecto! ¡Inténtelo de nuevo!",
      PPConfirmSecretCode: "Confirme su código secreto",
      //
      RestorePasscode: "Restaurar contraseña",
      PPRestorePasscode:
        "Ingrese la contraseña de su cuenta para restaurar su contraseña para la cuenta",
      PPRestoreSucces: "Código de acceso eliminado correctamente",
      PPRestoreFail: "Contraseña no válida. Vuelve a intentarlo",
    },

    AdvertismentScreen: {
      Sale: "Descuento",
      SaleText:
        "¡Ahora mismo! Descuento de hasta el 75% en la versión premium!",

      Bills: "Cuentas",
      BillsText: "Cree cualquier número de cuentas, deudas, objetivos.",

      Categories: "Categorías",
      CategoriesText:
        "Cree cualquier número de categorías de gastos e ingresos",

      Sync: "Sincronización",
      SyncText:
        "Utilice un número ilimitado de dispositivos móviles para la contabilidad conjunta",

      Perfiles: "Perfiles",
      ProfilesText:
        "Utilice diferentes perfiles con cuentas y categorías independientes",

      Plantillas: "Plantillas",
      TemplatesText: "Cree plantillas de pago y utilícelas con un solo clic",
    },

    BottomPannel: {
      month: "mes",
      month1: "1 mes",
      month3: "3 meses",
      month6: "6 meses",
      per: "per",
      for: "por",
    },

    RequsetResetPopup: {
      PPOflineAppUseAlert:
        "Has estado usando la aplicación sin autorización. ¿Desea restaurar datos desde la base de datos en la nube o desde su dispositivo local?",
      FromCloud: "Desde el almacenamiento",
      FromDevice: "Desde el dispositivo",
    },

    Popups: {
      PPProfileCreateLoading: "Se esta creando su nuevo perfil...",
      TTDeleteProfile: "Eliminar perfil",
      PPDeleteProfile: "¿Estás seguro de que eliminarías el perfil?",
      //
      TitleProfileCreateError: "Error de creación de perfil",
      PPProfileCreateError:
        "El perfil con este nombre ya está en uso, prueba con otro",
      TitleBillCreateError: "Error de creación de cuenta",
      PPBillCreateError:
        "Cuenta con este nombre ya está en uso, prueba con otro",
      //
      PPPassResetSuccess:
        "¡El correo electrónico se envió correctamente a su correo electrónico!",
      PPPassResetFail:
        "¡El usuario con este correo electrónico no existe, inténtelo de nuevo!",
    },
  },

  MoneyCategoriesTransferScreen: {
    Header: {
      MoneyTransfer: "Transferencia de dinero",
      BudgetConfig: "Configuracion de presupuesto",
    },

    TopSection: {
      ToBill: "Cobrar",
      FromBill: "De factura",

      ToCategory: "A la categoría",
      FromCategory: "De categoría",

      YourComment: "Su comentario",
    },

    Popups: {
      PPRepeatOperation: "Repetir esta operacion cada",
      EveryHour: "Cada hora",
      EveryDay: "Cada dia",
      Every3Days: "Cada 3 dias",
      EveryWeek: "Cada semana",
      Every2Weeks: "Cada 2 semanas",
      EveryMonth: "Cada mes",
      //
      ChooseBill: "Selecciona cuenta",
      ChooseAction: "Selecciona acción",
      //
      OperationSubmissionError: "Error de envío de la operación",
      PPAlertEmptySum: "La transacción sin suma no será registrada",
      PPUnselectedCategoryOrBill:
        "Seleccione los campos de categoría y de factura",
      EnterSum: "Ingresar la suma",
    },
  },

  EmptyLists: {
    EmptyOperations: "Usted no tiene operaciones",
    EmptyBankSMSSettings:
      "Aún no tiene plantillas de SMS asociadas con cuentas, haga clic en más para adiciones.",
    EmptyReservedCopies: "No tienes copias reservadas",
    EmptyPhotosMultipleGallery: "No tienes fotos almacenadas",
    Budget:
      "Primero agregue una categoría o una factura de ahorro para agregar la configuración del presupuesto",
  },

  BankSMSSettings: {
    SelectBill: "Seleccionar cuenta",
    NewSMSTemplate: "Información de plantilla de SMS",

    OriginatingAdress: "Dirección de origen",
    MessageBody: "Plantilla del cuerpo del mensaje",

    KeywordsList: "Lista de palabras clave",
    Keyword: "Palabra clave",
    AddKeyword: "Añadir palabra clave",
  },

  VoiceRecognitionScreen: {
    Speak: "Habla",
    Example: "Ejemplo",
    PPExample1: "Agregar 50 a la categoría",
    PPExample2: "desde la cuenta",
    MoneyAmount: "Suma",
    PPRecognitionFail:
      "Categoría o puntuación no reconocida. Inténtalo de nuevo.",
    RecognitionFailure: "Error de reconocimiento",
    PopupRecognitionFailBody: `No se reconocerá una categoría o puntuación si difieren en el nombre por al menos una letra. Por ejemplo, dice "Tarjetas" y la cuenta se llama "Tarjeta" .`,
  },

  ReservedDataScreen: {
    Popup: {
      TitleRequestRecieved: "La solicitud ha sido procesada",
      PPRequestCreateReserveData: "Se está creando la copia de seguridad",
      TitleRestoreSuccess: "Restauración exitosa",
      PPRestoreSuccess:
        "Los datos de la copia de seguridad se restauraron correctamente",
    },
  },

  StorageSubscriptions: {
    StorageSubscriptions: "Suscripción de almacenamiento",
    //
    TitleExceed: "Se excedió el tamaño de almacenamiento de las fotos",
    PPBody:
      "Lo sentimos, excediste el límite básico de suscripción de almacenamiento de fotos. Puedes borrar fotos viejas o innecesarias o comprar más espacio",
    PPBodyUnused:
      "Aquí se muestra la cantidad de espacio libre en el almacenamiento de fotos. Aplicamos la compresión óptima de las fotos para garantizar que los recibos y las facturas sigan siendo legibles, hasta el tamaño A4, por lo que el almacenamiento está diseñado para aproximadamente 10,000 fotos. Si esto no es suficiente para usted, puede expandirlo o eliminarlo fotos antiguas.",
    UpgradePlan: "Actualizar el plan",
    PhotosStorage: "Almacenamiento de fotos",
    WhyPaid: "¿Por qué se paga?",
    DeletePhotos: "Eliminar fotos",
    //
    PPExplanation:
      "Nuestra aplicación utiliza una base de datos avanzada para almacenar sus datos y fotografías. El 98% de la base de datos está llena de fotografías, que comprimimos moderadamente para crear un compromiso entre tamaño y calidad. Desafortunadamente, solo 1 GB de almacenamiento está incluido en el precio de la suscripción básica, y no podemos ofrecer más, ya que el precio de 1 GB de almacenamiento no es poco (no confunda 10 GB gratis en el disco de Google o almacenamiento en la nube similar, estas son cosas completamente diferentes). Pagamos un alquiler mensual por servidores que almacenan de forma segura sus datos, los descargan instantáneamente a su teléfono y los sincronizan entre dispositivos. Por favor, comprenda esto.",
  },

  Validation: {
    InvalidEmail: "Correo electrónico no válido",
    LongPassword:
      "La contraseña es demasiado larga; debe tener un máximo de 16 caracteres",
    ShortPassword:
      "La contraseña es demasiado larga; debe tener un máximo de 16 caracteres",
    PasswordLatin: "La contraseña solo puede contener letras latinas.",
    //
    EmailRequired: "Se requiere correo electrónico",
    PasswordRequired: "Se requiere contraseña",
  },
}
