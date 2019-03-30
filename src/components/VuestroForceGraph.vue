
angular.module 'trapjawApp'
.controller 'NodeBrowserController', ($rootScope, $scope, $http, socket) ->

  $rootScope.graph =
    nodes: []
    links: []

  socket.socket.on 'growlan.cluster', (data) ->
    nodes = []
    for d,i in data
      nodes.push
        name: d.id
        size: 20
        group: i
        props: d

    links = []
    for i in [0...nodes.length]
      for j in [0...nodes.length]
        unless i is j
          links.push
            source: i
            target: j
            value: 1

    $rootScope.graph =
      nodes: nodes
      links: links

.directive 'networkGraph', ($window) ->

  link = (scope, el, attrs) ->
    sel = el[0]
    width = $window.innerWidth
    height = $window.innerHeight - 105

    fill = d3.scale.linear().range [
      '#00aff3'
      '#d8a7ae'
    ]

    force = d3.layout.force()
      .nodes(scope.data.nodes)
      .links(scope.data.links)
      .charge -200
      .gravity 0.3
      .friction 0.6
      .linkDistance 200
      .size [width, height]
      .start()

    svg = d3.select sel
      .append 'svg'
      .attr 'width', width
      .attr 'height', height

    links = svg.selectAll '.link'
    nodes = svg.selectAll 'g.node'

    tick = (e) ->
      # Push different nodes in different directions for clustering.
      links
        .attr "x1", (d) ->
          d.source.x
        .attr "y1", (d) ->
          d.source.y
        .attr "x2", (d) ->
          d.target.x
        .attr "y2", (d) ->
          d.target.y

      # use transform b/c nodes are made up of g elements
      nodes.attr 'transform', (d) ->
        "translate(#{d.x}, #{d.y})"

    force.on 'tick', tick
    drag = force.drag().on 'dragstart', (d) ->
      if d3.select(this).selectAll("circle.halo").empty()
        d3.select(this)
          .insert("circle", "circle")
          .attr "r", (d) ->
            d.size + 3
          .attr "class", "halo"
          .style
            "fill-opacity": 0
            stroke: "#222"
            "stroke-dasharray": "2"

        popup = d3.select(this)
          .insert "g", "text"
          .attr "class", "legend"
            
        popup.insert "rect"
            .attr 'width', (d) ->
              if d.width < 200
                200
              else
                d.width
            .attr 'height', 0
            .attr "x", (d) ->
              if d.width < 200
                -100
              else
                -d.width / 2
            .attr "y", (d) ->
              "#{d.size*2 - 14}px"
            .attr "rx", 4
            .attr "ry", 4
            .style "fill", (d) ->
              fill d.group
            .transition()
              .duration 750
              .attr 'height', 120

        popup.insert "rect"
            .attr 'width', (d) ->
              if d.width < 200
                200
              else
                d.width
            .attr 'height', 90
            .attr "x", (d) ->
              if d.width < 200
                -100
              else
                -d.width / 2
            .attr "y", (d) ->
              "#{d.size*2 + 7}px"
            .style "fill", "#fff"
            .style 'opacity', 0
            .transition()
              .duration 750
              .style 'opacity', 1

        popup.insert "text"
          .attr 'x', (d) ->
            if d.width < 200
              -90
            else
              -d.width / 2 + 10
          .attr 'y', (d) ->
            "#{d.size*2 + 24}px"
          .text (d, i) ->
            "Hostname: #{d.props.ifaces[0].hostname}"
          .style 'opacity', 0
          .transition()
            .duration 750
            .style 'opacity', 1

        popup.insert "text"
          .attr 'x', (d) ->
            if d.width < 200
              -90
            else
              -d.width / 2 + 10
          .attr 'y', (d) ->
            "#{d.size*2 + 44}px"
          .text (d, i) ->
            "IP Address: #{d.props.ifaces[0].addr}"
          .style 'opacity', 0
          .transition()
            .duration 750
            .style 'opacity', 1

        popup.insert "text"
          .attr 'x', (d) ->
            if d.width < 200
              -90
            else
              -d.width / 2 + 10
          .attr 'y', (d) ->
            "#{d.size*2 + 64}px"
          .attr 'id', (d) ->
            "uptime-#{d.name}"
          .text (d, i) ->
            "Uptime: #{formatInterval(Math.floor(Date.now() / 1000) - d.props.uptime)}"
          .style 'opacity', 0
          .transition()
            .duration 750
            .style 'opacity', 1

        popup.insert "text"
          .attr 'x', (d) ->
            if d.width < 200
              -90
            else
              -d.width / 2 + 10
          .attr 'y', (d) ->
            "#{d.size*2 + 84}px"
          .text (d, i) ->
            "Version: #{d.props.version}"
          .style 'opacity', 0
          .transition()
            .duration 750
            .style 'opacity', 1

      d.fixed = true

    redraw = (data) ->
      restart = false
      # prune old nodes and links
      for en,i in force.nodes()
        isOld = true
        for n in data.nodes
          if en and en.name is n.name
            isOld = false
            if en.fixed
              $("#uptime-#{n.name}").text "Uptime: #{formatInterval(Math.floor(Date.now() / 1000) - n.props.uptime)}"
        if isOld
          restart = true
          force.nodes().splice i,1

      for el,i in force.links()
        isOld = true
        for l in data.links
          if el and el.source?.index is l.source and el.target?.index is l.target
            isOld = false
        if isOld
          restart = true
          force.links().splice i,1

      # add new nodes and links
      for n in data.nodes
        isNew = true
        for en in force.nodes()
          if en.name is n.name
            isNew = false
        if isNew
          restart = true
          force.nodes().push n
      if force.links().length > 0
        for l in data.links
          isNew = true
          for el in force.links()
            if el.source?.index is l.source and el.target?.index is l.target
              isNew = false
          if isNew
            restart = true
            force.links().push l
      else
        restart = true
        force.links(data.links)

      links = svg.selectAll '.link'
        .data force.links()
      links.enter()
        .insert 'line', '.node' # insert before g.node elements so links won't cover nodes
          .attr 'class', 'link'
      links.exit().remove()

      nodes = svg.selectAll 'g.node'
        .data force.nodes()
        .call force.drag

      nodeEnter = nodes.enter().insert 'g'
        .attr 'class', 'node'
        .on "dblclick", (d) ->
          d3.select(this).selectAll("circle.halo").remove()
          d3.select(this).selectAll("g.legend").remove()
          d.fixed = false
          force.start()
        .call drag
    
      nodeEnter.insert 'circle'
        .attr 'r', (d) ->
          d.size
        .style 'fill', (d, i) ->
          fill d.group
        .on "mouseover", (d, i) ->
          d3.select(this).style "fill", "gold"
        .on "mouseout", (d) ->
          d3.select(this).style "fill", (d) ->
            fill d.group
        .style 'stroke', (d, i) ->
          d3.rgb(fill(d.group)).darker 2
        .transition()
          .duration 750
          .ease "elastic"
          .attr "r", (d) ->
            d.size

      nodeEnter.append 'text'
        .attr 'dy', (d) ->
          "#{d.size*2}px"
        .style 'text-anchor', 'middle'
        .text (d) ->
          d.name
        .each (d) ->
          d.width = this.getBBox().width + 8
      
      nodes.exit().remove()

      # only restart force when nodes/links changed to avoid visible jitter
      if restart
        force.start()

    svg.style('opacity', 1e-6).transition().duration(1000).style 'opacity', 1

    scope.$watch 'data', (newVal) ->
      redraw newVal

    angular.element($window).bind 'resize', ->
      width = $window.innerWidth
      height = $window.innerHeight - 114
      svg
        .attr 'width', width
        .attr 'height', height
      force.size([width, height]).resume()

  return {
    link: link
    restrict: 'E'
    scope: data: '='
  }