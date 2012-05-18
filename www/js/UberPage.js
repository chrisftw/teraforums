// Backbone Page.
(function ($) {
  "use strict";
  
  window.Uber = {};
  
  window.Uber.UberPage = Backbone.Model.extend({
    baseUrl: "http://tera-forums.enmasse.com/",

    loadPage: function () {
      if (this.get('path') !== undefined) {
        var self = this;
        $.get(this.baseUrl + this.get('path'), function (data) {
          var pageData = $(data.responseText);
          
         // pageData.find('img').forEach(function (img) {
         //   src = 
         // });
          window.Uber.currentPage.set('title', pageData.find('title').text());
          window.Uber.currentPage.set('data', pageData.find('#content-primary').html());
        });
      }
      return this;
    },
    isLoaded: function () {
      return (this.data !== undefined);
    }
  });
  window.Uber.currentPage = new window.Uber.UberPage({title: 'TERA Forums', path: 'forums', reload: true});
  window.Uber.currentPage.loadPage();

  window.Uber.Pages = Backbone.Collection.extend({
    model: window.Uber.UberPage,

    initialize: function (models, options) {
      this.bind("reset", this.reconnectView);
    },

    reconnectView: function () {
      this.setCurrentPage(window.Uber.currentPage.get('path'));
    },

    setCurrentPage: function (path) {
      var localPage = this.getPage(path);
      if (localPage !== undefined) {
        window.Uber.currentPage.set(localPage.toJSON());
      } else {
        var newPage = new window.Uber.UberPage({path: path});
        this.push(newPage);
        newPage.loadPage();
        if (newPage.get('data') !== undefined) {
          console.log("new page is GOOD");
          window.Uber.currentPage.set(newPage.toJSON());
        } else {
          console.log("new page is BAD");
          window.Uber.currentPage.set({path: path, data: "404 Page not found"});
        }
      }
      return window.Uber.currentPage;
    },

    hasPage: function (path) {
      if (this.getPage(path) === undefined) {
        return false;
      }
      return true;
    },

    getPage: function (path) {
      if (path.substring(0, 1) === "/") {
        path = path.substring(1, path.length);
      }
      return _.filter(this.models, function (p) { return p.get('path') === path; })[0];
    }
  });
  window.Uber.pages = new window.Uber.Pages();
  window.Uber.pages.push(window.Uber.currentPage);

  window.Uber.PageView = Backbone.View.extend({
    initialize: function () {
      _.bindAll(this, "render");
      this.model.bind('change', this.render);
    },
    render: function () {
      console.log("running render[runs too much now]");
      $('#data-area').html(this.model.get('data'));
      $('#title-area').html(this.model.get('title'));
      return this;
    }
  });

  window.Uber.pageRouter = Backbone.Router.extend({
    routes: {
      "/forums/races" : "changePage",
      "*path":    "changePage"
    },
    initialize : function () {
      this.pageView = new window.Uber.PageView({model: window.Uber.currentPage});    
      this.route(":path", "page", function (path) {
        window.Uber.Pages.setCurrentPage(window.Uber.currentPage.get('path'));
      });
    },
    changePage : function (path) {
      window.Uber.pages.setCurrentPage(path);
      this.pageView.render();
    }
  });

  window.Uber.router = new window.Uber.pageRouter();

  $(function () {
    Backbone.history.start({pushState: true});
    window.Uber.router.pageView.render();
    //window.Uber.pages.fetch();

    $('a').live('click', function (e) {
      e.preventDefault();
      window.Uber.router.changePage($(this).attr('href'), true);
    });
  });
}(jQuery));
