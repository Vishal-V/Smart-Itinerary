    var url_result;
        var marker = new Array();
        var all_result = [];
        var map;
    	var map = null;
    	var show_marker = new Array();
    	var polygons = [];
    	var polygon ='';
    	var visbility = false;
    	var p1 = null;
    	var poly;
    	var pts;

        function auth() {
             $.ajax({
                type: "POST",
                dataType: 'json',
                url: 'https://outpost.mapmyindia.com/api/security/oauth/token'
                async: false,
                data: {
                    
                    https://atlas.mapmyindia.com/api/places/nearby/json?

                },
                success: function (result) {
                    var resdata = JSON.parse(result);
                    var jsondata;
                    console.log(resdata);
        }

    	function loadMap()
    	{
    		var centre = new L.LatLng(12.9216,77.6691);
    		map = new MapmyIndia.Map('map-container', {center: centre, editable: true,zoomControl: true,search:false, hybrid: true});
    		 /***function that modifies both center map position and zoom level.***/
    		map.setView(centre, 4);
    		var i=0;
    		var secureThisArea=Array();
    		map.on('click', function(e) {
    			var m=[];
    			var val=document.getElementById('radius').value;
    			if(val=='')
    			{
    				m[0]=parseFloat(e.latlng.lat).toFixed(6);
    				m[1]=parseFloat(e.latlng.lng).toFixed(6);;
    				secureThisArea[i]= m;//e.latlng.lat + ", " + e.latlng.lng;
    				createpoly(secureThisArea);
    				i++;
    			}
    			});
    	}

    function createpoly(secureThisArea){

    var val=document.getElementById('radius').value;
    if(val=='')
    {
    	var latlngs = secureThisArea;//[[28.7041, 77.1025], [28.6692, 77.4538]];
    	polygon = L.polygon(latlngs, {color: 'blue'});
    	map.addLayer(polygon);
    	// zoom the map to the polygon
    	var bounds = polygon.getBounds();
    	
    	console.log(polygon.getBounds());
    	//console.log(bounds.getNorthEast().lat+","+bounds.getNorthEast().lng+";"+bounds.getSouthWest().lat+","+bounds.getSouthWest().lng);
    	//document.getElementById('bounds').value=bounds.getNorthEast().lat+","+bounds.getNorthEast().lng+";"+bounds.getSouthWest().lat+","+bounds.getSouthWest().lng;
    	document.getElementById('bounds').value=bounds.getNorthWest().lat+","+bounds.getNorthWest().lng+";"+bounds.getSouthEast().lat+","+bounds.getSouthEast().lng;
    	document.getElementById('radius').disabled=true;
    }
    }		
    		



        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
                x.innerHTML = "Geolocation is not supported by this browser.";
            }

            function showPosition(position) {
                document.getElementById('lan').value = position.coords.longitude;
                document.getElementById('lat').value = position.coords.latitude;
            }
    	
        $('.srch_dv').hide();

        /***
         1. Create a MapmyIndia Map by simply calling new MapmyIndia.Map() and passing it a html div id, all other parameters are optional...
         2. All leaflet mapping functions can be called simply by using "L" object.
         3. In future, MapmyIndia may extend the customised/forked Leaflet object to enhance mapping functionality for developers, 
         which will be clearly documented in the MapmyIndia API documentation section.
         ***/

        /*function to get geocode result from the url*/
        function get_near_by_result(lat, lng, searchmethod,page,sort,radius,bounds,region) {
    		
            var keyword = document.getElementById('keyword');
            if (searchmethod == 'searchbykeyword') {
                if (keyword.value == '') {
                    keyword.focus();
                    return false;
                }
            }
            document.getElementById('result').innerHTML = '<div style="padding: 0 12px; color: #777">Loading..</div>';
                /*get JSON resp*/
                if(lat=='' || lng=='')
                {
                    var map_center = map.getCenter();
                    getUrlResults(keyword.value, map_center.lat, map_center.lng,page,sort,radius,bounds,region);
                }
                else
                {
                    getUrlResults(keyword.value, lat, lng,page,sort,radius,bounds,region);   
                }
        }
        /*function to get json response from the url*/
        function getUrlResults(keyword, lat, lng,page,sort,radius,bounds,region) {
            remove_btn();
            add_btn(lat, lng);

            $.ajax({
                type: "GET",
                dataType: 'json',
                url: 'https://atlas.mapmyindia.com/api/places/nearby/json?' + JSON.stringify(keyword),
                async: false,
                data: {
                    query: JSON.stringify(keyword),
                    current_lat: JSON.stringify(lat),
                    current_lng: JSON.stringify(lng),
    				page: JSON.stringify(page),
                    sort: JSON.stringify(sort),
                    radius: JSON.stringify(radius),
    				bounds: JSON.stringify(bounds),
                    region: JSON.stringify(region)
                    // https://atlas.mapmyindia.com/api/places/nearby/json?

                },
                success: function (result) {
                    var resdata = JSON.parse(result);
                    var jsondata;
                    console.log(resdata);
                    if (resdata.status == 'success') {
                        try {
                            jsondata = JSON.parse(resdata.data);
                        } catch (e) {
                            var error_response = "No Result"
                            document.getElementById('result').innerHTML = error_response + '</ul></div>';
                            return false;
                        }

                        if (jsondata.suggestedLocations.length > 0) {
                            /*success*/
                            display_near_by_result(jsondata.suggestedLocations,jsondata.pageInfo);/*display results on success*/
                        }
                        /*handle the error codes and put the responses in divs.Error codes can be found in the documentation*/
                        else {
                            var error_response = "No Result"
                            document.getElementById('result').innerHTML = error_response + '</ul></div>';/***put response result in div****/
                        }
                    } else {
                        var error_message = resdata.data;
                        document.getElementById('result').innerHTML = error_message + '</ul></div>';/***put response result in div****/
                        remove_markers();
                    }
                }
            });
        }
        /*function to display geocode result*/
        function display_near_by_result(data,page) {
            details = [];
            remove_markers();/***********remove existing marker from map**/
            var result_string = '<div style="padding: 0 12px;color:green;font-size:13px">POI</div><div style="font-size: 13px">\n\
                    <ul style="list-style-type:decimal;color:green; padding:2px 2px 0 30px">';
            var num = 1;
            /*show the item data*/
    		//alert(page.totalPages);
    		//alert(page.pageSize);
    		document.getElementById('allPages').innerHTML ="/"+page.totalPages ;
            data.forEach(function (item) {
                if (item != '' && item != null && item != "undefined") {
                    var lng = item.longitude;
                    var lat = item.latitude;
                    var pos = new L.LatLng(lat, lng);/***position of marker*****/
                    var content = new Array();
                    if (item.eLoc != '')
                        content.push('<tr><td style="white-space:nowrap">eLoc</td><td width="10px">:</td><td>' + item.eLoc + '</td></tr>');
                    if (item.placeName != '')
                        content.push('<tr><td style="white-space:nowrap">placeName</td><td width="10px">:</td><td width="70%" style="word-wrap: break-word;">' + item.placeName + '</td></tr>');
                    if (item.placeAddress != '')
                        content.push('<tr><td style="white-space:nowrap">placeAddress</td><td width="10px">:</td><td style="width: 75% !important; word-wrap: break-word;">' + item.placeAddress + '</td></tr>');
                    if (item.type != '')
                        content.push('<tr><td style="white-space:nowrap">type</td><td width="10px">:</td><td>' + item.type + '</td></tr>');
                    if (item.latitude != '')
                        content.push('<tr><td style="white-space:nowrap">latitude</td><td width="10px">:</td><td>' + item.latitude + '</td></tr>');
                    if (item.longitude != '')
                        content.push('<tr><td style="white-space:nowrap">longitude</td><td width="10px">:</td><td>' + item.longitude + '</td></tr>');
                    if (item.distance != '')
                        content.push('<tr><td style="white-space:nowrap">distance</td><td width="10px">:</td><td>' + item.distance + '</td></tr>');
                    details.push(content.join(""));
                    
                    show_markers(num, pos);/**display markers***/
                    result_string += '<li onclick="show_place_details(' + (num++) + ',' + lng + ',' + lat + ')">' + item.placeName + '  ('+item.distance+')'+'</li>';
                } else {
                    var error_response = "Not found.";
                    document.getElementById('result').innerHTML = error_response + '</ul></div>';/***put response result in div****/
                }
            });
            document.getElementById('result').innerHTML = result_string + '</ul></div>';/***put geocode result in div****/
            mapmyindia_fit_markers_into_bound(); /***fit map in marker area***/
        }

        function show_markers(num, pos) {
            if(num>9)
            {
                var icon = L.divIcon({
                    className: 'my-div-icon',
                    html: "<img class='map_marker'  src=" + "'https://maps.mapmyindia.com/images/2.png'>" + '<span class="my-div-span" style="left:1.3em !important;">' + (num) + '</span>',
                    iconSize: [10, 10],
                    popupAnchor: [12, -10]
            });
            }else
            {
                var icon = L.divIcon({
                    className: 'my-div-icon',
                    html: "<img class='map_marker'  src=" + "'https://maps.mapmyindia.com/images/2.png'>" + '<span class="my-div-span" style="left:1.6em; top:1.4em;">' + (num) + '</span>',
                    iconSize: [10, 10],
                    popupAnchor: [12, -10]
                });
            }/*function that creates a div over a icon and display content on the div*/

            marker[num] = L.marker(pos, {icon: icon}).bindPopup(createPopup(num - 1)).addTo(map);
            show_marker.push(marker[num]);
        }

        function show_place_details(num, lng, lat) {
            var pos1 = new L.LatLng(lat, lng);
            map.setView(pos1, 18);
            show_info_window(pos1, num - 1, marker[num]);
        }

        /*function to show pop up on marker**/
        function show_info_window(pos, num, marker) {
            marker.bindPopup("");
            var popup = marker.getPopup();
            popup.setContent(createPopup(num)).update();
            marker.openPopup();
        }

        function createPopup(num) {
            return '<table class="popup-tab">' + details[num] + '</table>';
        }
        /*function to remove  marker from the map*/
        function remove_markers() {
            for (var k = 0; k < show_marker.length; k++) {
                map.removeLayer(show_marker[k]);/*Remove markers from map*/
            }
        }
        /*function to fit the maps in the bounds of the marker*/
        function mapmyindia_fit_markers_into_bound() {
            var group = new L.featureGroup(show_marker);
            map.fitBounds(group.getBounds());
        }
        /*function to remove  current location from the map*/
        function remove_btn(){
            if($('.leaflet-marker-pane > div').length >1){
                $('.leaflet-marker-pane').find('div').remove();
            }
            else{
                $('.leaflet-marker-pane').find('div').first().remove();
            }
        }
        /*function to add  current loaction to the map*/
        function add_btn(lat, lng){
            var btn=L.divIcon({className:'',html:"<img src='https://maps.mapmyindia.com/images/current_location.png' height='30px'>"});

            var cr=L.marker([lat, lng], {icon: btn});
            map.addLayer(cr);
            map.setView(new L.LatLng(lat,lng), 15);
        }
    	 function isPointInLayer(pt, layer) {
    		var within = false;
    		var x = pt.lat, y = pt.lng;
    		for (var ii = 0; ii < layer.getLatLngs().length; ii++) {
    			var polyPoints = layer.getLatLngs()[ii];
    			for (var i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    				var xi = polyPoints[i].lat, yi = polyPoints[i].lng;
    				var xj = polyPoints[j].lat, yj = polyPoints[j].lng;

    				var intersect = ((yi > y) != (yj > y))
    						&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    				if (intersect)
    					within = !within;
    			}
    		}
    		return within;
    	};
    	function isNumber(evt) {
    		evt = (evt) ? evt : window.event;
    		var charCode = (evt.which) ? evt.which : evt.keyCode;
    		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    			return false;
    		}
    		
    		if(charCode!='')
    		{
    			document.getElementById('bounds').disabled = true;
    		}
    		else if(charCode==''){
    			document.getElementById('bounds').disabled = false;
    		}
    		return true;
    	}

    // 	document.getElementById('radius').addEventListener('keyup', function (event) {
    // 		//alert("ddd");
    // 		var val=document.getElementById('radius').value;
    // 		if(val=='')
    // 		{
    // 			document.getElementById('bounds').disabled = false;
    // 			document.getElementById('bounds').value = '';
    // 		}		
    // });	
    	// document.getElementById('bounds').addEventListener('keyup', function (event) {
    	// 	var val=document.getElementById('bounds').value;
    	// 	if(val=='')
    	// 	{
    	// 		document.getElementById('radius').disabled = false;
    	// 		map.remove(polygon);
    	// 		loadMap();
    	// 	}
    	// 	else{
    			
    	// 		document.getElementById('radius').disabled = true;
    	// 	}
    	// });
    	 