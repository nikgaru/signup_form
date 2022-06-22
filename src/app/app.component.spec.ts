import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'
import { BrowserModule, By } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBarModule } from '@angular/material/snack-bar'

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it('should have input with name password', () => {
    const el = fixture.debugElement.query(By.css('#passwordInput'));
    expect(el).toBeTruthy();
    expect(el.nativeElement.getAttribute('type')).toEqual('password');
    expect(el.nativeElement.getAttribute('name')).toEqual('password');
    expect(el.nativeElement.getAttribute('formControlName')).toEqual('password');
  })

  it('should bind password with it`s form control', () => {
    const el = fixture.debugElement.query(By.css('#passwordInput'));
    const formControl = component.form.controls.password;
    const passwordValue = 'AaaaAaaa';
    formControl?.setValue(passwordValue);
    fixture.detectChanges();
    expect(el.nativeElement.value).toEqual(passwordValue);
  })

  it('should throw required error when password is empty', () => {
    const formControl = component.form.controls.password;
    const passwordValue = '';
    formControl?.setValue(passwordValue);
    fixture.detectChanges();

    expect(formControl?.invalid).toBeTruthy()
  })

  it('should not throw required error when password has Value', () => {
    const formControl = component.form.controls.password;
    const passwordValue = 'AaaaAaaa';
    formControl?.setValue(passwordValue);
    fixture.detectChanges();

    expect(formControl.errors?.['required']).toBeUndefined()
  })

  it('form invalid test when form is valid', () => {
    const formValues = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'AaaaAaaa',
      repeatPassword: 'AaaaAaaa',
    };
    component.form.patchValue(formValues);
    fixture.detectChanges();

    expect(component.form.invalid).toBeFalsy();
  })

  it('form invalid test when form is invalid', () => {
    const formValues = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'AaaaAaaa',
      repeatPassword: '',
    };
    component.form.patchValue(formValues);
    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();
  })
})
