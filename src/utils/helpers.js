export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const truncateText = (text, length = 120) => {
  if (text.length <= length) {
    return text;
  }

  return `${text.slice(0, length)}...`;
};
