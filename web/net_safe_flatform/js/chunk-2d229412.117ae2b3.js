(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d229412"],{dd51:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[t._m(0),o("el-form",{ref:"form",attrs:{model:t.conForm,"label-width":"80px"}},[o("el-form-item",{attrs:{label:"传感器ID"}},[o("el-input",{model:{value:t.conForm.sensor_id,callback:function(e){t.$set(t.conForm,"sensor_id",e)},expression:"conForm.sensor_id"}})],1),o("el-form-item",{attrs:{label:"修改属性"}},[o("el-select",{attrs:{placeholder:"请选择活动区域"},model:{value:t.conForm.control_id,callback:function(e){t.$set(t.conForm,"control_id",e)},expression:"conForm.control_id"}},[o("el-option",{attrs:{label:"温度",value:"0"}}),o("el-option",{attrs:{label:"湿度",value:"1"}}),o("el-option",{attrs:{label:"光照",value:"2"}}),o("el-option",{attrs:{label:"PH",value:"3"}}),o("el-option",{attrs:{label:"风速",value:"4"}})],1)],1),o("el-form-item",{attrs:{label:"强度"}},[o("el-input",{model:{value:t.conForm.intensity,callback:function(e){t.$set(t.conForm,"intensity",e)},expression:"conForm.intensity"}})],1),o("el-form-item",[o("el-button",{attrs:{type:"primary"},on:{click:t.setCon}},[t._v("立即修改")])],1)],1)],1)},l=[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"head"},[o("h1",[t._v("控制传感器强度（控制传感器属性值的强度）")])])}],s={data(){return{conForm:{sensor_id:"",control_id:"",intensity:""}}},methods:{async setCon(){const t=await this.$http.post("control",this.conForm);200==t.status&&(this.$message({message:"修改成功",type:"success"}),this.conForm={sensor_id:"",control_id:"",intensity:""})}}},r=s,a=o("2877"),i=Object(a["a"])(r,n,l,!1,null,null,null);e["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2d229412.117ae2b3.js.map