/*
 * This file is part of Big Eyes Solution EventApp.
 *
 *  Foobar is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  Foobar is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 */

var json_cities_version = false;
var json_cities_list = false;

var city_details = false;
var city_schedule = false;

var aux_city_schedule = false;
var aux_city_details = false;

/**
 * This function obtains the list of participants cities from json URL and calls
 * populate_list_of_cities function to populate the appropriate screen.
 */
function get_list_of_cities ()
{
    var json_url = 'http://flisolbrasil.org/app/2015/flisolcities.json';
    
    $.getJSON(json_url, function (cities) 
    {   
        if (cities && cities.version>json_cities_version) {
            set_list_of_cities(cities.version, cities);
        }
    }).fail (function ()
    {
        cities = window.localStorage.getItem('flisolcities');
                
        if (cities) { //Getting cities from cache.
            json_cities_list = cities;
            json_cities_version = parseInt(window.localStorage.getItem('flisolcities_version'));
        }
    }).done(function ()
    {
        if (json_cities_list) {
            populate_list_of_cities(json_cities_list);
        }
    });
}

/**
 * This function obtains the city's data and populate #city-description page.
 * @param {integer} state_index
 * @param {integer} city_index
 */
function get_city_details (state_index, city_index) 
{
    state = json_cities_list.countries[0].states[state_index];
    
    $('#uf').html(state.abbreviation);
    
    city = state.cities[city_index];
    
    set_city_details(city.slug, city);
    
    var campusero_api_url = 'http://campuse.ro/api/legacy/events/'+city.slug+'/schedule';
    
    $.getJSON(campusero_api_url, function (schedule)
    {
        set_city_schedule(aux_city_details.slug, schedule);
        
    }).fail(function () 
    {
        schedule = window.localStorage.getItem(aux_city_details.slug+'-schedule');
        
        schedule = schedule ? JSON.parse(schedule) : [];
        
        set_city_schedule(aux_city_details.slug, schedule);
    }).done(function () 
    {
        $('#city').html(aux_city_details.city);
        $('#description').html(aux_city_details.description);
        $('#place').html(aux_city_details.place);
        
        $('#coordnators').empty();
        
        $.each(aux_city_details.coordnators, function (index, coordnator)
        {
            $('<li>'+coordnator+'</li>').appendTo('#coordnators');
        });
        
        $('#coordnators').trigger('create');
        
        $('#schedule').empty();
        
        $.each(aux_city_schedule, function (index, item)
        {
            date = new Date(item.date);
            min = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            hour = date.getHours();
            day = date.getDate();
            mon = date.getMonth() + 1;
            mon = (mon < 10 ? '0' + mon : mon);
            $('<div data-role="collapsible"><h3><span id="title">'+item.title+
                '</span><br><span id="speakers">'+item.speakers+'</span></h3>'+
                '<div><h4>'+day+'/'+mon+' '+hour+':'+min+'</h4><p>'+item.description+'</p></div></div>'
            ).appendTo('#schedule');
        });
        
        $('#schedule').trigger('create');
        
        $(':mobile-pagecontainer').pagecontainer('change', $('#city-description'), {transition: 'slide'} );
    });
}

/**
 * 
 * @param {integer} list_version
 * @param {object} cities
 */
function set_list_of_cities (list_version, cities) 
{
    window.localStorage.setItem('flisolcities_version', list_version);
    window.localStorage.setItem('flisolcities', JSON.stringify(cities));
    
    json_cities_version = list_version;
    json_cities_list = cities;
}

/**
 * 
 * @param {type} list
 * @returns {undefined}
 */
function populate_list_of_cities (list) {
    states = list.countries[0].states;
    
    $('#eventlist-collapsible-set').empty();
    
    for(index = 0; index < states.length; index++) {
        state = states[index];
        cities = state.cities;
        
        cities_ul = '';
        
        for(index2 = 0; index2 < cities.length; index2++) {
            city = cities[index2];
            
            cities_ul += '<li><a onclick="get_city_details ('+index+','+index2+')">'+city.city+'</a></li>';
        }
        
        $('<div id="'+state.abbreviation+'" data-role="collapsible"><h3>'+
            state.state+'</h3><ul data-role="listview" data-filter="true" '+
            'data-input="#search-eventlist" data-inset="true">'+cities_ul+'</ul></div>')
          .appendTo('#eventlist-collapsible-set');
  
    }
    
    $('#eventlist-collapsible-set').trigger('create');
}

/**
 * 
 * @param {object} city
 */
function set_city_description (city)
{
    window.localStorage.setItem(city.slug, city);
}

/**
 * 
 * @param {string} slug
 * @param {array} schedule
 */
function set_city_schedule (slug, schedule)
{
    window.localStorage.setItem(slug+'-schedule', JSON.stringify(schedule));
    
    aux_city_schedule = schedule;
}

/**
 * 
 * @param {string} slug
 * @param {object} details
 */
function set_city_details (slug, details) {
    window.localStorage.setItem(slug+'-details', JSON.stringify(details));
    
    aux_city_details = details;
}
