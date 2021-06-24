import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../service/agent.service';
import { AgencyService } from 'src/app/agency/service/agency.service';
import { Agent } from '../model/agent';
import { Agency } from 'src/app/agency/model/agency';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agent-item',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.css'],
})
export class AgentItemComponent implements OnInit {
  agent: Agent;
  agencies: Agency[];
  id: string;
  id2: string;
  agentForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    dateNaissance: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    agence: new FormControl('', Validators.required),
    password: new FormControl('', Validators.nullValidator),
  });

  get prenom() {
    return this.agentForm.get('prenom');
  }

  get nom() {
    return this.agentForm.get('nom');
  }

  get cin() {
    return this.agentForm.get('cin');
  }

  get adresse() {
    return this.agentForm.get('adresse');
  }
  get tel() {
    return this.agentForm.get('tel');
  }

  get username() {
    return this.agentForm.get('username');
  }

  get email() {
    return this.agentForm.get('email');
  }

  get agence() {
    return this.agentForm.get('agence');
  }
  get password() {
    return this.agentForm.get('password');
  }
  get dateNaissance() {
    return this.agentForm.get('dateNaissance');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.id2 = this.route.snapshot.params['id2'];
    this.agencyService.findAgency(this.id).subscribe((data) => {
      this.agencies = data;
    });
    this.agentService.findAgent(this.id2).subscribe(
      (data) => {
        this.agent = data[0];
        this.adresse.setValue(this.agent.adresse);
        this.nom.setValue(this.agent.nom);
        this.tel.setValue(this.agent.tel);
        this.prenom.setValue(this.agent.prenom);
        this.email.setValue(this.agent.email);
        this.username.setValue(this.agent.username);
        this.cin.setValue(this.agent.cin);
        this.agence.setValue(this.agent.agence);
        this.dateNaissance.setValue(this.agent.dateNaissance);
      },
      (error) => console.log(error)
    );
  }

  onSubmit() {
    this.agent = this.agentForm.value;
    this.agentService
      .update(this.id2, this.agent)
      .subscribe((result) => this.gotoAgentList());
  }

  gotoAgentList() {
    this.router.navigate(['/overview/agency/' + this.id + '/agentList']);
  }

  reset() {
    this.agentForm.reset();
  }

  goBack() {
    this.router.navigate(['agency/' + this.id + '/agentList']);
  }
}
