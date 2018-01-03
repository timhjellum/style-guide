
/**
 *	The 'growthMap' module does stuff.
 *
 *	@module growthMap
 *	@requires map
 */
 
define('growthMap',
[
	'map'
],
function(Map){
	
	/**
	 *	Class for the {{#crossLinkModule "growthMap"}}growthMap{{/crossLinkModule}} Module
	 * 	@class GrowthMap
	 *	@extends Map
	 *	@constructor 
	 */
	return Map.$extend({
		/**
		 *	Constructor Function for growthMap
		 *	@method __init__
		 *	@param {JQuery} container A JQuery object representing a &lt;DIV&gt; that will contain the growthMap component.
		 */
		__init__ : function(container, basemap){
			this.$super(container, basemap);
		},
		
		update : function(counts, title, options){
			
			counts = $.map(counts, function(count, i){
				var ret = {};
				for(var state in count)
					if(count.hasOwnProperty(state) && i > 0  && typeof counts[i-1] != 'undefined' && counts[i-1].hasOwnProperty(state))
						if((count[state] * counts[i -1][state]) > 0)
							ret[state] = 100 * (count[state] - counts[i-1][state]) / counts[i-1][state];
				return ret;
			});
			
			this.$super(counts, title, 
				$.extend({}, options, {
					backgroundColor : '#ffffff'
				})
			);
		},

		createRegionOps : function(){
			return [{
				attributes : this.getCurrentColors()
			}];
		},
		
		createLegend : function(){
			var self = this,
			minVal, maxVal, prevMinVal, prevMaxVal, displayMin, displayMax;
			this.legendContainer.empty();
			var innerLegendContainer = $('<span style="display: inline-block; text-align:center;"></span>').appendTo(this.legendContainer);
			
			if (this.options.legendTitle){
				$('<span class="map_legend_title">' + this.options.legendTitle + '</span>').appendTo(innerLegendContainer);
				$('<br />').appendTo(innerLegendContainer);
			}
			
			if(self.options.legendItemFormatter){
				displayMin = self.options.legendItemFormatter.call(self, this.min);
				displayMax = self.options.legendItemFormatter.call(self, this.max);
			}
			else{
				displayMin = this.min;
				displayMax = this.max;
			}
				
			var gradientText1 = '';
			var gradientText2 = '';
			
			gradientText1 += 'background-image: -ms-linear-gradient(left, ' + this.$class.palette[0] + ' 0%, ' + this.$class.palette[1] + ' 100%);'/* Internet Explorer 9-11 */
			gradientText1 += '-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=' + this.$class.palette[0] + ', endColorstr=' + this.$class.palette[1] + ', gradientType=1)";'; /* Internet Explorer 8 */
			gradientText1 += 'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=' + this.$class.palette[0] + ', endColorstr=' + this.$class.palette[1] + ', gradientType=1)'; /* Internet Explorer 5.5 - 7 */
			gradientText1 += 'background-image: -webkit-gradient(linear, left bottom, right bottom, from(' + this.$class.palette[0] + '), to(' + this.$class.palette[1] + '));'; /* Safari 4+, Chrome */
			gradientText1 += 'background-image: -webkit-linear-gradient(left, ' + this.$class.palette[0] + ', ' + this.$class.palette[1] + ');'; /* Chrome 10+, Safari 5.1+, iOS 5+ */
			gradientText1 += 'background-image:    -moz-linear-gradient(left, ' + this.$class.palette[0] + ', ' + this.$class.palette[1] + ');'; /* Firefox 3.6-15 */
			gradientText1 += 'background-image:      -o-linear-gradient(left, ' + this.$class.palette[0] + ', ' + this.$class.palette[1] + ';'; /* Opera 11.10+ */
			gradientText1 += 'background-image:         linear-gradient(to left, ' + this.$class.palette[0] + ',' + this.$class.palette[1] + ');'; /* Firefox 16+ */
			
			gradientText2 += 'background-image: -ms-linear-gradient(left, ' + this.$class.palette[3] + ' 0%, ' + this.$class.palette[4] + ' 100%);'/* Internet Explorer 9-11 */
			gradientText2 += '-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=' + this.$class.palette[3] + ', endColorstr=' + this.$class.palette[4] + ', gradientType=1)";'; /* Internet Explorer 8 */
			gradientText2 += 'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=' + this.$class.palette[3] + ', endColorstr=' + this.$class.palette[4] + ', gradientType=1)'; /* Internet Explorer 5.5 - 7 */
			gradientText2 += 'background-image: -webkit-gradient(linear, left bottom, right bottom, from(' + this.$class.palette[3] + '), to(' + this.$class.palette[4] + '));'; /* Safari 4+, Chrome */
			gradientText2 += 'background-image: -webkit-linear-gradient(left, ' + this.$class.palette[3] + ', ' + this.$class.palette[4] + ');'; /* Chrome 10+, Safari 5.1+, iOS 5+ */
			gradientText2 += 'background-image:    -moz-linear-gradient(left, ' + this.$class.palette[3] + ', ' + this.$class.palette[4] + ');'; /* Firefox 3.6-15 */
			gradientText2 += 'background-image:      -o-linear-gradient(left, ' + this.$class.palette[3] + ', ' + this.$class.palette[4] + ';'; /* Opera 11.10+ */
			gradientText2 += 'background-image:         linear-gradient(to left, ' + this.$class.palette[3] + ',' + this.$class.palette[4] + ');'; /* Firefox 16+ */
			
			$('<span>' + displayMin + '</span>').appendTo(innerLegendContainer);
			var gradientContainer = $('<span class="map_legend_gradient"></span>').appendTo(innerLegendContainer);
			$('<span class="growth_gradient_component"></span>').attr('style', gradientText1).appendTo(gradientContainer);
			$('<span class="growth_gradient_component"></span>').attr('style', gradientText2).appendTo(gradientContainer);
			$('<span>' + displayMax + '</span>').appendTo(innerLegendContainer);
			$('<br />').appendTo(innerLegendContainer);
			$('<br />').appendTo(innerLegendContainer);
			var naLegendContainer = $('<div/>').appendTo(innerLegendContainer);
			$('<span></span').appendTo(naLegendContainer).attr('style', 'display:inline-block;margin-right:10px;width:20px;height:20px;background-color:#CCC');
			$('<span>Value is not available</span>').appendTo(naLegendContainer).attr('style', 'margin-top:3px;display:inline-block;');
		},

		calculateMinMax : function() {
			if(this.options.extremes !== void 0){
				this.min = this.options.extremes.min;
				this.max = this.options.extremes.max;
			}
			else{
				this.$super();
			
				if(this.max > 0 && this.min < 0){
					if(Math.abs(this.min) > this.max)
						this.max = Math.abs(this.min);
					else
						this.min = -1 * this.max;
				}	
			}
		},
		
		assignColors : function(){
			var ret = [], max = this.max, min = this.min,
			rMin, rMax, gMin, gMax, bMin, bMax,
			state, count, bucket, ratio, r, g, b;
			
			for(var i = 0; i < this.counts.length; i++){
				for (state in this.counts[i]) {
					count = parseFloat(Highcharts.numberFormat(this.counts[i][state], this.options.dataPrecision, '.', ''));
					if(count < 0){
						ratio = (count - min) / (-1 * min);
						rMin = parseInt(this.$class.palette[0].substring(1, 3), 16);
						rMax = parseInt(this.$class.palette[1].substring(1, 3), 16);
						gMin = parseInt(this.$class.palette[0].substring(3, 5), 16);
						gMax = parseInt(this.$class.palette[1].substring(3, 5), 16);
						bMin = parseInt(this.$class.palette[0].substring(5), 16);
						bMax = parseInt(this.$class.palette[1].substring(5), 16);
						r = (rMin < rMax ? Math.max : Math.min).call(window, parseInt(ratio * rMax - (ratio - 1) * rMin, 10), rMin).toString(16).replace(/^(\w{1})$/, '0$1');
						g = (gMin < gMax ? Math.max : Math.min).call(window, parseInt(ratio * gMax - (ratio - 1) * gMin, 10), gMin).toString(16).replace(/^(\w{1})$/, '0$1');
						b = (bMin < bMax ? Math.max : Math.min).call(window, parseInt(ratio * bMax - (ratio - 1) * bMin, 10), bMin).toString(16).replace(/^(\w{1})$/, '0$1');
					}
					else if(count > 0){
						ratio = count / max;
						rMin = parseInt(this.$class.palette[3].substring(1, 3), 16);
						rMax = parseInt(this.$class.palette[4].substring(1, 3), 16);
						gMin = parseInt(this.$class.palette[3].substring(3, 5), 16);
						gMax = parseInt(this.$class.palette[4].substring(3, 5), 16);
						bMin = parseInt(this.$class.palette[3].substring(5), 16);
						bMax = parseInt(this.$class.palette[4].substring(5), 16);
						r = (rMin > rMax ? Math.max : Math.min).call(window, parseInt(ratio * rMax - (ratio - 1) * rMin, 10), rMax).toString(16).replace(/^(\w{1})$/, '0$1');
						g = (gMin > gMax ? Math.max : Math.min).call(window, parseInt(ratio * gMax - (ratio - 1) * gMin, 10), gMax).toString(16).replace(/^(\w{1})$/, '0$1');
						b = (bMin > bMax ? Math.max : Math.min).call(window, parseInt(ratio * bMax - (ratio - 1) * bMin, 10), bMax).toString(16).replace(/^(\w{1})$/, '0$1');
					}
					else{
						r = this.$class.palette[2].substring(1, 3);
						g = this.$class.palette[2].substring(3, 5);
						b = this.$class.palette[2].substring(5);
					}
					if(!ret[i]) ret[i] = {};
					ret[i][state] = '#' + r + g + b;
				}
			}
			
			this.colors = ret;
		},
		
		__classvars__ : {
			palette : ['#6F2EA4', '#C5ABDB', '#CCCCCC', '#BED5AD', '#5D9732']
		}
	});
});