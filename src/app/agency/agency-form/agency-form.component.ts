import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AgencyService } from '../service/agency.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Agency } from '../model/agency';

@Component({
  selector: 'app-agency-form',
  templateUrl: './agency-form.component.html',
  styleUrls: ['./agency-form.component.css'],
})
export class AgencyFormComponent implements OnInit {
  agency: Agency;
  agencyForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required) ,
    tel: new FormControl('', Validators.required),
    ville: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  get nom() {
    return this.agencyForm.get('nom');
  }

  get adresse() {
    return this.agencyForm.get('adresse');
  }
  get tel() {
    return this.agencyForm.get('tel');
  }

  get ville() {
    return this.agencyForm.get('ville');
  }

  get email() {
    return this.agencyForm.get('email');
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agencyService: AgencyService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.agency = this.agencyForm.value;
    
    this.agencyService
      .save(this.agency)
      .subscribe((result) => this.gotoAgentList());
  }

  gotoAgentList() {
    this.router.navigate(['/overview//agencyList']);
  }

  reset() {
    this.agencyForm.reset();
  }
}
