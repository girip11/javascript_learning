//import m from "mithril";
//var m = require("mithril");
var contentRoot = document.body;
m.render(contentRoot, m("button", {
    onclick: trackClicks
}, "click me"));

/*var homeComp = {
    view: function () {
        return m("a", {
            href: "#!/content"
        }, "Go to content");
    }

}

var divComp = {
    view: function () {
        var heading = m("h1", "Hello World");

        var paragraph = m("p", {
            id: "para",
            style: {
                "font-size": "16px",
                "font-style": "italic"
            }
        }, "This is my first Mithril application");

        var button = m("button", {
                class: "btn-small",
                onclick: trackClicks
            },
            "Random gen click");
        var div = m("div", {
            class: "container",
            style: {
                border: "1px solid red",
            }
        }, [heading, paragraph, button]);

        return m("main", {
            class: "content"
        }, div);
    }

}*/


function getClicksCount(id) {
    var count = 0;
    m.request({
        url: "http://rem-rest-api.herokuapp.com/api/clicks/" + id,
        method: "GET",
        withCredentials: true,
    }).then(function (data) {
        console.log(data);
        count = parseInt(data.count);
    })

    return count;
}


function trackClicks() {
    //var countValue = getClicksCount(1);
    //console.log("Count" + countValue);

    m.request({
        method: "POST",
        url: "http://rem-rest-api.herokuapp.com/api/clicks/",
        data: {
            count: 1
        },
        withCredentials: true,
    }).then(function (data) {
        console.log(data);
        //document.getElementById("para").innerHTML = "Click count is:" + data.count;
    })
}

//m.mount(contentRoot, divComp);
// m.route(contentRoot, "/home", {
//     "/home": homeComp,
//     "/content": divComp
// })