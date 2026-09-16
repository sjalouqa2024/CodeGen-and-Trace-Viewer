import { test, expect } from "@playwright/test";
import { ProtoCommercePage} from "./ProtoCommercePage";
import { ShopPage} from "./ShopPage";
import { CheckoutPage} from "./CheckoutPage";
import { DeliveryPage} from "./deliveryLocationPage";

test.use({
  launchOptions: { slowMo: 800 },
});

test("Complete ProtoCommerce purchase flow", async ({ page }) => {

    // -------------------------
    // ProtoCommerce
    // -------------------------

    const protoPage = new ProtoCommercePage(page);

    await protoPage.openHomePage();
    await protoPage.submitData();

    await expect(protoPage.success_message).toBeVisible();


    // -------------------------
    // Shop
    // -------------------------

    const shopPage = new ShopPage(page);

    await shopPage.openShopPage();

    await expect(shopPage.iphone_X_Card).toBeVisible();
    await expect(shopPage.Blackberry_Card).toBeVisible();

    await shopPage.addProductToCart("iphone X");
    await shopPage.addProductToCart("Blackberry");

    await expect(shopPage.Checkout_Button).toBeVisible();
    await expect(shopPage.Checkout_Button).toContainText("Checkout ( 2 )");

    await shopPage.Checkout_Button.click();


    // -------------------------
    // Checkout
    // -------------------------

    const checkoutPage = new CheckoutPage(page);

    await expect(checkoutPage.checkoutTable).toBeVisible();
    await expect(checkoutPage.total).toBeVisible();
    await expect(checkoutPage.continueShoppingButton).toBeVisible();
    await expect(checkoutPage.checkoutButton).toBeVisible();

    await checkoutPage.checkoutButton.click();


    // -------------------------
    // Delivery
    // -------------------------

    const deliveryPage = new DeliveryPage(page);

    await expect(deliveryPage.deliveryLocationLabel).toBeVisible();
    await expect(deliveryPage.deliveryLocationInput).toBeVisible();
    await expect(deliveryPage.termsAndConditionsLink).toBeVisible();
    await deliveryPage.enterDeliveryLocation("Amman-Jordan");  
    await deliveryPage.openTermsAndConditions();
    await expect(deliveryPage.termsAndConditionsModal).toBeVisible();
    await deliveryPage.closeTermsAndConditions();
    await deliveryPage.agreeToTerms();
    await expect(deliveryPage.agreeTermsCheckbox).toBeChecked();
});