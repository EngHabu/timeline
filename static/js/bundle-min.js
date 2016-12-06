function mainFunc(){var t=new App;t.init()}var App=function(){this.counter=0,this.init=function(){var t=this;this.addRow(!1),$("#add-task-button").on("click",function(){t.addRow(!0)}),$("#show-timeline-button").on("click",function(){t.post()}),$("#color-picker-border-1,#color-picker-fill-1").colorpicker({format:"hex"}),$("#color-picker-border-2,#color-picker-fill-2").colorpicker({format:"hex"}),$("#datepicker-end").datepicker({format:"yyyy-mm-dd"}),$("#source-div").css({display:"none"}),this.addTableButtonHandlers()},this.addTableButtonHandlers=function(){for(var t=this,e=["up-button","down-button","delete-button"],o=0;o<e.length;o++)$("."+e[o]).unbind("click");$(".up-button").on("click",function(){t.up(this.id)}),$(".down-button").on("click",function(){t.down(this.id)}),$(".delete-button").on("click",function(){t.delete(this.id)})},this.addRow=function(t){this.counter++,$("#task-table-body").append('<tr class="task" id="task-'+this.counter+'"><td><div class="input-append date"><input class="form-control" id="datepicker-start-'+this.counter+'" size="16" type="text" readonly><span class="add-on"><i class="icon-th"></i></span></div></td><td><div class="input-append date"><input class="form-control" id="datepicker-end-'+this.counter+'" size="16" type="text" readonly><span class="add-on"><i class="icon-th"></i></span></td><td><div class="checkbox"><label><input id="datepicker-end-'+this.counter+'-ongoing" type="checkbox">&nbsp;Ongoing</label></div></td><td><input class="form-control" id="label-'+this.counter+'" type="text"></td><td><button class="up-button btn btn-default" id="up-button-'+this.counter+'">&uarr;</button></td><td><button class="down-button btn btn-default" id="down-button-'+this.counter+'">&darr;</button></td><td><button class="delete-button btn btn-default" id="delete-button-'+this.counter+'">&cross;</button></td></tr>'),$("#datepicker-start-"+this.counter+",#datepicker-end-"+this.counter).datepicker({format:"yyyy-mm-dd"}),t&&$("#datepicker-start-"+this.counter).focus(),this.addTableButtonHandlers()},this.serialize=function(){for(var t={settings:{},tasks:[],theme:{frameBorderColor:"#ffffff",frameFillColor:"#888888",stripeColorDark:"#dddddd",stripeColorLight:"#eeeeee",gridColor:"#999999"}},e=$(".task"),o=0;o<e.length;o++){var n=e[o],i=n.id,r=i.replace(/^task-/,""),d=$("#datepicker-start-"+r).datepicker("getFormattedDate"),a=$("#datepicker-end-"+r).datepicker("getFormattedDate"),s=$("#datepicker-end-"+r+"-ongoing").prop("checked");s&&(a="-");var c=$("#label-"+r).val(),l={};l.start=d,l.end=a,l.label=c,t.tasks.push(l)}t.settings.end=$("#datepicker-end").datepicker("getFormattedDate");var u=$("#datepicker-end-ongoing").prop("checked");return u&&(t.settings.end="-"),t.settings.zoom=parseInt($("#zoom-input").val()),t.settings.hideDaysFrom=parseInt($("#hide-days-from-input").val()),t.settings.hideWeeksFrom=parseInt($("#hide-weeks-from-input").val()),t.theme.colorScheme=$("#color-scheme-select").val(),t.theme.borderColor1=$("#color-picker-border-1").colorpicker("getValue","-"),t.theme.fillColor1=$("#color-picker-fill-1").colorpicker("getValue","-"),t.theme.borderColor2=$("#color-picker-border-2").colorpicker("getValue","-"),t.theme.fillColor2=$("#color-picker-fill-2").colorpicker("getValue","-"),JSON.stringify(t)},this.post=function(){var t=this.serialize();$.post("/timeline",t,function(e){return $("#result").html(e),0===t.length?void $("#source-div").css({display:"none"}):($("#source-div").css({display:"block"}),void($("#source")[0].value=t))})},this.up=function(t){var e=t.replace(/^up-button/,"#task");$(e).prev().before($(e)),this.addTableButtonHandlers()},this.down=function(t){var e=t.replace(/^down-button/,"#task");$(e).next().after($(e)),this.addTableButtonHandlers()},this.delete=function(t){var e=t.replace(/^delete-button/,"#task");$(e).remove(),this.addTableButtonHandlers()}};window.onload=mainFunc;