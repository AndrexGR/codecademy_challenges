function maxProfitDays(stockPrices) {
  const detectBestDayToSell = (i, priceList) => {
    let higherPrice = priceList[i];
    let day = i;
    for (let j = i++; j < priceList.length; j++) {
      if (priceList[j] > higherPrice) {
        higherPrice = priceList[j];
        day = j
      }
    }
    return day
  }
  let bestDaysToBuyNSell = [];
  let bestProfit = 0;
  for (let buyDay = 0; buyDay < stockPrices.length; buyDay++) {
    const bestDayToSell = detectBestDayToSell(buyDay, stockPrices);
    const profit = stockPrices[bestDayToSell] - stockPrices[buyDay];
    if (profit > bestProfit) {
      bestProfit = profit;
      bestDaysToBuyNSell = [buyDay, bestDayToSell];
    }
  }
  return bestDaysToBuyNSell
}

// Leave this so we can test your code:
module.exports = maxProfitDays;