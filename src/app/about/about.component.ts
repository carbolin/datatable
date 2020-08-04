import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { map, take } from 'rxjs/operators';
import { fromEvent, interval, merge } from 'rxjs';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(private ps: PostService) { }

  data: Post[];

  ngOnInit(): void {

    this.ps.getPosts()
      .subscribe((data): Post[] => this.data = { ...data });

    const clicks$ = fromEvent(document, 'click');
    const timer$ = interval(1000);
    const merged = merge(clicks$, timer$);

    merged.pipe(
      take(25)
    )
      .subscribe(val => console.log(val));

  }

}
