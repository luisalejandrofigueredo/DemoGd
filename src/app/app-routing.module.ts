import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoObjectsComponent } from "./demo-objects/demo-objects.component";
import { DemoCandelChartsComponent } from "./demo-candel-charts/demo-candel-charts.component";
import { PieChartComponent } from "./pie-chart/pie-chart.component";
const routes: Routes = [
  { component: DemoObjectsComponent, path: 'demoObjects' },
  { component:DemoCandelChartsComponent,path: 'candleCharts'},
  { component:PieChartComponent, path:'pieChart'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
