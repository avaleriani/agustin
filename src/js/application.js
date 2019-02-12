const $ = require("jquery");
const SVGInjector = require("svg-injector");
const fastClick = require('fastclick');
import Shuffle from 'shufflejs';

export const app = {
  loadApplication: function() {
    const that = this;
    const touch = !!('ontouchstart' in document.documentElement || navigator.msMaxTouchPoints > 0);
    $('.view').on('click', function(e) {
      e.preventDefault();
      return false;
    });
    if (touch) {
      return fastClick.attach(document.body);
    }
    this.centerGrid();
    window.addEventListener('resize', function() {
      that.centerGrid();
    }, true);
  },

  svgInjector: function() {
    const mySVGsToInject = document.querySelectorAll('img.inject-me');
    return SVGInjector(mySVGsToInject);
  },

  worksFilter: function() {
    const grid = document.getElementById('work-grid');
    const sizer = document.getElementsByClassName('.shuffle__sizer')[0];
    const btns = document.getElementsByClassName('svg-wrapper');
    const shfl = new Shuffle(grid, {
      itemSelector: '.work-item',
      easing: 'ease-in-out',
      sizer: sizer,
      speed: 600
    });

    Array.from(btns).forEach((btn) => {

      console.log(btn)
      btn.onclick((e) => {
        let that, group, isActive;
        e.preventDefault();
        that = $(this);
        isActive = that.hasClass('active');

        if (isActive) {
          return false;
        } else {
          group = that.find('a').attr('data-group');
          $('.active').removeClass('active');
          that.toggleClass('active');
          shfl.filter(group);
        }
      });
    })
  },

  centerGrid: function() {
    const width = window.innerWidth;
    let count = 0;
    let margin = (count - 1) * 15;
    let total = 1127;
    if (width < total) {
      count = Math.floor(width / 270);
      margin = (count - 1) * 15;
      total = (count * 270) + margin;
    }
    document.getElementById('work-grid').style.width = total + "px";
    document.getElementById('grid-box-container').style.width = total + "px";
  }
};