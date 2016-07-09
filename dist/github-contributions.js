/*!
 * angular-github-contributions
 * https://github.com/portokallidis/angular-github-contributions
 * Version: 0.0.8 - 2016-07-09T20:03:47.812Z
 * License: MIT
 */


'use strict';

angular.module('np.github-contributions', []).directive('githubContributions', function($http) {
  return {
    restrict: 'E',
    link: function(scope, ielem, attr) {

      var options = attr.options || {};
      var username = attr.username;
      var titleCssClass = "github-contributions-title";
      var graphCssClass = "github-contributions-graph";
      if (!username) {
        console.error("No username supplied");
        return;
      }
      var proxy = options.proxy || function(url) {
        return "https://urlreq.appspot.com/req?method=GET&url=" + url;
      };
      $http.get(proxy("https://github.com/" + username), {
        cache: true
      }).then(function(res) {

        var graphtext = res.data.match(/<div class=\"boxed-group flush\">[\s\S]*(.*?)<\/div>/);
        if (!graphtext) {
          console.debug("No graph found, check github");
          return;
        }

        var elem = document.createElement('div');
        elem.innerHTML = graphtext;

        if (!options.notitle) {
          // contributions title sum number   
          var title = elem.querySelector('h3');
          title.className = titleCssClass;
          title.innerHTML = title.textContent.trim();
          ielem.append(title);
        }

        if (!options.nograph) {
          // contributions graph - scalable!  
          var graph = elem.querySelector('svg');
          var gW = graph.getAttribute("width");
          var gH = graph.getAttribute("height");
          graph.setAttribute("height", "100%");
          graph.setAttribute("width", "100%");
          graph.setAttribute("height", "100%");
          graph.setAttribute("viewBox", "0 0 " + gW + " " + gH);
          graph.setAttribute("class", graphCssClass);
          ielem.append(graph);
        }

      });




    }
  };


});