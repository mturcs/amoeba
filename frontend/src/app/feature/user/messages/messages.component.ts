import {Component, OnInit, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "app-messages",
  encapsulation: ViewEncapsulation.Emulated,
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.scss"]
})
export class MessagesComponent implements OnInit {
  linesHorizontal: { x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }[];
  linesVertical: { x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }[];
  squareSize = 10;
  squareCols = 10;
  squareRows = 10;


  generateHorizontalLines(): { x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }[] {
    // Logic to generate the lines dynamically
    const lines = [];

    // logic to generate lines
    for (let i = 0; i < this.squareCols   ; i++) {
      const line = {
        x1: this.squareSize,
        y1: i * this.squareSize,
        x2: this.squareCols * this.squareSize,
        y2: i * this.squareSize,
        stroke: "red",
        strokeWidth: 2
      };
      lines.push(line);
    }

    return lines;
  }

  generateVerticalLines(): { x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }[] {
    // Logic to generate the lines dynamically
    const lines = [];

    // logic to generate lines
    for (let i = 0; i < this.squareRows ; i++) {
      const line = {
        x1: i * this.squareSize,
        y1: this.squareSize,
        x2: i * this.squareSize,
        y2: this.squareRows * this.squareSize,
        stroke: "red",
        strokeWidth: 2
      };
      lines.push(line);
    }

    return lines;
  }

  /*
  linesHorizontal = [
    { x1: 10, y1: 10, x2: 100, y2: 10 },
    { x1: 10, y1: 20, x2: 100, y2: 20 },
    { x1: 10, y1: 30, x2: 100, y2: 30 },
    { x1: 10, y1: 40, x2: 100, y2: 40 },
    { x1: 10, y1: 50, x2: 100, y2: 50 },
    { x1: 10, y1: 60, x2: 100, y2: 60 },
    { x1: 10, y1: 70, x2: 100, y2: 70 },
    { x1: 10, y1: 80, x2: 100, y2: 80 },
    { x1: 10, y1: 90, x2: 100, y2: 90 },
    { x1: 10, y1: 100, x2: 100, y2: 100 }


    // Add more line objects as needed
  ];
  linesVertical = [
    { x1: 10, y1: 10, x2: 10, y2: 100 },
    { x1: 20, y1: 10, x2: 20, y2: 100 },
    { x1: 30, y1: 10, x2: 30, y2: 100 },
    { x1: 40, y1: 10, x2: 40, y2: 100 },
    { x1: 50, y1: 10, x2: 50, y2: 100 },
    { x1: 60, y1: 10, x2: 60, y2: 100 },
    { x1: 70, y1: 10, x2: 70, y2: 100 },
    { x1: 80, y1: 10, x2: 80, y2: 100 },
    { x1: 90, y1: 10, x2: 90, y2: 100 },
    { x1: 100, y1: 10, x2: 100, y2: 100 }
    // Add more line objects as needed
  ];
*/
  constructor() { this.linesHorizontal = this.generateHorizontalLines();
                  this.linesVertical = this.generateVerticalLines();
  }

  ngOnInit(): void {

  }

}
