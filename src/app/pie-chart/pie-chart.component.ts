import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { LineObject, NgGdService } from 'ng-gd';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  gd = inject(NgGdService);
  move: boolean=false;
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.gd.start(800, 600);
    this.gd.setDarkMode();
    this.gd.clearObjects();
    // map function sample  percentage to grade
    const one = this.gd.map(25, 0, 100, 0, 360);
    const two = this.gd.map(25, 0, 100, 0, 360);
    const three = this.gd.map(50, 0, 100, 0, 360);
    this.gd.addPieChart(
      this.ctx,
      { x: 200, y: 200 },
      100,
      [one, two, three],
      ['#ff0000', '#0000ff', '#00ff00'],
      5,
      0,
      ['one', 'two', 'three']
    );
    this.gd.findLabelByText('one').color = '#ff0000';
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }

  @HostListener('mousewheel', ['$event'])
  zoomWheel(event: WheelEvent) {
    event.preventDefault();
    const mouse = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    this.gd.zoomInPoint(this.ctx, mouse.x, mouse.y, zoom);
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }

  @HostListener('mouseup', ['$event'])
  async onMouseUp(event: MouseEvent) {
    if (this.move === true) {
      this.gd.resetMouse();
      this.gd.clear(this.ctx);
      this.gd.draw(this.ctx);
      this.move = false;
    }
  }

  @HostListener('mousedown', ['$event'])
  async onMouseDown(event: MouseEvent) {
    if (this.gd.click(this.ctx, event).length > 0) {
      this.move = true;
    }
  }

  @HostListener('mousemove', ['$event'])
  async onMouseMove(event: MouseEvent) {
    if (this.move === true) {
      this.gd.getClicks().forEach((element) => {
        if (!(element.shape instanceof LineObject)) {
          element.shape.inverseShape(this.ctx);
          element.shape.moveMouse(this.ctx, event);
          element.shape.drawShape(this.ctx);
        } else {
          if (element.action === 'inPointXY') {
            element.shape.inverseShape(this.ctx);
            (element.shape as LineObject).moveMouseXY(this.ctx, event);
            element.shape.drawShape(this.ctx);
          }
          if (element.action === 'inPointToXY') {
            element.shape.inverseShape(this.ctx);
            (element.shape as LineObject).moveMouseToXY(this.ctx, event);
            element.shape.drawShape(this.ctx);
          }
          if (element.action === 'inRectangle') {
            element.shape.inverseShape(this.ctx);
            (element.shape as LineObject).moveMouse(this.ctx, event);
            element.shape.drawShape(this.ctx);
          }
        }
      });
    }
  }

}
