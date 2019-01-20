        var lat = 12.9794;
        var lng = 77.5910;
        var url_result;

        var all_result = [];
        var show_marker = new Array();
        var map;
        
        var geocode_api_url= "https://apis.mapmyindia.com/advancedmaps/v1/q3i84njiznct1jvuk5aj1l76s1m8unsw/geo_code?";
        window.onload = function() {
        
        // var centre = new L.LatLng(12.9794,77.5910);
        map=new MapmyIndia.Map('map-container1',{zoomControl: true,hybrid:true });
        
        get_geocode_result();
        };

        /*function to get geocode result from the url*/
        function get_geocode_result()
        {
            var search_id = document.getElementById('search');
            if (search_id.value == '') {
                search_id.focus();
                return false;
            }
            var region = document.getElementById('region').value;
            if(region!='')
        	{
        	   region="&region="+region;
            }
            var pincode = 560043;
            if(pincode!=560043)
            {
	           pincode="&pincode="+pincode;
   	        }
            document.getElementById('result').innerHTML = '<div style="padding: 0 12px; color: #777">Loading..</div>';/*update best result */
            // document.getElementById('otherresult').innerHTML = '<div style="padding: 0 12px; color: #777">Loading..</div>';/*update other result */
            var geocode_api_url_with_param = geocode_api_url +"addr=" + search_id.value.replace(/\s/g, "+");
            getGeoResult(geocode_api_url_with_param);/*get JSON resp*/
        }

        /*function to get Json response from the url*/
        function getGeoResult(api_url) {
            // console.log(api_url);
            $.ajax({
                type: "GET",
                dataType: 'json',
                url: JSON.stringify(api_url).split("\"")[1],
                async: false,
                data: {
                    url: JSON.stringify(api_url).split("\"")[1]
                },

                success: function (result) {
                     var resdata = result;
                     // console.log(resdata);
                    
                    var jsondata = resdata;
                    
                   
                    if (jsondata.responseCode == 200) {
                        /*success*/
                        display_geocode_result(jsondata.results);/*display results on success*/
                    }
                    /*handle the error codes and put the responses in divs more error codes can be seen in the documentation*/
                    else{
                        var error_response="No Result"
                        document.getElementById('result').innerHTML = error_response + '</ul></div>';/***put response result in div****/
                        // document.getElementById('otherresult').innerHTML = "" + '</ul></div>';/***put response result in div****/
                    }
                
                    //  else{
                    //   var error_response="No Response from API Server. kindly check the keys or request server url";
                    // document.getElementById('result').innerHTML = error_response + '</ul></div>';/***put response result in div****/
                        // document.getElementById('otherresult').innerHTML = "" + '</ul></div>';/***put response result in div****/
                    

                
                }
            });
        }

        /*function to display geocode result*/
        function display_geocode_result(data)
        {
            details = [];
            remove_markers();/***********remove existing marker from map**/
            var result_string = '<div style="padding: 0 12px;color:green;font-size:13px">Best Match</div><div style="font-size: 13px"><ul style="list-style-type:decimal;color:green; padding:2px 2px 0 30px">';
            var other_result_string = '<div style="padding: 0 12px;color:green;font-size:13px">Others </div><div style="font-size: 13px"><ul style="list-style-type:decimal; padding:2px 2px 0 30px">';
            var num = 1;
            var item=data[0];
            var otheritem=data;

            /*show the best item data*/
            if (item!='' && item !=null && item!="undefined" ){

                var lng = item.lng;
                var lat = item.lat;
                var address = item.formatted_address;
                var pos = new L.LatLng(lat, lng);/***position of marker*****/
                show_mark(num, pos, address);/**display markers***/
                var content = new Array();
                if (item.city != '')
                    content.push('<tr><td style="white-space:nowrap">City</td><td width="10px">:</td><td>' + item.city + '</td></tr>');
                if (item.district != '')
                    content.push('<tr><td style="white-space:nowrap">District</td><td width="10px">:</td><td>' + item.district + '</td></tr>');
                if (item.subDistrict != '')
                    content.push('<tr><td style="white-space:nowrap">subDistrict</td><td width="10px">:</td><td>' + item.subDistrict + '</td></tr>');
                if (item.state != '')
                    content.push('<tr><td style="white-space:nowrap">Area</td><td width="10px">:</td><td>' + item.state + '</td></tr>');
                if (item.houseName != '')
                    content.push('<tr><td style="white-space:nowrap">House Name</td><td width="10px">:</td><td>' + item.houseName + '</td></tr>');
                if (item.houseNumber != '')
                    content.push('<tr><td style="white-space:nowrap">House Number</td><td width="10px">:</td><td>' + item.houseNumber + '</td></tr>');
                if (item.locality != '')
                    content.push('<tr><td style="white-space:nowrap">Locality</td><td width="10px">:</td><td>' + item.locality + '</td></tr>');
                if (item.subLocality != '')
                    content.push('<tr><td style="white-space:nowrap">SubLocality</td><td width="10px">:</td><td>' + item.subLocality + '</td></tr>');
                if (item.subSubLocality != '')
                    content.push('<tr><td style="white-space:nowrap">subSubLocality</td><td width="10px">:</td><td>' + item.subSubLocality + '</td></tr>');
                if (item.pincode != '')
                    content.push('<tr><td style="white-space:nowrap">Pin</td><td width="10px">:</td><td>' + item.pincode + '</td></tr>');
                if (item.street != '')
                    content.push('<tr><td style="white-space:nowrap">Street</td><td width="10px">:</td><td>' + item.street + '</td></tr>');
                if (item.poi != '')
                    content.push('<tr><td style="white-space:nowrap">POI</td><td width="10px">:</td><td>' + item.poi + '</td></tr>');
                
                if (address != '')
                    content.push('<tr><td style="white-space:nowrap" valign="top">Formatted address</td><td width="10px" valign="top">:</td><td valign="top">' + address + '</td></tr>');
                details.push(content.join(""));
                console.log('Before Pass Values')
                pass_values(lat, lng);
                result_string += '<li onclick="show_geocode_details(' + (num++) + ',' + lng + ',' + lat + ')">' + address + '</li>';
                }
            else{
                var error_response="Not Found"
                document.getElementById('result').innerHTML = error_response + '</ul></div>';/***put response result in div****/   
            }

            /*show other item in other result*/
            var c=0;
            if (otheritem!='' && otheritem!=null && otheritem!="undefined" && otheritem.length>0){
                    otheritem.forEach(function (item){
                        if (c!=0){
                        other_result_string += '<li onclick="showotherplaces('+"'"+item.place_id+"'"+')">' + item.formatted_address + '</li>';    
                        }
                        c++;
                    });
            }
            else{
                var error_response="Not Found"
                document.getElementById('otherresult').innerHTML = error_response + '</ul></div>';/***put response result in div****/   
            }
           
            document.getElementById('result').innerHTML = result_string + '</ul></div>';/***put geocode result in div****/
            // document.getElementById('otherresult').innerHTML = other_result_string + '</ul></div>';/***put geocode result in div****/
            mapmyindia_fit_markers_into_bounds(); /***fit map in marker area***/
        }
        var marker = new Array();

        function showotherplaces(place_id){
            alert("To view this place; access the poi details API with the place_id :"+place_id);
        }
        function show_mark(num, pos, address){
            var icon_marker = L.divIcon({className: 'my-div-icon', html:"<img style='position:relative;width:35px;height:35px' src="+"'https://maps.mapmyindia.com/images/2.png'>" + '<span style="position: absolute;left:1.5em;right: 1em;top:0.9em;bottom:3.5em; font-size:9px;font-weight:bold;width: 1px; color:black;" class="my-div-span">'+ num +'</span>',  iconSize: [10,10]  ,popupAnchor:[12, -10]});/*creating a div icon*/
            marker[num] = L.marker(pos, {icon: icon_marker}).addTo(map);
            show_marker.push(marker[num]);
        }

        function show_geocode_details(num, lng, lat)
        {
            var pos1 = new L.LatLng(lat, lng);
            map.setView(pos1, 15);
            show_info_window(pos1, num - 1, marker[num]);
        }

        //Passing lat long to routing
        function pass_values(lat, lng)
        {
            remove_markers();
            console.log('In Pass Values');
            var points1 = new Array();
            var points2 = new Array();
            points1[0] = 12.9216;
            points1[1] = 77.6691;
            points2[0] = lat;
            points2[1] = lng;
            // show_markers('Start Point', points1)
            var destination_points = document.getElementById('destination');
            destination_points.value = lat + ',' + lng;
            console.log(destination_points.value)
            show_markers('Destination Point', points2);
            get_route_result();
        }

        /*function to show pop up on marker**/
        function show_info_window(pos, num, marker) {
            marker.bindPopup("");
            var popup = marker.getPopup();
            popup.setContent('<table style=\"width:350px;padding:10px;font-size: 10px;font-type: bold;\">' + details[num] + '</table>').update();
            marker.openPopup();
        }

        /*function to remove  marker from the map*/
        function remove_markers()
        {
            for (k = 0; k < show_marker.length; k++) {
                map.removeLayer(show_marker[k]);/*Remove markers from map*/
            }
        }

        /*function to fit the maps in the bounds of the marker*/
        function mapmyindia_fit_markers_into_bounds()
        {
            var group = new L.featureGroup(show_marker);
            map.fitBounds(group.getBounds());
        }
        function isNumber(evt) 
{
evt = (evt) ? evt : window.event;
var charCode = (evt.which) ? evt.which : evt.keyCode;
if (charCode > 31 && (charCode < 48 || charCode > 57)) {
	return false;
}
return true;
}