# Yousician Webb App Developer Assignment

This exercise is meant to test your general knowledge and to show that you have well balanced skills in frontend development.
Your assignment will be evaluated on the quality of your code, the compliance with the design, the responsiveness, the stability,
and the ease of launching your project.
Candidates usually manage to do the assignment in 6 hours, but feel free to take the necessary time.

Good luck! :)

## Requirements

- The frontend must be built using [ReactJs](https://reactjs.org/)
- You must use the provided API
- Songs are displayed in an infinite scroll list
- While songs are being fetched, a loader should be displayed
- Songs can be filtered by level (song level goes from 1 to 15)
- Songs can be searched
- Songs can be added to favorite
- Songs can be removed from favorite
- The website must be responsive

Bonus:

- Add some tests
- Want to show off? You can add any feature you desire

## Mockups and design

Level indicator follow the following color pattern: 1-5 green, 6-10 orange, 10-15 red

Each song item is composed of an image, a title, an artist, a level and a favorite button

The font is Montserrat

The following color palette is used

    #000000
    #101010
    #383635
    #383635
    #939393
    #ffffff
    #6fc13e
    #ff8e00
    #dc001c

## AVAILABLE APIs:

A fake and intentionally flaky api is available for this assignment. In case need more information: [json server](https://github.com/typicode/json-server).

To start it, you must go inside the api folder, install the dependencies `npm install` and run:

`npm run start-api`

Now if you go to http://localhost:3004 you should see the default json server page.

The following routes are available:

```
GET /songs
GET /favorites
POST /favorites
DELETE /favorites/<favoriteId>
```

### GET /songs Parameters

Bellow are some parameters you will find useful to query the data you need.

All the following parameters can be combined

```
GET /songs?_start=0&_limit=20&search_like=yousician&level=4
```

#### Filter

by level

```
GET /songs?level=1&level=2
```

by search ()

```
GET /songs?search_like=yousician
```

#### Slice

Add `_start` and `_end` or `_limit` (an `X-Total-Count` header is included in the response)

```
GET /songs?_start=20&_end=40
GET /songs?_start=20&_limit=20
```

_Works exactly as [Array.slice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) (i.e. `_start` is inclusive and `_end` exclusive)_

### POST /favorites

You can create a favorite by sending the following data to the api:

```
  {
    "songId": <songId>
  }
```
