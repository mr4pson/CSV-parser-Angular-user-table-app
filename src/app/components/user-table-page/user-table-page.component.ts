import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TableData } from '../../models/table-data.model';
import { User } from '../../models/user.model';
import { TableDataService } from '../../services/table-data.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-table-page',
  templateUrl: './user-table-page.component.html',
  styleUrls: ['./user-table-page.component.scss']
})
export class UserTablePageComponent implements OnInit, OnDestroy {
  public tableHeaders: string[] = [];
  public tableData: TableData;
  private subscription: Subscription;
  constructor(
    private tableDataService: TableDataService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }
  public onUserRemove(user: User): void {
    this.tableDataService.removeTableRow(user);
  }
  public onUserEdit(user: User): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '450px',
      data: { user: user, controlNames: this.tableHeaders, headers: this.tableHeaders }
    });
  }
  public drop(event: CdkDragDrop<string[]>) {
    const tableDataNew = [...this.tableData.values];
    moveItemInArray(tableDataNew, event.previousIndex, event.currentIndex);
    this.tableData.values = tableDataNew;
  }
  public trackByFn(index, item) {
    return index;
  }
  ngOnInit() {
    this.subscription = this.tableDataService.getTableData().subscribe((tableData: TableData) => {
      this.tableData = JSON.parse(JSON.stringify(tableData)) as TableData;
      this.tableHeaders = this.tableDataService.getTableHeaderControls();
      this.cdr.detectChanges();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
