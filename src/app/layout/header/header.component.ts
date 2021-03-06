import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { SettingsComponent } from 'src/app/presentational/ui/settings/settings.component';
import { EnvelopeBudget } from 'src/app/shared/models/envelope-budget.model';
import { IncomeBalance } from 'src/app/shared/models/income-balance.model';
import { Settings } from 'src/app/shared/models/settings.model';
import { BackendService } from 'src/app/shared/services/backend.service';
import { income } from 'src/app/shared/services/test-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() income: IncomeBalance;
  @Input() envs: EnvelopeBudget[];
  @Input() settings: Settings;


  constructor(
    private backendService: BackendService,
    public dialog: MatDialog,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    console.dir(this.settings);

  }

  launchSettings() {
    let dialogRef = this.dialog.open(SettingsComponent, {
      width: '25rem',
      data: {
        income: this.income,
        envelopes: this.envs,
        settings: this.settings

      }
    });

    dialogRef.afterClosed().subscribe(changes => {
      const [inc, settings, envelopes] = changes;

      this.settings = settings;

      if (inc) { this.backendService.updateIncomeBalance(inc) };
      if (this.settings) {
        this.backendService.updateSettings(this.settings);
      }
      this.backendService.updateEnvelopes(envelopes);
    });
  }

  resetLevels() {
    if (confirm("Are you sure you want to clear EVERY balance?")) {
      this.backendService.resetEnvelopeandAllocation(this.envs, this.income);
    }
  }

  resetMemory() {
    console.log("reset memory");
    if (confirm("Are you sure you want to reset everything?")) {
      this.envs.forEach( env => env.balance = env.default);
      this.income.unallocated = this.settings.payCheck;
      this.income.allocated = 0;

      this.backendService.updateIncomeBalance(this.income)
      this.backendService.updateEnvelopes(this.envs);
    }
  }

  logout() { this.auth.signOut() }

}
