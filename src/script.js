import axios from 'axios';

// const apiUrl = 'https://api3.binance.com/api/v3/ticker/24hr';

// document.getElementById("myForm").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const inputText = document.getElementById("inputField").value;
//     const outputBlock = document.getElementById("outputBlock");
//     axios.get(apiUrl, {
//         params: {
//             symbol: inputText,
//         },
//     })
//         .then(response => {
//             console.log(response.data)
//             const data = response.data;
//             const tableHTML = `
//       <table>
//         <tr>
//           <td>askPrice:</td><td>${data.askPrice}</td>
//           <td>askQty:</td><td>${data.askQty}</td>
//         </tr>
//         <tr>
//           <td>bidPrice:</td><td>${data.bidPrice}</td>
//           <td>bidQty:</td><td>${data.bidQty}</td>
//         </tr>
//         <tr>
//           <td>closeTime:</td><td>${data.closeTime}</td>
//           <td>count:</td><td>${data.count}</td>
//         </tr>
//         <tr>
//           <td>firstId:</td><td>${data.firstId}</td>
//           <td>highPrice:</td><td>${data.highPrice}</td>
//         </tr>
//         <tr>
//           <td>lastId:</td><td>${data.lastId}</td>
//           <td>lastPrice:</td><td>${data.lastPrice}</td>
//         </tr>
//         <tr>
//           <td>lastQty:</td><td>${data.lastQty}</td>
//           <td>lowPrice:</td><td>${data.lowPrice}</td>
//         </tr>
//         <tr>
//           <td>openPrice:</td><td>${data.openPrice}</td>
//           <td>openTime:</td><td>${data.openTime}</td>
//         </tr>
//         <tr>
//           <td>prevClosePrice:</td><td>${data.prevClosePrice}</td>
//           <td>priceChange:</td><td>${data.priceChange}</td>
//         </tr>
//         <tr>
//           <td>priceChangePercent:</td><td>${data.priceChangePercent}</td>
//           <td>quoteVolume:</td><td>${data.quoteVolume}</td>
//         </tr>
//         <tr>
//           <td>symbol:</td><td>${data.symbol}</td>
//           <td>volume:</td><td>${data.volume}</td>
//         </tr>
//         <tr>
//           <td>weightedAvgPrice:</td><td>${data.weightedAvgPrice}</td>
//         </tr>
//       </table>
//     `;
//
//             outputBlock.innerHTML = tableHTML;
//         })
//         .catch(error => {
//             outputBlock.innerHTML = "<p>Error: " + error.message + "</p>";
//         });
// });

const apiBasePriceUrl = 'https://api3.binance.com/api/v3/ticker/price';

document.getElementById("basePriceForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const inputText = document.getElementById("inputTicker").value;
    axios.get(apiBasePriceUrl, {
        params: {
            symbol: `${inputText}USDT`,
        },
    })
        .then(response => {
            const data = response.data;
            const basePrice = getBasePrice(data);
            displayResult(basePrice);
        })
        .catch(error => {
            displayError(error.message);
        });
});

function getBasePrice(data) {
    return data.price;
}

function displayResult(basePrice) {
    const outputBlock = document.getElementById("outputBasePrice");
    outputBlock.innerHTML = `
      <p>Base Price: ${basePrice}</p>
    `;
}

function displayError(errorMessage) {
    const outputBlock = document.getElementById("outputBasePrice");
    outputBlock.innerHTML = `<p>Error: ${errorMessage}</p>`;
}

document.getElementById("tradePairsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const inputText = document.getElementById("inputPairsTicker").value;
    axios.get(apiBasePriceUrl)
        .then(response => {
            const data = response.data;
            const tickerPairs = getTradePairsByTicker(data, inputText);
            console.log('tickerPairs', tickerPairs)
            displayTickerPairsList(tickerPairs);
        })
        .catch(error => {
            displayTickerPairsError(error.message);
        });
});

function getTradePairsByTicker(arrayOfTickerPairs, ticker) {
    return arrayOfTickerPairs.filter(pair => {
        return pair.symbol.includes(ticker);
    })
}

function displayTickerPairsList(tickerPairs) {
    const outputBlock = document.getElementById("outputTradePairsList");

    if (tickerPairs.length === 0) {
        outputBlock.innerHTML = "<p>No results found.</p>";
        return;
    }

    outputBlock.innerHTML = `
      <ul>
        ${tickerPairs.map(pair => `<li>Symbol: ${pair.symbol}, Price: ${pair.price}</li>`).join('')}
      </ul>
    `;
}

function displayTickerPairsError(errorMessage) {
    const outputBlock = document.getElementById("outputTradePairs");
    outputBlock.innerHTML = `<p>Error: ${errorMessage}</p>`;
}