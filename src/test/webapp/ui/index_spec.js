describe("index", function () {
    it("should fade the hello div in when the button is clicked", function () {
        var win, field, button;
        loadHtml("/js-fadein/index.html");
        runs(function() {
            win = testwindow();
            field = win.document.getElementById('hello');
            button = win.document.getElementById('fadein');
        });
        runs(function () {
            expect(win.util.opacity(field)).toEqual(0);
            jasmine.ui.simulate(button, 'click');
        });
        waitsForAsync();
        runs(function () {
            expect(win.util.opacity(field)).toEqual(1);
        });
    });
});
