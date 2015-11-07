
$(document).ready(function(){
//inputStock('FB');
//addStock('AAPL');
//addStock('ea');
$.initialGraph=function(){
	var stockSuggest=["goog","fb","ea","aapl","amzn","jd","ebay","tcehy","baba","expe","nflx","bidu","yhoo","grpn","lnkd","twtr"];
	var html="";
	for(var i=0;i<stockSuggest.length;i++){
	  html+='<option value="'+stockSuggest[i]+'">'　;
	}
	$("#stockSuggestList").html(html);
	createChart();
	//inputStock("FB");
	//inputStock("ea");
}
$('#inputStock').keypress(function(e) {//alert(kk);
    if(e.which == 13) {
	console.log('press enter key');
	$('#addbutton').click();
      //inputStock($('#inputStock').val());
    }
});
$.inputStock=function (name){
  name=name.toUpperCase();
  if(name.length==0)return;
  var chart=$('#container').highcharts('StockChart');
  for(var i=0;i<chart.series.length;i++){
    if(chart.series[i].name==name){
		alert('Error: duplicate stock name');
		return;
    }
  }
  console.log($('#stocks')[0].childElementCount);
  
        addStock(name);
 
}

$.removeStock=function (name){
  console.log('"'+name+'"');
  var chart=$('#container').highcharts('StockChart');
  for(var i=0;i<chart.series.length;i++){
    console.log('"'+chart.series[i].name+'"');
    if(chart.series[i].name==name){
      console.log('find curve');
      chart.series[i].remove(true);
      break;
    }
  }
  
  chart.redraw();  
}
var update=false;
function createChart(){
	$('#container').highcharts('StockChart', {
		/*
			   chart : {
			   events : {
				   
                load : function () {

                    // set up the updating of the chart each second
					
                    //var series = this.series[0];
                    setInterval(function () {
						if(!update) return;
                        var arr=[];
						var stockName="";
						var chart=$('#container').highcharts('StockChart');
						//alert(chart.series.length);
						for(var i=0;i<chart.series.length;i++){
							if(chart.series[i].name=="Navigator") continue;
							stockName=chart.series[i].name;
							arr.push(chart.series[i].name.toUpperCase());
							console.log("---1");
							console.log(stockName);
							console.log(chart.series[i]);
							$.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/'+stockName+'.json?api_key=J1bNEMPSG62BJzmUPni8&start_date=2015-01-03&end_date=2015-11-03&order=asc', function(json) {
								console.log(json);
							var hiJson = json.dataset.data.map(function(d) {
							  return [new Date(d[0]).getTime(), d[4]]});
							  var index=arr.indexOf(json.dataset.dataset_code);
							  var chart=$('#container').highcharts('StockChart');
							  console.log("---2");
							  console.log(json.dataset.dataset_code);
							  console.log(arr);
							  console.log(index);
							  console.log(chart.series);
							chart.series[index].data=hiJson;
							chart.redraw();               
							//var name=chart.series[i].name;
							//	chart.series[i].remove();
							//	addStock(name);
						});
						}/*
						console.log(chart.series.length);
						console.log(chart.series);
						for(var i=0;i<chart.series.length;i++){
							chart.series[i].remove(true);
						}
						chart.series=[];
						//console.log(chart.series);
						var str="";
						for(var i=0;i<arr.length;i++){
							str+=arr[i]+",";
							addStock(arr[i]);
						}
						alert(str);
					
					console.log('----');*/
                    /*}, 5000);
                }
            }
			   },*/
          rangeSelector: {
            selected: 5
          },
          title: {
            text: 'Stock Price',
            align:'left'
          },
          series: [
		  /*{
            name: stockName,
            data: hiJson,
            tooltip: {
              valueDecimals: 2
            }
          }*/
		  ]
        });
}
var someonehere;
 function addStock(stockName) {
	 console.log('*someonehere');
	 console.log(someonehere);
	 //if(someonehere) return;
	 //else someonehere=true;
	 console.log('***');
   $.ajax({
    url: 'https://www.quandl.com/api/v3/datasets/WIKI/'+stockName+'.json?api_key=J1bNEMPSG62BJzmUPni8&start_date=2015-01-03&end_date=2015-11-03&order=asc', 
    data: {value: 1},
    type: 'get',
    error: function(XMLHttpRequest, textStatus, errorThrown){
        alert('Error: ' +stockName + ' '+ XMLHttpRequest.status + ' ' + XMLHttpRequest.statusText);
    },
    success: function(data){}
});
$.getJSON('https://www.quandl.com/api/v3/datasets/WIKI/'+stockName+'.json?api_key=J1bNEMPSG62BJzmUPni8&start_date=2015-01-03&end_date=2015-11-03&order=asc', function(json) {
	console.log(json);
        var hiJson = json.dataset.data.map(function(d) {
          return [new Date(d[0]).getTime(), d[4]]
        });
//add button
        var html = $('#stocks').html();
   console.log(html);
		console.log('add stock spinn');
      html+='<div class="col-xs-3"><button style="margin-bottom:10px" class="form-control item" id="'+json.dataset.dataset_code+'" title="'+json.dataset.name+'" onclick="';
//      html+='$.removeStock($(this).text().trim());console.log($(this));$(this).parent().remove()';
html+='	       console.log(\'0\');  ';
html+='	       var str = {};  ';
html+='	       console.log(\'1\');  ';
html+='	       str.stock= $(this).text().trim();  ';
html+='	       str.isdelete= true;  ';
html+='	       console.log(\'2\');  ';
html+='		$(\'#status\').html(\'Syncs in realtime across clients<i class=\\\'fa fa-spinner fa-pulse fa-1x\\\' style=\\\'margin-top:10px\\\'></i>\');';
html+='	       console.log(\'3\');  ';
html+='	       $.post(window.location.href,str,function(data){  ';
html+='		$.removeStock(data.stock);';
html+='		console.log($(this));';
html+='		$(\'#'+json.dataset.dataset_code+'\').parent().remove();';
html+='		$(\'#status\').html(\'Syncs in realtime across clients\');';
html+='		     });  ';
	html+='"><i class="fa fa-remove fa-1x"></i>&nbsp; '+json.dataset.dataset_code+'</button></div>';
       $('#stocks').html(html);
	   
       chart=$('#container').highcharts('StockChart');
  //if(chart!=undefined){
         console.log('got'); 
          chart.addSeries({
            name: stockName,
            data: hiJson,
            tooltip: {
              valueDecimals: 2
            }
          });
		  console.log(chart.series);
         chart.redraw();                 
   
                      $('#status').html('Syncs in realtime across clients');
    //}
	
	//someonehere=false;
});
 }

	$('#addbutton').click(function(){                            
		console.log('click add button');
	       var str = {};  
	       str.stock= $("#inputStock").val();  
		console.log('add spinn');
		$('#status').html('Syncs in realtime across clients<i class="fa fa-spinner fa-pulse fa-1x" style="margin-top:10px"></i>');
	       $.post(window.location.href,str,function(data){  
		$.inputStock(data.stock);
		     });  
	      });  
/*
window.setInterval(function () {
                        var arr=[];
					var chart=$('#container').highcharts('StockChart');
					for(var i=0;i<chart.series.length;i++){
						if(chart.series[i].name=="Navigator") continue;
						arr.push(chart.series[i].name);
					}
					console.log(chart.series.length);
					chart.series=[];
					for(var i=0;i<arr.length;i++){
						addStock(arr[i]);
					}
					console.log('----');
                    }, 1000);*/
});// end of documen ready
