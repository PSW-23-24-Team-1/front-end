import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Blog } from '../model/blog.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateBlog } from '../model/blog-create.model';
import { UpdateBlog } from '../model/blog-update.model';

@Component({
  selector: 'xp-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {
  blog: Blog;
  blogId: number;

  constructor(private service: BlogService, private router: Router, private route: ActivatedRoute,) { }
  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get("blogId");
        if (Number(param)) {
            this.blogId = Number(param);
            this.getBlog();
        }
  }
  
  blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  getMarkupPreview() {
    return this.blogForm.get('description')?.value;
  }

  getBlog(): void {
    this.service.getBlog(this.blogId).subscribe({
        next: (result: Blog) => {
            this.blog = result;
            this.blogForm.patchValue({
              title: result.title,
              description: result.description
            });
        },
    });
}

  createBlog(): void{
    const blog: CreateBlog = {
      title: this.blogForm.value.title || '',
      description: this.blogForm.value.description || '',
      date: new Date().toISOString(),
      status: 0,
      authorId: 0
    }

    if(blog.title != '' && blog.title != null)
      this.service.saveBlog(blog).subscribe({
        next: (_) => {
          this.router.navigate(['/my-blogs']);
        }
        });
  }

  updateBlog(): void{
    const blog: UpdateBlog = {
      title: this.blogForm.value.title || '',
      description: this.blogForm.value.description || '',
      date: new Date().toISOString(),
      status: 0,
      id: this.blog.id,
      authorId: 0
    }

    if(blog.title != '' && blog.title != null)
      this.service.updateBlog(blog).subscribe({
        next: (_) => {
          this.router.navigate(['/my-blogs']);
        }
        });
  }
}