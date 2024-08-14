# API Automation Framework

This is an API automation framework built with TypeScript and Playwright.

## Project Structure

- **src/**: Contains the source code.
  - **tests/**: API test cases.
  <!-- - **utils/**: Utility functions and helper classes.
  - **services/**: API service classes for interacting with endpoints. -->
  - **config/**: Configuration files, including environment and credential configurations.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm install 
- npm install playwright @playwright/test typescript ts-node

### Installation

1. Clone the repository:

//to change
   git clone https://github.com/your-repo/api-automation-framework.git
   cd api-automation-framework

##### Reporting
After running your tests, you can generate and view the Allure report:


npx allure generate ./allure-results --clean
npx allure open