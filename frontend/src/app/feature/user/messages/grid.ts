import {Injectable} from "@angular/core";

interface Playfield { value: string; xPos: number; yPos: number; player: number; win: boolean; stroke: string; tempmark: boolean}
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

  checkWin(board: Playfield[][], playerCheck: number) {
    const winCriteria = playerCheck.toString().repeat(5);
    let checkWin = "";
    // Függőleges ellenőrzés
    for (let j = 0; j < this.cols; j++) {
      for (let i = 0; i < this.rows; i++) {
        checkWin = checkWin + board[i][j].player.toString();
      }
      if (checkWin.match(winCriteria) !== null) {
        // a találat helyének megjelölése
        for (let k = 0; k < 5; k++) {
          this.playField[checkWin.search(winCriteria) + k][j].win = true;
        }
      }
      checkWin = "";
    }
    // Vízszintes ellenőrzés
    for (let j = 0; j < this.rows; j++) {
      for (let i = 0; i < this.cols; i++) {
        checkWin = checkWin + board[j][i].player.toString();
      }
      if (checkWin.match(winCriteria) !== null) {
        // a találat helyének megjelölése
        for (let k = 0; k < 5; k++) {
          this.playField[j][checkWin.search(winCriteria) + k].win = true;
        }
      }
      checkWin = "";
    }



    /*
    // Átlós ellenőrzés balról le

    checkWin = board[5][0].player.toString() + board[6][1].player.toString() + board[7][2].player.toString() +
      board[8][3].player.toString() + board[9][4].player.toString()

    //console.log(checkWin);
    checkWin = "";

    this.colindex = 0;
    this.rowindex = this.rows - 5;
    for (let j = 5; j > 10; j++) {

    }

    for (let cRow = this.rows - 5; cRow <= this.rows - 1; cRow++) {
      checkWin = checkWin + board[cRow][this.colindex].player.toString();
      console.log("checkwin", cRow, this.colindex)
      this.colindex++;
    }
    //console.log("checkwin", checkWin);

    if (checkWin.match(winCriteria) !== null) {
      // a találat helyének megjelölése
      for (let k = 0; k < 5; k++) {
        this.playField[this.rowindex + k][checkWin.search(winCriteria) + k].win = true;
      }
      console.log("playfield", this.playField);

    }
    this.colindex = 0;

     */

    // átlós ellenőrzés új

    checkWin = "";
    for (let diagRow = 0; diagRow < this.rows; diagRow++) {
      checkWin = this.diagscan_left_right_down(diagRow, board);
      if (checkWin.match(winCriteria) !== null) {
        for (let k = 0; k < 5; k++) {
          this.playField[diagRow + k][checkWin.search(winCriteria) + k].win = true;
        }
      }
    }
/*
    checkWin = "";
    for (let diagCol = 1; diagCol < this.cols; diagCol++ ) {
      checkWin = this.diagscan_left_right_up(diagCol, board);
      console.log("checkwin", checkWin);
      if (checkWin.match(winCriteria) !== null) {
        for (let k = 0; k < 5; k++) {
          this.playField[checkWin.search(winCriteria) + k][diagCol].win = true;
        }
      }
    }
*/


  }


diagscan_left_right_down(startRowPos: number, board) {
    let diagString = "";
    let colShift = 0;
    for ( let diagRowindex = startRowPos; diagRowindex < this.rows  ; diagRowindex++ ) {
      diagString = diagString + board[diagRowindex][ colShift ].player.toString();
      colShift++;
    }
    return diagString;
}

diagscan_left_right_up(startColPos: number, board) {
    let diagString = "";
    let rowShift = 0;

    for ( let diagColindex = startColPos; diagColindex < this.cols -  4 ; diagColindex++ ) {
      console.log(rowShift, diagColindex);
      diagString = diagString + board[rowShift][ diagColindex + rowShift ].player.toString();
      rowShift ++;
    }
    return diagString;
  }

  winscannew(position: Pos, board) {
    const winCriteria = position.player.toString().repeat(5);
    let playFieldX = Math.floor(this.playField[position.xPos][position.yPos].xPos / this.squareSize - 1);
    let playFieldY = Math.floor(this.playField[position.xPos][position.yPos].yPos / this.squareSize - 1);
    let eszakralep = position.xPos;
    let delrelep = position.xPos;
    let keletrelep = position.yPos;
    let nyugatralep = position.yPos;
    let lab = 1;
    let checkWin = "";

    // függőleges

    for (let j = 0; j < this.rows; j++ ) {
      checkWin = checkWin + board[ j ][position.yPos].player.toString();
    }


    //  f. jeloles

    if (checkWin.match(winCriteria) !== null) {
      for (let k = checkWin.search(winCriteria); k < 8; k++) {
        this.playField[k][position.yPos].win = true;
      }
    }
  checkWin = "";
    // vízszintes
    for (let j = 0; j < this.cols; j++ ) {
      checkWin = checkWin + board[ position.xPos ][ j ].player.toString();
    }

    // v. jeloles
    if (checkWin.match(winCriteria) !== null) {
      for (let k = checkWin.search(winCriteria); k < 8; k++) {
        this.playField[position.xPos][k].win = true;
      }
    }

    //balról átlós
    checkWin = "";
    let eltolas = 0;
    if (position.yPos > position.xPos) {
      eltolas = position.yPos - position.xPos;
      for (let j = 0; j < this.rows - 1  - eltolas; j++ ) {
        checkWin = checkWin + board[ j ][ position.yPos - position.xPos + j ].player.toString();
        console.log(checkWin);
      }
      // b. á. a eset jeloles
      if (checkWin.match(winCriteria) !== null) {
        for (let k = 0; this.rows - 1 - eltolas; k++) {
          if (k >= checkWin.search(winCriteria) ) {
            this.playField[ k ][position.yPos - position.xPos + k].win = true;
          }
        }
      }
    };
    if (position.xPos > position.yPos) {
      eltolas = position.xPos - position.yPos;
      for (let j = 0; j < this.cols - 1  - eltolas; j++ ) {
        checkWin = checkWin + board[ position.xPos - position.yPos + j ][ j ].player.toString();
        console.log(checkWin);
      }
      // b. á. a eset jeloles
      if (checkWin.match(winCriteria) !== null) {
        for (let k = 0; this.cols - 1 - eltolas; k++) {
          if (k >= checkWin.search(winCriteria) ) {
            this.playField[position.xPos - position.yPos + k][k].win = true;
          }
        }
      }
    };






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
