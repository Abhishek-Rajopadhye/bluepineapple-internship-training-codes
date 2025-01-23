document.getElementById('template-user').addEventListener('click', function() {
    const template = document.getElementById('div-template');
    const templateClone = template.content.cloneNode(true);
    document.body.appendChild(templateClone);
});