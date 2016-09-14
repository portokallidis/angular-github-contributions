'use strict';

angular.module('np.github-contributions', []).directive('githubContributions', function($http) {
  return {
    restrict: 'E',
    link: function(scope, ielem, attr) {

      var options = attr.options || {};
      var username = attr.username;
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
        // remove text svg tags
        var removeText=new RegExp(/<text[\s\S]*(.*?)<\/text>/,"g");
        
        // match graph
        var matchGraph=new RegExp(/<div class=\"js-calendar-graph[\s\S]*(.*?)<\/div>/,"g");
        
        var graphtext = res.data.match(matchGraph);
        
        if (!graphtext) {
          console.debug("No graph found, check github");
          return;
        }
        var elem = document.createElement('div');
        elem.innerHTML = graphtext[0].toString().replace(removeText,"");
        
        // contributions graph - scalable!  
        var graph = elem.querySelector('svg');
        var gW = graph.getAttribute("width");
        var gH = graph.getAttribute("height");
        graph.setAttribute("width", "100%");
        graph.setAttribute("height", "100%");
        graph.setAttribute("viewBox", "14 8 " + gW + " " + gH);
        graph.setAttribute("class", graphCssClass);
        ielem.append(graph);

      });




    }
  };


});