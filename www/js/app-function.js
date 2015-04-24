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

$(function ()
{
    
    $(document).on('pagecontainerbeforechange', function(event, ui) {
        if (typeof ui.toPage !== 'object') return;
        
        nextPage = ui.toPage;
        nextPageId = $(ui.toPage).attr('id');
        
        if (nextPageId === 'eventslist') {
            get_list_of_cities();
        }
    });
});

