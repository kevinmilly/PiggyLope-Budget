import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';

import {MatMenuModule} from '@angular/material/menu';

import {MatStepperModule} from '@angular/material/stepper';

const modules = [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule, 
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatMenuModule,
    MatStepperModule
]

@NgModule({
    declarations:[],
    imports:[ modules ],
    exports:[ modules ]
})
export class MaterialModule {
    
}