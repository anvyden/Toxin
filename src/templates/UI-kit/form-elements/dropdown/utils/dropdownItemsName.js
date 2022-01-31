const itemsName = [
  ['спальня', 'спальни', 'спален'],
  ['кровать', 'кровати', 'кроватей'],
  ['ванная комната', 'ванные комнаты', 'ванных комнат'],
]

function findItemNames(text) {
  let itemNames
  itemsName.forEach((arrayOfNames) => {
    if (arrayOfNames.includes(text)) {
      itemNames = arrayOfNames
    }
  })
  return itemNames
}

export default findItemNames
