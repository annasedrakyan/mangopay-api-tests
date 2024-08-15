# MangoPay API Tests

## Overview

This repository contains automated tests for the MangoPay API using Playwright. The tests validate various API endpoints. The project is integrated with GitHub Actions for CI/CD, automatically running tests on every push or pull request. The test results are stored as artifacts and presented in an HTML report.

## Features

- Automated testing of the MangoPay API using Playwright.
- CI/CD integration with GitHub Actions.
- HTML reports generated for easy viewing of test results.
- Easily extendable to add more tests and features.

## Project Structure

├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI/CD pipeline configuration
├── src/
│   ├── commons/
│   │   └── requests.ts             # Common request utility functions
│   ├── config/
│   │   └── config.ts               # Configuration constants and environment variables
        └── playwright.config.ts    # Playwright configuration file       
│   └── tests/
│       └── users.spec.ts           # API test file for user-related endpoints
    └── testData.json      
├── tsconfig.json/                  # TypeScript configuration file
├── package.json                    # Node.js dependencies and scripts
└── README.md                       # Project documentation


- .github/workflows/ci.yml: Defines the CI/CD pipeline, specifying how and when tests should run.
- tests/api/user.tests.ts: Contains the API test cases.
- test-results/: Stores raw test results after execution.
- playwright.config.ts: Configuration file for Playwright, including test runners, timeouts, and reporters.
- package.json: Lists project dependencies and includes scripts for running tests and generating reports.


Setup Instructions
1. Clone the Repository

git clone https://github.com/annasedrakyan/mangopay-api-tests.git
cd mangopay-api-tests

2. Install Dependencies
Ensure you have Node.js installed. Then, install the project dependencies using npm:

npm install

and 

npm install playwright @playwright/test typescript ts-node

3. Running Tests Locally
To run all tests locally, use the following command:

npx playwright test

This command will execute all the test cases in the tests directory.

5. Viewing Test Results
HTML Report
After running the tests, you can generate an HTML report:

npx playwright show-report

This will open a browser window with the test report, displaying which tests passed, failed, or were skipped.

6. CI/CD Pipeline
This project uses GitHub Actions for continuous integration and continuous deployment (CI/CD). The pipeline is configured to run tests on every push and pull request to the main branch.

CI/CD Workflow
The CI/CD workflow is defined in .github/workflows/ci.yml. It includes the following steps:

- Checkout Code: Fetch the latest code from the repository.
- Install Dependencies: Install the necessary Node.js packages.
- Run Tests: Execute the test suite using Playwright.
- Generate HTML Report: Generate an HTML report based on the test results.
- Downloading Artifacts: After the pipeline completes, you can download the test results and reports from the GitHub Actions interface under the "Artifacts" section.

7. Writing Tests
To add a new test:

- Create a new test file: Add a new file in the tests/ directory (e.g., users.spec.ts).
- Write the test case
- Run and verify: Execute the tests to ensure they pass and are correctly reported.

8. Scripts
The package.json includes several useful scripts for running tests and generating reports:

"scripts": {
  "test": "playwright test"
}

- test: Runs all Playwright tests. Test results are stored in the test-results directory.
