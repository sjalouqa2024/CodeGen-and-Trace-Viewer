import{ type Page} from "@playwright/test";

export class BasePage
{
    constructor(readonly page:Page){
    }
    //open home page
    async openHomePage():Promise<void>
        {
              await this.page.goto("https://rahulshettyacademy.com/angularpractice/");
        }
        // open shop page
async openShopPage():Promise<void>
        {
              await this.page.goto("https://rahulshettyacademy.com/angularpractice/shop");
        }
}


