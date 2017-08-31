This application lets you search your favorite soccer club.
User can sign in using their name. name is a required field.
In order to search user will have first select a country, then a league within the country and finally the team.
Options for the first two selects are populated from JSON objects, hard coded in project1.js.
Data for third select(teams) is fetched by sending an AJAX call to a third party API(football-data.org). Response returned from the API is in JSON format.
User has the ability to save his choice by clicking the bookmark button. Now when the user logs in again he will find his previously bookmarked choice.
IndexedDB is implemented to save user's choices.
Following tutorial was followed to implement IndexedDB -->https://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673
