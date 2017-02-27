define(['userManagement/scripts/services/services'], function (services)
{
    services.factory('usersService', ['$http', '$q', function ($http, $q)
    {
        var usersServiceFactory = {};

        var _getAllUsers = function() 
        {
            var userList = new Array();
            userList.push({ firstName: 'Resident', lastName: 'Residentsky', userName: 'r@residentov.com', isActive: true });
            userList.push({ firstName: 'CAT01', lastName: 'Tri01', userName: 'xx@666.net', isActive: true });
            userList.push({ firstName: 'CAT02', lastName: 'Tri01', userName: 'xx1@666.net', isActive: false });
            userList.push({ firstName: 'President', lastName: 'Residentsky', userName: 'p@pres.com', isActive: true });
            userList.push({ firstName: 'Res', lastName: 'Precep', userName: 'r@precptor.com', isActive: false });
            userList.push({ firstName: 'PRes', lastName: 'Precep', userName: 'pr@precptor.com', isActive: false });

            return userList;
        }
       
        usersServiceFactory.getAllUsers = _getAllUsers;
     

        return usersServiceFactory;
    }])
})