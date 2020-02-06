let URL = "http://snapcart.lk/price-updates/all-vegetable-prices.php";
let type = "";

if (URL.includes("vegetable")) {
  type = "vegetable";
  console.log(type);
} else {
  type = "fruit";
  console.log(type);
}
