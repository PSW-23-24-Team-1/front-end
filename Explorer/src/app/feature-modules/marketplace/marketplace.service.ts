import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from './model/club.model';
import { Rating } from '../administration/model/rating.model';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
import { Router } from '@angular/router';
import { PagedResults } from 'src/app/shared/model/paged-results.model';
import { Review } from './model/review.model';
import { Problem } from './model/problem.model';

@Injectable({
  providedIn: 'root'
})
export class MarketplaceService {

  constructor(private http: HttpClient) { }

  getClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club')
  }
  getOwnerClubs(): Observable<PagedResults<Club>> {
    return this.http.get<PagedResults<Club>>(environment.apiHost + 'tourist/club/ownerclubs')
  }
  addClub(club: Club): Observable<Club> {
    return this.http.post<Club>(environment.apiHost + 'tourist/club', club);
  }
  updateEquipment(club: Club): Observable<Club> {
    return this.http.put<Club>(environment.apiHost + 'tourist/club/', club);
  }
  deleteClub(id: number): any {
    return this.http.delete<any>(environment.apiHost + 'tourist/club/' + id);
  }
  addRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(environment.apiHost + 'rating/rating', rating);
  }

  deleteRating(id: number): Observable<Rating> {
    return this.http.delete<Rating>(environment.apiHost + 'rating/rating/' + id);
  }

  getRating(id: number): Observable<Rating> {
    return this.http.get<Rating>(environment.apiHost + 'rating/rating/' + id);
  }

  updateRating(rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(environment.apiHost + 'rating/rating/' + rating.id, rating);
  }
  
  getReviews(tourId: number): Observable<PagedResults<Review>> {
    return this.http.get<PagedResults<Review>>(environment.apiHost + 'review/' + tourId);
  }
  reviewExists(touristId: number, tourId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiHost + 'review/' + touristId + '/' + tourId);
  }
  addReview(review: Review): Observable<Review> {
    return this.http.post<Review>(environment.apiHost + 'review', review);
  }
  updateReview(review: Review): Observable<Review> {
    return this.http.put<Review>(environment.apiHost + 'review/'+ review.id, review);
  }
  deleteReview(review: Review): Observable<Review> {
    return this.http.delete<Review>(environment.apiHost + 'review/'+ review.id);
  }
  getProblem(): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>(environment.apiHost + 'problem')
  }
  addProblem(problem: Problem): Observable<Problem> {
    return this.http.post<Problem>(environment.apiHost +'problem', problem);
  } 
  updateProblem(problem: Problem): Observable<Problem> {
    return this.http.put<Problem>(environment.apiHost + 'problem/' + problem.id, problem);
  }
  deleteProblem(id: number): Observable<Problem> {
    return this.http.delete<Problem>(environment.apiHost + 'problem/' + id);
  }
  getProblemByUserId(id: number): Observable<PagedResults<Problem>> {
    return this.http.get<PagedResults<Problem>>(environment.apiHost + 'problem/' + id);
  }
}