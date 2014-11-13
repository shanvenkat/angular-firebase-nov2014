myapp.controller ('usersController', function ($scope, $firebase, $http, $location) {

    init();
    function init() {        

        //testthis ();
        $scope.recordsPerPage = 2;
        getCount();
        //getUsers();             
        homePage(1);        
    }    

    function testthis() {
        $http.post('/addtaxterm/'+ 'W2' +'/' )
            .success(function (data) {                                 
                //$location.path('/');  
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });
    }

    function checkforDecimal(m){
            var n = parseInt(m);
            if (m/n == 1)
                {return false; }   
            else { return true;}
    }

    function replaceToDash(str){
        var finalstr = '';
        for (i=0;i<str.length;i++){
            if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
            else{
                finalstr = finalstr + str[i]
            }          
        }   
        return finalstr; 
    }

    function getCount(){            
            $http.get('/count')
                .success(function (data) {
                    $scope.reccount = data;                     
                    var pagesBrowse = $scope.reccount / $scope.recordsPerPage;  
                    if (checkforDecimal (pagesBrowse)){
                            $scope.totalPagestoBrowse = parseInt(pagesBrowse)  + 1;
                            $scope.buttonstoDisplay = parseInt(pagesBrowse) + 1;                               
                        }    
                    else
                            {                             
                            $scope.totalPagestoBrowse = pagesBrowse ;
                            $scope.buttonstoDisplay = pagesBrowse;    
                            }                                        
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };  

    $scope.adduser = function () {        
        var firstname = $scope.user.firstname;
        var lastname = $scope.user.lastname;
        var gender = $scope.user.gender;
        var age = $scope.user.age;
        var dob = replaceToDash($scope.user.dob);
        var emptype = $scope.user.emptype;  
        var email = $scope.user.email;
        //alert ('dob# ' + dob)
        $http.post('/adduser/'+ firstname +'/' + lastname + '/' + gender + '/' + age +'/' + dob +'/' + emptype + '/' + email +'/')
            .success(function (data) {                 
                //$scope.userlists = data;
                $location.path('/');  
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });
            $scope.user.firstname='';
            $scope.user.lastname='';
            $scope.user.gender='';
            $scope.user.age='';
            $scope.user.dob='';  
            $scope.user.emptype='';  
            $scope.user.email='';        
    };



    $scope.deleteuser = function (id) {               
            $http.delete('/delete/'+ id + '/')
            .success(function (data) {                 
                //$scope.userlists = data;                
                //$location.path('/');
                homePage(1);
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });                    
    };    
    
    function getUsers(){        
        $http.get('/userlist')
                .success(function (data) {                                  
                    $scope.userlists = data;                                  
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

function homePage(page){    
    $scope.currentPage = page;
    browsebyButton (page);               
}

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
    var startRecord =page * $scope.recordsPerPage - $scope.recordsPerPage;
    var endRecord  = startRecord + $scope.recordsPerPage;

    // for loop to loop around start record to end record
    $http.get('/userlist/' + startRecord + '/' + endRecord + '/' )
        .success(function (data) {                                                      
            $scope.pageLists = data;                             
        })
       .error(function (data) {
         console.log('Error: ' + data);
        });
}

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
    
});


myapp.controller ('updateController', function ($scope, $http, $routeParams, $location, $filter) {
    var id = $routeParams.id;
    init();
    function init() {        
        doupdate();        
    }   

    function doupdate(){
        $http.get('/search/' + $routeParams.id)
                .success(function (data) {
                    //data[0].DOB = $filter('date')(data[0].DOB, 'MM-dd-yyyy')
                    $scope.recordtoUpdate = data[0];                     
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });            
    };    

        function replaceToDash(str){
        var finalstr = '';
        for (i=0;i<str.length;i++){
            if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
            else{
                finalstr = finalstr + str[i]
            }          
        }   
        return finalstr; 
    }

    $scope.updateuser = function (docid, strfirstname,  strlastname,  strgender, strage, strdob, stremptype,  stremail) {
        strdob = replaceToDash(strdob);
        $http.put('/update/'+ docid + '/' + strfirstname +'/' + strlastname +'/' +strgender+ '/' + strage + '/' + strdob + '/' + stremptype + '/' + stremail + '/')
        $location.path('/');                           
    };

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };  

    $scope.clickDelete = function () {               
        $http.delete('/delete/'+ id + '/')
        $location.path('/');                                        
    };

});


myapp.controller ('jobPostingController', function ($scope, $http, $location) {
        
    init();
    function init() {
        $scope.recordsPerPage = 2;
        getPostingCount();
        getTravelRequiredData();
        getTaxTermData();
        //getUsers();             
        homePage(1);
    }    
 
    function getTravelRequiredData(){
        $http.get('/travelrequiredlists')
                .success(function (data) { 
                    $scope.travelrequiredlists = data;                                                      
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }

    function getTaxTermData(){
        $http.get('/taxtermlists')
                .success(function (data) { 
                    $scope.taxtermlists = data;                                  
                    //console.log("$scope.taxtermlists " + $scope.taxtermlists);                                 
                    
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }

    function checkforDecimal(m){
            var n = parseInt(m);
            if (m/n == 1)
                {return false; }   
            else { return true;}
    }

    function replaceToDash(str){
        var finalstr = '';
        if (str != ''){
            for (i=0;i<str.length;i++){
                if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
                else{
                    finalstr = finalstr + str[i]
                }          
            }   
        }
        return finalstr; 
    }

    function getPostingCount(){            
            $http.get('/jobpostingcount')
                .success(function (data) {
                    $scope.reccount = data;                     
                    var pagesBrowse = $scope.reccount / $scope.recordsPerPage;  
                    if (checkforDecimal (pagesBrowse)){
                            $scope.totalPagestoBrowse = parseInt(pagesBrowse)  + 1;
                            $scope.buttonstoDisplay = parseInt(pagesBrowse) + 1;                               
                        }    
                    else
                            {                             
                            $scope.totalPagestoBrowse = pagesBrowse ;
                            $scope.buttonstoDisplay = pagesBrowse;    
                            }                                        
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };  

    $scope.addjobposting = function () {        
        var requiredskills = $scope.job.requiredskills;
        var joblocation = $scope.job.joblocation;
        var areacode = $scope.job.areacode;
        var travelrequired = $scope.job.travelrequired;
        var telecommute = $scope.job.telecommute;
        var payrate = $scope.job.payrate;
        var taxterm = $scope.job.taxterm;
        var length = $scope.job.uilength;
        var posteddate = replaceToDash($scope.job.posteddate);        
        var positionid = $scope.job.positionid; 
        var aboutcompany = $scope.job.aboutcompany; 
        var positionsummary = $scope.job.positionsummary; 
        var minimumqualifications = $scope.job.minimumqualifications;
        var contactaddress = $scope.job.contactaddress; 

        $http.post('/addjobposting/'+ requiredskills +'/' + joblocation + '/' + areacode + '/' + travelrequired +'/' + telecommute +'/' + 
            payrate + '/' + taxterm +'/' + length +'/' + posteddate +'/' + positionid +'/' + aboutcompany +'/' + positionsummary +'/'
            + minimumqualifications +'/' + contactaddress +'/' )
            .success(function (data) {                 
                //$scope.userlists = data;
                $location.path('/listjobposting');  
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });
            //$scope.user.email='';        
    };

    $scope.deleteuser = function (id) { 

            $http.delete('/jobiddelete/'+ id + '/')
            .success(function (data) {                                 
                $location.path('/');
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });
    };    
    
    function getUsers(){        
        $http.get('/jobpostinglists')
                .success(function (data) {                                  
                    $scope.jobpostinglists = data;                                  
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });        
    };

function homePage(page){    
    $scope.currentPage = page;
    browsebyButton (page);               
}

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
    var startRecord =page * $scope.recordsPerPage - $scope.recordsPerPage;
    var endRecord  = startRecord + $scope.recordsPerPage;

    // for loop to loop around start record to end record
    $http.get('/jobpostingbrowse/' + startRecord + '/' + endRecord + '/' )
        .success(function (data) {                                                      
            $scope.jobpostinglists = data;                             
        })
       .error(function (data) {
         console.log('Error: ' + data);
        });
}

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
    
});

myapp.controller ('jobUpdateController', function ($scope, $http, $routeParams, $location) {    
    init();
    function init() {                
        getTravelRequiredData();
        getTaxTermData();
        getjobUpdateInfo();
    }

    function getTravelRequiredData(){
        $http.get('/travelrequiredlists')
                .success(function (data) { 
                    $scope.travelrequiredlists = data;                                                      
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }

     function getTaxTermData(){
        $http.get('/taxtermlists')
                .success(function (data) { 
                    $scope.taxtermlists = data; 
                    console.log('$scope.taxtermlists: ' + $scope.taxtermlists);            
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
    }
  

    function getjobUpdateInfo(){
        $http.get('/jobIdSearch/' + $routeParams.jobid)
                .success(function (data) {
                    $scope.jobIDToUpdate = data[0];                     
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });            
    };

    function replaceToDash(str){
        var finalstr = '';
        for (i=0;i<str.length;i++){
            if (str[i] == '/'){
                    finalstr = finalstr + '-';
                }
            else{
                finalstr = finalstr + str[i]
            }          
        }   
        return finalstr; 
    }

    $scope.updateJobId = function (jobid, requiredskills, joblocation,areacode,travelrequired,
        telecommute,payrate,taxterm,uilength,
        posteddate,positionid,aboutcompany,positionsummary,minimumqualifications,contactaddress) {        
        strdob = replaceToDash(posteddate);                
        $http.put('/JobIDUpdate/'+ jobid + '/' + requiredskills + '/' + joblocation +'/' + areacode +'/' +travelrequired+ '/' + telecommute + '/' + payrate + '/' + 
            taxterm + '/' + uilength + '/' + strdob + '/' + positionid + '/' + aboutcompany + '/'+ positionsummary + '/'+ minimumqualifications + '/'+ 
            contactaddress + '/')
            $location.path('/listjobposting');                           
        
    };

    $scope.clickCancel = function () {
        $location.path('/listjobposting/');                
    };  

    $scope.clickDelete = function () {   
        $http.delete('/jobiddelete/'+ $routeParams.jobid + '/')
        $location.path('/listjobposting/');                                        
    };

});


myapp.controller ('registerController', function ($scope, $http, $routeParams,$location) {
    init();
    function init() {   
    }        

    $scope.registeruser = function () {        
        var email = $scope.register.email;
        var password = $scope.register.password;
        $http.post('/registeruser/'+ email +'/' + password + '/')
            .success(function (data) {                                
                $location.path('/login/');              
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });
            $scope.register.email='';
            $scope.register.password='';            
    };    

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };     
    
    $scope.delregister = function () {                       
        $http.delete('/registerdelete/')
            .success(function (data) {                                 
                $location.path('/');              
            })
            .error(function (data) {
                console.log('Error: ' + data);                
            });                        
    };
});

myapp.controller('loginController', ['$scope', '$http', '$location', '$rootScope', 'UserService', function($scope, $http, $location, $rootScope, User ) {

init();    
    function init() {  
        $rootScope.notifyUser = "";
    }

    $scope.loginuser = function () {        
        var email = $scope.login.email;
        var password = $scope.login.password; 


        $http.get('/validatelogin/'+ email +'/' + password + '/')
            .success(function (data,status) {

                    if (data[0] == undefined){                            
                            $location.path('/login/' ); 
                            $rootScope.notifyUser = "Something went wrong, Pls Try again";
                            $scope.login.email = "";
                            $scope.login.password = "";                            
                    }
                    else{
                            User.isLogged = true;
                            User.username = $scope.login.email;                    
                            $rootScope.welcomeuser = email;
                            $location.path('/quiz/' ); 
                    }                    
            })
            .error(function (data,status, headers, config) {
                console.log('Error: ' + data);  
                User.isLogged = false;
                User.username = '';              
                // reload the login route
                $location.path('/login/');
            });           
    };    

    $scope.clickCancel = function () {                       
        $location.path('/');                
    };

}]);

myapp.controller('quizController', ['$scope', '$http', '$location', '$rootScope', 'UserService', function($scope, $http, $location, $rootScope, User ) {
    init();    
    function init() {  
        
        var resultvalue = "";        
        if (User.isLogged == false)
                { $location.path('/login/'); }
        else
            { $scope.displayloginuser = $rootScope.welcomeuser; }            
    }    
    
    $scope.logout = function () {        
        User.isLogged = false;                       
        $location.path('/login/');                
    };

    $scope.clickCancel = function () {                       
        $location.path('/login/');                
    };

    $scope.clickContinue = function () {            
            
            var points = 0;    
            $rootScope.questonetitle = "Which is not an advantage of using a closure?";
            var strquestoneAnswer = $scope.questone.value;                
            $rootScope.questoneanswer = strquestoneAnswer;

            if (strquestoneAnswer == "c. Private properties and methods"){                                               
                    
                    points = parseInt(points) + 1;
                    $rootScope.questoneresult = "Your Answer " + strquestoneAnswer + "," + " correct" ;
                    $rootScope.questoneCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questoneresult = "Your Answer " + strquestoneAnswer +"," + " incorrect" ;
                    $rootScope.questoneCorrectAnswer = "Correct Answer is: c. Private properties and methods";
                    $location.path('/results/' );  
            }

            $rootScope.questtwotitle = "To create a columned list of twoline email subjects and dates for a masterdetail view, which are the most semantically correct?";
            var strquesttwoAnswer = $scope.questtwo.value;                
            $rootScope.questtwoanswer = strquesttwoAnswer;
            if (strquesttwoAnswer == "c. <ul>+<li>"){                                
                    points = parseInt(points) + 1;
                    $rootScope.questtworesult = "Your Answer " + strquesttwoAnswer + "," + " correct" ;
                    $rootScope.questtwoCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questtworesult = "Your Answer " + strquesttwoAnswer +"," + " incorrect" ;
                    $rootScope.questtwoCorrectAnswer = "Correct Answer is: c. <ul>+<li>";
                    $location.path('/results/' );  
            }      
            
            $rootScope.questthreetitle = "To pass an array of strings to a function, you should not use...";
            var strquestthreeAnswer = $scope.questthree.value;                
            $rootScope.questthreeanswer = strquestthreeAnswer;
            if (strquestthreeAnswer == "b. fn.call(this, stringsArray)"){                                
                    points = parseInt(points) + 1;
                    $rootScope.questthreeresult = "Your Answer " + strquestthreeAnswer + "," + " correct" ;
                    $rootScope.questthreeCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questthreeresult = "Your Answer " + strquestthreeAnswer +"," + " incorrect" ;
                    $rootScope.questthreeCorrectAnswer = "Correct Answer is: b. fn.call(this, stringsArray)";
                    $location.path('/results/' );  
            }

            $rootScope.questfivetitle = 'Given <div id=”outer”><div class=”inner”></div></div>, which of these two is the most performant way to select the inner div?';
            var strquestfiveAnswer = $scope.questfive.value;                
            $rootScope.questfiveanswer = strquestfiveAnswer;
            if (strquestfiveAnswer == 'b. getElementsByClassName("inner")[0]'){                                
                    points = parseInt(points) + 1;
                    $rootScope.questfiveresult = "Your Answer " + strquestfiveAnswer + "," + " correct" ;
                    $rootScope.questfiveCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questfiveresult = "Your Answer " + strquestfiveAnswer +"," + " incorrect" ;
                    $rootScope.questfiveCorrectAnswer = 'Correct Answer is: b. getElementsByClassName("inner")[0]';
                    $location.path('/results/' );  
            }

            $rootScope.questsixtitle = 'Which message will be returned by injecting this service and executing “myService.getMessage()”';
            var strquestsixAnswer = $scope.questsix.value;                
            $rootScope.questsixanswer = strquestsixAnswer;
            if (strquestsixAnswer == 'c. 3'){                                
                    points = parseInt(points) + 1;
                    $rootScope.questsixresult = "Your Answer " + strquestsixAnswer + "," + " correct" ;
                    $rootScope.questsixCorrectAnswer = "";                    
                    $location.path('/results/' );                   
                }
            else {                    
                    $rootScope.questsixresult = "Your Answer " + strquestsixAnswer +"," + " incorrect" ;
                    $rootScope.questsixCorrectAnswer = 'Correct Answer is: c. 3';
                    $location.path('/results/' );  
            }                        
            var score = parseInt(points)*20;
            $rootScope.totalscore = parseInt(score);            
            
    };  

}]);

myapp.controller('resultsController', ['$scope', '$http', '$location', '$rootScope', 'UserService', function($scope, $http, $location, $rootScope, User ) {
    init();
    function init() {
        if (User.isLogged == false)
                { $location.path('/login/'); }
        else
            { 
                $scope.displayloginuser = $rootScope.welcomeuser;                
                $scope.questonetitle =  $rootScope.questonetitle;     
                $scope.questoneanswer =  $rootScope.questoneanswer;
                $scope.questoneresult =  $rootScope.questoneresult;
             }    
    }

    $scope.logout = function () {
        User.isLogged = false;                       
        $location.path('/login/');                
    };

}]);



