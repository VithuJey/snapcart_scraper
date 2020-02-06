const puppeteer = require("puppeteer");
const Schema = require("../db/Schema");
const Grocery = Schema.model("grocery");

// URL to be scraped
let URL = "http://snapcart.lk/price-updates/all-vegetable-prices.php";

// Open the above URL in a browser's new page
const ping = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 926 });
  await page.goto(URL);
  return { page, browser };
};

// Evaluate & scrape
const scraper = async () => {
  let { page, browser } = await ping();
  let items = await page.evaluate(() => {
    let itemsArray = [];

    let itemElements = document.querySelectorAll("div[class='col-sm-6']");

    itemElements.forEach(itemElement => {
      let itemJson = {};
      try {
        itemJson.name = itemElement.querySelector("h3").innerHTML;
        itemJson.weight = "1 kg";
        itemJson.date = new Date().toLocaleDateString();
        itemJson.price = itemElement.querySelector(
          "span[class='price']"
        ).innerHTML;
      } catch (error) {
        console.log(error);
      }
      itemsArray.push(itemJson);
    });

    return itemsArray;
  });

  // Add grocery type into the JSON and checking, if it is not in the DB adding it.
  items.forEach(item => {
    // Add item type
    item.type = URL.includes("vegetable") ? "vegetable" : "fruit";

    // Fitting the item into grocery schema.
    let newGrocery = {};
    newGrocery.name = item.name;
    newGrocery.type = item.type;
    newGrocery.weight = item.weight;
    newGrocery.detail = [
      {
        date: item.date,
        price: item.price
      }
    ];

    // Checking the existance of new grocery
    Grocery.find({ name: newGrocery.name })
      .then(res => {
        console.log(res)
        res.length==0
          ? insertGrocery(newGrocery)
          : updateGrocery(res, newGrocery);
      })
      .catch(err => console.log(err));
  });

  // console.log(items);

  await browser.close();

  // return items;
};

// Insert new grocery into DB
const insertGrocery = newGrocery => {
  const grocery = new Grocery(newGrocery);
  grocery
    .save()
    .then(res => console.log("Grocery added " + res))
    .catch(err => console.log(err));
};

// Update existing grocery details
const updateGrocery = (res, newGrocery) => {
  Grocery.update({ _id: res.id }, {'$set': {'grocery.detail': newGrocery.detail}})
    .then(res => console.log("Grocery updated " + res.detail,newGrocery.detail))
    .catch(err => console.log(err));
};

scraper();

// module.exports = scraper;
