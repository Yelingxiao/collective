/**
 * 假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖该股票一次可能获得的最大利润是多少？
 * @param {number[]} prices
 * @return {number}
 */
 var maxProfit = function(prices) {
  let profit = 0
  let buyPrice = prices[0]
  for (const p of prices) {
    buyPrice = Math.min(buyPrice, p)
    profit = Math.max(profit, p - buyPrice)
  }
  console.log('', profit)
  return profit
}

maxProfit([7,1,5,3,6,4])
maxProfit([7,6,4,3,1])