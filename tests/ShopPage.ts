
import{ type Locator,type Page} from "@playwright/test";
import { BasePage } from "./basePage.ts";

export class ShopPage extends BasePage {
public readonly shopHeader: Locator;
public readonly shopName: Locator;
public readonly Category_1: Locator;
public readonly Category_2: Locator;
public readonly Category_3: Locator;
public readonly Third_slide: Locator;
public readonly iphone_X_Card: Locator;
public readonly Samsung_Note_8_Card: Locator;
public readonly Nokia_Edge_Card: Locator;
public readonly Blackberry_Card : Locator;
public readonly Checkout_Button: Locator;
    constructor (page:Page)
    {
        super(page);
        this.shopHeader = page.getByRole("link", { name: "ProtoCommerce Home" });
        this.shopName = page.getByRole("heading", { name: "Shop Name" });
        this.Category_1 = page.getByRole("link", { name: "Category 1" });
        this.Category_2 = page.getByRole("link", { name: "Category 2" });
        this.Category_3 = page.getByRole("link", { name: "Category 3" });
        this.Third_slide = page.getByRole("img", { name: "Third slide" });
        this.Nokia_Edge_Card = page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole("button", { name: "Add" });
        this.Samsung_Note_8_Card = page.locator("app-card").filter({ hasText: "Samsung Note 8" }).getByRole("button", { name: "Add" });
        this.iphone_X_Card = page.locator("app-card").filter({ hasText: "iphone X" }).getByRole("button", { name: "Add" });
        this.Blackberry_Card = page.locator("app-card").filter({ hasText: "Blackberry" }).getByRole("button", { name: "Add" });
        this.Checkout_Button = page.locator("a.nav-link.btn.btn-primary");
    }
    override async openShopPage() :Promise<void>
    {
        await super.openShopPage();
        await this.shopHeader.waitFor();
        await this.shopName.waitFor();
        await this.Category_1.waitFor();
        await this.Category_2.waitFor();
        await this.Category_3.waitFor();
        await this.Third_slide.waitFor();
        await this.Nokia_Edge_Card.waitFor();
        await this.Samsung_Note_8_Card.waitFor();
        await this.iphone_X_Card.waitFor();
        await this.Blackberry_Card.waitFor();
    }
    
     async addProductToCart(productName: string) {
        await this.page
            .locator("app-card")
            .filter({ hasText: productName })
            .getByRole("button", { name: "Add" })
            .click();
    }
}
