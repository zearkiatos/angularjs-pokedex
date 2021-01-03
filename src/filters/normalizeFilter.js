appFilters.filter("normalize", function () {
  return function (input) {
    let normalized = input;
    normalized = normalized.replace("♀", "f").replace("♂", "m").replace(/\W+/g, "");
    console.log(normalized);
    return normalized.toLowerCase();
  };
});
