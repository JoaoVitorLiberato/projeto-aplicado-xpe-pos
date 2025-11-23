export function timeZone (dateOnly?:string) {
	// https://simonsc.medium.com/working-with-time-zones-in-javascript-1b57e716d273
	const DATE = new Date()
	const MILLISECONDS = DATE.getMilliseconds();
	const TZ_DATE = new Intl.DateTimeFormat("en-US", {
		timeZone: "America/Sao_Paulo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	})
	const TZ_DATE_PART = TZ_DATE.formatToParts(DATE)
	const TZ_DATE_PARTS = {
		year: "",
		month: "",
		day: "",
		hour: "",
		minute: "",
		second: "",
		milisecond: "",
	}

	for (const { type, value } of TZ_DATE_PART) {
		if (type === "literal") continue;
		TZ_DATE_PARTS[type as keyof typeof TZ_DATE_PARTS] = value
	}

	const {
		year,
		month,
		day,
		hour,
		minute,
		second,
	} = TZ_DATE_PARTS ?? {}

  if (/only-date/i.test(String(dateOnly))) return `${year}-${month}-${day}`

	return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}.${MILLISECONDS}Z`)
}

const date = new Date()
const SPLITED_DATE = String(timeZone("only-date")).split('-');
const plusDay = (date.getHours() - 3) < 4 ? 0 : 1
const returnDay = (date.getHours() - 3) < 4 ? 1 : 0
export const formatDateToYYYYMMDD = `${SPLITED_DATE[0]}-${SPLITED_DATE[1]}-${(Number(SPLITED_DATE[2]) - Number(returnDay)) < 9 ? 0 : ''}${Number(SPLITED_DATE[2]) - Number(returnDay)}`;
export const formatDateToYYYYMMDDPlusDay = `${SPLITED_DATE[0]}-${SPLITED_DATE[1]}-${(Number(SPLITED_DATE[2]) - Number(returnDay)) < 9 ? 0 : ''}${Number(SPLITED_DATE[2]) + plusDay}`;
