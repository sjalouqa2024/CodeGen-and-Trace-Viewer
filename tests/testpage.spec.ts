import { test, expect } from "@playwright/test";
import { BasePage } from "./basePage"
import {LoginPage} from "./LoginPage";
import {RegisterPage} from "./registerPage";
 import { DashboardPage } from "./dashBoardPage";
import {CartPage} from "./cartPage";
import { PaymentPage } from "./paymentPage";


test.use({
  launchOptions: { slowMo: 800 },
});

test("Complete rahulshettyacadem purchase flow", async ({ page }) => {

  //register page  
  const email = `user${Date.now()}@email.com`;
  const password = "P@ssw0rd@123";
  const registerPage=new RegisterPage(page);
  await registerPage.openHomePage();
  await registerPage.registerUser(
  "user",
  "name",
  email,
  "9867871973",
  "2: Student",
  "Female",  
  password,
  "P@ssw0rd@123"
);

//login 
const loginpage =new LoginPage(page);
await loginpage.openHomePage();
await loginpage.loginUser(email, password);

// login screenshot 
await page.screenshot({ path: "screenshot_1_login.png", fullPage: true });

// add item tocart 
const dashboarpage =new DashboardPage(page);
const newTab = await dashboarpage.clickQACareerLink(dashboarpage.qaCareerLink);
await expect(newTab.url()).toContain("rahulshettyacademy.com/qa");
await newTab.close();
await expect(dashboarpage.qaCareerLink).toBeVisible();
await dashboarpage.addItemToCart("ZARA COAT 3");
await expect(dashboarpage.cartCountBadge).toContainText("1");
await dashboarpage.clickCartButton();

// cart page 
const cartpage = new CartPage(page);
const productInCart = await cartpage.getProductName();
await expect (productInCart).toContain("ZARA COAT 3")
// screenshot after adding product to cart 
await page.screenshot({ path: "screenshot_3_cart_page.png", fullPage: true });
await cartpage.clickCheckoutButton();

// Payment details page
const paymentpage = new PaymentPage(page);
await paymentpage.fillPayementDetails(
  "4542993192922293",  // card number
  "12",                 // expiry month
  "25",                 // expiry year
  "123",                // CVV
  "John Doe",           // name on card
  "",                   // coupon (leave empty or skip)
  ""                    // country (SKIP )
);
// screenshot after checking out form 
await page.screenshot({ path: "screenshot_4_payment_filled.png", fullPage: true });

});