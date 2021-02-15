'use strict';
const refs = {
    controls: document.querySelector('#tabs-1 [data-controls]'),
    panes: document.querySelector('#tabs-1 [data-panes]'),
}

refs.controls.addEventListener('click', event => {
    if(event.target.nodeName !== 'A') {
        return;
    }
    
    const currentActiveControl = refs.controls.querySelector('.controls__item--active');
    
    
    if (currentActiveControl) {
        currentActiveControl.classList.remove('controls__item--active');
        const paneId = getPaneId(currentActiveControl);
        const pane = getPaneById(paneId);
        pane.classList.remove('pane--active');
        
    }
    const control = event.target;
    control.classList.add('controls__item--active');
    const paneId = getPaneId(control);
    const pane = getPaneById(paneId);
    // console.log(pane);
    pane.classList.add('pane--active');
})

function getPaneId (control) {
    return control.getAttribute('href').slice(1);
};
function getPaneById (id) {
    return refs.panes.querySelector(`#${id}`);
}