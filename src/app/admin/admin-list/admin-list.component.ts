import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Admin } from '../model/admin';
import { AdminService } from '../service/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
})
export class AdminListComponent implements OnInit {
  ADMINS!: Admin[];

  dataSource = new MatTableDataSource<Admin>(this.ADMINS);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'id',
    'username',
    'nom',
    'prenom',
    'email',
    'cin',
    'adresse',
    'telephone',
    'dateNaissance',
    'actions',
    'action1',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  deleteAdmin(id: number) {
    this.adminService.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.adminService.findAll().subscribe(
          (data) => {
            this.ADMINS = data;
            this.dataSource = new MatTableDataSource<Admin>(this.ADMINS);
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Admin>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

 

  ngOnInit(): void {
    this.adminService.findAll().subscribe(
      (data) => {
        this.ADMINS = data;
        this.dataSource = new MatTableDataSource<Admin>(this.ADMINS);
      },
      (error) => {
        this.dataSource = new MatTableDataSource<Admin>(null);
      }
    );

    this.dataSource.paginator = this.paginator;
  }
  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'admin " + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAdmin(result.data.codeSupp);
      }
    });
  }
}
