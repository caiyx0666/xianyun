exports.ids = [4];
exports.modules = {

/***/ 129:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(186);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("4f1b28f0", content, true, context)
};

/***/ }),

/***/ 185:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pay_vue_vue_type_style_index_0_id_50d71cda_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(129);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pay_vue_vue_type_style_index_0_id_50d71cda_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pay_vue_vue_type_style_index_0_id_50d71cda_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pay_vue_vue_type_style_index_0_id_50d71cda_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pay_vue_vue_type_style_index_0_id_50d71cda_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_5_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_5_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_5_oneOf_1_3_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_pay_vue_vue_type_style_index_0_id_50d71cda_scoped_true_lang_less___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 186:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".container[data-v-50d71cda]{background:#f5f5f5;padding:30px 0}.container .main[data-v-50d71cda]{width:1000px;margin:0 auto}.container .main .pay-title[data-v-50d71cda]{text-align:right}.container .main .pay-title span[data-v-50d71cda]{font-size:28px;color:#ff4500}.container .main .pay-main[data-v-50d71cda]{background:#fff;margin-top:10px;border-top:5px solid orange;padding:30px}.container .main .pay-main h4[data-v-50d71cda]{font-size:28px;font-weight:400;margin-bottom:10px}.container .main .pay-main .pay-qrcode[data-v-50d71cda]{padding:0 80px}.container .main .pay-main .qrcode[data-v-50d71cda]{border:1px solid #ddd;padding:15px;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}.container .main .pay-main .qrcode #qrcode-stage[data-v-50d71cda]{width:200px;height:200px;margin-bottom:10px}.container .main .pay-main .qrcode p[data-v-50d71cda]{line-height:2;text-align:center}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/air/pay.vue?vue&type=template&id=50d71cda&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},[_vm._ssrNode("<div class=\"main\" data-v-50d71cda>","</div>",[_vm._ssrNode("<div class=\"pay-title\" data-v-50d71cda>\n            支付总金额 <span class=\"pay-price\" data-v-50d71cda>"+_vm._ssrEscape("￥ "+_vm._s(_vm.payData.price))+"</span></div> "),_vm._ssrNode("<div class=\"pay-main\" data-v-50d71cda>","</div>",[_vm._ssrNode("<h4 data-v-50d71cda>微信支付</h4> "),_c('el-row',{staticClass:"pay-qrcode",attrs:{"type":"flex","justify":"space-between","align":"middle"}},[_c('div',{staticClass:"qrcode"},[_c('canvas',{ref:"qrcodeDom"}),_vm._v(" "),_c('p',[_vm._v("请使用微信扫一扫")]),_vm._v(" "),_c('p',[_vm._v("扫描二维码支付")])]),_vm._v(" "),_c('div',{staticClass:"pay-example"},[_c('img',{attrs:{"src":"http://157.122.54.189:9093/images/wx-sweep2.jpg","alt":""}})])])],2)],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./pages/air/pay.vue?vue&type=template&id=50d71cda&scoped=true&

// EXTERNAL MODULE: external "qrcode"
var external_qrcode_ = __webpack_require__(97);
var external_qrcode_default = /*#__PURE__*/__webpack_require__.n(external_qrcode_);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./pages/air/pay.vue?vue&type=script&lang=js&
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

/* harmony default export */ var payvue_type_script_lang_js_ = ({
  data() {
    return {
      timerId: null,
      payData: {
        price: "***"
      }
    };
  },

  destroyed() {
    // 在组件(页面)跳出时, 记得把当前轮询的定时器清理掉
    // 创建时将id存起来
    // let timerId = setTimeout(() => {}, timeout);
    // 之后清理即可
    // 因为在创建时生成的 id 这里没法直接拿
    // 通过 data 缓存定时器id
    console.log('清理定时器');
    clearTimeout(this.timerId);
  },

  watch: {
    "$store.state.user.userInfo.token": {
      handler() {
        if (this.$store.state.user.userInfo.token) {
          this.$axios({
            url: "/airorders/" + this.$route.query.id,
            headers: {
              Authorization: "Bearer " + this.$store.state.user.userInfo.token
            }
          }).then(res => {
            console.log(res.data);
            this.payData = res.data; // 当前获取到支付数据
            // 其中二维码连接在 res.data.payInfo.code_url
            // 需要两个东西 字符串res.data.payInfo.code_url
            // 另外一个是存放二维码的 dom this.$refs.qrcodeDom

            external_qrcode_default.a.toCanvas(this.$refs.qrcodeDom, res.data.payInfo.code_url, {
              width: 200,
              color: {
                dark: "#000088"
              }
            }); // 二维码生成完毕, 开始轮询支付状态
            // 可以直接写, 也可以封装成一个函数

            this.checkPayState();
          });
        }
      },

      immediate: true
    }
  },
  methods: {
    checkPayState() {
      this.$axios({
        method: "post",
        url: "/airorders/checkpay",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: {
          id: this.payData.id,
          nonce_str: this.payData.price,
          out_trade_no: this.payData.payInfo.order_no
        }
      }).then(res => {
        console.log(res.data); // 拓展, 如何处理一堆不确定的状态
        // 不同状态用不同的逻辑实现, 这里用console 模拟
        // 最简单就是if判断

        this.showPayState(res.data.trade_state);

        if (res.data.trade_state == "SUCCESS") {
          this.$message.success("感谢巨款 0.01 元");
        } else {
          this.timerId = setTimeout(() => {
            this.checkPayState();
          }, 3000);
        }
      });
    },

    showPayState(state) {
      const stateOption = {
        SUCCESS: "支付成功",
        REFUND: "转入退款",
        NOTPAY: "未支付",
        CLOSED: "已关闭",
        REVOKED: "已撤销",
        USERPAYING: "用户支付中",
        PAYERROR: "支付失败"
      };
      console.log("这里是处理各种状态的方法");
      console.log(stateOption[state]);
    }

  }
});
// CONCATENATED MODULE: ./pages/air/pay.vue?vue&type=script&lang=js&
 /* harmony default export */ var air_payvue_type_script_lang_js_ = (payvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(1);

// CONCATENATED MODULE: ./pages/air/pay.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(185)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  air_payvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "50d71cda",
  "5068732c"
  
)

/* harmony default export */ var pay = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=pay.js.map