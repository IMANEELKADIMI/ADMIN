import { Component, OnInit } from '@angular/core';
import { Admin } from '../model/admin';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
})
export class AdminFormComponent implements OnInit {
  admin: Admin;
  admins: Admin[];
  adminForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    cin: new FormControl('', Validators.required),
    adresse: new FormControl('', Validators.required),
    tel: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    dateNaissance: new FormControl(Date, Validators.required),
  });

  get prenom() {
    return this.adminForm.get('prenom');
  }

  get nom() {
    return this.adminForm.get('nom');
  }

  get cin() {
    return this.adminForm.get('cin');
  }

  get adresse() {
    return this.adminForm.get('adresse');
  }
  get tel() {
    return this.adminForm.get('tel');
  }

  get username() {
    return this.adminForm.get('username');
  }

  get email() {
    return this.adminForm.get('email');
  }
  get dateNaissance() {
    return this.adminForm.get('dateNaissance');
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.admin = this.adminForm.value;
    console.log(this.admin);
    this.adminService
      .save(this.admin)
      .subscribe((result) => this.afficheAdminList());
  }

  afficheAdminList() {
    this.router.navigate(['/overview//adminList']);
  }

  reset() {
    this.adminForm.reset();
  }
}
