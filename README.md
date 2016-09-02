## Song-Hop

This is a replica of the song-hop application created using [Ionic Framework](http://ionicframework.com/).

To use this, either create a new ionic project using the ionic node.js utility, or copy and paste this into an existing Cordova project and download a release of Ionic separately.

### Getting Started

Install ionic and cordova if you do not have them installed

```bash
$ sudo npm install -g ionic cordova
```

Set up the project

```bash
$ git clone https://github.com/einnor/song-hop
$ cd song-hop
$ npm install
```

Run the application on the browser

```bash
$ ionic serve
```

Then, to run it, cd into `myApp` and run:

```bash
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

Substitute ios for android if not on a Mac, but if you can, the ios development toolchain is a lot easier to work with until you need to do anything custom to Android.

## Demo
URL coming soon

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/contribute/#issues) to the main Ionic repository. On the other hand, pull requests are welcome here!
