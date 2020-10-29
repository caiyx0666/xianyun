exports.ids = [7];
exports.modules = {

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(220);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("30c06b2b", content, true, context)
};

/***/ }),

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3782dbc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(143);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3782dbc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3782dbc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3782dbc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3782dbc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_3782dbc0_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 220:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".container[data-v-3782dbc0]{min-width:1000px;margin:0 auto;position:relative}.container[data-v-3782dbc0] .el-carousel__container{height:700px}.container .banner-image[data-v-3782dbc0]{width:100%;height:100%}.container .banner-content[data-v-3782dbc0]{z-index:9;width:1000px;position:absolute;left:50%;top:45%;margin-left:-500px;border-top:1px solid transparent}.container .banner-content .search-bar[data-v-3782dbc0]{width:552px;margin:0 auto}.container .banner-content .search-tab .active i[data-v-3782dbc0]{color:#333}.container .banner-content .search-tab .active[data-v-3782dbc0]:after{background:#eee}.container .banner-content .search-tab span[data-v-3782dbc0]{width:82px;height:36px;display:block;position:relative;margin-right:8px;cursor:pointer}.container .banner-content .search-tab span i[data-v-3782dbc0]{position:absolute;z-index:2;display:block;width:100%;height:100%;line-height:30px;text-align:center;color:#fff}.container .banner-content .search-tab span[data-v-3782dbc0]:after{position:absolute;left:0;top:0;display:block;content:\"\";width:100%;height:100%;border:1px solid hsla(0,0%,100%,.2);border-bottom:none;transform:scale(1.1,1.3) perspective(.7em) rotateX(2.2deg);transform-origin:bottom left;background:rgba(0,0,0,.5);border-radius:1px 2px 0 0;box-sizing:border-box}.container .banner-content .search-input[data-v-3782dbc0]{width:550px;height:46px;background:#fff;border-radius:0 4px 4px 4px;border:1px solid hsla(0,0%,100%,.2);border-top:none;box-sizing:unset}.container .banner-content .search-input input[data-v-3782dbc0]{flex:1;height:20px;padding:13px 15px;outline:none;border:0;font-size:16px}.container .banner-content .search-input .el-icon-search[data-v-3782dbc0]{cursor:pointer;font-size:22px;padding:0 10px;font-weight:700}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=template&id=3782dbc0&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_c('el-carousel',{attrs:{"interval":5000,"arrow":"always"}},_vm._l((_vm.banners),function(item,index){return _c('el-carousel-item',{key:index},[_c('div',{staticClass:"banner-image",style:(("\n            background:url(" + (_vm.$axios.defaults.baseURL) + (item.url) + ") center center no-repeat;\n            background-size:contain contain;\n            "))})])}),1),_vm._ssrNode(" "),_vm._ssrNode("<div class=\"banner-content\" data-v-3782dbc0>","</div>",[_vm._ssrNode("<div class=\"search-bar\" data-v-3782dbc0>","</div>",[_c('el-row',{staticClass:"search-tab",attrs:{"type":"flex"}},_vm._l((_vm.options),function(item,index){return _c('span',{key:index,class:{ active: index === _vm.currentOption },on:{"click":function($event){return _vm.handleOption(index)}}},[_c('i',[_vm._v(_vm._s(item.name))])])}),0),_vm._ssrNode(" "),_c('el-row',{staticClass:"search-input",attrs:{"type":"flex","align":"middle"}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.searchValue),expression:"searchValue"}],attrs:{"placeholder":_vm.options[_vm.currentOption].placeholder},domProps:{"value":(_vm.searchValue)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleSearch($event)},"input":function($event){if($event.target.composing){ return; }_vm.searchValue=$event.target.value}}}),_vm._v(" "),_c('i',{staticClass:"el-icon-search",on:{"click":_vm.handleSearch}})])],2)])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/index.vue?vue&type=template&id=3782dbc0&scoped=true&

// EXTERNAL MODULE: ./node_modules/element-ui/lib/element-ui.common.js
var element_ui_common = __webpack_require__(7);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var lib_vue_loader_options_pagesvue_type_script_lang_js_ = ({
  created() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      const {
        data
      } = res.data;
      this.banners = data;
    });
  },

  data() {
    return {
      banners: [],
      currentOption: 0,
      isLoading: false,
      // 搜索内容
      searchValue: "",
      options: [{
        name: "攻略",
        placeholder: "搜索攻略",
        pageUrl: "/post?city="
      }, {
        name: "酒店",
        placeholder: "输入城市筛选酒店",
        pageUrl: "/hotel?cityName="
      }, {
        name: "机票",
        placeholder: "搜索机票",
        pageUrl: "/air"
      }]
    };
  },

  methods: {
    handleOption(index) {
      // 如果点击的机票, 不需要显示输入框而是直接跳转即可
      if (index == 2) {
        this.$router.push(this.options[2].pageUrl);
      } else {
        this.currentOption = index;
      }
    },

    handleSearch() {
      // 防止多次点击 判断开门还是关门  true => return 关门   false => 继续执行 开门
      if (this.isLoading) return; // tab栏切换，定位到具体对象的

      const optionItem = this.options[this.currentOption]; // 判断搜索为空或有空格时

      if (this.searchValue.replace(/[ ]/g, "").length == 0) return;
      this.isLoading = true; // 发送请求检验输入的城市是否合法

      this.$axios({
        url: "/cities?name=" + this.searchValue
      }).then(res => {
        // 查询结果的数组长度为0
        if (res.data.data.length == 0) {
          element_ui_common["Message"].error("您输入的城市不存在");
          setTimeout(() => {
            this.isLoading = false;
          }, 1500);
        } else {
          // 判断输入的字段是否带有'市'字
          if (this.searchValue.indexOf("市") > -1) {
            // 跳转 带上搜索内容
            // 存在'市'，要去掉之后再跳转
            this.$router.push(optionItem.pageUrl + this.searchValue.replace("市", ""));
          } else {
            // 不存在市就不用去掉，直接跳转
            this.$router.push(optionItem.pageUrl + this.searchValue);
          }
        }
      });
    }

  }
});
// CONCATENATED MODULE: ./pages/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var pagesvue_type_script_lang_js_ = (lib_vue_loader_options_pagesvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/index.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(219)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pagesvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "3782dbc0",
  "a44fc330"
  
)

/* harmony default export */ var pages = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=index.js.map