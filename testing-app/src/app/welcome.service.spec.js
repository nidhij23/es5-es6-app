"use strict";
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var welcome_component_1 = require('./welcome.component');
var model_user_1 = require('./model-user');
describe('WelcomeComponent (Service Testing)', function () {
    //declaration
    var comp;
    var fixture;
    var de;
    var el;
    var userService;
    var userServiceStub = {
        isLoggedIn: true,
        user: { name: 'Test User' }
    };
    beforeEach(function () {
        // stub UserService for test purposes
        testing_1.TestBed.configureTestingModule({
            declarations: [welcome_component_1.WelcomeComponent],
            providers: [{ provide: model_user_1.UserService, useValue: userServiceStub }]
        });
        fixture = testing_1.TestBed.createComponent(welcome_component_1.WelcomeComponent);
        comp = fixture.componentInstance;
        // UserService from the root injector
        userService = testing_1.TestBed.get(model_user_1.UserService);
        //  get the "welcome" element by CSS selector (e.g., by class name)
        de = fixture.debugElement.query(platform_browser_1.By.css('.welcome'));
        el = de.nativeElement;
    });
    it('should welcome the user', function () {
        fixture.detectChanges();
        var content = el.textContent;
        expect(content).toContain('Welcome', '"Welcome ..."');
        expect(content).toContain('Test User', 'expected name');
    });
    it('should welcome "Bubba"', function () {
        userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
        fixture.detectChanges();
        expect(el.textContent).toContain('Bubba');
    });
    it('should request login if not logged in', function () {
        userService.isLoggedIn = false; // welcome message hasn't been shown yet
        fixture.detectChanges();
        var content = el.textContent;
        expect(content).not.toContain('Welcome', 'not welcomed');
        expect(content).toMatch(/log in/i, '"log in"');
    });
});
//# sourceMappingURL=welcome.service.spec.js.map