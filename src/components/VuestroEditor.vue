<template>
  <div class="editor"></div>
</template>

<script>

import ace from 'brace';

// load all used modes/themes here
require('brace/mode/c_cpp');
require('brace/mode/coffee');
require('brace/mode/csharp');
require('brace/mode/css');
require('brace/mode/dockerfile');
require('brace/mode/ejs');
require('brace/mode/gcode');
require('brace/mode/gitignore');
require('brace/mode/golang');
require('brace/mode/html');
require('brace/mode/jade');
require('brace/mode/java');
require('brace/mode/javascript');
require('brace/mode/json');
require('brace/mode/jsp');
require('brace/mode/less');
require('brace/mode/lisp');
require('brace/mode/lua');
require('brace/mode/luapage');
require('brace/mode/lucene');
require('brace/mode/makefile');
require('brace/mode/markdown');
require('brace/mode/matlab');
require('brace/mode/objectivec');
require('brace/mode/perl');
require('brace/mode/php');
require('brace/mode/plain_text');
require('brace/mode/powershell');
require('brace/mode/protobuf');
require('brace/mode/python');
require('brace/mode/r');
require('brace/mode/rdoc');
require('brace/mode/rhtml');
require('brace/mode/rst');
require('brace/mode/ruby');
require('brace/mode/rust');
require('brace/mode/sass');
require('brace/mode/scss');
require('brace/mode/sh');
require('brace/mode/snippets');
require('brace/mode/sql');
require('brace/mode/stylus');
require('brace/mode/svg');
require('brace/mode/swift');
require('brace/mode/swig');
require('brace/mode/tcl');
require('brace/mode/text');
require('brace/mode/typescript');
require('brace/mode/vala');
require('brace/mode/xml');
require('brace/mode/xquery');
require('brace/mode/yaml');
require('brace/theme/chrome');
require('brace/theme/twilight');

export default {
  name: 'VuestroEditor',
  props: {
    value: { type: String, required: true }, // the actual text
    lang: { type: String, default: 'text' }, // language mode
    dark: { type: Boolean, default: false },
    options: { type: Object, default: function() { return {}; } }, // options object passed to Ace
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value(val) {
      if(this.contentBackup !== val){
        this.editor.setValue(val,1);
        this.contentBackup = val;
      }
    },
    lang(newLang) {
      this.editor.getSession().setMode('ace/mode/' + newLang);
    },
    colorTheme() {
      this.setColorTheme();
    },
    options(newOptions) {
      this.editor.setOptions(newOptions);
    },
  },
  mounted() {
    let vm = this;
    vm.editor = ace.edit(this.$el);

    vm.editor.getSession().setMode('ace/mode/' + vm.lang);
    vm.setColorTheme();
    vm.editor.setValue(vm.value, 1);

    vm.editor.on('change', function() {
      let content = vm.editor.getValue();
      vm.$emit('input', content);
      vm.contentBackup = content;
    });

    if(vm.options) {
      vm.editor.setOptions(vm.options);
    }
  },
  beforeDestroy() {
    this.editor.destroy();
    this.editor.container.remove();
  },
  methods: {
    setColorTheme() {
      if (this.dark) {
        this.editor.setTheme('ace/theme/twilight');
      } else {
        this.editor.setTheme('ace/theme/chrome');
      }
    },
  },
};

</script>

<style scoped>

.editor {
  height: 100%;
}

</style>