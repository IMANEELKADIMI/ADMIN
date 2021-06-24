import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Agent } from '../model/agent';
import { AgentService } from '../service/agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css'],
})
export class AgentListComponent implements OnInit {
  AGENTS!: Agent[];
  id: string;
  dataSource = new MatTableDataSource<Agent>(this.AGENTS);
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
    'dateNaissance',
    'adresse',
    'tel',
    'agence',
    'actions',
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private route: Router,
    private agentService: AgentService
  ) {}

  deleteAgent(id: number) {
    this.agentService.delete(id).subscribe(
      (data) => {
        console.log(data);

        this.agentService.findAllAgents(this.id).subscribe(
          (data) => {
            this.AGENTS = data;
            this.dataSource = new MatTableDataSource<Agent>(this.AGENTS);
            this.dataSource.paginator = this.paginator;
          },
          (error) => {
            this.dataSource = new MatTableDataSource<Agent>(null);
          }
        );
      },
      (error) => console.log(error)
    );
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.agentService.findAllAgents(this.id).subscribe(
      (data) => {
        this.AGENTS = data;
        this.dataSource = new MatTableDataSource<Agent>(this.AGENTS);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        this.dataSource = new MatTableDataSource<Agent>(null);
      }
    );
  }
  goToForm() {
    this.route.navigate(['/overview/agency/' + this.id + '/agentForm']);
  }
  goToAgents(id2: string) {
    this.route.navigate(['/overview/agency/' + this.id + '/agents/' + id2]);
  }
  openDialog(code: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        message: "Voulez vous supprimer l'agent " + code + '?',
        codeSupp: code,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteAgent(result.data.codeSupp);
      }
    });
  }
}
