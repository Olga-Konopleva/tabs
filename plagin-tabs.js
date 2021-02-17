'use strict';

class Tabs {
    constructor({rootSelector, activeControlClass, activePaneClass, activeTab = 1}) {
        this._refs = this._getRefs(rootSelector);
        this._activeControlClass = activeControlClass;
        this._activePaneClass = activePaneClass;
        this._activeTabIdx = activeTab - 1;
        this._bindEvents();
        this._setActiveTab();
    }

    _getRefs(root) {
        const refs = {};
        refs.controls =  document.querySelector(`${root} [data-controls]`);
        refs.panes = document.querySelector(`${root} [data-panes]`);
        return refs;
    }
    _bindEvents() {
        this._refs.controls.addEventListener('click', this._onControlsClick.bind(this));
    }
    _onControlsClick(event) {
        if(event.target.nodeName !== 'A') {
            return;
        }
                
        this._removeActiveTab();
        const control = event.target;
        control.classList.add(this._activeControlClass);
        const paneId = this._getPaneId(control);
        this._setAcrivePane(paneId);
    }
    _getPaneId (control) {
        return control.getAttribute('href').slice(1);
        };
    _getPaneById (id) {
        return this._refs.panes.querySelector(`#${id}`);
    }
    _setActiveTab() {
        const controlItem = this._refs.controls.querySelectorAll('a');
        const control = controlItem[this._activeTabIdx];
        control.classList.add(this._activeControlClass);
        const paneId = this._getPaneId(control);
        this._setAcrivePane(paneId);
    }
    _removeActiveTab() {
        const currentActiveControl = this._refs.controls.querySelector(`.${this._activeControlClass}`);
                
        if (!currentActiveControl) {
            return;
        }
        currentActiveControl.classList.remove(this._activeControlClass);
        const paneId = this._getPaneId(currentActiveControl);
        this._removeActivePane(paneId);
    }
    _setAcrivePane(paneId) {
        const pane = this._getPaneById(paneId);
        pane.classList.add(this._activePaneClass);
    }
    _removeActivePane(paneId) {
        const pane = this._getPaneById(paneId);
        pane.classList.remove(this._activePaneClass);
    }
}

const tabs1 = new Tabs({
    rootSelector: '#tabs-1',
    activeControlClass: 'controls__item--active',
    activePaneClass: 'pane--active',
    activeTab: 2,
})