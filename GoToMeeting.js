var SystemEvents = Application("System Events");

function GoToMeeting() {

    var app = null

    this.isRunning = function() {
        return (SystemEvents.processes.whose({
            name: 'GoToMeeting'
        }).length > 0)
    }

    this.startApp = function() {
        app = Application('GoToMeeting');
        app.activate();
    }


    this.startMeeting = function() {
        var Dock = SystemEvents.processes["Dock"];
        var Go = null;

        for (var k in Dock.lists[0].uiElements) {

            if (Dock.lists[0].uiElements[k].name().indexOf("GoToMeeting") > -1) {
                Go = Dock.lists[0].uiElements[k];
                break;
            }

        }

        if (Go) {
            Go.actions["AXShowMenu"].perform();
            Go.menus[0].menuItems["Join..."].click();
            Go.click();

            delay(2);
            SystemEvents.keyCode(19);
            SystemEvents.keyCode(21);
            SystemEvents.keyCode(19);
            SystemEvents.keyCode(20);
            SystemEvents.keyCode(25);
            SystemEvents.keyCode(28);
            SystemEvents.keyCode(25);
            SystemEvents.keyCode(28);
            SystemEvents.keyCode(18);
            SystemEvents.keyCode(76);
        }

    }
}

function muteSystem(state) {
    var app = Application.currentApplication();
    app.includeStandardAdditions = true

    if (state) {
        app.doShellScript("osascript -e 'set volume with output muted'");
    } else {
        app.doShellScript("osascript -e 'set volume without output muted output volume 100 --100%'");
    }

}

(function() {
    var go = new GoToMeeting();


    while (1) {
        if (!go.isRunning()) {

            muteSystem(true);
            go.startApp();
            delay(3);
            go.startMeeting();
            delay(5);
            muteSystem(true);
            delay(15);
            muteSystem(false);
        }

        delay(5)
    }
})()