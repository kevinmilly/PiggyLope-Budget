import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddAdjustmentComponent } from './ui/add-adjustment/add-adjustment.component';
import { EnvelopeComponent } from './ui/envelope/envelope.component';
import { AddTransactionComponent } from './ui/add-transaction/add-transaction.component';
import { AddEnvelopeComponent } from './ui/add-envelope/add-envelope.component';
import { SettingsComponent } from './ui/settings/settings.component';

@NgModule({
    declarations:[
        EnvelopeComponent,
        AddAdjustmentComponent,
        AddTransactionComponent, 
        AddEnvelopeComponent, 
        SettingsComponent
    ],
    imports:[SharedModule],
    exports:[EnvelopeComponent],
    entryComponents:[
        AddAdjustmentComponent,
        AddTransactionComponent,
        SettingsComponent
    ]
})
export class PresentationalModule {

}