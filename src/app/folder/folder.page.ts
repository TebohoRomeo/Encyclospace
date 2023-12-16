import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ArticlesEntity } from '../interfaces/news-response';
import { NewsapiService } from '../services/newsapi.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  newsList: ArticlesEntity[];

  today = new Date();
  daysList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  month = this.today.toLocaleString('default', { month: 'short' });
  day = this.daysList[this.today.getDay()]

  // public appPages = [
  //   { title: 'General', url: '/general', icon: 'newspaper' },
  //   { title: 'Business', url: '/business', icon: 'business' },
  //   { title: 'Sports', url: '/sports', icon: 'basketball' },
  //   { title: 'Entertainment', url: '/entertainment', icon: 'videocam' },
  //   { title: 'Technology', url: '/technology', icon: 'laptop' },
  //   { title: 'Health', url: '/health', icon: 'medkit' },
  //   { title: 'Science', url: '/science', icon: 'rocket' },
  // ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private newsApiService: NewsapiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');    
    this.getTopHeadlines();
  }

  getTopHeadlines() {
        
    this.newsApiService
      .getTopCountryHeadlines('za', this.folder)
      .pipe(map((res) => res.articles))
      .subscribe((news) => (this.newsList = news));
  }

  goToSettings(){
    this.router.navigate(['/settings']);
  }

  goToSearch() {
    this.router.navigate(['/search'])
  }
}
