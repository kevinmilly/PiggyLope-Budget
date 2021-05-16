import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BackendService } from "./services/backend.service";
import { MaterialModule } from "./modules/material.module";
import { SharedButtonComponent } from './components/shared-button/shared-button.component';
import { BudgetService } from "./services/budget.service";




@NgModule({
    declarations:[SharedButtonComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
    ],
    providers:[BackendService, BudgetService],
    exports:[
        CommonModule,
        SharedButtonComponent, 
        MaterialModule, 
        FormsModule, 
        ReactiveFormsModule
    ]
})
export class SharedModule {

}