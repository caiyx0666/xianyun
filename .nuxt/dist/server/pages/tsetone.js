exports.ids = [12];
exports.modules = {

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/tsetone.vue?vue&type=template&id=144625f1&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<input type=\"text\""+(_vm._ssrAttr("value",(_vm.content)))+"> <button>提交</button>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/tsetone.vue?vue&type=template&id=144625f1&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/tsetone.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
/* harmony default export */ var tsetonevue_type_script_lang_js_ = ({
  data() {
    return {
      content: "",
      hotel: 268,
      score: {
        location: 4,
        service: 4,
        fancility: 3,
        all: 3
      }
    };
  },

  methods: {
    handleClick() {
      this.$axios({
        method: "post",
        url: "/comments",
        data: {
          content: this.content,
          hotel: "268",
          score: this.score
        },
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res.data);
      });
    }

  }
});
// CONCATENATED MODULE: ./pages/tsetone.vue?vue&type=script&lang=js&
 /* harmony default export */ var pages_tsetonevue_type_script_lang_js_ = (tsetonevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/tsetone.vue



function injectStyles (context) {
  
  
}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  pages_tsetonevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  null,
  "03dcb964"
  
)

/* harmony default export */ var tsetone = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=tsetone.js.map