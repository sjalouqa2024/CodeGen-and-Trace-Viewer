import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
export class DeliveryPage extends BasePage {

    public readonly deliveryLocationLabel: Locator;
    public readonly deliveryLocationClickOnPurachuseLabel: Locator;
    public readonly deliveryLocationInput: Locator;
    public readonly termsAndConditionsLink: Locator;
    public readonly termsAndConditionsModal: Locator;
    public readonly agreeTermsCheckbox: Locator;
    public readonly purchaseButton: Locator;
    public readonly closeTermsButton: Locator;
    public readonly purchaseSuccessMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.deliveryLocationLabel = page.getByText("Please choose your delivery location.");
        this.deliveryLocationClickOnPurachuseLabel = page.getByLabel("Then click on purchase button");
        this.deliveryLocationInput = page.locator("#country");
        this.termsAndConditionsLink = page.getByText("term & Conditions");
        this.termsAndConditionsModal = page.locator("ngx-smart-modal").filter({ hasText: "Terms And Conditions" });
        this.agreeTermsCheckbox = page.locator("#checkbox2");
        this.purchaseButton = page.getByRole("button", {name: "Purchase"});
        this.closeTermsButton = this.termsAndConditionsModal.locator("button.btn.btn-info");
        this.purchaseSuccessMessage = page.getByText("Success! Thank you! Your order will be delivered in next few weeks :-).");}

    async enterDeliveryLocation(location: string) {
        await this.deliveryLocationInput.fill(location);
    }

    async agreeToTerms() {
        await this.agreeTermsCheckbox.check();
    }

    async openTermsAndConditions() {
        await this.termsAndConditionsLink.click();
    }

    async closeTermsAndConditions() {
        await this.closeTermsButton.click();
    }
    async purchase() {
        await this.purchaseButton.click();
    }
     
    }