function declination(number, text) {
  let value;
  if (!(typeof (text) === 'string')) {
    const cases = [2, 0, 1, 1, 1, 2];
    value = text[
      (number % 100 > 4 && number % 100 < 20)
        ? 2
        : cases[(number % 10 < 5) ? number % 10 : 5]];
  } else {
    value = text;
  }
  return value;
}

export default declination;
