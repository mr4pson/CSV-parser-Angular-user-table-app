import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { TableData } from '../models/table-data.model';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class TableDataService implements OnDestroy {
    public tableDataSubscription: Subscription; 
    private tableData: BehaviorSubject<TableData> = new BehaviorSubject(null);
    constructor(private http: HttpClient) {
        this.tableDataSubscription = this.http.get(environment.endpoint + '/parse/data').subscribe((response: TableData) => {
            this.tableData.next(response);
        });
    }
    public getTableData(): Observable<TableData> {
        return this.tableData.asObservable();
    }
    public getTableHeaderControls(): string[] {
        const tableHeaders: string[] = [];
        if (this.tableData.getValue() && this.tableData.getValue().values.length > 0) {
            Object.keys(this.tableData.getValue().values[0]).forEach((key: string) => {
                tableHeaders.push(key);
            })
        }
        return tableHeaders;
    }
    public removeTableRow(user: User): void {
        if (confirm(`Вы действительно хотите удалить пользователя ${user.name} ${user.surname}?`)) {
            this.tableData.getValue().values = this.tableData.getValue().values.filter((arrUser: User) => arrUser.id !== user.id);
        }
    }
    public updateTableRow(editingUser: User): void {
        const index = this.tableData.getValue().values.findIndex((user: User) => editingUser.id === user.id);
        const tableData = this.tableData.getValue();
        tableData.values[index] = editingUser;
        this.tableData.next(tableData);
    }
    ngOnDestroy() {
        this.tableDataSubscription.unsubscribe();
    }
}
