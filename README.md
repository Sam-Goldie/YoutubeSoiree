# YoutubeSoirée

Youtube Soiree is an in-development single-page app that allows multiple users to watch Youtube videos with syncronized playback in what is commonly known as a "watch party."

# Why Build YoutubeSoiree?

Trying to make the most of time spent with friends can be tough during a pandemic. While trying to watch Youtube videos remotely with a few friends, we found that the "watch party" apps already available online for Youtube were disappointing. Not only were the text chat features unpleasant to use, but the most essential features of those apps, their playback syncs, were simply not reliable. After experiencing hours of grief trying to remain synced up with my friends, I realized it was time to take matters into my own hands.

# Features

Features include: 
* Syncronized playback (obviously)
* A text chat feature
* A field to submit youtube video links to change what's playing

Priority changes to come:
* Deployment + the ability to host more than one watch party similtaneously
* An optional full-screen + chat mode that will facilitate communication without disrupting the show

Future features:
* Implementing in-app youtube search for greater convenience
* Envision and then implement a more appealing styling for the app

# Installation

Fork or clone this repo down. Once on your local environment, I recommend installing dependencies with "npm install"

To start the nodemon server: npm run dev

Default port for the app is 3000.

# Technologies

* YoutubeSoiree is written in Javascript. 
* Static files are served up by Express, and video sync and text chat are both handled through Socket.io.
