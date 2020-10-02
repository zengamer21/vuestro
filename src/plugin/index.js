/* global _ */
import VuestroApp from '../components/VuestroApp.vue';
import VuestroAreaChart from '../components/charts/VuestroAreaChart.vue';
import VuestroBarChart from '../components/charts/VuestroBarChart.vue';
import VuestroBreadcrumb from '../components/VuestroBreadcrumb.vue';
import VuestroButton from '../components/VuestroButton.vue';
import VuestroCaret from '../components/VuestroCaret.vue';
import VuestroCard from '../components/VuestroCard.vue';
import VuestroChartPanel from '../components/charts/VuestroChartPanel.vue';
import VuestroContainer from '../components/VuestroContainer.vue';
import VuestroCleanKvp from '../components/VuestroCleanKvp.vue';
import VuestroColorPicker from '../components/VuestroColorPicker.vue';
import VuestroDatePicker from '../components/date/VuestroDatePicker.vue';
import VuestroDropdown from '../components/VuestroDropdown.vue';
import VuestroDonutGauge from '../components/charts/VuestroDonutGauge.vue';
import VuestroDynamicTable from '../components/VuestroDynamicTable.vue';
import VuestroEditableText from '../components/VuestroEditableText.vue';
import VuestroEditor from '../components/VuestroEditor.vue';
import VuestroEllipsisText from '../components/VuestroEllipsisText.vue';
import VuestroForceGraph from '../components/charts/VuestroForceGraph.vue';
import VuestroGeoPattern from '../components/VuestroGeoPattern.vue';
import VuestroGrid from '../components/grid/VuestroGrid.vue';
import VuestroGridBox from '../components/grid/VuestroGridBox.vue';
import VuestroIcon from '../components/VuestroIcon.vue';
import VuestroListButton from '../components/list/VuestroListButton.vue';
import VuestroListGroup from '../components/list/VuestroListGroup.vue';
import VuestroListGroupToggle from '../components/list/VuestroListGroupToggle.vue';
import VuestroMap from '../components/charts/VuestroMap.vue';
import VuestroModal from '../components/VuestroModal.vue';
import VuestroMultiSelect from '../components/inputs/VuestroMultiSelect.vue';
import VuestroObjectBrowser from '../components/VuestroObjectBrowser.vue';
import VuestroPanel from '../components/VuestroPanel.vue';
import VuestroPill from '../components/VuestroPill.vue';
import VuestroSankeyChart from '../components/charts/VuestroSankeyChart.vue';
import VuestroSearchBox from '../components/VuestroSearchBox.vue';
import VuestroSidebar from '../components/sidebar/VuestroSidebar.vue';
import VuestroStatPanel from '../components/charts/VuestroStatPanel.vue';
import VuestroSvgTooltip from '../components/charts/VuestroSvgTooltip.vue';
import VuestroTable from '../components/VuestroTable.vue';
import VuestroTextField from '../components/VuestroTextField.vue';
import VuestroTimePicker from '../components/date/VuestroTimePicker.vue';
import VuestroTitle from '../components/VuestroTitle.vue';
import VuestroTooltip from '../components/VuestroTooltip.vue';
import VuestroTray from '../components/VuestroTray.vue';

export default {
  install(Vue, options) {
    Vue.component(VuestroApp.name, VuestroApp);
    Vue.component(VuestroAreaChart.name, VuestroAreaChart);
    Vue.component(VuestroBarChart.name, VuestroBarChart);
    Vue.component(VuestroBreadcrumb.name, VuestroBreadcrumb);
    Vue.component(VuestroButton.name, VuestroButton);
    Vue.component(VuestroCaret.name, VuestroCaret);
    Vue.component(VuestroCard.name, VuestroCard);
    Vue.component(VuestroChartPanel.name, VuestroChartPanel);
    Vue.component(VuestroContainer.name, VuestroContainer);
    Vue.component(VuestroCleanKvp.name, VuestroCleanKvp);
    Vue.component(VuestroColorPicker.name, VuestroColorPicker);
    Vue.component(VuestroDatePicker.name, VuestroDatePicker);
    Vue.component(VuestroDropdown.name, VuestroDropdown);
    Vue.component(VuestroDonutGauge.name, VuestroDonutGauge);
    Vue.component(VuestroDynamicTable.name, VuestroDynamicTable);
    Vue.component(VuestroEditableText.name, VuestroEditableText);
    Vue.component(VuestroEditor.name, VuestroEditor);
    Vue.component(VuestroEllipsisText.name, VuestroEllipsisText);
    Vue.component(VuestroForceGraph.name, VuestroForceGraph);
    Vue.component(VuestroGeoPattern.name, VuestroGeoPattern);
    Vue.component(VuestroGrid.name, VuestroGrid);
    Vue.component(VuestroGridBox.name, VuestroGridBox);
    Vue.component(VuestroIcon.name, VuestroIcon);
    Vue.component(VuestroListButton.name, VuestroListButton);
    Vue.component(VuestroListGroup.name, VuestroListGroup);
    Vue.component(VuestroListGroupToggle.name, VuestroListGroupToggle);
    Vue.component(VuestroMap.name, VuestroMap);
    Vue.component(VuestroModal.name, VuestroModal);
    Vue.component(VuestroMultiSelect.name, VuestroMultiSelect);
    Vue.component(VuestroObjectBrowser.name, VuestroObjectBrowser);
    Vue.component(VuestroPanel.name, VuestroPanel);
    Vue.component(VuestroPill.name, VuestroPill);
    Vue.component(VuestroSankeyChart.name, VuestroSankeyChart);
    Vue.component(VuestroSearchBox.name, VuestroSearchBox);
    Vue.component(VuestroSidebar.name, VuestroSidebar);
    Vue.component(VuestroStatPanel.name, VuestroStatPanel);
    Vue.component(VuestroSvgTooltip.name, VuestroSvgTooltip);
    Vue.component(VuestroTable.name, VuestroTable);
    Vue.component(VuestroTextField.name, VuestroTextField);
    Vue.component(VuestroTimePicker.name, VuestroTimePicker);
    Vue.component(VuestroTitle.name, VuestroTitle);
    Vue.component(VuestroTooltip.name, VuestroTooltip);
    Vue.component(VuestroTray.name, VuestroTray);

    Vue.filter('vuestroCommas', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
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
      if (d === null || d === undefined) {
        return '';
      }
      if (typeof(d) === 'number') {
        d = `${d}`;
      }
      return d.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    });

    Vue.filter('vuestroHMS', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
      if (_.isString(d)) {
        d = new Date(d);
      }
      return `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
    });

    Vue.filter('vuestroIsoDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
      if (_.isString(d)) {
        d = new Date(d);
      }
      return d.toISOString();
    });

    Vue.filter('vuestroDate', (d) => {
      if (d === null || d === undefined) {
        return '';
      }
      if (_.isString(d)) {
        d = new Date(d);
      }
      return d.toLocaleString();
    });

    Vue.filter('vuestroBytes', (intNum) => {
      if (intNum === null || intNum === undefined) {
        return '';
      }
      const suffixes = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];
      if (intNum < 1000) {
        return intNum.toFixed(1) + suffixes[0];
      }
      let i = parseInt(Math.floor(Math.log(intNum) / Math.log(1000)), 10);
      return (intNum / Math.pow(1000, i)).toFixed(1) + suffixes[i];
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

    Vue.mixin({
      methods: {
        vuestroDownloadAsJson(data, filename) {
          if (!data || !filename) {
            console.error('downloadAsJSON needs data and filename params');
            return;
          }
    			var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data,null,2));
    	    var downloadAnchorNode = document.createElement('a');
    	    downloadAnchorNode.setAttribute("href", dataStr);
    	    downloadAnchorNode.setAttribute("download", filename);
    	    document.body.appendChild(downloadAnchorNode); // required for firefox
    	    downloadAnchorNode.click();
    	    downloadAnchorNode.remove();
        },
        vuestroGetValueById({ data, idField, idValue, field, backupText }) {
          let q = {};
          q[idField] = idValue;
          let doc = _.find(data, q);
          if (doc && doc[field]) {
            return doc[field];
          } else {
            return backupText;
          }
        },
      }
    });
  }
};
