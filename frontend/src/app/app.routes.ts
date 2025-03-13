import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterOwnerComponent } from './components/propietarios/register-owner/register-owner.component';
import { AuthGuard } from './auth.guard';
import { ShowOwnerComponent } from './components/propietarios/show-owner/show-owner.component';
import { CreateDriverComponent } from './components/conductores/create-driver/create-driver.component';
import { IndexDriverComponent } from './components/conductores/index-driver/index-driver.component';
import { VehicleComponent } from './components/vehiculos/vehicle/vehicle.component';
import { VehiclesViewComponent } from './components/vehiculos/vehicles-view/vehicles-view.component';
import { EditOwnerComponent } from './components/propietarios/edit-owner/edit-owner.component';
import { EditDriverComponent } from './components/conductores/edit-driver/edit-driver.component';
import { EditVehicleComponent } from './components/vehiculos/edit-vehicle/edit-vehicle.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rutas protegidas
  { path: 'propietarios/create', component: RegisterOwnerComponent, canActivate: [AuthGuard] },
  { path: 'propietarios/edit/:cedula', component: EditOwnerComponent, canActivate: [AuthGuard] },
  { path: 'propietarios', component: ShowOwnerComponent, canActivate: [AuthGuard] },
  { path: 'conductor/create', component: CreateDriverComponent, canActivate: [AuthGuard] },
  { path: 'conductor/edit/:cedula', component: EditDriverComponent, canActivate: [AuthGuard] },
  { path: 'conductores', component: IndexDriverComponent, canActivate: [AuthGuard] },
  { path: 'vehiculos/create', component: VehicleComponent, canActivate: [AuthGuard] },
  { path: 'vehiculos/edit/:placa', component: EditVehicleComponent, canActivate: [AuthGuard] },
  { path: 'vehiculos', component: VehiclesViewComponent, canActivate: [AuthGuard] },

  // Redirige cualquier ruta no existente al login
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];