import { Component, Input, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { SettingsComponent } from 'src/app/presentational/ui/settings/settings.component';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';
import { IncomeBalance } from 'src/app/shared/models/income-balance.model';
import { BackendService } from 'src/app/shared/services/backend.service';
import { income } from 'src/app/shared/services/test-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() income:IncomeBalance;
  @Input() envs:EnvelopeBudget[];


  constructor(
    private backendService:BackendService,
    public dialog: MatDialog,
    private auth:AuthService
  ) { }

  ngOnInit(): void {

  }

  launchSettings() {
    let dialogRef = this.dialog.open(SettingsComponent, {
      height: '30rem',
      width: '20rem',
      data: this.income
    });

    dialogRef.afterClosed().subscribe(settings => {
      const [inc] = settings;
     

      if(inc) {
        this.backendService.updateIncomeBalance(inc);
      }
    });
  }

  resetLevels() {
    if(confirm("Are you sure you want to reset everything?",)) {
      this.backendService.resetEnvelopeandAllocation(this.envs,this.income);
    }
  }

  logout() { this.auth.logout()}

}
