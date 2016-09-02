angular.module('songhop.controllers', ['ionic', 'songhop.services'])


    /*
    Controller for the discover page
    */
    .controller('DiscoverCtrl', function($scope, $ionicLoading, $timeout, User, Recommendations) {
        // helper functions for loading
        var showLoading = function() {
            $ionicLoading.show({
                template: '<i class="ion-loading-c"></i>',
                noBackdrop: true
            });
        }

        var hideLoading = function() {
            $ionicLoading.hide();
        }

        // set loading to true the first time while we fetch songd from the server
        showLoading();

        // get our first songs
        Recommendations.init()
            .then(function() {
                $scope.currentSong = Recommendations.queue[0];
                Recommendations.playCurrentSong();
            })
            .then(function() {
                // turn loading off
                hideLoading();
                $scope.currentSong.loaded = true;
            });

        // fired when we favorite / skip a song.
        $scope.sendFeedback = function(bool) {
            // first, add to favorites if they favorited
            if(bool) User.addSongToFavorites($scope.currentSong);

            // set variable for the correct animation sequence
            $scope.currentSong.rated = bool;
            $scope.currentSong.hide = true;

            // prepare the first song
            Recommendations.nextSong();

            // timeout to allow animation to complete before changing to next song
            $timeout(function() {
                // update the current song in the scope
                $scope.currentSong = Recommendations.queue[0];
                $scope.currentSong.loaded = false;

            }, 250);

            Recommendations.playCurrentSong()
                .then(function() {
                    $scope.currentSong.loaded = true;
                });
        }

        // get the next album image, if none return empty string
        $scope.nextAlbumImg = function() {
            if(Recommendations.queue.length > 1) {
                return Recommendations.queue[1].image_large
            }
        }
    })


    /*
    Controller for the favorites page
    */
    .controller('FavoritesCtrl', function($scope, $window, User) {
        // get the list of favorites from our User service
        $scope.favorites = User.favorites;

        // fired when we remove a song from favorites
        $scope.removeSong = function(song, index) {
            User.removeSongFromFavorites(song, index);
        }

        // open the song in spotify
        $scope.openSong = function(song) {
            $window.open(song.open_url, '_system');
        }
    })


    /*
    Controller for our tab bar
    */
    .controller('TabsCtrl', function($scope, Recommendations, User) {
        $scope.favCount = User.favoriteCount;
        // stop the audio when going to favorites page
        $scope.enteringFavorites = function() {
            User.newFavorites = 0;
            Recommendations.haltAudio();
        }

        // resume the audio when leaving favorites page
        $scope.leavingFavorites = function() {
            Recommendations.init();
        }
    });











