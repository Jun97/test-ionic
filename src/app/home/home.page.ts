import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{


  // Configuration for each Slider
  bannerOpts = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: false,
    loop: true
  };

  // Configuration for each Slider
  logoOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    autoplay: false,
    loop: false,
    autoHeight: true,
  };

  homeContent: any;

  ngOnInit() {
    this.getHomepage();
  }



  constructor(private postsService: ApiService) { }


  getHomepage() {
    this.postsService.getPostsByID('https://getright.asia/client/onehope/wp-json/wp/v2/onehope/homepage_info')
    .subscribe( (response: any) => {

      this.homeContent = response;
    });
  }

}
