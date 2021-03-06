$("body").append(<!-- Splash Templates -->

<script type="text/template" data-template="blind-ardor">
  <div class="ui four column grid centered">
    <div class="changeling column">
      <div class="title-container">
        <h1 class="splash-title">blind_ardor</h1>
      </div>
    </div>
  </div>
</script>

<script type="text/template" data-template="trace-trail">
  <div class="column">
    <div class="title-container">
      <a href="/#tree-search"><h1 class="splash-title">trace</h1></a>
    </div>
  </div>
  <div class="column">
    <div class="title-container">
      <a href="/#trail-pick"><h1 class="splash-title">trail</h1></a>
    </div>
  </div>
</script>

<!-- Designer App Templates -->

<script type="text/template" data-template="designer">
  <div class="row"></div>
  <div class="sixteen wide column" id="bubble-container"></div>
  <div class="row"></div>
  <div class="sixteen wide column" id="page-container"></div>
</script>


<script type="text/template" data-template="nav-bubbles">
  <div class="column nav">
    <a href="/">blind_ardor</a>
  </div>
  <div class="column nav-bubble">
      <a id="one" href="/#tree-search">1</a>
  </div>
  <div class="column nav-bubble">
    <a id="two" href="/#tree-sort">2</a>
  </div>
  <div class="column nav-bubble">
    <a id="three" href="/#tree-save">3</a>
  </div>
  <div class="column nav">
    <a href="/#trail-pick">Trail</a>
  </div>
</script>

<!-- Tree Search Templates -->

<script type="text/template" data-template="tree-search">
  <div class="six wide column" id="search-form-container">
    <div class="buffer"></div>
  </div>
  <div class="ten wide column" id="search-map-container"></div>  
</script>

<script type="text/template" data-template="search-form">
  <label class="species-search-label">trunk diameter:</label>
  <select id="diameter-select">
    <option value="" selected>Any</option>
    <option value="xs">XS</option>
    <option value="s">S</option>
    <option value="m">M</option>
    <option value="l">L</option>
  </select>
  <button class="orange-btn">search</button>
</script>

<script type="text/template" data-template="species-input">
  <label class="species-search-label" for="species-input">species:</label>
  <input type="text" id="species-input" placeholder="any">
</script>

<script type="text/template" data-template="search-results">
  <h3>
    <span data-action="show-previous-ten">back</span>  
    <span data-action="show-next-ten">forward</span>
  </h3>
  <p>Showing {{lowerBound}} through {{upperBound}} of {{length}} results</p>
</script>

<script type="text/template" data-template="tree-show">
  <div class="ui grid three column centered">
    <div class="column treeshowtext">
      <h1 class="tree-show-species">{{species}}</h1>
      <p>{{borough}}</p>
      <p>{{street}}</p>
      <p>Nearest Building: {{building_number}} {{building_street}}</p>
      <p>{{diameter}} inches diameter</p>
    </div>
  </div>
</script>

<script type="text/template" data-template="add-button">
  <div class="ui grid two column">
    <div class="column">
      <div class="add-to-trail-container">
        <p class="add-to-trail">Add to Trail</p>
      </div>
    </div>  
  </div>
</script>

<!-- Tree Sort Templates -->

<script type="text/template" data-template="tree-sort">
  <div class="ten wide column" id="sort-trees-container"></div>
  <div class="six wide column" id="sort-map-container"></div>  
</script>

<script type="text/template" data-template="tree-to-sort">
    <p data-id="{{id}}">{{species}}</p>
    <p>{{borough}}</p>
    <p>{{street}}</p> 
</script>

<!-- Tree Save Templates -->

<script type="text/template" data-template="tree-save">
  <div class="twelve wide column" id="save-map-container"></div>
  <div class="twelve wide column" id="save-form-container"></div>
</script>

<script type="text/template" data-template="tree-save-form">
  <form>
    <input type="text" name="name">
    <button data-action="submit-trail">Save</button>
  </form>
</script>

<!-- Follower App Templates -->

<script type="text/template" data-template="follower">
  <div class="row"></div>
  <div class="sixteen wide column" id="nav-container"></div>
  <div class="row"></div>
  <div class="sixteen wide column" id="page-container"></div>
</script>

<script type="text/template" data-template="follower-nav">
  <div class="column follower-nav">
    <a href="/#tree-search">Trace</a>
  </div>
  <div class="column follower-nav">
    <a href="/">blind_ardor</a>
  </div>
  <div class="column follower-nav">
    <a href="/#trail-pick">Trailing</a>
  </div>
</script>

<!-- Trail Pick Templates -->

<script type="text/template" data-template="trail-pick">
  <div class="four wide column" id="trails-filters-container"></div>
  <div class="twelve wide column" id="trails-list-container"></div>
</script>

<script type="text/template" data-template="trail-in-list">
  <h3>{{name}}</h3>
  <p>{{boroughs}}</p>
  <p>Sum of diameters: {{diameterage}}''</p>
</script>

<!-- Trail Follow templates -->

<script type="text/template" data-template="trail-follow">
  <div class="twelve wide column" id="save-map-container"></div> 
</script>

);