export const formattingDate = (dateFrom) => {
  const date = new Date(dateFrom).toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date;
};
