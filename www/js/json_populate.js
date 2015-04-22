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

/**
 * This function obtains the list of participants cities from json URL and calls
 * set_list_of_cities function to populate the appropriate screen.
 */
function get_list_of_cities ()
{
    var json_url = 'http://flisolbrasil.org/app/2015/flisolcities.json';
}

/**
 * This function obtains the city's data and populate #city-description page.
 * @param {string} city_slug
 */
function get_city_details (city_slug) 
{
    var campusero_api_url = 'http://campuse.ro/api/legacy/events/'+city_slug+'/schedule';
}

/**
 * 
 * @param {array} cities
 */
function set_list_of_cities (cities) 
{
    
}

/**
 * 
 * @param {object} city
 */
function set_city_description (city)
{
    
}

/**
 * 
 * @param {array} schedule
 */
function set_city_schedule (schedule)
{
    
}