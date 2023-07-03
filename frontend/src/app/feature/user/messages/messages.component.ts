import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import {Grid, Placemark} from "./grid";
import type { Pos } from "./grid";


@Component({
  selector: "app-messages",
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {

  @ViewChild("svgElement", {static: false}) svgElement!: ElementRef<SVGSVGElement>;

  circleFill = "";
  circleStroke = "";
  cursorPosition = "";
  markCirclePlaceX = 0;
  markCirclePlaceY = 0;
  player = 0;
  placeX = false;
  placeCircle = true;
  pos = {x: 0, y: 0};
  winCheckPos: Pos = { xPos: 0, yPos: 0, player: 0, };




  @HostListener("window:resize") onResize = () => {
    this.updateCursorPosition();
  }

  onMouseMove = (event: MouseEvent) => {
    this.updateCursorPosition(event);
  }


  // tslint:disable-next-line:typedef
  updateCursorPosition(event?: MouseEvent) {
    if (!event) {
      // Use default position when no event is provided
      this.cursorPosition = "N/A";
      return;
    }
  }


  // tslint:disable-next-line:typedef
    writeCursorPosition(event?: MouseEvent) {

    if (!event) {
      // Use default position when no event is provided
      this.cursorPosition = "N/A";
      return;
    }
    const svgRect = this.svgElement.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - svgRect.left;
    const offsetY = event.clientY - svgRect.top;
    console.log(`Cursor Position: X: ${offsetX.toFixed(2)}, Y: ${offsetY.toFixed(2)}`);
    console.log(`Matrix Position: X: ${Math.floor(offsetX / this.playGround.squareSize )}, Y: ${Math.floor(offsetY / this.playGround.squareSize  )}`);
// tslint:disable-next-line:radix
    this.pos = {x: parseInt(offsetX.toFixed(2)), y: parseInt( offsetY.toFixed(2)) };
    return this.pos;

  }

  placeMark(event?: MouseEvent): void {

    if (this.placeX) {
      this.placeCircle = true;
      this.placeX = false;
      this.player = 1;
      this.circleStroke = "orange";

    }
    else {
      this.placeCircle = false;
      this.placeX = true;
      this.player = 2;
      this.circleFill = "red";
      this.circleStroke = "red";
    }


    if (!event) {
        // Use default position when no event is provided
        this.cursorPosition = "N/A";
        return;
      }
    const svgRect = this.svgElement.nativeElement.getBoundingClientRect();
    const offsetX = event.clientX - svgRect.left;
    const offsetY = event.clientY - svgRect.top;

      // tslint:disable-next-line:radix
    this.markCirclePlaceX = Math.floor(offsetX / this.playGround.squareSize ) * this.playGround.squareSize +
        Math.floor(this.playGround.squareSize / 2);
    this.markCirclePlaceY = Math.floor(offsetY / this.playGround.squareSize ) * this.playGround.squareSize +
        Math.floor(this.playGround.squareSize / 2);


    this.playGround.playField[Math.floor(offsetY / this.playGround.squareSize - 1 )]
        [Math.floor(offsetX / this.playGround.squareSize  - 1 )] =
      {value: "circle", xPos: this.markCirclePlaceX, yPos: this.markCirclePlaceY, player: this.player, win: false, stroke: this.circleStroke, tempmark: false};

    // console.log(this.playGround.playField);
    // console.log(Math.floor(offsetY / this.playGround.squareSize - 1 ), Math.floor(offsetX / this.playGround.squareSize  - 1 ));

    // this.playGround.checkWin(this.playGround.playField, 1);
    // this.playGround.checkWin(this.playGround.playField, 2);
    this.playGround.winscannew({ xPos : Math.floor(offsetY / this.playGround.squareSize - 1 ), yPos :
  Math.floor(offsetX / this.playGround.squareSize  - 1 ), player : this.player}, this.playGround.playField);

  }





  constructor(
    public playGround: Grid


  ) {
  }






  // tslint:disable-next-line:typedef
  ngOnInit(){

  }


}






