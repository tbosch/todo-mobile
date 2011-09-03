describe("fadein", function () {
    describe("for execute", function() {

        var field, setTimeoutSpy, opacitySpy;

        beforeEach(function () {
            field = "test";
            fadein = window.fadein;
            setTimeoutSpy = spyOn(window, 'setTimeout').andCallFake(function(callback) {
                callback();
            });
            opacitySpy = spyOn(util, 'opacity');
        });

        it("should set the opacity to 1 in the end", function () {
            fadein.execute(field);
            expect(opacitySpy.mostRecentCall.args[1]).toEqual(1);
        });

        it("should call opacity with range from 0 to 1 in steps of 0.01", function () {
            fadein.execute(field);
            expect(opacitySpy.callCount).toEqual(100);
            for (var i=0; i<100; i++) {
                expect(opacitySpy.argsForCall[i][0]).toBe(field);
                expect(opacitySpy.argsForCall[i][1]).toEqual((i+1)/100);

            }
        });
    });
});