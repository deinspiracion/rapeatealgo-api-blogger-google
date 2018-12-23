import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { PublicacionPage } from '../publicacion/publicacion';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  api:string="AIzaSyDLFAXL3fURFr6wbeoSmFdU_Be6L88ZZRw";
  idBlog:string="780607929688755314";
  buscarImagen:string;
  items:any;
  posts:any=[];
  constructor(public navCtrl: NavController, public httpClient: HttpClient) {
    this.buscarImagen='src="';
      this.httpClient.get("https://content.googleapis.com/blogger/v3/blogs/780607929688755314/pages?key=AIzaSyBtXRs0HhW2pUv3vpYraRxxHKFOnvlXd5M").subscribe((data:any)=>{
        console.log(data.items);
        
      })

      this.httpClient.get("https://content.googleapis.com/blogger/v3/blogs/780607929688755314/posts?maxResults=40&key=AIzaSyBtXRs0HhW2pUv3vpYraRxxHKFOnvlXd5M").subscribe((data:any)=>{
        console.log(data.items);
        this.items = data.items
      
        for (let index = 0; index < this.items.length; index++) {
           let posicion = this.items[index].content.indexOf(this.buscarImagen);
           let final = this.items[index].content.indexOf('"',posicion+5)
           let url = this.items[index].content.substring(posicion+5,final)
          //  console.log(url);

           if(url.indexOf("png") > 0 || url.indexOf("jpg") > 0 || url.indexOf("jpeg") > 0){
             this.posts.push({
             "titulo":this.items[index].title,
             "urlImg":url,
             "fecha":this.items[index].updated,
             "comentarios":this.items[index].replies.totalItems,
             contenido:this.items[index].content
            })
             
            }else{
              this.posts.push({
              "titulo":this.items[index].title,
              "urlImg":'assets/imgs/logo.jpg',
              "fecha":this.items[index].updated,
              "comentarios":this.items[index].replies.totalItems,
              contenido:this.items[index].content
            })

           }
           
           
          
        }

        console.log(this.posts);
        
      })

  }

  verPublicacion(post){
    this.navCtrl.push(PublicacionPage,{post})
  }

}
