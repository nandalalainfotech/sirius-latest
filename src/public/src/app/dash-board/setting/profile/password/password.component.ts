import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthManager } from 'src/app/shared/services/restcontroller/bizservice/auth-manager.service';
import { UserManager } from 'src/app/shared/services/restcontroller/bizservice/user.service';
import { Login001mb } from 'src/app/shared/services/restcontroller/entities/Login001mb';
import { CalloutService } from 'src/app/shared/services/services/callout.service';

@Component({
	selector: 'app-password',
	templateUrl: './password.component.html',
	styleUrls: ['./password.component.css']
})

export class PasswordComponent implements OnInit {
	pwdForm: FormGroup | any;
	submitted = false;
	user001mb: Login001mb = new Login001mb();
	username: string = "";
	password: string = "";
	inserteduser: string = "";
	inserteddatetime: Date | any;

	constructor(private userManager: UserManager, private authManager: AuthManager, private calloutService: CalloutService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.user001mb = this.authManager.getcurrentUser;
		this.pwdForm = this.formBuilder.group({
			username: [''],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
		this.f.username.value = this.user001mb.username;
	}

	get f() { return this.pwdForm.controls; }

	private markFormGroupTouched(formGroup: FormGroup) {
		(<any>Object).values(formGroup.controls).forEach((control: any) => {
			control.markAsTouched();
			if (control.controls) {
				this.markFormGroupTouched(control);
			}
		});
	}

	onPwdFormClick(pwdForm: any) {
		console.log("pwdForm", pwdForm);
		this.markFormGroupTouched(this.pwdForm);
		this.submitted = true;
		if (!this.pwdForm.invalid) {
			this.user001mb.password = this.f.password.value;
			this.user001mb.inserteduser = "inserteduser";
			this.user001mb.inserteddatetime = new Date();
			this.userManager.updatePassword(this.user001mb).subscribe((response: any) => {
				// console.log("response", response);
				
				if (response) {
					this.calloutService.showSuccess("New Password Updated Successfully");
					this.pwdForm.controls.password.reset();
				}
			});
		} else {
			this.calloutService.showError("Password Should Not Be Empty");
		}
	}

	onReset() {
		this.submitted = false;
		this.pwdForm.controls.password.reset();
	}
}
