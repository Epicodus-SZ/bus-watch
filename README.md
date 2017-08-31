# BusWatch

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Creations Steps
1. `Bower init`
2. Add bower components to .gitingore
3. Add bower bootstrap styles to ng-cli config
4. Add firebase credentials file to .gitignore
5. Add nav bar to app.component
6. Create about component
7. Create the app.routing.ts files
8. Add about route.
9. Create config component
10. Create watch component
11. add routes to these pages.
12. `npm install angularfire2@4.0.0-rc.0 firebase --save`
13. Add `"types": [ "firebase" ]` to tsconfig.json
14. Add user auth by following LHTP guide.
15. `npm install promise-polyfill --save-exact` to resolve bug


      {
          "code": 200,
          "currentTime": 1504150060044,
          "data": {
              "entry": {
                  "arrivalsAndDepartures": [
                    {item1},
                    {item2}
                    
                  ],
                  "nearbyStopIds": [],
                  "situationIds": [],
                  "stopId": "1_570"
              },
              "references": {
                  "agencies": [],
                  "routes": [],
                  "stops": [],
                  "trips":[]
              }
          },
          "text": "OK",
          "version": 2
      }