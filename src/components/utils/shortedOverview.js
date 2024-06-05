const getShortedOverview = (text = '', maxLength, singlePage = null) => {
  if (singlePage) return text;
  if (text.length <= maxLength) return text;

  const lastSpaceIndex = text.lastIndexOf(' ', maxLength);
  if (lastSpaceIndex !== -1) {
    return text.slice(0, lastSpaceIndex) + '...';
  }
  return text.slice(0, maxLength) + '...';
};

export default getShortedOverview;
