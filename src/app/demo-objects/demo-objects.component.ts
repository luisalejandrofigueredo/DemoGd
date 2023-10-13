import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import {
  NgGdService,
  Point,
  NodeObject,
} from 'ng-gd';
@Component({
  selector: 'app-demo-objects',
  templateUrl: './demo-objects.component.html',
  styleUrls: ['./demo-objects.component.scss']
})
export class DemoObjectsComponent implements OnInit {
  gd = inject(NgGdService);
  private ctx!: CanvasRenderingContext2D;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.gd.start(640,480);
    this.gd.setDarkMode();
    this.gd.clearObjects();
    this.gd.addNode({ x: 150, y: 150 }, "one", "this is the node one", false, 10, 10);
    this.gd.clear(this.ctx);
    this.gd.draw(this.ctx);
  }
}


