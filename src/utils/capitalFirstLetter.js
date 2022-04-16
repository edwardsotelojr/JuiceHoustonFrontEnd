export default function capitalizeFirstLetter(string) {
    var s = string.charAt(0).toUpperCase() + string.slice(1);
    for (var i = 1; i < s.length; i++) {
      if (s[i] !== s[i].toLowerCase()) {
        s = s.slice(0, i) + " " + s.slice(i);
        i = s.length;
      }
    }
    return s;
  }