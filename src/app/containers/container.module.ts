import { LayoutModule } from '../layout/layout.module';
import { NgModule } from '@angular/core';
import { PresentationalModule } from '../presentational/presentational.module';
import { SharedModule } from '../shared/shared.module';
import { MainContainerComponent } from './main-container/main-container.component';


@NgModule({
    declarations:[MainContainerComponent],
    imports: [
        SharedModule,
        PresentationalModule,
        LayoutModule
    ],
    exports: [MainContainerComponent]
})
export class ContainerModule {}