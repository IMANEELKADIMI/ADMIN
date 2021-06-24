import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from '../model/admin';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css']
})
export class UpdateFormComponent implements OnInit {
  id: number;
  admin: Admin;
  adminForm: FormGroup;

  

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
  get password() {
    return this.adminForm.get('password');
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

  ngOnInit(): void {
    this.adminForm = new FormGroup({
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

    this.id = this.route.snapshot.params['id'];
    this.adminService.findOne(this.id).subscribe(
      (data) => {
        this.admin = data;
        this.nom.setValue(this.admin.nom);
        this.prenom.setValue(this.admin.prenom);
        this.cin.setValue(this.admin.cin);
        this.adresse.setValue(this.admin.adresse);
        this.tel.setValue(this.admin.tel);
        this.username.setValue(this.admin.username);
        this.email.setValue(this.admin.email);
        this.password.setValue(this.admin.password);
        this.dateNaissance.setValue(this.admin.dateNaissance);
      },
      (error) => console.log(error)
      
    );

  }

  onSubmit() {
    this.admin = this.adminForm.value;
    console.log(this.admin);
    this.adminService
      .update(this.id,this.admin)
      .subscribe((result) => this.afficheAdminList());
  }

  afficheAdminList() {
    this.router.navigate(['/overview//adminList']);
  }

  reset() {
    this.adminForm.reset();
  }
}
