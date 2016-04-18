module.exports = {

    getContactSubjects: function() {

        var subjects = [];

        subjects.push({id: 1, name: "Feedback"});
        subjects.push({id: 2, name: "Media or business inquiry"});
        subjects.push({id: 3, name: "Something else"});
        return subjects;
    }
}