import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post';
import { map } from 'rxjs/operators';


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
  }

}
