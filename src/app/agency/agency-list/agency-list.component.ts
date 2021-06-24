import { Component, OnInit, ViewChild } from '@angular/core';
import { Agency } from '../model/agency';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AgencyService } from '../service/agency.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css'],
})
export class AgencyListComponent implements OnInit {
  AGENCIES!: Agency[];

  dataSource = new MatTableDataSource<Agency>(this.AGENCIES);
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayedColumns: string[] = [
    'id',
    'nom',
    'email',
    'ville',
    'adresse',
    'telephone',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private agencyService: AgencyService,
    private route: Router,
    public dialog: MatDialog
  ) {}
  deleteAgency(id: string) {
    this.agencyService.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.agencyService.findAll().subscribe(
          (data) => {
            this.AGENCIES = data;
            this.dataSource = new MatTableDataSource<Agency>(this.AGENCIES);
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Agency>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {
    this.agencyService.findAll().subscribe(
      (data) => {
        this.AGENCIES = data;

        this.dataSource = new MatTableDataSource<Agency>(this.AGENCIES);
      },
      (error) => {
        this.dataSource = new MatTableDataSource<Agency>(null);
      }
    );

    this.dataSource.paginator = this.paginator;
  }

  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'agence " + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAgency(result.data.codeSupp);
      }
    });
  }
  goToAgencyItem(code: string) {
    this.route.navigate(['/overview//agencyItem/' + code]);
  }
}
