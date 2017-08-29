export class Watch {
  constructor(public routeID: string,
    public stopID: string,
    public userID: string,
    public nextArrival: number

  ) {}
  //{
    // this.nextArrival = this.getNext();
  //}

  getNext(){
    return 42;
  }
}
