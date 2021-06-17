import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { HelloPipe } from './hello.pipe';
import { CustomCurrencyPipe } from './custom-currency.pipe';
import { PermissionsPipe } from './permissions.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HelloPipe,
    CustomCurrencyPipe,
    PermissionsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
