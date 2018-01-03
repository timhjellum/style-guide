
/*
 RequireJS order 1.0.5 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 Available via the MIT or new BSD license.
 see: http://github.com/jrburke/requirejs for details
*/
(function(){function k(a){var b=a.currentTarget||a.srcElement,c;if(a.type==="load"||l.test(b.readyState)){a=b.getAttribute("data-requiremodule");j[a]=!0;for(a=0;c=g[a];a++)if(j[c.name])c.req([c.name],c.onLoad);else break;a>0&&g.splice(0,a);setTimeout(function(){b.parentNode.removeChild(b)},15)}}function m(a){var b,c;a.setAttribute("data-orderloaded","loaded");for(a=0;c=h[a];a++)if((b=i[c])&&b.getAttribute("data-orderloaded")==="loaded")delete i[c],require.addScriptToDom(b);else break;a>0&&h.splice(0,
a)}var f=typeof document!=="undefined"&&typeof window!=="undefined"&&document.createElement("script"),n=f&&(f.async||window.opera&&Object.prototype.toString.call(window.opera)==="[object Opera]"||"MozAppearance"in document.documentElement.style),o=f&&f.readyState==="uninitialized",l=/^(complete|loaded)$/,g=[],j={},i={},h=[],f=null;define('order',{version:"1.0.5",load:function(a,b,c,e){var d;b.nameToUrl?(d=b.nameToUrl(a,null),require.s.skipAsync[d]=!0,n||e.isBuild?b([a],c):o?(e=require.s.contexts._,!e.urlFetched[d]&&
!e.loaded[a]&&(e.urlFetched[d]=!0,require.resourcesReady(!1),e.scriptCount+=1,d=require.attach(d,e,a,null,null,m),i[a]=d,h.push(a)),b([a],c)):b.specified(a)?b([a],c):(g.push({name:a,req:b,onLoad:c}),require.attach(d,null,a,k,"script/cache"))):b([a],c)}})})();
define('map',
[
	'signals',
	'classy',
	'order!jVectorMap',
	'order!usa-en'
],
function(signals, Class, mapTemplate){
	
	return Class.$extend({
		__init__ : function(container){
			var self = this;
			
			this.container = container;
			this.regionClicked =  new signals.Signal();
			
			this.mapContainer = $('#mapContainer', this.container);
			this.legendContainer = $('#map_legend', this.container);
			this.titleContainer = $('#mapTitle', this.container);
			
			this.counts = null;
			
			this.map = null;
			this.buckets = [];
			this.colors = {};
			
			this.options = { 
				bucketFunction: this.$class.linearBucketFunction,
				map: 'usa_en',
				normalizeFunction: 'polynomial',
				hoverOpacity: 0.7,
				hoverColor: false,
				backgroundColor: 'white',
				dataPrecision : 0
			};
		},
		
		update : function(counts, title, options){
			var self = this;
			this.counts = counts;
			this.options = $.extend(this.options, options);
			this.titleContainer.text(title);
			
			this.buckets = this.options.bucketFunction.call(this, this.counts, this.$class.palette);
			this.colors = this.assignColors.call(this, this.counts, this.buckets, this.$class.palette);
			
			this.createLegend(this.buckets, this.$class.palette);
			this.mapContainer.height(
				this.mapContainer.parent().height() - 
					(this.titleContainer.outerHeight(true) + 
					this.legendContainer.outerHeight(true) + 
					parseInt(this.mapContainer.css('paddingTop')) +  
					parseInt(this.mapContainer.css('paddingBottom')) + 
					10)
				);
			this.createMap(this.getInitialColors(), this.options);
		},
		
		createMap : function(colors, options){
			var self = this;
			if(this.map) {
				this.map.destroy();
			}
			this.mapContainer.empty();
			this.map = $('<div style="height:100%;width:100%;" class="map_inside_container"></div>').appendTo(this.mapContainer)
			.vectorMap($.extend({
				'colors' : colors,
				'onRegionClick' : function(event, code) {
					self.regionClicked.dispatch(code.toUpperCase());
				}
			}, options));
		},
		
		createLegend : function(buckets, colors){
			var self = this,
			minVal, maxVal, prevMinVal, prevMaxVal, displayMin, displayMax;
			this.legendContainer.empty();
			var innerLegendContainer = $('<span style="display: inline-block; text-align:center;"></span>').appendTo(this.legendContainer);
			if (this.options.legendTitle){
				$('<span class="map_legend_title">' + this.options.legendTitle + '</span>').appendTo(innerLegendContainer);
				$('<br />').appendTo(innerLegendContainer);
			}

			$.each(buckets, function(index, bucket){
				if(self.options.legendItemFormatter){
					displayMin = self.options.legendItemFormatter.call(self, bucket.min);
					displayMax = self.options.legendItemFormatter.call(self, bucket.max);
				}
				else{
					displayMin = bucket.min;
					displayMax = bucket.max;
				}
					

				if(!(isNaN(bucket.min) || isNaN(bucket.max)) && !(bucket.min == bucket.max && bucket.min == prevMaxVal)) {
					var markerContainer = $('<span class="marker_container"></span>');
					$('<span class="map_legend_marker"></span>').appendTo(markerContainer)
					.css('background-color', colors[index])
					.after('<span>' + displayMin + (bucket.min < bucket.max ? ' to ' + displayMax + '</span>' : '')
					);
					markerContainer.appendTo(innerLegendContainer);
				}
				return true;
			});
		},
		
		destroy : function() {
			if(this.map) {
				this.map.destroy();
			}
			this.mapContainer.empty();
			this.legendContainer.empty();
			this.titleContainer.empty();
		},
		
		getInitialColors : function() {
			return this.colors;
		},
			
		calculateMinMax : function(counts) {
			var ret = {};
			for(state in counts) {
				ret.min = (((ret.min == null || counts[state] < ret.min) && counts[state] != 0) ? counts[state] : ret.min);
				ret.max = (((ret.max == null || counts[state] > ret.max) && counts[state] != 0) ? counts[state] : ret.max);
			}	
			
			return ret;
		},
		
		assignColors : function(counts, buckets, palette){
			var ret = {}, state, count, bucket;
			
			for (state in counts) {
				count = parseFloat(Highcharts.numberFormat(counts[state], this.options.dataPrecision, '.', ''));
				for(var i = 0; i < buckets.length; i++) {
					if(count >= buckets[i].min && count <= buckets[i].max) {
						ret[state.toLowerCase()] = palette[i];
					}
				}
			}
			return ret;
			},

		__classvars__ : {
		
			palette : ['#7ce3ff', '#4cc9ff', '#0196d8', '#00628c', '#00355b'],
			
			linearBucketFunction : function(counts, palette) {
				var ret = [], state, minMax = this.calculateMinMax(counts);

				var step = (minMax.max - minMax.min) / palette.length;
				
				for(var i = 0; i < palette.length; i++) {
					var bucket = {min: null, max: null};
					bucket.min = parseFloat(Highcharts.numberFormat(minMax.min + step*i, this.options.dataPrecision, '.', ''));
					bucket.min = (i == 0 ? bucket.min : bucket.min + 1/Math.pow(10, this.options.dataPrecision));
					bucket.max = parseFloat(Highcharts.numberFormat(minMax.min + step*(i+1), this.options.dataPrecision, '.', ''));
					bucket.max = (bucket.max < bucket.min ? bucket.min : bucket.max);
					
					if(ret.length == 0 || bucket.min != ret[ret.length-1].min || bucket.max != ret[ret.length-1].max) {
						ret.push(bucket);
					}
					if(bucket.max >= minMax.max) {
						break;
					}
				}
				
				return ret;
			},
			
			differenceBucketFunction : function(counts, palette) {
				var ret = [], state, min = null, max = null;
				var sortedCounts = [];
				
				for(state in counts) {
					if(counts[state] != null) {
						sortedCounts.push({'state':state, 'value': counts[state]});
					}
					min = (((min == null || counts[state] < min) && counts[state] != null) ? counts[state] : min);
					max = (((max == null || counts[state] > max) && counts[state] != null) ? counts[state] : max);
				}
				sortedCounts = sortedCounts.sort(function(a, b) {
					if(a.value > b.value) {
						return -1;
					}
					if(a.value < b.value) {
						return 1;
					}
					return 0;
				});
				var differences = [];
				
				for(var j = 0; j < sortedCounts.length - 1; j++) {
						differences.push({diff: Math.abs(sortedCounts[j+1].value - sortedCounts[j].value), index: j, value : sortedCounts[j].value + (sortedCounts[j+1].value - sortedCounts[j].value)/2});
				}
				
				differences = differences.sort(function(a, b) {
					if(a.diff > b.diff) {
						return -1;
					}
					if(a.diff < b.diff) {
						return 1;
					}
					return 0;
				})
				.slice(0, palette.length -1)
				.sort(function(a, b) {
					if(a.value > b.value) {
						return 1;
					}
					if(a.value < b.value) {
						return -1;
					}
					return 0;
				});
				
				
				
				for(var i = 0; i < palette.length; i++) {
					var bucket = {min: null, max: null};
					bucket.min = parseFloat(Highcharts.numberFormat(i == 0 ? min :differences[i-1].value, this.options.dataPrecision, '.', ''));
					bucket.min = (i == 0 ? bucket.min : bucket.min + 1/Math.pow(10, this.options.dataPrecision));
					bucket.max = parseFloat(Highcharts.numberFormat((i == (palette.length - 1)) ? (max) : differences[i].value, this.options.dataPrecision, '.', ''));
					bucket.max = ((i == (palette.length - 1)) ? (bucket.max) : (bucket.max < bucket.min ? bucket.min : bucket.max));
					if(bucket.min != ret[ret.length-1].min || bucket.max != ret[ret.length-1].max) {
						ret.push(bucket);
					}
				}
				
				return ret;
			}
		}
	});
});