define(['userManagement/scripts/controllers/controllers',
        'userManagement/scripts/services/usersService'],
    function (controllers)
{
        controllers.controller('usersController', ['$scope', 'usersService',
        function ($scope, usersService)
        {
            this.selectedPrimaryUser;
            this.userList = usersService.getAllUsers();

            this.selectPrimaryUser = selectUser;

            function selectUser(user) 
            {
                this.selectedPrimaryUser = user;
            }
      
        }]);
});