import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../../data.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {

  public articleId: number;
  public article: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.articleId = params.id
    });

    this.dataService.getArticlesById(this.articleId).subscribe(article => {
      this.article = article;
      console.log(this.article)
    })
  }

}
