var expect = require('chai').expect,
     _ = require('lodash'),
    { JSDOM } = require('jsdom');

//require('es6-promise').polyfill();
//require('isomorphic-fetch');


const jsdom = new JSDOM('<!doctype html><html><body><div>1</div></body></html>');
const { window } = jsdom;
const { document } = window;
global.window = window;
global.document = document;
 
const $ = global.jQuery = require( 'jquery' );
const fetch = require('node-fetch');

describe('helloWorld', function () {

var helloWorld = require('../az-list/az.js').helloWorld; 

   it('should return hello world', function () {
        expect(helloWorld()).to.have.string('hello world');
    }); 
});

describe('displayAZlist', function () {

var displayAZlist = require('../az-list/az.js').displayAZlist;
   it('should be a function', function () {
        expect(displayAZlist).to.be.a('function');
    }); 
});

describe('fetchData', function(){
    var fetchData = require('../az-list/az.js').fetchData;
    it('should fetch data and return an array of all database objects', function () {
       var input = 'https://lgapi-us.libapps.com/1.1/assets?site_id=103&key=83d416dc1ba38e91c12fee5de29a4527&asset_types=10&expand=az_types,subjects';
       //var expected = 7744;
        var actual = fetchData(input);
        expect(actual).to.be.an('array');
    });
});

describe('filterDataByRegion',function () {
   var filterDataByRegion = require('../az-list/az.js').filterDataByRegion;
   it('should take an array of objects, filter them by region, and return a new, shorter array of objects', function () {
       var input = [{
           id:          '6115076',
           name:        'Academic Search Premier (EBSCO)',
           description: 'An interdisciplinary database, covering a broad range of subjects. It contains indexing for 8,172 publications, with full text for nearly 4,700 of those titles.',
           url:         'https://indianapolis.libproxy.ivytech.edu/login?url=https://search.ebscohost.com/login.asp?profile=web&defaultdb=aph',
           site_id:     '103',
           type_id:     '10',
           az_types: [
               {
                   id: 6613,
               name: "Central Indiana Region",
               site_id: 103
               }
           ]
           }, 
           {
           id:          '6115076',
           name:        'NOT EBSCO',
           description: 'An interdisciplinary database, covering a broad range of subjects. It contains indexing for 8,172 publications, with full text for nearly 4,700 of those titles.',
           url:         'https://indianapolis.libproxy.ivytech.edu/login?url=https://search.ebscohost.com/login.asp?profile=web&defaultdb=aph',
           site_id:     '103',
           type_id:     '10',
           az_types: [
               {
                   id: 6613,
               name: "STATEWIDE",
               site_id: 103
               }
           ]
           }, 
         {
           id:          '6115076',
           name:        'AccessScience',
           description: 'An authoritative and dynamic online resource that contains incisively written, high-quality reference material (including videos and animations) that covers all major scientific disciplines.',
           url:         'http://indianapolis.libproxy.ivytech.edu/login?url=https://www.accessscience.com',
           site_id:     '103',
           type_id:     '10'}
       ];
        var region = 'Central Indiana Region';       
       var expected = [{
           id:          '6115076',
           name:        'Academic Search Premier (EBSCO)',
           description: 'An interdisciplinary database, covering a broad range of subjects. It contains indexing for 8,172 publications, with full text for nearly 4,700 of those titles.',
           url:         'https://indianapolis.libproxy.ivytech.edu/login?url=https://search.ebscohost.com/login.asp?profile=web&defaultdb=aph',
           site_id:     '103',
           type_id:     '10',
           az_types: [
               {
                   id: 6613,
               name: "Central Indiana Region",
               site_id: 103
               }
           ]}
       ]; 
       var actual = filterDataByRegion(input, region);
       expect(actual).to.eql(expected);
   });
});

describe('alphabetizeByDatabaseName', function () {
    var alphabetizeByDatabaseName = require('../az-list/az.js').alphabetizeByDatabaseName;
   it('should return array of objects sorted alphabetically by database name',  function () {
      var input = [{
          name: "caryl's house",
          address: "7875 alton st"
      },
      {
          name: "abby's house",
          address: "315 w washington"
      },
      {
          name: "bill's house",
          address: "1600 penn ave"
      }];

       var expected = [{
           name: "abby's house",
          address: "315 w washington"
       },
       {
           name: "bill's house",
          address: "1600 penn ave"
       },
       {
           name: "caryl's house",
          address: "7875 alton st"
       }];
       var actual = alphabetizeByDatabaseName(input);
       expect(actual).to.eql(expected);
   });
});

describe('objectToListItem', function () {
   var objectToListItem = require('../az-list/az.js').objectToListItem; 
   it('should take database object and return a string', function () {
       var input = {
           id:          '6115076',
           name:        'Academic Search Premier (EBSCO)',
           description: 'An interdisciplinary database, covering a broad range of subjects. It contains indexing for 8,172 publications, with full text for nearly 4,700 of those titles.',
           url:         'https://indianapolis.libproxy.ivytech.edu/login?url=https://search.ebscohost.com/login.asp?profile=web&defaultdb=aph',
           site_id:     '103',
           type_id:     '10'

       };
       var expected = '<li><a href="https://indianapolis.libproxy.ivytech.edu/login?url=https://search.ebscohost.com/login.asp?profile=web&defaultdb=aph" target="_blank">Academic Search Premier (EBSCO)</a><br/><div class="az-description"><p>An interdisciplinary database, covering a broad range of subjects. It contains indexing for 8,172 publications, with full text for nearly 4,700 of those titles.</p></div></li>';
       var actual = objectToListItem(input);
       expect(actual).to.eql(expected);


        input = {
           id:          '6115076',
           name:        'AccessScience',
           description: 'An authoritative and dynamic online resource that contains incisively written, high-quality reference material (including videos and animations) that covers all major scientific disciplines.',
           url:         'http://indianapolis.libproxy.ivytech.edu/login?url=https://www.accessscience.com',
           site_id:     '103',
           type_id:     '10'

       };
       var expected = '<li><a href="http://indianapolis.libproxy.ivytech.edu/login?url=https://www.accessscience.com" target="_blank">AccessScience</a><br/><div class="az-description"><p>An authoritative and dynamic online resource that contains incisively written, high-quality reference material (including videos and animations) that covers all major scientific disciplines.</p></div></li>';

       var actual = objectToListItem(input);
       expect(actual).to.eql(expected);
   });

}); 

describe('arrayToListItems', function () {
   var arrayToListItems = require('../az-list/az.js').arrayToListItems; 
   it('should take an array and return a string', function () {
       var input = [{
           id:          '6115076',
           name:        'Academic Search Premier (EBSCO)',
           description: 'An interdisciplinary database, covering a broad range of subjects. It contains indexing for 8,172 publications, with full text for nearly 4,700 of those titles.',
           url:         'https://indianapolis.libproxy.ivytech.edu/login?url=https://search.ebscohost.com/login.asp?profile=web&defaultdb=aph',
           site_id:     '103',
           type_id:     '10'}, 
         {
           id:          '6115076',
           name:        'AccessScience',
           description: 'An authoritative and dynamic online resource that contains incisively written, high-quality reference material (including videos and animations) that covers all major scientific disciplines.',
           url:         'http://indianapolis.libproxy.ivytech.edu/login?url=https://www.accessscience.com',
           site_id:     '103',
           type_id:     '10'}
       ]; 
       var expected =
       `<ul><li><a href="https://indianapolis.libproxy.ivytech.edu/login?url=https://search.ebscohost.com/login.asp?profile=web&defaultdb=aph" target="_blank">Academic Search Premier (EBSCO)</a><br/><div class="az-description"><p>An interdisciplinary database, covering a broad range of subjects. It contains indexing for 8,172 publications, with full text for nearly 4,700 of those titles.</p></div></li><li><a href="http://indianapolis.libproxy.ivytech.edu/login?url=https://www.accessscience.com" target="_blank">AccessScience</a><br/><div class="az-description"><p>An authoritative and dynamic online resource that contains incisively written, high-quality reference material (including videos and animations) that covers all major scientific disciplines.</p></div></li></ul>`;

       var actual = arrayToListItems(input);
       expect(actual).to.eql(expected);
   });
});
