import{ type Page} from "@playwright/test";

export class BasePage
{
    constructor(readonly page:Page){
    }
    async openHomePage():Promise<void>
        {
              await this.page.goto("https://rahulshettyacademy.com/angularpractice/");
        }
async openShopPage():Promise<void>
        {
              await this.page.goto("https://rahulshettyacademy.com/angularpractice/shop");
        }
}


