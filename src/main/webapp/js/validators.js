/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


angular.validator('nip', function(input, format) {
    var regexp = new RegExp('^\\d{10}$');
    return input.match(regexp)?"":"111-111-11-11";
});

angular.validator('regon', function(input, format) {
    var regexp = new RegExp('^\\d{9}$');
    return input.match(regexp) ? "" : "1111111111";
});


