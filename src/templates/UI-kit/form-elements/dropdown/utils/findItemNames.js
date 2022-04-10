const itemsName = {
  спальни: ['спальня', 'спальни', 'спален'],
  кровати: ['кровать', 'кровати', 'кроватей'],
  'ванные комнаты': ['ванная комната', 'ванные комнаты', 'ванных комнат'],
  взрослые: ['гость', 'гостя', 'гостей'],
  дети: ['гость', 'гостя', 'гостей'],
  младенцы: ['младенец', 'младенца', 'младенцев'],
  сутки: ['сутки', 'суток', 'суток'],
  голосов: ['голос', 'голоса', 'голосов'],
}

function findItemNames(text) {
  const itemNames = itemsName[text]
  if (!itemNames) {
    return text
  }
  return itemNames
}

export default findItemNames