<!-- TABLE OF CONTENTS -->
<details open="open">
    <summary>Table of Contents</summary>
    <ol>
    <li>
        <a href="#about-the-project">About The Project</a>
        <ul>
            <li><a href="#built-with">Built With</a></li>
        </ul>
    </li>
    <li>
        <a href="#getting-started">Getting Started</a>
        <ul>
            <li><a href="#prerequisites">Prerequisites</a></li>
            <li><a href="#installation">Installation</a></li>
        </ul>
    </li>
    <li>
        <a href="#output">Output</a>
    </li>
    </ol>
</details>

<!-- ABOUT THE PROJECT -->
<img align="left" src="./icons/about-icon.png" width="50px" height="50px" />

## About The Project

PriceLabs Assignment for Fullstack Engineer - 1

<img align="left" src="./icons/build-icon.png" width="30px" height="30px" round="-3px"/>

### Built With

- [Nodejs](https://nodejs.org/en/docs)
- [axios](https://www.npmjs.com/package/axios)
- [csv-writer](https://npmjs.com/package/csv-writer)

<!-- GETTING STARTED -->
<img align="left" src="./icons/walking-man-icon.png" width="50px" height="50px" />

## Getting Started

To get a local copy up and running follow these simple steps.

<img align="left" src="./icons/build-icon.png" width="30px" height="30px" />

### Prerequisites

  **You should have Node.js installed in your system. If not then don't worry the installation section has all the steps that you are going to need.**
- Active internet connection through out installation (Must)
- Node.js (Version: 18.17.1)

## Installation

<img align="left" src="./icons/build-icon.png" width="30px" height="30px" />

### Steps:

1. Move to the directory.
    ```sh
    cd pricelabs/
    ```
1. Install all the packages
    ```sh
    npm i
    ```
1. Run
  - To run the script
    ```sh
    npm start
    ```
  - To run in dev mode
    ```sh
    npm run dev
    ```

<img align="left" src="./icons/csv-logo.png" width="30px" height="30px" />

## Output

- First provide the necessary data to input.json. Add an address and a pageSize. Then hit `npm start`.
- After running the script an output.csv file will get created in the project root directory. 
- The file will have all the formated data. 
- Since as per the problem statement some rentNights beginDate can be before today, the size of rentNights array can be different since we are going to pick the the rentNights from today.
- I have added '0's to the end of the rentNights array whose beginDate is before today. Could have added anything, even could have left it blank. It was just a personal choice. 
- Lastly the output.csv file will get generated at the end. If I wouldn't have added the '0's at the end the for those listings whose rentNight begin from an early date, the csv would have had blank cells. Since I have added '0's, the cells would have '0' instead of a blank rentNight.


---

<p align="center">Saup21</p>
<p align="center">
    <a href="https://github.com/Saup21/">
        <img src="https://user-images.githubusercontent.com/58631762/120077716-60cded80-c0c9-11eb-983d-80dfa5862d8a.png" width="19">
    </a>
</p>