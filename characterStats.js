/*!
 * Sections of code from https://github.com/jimpurbrick/crestexplorerjs
 *  Copyright 2012, CCP (http://www.ccpgames.com)
 *  Dual licensed under the MIT or GPL Version 2 licenses.
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.opensource.org/licenses/GPL-2.0
 *
 *  All other code is under the MIT license.
 *
*/


var endpoints;
var character;

(function ($, window, document) {

    "use strict";

    // Configuration parameters
    var redirectUri = "https://www.fuzzwork.co.uk/characterStats/";
    var clientId = "5658fad03e4d454a993ab8b9a314972d"; // OAuth client id
    var csrfTokenName = clientId + "csrftoken";
    var hashTokenName = clientId + "hash";
    var scopes = "characterStatsRead";
    var baseURL = "https://crest-tq.eveonline.com";

    function labelName(name) {
        return name.substring(0, 1) + name.substring(1).replace(/([a-z])?([A-Z])/g, "$1 $2");

    }


    function populateDivs() {

        var year=$("#year").val();
        $("#information").show();


        var fromdata=Array();
        var todata=Array();
        var deathdata=Array();
        var killdata=Array();
        var startdata=Array();
        var completedata=Array();
        var reprocessdata=Array();
        var miningdata=Array();
        var distancedata=Array();
        var docksdata=Array();
        var jumpsdata=Array();
        var warpsdata=Array();
        var activationsdata=Array();
       
        $("#characterName").text(character.characterName);
        $("#characterMinutes").text(character.aggregateYears[year].characterMinutes+" Minutes Played");
        $("#characterSessions").text(character.aggregateYears[year].characterSessionsStarted+" Logins");


        for (var key in character.aggregateYears[year]){
            if (character.aggregateYears[year][key]===0) {
                continue;
            }
            var myObj ={};
            var label;
            if (key.substr(0,23)=='combatDamageFromPlayers') {
                if (key.substr(-6)=='Amount' && character.aggregateYears[year][key]>0) {
                    label=labelName(key.substr(23));
                    myObj.value=character.aggregateYears[year][key];
                    myObj.label=label;
                    fromdata.push(myObj);
                    continue;
                }
            }
            if (key.substr(0,21)=='combatDamageToPlayers') {
                if (key.substr(-6)=='Amount' && character.aggregateYears[year][key]>0) {
                    label=labelName(key.substr(21));
                    myObj.value=character.aggregateYears[year][key];
                    myObj.label=label;
                    todata.push(myObj);
                    continue;
                }
            }
            if (key.substr(0,12)=='combatDeaths') {
                label=labelName(key.substr(12));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                deathdata.push(myObj);
                continue;
            }
            if (key.substr(0,11)=='combatKills') {
                label=labelName(key.substr(11));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                killdata.push(myObj);
                continue;
            }
            if (key.substr(0,19)=='industryJobsStarted') {
                label=labelName(key.substr(19));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                startdata.push(myObj);
                continue;
            }
            if (key.substr(0,21)=='industryJobsCompleted') {
                label=labelName(key.substr(21));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                completedata.push(myObj);
                continue;
            }
            if (key.substr(0,17)=='industryReprocess') {
                label=labelName(key.substr(17));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                reprocessdata.push(myObj);
                continue;
            }
            if (key.substr(0,9)=='miningOre') {
                label=labelName(key.substr(9));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                miningdata.push(myObj);
                continue;
            }
            if (key.substr(0,14)=='travelDistance') {
                label=labelName(key.substr(20));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                distancedata.push(myObj);
                continue;
            }
            if (key.substr(0,11)=='travelWarps') {
                label=labelName(key.substr(11));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                warpsdata.push(myObj);
                continue;
            }
            if (key.substr(0,11)=='travelJumps') {
                label=labelName(key.substr(11));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                jumpsdata.push(myObj);
                continue;
            }
            if (key.substr(0,11)=='travelDocks') {
                label=labelName(key.substr(11));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                docksdata.push(myObj);
                continue;
            }
            if (key.substr(0,17)=='moduleActivations') {
                label=labelName(key.substr(17));
                myObj.value=character.aggregateYears[year][key];
                myObj.label=label;
                activationsdata.push(myObj);
                continue;
            }
        }

        $("#from").empty();
        $("#to").empty();
        $("#deaths").empty();
        $("#kills").empty();
        $("#start").empty();
        $("#complete").empty();
        $("#reprocess").empty();
        $("#miningAmount").empty();
        $("#distance").empty();
        $("#docks").empty();
        $("#warps").empty();
        $("#jumps").empty();
        $("#activation").empty();


        Morris.Donut({element:'from',data:fromdata});
        Morris.Donut({element:'to',data:todata});
        Morris.Donut({element:'deaths',data:deathdata});
        Morris.Donut({element:'kills',data:killdata});
        Morris.Donut({element:'start',data:startdata});
        Morris.Donut({element:'complete',data:completedata});
        Morris.Donut({element:'reprocess',data:reprocessdata});
        Morris.Donut({element:"miningAmount",data:miningdata});
        Morris.Donut({element:"distance",data:distancedata});
        Morris.Donut({element:"docks",data:docksdata});
        Morris.Donut({element:"warps",data:warpsdata});
        Morris.Donut({element:"jumps",data:jumpsdata});
        Morris.Bar({element:"activation",data:activationsdata,xkey:'label',ykeys:['value'],labels:['Activations']});





    }












    // Show error message in main data pane.
    function displayError(error) {
        $("#data").children().replaceWith("<span>" + error + "</span>");
    }

    function loadEndpoints() {
        $.getJSON(baseURL,function(data,status,xhr) {
            window.endpoints=data;
            $.getJSON(window.endpoints.decode.href,function(data,status,xhr) {
                getCharacter(data);  
            });
        });
    
    }

    function getCharacter(json) {

        var characterid=json.character.href.replace("https://crest-tq.eveonline.com/characters/","").replace("/","");
        var url="https://characterstats.tech.ccp.is/v1/"+characterid+"/";
        $.getJSON(url,function(data,status,xhr) {
            window.character=data;
            $.each(data.aggregateYears, function(key, value) {   
             $('#year')
             .append($("<option></option>")
             .attr("value",key)
             .text(key)); 
            });
            $("#year").show();
        });
    }


    // Send Oauth token request on login, reset ajax Authorization header on logout.
    function onClickLogin(evt) {
        evt.preventDefault();
        var command = $("#login").text();
        if (command === "Login to See your Stats") {

            // Store CSRF token and current location as cookie
            var csrfToken = uuidGen();
            $.cookie(csrfTokenName, csrfToken);
            $.cookie(hashTokenName, window.location.hash);

            // No OAuth token, request one from the OAuth authentication endpoint
            window.location =  "https://login.eveonline.com/oauth/authorize/" +
                "?response_type=token" +
                "&client_id=" + clientId +
                "&scope=" + scopes +
                "&redirect_uri=" + redirectUri +
                "&state=" + csrfToken;

        } else {
            ajaxSetup(false);
            loginSetup(false);
        }
    }

    // Extract value from oauth formatted hash fragment.
    function extractFromHash(name, hash) {
        var match = hash.match(new RegExp(name + "=([^&]+)"));
        return !!match && match[1];
    }

    // Generate an RFC4122 version 4 UUID
    function uuidGen() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    function ajaxSetup(token) {
        var headers = {
            "Accept": "application/json, charset=utf-8"
        };
        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        $.ajaxSetup({
            accepts: "application/json, charset=utf-8",
            crossDomain: true,
            type: "GET",
            dataType: "json",
            headers: headers,
            error: function (xhr, status, error) {
                displayError(error);
            }
        });
    }

    function loginSetup(token) {
        $("#login").click(onClickLogin);
    }

    $(document).ready(function() {

        var hash = window.location.hash;
        var token = extractFromHash("access_token", hash);

        if (token) {
            ajaxSetup(token);
            // Check CSRF token in state matches token saved in cookie
            if(extractFromHash("state", hash) !== $.cookie(csrfTokenName)) {
                displayError("CSRF token mismatch");
                return;
            }

            // Restore hash.
            window.location.hash = $.cookie(hashTokenName);

            // Delete cookies.
            $.cookie(csrfTokenName, null);
            $.cookie(hashTokenName, null);
            $("#login-window").hide();
            loadEndpoints();
            $("#year").change(function(){populateDivs();});
        } else {
        loginSetup(token);
        $("#year").hide();
        }
        $("#information").hide();

    });


}($, window, document)); // End crestexplorerjs
