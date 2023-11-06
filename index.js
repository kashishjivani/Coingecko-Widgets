function fetchTokenInfo() {
    const tokenName = document.getElementById("tokenName").value;

    if (tokenName) {
        const apiUrl = `https://api.coingecko.com/api/v3/coins/${tokenName}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log("Data:",data);
                displayTokenInfo(data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    } else {
        alert("Please enter a valid token name.");
    }
}

function displayTokenInfo(data) {
    const infoContainer = document.getElementById("infoContainer");

    infoContainer.innerHTML = `
    <div class="widget-container">
    <div class="widget-header">
        <div class="image-div">
            <img src="${data.image.small}" alt="${data.name}" />
        </div>
        <div class="name-price-div">
          <span style="font-size: 18px;">
            ${data.name}
          </span>
          <br>
          <span style="font-size: 16px;">
            ${data.market_data.current_price.usd} USD
          </span>
        </div>
    </div>
    <div class="other-info-div">
      <div class="rank-div">
        Rank
        <br>
        <br>
        <span style="font-size: 18px;">
          ${data.market_cap_rank}
        </span>
      </div>
      <div class="market-cap-div">
        MARKET CAP
        <br>
        <br>
        <span style="font-size: 18px;">
          ${formatNumberInBillions(data.market_data.market_cap.usd)} USD
        </span>
      </div>
      <div class="volume-div">
        VOLUME
        <br>
        <br>
        <span style="font-size: 18px;">
          ${formatNumberInBillions(data.market_data.total_volume.usd)} USD
        </span>
      </div>
    </div>
</div>
    `;
}

function formatNumberInBillions(number) {

    if (Math.abs(number) >= 1e9) {
        const billionValue = (number / 1e9).toFixed(2);
        return `${billionValue} B`;
    } else {
        return number.toString();
    }
}
