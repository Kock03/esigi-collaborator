function getData(data) {
    var educationList = [];
    data.forEach(function (education) {
        console.log(education.situation);
        educationList.push({ text: 'Escolaridade: ' + education.schooling, margin: [0, 6, 4, 0], fontSize: 12 });
        educationList.push({ text: 'Instituição: ' + education.institution, margin: [0, 6, 4, 0], fontSize: 12 });
        educationList.push({ text: 'Curso: ' + education.course, margin: [0, 6, 4, 0], fontSize: 10 });
        educationList.push({ text: 'Situação: ' + education.situation, margin: [0, 6, 4, 0], fontSize: 12 });
    });
    return educationList;
}
