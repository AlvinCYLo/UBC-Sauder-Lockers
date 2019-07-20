# cuslockers
Locker System for the Commerce Undergraduate Society

## How to use

### Prerequisites:
1. Please have [NodeJS](https://nodejs.org/en/) installed (the newer the better)
2. *Optional* You can install [Yarn](https://yarnpkg.com/en/)
3. Have a working terminal (cmd + space "terminal" for mac users // [git bash](https://git-scm.com/downloads) for windows is preferred)

### Project Set up:
1. Clone the repo from GitHub "git clone ____"
2. Navigate to the project folder and use the terminal to call "yarn install" or "npm install" (if Yarn was not installed)
3. A list all available school lockers should be captured in an Excel sheet and placed inside cuslockers/test/data and should be named Lockers.xlsx (Please see the existing "Lockers.xlsx" file for reference. If Locker availability should change, please edit the locker numbers accordingly from the excel file (no empty cells please))
4. Download the CSV from Showpass and rename it Clients.xlsx and place inside the same folder (cuslockers/test/data)

### Project Use
1. To run the project, simply call "yarn start" or "node src/controller/LockerSystem.js" (If an error should occur, it is because there are too many people requesting lockers on a specific floor. If so, please manually adjust the Client.xlsx file)
2. An Excel spreadsheet with the convention DD-MM-YYYY_Locker-Assignments should appear in the root directory
3. All Locker assignments should be done and pertinent information should be provided.
4. Send off to stakeholder/users

## Happy Coding


#### Next Steps 
- Integrate with Showpass to automatically grab files
- Create UI / Dashboard / Track statistics
- Implement Restful APIs hosted on cus website so anyone within CUS can use this tool
