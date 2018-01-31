<?php /* GOM Sub Nav */ ?>
<?php
require_once 'global/includes/utils/utils.inc';
require_once 'global/includes/utils/Neic.inc';
$neic      = new NEIC();

$sect = 'GOM';
?>
<?php
//hsh_sql:
//associated with query name Utags2
$bindVariables = array();
$neic->sql = "  SELECT distinct archives_report_lu.tagid, archives_report_lu.sid, archives_report_subject.subject, archives_report_tag.tag,
    count(ARCHIVES_REPORT_LIST.HAS_DATA) as D, count(ARCHIVES_REPORT_LIST.HAS_FORECAST) as F, count(ARCHIVES_REPORT_LIST.HAS_ANALYSIS) as A
          FROM neic.archives_report_lu, neic.archives_report_subject, neic.archives_report_tag, NEIC.ARCHIVES_REPORT_LIST
          WHERE ( archives_report_subject.id = archives_report_lu.sid )
            AND ( archives_report_tag.id = archives_report_lu.tagid )
            AND ( archives_report_lu.id = archives_report_list.id)
            AND ( archives_report_subject.subject = :subject )
            group by archives_report_lu.tagid, archives_report_lu.sid, archives_report_subject.subject, archives_report_tag.tag
            order by tag ";
$bindVariables[":subject"] = $sect;
//print $neic->sql;
//print_r($bindVariables);
$Utags2 = $neic->get($bindVariables);
?>
<script>
	$(function(){
		$('.dropdown').dd();
	});

$(document).ready(function(){
    $("div.dat_block a").click(function(){
		 $("table.contable").children("tbody").hide();
		$("table.contable th").removeClass("active");
		var sID = this.href.substring(this.href.indexOf("#") + 1);
		$("[name$='" + sID + "']").click();
  });
});	
</script>

    <div class="title bg_default"><?php /* Page/Section Title */ ?>
      <h1>Gulf of Mexico Fact Sheet</h1>
    </div><?php /*/ Page/Section Title */ ?>
    
    <div class="subnav"><?php /* Page/Sub Nav */ ?>
      <ul>
        <li <?php if ( $locale == 'overview') {?>class="active"<?php  } // end if ?>><a href="/special/new_gom/">Overview</a></li>
        <li class="dropdown <?php if ( $locale == 'data') {?>active<?php  } // end if ?>"><a href="/special/new_gom/data.cfm">Energy Data</a></li>
       <?php /* Data Menu Drop Down */ ?>
        <div class="dat_block dat_links">
            <ul>
              <li><a href="/special/new_gom/data.cfm#petroleum_fuel_facts">Petroleum and Other Liquids</a></li>
              <li><a href="/special/new_gom/data.cfm#nat_gas_facts">Natural Gas</a></li>
              <li><a href="/special/new_gom/data.cfm#gulf_coast_refinery">Refinery Capacity</a></li>
              <li><a href="/special/new_gom/data.cfm#gulf_coast_processing">Natural Gas Processing Plants</a></li>
             </ul>
        </div>
        <?php /*/ Data Menu Drop Down */ ?>
        <li <?php if ( $locale == 'map') {?>class="active"<?php  } // end if ?>><a href="/special/new_gom/map.cfm">Map</a></li>
     	<?php /*li <?php if ( $locale == 'hurricane') {?>class="active"<?php  } // end if ?>><a href="/special/new_gom/hurricane_outlook.cfm">Hurricane Season Outlook</a></li>
        <li <?php if ( $locale == 'tropical') {?>class="active"<?php  } // end if ?>><a href="/special/new_gom/tropical_outlook.cfm">Current Tropical Outlook</a></li*/ ?>
      
      </ul>
      </div><?php /*/ Page/Sub Nav */ ?>