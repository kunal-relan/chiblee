
// /* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);
var logintoken;


phonecatControllers.controller('commentController',['$scope','$http',
  function($scope,$http){

    logintoken = localStorage.getItem('userID');
  $http.defaults.headers.common['Auth-Token'] = logintoken;
  var Username = localStorage.getItem('userName');
    //  $scope.user = {"user" : logintoken};
        $scope.user = {};
        $scope.user.username = Username;
     $scope.sendPost = function(id,comment) {
          //console.log(id);
        //  console.log("yo");
         $http.post("http://192.168.10.151:8080/comment/"+id, $scope.user).success(function(data, status) {
              $scope.user.name = "";
             console.log(data);
             $scope.comment.push(data);
             console.log($scope.comment);

         })
     }
   }]);

   phonecatControllers.controller('logincheck', ['$scope','$location',

     function($scope,$location) {



       var userID = localStorage.getItem('userID');
        console.log(userID);
        if(userID){
          location.href = '#/phones';
        }else{
          alert("login");
        }


       }]);

phonecatControllers.controller('PhoneListCtrl', ['$scope',

  function($scope) {




    $scope.phones = [
      {'name': 'Daily Needs',
       'imageUrl' : './img/icon.png'},

      {'name': 'Property',
       'imageUrl' : './img/icon.png'},

      {'name': 'Hobbies',
       'imageUrl' : './img/icon.png'},

       {'name': 'Utilities',
        'imageUrl' : './img/icon.png'},

        {'name': 'Night Owlers',
         'imageUrl' : './img/icon.png'},

         {'name': 'Entertainment',
          'imageUrl' : './img/icon.png'}
    ];


    }]);

phonecatControllers.controller('typeCtrl',['$scope','$routeParams','$http',
  function($scope, $routeParams,$http,location) {

      var type = $routeParams.type;
      console.log(type);
      $http.get('http://192.168.10.151:8080/type/' + type).success(function(data) {
      console.log(data);
      $scope.type = data.something;
      $scope.save = function(){$rootScope.location = data.something;}


    });
    }
  ]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', '$http',
    function($scope, $routeParams, $http) {
      var name = $routeParams.name.toLowerCase().trim();
        console.log(name);
        $http.get('http://192.168.10.151:8080/category/' + name).success(function(data) {
        $scope.phones = data.type;
      });
    }]);

phonecatControllers.controller('detailCtrl', ['$scope', '$routeParams', '$http',
      function($scope, $routeParams, $http) {

        var onSuccess = function(position) {
          var physicalScreenWidth = window.screen.height * window.devicePixelRatio;


          $scope.location = position;
          var map = L.map('map');

             L.tileLayer('https://api.tiles.mapbox.com/v4/kunalrelan.cif7wxlyi15mssclzrzh1w3k3/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3VuYWxyZWxhbiIsImEiOiJjaWY3d3hudm0xNW15c2NsemFqZnpqYmN3In0.azlMEc1ikO61niZ4lqxp5w', {
               maxZoom: 18,
               attribution: 'Chiblee Data',
               id: 'mapbox.streets'
             }).addTo(map);


               L.Routing.control({
                 waypoints: [
                   L.latLng(position.coords.latitude,position.coords.longitude),
                   L.latLng(28.556708, 77.337788)
                 ]
               }).addTo(map);

             map.locate({setView: true, maxZoom: 16});
             map.on('click', function(e) {
                alert("click");
                document.getElementById("map").style.height = physicalScreenWidth+"px";
              });

        };

        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }

      navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000, enableHighAccuracy: true });



        var id = $routeParams.id;
          console.log(id);
          $http.get('http://192.168.10.151:8080/detail/' + id).success(function(data) {
          $scope.detail = data;
          $scope.comment = data.comments;
          $scope.ratings = data.ratings;
          console.log(data);
          console.log(data.comments);
          console.log(data.ratings);

        });
      }]);

phonecatControllers.controller('loginCtrl', ['$scope', '$http','$location',
function($scope, $http , $location) {



            location.href = "http://192.168.10.151:4444/auth/facebook".success(function(data) {
            console.log(data);

            $scope.login = data.facebook;
            localStorage.userID = data.facebook.id;
            localStorage.userName = data.facebook.displayName;
            console.log(data);
            location.href = '#/phones';

            //console.log(user);




          });
        }]);

phonecatControllers.controller('mapCtrl', ['$scope', '$http',
      function($scope, $http) {

        $scope.map = function(data){


          var map = L.map('map').setView([data[0].lat,data[0].lon], 13);

          L.tileLayer('https://api.tiles.mapbox.com/v4/kunalrelan.cif7wxlyi15mssclzrzh1w3k3/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3VuYWxyZWxhbiIsImEiOiJjaWY3d3hudm0xNW15c2NsemFqZnpqYmN3In0.azlMEc1ikO61niZ4lqxp5w', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);

          var LeafIcon = L.Icon.extend({
            options: {
              shadowUrl: '',
              iconSize:     [38, 95],
              shadowSize:   [50, 64],
              iconAnchor:   [22, 94],
              shadowAnchor: [4, 62],
              popupAnchor:  [-3, -76]
            }
          });



          for(i=0;i<data.length;i++){

              L.marker([data[i].lat, data[i].lon]).bindPopup("I am a green leaf.").addTo(map);
                }

          }}]);
