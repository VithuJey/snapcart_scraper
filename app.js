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
  .then(page => {
    let itemsDetails = page.evaluate(() => {
      let items = [];
      let itemJson = {};

      let items = document.querySelectorAll("div[class='col-sm-6']");

      for (let item of items) {
        try {
          itemJson.name = item.querySelector(
            "div[class='col-sm-6'] > a > div > div[class='price-cont veg-content'] > div > h3"
          );
          if ("vegetable" in URL) itemJson.type = "vegetable";
          else itemJson.type = "fruit";
          itemJson.weight = "1 kg";
          itemJson.date = new Date().getDate();
          itemJson.price = item.querySelector(
            "div[class='col-sm-6'] > a > div > div[class='price-cont veg-content'] > div > span[class='price']"
          );
        } catch (error) {
          console.log(error);
        }

        items.push(itemJson);
      }

      return itemJson;
    });
    console.log(itemsDetails);
    return itemsDetails;
  })
  .then((itemsDetails = {}))
  .catch(error => console.log(error));
