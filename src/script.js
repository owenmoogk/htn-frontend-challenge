// search function. the search bar searches through name and description
function search() {
    var filter = document.getElementById("searchBar").value.toUpperCase(); // input from search bar set to upper case so the serach is not case-senesative
    var table = document.getElementById("demo"); // pulls table from html table
    var tableRow = table.getElementsByTagName("tr"); // pulls all the tablerows

    // theses two varibles will hold the title/description of the row we're running through
    var title, description, category; 

    // will run throuhg all the rows
    for (i = 0; i < tableRow.length; i++) {
        title = tableRow[i].getElementsByTagName("td")[0].innerText; // pulls first entry (aka the title) of row "i"
        description = tableRow[i].getElementsByTagName("td")[1].innerText; // pulls second entry (aka description) of row "i"
        category = tableRow[i].getElementsByTagName("td")[2].innerText;

        // checks if the title or description matches the filter (search bar input)
        if (title.toUpperCase().indexOf(filter) > -1 || description.toUpperCase().indexOf(filter) > -1 || category.toUpperCase().indexOf(filter) > -1) {
            // if it does, it'll just leave it alone
            tableRow[i].style.display = "";
        }
        else {
            // if it doesnt itll change its display style in css to "none", which basiclly just hides it
            tableRow[i].style.display = "none";
        }
    }
}