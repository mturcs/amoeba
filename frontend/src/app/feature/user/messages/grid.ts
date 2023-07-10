import {Injectable} from "@angular/core";

interface Playfield { value: string; xPos: number; yPos: number; player: number; win: boolean; stroke: string; tempmark: boolean; }
export interface Pos { xPos: number; yPos: number; player: number; }


@Injectable()
export class  Grid {
  linesHorizontal: { x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }[];
  linesVertical: { x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }[];
  squareSize = 80;
  squareCols = 11;
  squareRows = 11;
  rows = this.squareRows - 1;
  cols = this.squareCols - 1;
  rowindex = 0;
  colindex = 0;


  posObj: Playfield = { value: "empty", xPos: 0, yPos: 0, player: 0, win: false, stroke: "", tempmark: false};

  playField = Array.from({ length: this.rows }, () =>
    Array.from({ length: this.cols }, () => this.posObj)
  );



  generateHorizontalLines(): { x1: number, y1: number, x2: number, y2: number, stroke: string, strokeWidth: number }[] {
    // Logic to generate the lines dynamically
    const lines = [];

    // logic to generate lines
    for (let i = 1; i < this.squareCols + 1; i++) {
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
    for (let i = 1; i < this.squareRows + 1; i++) {
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












  winnerscan(position: Pos, board) {
    const winCriteria = position.player.toString().repeat(5);
    let checkWinStringHor = "";
    let checkWinStringVer = "";
    let checkWinStringDia = "";
    let marker: number;
    // vizszintes ellenőrzés
    for ( let i = 0; i < this.cols; i++ ) {
      checkWinStringHor = checkWinStringHor + board[i][position.yPos].player.toString();
    }
    // győztes jelölése
    if (checkWinStringHor.match(winCriteria) !== null) {
      for (let k = checkWinStringHor.search(winCriteria); k < checkWinStringHor.search(winCriteria) + 5; k++) {
        this.playField[k][position.yPos].win = true;
      }
    }
    checkWinStringHor = "";


    // függőleges ellenőrzés
    for ( let i = 0; i < this.rows; i++ ) {
      checkWinStringVer = checkWinStringVer + board[position.xPos][i].player.toString();

      // console.log("Pos", position);
    }
    // győztes jelölése

    if (checkWinStringVer.match(winCriteria) !== null) {
      for (let k = checkWinStringVer.search(winCriteria); k < checkWinStringVer.search(winCriteria) + 5; k++) {
        this.playField[position.xPos][k].win = true;
      }
    }
    checkWinStringVer = "";

    // átlós ellenőrzés bal fent -> jobb lent
  // console.log("pos",position);

    marker = position.yPos;

    if (position.xPos > position.yPos) {
      marker = position.xPos - position.yPos;
      for ( let i = 0 ; i < this.cols; i++ ) {
          if ( marker < this.cols ) {
            // checkWin = checkWin + board[i][marker].player.toString();
            console.log("i,marker", i, marker);
            // console.log("pos", position);
            checkWinStringDia = checkWinStringDia + board[position.xPos][i].player.toString();
            console.log("checkwin", checkWinStringDia);
            // console.log("player", board[position.xPos][position.yPos].player.toString());
            marker++;
          }
      }
      console.log("player", board[3][0].player)

      // győztes jelölése
      if (checkWinStringDia.match(winCriteria) !== null) {
        for (let k = checkWinStringDia.search(winCriteria); k < checkWinStringDia.search(winCriteria) + 5; k++) {
          this.playField[ position.xPos + k ][position.yPos + k ].win = true;
        }
      }

    }
  }



































  constructor(

  ) {



    console.log(this.playField);


    this.linesHorizontal = this.generateHorizontalLines();
    this.linesVertical = this.generateVerticalLines();
    // this.playField.fill("empty", 0, this.squareCols * this.squareRows);
  }


}
@Injectable()
export class Placemark extends Grid {

  placeCross(): void {


  }

}
