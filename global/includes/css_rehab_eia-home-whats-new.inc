<!-- start module -->
<!-- start module -->
<!-- start module -->

<h2>What's New</h2>
      <?php
        if(!$whatsNew = file_get_contents("CFusionMX7/global/data/whatsnew2.htm", FILE_USE_INCLUDE_PATH)) {
          echo "<a href=\"about/new/\">See what's new</a>";
        } else {
          echo $whatsNew;
        }
      ?>
<h5><b><a href="about/new/">More &rsaquo;</a></b></h5>
        




<div class="content-container dark-top-border-container">
<ul>
<li class="header">
<h2>What's New</h2>
</li>
<li>
<a href="/">Drilling Productivity Report</a>
</li>
<span class="date">June 12</li>
<li>
<a href="/">Short-Term Energy Outlook</a>
</li>
<span class="date">June 12</li>
<li>
<a href="/">Petroleum Marketing Monthly</a>
<span class="date">June 12</li>
<li class="footer">
<a href="/" class="strong">More</a>
</li>
</ul>
</div>    <hr>
<ul>
<li class="header">
<h2>Coming Up</h2>
</li>
<li>
<a href="/">Refinery Capacity Report</a>
</li>
<li>
<a href="/">U.S. Natural Gas Imports &amp; Exports</a>
</li>
<li>
<a href="/">Uranium Marketing Annual</a>
</li>
<li class="footer">
<a href="/" class="strong">More</a>
</li>
</ul>
</div>
<!-- end module -->
<!-- end module -->
<!-- end module -->