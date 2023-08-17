import { Routes, RouterModule } from '@angular/router';
import { TableListComponent } from './table-list.component';
import { FinanceResolver } from '../../dashboards/finance/finance.resolvers';
import { FormComponent } from '../form/form.component';

const routes: Routes = [
  {
    path: '',
    component: TableListComponent,
    resolve: {
      data: FinanceResolver
    }
  },
  {
    path: 'form',
    component: FormComponent
  }
];

export const TableListRoutes = RouterModule.forChild(routes);
