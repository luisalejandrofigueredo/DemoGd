import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoObjectsComponent } from "./demo-objects/demo-objects.component";
import { DemoCandelChartsComponent } from "./demo-candel-charts/demo-candel-charts.component";
const routes: Routes = [
  { component: DemoObjectsComponent, path: 'demoObjects' },
  { component:DemoCandelChartsComponent,path: 'candleCharts'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
