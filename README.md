TVOS Marketplace
--------------------
An online marketplace emphasised for Tennessee Viticultural and Oenological Society members to post and request items pertaining to winemaking activities.

Visit TVOS Marketplace
--------------------------------------
TVOS Marketplace is currently deployed at http://tvosmarketplace.tk for testing purposes.

Testing Locally
----------------------------------------
If you would like to test locally:
1. git clone this repo
2. `npm or yarn install` to pull in all dependencies
3. Install json-server globally: `npm i -g json-server`
4. Make a copy of Database/db.backup.json and run `json-server -p 5002 -w *your copy of db.backup.json*`
5. `npm start` in root directory to start react server