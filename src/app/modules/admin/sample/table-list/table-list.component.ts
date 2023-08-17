import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { FinanceService } from '../../dashboards/finance/finance.service';
import { InventoryPagination } from './inventory.types';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('recentTransactionsTable', { read: MatSort }) recentTransactionsTableMatSort: MatSort;

  data: any;
  isLoading: boolean = false;
  pagination: InventoryPagination;
  recentTransactionsDataSource: MatTableDataSource<any> = new MatTableDataSource();
  recentTransactionsTableColumns: string[] = ['transactionId', 'date', 'name', 'amount', 'status'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  /**
    * Constructor
    */
  constructor(private _financeService: FinanceService) {
  }

  ngOnInit(): void {
    // Get the data
    this._financeService.data$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {

        // Store the data
        this.data = data;

        // Store the table data
        this.recentTransactionsDataSource.data = data.recentTransactions;

        this.pagination.length =  this.recentTransactionsDataSource.data.length;
        this.pagination.page = 1;
        this.pagination.size = this.recentTransactionsDataSource.data.length;

      });
  }


  /**
   * After view init
   */
  ngAfterViewInit(): void {
    // Make the data source sortable
    this.recentTransactionsDataSource.sort = this.recentTransactionsTableMatSort;
  }


  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  /**
 * Track by function for ngFor loops
 *
 * @param index
 * @param item
 */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
