import dayjs from "dayjs"

export const onSwipeLeft = (
  setDateActionCreator: (initialDate: any, finalDate: any) => void,
  DateType: string,
  InitialDate: any,
  FinalDate: any
) => {
  if (DateType === "Infinite") {
  } else if (DateType === "Custom") {
  } else if (DateType === "Year") {
    setDateActionCreator(
      new Date(dayjs(InitialDate).add(1, "year") as any).getTime(),
      new Date(dayjs(FinalDate).add(1, "year") as any).getTime()
    )
  } else if (DateType === "Day") {
    setDateActionCreator(
      new Date(dayjs(InitialDate).add(1, "day") as any).getTime(),
      new Date(dayjs(FinalDate).add(1, "day") as any).getTime()
    )
  } else if (DateType === "Week") {
    setDateActionCreator(
      new Date(dayjs(InitialDate).add(1, "week") as any).getTime(),
      new Date(dayjs(FinalDate).add(1, "week") as any).getTime()
    )
  } else if (DateType === "Month") {
    setDateActionCreator(
      new Date(
        (dayjs(InitialDate)
          .startOf("month")
          .add(1, "month")
          .startOf("month") as any) as any
      ).getTime(),
      new Date(
        dayjs(FinalDate).startOf("month").add(1, "month").endOf("month") as any
      ).getTime()
    )
  }
}

export const onSwipeRight = (
  setDateActionCreator: (initialDate: any, finalDate: any) => void,
  DateType: string,
  InitialDate: any,
  FinalDate: any
) => {
  if (DateType === "Infinite") {
  } else if (DateType === "Custom") {
  } else if (DateType === "Year") {
    setDateActionCreator(
      new Date(dayjs(InitialDate).subtract(1, "year") as any).getTime(),
      new Date(dayjs(FinalDate).subtract(1, "year") as any).getTime()
    )
  } else if (DateType === "Day") {
    setDateActionCreator(
      new Date(dayjs(InitialDate).subtract(1, "day") as any).getTime(),
      new Date(dayjs(FinalDate).subtract(1, "day") as any).getTime()
    )
  } else if (DateType === "Week") {
    setDateActionCreator(
      new Date(dayjs(InitialDate).subtract(1, "week") as any).getTime(),
      new Date(dayjs(FinalDate).subtract(1, "week") as any).getTime()
    )
  } else if (DateType === "Month") {
    setDateActionCreator(
      new Date(
        (dayjs(InitialDate)
          .startOf("month")
          .subtract(1, "month")
          .startOf("month") as any) as any
      ).getTime(),
      new Date(
        dayjs(FinalDate)
          .startOf("month")
          .subtract(1, "month")
          .endOf("month") as any
      ).getTime()
    )
  }
}

export const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
}
