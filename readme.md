## test cypress
* test cypress tool
* browser support?
* junit and html reports?
* test runner?
* browser options
* basic auth?

## getting started
* `npm install`
* `npm open` open cypress ide
* `npm run e2e:report` not needed, default `npm start` generates reports
* `npm start -- --spec src/integration/examples/cookies.spec.ts` run spec pattern
* `npm run merge-junit` merge jresults junit into single junit report

## config
* disable video by adding 
    * cypress.json
    ```json
    "video": false,
    ```