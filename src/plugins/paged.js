/**
 * @mixin PagedModel
 *
 * @description Extracts header paging information into the `$page` and `$pageCount` properties.
 *
 * Usage:
 *
 * Just add mixin to a model's mixin chain
 *
 * ```javascript
 * var Bike = restmod.model('api/bikes', 'PagedModel');
 * ```
 *
 * Then using fetch on a collection bound to a paged api should provide page information
 *
 * ```javascript
 * Bike.$search().$then(function() {
 *   console.log this.$page; // should print the current page number.
 *   console.log this.$pageCount; // should print the request total page count.
 * });
 * ```
 *
 * Paging information is extracted from the 'X-Page' and the 'X-Page-Total' headers, to use different headers just
 * override the $pageHeader or the $pageCountHeader definition during model building.
 *
 * ```javascript
 * restmod.model('PagedModel', function() {
 *  this.define('$pageHeader', 'X-My-Page-Header');
 * })
 * ```
 *
 */

'use strict';

angular.module('restmod').factory('PagedModel', ['restmod', function(restmod) {

  return restmod.mixin({
    PAGE_HEADER: 'X-Page',
    PAGE_COUNT_HEADER: 'X-Page-Total',

    '~afterFetchMany': function(_response) {
      var page = _response.headers(this.$getProperty('pageHeader')),
          pageCount = _response.headers(this.$getProperty('pageCountHeader'));

      this.$page = (page !== undefined ? parseInt(page, 10) : 1);
      this.$pageCount = (pageCount !== undefined ? parseInt(pageCount, 10) : 1);
    }
  });
}]);