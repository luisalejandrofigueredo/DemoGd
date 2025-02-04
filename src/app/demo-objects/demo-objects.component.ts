import { Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import {
  NgGdService,
  Point,
  NodeObject,
  ConnectionObject,
  LineObject,
} from 'ng-gd';
@Component({
    selector: 'app-demo-objects',
    templateUrl: './demo-objects.component.html',
    styleUrls: ['./demo-objects.component.scss'],
    standalone: false
})
export class DemoObjectsComponent implements OnInit {
  gd = inject(NgGdService);
  move=false;
  drag=false;
  private ctx!: CanvasRenderingContext2D;
  dragStartPosition: Point={x:0,y:0};
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.gd.start(640,480);
    this.gd.setDarkMode();
    this.gd.clearObjects();
    this.gd.addNode({ x: 50, y: 50 }, "two", "two", false, 10, 10);
    this.gd.addConnection({ x: 150, y: 150 }, { x: 50, y: 50 }, "#ff0000")
    this.gd.addLabel({ x: 200, y: 200 } as Point, "Hola Mundo", 20, 270);
    this.gd.addRectangle({ x: 100, y: 100 }, 50, 50, 10, "#0000ff", "#ff0000");
    this.gd.addCircle({ x: 250, y: 250 }, 10, "#00ff00", "#ff0000");
    this.gd.addTriangle({ x: 140, y: 140 }, { x: 100, y: 110 }, { x: 120, y: 120 }, "#00ff00", "#0000ff");
    this.gd.addMultiplesSides({ x: 320, y: 320 }, 6, 20, "#0000ff","#0000ff",10);
    this.gd.addLine({x:300,y:300},{x:350,y:350},3); 
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }

  @HostListener("mousedown", ["$event"])
  async onMouseDown(event: MouseEvent) {
    if (this.gd.click(this.ctx, event).length > 0) {
      this.move = true;
    } else {
      this.drag = true;
      this.dragStartPosition = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
    }
  }

  @HostListener("mousemove", ["$event"])
  async onMouseMove(event: MouseEvent) {
    if (this.move === true) {
      this.gd.getClicks().forEach((element) => {
        if (element.shape.type !== 'connection' && element.shape.type !== 'line') {
          element.shape.inverseShape(this.ctx);
          element.shape.moveMouse(this.ctx, event);
          element.shape.drawShape(this.ctx);
        } else {
          if (element.shape.type === 'connection') {
            if (element.action === 'inPointXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as ConnectionObject).moveMouseXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inPointToXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as ConnectionObject).moveMouseToXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inRectangle') {
              element.shape.inverseShape(this.ctx);
              (element.shape as ConnectionObject).moveMouse(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
          }
          else {
            if (element.action === 'inPointXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as LineObject).moveMouseXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inPointToXY') {
              element.shape.inverseShape(this.ctx);
              (element.shape as LineObject).moveMouseToXY(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
            if (element.action === 'inRectangle') {
              element.shape.inverseShape(this.ctx);
              (element.shape as LineObject).moveMouse(this.ctx, event)
              element.shape.drawShape(this.ctx);
            }
          }
        }
      });
    } else {
      if (this.drag === true) {
        const currentTransformedCursor = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
        this.ctx.translate(currentTransformedCursor.x - this.dragStartPosition.x, currentTransformedCursor.y - this.dragStartPosition.y);
        this.gd.clear(this.ctx);
        this.gd.draw(this.ctx);
      }
    }
  }

  @HostListener("mouseup", ["$event"])
  async onMouseUp(event: MouseEvent) {
    if (this.move === true || this.drag === true) {
      this.gd.clear(this.ctx);
      this.gd.draw(this.ctx);
      this.gd.resetMouse();
      this.move = false;
      this.drag = false;
    }
  }

  @HostListener("mousewheel", ["$event"])
  zoomWheel(event: WheelEvent) {
    event.preventDefault();
    const mouse = this.gd.getMousePoint(this.ctx, event.offsetX, event.offsetY);
    const zoom = event.deltaY < 0 ? 1.1 : 0.9;
    this.gd.zoomInPoint(this.ctx, mouse.x, mouse.y, zoom);
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }

}