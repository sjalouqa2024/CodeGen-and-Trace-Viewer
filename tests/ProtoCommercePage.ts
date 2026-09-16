
import{ type Locator,type Page} from "@playwright/test";
import { BasePage } from "./basePage.ts";

export class ProtoCommercePage extends BasePage {
public readonly Name: Locator;
public readonly Email: Locator;
public readonly password: Locator;
public readonly IceCreams: Locator;
public readonly Gender: Locator;
public readonly Student: Locator;
public readonly Employed: Locator;
public readonly Entrepreneur: Locator;
public readonly two_way_data_binding: Locator;
public readonly submit : Locator;
public readonly success_message: Locator;
    constructor (page:Page)
    {
        super(page);
        this.Name = page.locator('input[name="name"]').first();
        this.Email = page.locator('input[name="email"]');
        this.password = page.locator('input[type="password"]');
        this.IceCreams = page.locator("#exampleCheck1");
        this.Gender = page.getByRole("combobox", { name: "Gender" });
        this.Student = page.getByLabel("Student");
        this.Employed = page.getByLabel("Employed");
        this.Entrepreneur = page.getByLabel("Entrepreneur (disabled)");
        this.two_way_data_binding = page.locator('input[name="name"]').nth(1);
        this.submit = page.locator('input[type="submit"][value="Submit"]');
        this.success_message = page.getByText("Success! The Form has been submitted successfully!.");
    }
    override async openHomePage() :Promise<void>
    {
        await super.openHomePage();
        await this.Name.waitFor();
        await this.Email.waitFor();
        await this.password.waitFor();
        await this.IceCreams.waitFor();
        await this.Gender.waitFor();
        await this.Student.waitFor();
        await this.Employed.waitFor();
        await this.Entrepreneur.waitFor();
        await this.two_way_data_binding.waitFor();
        await this.submit.waitFor();

    }
async submitData():Promise<void>{
    await this.Name.fill("user1");
    await this.Email.fill("user1@email.com");
    await this.password.fill("P@ssw0rd@123");
    await this.IceCreams.check();
    await this.Gender.selectOption("Female");
    await this.Employed.check();
    await this.submit.click();
}
}