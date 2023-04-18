function ViewModel() {
    var self = this;
    var allEntries = [
        new Entry(new Date(), "Steel", 0.40, "Van Buren"),
        new Entry(new Date(), "Lumber", -0.32, "Van Buren"),
        new Entry(new Date(), "Plastic", 1.20, "Smede-Son"),
        new Entry(new Date(), "Plastic", -1.57, "Van Buren"),
        new Entry(new Date(), "Steel", 0.12, "Alro Metals"),
        new Entry(new Date(), "Plastic", 0.03, "Van Buren"),
    ];

    self.entries = ko.observableArray(allEntries);
    self.materialFilter = ko.observable("All Materials");
    self.validMaterials = ["Steel", "Plastic", "Lumber"];

    self.createEntry = function() {
        self.entries.push(new Entry(new Date(), "Steel", 0, "None Specified"));
    };

    self.removeEntry = function(entry) {
        self.entries.remove(entry);
    }

    self.materialFilter.subscribe(function(newValue) {
        if (newValue === "All Materials") {
            self.entries(allEntries); 
        }
        else {
            self.entries(allEntries.filter((e) => e.material === newValue));
        }
    });
}


ko.applyBindings(new ViewModel());
