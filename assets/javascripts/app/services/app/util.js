(function () {

  function fuzzyMatch(str, str2) {
    var score = 0, li2 = 0;
    str = str.toLowerCase();
    str2 = str2.toLowerCase();
    for(var i = 0; i < str.length; i++) {
      for (var i2 = 0; i2 < str2.length; i2++) {
          if (str2[i2] === str[i] && i2 > li2) {
            score++;
            li2 = i2;
            break;
          }
      }
    }
    return score;
  }

  function wordMatch(str, str2) {
    var score = 0;
    var astr = str.toLowerCase().split(/[^a-z0-9]+/g);
    str2 = str2.toLowerCase();
    for (var i = 0; i < astr.length; i++) {
      if (~str2.indexOf(astr[i])) {
        score++;
      }
    }

    return score === 0 ? 0 : score / astr.length;
  }

  angular.module("app.services.app.util", [])

    .constant("formatDuration", function (seconds, floating) {
        var durations = [];

        durations[0] = seconds > 3600 ? Math.floor(seconds / 3600) : 0;
        durations[1] = seconds > 60 ? Math.floor((seconds - durations[0] * 3600) / 60) : 0;
        
        if (floating > 0) {
          durations[2] = (seconds % 60).toFixed(1);
          if (durations[2] < 0 || (1/durations[2]) === -Infinity) {
            durations[2] = "0.0";
          }
        }
        else {
          durations[2] = (seconds % 60);
        }
        
        if (durations.length > 2 && durations[0] === 0) {
          durations.shift();
        }
        return durations.map(function(d,k){
          return k <= 0 || d >= 10 ? d : "0" + d;
        }).join(":");
    })

    .constant("fuzzyMatch", fuzzyMatch)
    
    .constant("wordMatch", wordMatch)

    .constant("scMatch", function (s, t) {
      // Determine the Damerau-Levenshtein distance between s and t
      if (!s || !t) {
        return 99;
      }
      var m = s.length;
      var n = t.length;      
      var charDictionary = new Object();

      /* For all i and j, d[i][j] holds the Damerau-Levenshtein distance
       * between the first i characters of s and the first j characters of t.
       * Note that the array has (m+1)x(n+1) values.
       */
      var d = new Array();
      for (var i = 0; i <= m; i++) {
        d[i] = new Array();
        d[i][0] = i;
      }
      for (var j = 0; j <= n; j++) {
        d[0][j] = j;
      }

      // Populate a dictionary with the alphabet of the two strings
      for (var i = 0; i < m; i++) {
        charDictionary[s.charAt(i)] = 0;
      }
      for (var j = 0; j < n; j++) {
        charDictionary[t.charAt(j)] = 0;
      }

      // Determine substring distances
      for (var i = 1; i <= m; i++) {
        var db = 0;
        for (var j = 1; j <= n; j++) {
          var i1 = charDictionary[t.charAt(j-1)];
          var j1 = db;
          var cost = 0;

          if (s.charAt(i-1) == t.charAt(j-1)) { // Subtract one to start at strings' index zero instead of index one
            db = j;
          } else {
            cost = 2;
          }
          d[i][j] = Math.min(d[i][j-1] + 1,                 // insertion
                             Math.min(d[i-1][j] + 1,        // deletion
                                      d[i-1][j-1] + cost)); // substitution
          if(i1 > 0 && j1 > 0) {
            d[i][j] = Math.min(d[i][j], d[i1-1][j1-1] + (i-i1-1) + (j-j1-1) + 1); //transposition
          }
        }
        charDictionary[s.charAt(i-1)] = i;
      }

      // Return the strings' distance
      return d[m][n];
    });
})(); 