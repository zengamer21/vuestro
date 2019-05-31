import VuestroApp from '../components/VuestroApp.vue';
import VuestroAreaChart from '../components/charts/VuestroAreaChart.vue';
import VuestroBarChart from '../components/charts/VuestroBarChart.vue';
import VuestroButton from '../components/VuestroButton.vue';
import VuestroCaret from '../components/VuestroCaret.vue';
import VuestroCard from '../components/VuestroCard.vue';
import VuestroCardContainer from '../components/VuestroCardContainer.vue';
import VuestroColorPicker from '../components/VuestroColorPicker.vue';
import VuestroDropdown from '../components/VuestroDropdown.vue';
import VuestroDonutGauge from '../components/charts/VuestroDonutGauge.vue';
import VuestroEditableText from '../components/VuestroEditableText.vue';
import VuestroEllipsisText from '../components/VuestroEllipsisText.vue';
import VuestroGeoPattern from '../components/VuestroGeoPattern.vue';
import VuestroGrid from '../components/VuestroGrid.vue';
import VuestroGridBox from '../components/VuestroGridBox.vue';
import VuestroIcon from '../components/VuestroIcon.vue';
import VuestroListButton from '../components/list/VuestroListButton.vue';
import VuestroListGroup from '../components/list/VuestroListGroup.vue';
import VuestroListGroupToggle from '../components/list/VuestroListGroupToggle.vue';
import VuestroModal from '../components/VuestroModal.vue';
import VuestroPanel from '../components/VuestroPanel.vue';
import VuestroPill from '../components/VuestroPill.vue';
import VuestroSankeyChart from '../components/charts/VuestroSankeyChart.vue';
import VuestroSearchBox from '../components/VuestroSearchBox.vue';
import VuestroSidebar from '../components/sidebar/VuestroSidebar.vue';
import VuestroStatTile from '../components/VuestroStatTile.vue';
import VuestroSvgTooltip from '../components/charts/VuestroSvgTooltip.vue';
import VuestroTable from '../components/VuestroTable.vue';
import VuestroTextField from '../components/VuestroTextField.vue';
import VuestroTimePicker from '../components/VuestroTimePicker.vue';
import VuestroTitle from '../components/VuestroTitle.vue';
import VuestroTray from '../components/VuestroTray.vue';

// import all icons, creates bloat, but sometimes there just no
// way to know what a user might want
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';

export default {
  install(Vue, options) {
    Vue.component(Icon.name, Icon);

    Vue.component(VuestroApp.name, VuestroApp);
    Vue.component(VuestroAreaChart.name, VuestroAreaChart);
    Vue.component(VuestroBarChart.name, VuestroBarChart);
    Vue.component(VuestroButton.name, VuestroButton);
    Vue.component(VuestroCaret.name, VuestroCaret);
    Vue.component(VuestroCard.name, VuestroCard);
    Vue.component(VuestroCardContainer.name, VuestroCardContainer);
    Vue.component(VuestroColorPicker.name, VuestroColorPicker);
    Vue.component(VuestroDropdown.name, VuestroDropdown);
    Vue.component(VuestroDonutGauge.name, VuestroDonutGauge);
    Vue.component(VuestroEditableText.name, VuestroEditableText);
    Vue.component(VuestroEllipsisText.name, VuestroEllipsisText);
    Vue.component(VuestroGeoPattern.name, VuestroGeoPattern);
    Vue.component(VuestroGrid.name, VuestroGrid);
    Vue.component(VuestroGridBox.name, VuestroGridBox);
    Vue.component(VuestroIcon.name, VuestroIcon);
    Vue.component(VuestroListButton.name, VuestroListButton);
    Vue.component(VuestroListGroup.name, VuestroListGroup);
    Vue.component(VuestroListGroupToggle.name, VuestroListGroupToggle);
    Vue.component(VuestroModal.name, VuestroModal);
    Vue.component(VuestroPanel.name, VuestroPanel);
    Vue.component(VuestroPill.name, VuestroPill);
    Vue.component(VuestroSankeyChart.name, VuestroSankeyChart);
    Vue.component(VuestroSearchBox.name, VuestroSearchBox);
    Vue.component(VuestroSidebar.name, VuestroSidebar);
    Vue.component(VuestroStatTile.name, VuestroStatTile);
    Vue.component(VuestroSvgTooltip.name, VuestroSvgTooltip);
    Vue.component(VuestroTable.name, VuestroTable);
    Vue.component(VuestroTextField.name, VuestroTextField);
    Vue.component(VuestroTimePicker.name, VuestroTimePicker);
    Vue.component(VuestroTitle.name, VuestroTitle);
    Vue.component(VuestroTray.name, VuestroTray);

    Vue.filter('vuestroCommas', (d) => {
      if (typeof(d) === 'number') {
        return Number(d).toLocaleString('en');
      }
      if (typeof(d) === 'string') {
        let n = Number(parseFloat(d)).toLocaleString('en');
        if (!isNaN(n)) {
          return n;
        }
      }
      return d;
    });

    Vue.filter('vuestroPhoneUS', (d) => {
      return d.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    });

    Vue.filter('vuestroHMS', (d) => {
      return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
    });

    Vue.directive('vuestro-blur', {
      bind: function (el, binding, vnode) {
        el.clickOutsideEvent = function(event) {
          if (!(el == event.target || el.contains(event.target))) {
            vnode.context[binding.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent);
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent);
      },
    });
  }
};
