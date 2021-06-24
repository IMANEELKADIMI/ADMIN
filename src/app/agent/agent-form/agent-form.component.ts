import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgentService } from '../service/agent.service';
import { Agent } from '../model/agent';
import { Agency } from 'src/app/agency/model/agency';
import { AgencyService } from 'src/app/agency/service/agency.service';

@Component({
  selector: 'app-agent-form',
  templateUrl: './agent-form.component.html',
  styleUrls: ['./agent-form.component.css'],
})
export class AgentFormComponent implements OnInit {
  agent: Agent;
  agencies:Agency[];
  id: string;
  agentForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    dateNaissance: new FormControl('', Validators.required),
    agence: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
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
  
  get dateNaissance() {
    return this.agentForm.get('dateNaissance');
  }

  get agence() {
    return this.agentForm.get('agence');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private agencyService: AgencyService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.agencyService.findAgency(this.id).subscribe((data) => {
      this.agencies = data;
      console.log(this.agencies);
      //this.agencies = Array.of(this.agencies);

      
      
    });
  }

  onSubmit() {
    this.agent = this.agentForm.value;
    this.agentService
      .save(this.agent)
      .subscribe((result) => this.gotoAgentList());
  }

  gotoAgentList() {
    this.router.navigate(['/overview/agency/' + this.id + '/agentList']);
  }

  reset() {
    this.agentForm.reset();
  }

  goBack() {
    console.log('paponi');
    this.router.navigate(['/overview/agency/' + this.id + '/agentList']);
  }
}
