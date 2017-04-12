import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = AboutPage;

  constructor() {

  }
}
