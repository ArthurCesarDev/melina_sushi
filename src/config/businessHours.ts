/**
 * Altere somente esta lista para controlar dias e horários em todo o site.
 * `isOpen: false` deixa o dia fechado. Para abrir um dia, use horários HH:MM.
 */
export const BUSINESS_HOURS = [
  { weekday: 4, label: "Quinta-feira", isOpen: true, opensAt: "19:00", closesAt: "22:00" },
  { weekday: 5, label: "Sexta-feira", isOpen: true, opensAt: "19:00", closesAt: "22:00" },
  { weekday: 6, label: "Sábado", isOpen: true, opensAt: "19:00", closesAt: "22:00" },
] as const;

// Fechamentos excepcionais no formato AAAA-MM-DD (horário local).
export const STORE_CLOSED_DATES = [
  "2026-07-30",
  "2026-07-31",
  "2026-08-01",
] as const;

export const SPECIAL_CLOSURE_NOTICE =
  "Aviso: excepcionalmente, não funcionaremos neste fim de semana (30/07 a 01/08). Retornaremos na próxima quinta-feira.";

type BusinessDay = (typeof BUSINESS_HOURS)[number];

function formatLocalDate(date: Date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatTime(time: string) {
  return time.replace(":00", "h").replace(":", "h");
}

export function formatBusinessDay(day: BusinessDay) {
  return day.isOpen ? `${day.label}: ${formatTime(day.opensAt)} às ${formatTime(day.closesAt)}` : `${day.label}: Fechado`;
}

export const businessHoursSummary = BUSINESS_HOURS.map(formatBusinessDay).join(" • ");
export const businessHoursList = BUSINESS_HOURS.map(formatBusinessDay);

export function getStoreClosureNotice(date = new Date()) {
  return STORE_CLOSED_DATES.some((closedDate) => closedDate === formatLocalDate(date))
    ? SPECIAL_CLOSURE_NOTICE
    : null;
}

export function isStoreOpenAt(date = new Date()) {
  if (getStoreClosureNotice(date)) return false;

  const schedule = BUSINESS_HOURS.find((day) => day.weekday === date.getDay());
  if (!schedule?.isOpen) return false;

  const currentTime = date.getHours() * 60 + date.getMinutes();
  const [openHour, openMinute] = schedule.opensAt.split(":").map(Number);
  const [closeHour, closeMinute] = schedule.closesAt.split(":").map(Number);
  return currentTime >= openHour * 60 + openMinute && currentTime < closeHour * 60 + closeMinute;
}
