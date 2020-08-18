import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableDataDTO } from 'src/app/models/tableDataDTO.model';
import { TableDataService } from 'src/app/services/table-data.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public form = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    surname: new FormControl(null, [Validators.required])
  })
  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    private tableDataService: TableDataService,
    @Inject(MAT_DIALOG_DATA) public data: TableDataDTO 
  ) { }

  public onNoClick(): void {
    this.dialogRef.close();
  }
  public onSave(): void {
    this.tableDataService.updateTableRow({
      ...this.data.user,
      ...this.form.value
    });
    this.dialogRef.close();
  }
  public onLangRemove(langIndex): void {
    this.data.user.languages.splice(langIndex, 1);
  }
  ngOnInit() {
    this.form.patchValue(this.data.user);
  }
}
