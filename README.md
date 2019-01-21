# My Shift Manager

Take home coding challenge

## Running the app

The project manages dependencies through `npm`. To install them, run the following command in the root of the project:

```
npm install
```

Once done, the single-page application can be built with the following command:

```
npm run build
```

And finally, run the server with the following command:

```
npm run start
```

At this stage, the web app will be available at `https://localhost:3000`.

## Premise

As part of the interviewing process i was given this take home coding challenge. I was given a pdf document that highlighted what had to be done and general design guidelines and some ground rules.

Though challenge had no time limits, I did set-up myself a time limit of 10 hours. As I did not wanted to spend more time on it then a weekend.


## Architecture / Tech Stack

I had a free choice to choose any framework from VueJS/React/Angular. Though I do not have any experience with Angular and VueJS, I have done some early work in React circa 2014. So I chose **React**. Since the challenge had a need to do a lot of UI components I selected **Material UI** which is a react component library for Google Material Design. Primarily because it makes my life easy and keep the scope of challenge limited. Finally for state managment I chose Rx.JS which is based on Observable pattern. It uses observers to notify component of changes happening while keeping data flow unidirectional.

## Assumptions
To keep it sensible and within scope I assumed, I had a REST API client which feed me information I needed, ideally I would have liked doing a Koa.js server running node as backen, but for maintaining my gole of 10 hours, i decided to use https://www.mockapi.io/. Its a free online tool that lets you mock api endpoints and do provide fake data while supporting GET, PUT, POST and DELETE(all of which i needed)

## Retrospective
It ended up a long challenge which took me whole weekend plus some time to code, I almost spent 12 hours into it and still had to let few things to do.

I was not able to unit test, though it was one of the requiremnents of challenge. for unit testing i had chosen Jest as my testing framework. If i can take more time, this would be the first thing i will do.

Also, the challenge is visually not where I wanted it to be, with responsiveness taking a hit.

Overall, it wqas a massive challenge with a lot of features to be implemented, and I think i did a decent job in wrapping up the functionality. However if i have more time i would like to push some tests and fix the UI across viewports.

