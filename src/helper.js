//#region Crypto pair calculation
//Алгоритм расчета для одного тикера(например BTC)
let basePrice1 = getBasePrice("BTC");
let listTradePairs1 = getTradePairsByTicker("BTC");

// 1. Получаем цену в USDT
function getBasePrice(ticker){
    //logic
    return result;
}

// 2. Ищем список всех торгуемых пар по тикеру
function getTradePairsByTicker(ticker){
    //logic
    return ListResult;
}

// 3. Перебираем список пар с конвертацией в USDT
function getTradePairsByUSDT(tradePair){
    //logic
    return usdtResult;
}

// 4. Составляем список типа обьект listTradePairs - tradePairsByUSDT
function name(ticker1, ticker2, price1, price2) {
    //logic
    return result;
}

// 5. Вспомогательное, расчет обратной стоимости пары (ETH\BTC -> BTC\ETH)
function revertTradePairPrice(tradePairPrice) {
    // Есть пара ETH/BTC которая стоит 0.06156 BTC
    // Обратная стоимость BTC/ETH = 1 / (0.06156 BTC) = 16,24431448992853 ETH
    return 1/tradePairPrice;
}
//#endregion