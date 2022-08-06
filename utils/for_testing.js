// Unit testing
const reverse= (string) => {
  return string.split('').reverse().join('')
}

const average = (array) => {
  const reducer =(sum,items) => {
    return sum+items
  }

  return array.length===0?0:
    array.reduce(reducer,0)/array.length
}
module.exports ={
  reverse,average
}