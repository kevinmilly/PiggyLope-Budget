import { LayoutModule } from "../layout/layout.module";
import { NgModule } from "@angular/core";
import { PresentationalModule } from "../presentational/presentational.module";
import { SharedModule } from "../shared/shared.module";
import { MainContainerComponent } from "./containers/main-container/main-container.component";
import { CoreRoutingModule } from "./core-routing.module";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from "./containers/login/login.component";
import { BdcWalkModule } from "bdc-walkthrough";


@NgModule({
    declarations:[MainContainerComponent, LoginComponent],
    imports:[   
        SharedModule,
        PresentationalModule,
        LayoutModule,
        CoreRoutingModule,
        BdcWalkModule

    ],
    entryComponents:[],
    providers:[AuthService]
})
export class CoreModule {

}