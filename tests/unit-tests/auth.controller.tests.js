describe('AuthController', function() {

    beforeEach(module('starter'));


    // instantiate the controller and mocks for every test
    beforeEach(inject(function($controller, $q) {
        deferredLogin = $q.defer();

        // mock dinnerService
        dinnerServiceMock = {
            login: jasmine.createSpy('login spy')
                .and.returnValue(deferredLogin.promise)
        };

        // mock $state
        stateMock = jasmine.createSpyObj('$state spy', ['go']);

        // mock $ionicPopup
        ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);

        // instantiate LoginController
        controller = $controller('LoginController', {
                '$ionicPopup': ionicPopupMock,
                '$state': stateMock,
                'DinnerService': dinnerServiceMock }
        );
    }));


    var controller,
        deferredLogin,
        dinnerServiceMock,
        stateMock,
        ionicPopupMock;

    // TODO: Load the App Module

    // TODO: Instantiate the Controller and Mocks

    describe('#doLogin', function() {

        // TODO: Call doLogin on the Controller

        it('should call login on dinnerService', function() {
            expect(dinnerServiceMock.login).toHaveBeenCalledWith('test1', 'password1');
        });

        describe('when the login is executed,', function() {
            it('if successful, should change state to my-dinners', function() {

                // TODO: Mock the login response from DinnerService

                expect(stateMock.go).toHaveBeenCalledWith('my-dinners');
            });

            it('if unsuccessful, should show a popup', function() {

                // TODO: Mock the login response from DinnerService

                expect(ionicPopupMock.alert).toHaveBeenCalled();
            });
        });
    })
});