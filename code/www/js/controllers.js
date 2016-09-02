angular.module('songhop.controllers', ['ionic', 'songhop.services'])


    /*
    Controller for the discover page
    */
    .controller('DiscoverCtrl', function($scope, $timeout, User, Recommendations) {
        // get our first songs
        Recommendations.init()
            .then(function() {
                $scope.currentSong = Recommendations.queue[0];
                Recommendations.playCurrentSong();
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

            }, 250);

            Recommendations.playCurrentSong();
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
    .controller('FavoritesCtrl', function($scope, User) {
        // get the list of favorites from our User service
        $scope.favorites = User.favorites;

        // fired when we remove a song from favorites
        $scope.removeSong = function(song, index) {
            User.removeSongFromFavorites(song, index);
        }
    })


    /*
    Controller for our tab bar
    */
    .controller('TabsCtrl', function($scope, Recommendations) {
        // stop the audio when going to favorites page
        $scope.enteringFavorites = function() {
            Recommendations.haltAudio();
        }

        // resume the audio when leaving favorites page
        $scope.leavingFavorites = function() {
            Recommendations.init();
        }
    });











