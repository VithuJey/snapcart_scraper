const puppeteer = require("puppeteer");

// URL to be scraped
let URL = "http://snapcart.lk/price-updates/all-vegetable-prices.php";

// Open the above URL in a browser's new page
ping = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(URL);
  return page;
};

// Evaluate & scrape
ping()
  .then(async page => {
    let itemsDetails = await page.evaluate(() => {
      let items = [];

      let itemElements = document.querySelectorAll("div[class='col-sm-6']");

      itemElements.forEach(itemElement => {
        let itemJson = {};
        try {
          itemJson.name = itemElement.querySelector("h3").innerHTML;
          itemJson.weight = "1 kg";
          itemJson.date = new Date().getDate();
          itemJson.price = itemElement.querySelector(
            "span[class='price']"
          ).innerHTML;
        } catch (error) {
          console.log(error);
        }
        items.push(itemJson);
      });

      return items;
    });
    // console.log(itemsDetails);

    
    if (URL.includes("vegetable")) itemJson.type = "vegetable";
    else itemJson.type = "fruit";

    return itemsDetails;
  })
  .then(itemsDetails => {
    console.log(itemsDetails);
  })
  .catch(error => console.log(error));
