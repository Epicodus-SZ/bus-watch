export class Watch {
  private nextArrival: number;
  constructor(public routeID: string,
    public stopID: string,
    public userID: string
  ) {
    this.nextArrival = this.getNext();
  }

  getNext(){
    return 42;
  }
}
