import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class ErrorService implements ErrorHandler {

  constructor() { }
  handleError(error: any): void {
    console.log(error);
  }
}
