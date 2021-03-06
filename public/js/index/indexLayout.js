window.onload = function() {
    //declare raphael canvas
    var paper = new Raphael(document.getElementById('canvasContainer'), document.getElementById('canvasContainer').width, document.getElementById('canvasContainer').height);
    var timeout;
    var fontSize = paper.height*.05;

//Draw in the radial buttons
    //define points to base the buttons on
    var centerX = paper.width*0.5;
    var centerY = paper.height*0.5;
    var top = 0;
    var bottom = paper.height;
    var right = paper.width;
    var left = 0;
    var y1 = paper.height*0.1;
    var y2 = paper.height*0.9;
    //extra points for text placement
    var quarterLeft = paper.width*0.30;
    var quarterRight = paper.width*0.70;
    var sixthLeft = paper.width*0.15;
    var sixthRight = paper.width*0.85;

    //set labels
    var newsfeed = paper.text(quarterLeft, y1, "Newsfeed");
    var messaging = paper.text(quarterRight, y1, "Messaging");
    var status = paper.text(sixthLeft, centerY, "Status");
    var profile = paper.text(sixthRight, centerY, "Profile");
    var photos = paper.text(quarterLeft, y2, "Photos");
    var logout = paper.text(quarterRight, y2, "Logout");
    //set label styles
    var labelSet = paper.set();
    labelSet.push(newsfeed, messaging, status, profile, photos, logout);
    labelSet.attr(
        {
            "font-family": "Helvetica",
            "font-size": fontSize,
            fill: "#000",
            "pointer-events": "none"
        }
    )

    //set arrow width/height
    var ArrowWH = paper.width*0.027;
    //set arrows
    var nwArrow = paper.image("../../images/indexImages/LeftButton.svg", centerX-paper.width*0.15, centerY-paper.width*0.183, ArrowWH, ArrowWH);
    jQuery(nwArrow.node).prop('preserveAspectRatio').baseVal.align = 6;
    jQuery(nwArrow.node).prop('preserveAspectRatio').baseVal.meetOrSlice = 1;
    var neArrow = paper.image("../../images/indexImages/LeftButton.svg", centerX+paper.width*0.122, centerY-paper.width*0.183, ArrowWH, ArrowWH);
    var wArrow = paper.image("../../images/indexImages/LeftButton.svg", centerX-paper.width*0.23, centerY-paper.width*0.013, ArrowWH, ArrowWH);
    var eArrow = paper.image("../../images/indexImages/LeftButton.svg", centerX+paper.width*0.202, centerY-paper.width*0.013, ArrowWH, ArrowWH);
    var swArrow = paper.image("../../images/indexImages/LeftButton.svg", centerX-paper.width*0.15, centerY+paper.width*0.155, ArrowWH, ArrowWH);
    var seArrow = paper.image("../../images/indexImages/LeftButton.svg", centerX+paper.width*0.122, centerY+paper.width*0.155, ArrowWH, ArrowWH);
    nwArrow.transform("r50");
    neArrow.transform("r130");
    eArrow.transform("r180");
    swArrow.transform("r-50");
    seArrow.transform("r-130");
    //preserve arrow svg aspect ratio
    var arrowSet = paper.set();
    arrowSet.push(nwArrow, neArrow, wArrow, eArrow, swArrow, seArrow);
    arrowSet.forEach(function(e){
        jQuery(e.node).prop('preserveAspectRatio').baseVal.align = 6;
        jQuery(e.node).prop('preserveAspectRatio').baseVal.meetOrSlice = 1;
    });

    //define main button paths
    var northWest = paper.path("M "+centerX+" "+centerY+" "/**/+left+" "+y1+" "/**/+left+" "+top+" "/**/+centerX+" "+top+" "/**/+centerX+" "+centerY+" z");
    var northEast = paper.path("M "+centerX+" "+centerY+" "/**/+right+" "+y1+" "/**/+right+" "+top+" "/**/+centerX+" "+top+" "/**/+centerX+" "+centerY+" z");
    var West = paper.path("M "+centerX+" "+centerY+" "/**/+left+" "+y1+" "/**/+left+" "+y2+" "/**/+centerX+" "+centerY+" z");
    var East = paper.path("M "+centerX+" "+centerY+" "/**/+right+" "+y1+" "/**/+right+" "+y2+" "/**/+centerX+" "+centerY+" z");
    var southWest = paper.path("M "+centerX+" "+centerY+" "/**/+left+" "+y2+" "/**/+left+" "+bottom+" "/**/+centerX+" "+bottom+" "/**/+centerX+" "+centerY+" z");
    var southEast = paper.path("M "+centerX+" "+centerY+" "/**/+right+" "+y2+" "/**/+right+" "+bottom+" "/**/+centerX+" "+bottom+" "/**/+centerX+" "+centerY+" z");
    //add all buttons to a set
    var buttonSet = paper.set();
    buttonSet.push(northWest, northEast, West, East, southWest, southEast);
    //add a fill and stroke
    buttonSet.attr(
        {
            fill: '#eee', 
            opacity: .5, 
            stroke: '#000', 
            'stroke-width': .25
        }
    );
    //set mouse interactivity
    buttonSet.forEach(function(e){
        e.mouseover(function(f){
            console.log(e);
            timeout = setTimeout(function(){
                console.log('dwell activated');
        
                    //e.css('cursor','pointer');
                    if (e.id == 12) {
                        console.log('newsfeed was clicked');
                        goto('newsfeed');
                    } else if (e.id == 13) {
                        console.log('messaging was clicked');
                        goto('messaging');
                    } else if (e.id == 14) {
                        console.log('status was clicked');
                        goto('status');
                    } else if (e.id == 15) {
                        console.log('profile was clicked');
                        goto('me/profile');
                    } else if (e.id == 16) {
                        console.log('photos was clicked');
                        goto('me/photos');
                    } else if (e.id == 17) {
                        console.log('logout was clicked');
                        performLogout();
                    } else {
                        console.log('unknown ID clicked');
                    }
            }, 1000);
            e.animate({
                fill: '#038'
            }, 1000);
        })
    })
    buttonSet.mouseout(
        function(e) {
            buttonSet.attr(
                {
                    fill: '#eee',
                }
            );
            if (timeout){
                clearTimeout(timeout);
            }   
            buttonSet.stop();
        }
    )

    //define guide circle
    var circle = paper.circle(centerX, centerY, paper.width*0.2);
    circle.attr(
        {
            fill: '#fff',
            stroke: '#ddd', 
            'stroke-width': .5
        }
    );

    //defuine icon width/height
    var iconWH = paper.width*0.05;
    //add icons
    var newsfeedIcon = paper.image("../../images/indexImages/newsfeedIcon.png", centerX-paper.width*0.12, centerY-paper.width*0.15, iconWH, iconWH);
    var messagingIcon = paper.image("../../images/indexImages/messagingIcon.png", centerX+paper.width*0.06, centerY-paper.width*0.145, iconWH, iconWH);
    var statusIcon = paper.image("../../images/indexImages/statusIcon.png", centerX-paper.width*0.18, centerY-paper.width*0.025, iconWH, iconWH);
    var profileIcon = paper.image("../../images/indexImages/profileIcon.png", centerX+paper.width*0.13, centerY-paper.width*0.028, iconWH, iconWH);
    var photosIcon = paper.image("../../images/indexImages/photosIcon.png", centerX-paper.width*0.11, centerY+paper.width*0.105, iconWH, iconWH);
    var logoutIcon = paper.image("../../images/indexImages/logoutIcon.png", centerX+paper.width*0.065, centerY+paper.width*0.105, iconWH, iconWH);
}
