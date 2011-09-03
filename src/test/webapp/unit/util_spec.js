describe("util", function () {

    var fixture;

    describe("for parseFloat", function() {
        it("should return undefined for undefined", function () {
            expect(util.parseFloat(undefined)).not.toBeDefined();
        });

        it("should return 0 for empty string", function () {
            expect(util.parseFloat('')).toEqual(0);
        });

        it("should return the number for number strings", function () {
            expect(util.parseFloat('1.5')).toEqual(1.5);
        });

        it("should return the number from a string with numbers and characters", function () {
            expect(util.parseFloat('asdf1.5asdf')).toEqual(1.5);
        });
    });

    describe("for opacity", function() {

        var field, fieldId;

        beforeEach(function () {
            fieldId = "fieldId";
            fixture = "<div id='" + fieldId + "'>Hallo</div>";
            setFixtures(sandbox(fixture));
            field = document.getElementById(fieldId);
        });

        it("should initially have a defined value", function () {
            expect(util.opacity(field)).toBeDefined();
        });

        it("should save a value other than 1", function () {
            util.opacity(field, 0.5);
            expect(util.opacity(field)).toEqual(0.5);
        });

        it("should save 0 as value", function () {
            util.opacity(field, 0);
            expect(util.opacity(field)).toEqual(0);
        });
    });
});