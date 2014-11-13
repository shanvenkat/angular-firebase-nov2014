/* Register angular module with custom name myapp, all other Angular objects will add it to this custom angular module.
This controller takes care of CRUD Operations */

var myapp = angular.module('myapp', ['ngRoute', "firebase"])
.service('UserService', [function() {
    var sdo = {
        isLogged: false,
        username: ''
    };
    return sdo;
}]);

myapp.config(function ($routeProvider) {
    $routeProvider.
                when('/fbupload/', {
                    templateUrl: '/app/views/fbupload.html',
                    controller: 'fbuploadCtrl'
                }). 
                when('/fbhomeforsaleread/', {
                    templateUrl: '/app/views/fbhomeforsaleread.html',
                    controller: 'fbhomeforsalereadCtrl'
                }). 

                when('/userlists/', {
                    templateUrl: '/app/views/userlists.html',
                    controller: 'usersController'
                }).  

                when('/update/:id', {
                    templateUrl: '/app/views/update.html',
                    controller: 'updateController'
                }).  
                				 
                when('/create/', {
                    templateUrl: '/app/views/create.html',
                    controller: 'usersController'
                }).  

                when('/addjobposting/', {
                    templateUrl: '/app/views/addjobposting.html',
                    controller: 'jobPostingController'
                }).  
                
                when('/listjobposting/', {
                    templateUrl: '/app/views/jobpostinglisting.html',
                    controller: 'jobPostingController'
                }).

                when('/jobpostingupdate/:jobid', {
                    templateUrl: '/app/views/jobpostingupdate.html',
                    controller: 'jobUpdateController'
                }). 
                
                when('/register/', {
                    templateUrl: '/app/views/register.html',
                    controller: 'registerController'
                }).
                
                when('/login/', {
                    templateUrl: '/app/views/login.html',
                    controller: 'loginController'                    
                }).

                when('/quiz/', {
                    templateUrl: '/app/views/quiz.html',
                    controller: 'quizController'
                }).

                when('/results/', {
                    templateUrl: '/app/views/results.html',
                    controller: 'resultsController'
                }).
                
                when('/logout/', {
                    templateUrl: '/app/views/logout.html',
                    controller: 'logoutController'
                }).

                when('/fbuserlists/', {
                    templateUrl: '/app/views/fbuserlists.html',
                    controller: 'fbuserlistsCtrl'
                }).

                when('/fbupdate/:id', {
                    templateUrl: '/app/views/fbupdate.html',
                    controller: 'UpdateCtrl'
                }).

                when('/', {
                    templateUrl: '/app/views/fbregister.html',
                    controller: 'fbregisterCtrl'
                }).

                when('/fblogin/', {
                    templateUrl: '/app/views/fblogin.html',
                    controller: 'fbloginCtrl'
                }).

                when('/fbregisternew/', {
                    templateUrl: '/app/views/fbregisternew.html',
                    controller: 'fbregisternewCtrl'
                }).
                
                when('/fbhomeforsaleadd/', {
                    templateUrl: '/app/views/fbhomeforsaleadd.html',
                    controller: 'fbhomeforsaleaddCtrl'
                }).

                when('/fbhomeforsaleupdate/:id', {
                    templateUrl: '/app/views/fbhomeforsaleupdate.html',
                    controller: 'fbhomeforsaleupdateCtrl'
                }).
                
                when('/fbhomeforsaleread/', {
                    templateUrl: '/app/views/fbhomeforsaleread.html',
                    controller: 'fbhomeforsalereadCtrl'
                }).
                
                when('/fbdbprogram/', {
                    templateUrl: '/app/views/fbdbprogram.html',
                    controller: 'fbdbprogramCtrl'
                }).

                when('/fbhfsreaddetail/:id', {
                    templateUrl: '/app/views/fbhfsreaddetail.html',
                    controller: 'fbhfsreaddetailCtrl'
                }).

                otherwise({
                    redirectTo: '/'
                });
});

myapp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

myapp.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        var fd = new FormData();
        fd.append('file', file);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
        .success(function(){
        })
        .error(function(){
        });
    }
}]);

myapp.controller('fbuploadCtrl', 
    ['$scope','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope', '$parse', 'fileUpload',
    function($scope,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope, $parse, fileUpload) {
    
    init();    
    function init() {
    }     


    $scope.uploadFile = function () {
        
        var file = $scope.myFile;
        //alert ("file " +file);
        console.log('file is ' + JSON.stringify(file));
        //var uploadUrl = "/#/fileUpload";
        var uploadUrl = "/#/images/";
        fileUpload.uploadFileToUrl(file, uploadUrl);

        
        //oFiles = document.getElementById("uploadInput").files
        //var nBytes = 0,
        //oFiles = document.getElementById("uploadInput").files;
        //var nFiles = $('#input').get(0).files[0];
        //nFiles = oFiles.length;
        //alert ("nFiles " + nFiles);
        //for (var nFileId = 0; nFileId < nFiles; nFileId++) {
            //    nBytes += oFiles[nFileId].size;
          //  }
        //var sOutput = nBytes + " bytes";
        //alert ("sOutput " + sOutput);

        //var inputElement = document.getElementById("uploadInput");
        //alert ("inputElement " + inputElement.name);

        //inputElement.addEventListener("change", handleFiles, false);
        //function handleFiles() {
                //var fileList = this.files; /* now you can work with the file list */
                //alert ("fileList " + fileList);
        //}

        //var fd = new FormData()
        //alert ("fd" + fd);
        /*
        for (var i in $scope.files) {
            fd.append("uploadedFile", $scope.files[i])
            alert ("fdfd" + $scope.files[i]);
        }
        */
        //var xhr = new XMLHttpRequest()
        //xhr.upload.addEventListener("progress", uploadProgress, false)
        //xhr.addEventListener("load", uploadComplete, false)
        //xhr.addEventListener("error", uploadFailed, false)
        //xhr.addEventListener("abort", uploadCanceled, false)
        //xhr.open("POST", "/images/")
        //scope.progressVisible = true
        //xhr.send(fd)    
    }   
    
}]);

myapp.controller('fbhomeforsaleaddCtrl', 
    ['$scope','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope','UserService', 
    function($scope,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope,User ) {
    
    init();    
    function init() {           
        //if (typeof($rootScope.loginUser) ==='undefined'){             
           //$location.path('/fblogin/');  
        //}
    }     

     $scope.logout = function () { 
         $rootScope.loginObj.$logout();          
         $location.path('/fblogin/');                    
    };
   
    var onComplete = function (error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };   
    
    
    //Create Opeartion        
    $scope.addhfs = function () {

       var address1 = $scope.hfs.address1;
       var address2 = $scope.hfs.address2;
       var city = $scope.hfs.city;
       var state = $scope.hfs.state;
       //var dob = replaceToDash($scope.user.dob);
       var zip = $scope.hfs.zip;
       var sqft = $scope.hfs.sqft;
       var nooffloors = $scope.hfs.nooffloors;
       var noofbedrooms = $scope.hfs.noofbedrooms;
       var noofbathrooms = $scope.hfs.noofbathrooms;
       var hometype = $scope.hfs.hometype;
       var yearonbuild = $scope.hfs.yearonbuild;
       var accesstoairport = $scope.hfs.accesstoairport;
       var accesstoseashore = $scope.hfs.accesstoseashore;
       var estimatedpropertytax = $scope.hfs.estimatedpropertytax;
       var estimatedassociationfee = $scope.hfs.estimatedassociationfee;
       var communityamenities = $scope.hfs.communityamenities;
       var arethefloors = $scope.hfs.arethefloors;
       var internetfacility = $scope.hfs.internetfacility;
       var cookinggas = $scope.hfs.cookinggas;
       var countywater = $scope.hfs.countywater;
       var carparking = $scope.hfs.carparking;
       var acandheater = $scope.hfs.acandheater;
       var carpetarea = $scope.hfs.carpetarea;
       var hardwoodarea = $scope.hfs.hardwoodarea;       
        
      var hfsRef = new Firebase('https://blistering-fire-6557.firebaseio.com/hfs/');
                
      var list = $firebase(hfsRef).$asArray();
        list.$add({'address1': address1, 'address2': address2,'city': city,'state': state,'zip': zip,
           'sqft': sqft,'nooffloors': nooffloors,'noofbedrooms': noofbedrooms,'noofbathrooms': noofbathrooms,'hometype': hometype,
           'yearonbuild': yearonbuild, 'accesstoairport': accesstoairport,'accesstoseashore': accesstoseashore, 
           'estimatedpropertytax': estimatedpropertytax,'estimatedassociationfee': estimatedassociationfee,
           'communityamenities': communityamenities,'arethefloors': arethefloors,'internetfacility': internetfacility,
           'cookinggas': cookinggas,'countywater': countywater,'carparking': carparking,'acandheater': acandheater,
           'carpetarea': carpetarea,'hardwoodarea': hardwoodarea}).then(function(hfsRef) {
                    var id = hfsRef.name();
                    //console.log("added record with id " + id);
                  list.$indexFor(id); // returns location in the array
        });

         $scope.hfs.address1="";
         $scope.hfs.address2="";
         $scope.hfs.city="";
         $scope.hfs.state="";
        //var dob = replaceToDash($scope.user.dob);
         $scope.hfs.zip="";
         $scope.hfs.sqft="";
         $scope.hfs.nooffloors="";
         $scope.hfs.noofbedrooms="";
         $scope.hfs.noofbathrooms="";
         $scope.hfs.hometype="";
         $scope.hfs.yearonbuild="";
         $scope.hfs.accesstoairport="";
         $scope.hfs.accesstoseashore="";
         $scope.hfs.estimatedpropertytax="";
         $scope.hfs.estimatedassociationfee="";
         $scope.hfs.communityamenities="";
         $scope.hfs.arethefloors="";
         $scope.hfs.internetfacility="";
         $scope.hfs.cookinggas="";
         $scope.hfs.countywater="";
         $scope.hfs.carparking="";
         $scope.hfs.acandheater="";
         $scope.hfs.carpetarea="";
         $scope.hfs.hardwoodarea="";
         $location.path('/fbhomeforsaleread/');
        
    };
    
    $scope.clickCancel = function () {
        $location.path('/fbhomeforsaleread/');
    };
}]);


myapp.controller('fbhomeforsaleupdateCtrl', 
    ['$scope','$routeParams','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope', 
    function($scope,$routeParams,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope) {
  
    init();
    function init() {
       // if (typeof($rootScope.loginUser) ==='undefined'){             
          // $location.path('/fblogin/');  
        //}
        var updaterecid = $routeParams.id;     
        getRecordbyUpdateID(updaterecid);
    }

    $scope.logout = function () { 
         $rootScope.loginObj.$logout();          
          $location.path('/fblogin/');                    
    };

    //Read Operation
    function getRecordbyUpdateID(updaterecid) {
        // Attach an asynchronous callback to read the data at our posts reference
        var postsRef = new Firebase("https://blistering-fire-6557.firebaseio.com/hfs/" + updaterecid);
        postsRef.on('value', function (snapshot) {
            $scope.returnRecordForUpdate = snapshot.val();
            //console.log(snapshot.val());
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    }

    //Update Operation
    $scope.updatehfs = function (address1, address2, city, state, zip, sqft, nooffloors,
        noofbedrooms, noofbathrooms, hometype, yearonbuild, accesstoairport,accesstoseashore, 
            estimatedpropertytax, estimatedassociationfee, communityamenities, arethefloors,
            internetfacility, cookinggas, countywater, carparking,acandheater,carpetarea, hardwoodarea) {         
        var updateRef = new Firebase("https://blistering-fire-6557.firebaseio.com/hfs/" + $routeParams.id);
        updateRef.update({
            'address1': address1, 'address2': address2,'city': city,'state': state,'zip': zip,
            'sqft': sqft,'nooffloors': nooffloors,'noofbedrooms': noofbedrooms,'noofbathrooms': noofbathrooms,
            'hometype': hometype,
            'yearonbuild': yearonbuild, 'accesstoairport': accesstoairport,'accesstoseashore': accesstoseashore, 
            'estimatedpropertytax': estimatedpropertytax,'estimatedassociationfee': estimatedassociationfee,
            'communityamenities': communityamenities,'arethefloors': arethefloors,'internetfacility': internetfacility,
            'cookinggas': cookinggas,'countywater': countywater,'carparking': carparking,'acandheater': acandheater,
            'carpetarea': carpetarea,'hardwoodarea': hardwoodarea     
     });
        $location.path('/fbhomeforsaleread/');
    };

    $scope.clickCancel = function () {
        $location.path('/fbhomeforsaleread/');
    };

}]);

myapp.controller('fbhomeforsalereadCtrl', 
    ['$scope','$routeParams','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope', 
    function($scope,$routeParams,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope) {
  
    function checkforDecimal(m){
            var n = parseInt(m);
            if (m/n == 1)
                {return false; }   
            else { return true;}
    }    

    function SetPriorNum (){
        var hfsRef = new Firebase('https://blistering-fire-6557.firebaseio.com/hfs/');        
        var list = $firebase(hfsRef).$asArray();
        list.$loaded(function(x){
                   for (i=0;i<list.length;i++){
                        var fredRef = new Firebase('https://blistering-fire-6557.firebaseio.com/hfs/' + list.$keyAt(i));
                        fredRef.setPriority(i)                                     
                      }
            }, function(err) {
            console.error(err);
        });  

    }

    init();
    function init() {     

     // if (typeof($rootScope.loginUser) ==='undefined'){             
      //    $location.path('/fblogin/');  
      //}                         

      SetPriorNum ();      
       
       var hfsRef = new Firebase('https://blistering-fire-6557.firebaseio.com/hfs/');          
      $scope.showallrecords = $firebase(hfsRef).$asArray();
        var reccount = 0;
        $scope.recordsPerPage = 2; 
        var varrecordsPerPage = 2;
        var pagesBrowse = 0;
        var totalPagestoBrowse = 0;
        
        hfsRef.on ('value', function(hfsSnapshot) {
                var hfscnt= hfsSnapshot.numChildren();
                reccount = hfscnt;

                pagesBrowse = reccount / varrecordsPerPage; 
                if (checkforDecimal (pagesBrowse)){
                        $scope.totalPagestoBrowse = parseInt(pagesBrowse)  + 1;
                        $scope.buttonstoDisplay = parseInt(pagesBrowse) + 1;                               
                 }    
                    else{                             
                        $scope.totalPagestoBrowse = pagesBrowse ;
                        $scope.buttonstoDisplay = pagesBrowse;    
                  }            
                
              });
            
        homePage(1);
      }
          
    
 function homePage(page){    
      $scope.currentPage = page;
      browsebyButton (page);               
  };

  $scope.firstPage = function (page) {         
        $scope.currentPage = page;
        browsebyButton (page);  
    };

$scope.prevPage = function () {
       if ($scope.currentPage > 1){
            $scope.currentPage = $scope.currentPage -1 ;
            browsebyButton ($scope.currentPage);               
        };
    };

$scope.nextPage = function () {   
        if ($scope.currentPage < $scope.totalPagestoBrowse){         
            $scope.currentPage = $scope.currentPage + 1 ;       
            browsebyButton ($scope.currentPage);               
        };
    };

$scope.lastPage = function (page) {
    $scope.currentPage = page;
        browsebyButton (page);               
    };

$scope.pageChanged = function (page) {
        $scope.currentPage = page;
       browsebyButton (page);               
    };

function browsebyButton(page) {
    SetPriorNum ();    
    var startRecord = page * $scope.recordsPerPage - $scope.recordsPerPage ;    
    var endRecord  = (startRecord + $scope.recordsPerPage)-1 ;      
    var ref = new Firebase('https://blistering-fire-6557.firebaseio.com/hfs/').startAt(startRecord).endAt(endRecord);
    var sync = $firebase(ref);
    $scope.messages = sync.$asArray();     
  };   

  $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 1;
        }
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }
        return ret;
    };

     var onComplete = function (error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };

    // Delete Operation
    $scope.DeleteHFS = function (id) {
        var messageListRef = new Firebase("https://blistering-fire-6557.firebaseio.com/hfs/" + id);
        var urlpath = messageListRef.toString();
        var messageListRemoveURL = new Firebase(urlpath);
        messageListRemoveURL.remove(onComplete);
        SetPriorNum (); 
        $location.path('/fbhomeforsaleread/'); 
    };

     $scope.logout = function () { 
         $rootScope.loginObj.$logout();          
         $location.path('/fblogin/');                    
    };
    
}]);


myapp.controller('fbhfsreaddetailCtrl', 
    ['$scope','$routeParams','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope', 
    function($scope,$routeParams,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope) {
  
    init();
    function init() {
        // if (typeof($rootScope.loginUser) ==='undefined'){             
           //$location.path('/fblogin/');  
        //}        
        var recid = $routeParams.id;     
        getRecIDforhfsdetails(recid);
    }

    $scope.logout = function () { 
         $rootScope.loginObj.$logout();          
          $location.path('/fblogin/');                    
    };

    //Read Operation
    function getRecIDforhfsdetails(recid) {
        // Attach an asynchronous callback to read the data at our posts reference
        var postsRef = new Firebase("https://blistering-fire-6557.firebaseio.com/hfs/" + recid);
        postsRef.on('value', function (snapshot) {
            $scope.hfsdetailsbyID = snapshot.val();
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    }   

    $scope.goBack = function () {
        $location.path('/fbhomeforsaleread/');
    };

}]);


 myapp.controller('fbuserlistsCtrl', 
    ['$scope','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope','UserService', 
    function($scope,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope,User ) {
    
    init();    
    function init() {           
        var resultvalue = "";                
        if (typeof($rootScope.loginUser) ==='undefined'){             
            $location.path('/fblogin/');  
        }
    }    

     $scope.logout = function () { 
         $rootScope.loginObj.$logout();          
          $location.path('/fblogin/');                    
    };

    var ref = new Firebase("https://blistering-fire-6557.firebaseio.com/");
    var sync = $firebase(ref);
    $scope.messages = sync.$asArray();
    var onComplete = function (error) {
        if (error) {
            console.log('Synchronization failed');
        } else {
            console.log('Synchronization succeeded');
        }
    };   
    
    //Create Opeartion        
    $scope.adduser = function () {
        var firstname = $scope.user.firstname;
        var lastname = $scope.user.lastname;
        var gender = $scope.user.gender;
        var age = $scope.user.age;
        //var dob = replaceToDash($scope.user.dob);
        var dob = $scope.user.dob;
        var emptype = $scope.user.emptype;
        var email = $scope.user.email;
        var messageListRef = new Firebase('https://blistering-fire-6557.firebaseio.com');
        var newMessageRef = messageListRef.push();
        var path = newMessageRef.toString();
        var pathLength = parseInt(path.length);
        var lastOccurence = path.lastIndexOf('/')
        var intlastOccurence = parseInt(lastOccurence);
        var struid = path.substr(intlastOccurence + 1, pathLength)
        newMessageRef.set({ 'id': struid, 'firstname': firstname, 'lastname': lastname, 'gender': gender, 
            'age': age, 'dob': dob, 'employmenttype': emptype, 'email': email });
        $scope.user.firstname = '';
        $scope.user.lastname = '';
        $scope.user.gender = '';
        $scope.user.age = '';
        $scope.user.dob = '';
        $scope.user.emptype = '';
        $scope.user.email = '';
    };

    // Delete Operation
    $scope.deleteuser = function (id) {
        var messageListRef = new Firebase("https://blistering-fire-6557.firebaseio.com/" + id);
        var urlpath = messageListRef.toString();
        var messageListRemoveURL = new Firebase(urlpath);
        messageListRemoveURL.remove(onComplete);
    };

    $scope.clickCancel = function () {
        $location.path('/fbuserlists/');
    };

}]);


myapp.controller('UpdateCtrl', 
    ['$scope','$routeParams','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope', 
    function($scope,$routeParams,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope) {
  
    init();
    function init() {
         //if (typeof($rootScope.loginUser) ==='undefined'){             
           // $location.path('/fblogin/');  
        //}
        var updaterecid = $routeParams.id;
        var strupdaterecid = updaterecid.toString();
        getRecordbyUpdateID(strupdaterecid);
    }

    $scope.logout = function () { 
         $rootScope.loginObj.$logout();          
          $location.path('/fblogin/');                    
    };

    //Read Operation
    function getRecordbyUpdateID(updaterecid) {
        // Attach an asynchronous callback to read the data at our posts reference
        var postsRef = new Firebase("https://blistering-fire-6557.firebaseio.com/" + updaterecid);
        postsRef.on('value', function (snapshot) {
            $scope.returnRecordForUpdate = snapshot.val();
            //console.log(snapshot.val());
        }, function (errorObject) {
            console.log('The read failed: ' + errorObject.code);
        });
    }

    //Update Operation
    $scope.updateuser = function (firstname, lastname, gender, age, dob, employmenttype, email) {         
        var updateRef = new Firebase("https://blistering-fire-6557.firebaseio.com/" + $routeParams.id);
        updateRef.update({ "firstname": firstname, "lastname": lastname, "gender": gender, "age": age, "dob": dob, "employmenttype": employmenttype, "email": email });
        $location.path('/fbuserlists/');
    };

    $scope.clickCancel = function () {
        $location.path('/fbuserlists/');
    };

}]);

myapp.controller('fbregisterCtrl', 
    ['$location', '$scope', '$firebaseSimpleLogin','$http', '$firebase','$routeParams', '$rootScope',   
    function($location,$scope,$firebaseSimpleLogin,$http,$firebase, $routeParams, $rootScope) { 

    init();
    function init(){ 
        var $userList = $('#userList');
       
    }   
      
      $scope.clickCancel = function (){  
        $scope.register.email = '';
        $scope.register.password = '';
        $('#userList').empty();         
      }

    $scope.clickRegister = function () {        
        var regemail = $scope.register.email;
        var regpassword = $scope.register.password;
        var ref = new Firebase("https://blistering-fire-6557.firebaseio.com");
        var authClient = new FirebaseSimpleLogin(ref, function(error, user) {
                  if (error) {
                    // an error occurred while attempting login
                    console.log(error);
                  } else if (user) {
                    // user authenticated with Firebase
                    //console.log("User ID: " + user.uid + ", Provider: " + user.provider);
                  } else {
                    // user is logged out
                  }
         });
        authClient.createUser(regemail, regpassword, function(error, user) {
            if (error) {
                //alert (error.message);
                $('#userList').append("<li>" + error.message + "</li>");
                document.getElementById('regemail').value = "";
                document.getElementById('regpassword').value = "";                
            } else {                              
               window.location = "/#/fblogin/";                
            }
        });       
    }
        
}]);          


myapp.controller('fbloginCtrl', 
    ['$scope', '$firebaseSimpleLogin','$http', '$firebase','$location','$routeParams', '$rootScope', 'UserService',  
    function($scope,$firebaseSimpleLogin,$http, $firebase, $location, $routeParams, $rootScope, User ) { 

    init();
    function init() {           
    }     
    
    $scope.clickCancel = function () { 
        var emailval = $scope.login.email
        if (emailval.length !== 0)
            {
                $scope.login.email = '';
            }        
        $scope.login.password = '';  
        $scope.errorMessage = '';
    }
    
    $scope.clickLogin = function () {          
        var regemail = $scope.login.email;
        var regpassword = $scope.login.password;
        var dataRef = new Firebase('https://blistering-fire-6557.firebaseio.com');        
        $rootScope.loginObj = $firebaseSimpleLogin(dataRef); 
        $rootScope.loginObj.$login("password", { email:regemail, password:regpassword}).then(function(user) {       
                //console.log("Logged in as: ",user.uid);
                $rootScope.loginUser = user.email;
                $rootScope.loginPassword = user.password;                                              
                $location.path('/fbhomeforsaleread/');  
            }, function(error) {
                //console.error("Login failed: ", error.code);
                $scope.errorMessage = "Login failed: " + error.message;
            });   
    }

}]);          


myapp.controller('fbregisternewCtrl', 
    ['$scope', '$http', '$firebase','$location', '$routeParams', '$rootScope',      
    function($scope, $http, $firebase, $location, $routeParams, $rootScope) { 
    
    init();
    function init() {           
       var demoUrl = "https://blistering-fire-6557.firebaseio.com";
       runExample(demoUrl);       
}    

    function runExample(demoUrl) {
    var $txtEmail = $('#txtEmail'),
        $txtPass = $('#txtPass'),
        $chkRegister = $('#chkRegister'),
        $btAction = $('#btAction'),
        $btLogout = $('#btLogout'),
        $userList = $('#userList'),
        $error = $('#error'),
        $views = $('.view'),
        ref = new Firebase(demoUrl),
        auth = initAuth(ref);
    
    // intialize Firebase Simple Login
    function initAuth(ref) {
        return new FirebaseSimpleLogin(ref, function (err, user) {
            // if there is an error then display it 
            if (err) {
                displayError(err);
            } else if (user) {
                // we only want to log people in through the email/password provider
                if( user.provider !== 'password' ) {
                   auth.logout();   
                }
                else {
                    // logged in!
                    uid = user.uid;
                    // save the user to our firebase
                    ref.child(user.uid).set({
                        id: user.id,
                        uid: user.uid,
                        email: user.email
                    });  
                    // switch over the the user info screen
                    switchView('userInfo');                    
                }
            } else {
                // logged out!
                console.log('not logged in');
            }
        });        
    }
    
    // custom event that fires off when we transition to the
    // userInfo page
    $("#userInfo").on("viewLoaded", function() {
       bindUsers(); 
    });
    
    // custom event that fires off when we transition to the
    // login page
    $("#login").on("viewLoaded", function() {
       // clear users
       $userList.html('');
       return; 
    });
    
    function login() {        
        auth.login('password', {
            email: $txtEmail.val(),
            password: $txtPass.val()
        });        
    }

    function register() {
        
        auth.createUser($txtEmail.val(), $txtPass.val(), function (error, user) {
            // if there isn't an error, log the user in
            // then switch to the userInfo view
            if (!error) {
                login();         
                switchView('userInfo');

            } else {
                // display any errors
                displayError(error);
                //$location.path('/fbuserlists/');   
            }
        });
    }
    
    // after logging out switch back to the login view
    function logout() {
        auth.logout();        
        switchView('login');                
    }

    // hides all views first, then shows the view that was
    // passed through the function
    function switchView(view) {
        var $view = $("#" + view);
        $views.removeClass('active');
        $view.addClass('active');
        $error.text(''); // clear error
        $view.trigger("viewLoaded");
    }

    // compares against error codes to display errors
    function displayError(error) {
        var errorMsg = '';
        switch (error.code) {
        case "INVALID_EMAIL":
            errorMsg = "You entered an invalid email";
            break;
        case "INVALID_PASSWORD":
            errorMsg = "You entered an invalid password";
            break;
        case "EMAIL_TAKEN":
             errorMsg = "The email you entered has been taken.";   
             break;
        default:
            errorMsg = "We're not really sure what happened.";
            break;
        }
        $error.text(errorMsg);
    }
    
    // attaches a child_added listener to firebase and whenever
    // a new child is added a list item gets appended 
    function bindUsers() {
        ref.on('child_added', function(snap) {
            console.log(snap.val());
            $userList.append("<li>" + snap.val().email + "</li>");
        });
    }

    // toggles whether the user is registering and logging in
    $chkRegister.on('click', function () {
        $btAction.off('click');
        if ($chkRegister.is(':checked')) {            
            $btAction.on('click', register);
            $btAction.text('Register');
        } else {
            $btAction.on('click', login);
            $btAction.text('Login');
            //$location.path('/fbuserlists/');   
        }
    });
    
    // default to register
    $btAction.on('click', register);

    // logout handler
    $btLogout.on('click', logout);    
}
    
}]);         


myapp.controller('fbdbprogramCtrl', 
    ['$scope','$firebaseSimpleLogin','$http','$firebase','$location','$rootScope','UserService', 
    function($scope,$firebaseSimpleLogin, $http, $firebase, $location, $rootScope,User ) {
    
    init();    
    function init() {           
        rundbscript();       
    }

    function rundbscript() {        
      var fbjsonRef = new Firebase('https://blistering-fire-6557.firebaseio.com/');
        var hfsRef = fbjsonRef.child('totalsqft');
        hfsRef.set({ 
          '1':'0-1000',
          '2':'1001-2000',
          '3':'2001-3000',
          '4':'3001-4000',
          '5':'more than 4000',
        })       

         $location.path('/fbhomeforsaleread/');        
    };    
}]);
