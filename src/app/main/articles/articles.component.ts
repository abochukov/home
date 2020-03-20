import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getArticles().subscribe(data => {
      this.articles = data;
      console.log(data);
    })
  }

}
