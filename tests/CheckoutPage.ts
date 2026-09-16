import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {
  public readonly checkoutTable: Locator;
    public readonly total: Locator;
    public readonly continueShoppingButton: Locator;
    public readonly checkoutButton: Locator;
    constructor (page:Page)
    {
        super(page);
        this.checkoutTable = page.locator("table");
        this.total = page.locator("tbody tr").filter({ hasText: "Total" }).locator("h3 strong");
        this.continueShoppingButton = page.getByRole("button", { name: "Continue Shopping" });
        this.checkoutButton = page.getByRole("button", { name: "Checkout" });
    }
    override async openShopPage() :Promise<void>
    {
        await super.openShopPage();
        await this.checkoutTable.waitFor();
        await this.total.waitFor();
        await this.continueShoppingButton.waitFor();
        await this.checkoutButton.waitFor();
    }
     
    }