function searchEmployeeByFirstName() {
    // console.log("HELLOOO");
    //get the first name 
    var first_name_search_string  = document.getElementById('first_name_search_string').value;
    //construct the URL and redirect to it
    if(first_name_search_string !== ''){
        window.location = '/employee/search/' + encodeURI(first_name_search_string);
    }
    else{
        window.location = '/employee';
    }
}

function resetEmployeeSearch() {
    // Redirect back to the employee page
    window.location.href = '/employee';
}

// function filterEmployeeByProject(){

//     //get the pno of the selected project from the filter dropdown
//     var project_pno = document.getElementById('project_filter').ariaValueMax;
//     // var project_pno = document.getElementById('project_filter').value;

//     //construct the URL and redirect to it
//     window.location = '/employee/filter/' + parseInt(project_pno);
//     // window.location = '/employee/filter/' + encodeURIComponent(project_pno);
// }