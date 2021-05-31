import { Component, HostListener, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass']
})
export class SideBarComponent implements OnInit {
  public screenHeight: any;
  constructor() { }

  ngOnInit(): void {
    this.resize();
    this.sidebar();
  }















 //UI related Funcationality

  @HostListener('window:resize')
  onResize() {
    this.resize();
  }

  public resize() {
    this.screenHeight = window.innerHeight;
    var height = this.screenHeight - 66
    $('.sidebar-container').css('height', height + 'px');
    // $('.chart-content').css('height', height + 'px');
  }
  public sidebar() {
    $(".close").click(function () {
      $(".sidebar-wrapper").toggleClass("toggled");
      $(".arrow-forward").show();
    });
    $(".open-right").click(function () {
      $(".sidebar-wrapper").toggleClass("toggled");
      $(".arrow-forward").hide();
    });
    $(".toggle-div > a").click(function () {
      $(".sidebar-submenu").slideUp(200);
      if (
        $(this)
          .parent()
          .hasClass("active")
      ) {
        $(".toggle-div").removeClass("active");
        $(this)
          .parent()
          .removeClass("active");
      } else {
        $(".toggle-div").removeClass("active");
        $(this)
          .next(".sidebar-submenu")
          .slideDown(200);
        $(this)
          .parent()
          .addClass("active");
      }
    });

  }
}
