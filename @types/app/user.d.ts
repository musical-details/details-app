export {};
declare global {
  export namespace App {
    export namespace User {
      export interface User extends Api.User {
        ratings: Api.Rating[];
      }
    }
  }
}
