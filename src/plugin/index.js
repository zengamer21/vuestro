import VuestroButton from './components/VuestroButton.vue';
import VuestroCaret from './components/VuestroCaret.vue';
import VuestroDropDown from './components/VuestroDropDown.vue';
import VuestroEditableText from './components/VuestroEditableText.vue';
import VuestroEllipsisText from './components/VuestroEllipsisText.vue';
import VuestroGrid from './components/VuestroGrid.vue';
import VuestroGridBox from './components/VuestroGridBox.vue';
import VuestroListButton from './components/VuestroListButton.vue';
import VuestroListGroup from './components/VuestroListGroup.vue';
import VuestroListGroupToggle from './components/VuestroListGroupToggle.vue';
import VuestroModal from './components/VuestroModal.vue';
import VuestroPanel from './components/VuestroPanel.vue';
import VuestroPanelCollapsible from './components/VuestroPanelCollapsible.vue';
import VuestroPanelToolbar from './components/VuestroPanelToolbar.vue';
import VuestroPanelToolbarButton from './components/VuestroPanelToolbarButton.vue';
import VuestroSearchBox from './components/VuestroSearchBox.vue';
import VuestroTextField from './components/VuestroTextField.vue';
import VuestroTitle from './components/VuestroTitle.vue';
import VuestroTray from './components/VuestroTray.vue';

export default {
  install(Vue, options) {
    Vue.component(VuestroButton.name, VuestroButton);
    Vue.component(VuestroCaret.name, VuestroCaret);
    Vue.component(VuestroDropDown.name, VuestroDropDown);
    Vue.component(VuestroEditableText.name, VuestroEditableText);
    Vue.component(VuestroEllipsisText.name, VuestroEllipsisText);
    Vue.component(VuestroGrid.name, VuestroGrid);
    Vue.component(VuestroGridBox.name, VuestroGridBox);
    Vue.component(VuestroListButton.name, VuestroListButton);
    Vue.component(VuestroListGroup.name, VuestroListGroup);
    Vue.component(VuestroListGroupToggle.name, VuestroListGroupToggle);
    Vue.component(VuestroModal.name, VuestroModal);
    Vue.component(VuestroPanel.name, VuestroPanel);
    Vue.component(VuestroPanelCollapsible.name, VuestroPanelCollapsible);
    Vue.component(VuestroPanelToolbar.name, VuestroPanelToolbar);
    Vue.component(VuestroPanelToolbarButton.name, VuestroPanelToolbarButton);
    Vue.component(VuestroSearchBox.name, VuestroSearchBox);
    Vue.component(VuestroTextField.name, VuestroTextField);
    Vue.component(VuestroTitle.name, VuestroTitle);
    Vue.component(VuestroTray.name, VuestroTray);

    // Vue.directive(MyDirective.name, MyDirective);
  }
};