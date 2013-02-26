// Seperated the function as the main home.js was getting way to big
(function () {
    "use strict";

    WinJS.Namespace.define("Finder.Home", {

        // setup list view
        initializeListView: function () {

            // wire up the back button for list
            $('.listview .title-header .win-backbutton')[0].addEventListener('click', function (e) {
                Finder.Home.showListView(false);
            });

            // add click handlers for sorting ect
            document.getElementById("nameHead").addEventListener("click", sortByName, false);
            document.getElementById("addressHead").addEventListener("click", sortByAddress, false);
            document.getElementById("distanceHead").addEventListener("click", sortByDistance, false);

            document.getElementById("addressFilter").addEventListener("click", filterByAddress, false);
            document.getElementById("addressFilterButton").addEventListener("click", performFilterByAddress, false);

            document.getElementById("nameFilter").addEventListener("click", filterByName, false);
            document.getElementById("nameFilterButton").addEventListener("click", performFilterByName, false);

            document.getElementById("cmdClearListFilter").addEventListener("click", clearFilter, false);

            document.getElementById("locationList").focus();

        },

        // loads just the table data
        loadTableData: loadTable,

        // determins if the listview is visible
        listViewVisible: {
            get:function(){
                return $('.listview').css('visibility') === 'visible';
            }
        },

        // shows the appropriate buttons if in list view or not
        showListViewButtons: function (show) {
            if (show) {
                // show the button
                if(Locations.unfilteredLocations)
                

                // hide the map buttons
                cmdDirections.winControl.hidden = true;
                cmdLocation.winControl.hidden = true;
                cmdSearchLocation.winControl.hidden = true;
                cmdRefreshList.winControl.hidden = true;
            }
            else {
                // hide the list view buttons and show the regular map buttons
                cmdClearListFilter.winControl.hidden = true;

                // hide the map buttons
                //cmdDirections.winControl.hidden = !show;
                cmdLocation.winControl.hidden = false;
                cmdSearchLocation.winControl.hidden = false;
                cmdRefreshList.winControl.hidden = false;
            }
        },

    });

    function loadTable(sortOrder) {
        var productTemplate = new WinJS.Binding.Template(document.getElementById("rowTemplate"));
        var productContainer = document.getElementById("locationListBody");
        productContainer.innerHTML = "";

        var locs = Locations.locations;

        if (sortOrder) {
            locs = Locations.locations.sort(dynamicSort(sortOrder));
        }

        var i, loc, row;
        for (i = 0; i < locs.length; i++) {
            loc = locs[i];
            productTemplate.render(loc).then(function (result) {
                row = WinJS.Utilities.query("tr", result).get(0);
                row.data = loc;
                row.children[2].innerText = loc[Finder.Config.nameField];
                row.children[3].innerText = loc[Finder.Config.secondaryField]; 
                row.addEventListener("click", rowClick);
                productContainer.appendChild(row);
            });
        }

        // update the map
        Finder.Home.displayMapData(locs);
    }

    // just deterimines if we are in snap mode or not
    function isSnapMode() {
        var myViewState = Windows.UI.ViewManagement.ApplicationView.value;
        return myViewState === Windows.UI.ViewManagement.ApplicationViewState.snapped;
    }

    function rowClick(e) {

        // set the selected poi
        Locations.selectedPoi = e.srcElement.parentElement.data; //children[0].innerText;

        if (isSnapMode()) {
            // show the details view
            Finder.Home.infoBox.setOptions({ visible: false });
            Finder.Home.showDetailsView('.listview', function (done) {
                if (done)
                    Finder.Home.showListViewButtons(true);
                else
                    Finder.Home.showListViewButtons(false);
            });
        }
        else {
            Finder.Home.map.setView({
                bounds: Microsoft.Maps.LocationRect.fromLocations([Locations.selectedPoi._location])
            });
            Finder.Home.infoBox.setLocation(Locations.selectedPoi._location);
            Finder.Home.infoBox.setOptions({ visible: true, title: Locations.selectedPoi[Finder.Config.nameField] });
            Finder.Home.infoBox.setOptions({ visible: true });
        }
    }

    function sortByName(e) {
        setDownArrow(e);
        loadTable(Finder.Config.nameField);
    }

    function sortByAddress(e) {

        setDownArrow(e);
        loadTable(Finder.Config.secondaryField);
    }

    function sortByDistance(e) {
        setDownArrow(e);
        loadTable("distance");
    }

    function filterByAddress(e) {
        var anchor = e.srcElement;
        var flyoutElement = document.getElementById("addressFilterFlyout");
        var flyout = flyoutElement.winControl;
        flyout.show(anchor, "bottom");
    }

    function performFilterByAddress(e) {
        var query = document.getElementById("addressFilterText").value;
        Finder.Data.filter(Finder.Config.secondaryField, query);
        loadTable();
        cmdClearListFilter.winControl.hidden = false;
    }

    function filterByName(e) {
        var anchor = e.srcElement;
        var flyoutElement = document.getElementById("nameFilterFlyout");
        var flyout = flyoutElement.winControl;
        flyout.show(anchor, "bottom");
    }

    function performFilterByName(e) {
        var query = document.getElementById("nameFilterText").value;
        Finder.Data.filter(Finder.Config.nameField, query);
        loadTable();
        document.getElementById("nameFilterFlyout").winControl.hide();
        cmdClearListFilter.winControl.hidden = false;
    }

    function setDownArrow(e) {
        var headers = document.getElementsByClassName("header");

        for (var i = 0; i < headers.length; i++) {
            headers[i].classList.remove("desc");
        }

        e.srcElement.classList.add("desc");
    }

    function clearFilter() {
        Locations.locations = Locations.unfilteredLocations;
        loadTable();
        appBar.winControl.hide();
        appBarUpper.winControl.hide();
        cmdClearListFilter.winControl.hidden = true;
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1, property.length - 1);
        }
        return function (a, b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
})();