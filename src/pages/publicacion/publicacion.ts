import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer,SafeHtml} from '@angular/platform-browser';
/**
 * Generated class for the PublicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicacion',
  templateUrl: 'publicacion.html',
})
export class PublicacionPage {
  post;
  contenido;
  iframe:SafeHtml;
  constructor(public navCtrl: NavController, public navParams: NavParams,public za:DomSanitizer) {
    this.post = this.navParams.get("post")
    console.log(this.post);
    
    this.contenido = this.post.contenido;
    let inicio = this.contenido.indexOf("<iframe")
    let final = this.contenido.indexOf("</iframe>")
    console.log(this.contenido.substring(inicio,final));
    
    this.iframe = this.za.bypassSecurityTrustHtml(this.contenido.substring(inicio,final));
  
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicacionPage');
  }

}
