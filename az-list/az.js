var $ = require('jquery'),
  fetch = require('node-fetch'),
  _ = require('lodash');

function helloWorld() {
  return 'hello world';
};


//all central indiana region databases
//var azAPI = "https://lgapi-us.libapps.com/1.1/assets?site_id=103&key=83d416dc1ba38e91c12fee5de29a4527&asset_types=10&expand=az_types,subjects";
//
function displayAZlist(data) {
  return true; //test the test

}

function fetchData (url) {
  let databases = [];
  fetch(url)
    .then(response => {
      return response.json().then(data => {
        data.forEach(function (database) {
          databases.push(database);
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
  return databases;
}

function filterDataByRegion (data, region) {
  let regionDatabaseList = data.filter(database => {
    if (database.az_types) {
      return database.az_types[0].name === region;
    }
  });
  return regionDatabaseList;
}

function compare(a, b) {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }

  return comparison;
}

function alphabetizeByDatabaseName (data) {

  let alphabetizedData = data.sort(compare);
  return alphabetizedData;
}

function objectToListItem(azObject) {
  return `<li><a href="${azObject.url}" target="_blank">${azObject.name}</a><br/><div class="az-description"><p>${azObject.description}</p></div></li>`
}
function arrayToListItems(alphaArray) {
  let databaseList = `<ul>`;
  alphaArray.forEach(function(database) {
    const listItem = objectToListItem(database);
    databaseList += listItem;
  });
  databaseList += `</ul>`; 
  return databaseList;
}
function listDatabases(databaseObjects) {

  //    //then appends list to #AZ-list div
  //    $('#AZ-list').removeClass('sk-fading-circle');
  //    $('#AZ-list').append(listHTML);

}
function addLettersToPage () {
  //    //this function (which needs a name) took forever to figure out:
  //    $( "#AZ-list li" ).each(function( index ) {
  //              
  //        //variable holds the first character of whatever string we're looking at; in this case, the title of the database in the A-Z list
  //        var firstChar = ( $( this ).text().trim()[0] );
  //                  
  //        //empty variable to use during for loop below
  //        //will hold the number of the character code that corresponds to each letter of the alphabet
  //        var charCode;
  //                 
  //        //variable that changes the ID of the div that holds the a-z list items
  //        var groupName = "letter_" + firstChar;
  //                  
  //        //variable that holds the boolean value of whether or not a div with a specific/unique groupName ID already exists
  //        var groupExists = document.getElementById(groupName);
  //               
  //        //this loop takes the character code of each letter of the alphabet (happens to start with 65 = A)
  //        //and looks at the string (name of the database in A-Z list) to see if the first character of that string matches the the character code
  //        //if so, it adds a div with an id of the letter before the list item
  //        //then moves on to the next database name
  //        //if the div with the ID groupName already exists (&& !groupExists) it doesn't add the div
  //        for (charCode=65; charCode < 91; charCode++) {
  //            if ((String.fromCharCode(charCode) == firstChar) && !groupExists) {
  //                  $(this).before('<div class="alpha_group" id="' + groupName + '">' + firstChar + '</div>');
  //            }
  //        }
  //         
  //    });

}
function addLettersToGroups () {

}
function putDatabasesinAlphaGroups () {

}
//
//  
//var response = $.getJSON(azAPI, displayAZlist);
//   
////========== filtering by type/subject stuff ==========================================================
//var CIdatabases;
//
////on click
//$('select').change(function(){
//    //remove 'selected' class
//    $('select option:selected').removeClass('selected');
//    //add selected class to actually clicked button
//    $('select option:selected').addClass('selected');
//            
//            
//             
//            
//    //grab text from button
//    var buttonText = $('option:selected',this).attr('value');
//    //trim it down so it's a nice and neat variable
//    buttonText = $.trim(buttonText);
//    //set buttonClass='type' to true
//    var buttonClass = $('option:selected',this).hasClass('type');
//
//    var azAPI = "https://lgapi-us.libapps.com/1.1/assets?site_id=103&key=83d416dc1ba38e91c12fee5de29a4527&asset_types=10&expand=az_types,subjects";
//           
//
//    function displayAZlist(data) {
//                   
//        //if buttonClass === true (i.e. class is type)
//        if ( buttonClass ) {
//        //returns an array that holds all databases listed as Central Indiana as objects that are also that type of database clicked
//        var CIdatabases = _.filter(response.responseJSON, {az_types: [{name: 'Central Indiana Region'}] && [{name: buttonText}] });
//                    } else {
//        //returns an array that holds all databases listed as Central Indiana as objects that are also that type of database clicked
//        var CIdatabases = _.filter(response.responseJSON, {az_types: [{name: 'Central Indiana Region'}] } && {subjects: [{name: buttonText}] });
//                                }
//        //sorted alphabetically
//        var sorted = _.sortBy(CIdatabases, 'name');
//        //and placed in a list
//        var listHTML = '<ul>';
//                           
//                               
//         _.forEach(sorted, function(database) {
//             
//            listHTML += '<li>';
//            listHTML += '<a href="' + database.url + '" target="_blank">';
//            listHTML += database.name;
//            listHTML += '</a><br/>';
//            listHTML += '<div class="az-description"><p>'
//            listHTML += database.description;
//            listHTML += '</p></div>'
//            listHTML += '</li>'
//                                              
//        });
//                          
//        listHTML += '</ul>';
//                          
//        //empty old AZ list and replace with new list
//        $('#AZ-list').empty();
//        $('#AZ-list').append(listHTML);
//                          
//        //same as function above, it needs a name so i can call it instead of writing it twice
//        $( "#AZ-list li" ).each(function( index ) {
//
//                var firstChar = ( $( this ).text().trim()[0] );
//                var charCode;
//                var groupName = "letter_" + firstChar;
//                var groupExists = document.getElementById(groupName);
//                 
//                for (charCode=65; charCode < 91; charCode++) {
//                    if ((String.fromCharCode(charCode) == firstChar) && !groupExists) {
//                        $(this).before('<div class="alpha_group" id="' + groupName + '">' + firstChar + '</div>');
//                    }
//                }
//               
//          });
//                          
//    }
//                  
//                 
//                  
//    var response = $.getJSON(azAPI, displayAZlist);
//                
//});
//

module.exports.helloWorld = helloWorld;
module.exports.displayAZlist = displayAZlist;
module.exports.fetchData = fetchData;
module.exports.alphabetizeByDatabaseName = alphabetizeByDatabaseName;
module.exports.filterDataByRegion = filterDataByRegion; 
module.exports.objectToListItem = objectToListItem;
module.exports.arrayToListItems = arrayToListItems;
