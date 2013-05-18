require.config( {

	urlArgs: "bust=" +  Date.now(),

	paths: {
		text: "libs/require/plugin.text",
		dat: "libs/dat"
	}

} );

require( [ "spread/Controller" ], function( Controller ) {

	var container = document.getElementById( "container" );
	var tag = document.getElementById( "tag" );

	initListeners();
	setTag();

	function setTag() {
		tag.className = "before in";

		setTimeout( function() {
			tag.className = "";
		}, 300 );
	}

	function initListeners() {

		document.addEventListener( "mousedown", onClick, false );
		document.addEventListener( "touchstart", onTouchEnd, false );

	}

	function onClick( event, xcord, ycord ) {

		var div = document.createElement( "div" );

		var size = {
			width: window.innerWidth,
			height: window.innerHeight
		}

		var position;
		if(xcord){
			position = {
				x: xcord,
				y: ycord
			}

		}
		else{
			if(event.pageX == 0){
				return;
			}
			else{
				position = {
					x: event.pageX,
					y: event.pageY
				}
			}
		}

		var controller = new Controller( div, size, position );

		controller.onComplete( function() {

			document.body.style.backgroundColor = controller.getColor();
			container.removeChild( div );

		} );

		container.appendChild( div );

	}

	function onTouchEnd( event ) {

		var touch = event.touches[ 0 ];

		event.pageX = touch.pageX;
		event.pageY = touch.pageY;

		onClick( event );
	}

// var w = window,
//     d = document,
//     e = d.documentElement,
//     g = d.getElementsByTagName('body')[0],
//     x = w.innerWidth || e.clientWidth || g.clientWidth,
//     y = w.innerHeight|| e.clientHeight|| g.clientHeight;
//alert(window.innerWidth);
w = window.innerWidth;
halfwidth = w/2;

init_animation = function () { onClick( event, halfwidth, 1 ); }

} );