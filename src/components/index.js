import VuestroButton from './VuestroButton.vue';
import VuestroCaret from './VuestroCaret.vue';
import VuestroDraggableListGroup from './VuestroDraggableListGroup.vue';
import VuestroDraggableSearchableListGroup from './VuestroDraggableSearchableListGroup.vue';
import VuestroDropDown from './VuestroDropDown.vue';
import VuestroEditableText from './VuestroEditableText.vue';
import VuestroEllipsisText from './VuestroEllipsisText.vue';
import VuestroGrid from './VuestroGrid.vue';
import VuestroGridBox from './VuestroGridBox.vue';
import VuestroListButton from './VuestroListButton.vue';
import VuestroListGroup from './VuestroListGroup.vue';
import VuestroListGroupToggle from './VuestroListGroupToggle.vue';
import VuestroModal from './VuestroModal.vue';
import VuestroSearchBox from './VuestroSearchBox.vue';
import VuestroTextField from './VuestroTextField.vue';

export default {
  install(Vue, options) {
    Vue.component(VuestroButton.name, VuestroButton);
    Vue.component(VuestroCaret.name, VuestroCaret);
    Vue.component(VuestroDraggableListGroup.name, VuestroDraggableListGroup);
    Vue.component(VuestroDraggableSearchableListGroup.name, VuestroDraggableSearchableListGroup);
    Vue.component(VuestroDropDown.name, VuestroDropDown);
    Vue.component(VuestroEditableText.name, VuestroEditableText);
    Vue.component(VuestroEllipsisText.name, VuestroEllipsisText);
    Vue.component(VuestroGrid.name, VuestroGrid);
    Vue.component(VuestroGridBox.name, VuestroGridBox);
    Vue.component(VuestroListButton.name, VuestroListButton);
    Vue.component(VuestroListGroup.name, VuestroListGroup);
    Vue.component(VuestroListGroupToggle.name, VuestroListGroupToggle);
    Vue.component(VuestroModal.name, VuestroModal);
    Vue.component(VuestroSearchBox.name, VuestroSearchBox);
    Vue.component(VuestroTextField.name, VuestroTextField);

    // Vue.directive(MyDirective.name, MyDirective);
  }

};