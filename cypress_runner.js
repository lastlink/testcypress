const cypress = require('cypress')
const yargs = require('yargs')
const { merge } = require('mochawesome-merge')
const marge = require('mochawesome-report-generator')
const rm = require('rimraf')
const cypressConfig = require('./cypress')
const ls = require('ls')
const argv = yargs.options({
    'browser': {
        alias: 'b',
        describe: 'choose browser that you wanna run tests on',
        default: 'chrome',
        choices: ['chrome']
    },
    'spec': {
        alias: 's',
        describe: 'run test with specific spec file',
        default: 'cypress/integration/**/*.spec.js'
    }
}).help()
  .argv

// const reportDir = cypressConfig.reporterOptions.reportDir
const reportDir = "cypress/results";
const reportFiles = `${reportDir}/*.json`
// // list all of existing report files
ls(reportFiles, { recurse: true }, file => console.log(`removing ${file.full}`))

// delete all existing report files
rm(reportFiles, (error) => {
    if (error) {
        console.error(`Error while removing existing report files: ${error}`)
        process.exit(1)
    }
    console.log('Removing all existing report files successfully!')
})

const jreportFiles = `cypress/jresults/*.xml`
// // list all of existing report files
ls(jreportFiles, { recurse: true }, file => console.log(`removing ${file.full}`))

// delete all existing report files
rm(jreportFiles, (error) => {
    if (error) {
        console.error(`Error while removing existing report files: ${error}`)
        process.exit(1)
    }
    console.log('Removing all existing report files successfully!')
})

cypress.run({
    browser: argv.browser,
    spec: argv.spec,
    reporter: "cypress-multi-reporters",
    "reporter-options": "configFile=reporter-config.json"
}).then((results) => {
    console.log("result")
    console.log(results)
    const reporterOptions = {
        files: [reportFiles],
        // reportDir: results.config.reporterOptions.reportDir
        // results.config.reporterOptions.reportDir,
    }
    generateReport(reporterOptions)
}).catch((error) => {
    console.error('errors: ', error)
    process.exit(1)
})

function generateReport(options) {
    return merge(options).then((report) => {
        marge.create(report, options)
    })
}
